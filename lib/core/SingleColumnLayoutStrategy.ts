import LayoutStrategyBase from "./LayoutStrategyBase";
import LayoutState from "./LayoutState";
import Node from "./Node";
import Box from "./Box";
import LayoutLevel from "./LayoutLevel";
import Dimensions from "./Dimensions";
import LayoutAlgorithm from "./LayoutAlgorithm";
import BranchParentAlignment from "./BranchParentAlignment";
import Edge from "./Edge";
import Point from "./Point";
import Connector from "./Connector";
import Rect from "./Rect";
import ConnectorAlignment from "./ConnectorAlignment";

export default class SingleColumnLayoutStrategy extends LayoutStrategyBase {
  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// </summary>
  PreProcessThisNode(state: LayoutState, node: Node) {
    if (
      this.ParentAlignment != BranchParentAlignment.Left &&
      this.ParentAlignment != BranchParentAlignment.Right
    ) {
      throw new Error(
        "InvalidOperationException: Unsupported value for ParentAlignment"
      );
    }

    node.State.NumberOfSiblings = node.Element.IsCollapsed
      ? 0
      : node.ChildCount;

    // only add spacers for non-collapsed boxes
    if (node.State.NumberOfSiblings > 0 && node.Level > 0) {
      // add one (for vertical spacer) into the count of layout columns
      node.State.NumberOfSiblingColumns = 1;
      node.State.NumberOfSiblingRows = node.ChildCount;

      // add parent's vertical carrier to the end
      let verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
      node.AddRegularChildBox(verticalSpacer);
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  ApplyVerticalLayout(state: LayoutState, level: LayoutLevel) {
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

    let prevRowExterior = new Dimensions(
      node.State.SiblingsRowV.From,
      node.AssistantsRoot == null
        ? node.State.SiblingsRowV.To
        : node.State.BranchExterior.Bottom
    );

    for (let row = 0; row < node.State.NumberOfSiblings; row++) {
      // first, compute
      let child = node.Children[row];
      let rect = child.State;

      let top =
        prevRowExterior.To +
        (row == 0 ? this.ParentChildSpacing : this.SiblingSpacing);
      LayoutAlgorithm.MoveTo(child.State, rect.Left, top);
      child.State.BranchExterior = Rect.from(
        child.State.Size,
        child.State.TopLeft
      );

      let rowExterior = new Dimensions(top, top + rect.Size.Height);

      child = node.Children[row];
      child.State.SiblingsRowV = rowExterior;

      // re-enter layout algorithm for child branch
      LayoutAlgorithm.VerticalLayout(state, child);

      let childBranchBottom = child.State.BranchExterior.Bottom;

      prevRowExterior = new Dimensions(
        rowExterior.From,
        Math.max(childBranchBottom, rowExterior.To)
      );
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    let nodeState = node.State;

    if (node.AssistantsRoot != null) {
      LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
    }

    // first, perform horizontal layout for every node in this column
    for (let row = 0; row < nodeState.NumberOfSiblings; row++) {
      let child = node.Children[row];

      // re-enter layout algorithm for child branch
      // siblings are guaranteed not to offend each other
      LayoutAlgorithm.HorizontalLayout(state, child);
    }

    // now align the column
    let edges = LayoutAlgorithm.AlignHorizontalCenters(
      state,
      level,
      this.EnumerateColumn(node)
    );

    if (node.Level > 0 && node.ChildCount > 0) {
      let rect = node.State;
      let diff: number;
      if (this.ParentAlignment == BranchParentAlignment.Left) {
        let desiredLeft = rect.CenterH + this.ParentConnectorShield / 2;
        diff = desiredLeft - edges.From;
      } else if (this.ParentAlignment == BranchParentAlignment.Right) {
        let desiredRight = rect.CenterH - this.ParentConnectorShield / 2;
        diff = desiredRight - edges.To;
      } else {
        throw new Error(
          "InvalidOperationException: Invalid ParentAlignment setting"
        );
      }

      // vertical connector from parent
      LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

      // spacer for the vertical carrier
      let verticalSpacer =
        node.Level > 0 ? node.Children[node.ChildCount - 1] : null;
      if (verticalSpacer != null) {
        let spacerTop = node.State.Bottom;
        let spacerBottom = node.Children[node.ChildCount - 2].State.Bottom;
        LayoutAlgorithm.AdjustSpacer(
          verticalSpacer.State,
          rect.CenterH - this.ParentConnectorShield / 2,
          spacerTop,
          this.ParentConnectorShield,
          spacerBottom - spacerTop
        );
        state.MergeSpacer(verticalSpacer);
      }
    }
  }

  private EnumerateColumn(branchRoot: Node): Node[] {
    const nodes: Node[] = [];
    for (let i = 0; i < branchRoot.State.NumberOfSiblings; i++) {
      nodes.push(branchRoot.Children[i]);
    }

    return nodes;
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  RouteConnectors(state: LayoutState, node: Node) {
    if (node.ChildCount == 0) {
      return;
    }

    // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
    let count = 1 + node.State.NumberOfSiblings;

    let segments: Edge[] = Array(count);

    let rootRect = node.State;
    let center = rootRect.CenterH;
    let rootRectV =
      this.ConnectorAlignment === ConnectorAlignment.Center
        ? rootRect.CenterV
        : rootRect.Bottom;

    let verticalCarrierHeight =
      node.Children[node.State.NumberOfSiblings - 1].State.CenterV -
      (this.ConnectorAlignment === ConnectorAlignment.Center
        ? node.State.CenterV
        : node.State.Bottom);

    // big vertical connector, from parent to last row
    segments[0] = new Edge(
      new Point(center, rootRectV),
      new Point(center, rootRectV + verticalCarrierHeight)
    );

    for (let ix = 0; ix < node.State.NumberOfSiblings; ix++) {
      let rect = node.Children[ix].State;
      let destination =
        this.ConnectorAlignment === ConnectorAlignment.Center
          ? rect.CenterH
          : this.ParentAlignment == BranchParentAlignment.Left
          ? rect.Left
          : rect.Right;
      segments[1 + ix] = new Edge(
        new Point(center, rect.CenterV),
        new Point(destination, rect.CenterV)
      );
    }

    node.State.Connector = new Connector(segments);
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  public GetSupportsAssistants = () => true;
}
