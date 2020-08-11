import Point from "./Point";
import LayoutStrategyBase from "./LayoutStrategyBase";
import Dimensions from "./Dimensions";
import LayoutAlgorithm from "./LayoutAlgorithm";
import LayoutState from "./LayoutState";
import Box from "./Box";
import LayoutLevel from "./LayoutLevel";
import Node from "./Node";
import BranchParentAlignment from "./BranchParentAlignment";
import Rect from "./Rect";
import Edge from "./Edge";
import Connector from "./Connector";
import ConnectorAlignment from "./ConnectorAlignment";

export default class LinearLayoutStrategy extends LayoutStrategyBase {
  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// </summary>
  public PreProcessThisNode(state: LayoutState, node: Node) {
    if (node.ChildCount > 0) {
      node.State.NumberOfSiblings = node.Element.IsCollapsed
        ? 0
        : node.ChildCount;

      // only add spacers for non-collapsed boxes
      if (!node.Element.IsCollapsed) {
        const verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.AddRegularChildBox(verticalSpacer);

        const horizontalSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyVerticalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    if (node.Level == 0) {
      node.State.SiblingsRowV = new Dimensions(
        node.State.Top,
        node.State.Bottom
      );
    }

    if (node.AssistantsRoot != null) {
      // assistants root has to be initialized with main node's exterior
      LayoutAlgorithm.CopyExteriorFrom(node.AssistantsRoot.State, node.State);
      LayoutAlgorithm.VerticalLayout(state, node.AssistantsRoot);
    }

    if (node.State.NumberOfSiblings == 0) {
      return;
    }

    let siblingsRowExterior = Dimensions.MinMax();
    let top;

    if (node.AssistantsRoot == null) {
      if (node.State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }

      top = node.State.SiblingsRowV.To + this.ParentChildSpacing;
    } else {
      top = node.State.BranchExterior.Bottom + this.ParentChildSpacing;
    }

    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      let rect = child.State;

      LayoutAlgorithm.MoveTo(child.State, 0, top);

      if (child.State.Size == null) {
        throw Error("Size is null");
      }

      child.State.BranchExterior = Rect.from(
        child.State.Size,
        child.State.TopLeft
      );

      if (rect.Size == null) {
        throw Error("Size is null");
      }

      siblingsRowExterior = Dimensions.add(
        siblingsRowExterior,
        new Dimensions(top, top + rect.Size.Height)
      );
    }

    siblingsRowExterior = new Dimensions(
      siblingsRowExterior.From,
      siblingsRowExterior.To
    );

    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      child.State.SiblingsRowV = siblingsRowExterior;

      // re-enter layout algorithm for child branch
      LayoutAlgorithm.VerticalLayout(state, child);
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    if (node.AssistantsRoot != null) {
      LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
    }

    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      // re-enter layout algorithm for child branch
      LayoutAlgorithm.HorizontalLayout(state, child);
    }

    if (node.Level > 0 && node.ChildCount > 0) {
      let rect = node.State;
      let leftmost = node.Children[0].State.CenterH;
      let rightmost =
        node.Children[node.State.NumberOfSiblings - 1].State.CenterH;

      let desiredCenter =
        node.State.NumberOfSiblings == 1 ||
        this.ParentAlignment == BranchParentAlignment.Center
          ? leftmost + (rightmost - leftmost) / 2
          : this.ParentAlignment == BranchParentAlignment.Left
          ? leftmost + this.ChildConnectorHookLength
          : rightmost - this.ChildConnectorHookLength;
      let center = rect.CenterH;
      let diff = center - desiredCenter;
      LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

      // vertical connector from parent
      let verticalSpacer = node.Children[node.State.NumberOfSiblings];

      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }

      LayoutAlgorithm.AdjustSpacer(
        verticalSpacer.State,
        center - this.ParentConnectorShield / 2,
        rect.Bottom,
        this.ParentConnectorShield,
        node.Children[0].State.SiblingsRowV.From - rect.Bottom
      );

      state.MergeSpacer(verticalSpacer);

      // horizontal protector
      let firstInRow = node.Children[0].State;

      let horizontalSpacer = node.Children[node.State.NumberOfSiblings + 1];

      if (firstInRow.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }

      LayoutAlgorithm.AdjustSpacer(
        horizontalSpacer.State,
        firstInRow.Left,
        firstInRow.SiblingsRowV.From - this.ParentChildSpacing,
        node.Children[node.State.NumberOfSiblings - 1].State.Right -
          firstInRow.Left,
        this.ParentChildSpacing
      );

      state.MergeSpacer(horizontalSpacer);
    }
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  public RouteConnectors(state: LayoutState, node: Node) {
    let normalChildCount = node.State.NumberOfSiblings;

    let count =
      normalChildCount == 0
        ? 0 // no visible children = no edges
        : normalChildCount == 1
        ? 1 // one child = one direct edge between parent and child
        : 1 + // one downward edge for parent
          1 + // one for horizontal carrier
          normalChildCount; // one upward edge for each child

    if (count == 0) {
      node.State.Connector = null;
      return;
    }

    let segments: Edge[] = [];

    let rootRect = node.State;
    let center = rootRect.CenterH;

    if (node.Children == null) {
      throw new Error("State is present, but children not set");
    }

    if (count == 1) {
      segments[0] = new Edge(
        new Point(
          center,
          this.ConnectorAlignment === ConnectorAlignment.Center
            ? rootRect.CenterV
            : rootRect.Bottom
        ),
        new Point(
          center,
          this.ConnectorAlignment === ConnectorAlignment.Center
            ? node.Children[0].State.CenterV
            : node.Children[0].State.Top
        )
      );
    } else {
      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }

      const rootRectV =
        this.ConnectorAlignment === ConnectorAlignment.Center
          ? rootRect.CenterV
          : rootRect.Bottom;

      let space = node.Children[0].State.SiblingsRowV.From - rootRectV;

      segments[0] = new Edge(
        new Point(center, rootRectV),
        new Point(center, rootRectV + space - this.ChildConnectorHookLength)
      );

      for (let i = 0; i < normalChildCount; i++) {
        let childRect = node.Children[i].State;
        let childCenter = childRect.CenterH;
        segments[1 + i] = new Edge(
          new Point(childCenter, childRect.Top),
          new Point(childCenter, childRect.Top - this.ChildConnectorHookLength)
        );
      }

      segments[count - 1] = new Edge(
        new Point(segments[1].To.X, segments[1].To.Y),
        new Point(segments[count - 2].To.X, segments[1].To.Y)
      );
    }

    node.State.Connector = new Connector(segments);
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  public GetSupportsAssistants = (): boolean => true;
}
