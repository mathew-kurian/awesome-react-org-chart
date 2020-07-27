import LayoutStrategyBase from "./LayoutStrategyBase";
import LayoutState from "./LayoutState";
import Node from "./Node";
import LayoutLevel from "./LayoutLevel";
import Dimensions from "./Dimensions";
import LayoutAlgorithm from "./LayoutAlgorithm";
import BranchParentAlignment from "./BranchParentAlignment";
import Size from "./Size";
import Rect from "./Rect";
import StackOrientation from "./StackOrientation";

export default class StackingLayoutStrategy extends LayoutStrategyBase {
  /// <summary>
  /// Which direction to send child boxes: horizontally, vertically, whether to use multiple lines.
  /// </summary>
  Orientation: StackOrientation;

  /// <summary>
  /// Ctr.
  /// </summary>
  constructor() {
    super();

    this.Orientation = StackOrientation.SingleRowHorizontal;
    this.ParentAlignment = BranchParentAlignment.InvalidValue;
    this.ChildConnectorHookLength = 0;
    this.ParentConnectorShield = 0;
    this.SiblingSpacing = 5;
  }

  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// This strategy does not use connectors and spacers.
  /// </summary>
  PreProcessThisNode(state: LayoutState, node: Node) {
    node.State.NumberOfSiblings = node.Element.IsCollapsed
      ? 0
      : node.ChildCount;

    if (node.State.NumberOfSiblings > 0) {
      // this strategy requires certain adjustments to be made to the box sizes
      // they will only affect corresponding Nodes, not the size on the box itself
      if (
        this.Orientation != StackOrientation.SingleRowHorizontal &&
        this.Orientation != StackOrientation.SingleColumnVertical
      ) {
        throw new Error(
          "InvalidOperationException: Unsupported value for orientation: " +
            this.Orientation
        );
      }
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

    if (node.State.NumberOfSiblings == 0) {
      return;
    }

    let siblingsRowExterior = Dimensions.MinMax();

    if (this.Orientation == StackOrientation.SingleRowHorizontal) {
      let top =
        node.AssistantsRoot == null
          ? node.State.SiblingsRowV.To + this.ParentChildSpacing
          : node.State.BranchExterior.Bottom + this.ParentChildSpacing;

      for (let i = 0; i < node.State.NumberOfSiblings; i++) {
        let child = node.Children[i];
        let rect = child.State;

        LayoutAlgorithm.MoveTo(child.State, 0, top);
        child.State.BranchExterior = Rect.from(
          child.State.Size,
          child.State.TopLeft
        );

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
    } else if (this.Orientation == StackOrientation.SingleColumnVertical) {
      let prevRowExterior = new Dimensions(
        node.State.SiblingsRowV.From,
        node.State.SiblingsRowV.To
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
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    for (let child of node.Children) {
      // re-enter layout algorithm for child branch
      LayoutAlgorithm.HorizontalLayout(state, child);
    }

    if (node.ChildCount > 0) {
      if (this.Orientation == StackOrientation.SingleRowHorizontal) {
        // now auto-extend or contract the parent box
        let width =
          node.Children[node.State.NumberOfSiblings - 1].State.Right -
          node.Children[0].State.Left;
        node.State.Size = new Size(
          Math.max(node.State.Size.Width, width),
          node.State.Size.Height
        );

        // now position children under the parent
        let center =
          (node.Children[0].State.Left +
            node.Children[node.ChildCount - 1].State.Right) /
          2;
        let desiredCenter = node.State.CenterH;
        let diff = desiredCenter - center;
        LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
      } else if (this.Orientation == StackOrientation.SingleColumnVertical) {
        LayoutAlgorithm.AlignHorizontalCenters(state, level, node.Children);

        // now position children under the parent
        let center = node.Children[0].State.CenterH;
        let desiredCenter = node.State.CenterH;
        let diff = desiredCenter - center;
        LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
      }
    }
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  RouteConnectors(state: LayoutState, node: Node) {
    // this strategy does not use connectors
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  GetSupportsAssistants = () => false;
}
