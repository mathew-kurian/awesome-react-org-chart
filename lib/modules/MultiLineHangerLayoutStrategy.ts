import LinearLayoutStrategy from "./LinearLayoutStrategy";
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

/// <summary>
/// Arranges child boxes in multiple lines under the parent.
/// Can only be configured to position parent in the middle of children.
/// Children are attached to long horizontal carriers,
/// with a central vertical carrier going through them from parent's bottom.
/// </summary>
class MultiLineHangerLayoutStrategy extends LinearLayoutStrategy {
  /// <summary>
  /// Maximum number of siblings in a horizontal row.
  /// </summary>
  MaxSiblingsPerRow: number = 4;

  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// </summary>
  PreProcessThisNode(state: LayoutState, node: Node) {
    if (this.MaxSiblingsPerRow <= 0 || this.MaxSiblingsPerRow % 2 != 0) {
      throw new Error("MaxSiblingsPerRow must be a positive even value");
    }

    if (node.ChildCount <= this.MaxSiblingsPerRow) {
      // fall back to linear layout, only have one row of boxes
      super.PreProcessThisNode(state, node);
      return;
    }

    node.State.NumberOfSiblings = node.ChildCount;

    // only add spacers for non-collapsed boxes
    if (node.State.NumberOfSiblings > 0) {
      let lastRowBoxCount = node.ChildCount % this.MaxSiblingsPerRow;

      // add one (for vertical spacer) into the count of layout columns
      node.State.NumberOfSiblingColumns = 1 + this.MaxSiblingsPerRow;

      node.State.NumberOfSiblingRows = node.ChildCount / this.MaxSiblingsPerRow;
      if (lastRowBoxCount != 0) {
        node.State.NumberOfSiblingRows++;
      }

      // include vertical spacers into the count of layout siblings
      node.State.NumberOfSiblings =
        node.ChildCount + node.State.NumberOfSiblingRows;
      if (
        lastRowBoxCount > 0 &&
        lastRowBoxCount <= this.MaxSiblingsPerRow / 2
      ) {
        // don't need the last spacer, last row is half-full or even less
        node.State.NumberOfSiblings--;
      }

      // sibling middle-spacers have to be inserted between siblings
      let ix = this.MaxSiblingsPerRow / 2;
      while (ix < node.State.NumberOfSiblings) {
        let siblingSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.InsertRegularChildBoxByIndex(ix, siblingSpacer);
        ix += node.State.NumberOfSiblingColumns;
      }

      // add parent vertical spacer to the end
      let verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
      node.AddRegularChildBox(verticalSpacer);

      // add horizontal spacers to the end
      for (let i = 0; i < node.State.NumberOfSiblingRows; i++) {
        let horizontalSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  ApplyVerticalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;
    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      // fall back to linear layout, only have one row of boxes
      super.ApplyVerticalLayout(state, level);
      return;
    }

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

    for (let row = 0; row < node.State.NumberOfSiblingRows; row++) {
      let siblingsRowExterior = Dimensions.MinMax();

      let spacing = row == 0 ? this.ParentChildSpacing : this.SiblingSpacing;

      // first, compute
      let from = row * node.State.NumberOfSiblingColumns;
      let to = Math.min(
        from + node.State.NumberOfSiblingColumns,
        node.State.NumberOfSiblings
      );
      for (let i = from; i < to; i++) {
        let child = node.Children[i];
        if (child.Element.IsSpecial) {
          // skip vertical spacers for now
          continue;
        }

        let rect = child.State;

        let top = prevRowExterior.To + spacing;
        LayoutAlgorithm.MoveTo(child.State, rect.Left, top);
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

      let siblingsBottom = Number.MIN_VALUE;
      for (let i = from; i < to; i++) {
        let child = node.Children[i];
        child.State.SiblingsRowV = siblingsRowExterior;

        // re-enter layout algorithm for child branch
        LayoutAlgorithm.VerticalLayout(state, child);

        siblingsBottom = Math.max(
          siblingsBottom,
          child.State.BranchExterior.Bottom
        );
      }

      prevRowExterior = new Dimensions(
        siblingsRowExterior.From,
        Math.max(siblingsBottom, siblingsRowExterior.To)
      );

      // now assign size to the vertical spacer, if any
      let spacerIndex = from + node.State.NumberOfSiblingColumns / 2;
      if (spacerIndex < node.State.NumberOfSiblings) {
        // in the last row, spacer should only extend to the siblings row bottom,
        // because main vertical carrier does not go below last row
        // and thus cannot conflict with branches of children of the last row
        let spacerBottom =
          row == node.State.NumberOfSiblingRows - 1
            ? node.Children[spacerIndex - 1].State.SiblingsRowV.To
            : prevRowExterior.To;

        let spacer = node.Children[spacerIndex].State;
        LayoutAlgorithm.AdjustSpacer(
          spacer,
          0,
          prevRowExterior.From,
          this.ParentConnectorShield,
          spacerBottom - prevRowExterior.From
        );
      }
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      // fall back to linear layout, only have one row of boxes
      super.ApplyHorizontalLayout(state, level);
      return;
    }

    if (node.AssistantsRoot != null) {
      LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
    }

    for (let col = 0; col < node.State.NumberOfSiblingColumns; col++) {
      // first, perform horizontal layout for every node in this column
      for (let row = 0; row < node.State.NumberOfSiblingRows; row++) {
        let ix = row * node.State.NumberOfSiblingColumns + col;
        if (ix >= node.State.NumberOfSiblings) {
          break;
        }

        let child = node.Children[ix];
        // re-enter layout algorithm for child branch
        LayoutAlgorithm.HorizontalLayout(state, child);
      }

      LayoutAlgorithm.AlignHorizontalCenters(
        state,
        level,
        this.EnumerateColumn(node, col)
      );
    }

    // now align children under parent
    let rect = node.State;
    let spacer = node.Children[node.State.NumberOfSiblingColumns / 2];
    let desiredCenter = spacer.State.CenterH;
    let diff = rect.CenterH - desiredCenter;
    LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

    // vertical connector from parent
    let verticalSpacer = node.Children[node.State.NumberOfSiblings];
    LayoutAlgorithm.AdjustSpacer(
      verticalSpacer.State,
      rect.CenterH - this.ParentConnectorShield / 2,
      rect.Bottom,
      this.ParentConnectorShield,
      node.Children[0].State.SiblingsRowV.From - rect.Bottom
    );
    state.MergeSpacer(verticalSpacer);

    // horizontal row carrier protectors
    let spacing = this.ParentChildSpacing;
    for (
      let firstInRowIndex = 0;
      firstInRowIndex < node.State.NumberOfSiblings;
      firstInRowIndex += node.State.NumberOfSiblingColumns
    ) {
      let firstInRow = node.Children[firstInRowIndex].State;
      let lastInRow =
        node.Children[
          Math.min(
            firstInRowIndex + node.State.NumberOfSiblingColumns - 1,
            node.State.NumberOfSiblings - 1
          )
        ].State;

      let horizontalSpacer =
        node.Children[
          1 +
            node.State.NumberOfSiblings +
            firstInRowIndex / node.State.NumberOfSiblingColumns
        ];

      let width =
        lastInRow.Right >= verticalSpacer.State.Right
          ? lastInRow.Right - firstInRow.Left
          : // extend protector at least to the central carrier
            verticalSpacer.State.Right - firstInRow.Left;

      LayoutAlgorithm.AdjustSpacer(
        horizontalSpacer.State,
        firstInRow.Left,
        firstInRow.SiblingsRowV.From - spacing,
        width,
        spacing
      );
      state.MergeSpacer(horizontalSpacer);

      spacing = this.SiblingSpacing;
    }
  }

  private EnumerateColumn(branchRoot: Node, col: number): Node[] {
    const nodes: Node[] = [];

    for (let row = 0; row < branchRoot.State.NumberOfSiblingRows; row++) {
      let ix = row * branchRoot.State.NumberOfSiblingColumns + col;
      if (ix >= branchRoot.State.NumberOfSiblings) {
        break;
      }

      nodes.push(branchRoot.Children[ix]);
    }

    return nodes;
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  RouteConnectors(state: LayoutState, node: Node) {
    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      // fall back to linear layout, only have one row of boxes
      super.RouteConnectors(state, node);
      return;
    }

    // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
    let count = 1 + node.State.NumberOfSiblingRows;

    for (let child of node.Children) {
      // normal boxes get one upward hook
      if (!child.Element.IsSpecial) {
        count++;
      }
    }

    let segments: Edge[] = [];

    let rootRect = node.State;
    let center = rootRect.CenterH;

    let verticalCarrierHeight =
      node.Children[node.State.NumberOfSiblings - 1].State.SiblingsRowV.From -
      this.ChildConnectorHookLength -
      rootRect.Bottom;

    // central mid-sibling vertical connector, from parent to last row
    segments[0] = new Edge(
      new Point(center, rootRect.Bottom),
      new Point(center, rootRect.Bottom + verticalCarrierHeight)
    );

    // short hook for each child
    let ix = 1;
    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      if (!child.Element.IsSpecial) {
        let childRect = child.State;
        let childCenter = childRect.CenterH;
        segments[ix++] = new Edge(
          new Point(childCenter, childRect.Top),
          new Point(childCenter, childRect.Top - this.ChildConnectorHookLength)
        );
      }
    }

    // horizontal carriers go from leftmost child hook to righmost child hook
    // for the last row which is just half or less full, it will only go to the central vertical carrier
    let lastChildHookIndex = count - node.State.NumberOfSiblingRows - 1;
    for (
      let firstInRowIndex = 1;
      firstInRowIndex < count - node.State.NumberOfSiblingRows;
      firstInRowIndex += this.MaxSiblingsPerRow
    ) {
      let firstInRow = segments[firstInRowIndex];

      let lastInRow =
        segments[
          Math.min(
            firstInRowIndex + this.MaxSiblingsPerRow - 1,
            lastChildHookIndex
          )
        ];

      if (lastInRow.From.X < segments[0].From.X) {
        segments[ix++] = new Edge(
          new Point(firstInRow.To.X, firstInRow.To.Y),
          new Point(segments[0].To.X, firstInRow.To.Y)
        );
      } else {
        segments[ix++] = new Edge(
          new Point(firstInRow.To.X, firstInRow.To.Y),
          new Point(lastInRow.To.X, firstInRow.To.Y)
        );
      }
    }

    node.State.Connector = new Connector(segments);
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  public GetSupportsAssistants = () => true;
}
