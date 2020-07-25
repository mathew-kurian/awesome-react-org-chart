import LayoutStrategyBase from "./LayoutStrategyBase";
import Node from "./Node";
import LayoutState from "./LayoutState";
import Box from "./Box";
import LayoutLevel from "./LayoutLevel";
import Dimensions from "./Dimensions";
import LayoutAlgorithm from "./LayoutAlgorithm";
import Rect from "./Rect";
import Edge from "./Edge";
import Point from "./Point";
import Connector from "./Connector";

export default class FishboneAssistantsLayoutStrategy extends LayoutStrategyBase {
  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// </summary>
  public PreProcessThisNode(state: LayoutState, node: Node): void {
    node.State.NumberOfSiblings = node.ChildCount;

    // only add spacers for non-collapsed boxes
    if (node.State.NumberOfSiblings > 0) {
      // using column == group here,
      // and each group consists of two vertical stretches of boxes with a vertical carrier in between
      node.State.NumberOfSiblingColumns = 1;
      node.State.NumberOfSiblingRows = node.State.NumberOfSiblings / 2;
      if (node.State.NumberOfSiblings % 2 != 0) {
        node.State.NumberOfSiblingRows++;
      }

      // a vertical carrier from parent
      var spacer = Box.Special(Box.None, node.Element.Id, false);
      node.AddRegularChildBox(spacer);
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyVerticalLayout(state: LayoutState, level: LayoutLevel): void {
    const node = level.BranchRoot;

    if (node.Level == 0) {
      throw new Error("Should never be invoked on root node");
    }

    if (node.State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }

    let prevRowBottom = node.State.SiblingsRowV.To;
    const maxOnLeft = this.MaxOnLeft(node);

    for (var i = 0; i < maxOnLeft; i++) {
      const spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;

      const child = node.Children[i];
      const frame = child.State;
      LayoutAlgorithm.MoveTo(frame, frame.Left, prevRowBottom + spacing);

      let rowExterior = new Dimensions(frame.Top, frame.Bottom);
      const i2 = i + maxOnLeft;

      if (frame.Size == null) {
        throw Error("Size is null");
      }

      if (i2 < node.State.NumberOfSiblings) {
        const child2 = node.Children[i2];
        const frame2 = child2.State;
        LayoutAlgorithm.MoveTo(frame2, frame2.Left, prevRowBottom + spacing);

        if (frame2.Size == null) {
          throw Error("Size is null");
        }

        if (frame2.Bottom > frame.Bottom) {
          LayoutAlgorithm.MoveTo(
            frame,
            frame.Left,
            frame2.CenterV - frame.Size.Height / 2
          );
        } else if (frame2.Bottom < frame.Bottom) {
          LayoutAlgorithm.MoveTo(
            frame2,
            frame2.Left,
            frame.CenterV - frame2.Size.Height / 2
          );
        }

        frame2.BranchExterior = Rect.from(frame2.Size, frame2.TopLeft);
        rowExterior = Dimensions.add(
          rowExterior,
          new Dimensions(frame2.Top, frame2.Bottom)
        );

        frame2.SiblingsRowV = rowExterior;
        LayoutAlgorithm.VerticalLayout(state, child2);
        prevRowBottom = frame2.BranchExterior.Bottom;
      }

      frame.BranchExterior = Rect.from(frame.Size, frame.TopLeft);
      frame.SiblingsRowV = rowExterior;
      LayoutAlgorithm.VerticalLayout(state, child);
      prevRowBottom = Math.max(prevRowBottom, frame.BranchExterior.Bottom);
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel): void {
    var node = level.BranchRoot;
    if (node.Level == 0) {
      node.State.SiblingsRowV = new Dimensions(
        node.State.Top,
        node.State.Bottom
      );
    }

    var left = true;
    var countOnThisSide = 0;
    var maxOnLeft = this.MaxOnLeft(node);
    for (var i = 0; i < node.State.NumberOfSiblings; i++) {
      var child = node.Children[i];
      LayoutAlgorithm.HorizontalLayout(state, child);

      // we go top-bottom to layout left side of the group,
      // then add a carrier protector
      // then top-bottom to fill right side of the group
      if (++countOnThisSide == maxOnLeft) {
        if (left) {
          // horizontally align children in left pillar
          LayoutAlgorithm.AlignHorizontalCenters(
            state,
            level,
            this.EnumerateSiblings(node, 0, maxOnLeft)
          );

          left = false;
          countOnThisSide = 0;

          var rightmost = Number.MIN_VALUE;
          for (var k = 0; k <= i; k++) {
            rightmost = Math.max(
              rightmost,
              node.Children[k].State.BranchExterior.Right
            );
          }

          // vertical spacer does not have to be extended to the bottom of the lowest branch,
          // unless the lowest branch on the right side has some children and is expanded
          if (node.State.NumberOfSiblings % 2 != 0) {
            rightmost = Math.max(rightmost, child.State.Right);
          } else {
            var opposite = node.Children[node.State.NumberOfSiblings - 1];
            if (opposite.Element.IsCollapsed || opposite.ChildCount == 0) {
              rightmost = Math.max(rightmost, child.State.Right);
            } else {
              rightmost = Math.max(rightmost, child.State.BranchExterior.Right);
            }
          }

          // integrate protector for group's vertical carrier
          // it must prevent boxes on the right side from overlapping the middle vertical connector,
          // so protector's height must be set to height of this entire assistant branch
          const spacer = node.Children[node.State.NumberOfSiblings];

          LayoutAlgorithm.AdjustSpacer(
            spacer.State,
            rightmost,
            node.State.Bottom,
            this.ParentConnectorShield,
            node.State.BranchExterior.Bottom - node.State.Bottom
          );

          level.Boundary.MergeFromNode(spacer);
        }
      }
    }

    // horizontally align children in right pillar
    LayoutAlgorithm.AlignHorizontalCenters(
      state,
      level,
      this.EnumerateSiblings(node, maxOnLeft, node.State.NumberOfSiblings)
    );

    // align children under parent
    if (node.Level > 0 && node.State.NumberOfSiblings > 0) {
      let carrier = node.Children[node.State.NumberOfSiblings].State.CenterH;
      let desiredCenter = node.State.CenterH;
      const diff = desiredCenter - carrier;
      LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
    }
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  public RouteConnectors(state: LayoutState, node: Node): void {
    var count = node.State.NumberOfSiblings;
    if (count == 0) {
      return;
    }

    if (this.NeedCarrierProtector(node)) {
      count++;
    }

    var segments: Edge[] = [];

    var ix = 0;

    // one hook for each child
    var maxOnLeft = this.MaxOnLeft(node);
    var carrier = node.Children[node.State.NumberOfSiblings].State;
    var from = carrier.CenterH;

    var isLeft = true;
    var countOnThisSide = 0;
    var bottomMost = Number.MIN_VALUE;
    for (var i = 0; i < node.State.NumberOfSiblings; i++) {
      var to = isLeft
        ? node.Children[i].State.Right
        : node.Children[i].State.Left;
      var y = node.Children[i].State.CenterV;
      bottomMost = Math.max(bottomMost, y);
      segments[ix++] = new Edge(new Point(from, y), new Point(to, y));

      if (++countOnThisSide == maxOnLeft) {
        countOnThisSide = 0;
        isLeft = !isLeft;
      }
    }

    if (this.NeedCarrierProtector(node)) {
      // one for each vertical carrier
      segments[node.State.NumberOfSiblings] = new Edge(
        new Point(carrier.CenterH, carrier.Top),
        new Point(carrier.CenterH, bottomMost)
      );
    }

    node.State.Connector = new Connector(segments);
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  public GetSupportsAssistants = () => false;

  private MaxOnLeft = (node: Node): number =>
    node.State.NumberOfSiblings / 2 + (node.State.NumberOfSiblings % 2);
  private NeedCarrierProtector = (node: Node): boolean =>
    node.ParentNode?.ChildCount == 0;

  private EnumerateSiblings(node: Node, from: number, to: number): Node[] {
    const nodes: Node[] = [];

    for (var i = from; i < to; i++) {
      nodes.push(node.Children[i]);
    }

    return nodes;
  }
}
