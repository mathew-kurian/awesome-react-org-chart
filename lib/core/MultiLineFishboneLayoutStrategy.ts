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
import ConnectorAlignment from "./ConnectorAlignment";

class GroupIterator {
  private _numberOfSiblings: number;
  private _numberOfGroups: number;

  Group: number = 0;
  FromIndex: number = 0;
  Count: number = 0;
  MaxOnLeft: number = 0;

  constructor(numberOfSiblings: number, numberOfGroups: number) {
    this._numberOfSiblings = numberOfSiblings;
    this._numberOfGroups = numberOfGroups;
  }

  CountInGroup(): number {
    let countInRow = this._numberOfGroups * 2;

    let result = 0;
    let countToThisGroup = this.Group * 2 + 2;
    let firstInRow = 0;
    while (true) {
      let countInThisRow =
        firstInRow >= this._numberOfSiblings - countInRow
          ? this._numberOfSiblings - firstInRow
          : countInRow;
      if (countInThisRow >= countToThisGroup) {
        result += 2;
      } else {
        countToThisGroup--;
        if (countInThisRow >= countToThisGroup) {
          result++;
        }
        break;
      }
      firstInRow += countInRow;
    }

    return result;
  }

  NextGroup(): boolean {
    this.FromIndex = this.FromIndex + this.Count;

    if (this.FromIndex > 0) {
      this.Group++;
    }
    this.Count = this.CountInGroup();
    this.MaxOnLeft = Math.floor(this.Count / 2) + (this.Count % 2);
    return this.Count != 0;
  }
}

class TreeNodeView extends Node {
  constructor(element: Box) {
    super(element);
  }

  Prepare(capacity: number) {
    if (this.Children == null) {
      this.Children = [];
    } else {
      this.Children.length = 0;
    }
  }

  AddChildView(node: Node) {
    this.Children.push(node);
  }
}

class SingleFishboneLayoutAdapter extends LayoutStrategyBase {
  RealRoot: Node;
  SpecialRoot: TreeNodeView;
  Iterator: GroupIterator;

  constructor(realRoot: Node) {
    super();

    this.Iterator = new GroupIterator(
      realRoot.State.NumberOfSiblings,
      realRoot.State.NumberOfSiblingColumns
    );

    this.RealRoot = realRoot;
    this.SpecialRoot = new TreeNodeView(
      Box.Special(Box.None, realRoot.Element.Id, true)
    );
    (this.SpecialRoot.Level = this.RealRoot.Level),
      (this.SpecialRoot.ParentNode = this.RealRoot);

    this.SpecialRoot.State.EffectiveLayoutStrategy = this;

    let parentStrategy = realRoot.State
      .RequireLayoutStrategy as MultiLineFishboneLayoutStrategy;
    this.SiblingSpacing = parentStrategy.SiblingSpacing;
    this.ParentConnectorShield = parentStrategy.ParentConnectorShield;
    this.ParentChildSpacing = parentStrategy.ParentChildSpacing;
    this.ParentAlignment = parentStrategy.ParentAlignment;
    this.ChildConnectorHookLength = parentStrategy.ChildConnectorHookLength;
  }

  NextGroup(): boolean {
    if (!this.Iterator.NextGroup()) {
      return false;
    }

    this.SpecialRoot.State.NumberOfSiblings = this.Iterator.Count;
    this.SpecialRoot.Prepare(this.RealRoot.State.NumberOfSiblingRows * 2);

    for (let i = 0; i < this.Iterator.Count; i++) {
      this.SpecialRoot.AddChildView(
        this.RealRoot.Children[this.Iterator.FromIndex + i]
      );
    }
    let spacer = this.RealRoot.Children[
      this.RealRoot.State.NumberOfSiblings + 1 + this.Iterator.Group
    ];
    this.SpecialRoot.AddChildView(spacer);

    LayoutAlgorithm.CopyExteriorFrom(
      this.SpecialRoot.State,
      this.RealRoot.State
    );
    return true;
  }

  PreProcessThisNode(state: LayoutState, node: Node) {
    throw new Error("NotSupportedException");
  }

  ApplyVerticalLayout(state: LayoutState, level: LayoutLevel) {
    if (this.SpecialRoot.State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }

    let prevRowBottom =
      this.RealRoot.AssistantsRoot?.State.BranchExterior.Bottom ??
      this.SpecialRoot.State.SiblingsRowV.To;

    for (let i = 0; i < this.Iterator.MaxOnLeft; i++) {
      let spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;

      let child = this.SpecialRoot.Children[i];
      let frame = child.State;
      LayoutAlgorithm.MoveTo(frame, frame.Left, prevRowBottom + spacing);

      let rowExterior = new Dimensions(frame.Top, frame.Bottom);
      let i2 = i + this.Iterator.MaxOnLeft;

      if (frame.Size == null) {
        throw Error("Size is null");
      }

      if (i2 < this.Iterator.Count) {
        let child2 = this.SpecialRoot.Children[i2];
        let frame2 = child2.State;
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

  ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    if (level.BranchRoot != this.SpecialRoot) {
      throw new Error("InvalidOperationException: Wrong root node received");
    }

    let left = true;
    let countOnThisSide = 0;
    for (let i = 0; i < this.Iterator.Count; i++) {
      let child = this.SpecialRoot.Children[i];
      LayoutAlgorithm.HorizontalLayout(state, child);

      // we go top-bottom to layout left side of the group,
      // then add a carrier protector
      // then top-bottom to fill right side of the group
      if (++countOnThisSide == this.Iterator.MaxOnLeft) {
        if (left) {
          // horizontally align children in left pillar
          LayoutAlgorithm.AlignHorizontalCenters(
            state,
            level,
            this.EnumerateSiblings(0, this.Iterator.MaxOnLeft)
          );

          left = false;
          countOnThisSide = 0;

          let rightmost = Number.MIN_VALUE;
          for (let k = 0; k < i; k++) {
            rightmost = Math.max(
              rightmost,
              this.SpecialRoot.Children[k].State.BranchExterior.Right
            );
          }

          rightmost = Math.max(rightmost, child.State.Right);

          // integrate protector for group's vertical carrier
          let spacer = this.SpecialRoot.Children[
            this.SpecialRoot.State.NumberOfSiblings
          ];

          if (this.SpecialRoot.Children[0].State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
          }

          if (child.State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
          }

          LayoutAlgorithm.AdjustSpacer(
            spacer.State,
            rightmost,
            this.SpecialRoot.Children[0].State.SiblingsRowV.From,
            this.SiblingSpacing,
            child.State.SiblingsRowV.To -
              this.SpecialRoot.Children[0].State.SiblingsRowV.From
          );

          level.Boundary.MergeFromNode(spacer);
        }
      }
    }
    // horizontally align children in right pillar
    LayoutAlgorithm.AlignHorizontalCenters(
      state,
      level,
      this.EnumerateSiblings(this.Iterator.MaxOnLeft, this.Iterator.Count)
    );
  }

  EnumerateSiblings(from: number, to: number): Node[] {
    const nodes: Node[] = [];
    for (let i = from; i < to; i++) {
      nodes.push(this.SpecialRoot.Children[i]);
    }

    return nodes;
  }

  RouteConnectors(state: LayoutState, node: Node) {
    throw new Error();
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  GetSupportsAssistants = () => false;
}

export default class MultiLineFishboneLayoutStrategy extends LinearLayoutStrategy {
  /// <summary>
  /// Maximum number of boxes staffed onto a single vertical carrier.
  /// </summary>
  MaxGroups: number = 4;

  /// <summary>
  /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
  /// </summary>
  public PreProcessThisNode(state: LayoutState, node: Node) {
    if (this.MaxGroups <= 0) {
      throw new Error("MaxGroups must be a positive value");
    }

    if (node.ChildCount <= this.MaxGroups * 2) {
      super.PreProcessThisNode(state, node);
      return;
    }

    node.State.NumberOfSiblings = node.ChildCount;

    // only add spacers for non-collapsed boxes
    if (node.State.NumberOfSiblings > 0) {
      // using column == group here,
      // and each group consists of two vertical stretches of boxes with a vertical carrier in between
      node.State.NumberOfSiblingColumns = this.MaxGroups;
      node.State.NumberOfSiblingRows = Math.floor(
        node.State.NumberOfSiblings / (this.MaxGroups * 2)
      );
      if (node.State.NumberOfSiblings % (this.MaxGroups * 2) != 0) {
        node.State.NumberOfSiblingRows++;
      }

      // a connector from parent to horizontal carrier
      let parentSpacer = Box.Special(Box.None, node.Element.Id, false);
      node.AddRegularChildBox(parentSpacer);

      // spacers for vertical carriers
      for (let i = 0; i < node.State.NumberOfSiblingColumns; i++) {
        let verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.AddRegularChildBox(verticalSpacer);
      }

      // if needed, horizontal carrier
      if (node.State.NumberOfSiblingColumns > 1) {
        let horizontalSpacer = Box.Special(Box.None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyVerticalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
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

    let adapter = new SingleFishboneLayoutAdapter(node);
    while (adapter.NextGroup()) {
      LayoutAlgorithm.VerticalLayout(state, adapter.SpecialRoot);
    }
  }

  /// <summary>
  /// Applies layout changes to a given box and its children.
  /// </summary>
  public ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel) {
    let node = level.BranchRoot;

    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
      super.ApplyHorizontalLayout(state, level);
      return;
    }

    if (node.Level == 0) {
      node.State.SiblingsRowV = new Dimensions(
        node.State.Top,
        node.State.Bottom
      );
    }

    if (node.AssistantsRoot != null) {
      LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
    }

    let adapter = new SingleFishboneLayoutAdapter(node);
    while (adapter.NextGroup()) {
      LayoutAlgorithm.HorizontalLayout(state, adapter.SpecialRoot);
    }

    let rect = node.State;

    // now align child nodes under the parent
    if (node.Level > 0) {
      let diff: number = 0;
      if (node.State.NumberOfSiblingColumns > 1) {
        let leftCarrier =
          node.Children[node.State.NumberOfSiblings + 1].State.CenterH;
        let rightCarrier =
          node.Children[
            node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns
          ].State.CenterH;

        let desiredCenter =
          node.State.NumberOfSiblings == 1 ||
          this.ParentAlignment == BranchParentAlignment.Center
            ? leftCarrier + (rightCarrier - leftCarrier) / 2
            : this.ParentAlignment == BranchParentAlignment.Left
            ? leftCarrier + this.ChildConnectorHookLength
            : rightCarrier - this.ChildConnectorHookLength;

        //let desiredCenter = (leftCarrier + rightCarrier)/2.0;
        diff = rect.CenterH - desiredCenter;
      } else {
        let carrier =
          node.Children[1 + node.State.NumberOfSiblings].State.CenterH;
        let desiredCenter = rect.CenterH;
        diff = desiredCenter - carrier;
      }
      LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
    }

    if (node.Level > 0) {
      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }

      // vertical connector from parent
      let ix = node.State.NumberOfSiblings;
      let verticalSpacer = node.Children[ix];
      LayoutAlgorithm.AdjustSpacer(
        verticalSpacer.State,
        rect.CenterH - this.ParentConnectorShield / 2,
        rect.Bottom,
        this.ParentConnectorShield,
        node.Children[0].State.SiblingsRowV.From - rect.Bottom
      );
      state.MergeSpacer(verticalSpacer);
      ix++;

      // vertical carriers already merged in
      ix += node.State.NumberOfSiblingColumns;

      if (node.State.NumberOfSiblingColumns > 1) {
        // have a horizontal carrier
        let horizontalSpacer = node.Children[ix];
        let leftmost =
          node.Children[node.State.NumberOfSiblings + 1].State.TopLeft;
        let rightmost = node.Children[ix - 1].State.Right;
        LayoutAlgorithm.AdjustSpacer(
          horizontalSpacer.State,
          leftmost.X,
          leftmost.Y - this.ParentChildSpacing,
          rightmost - leftmost.X,
          this.ParentChildSpacing
        );
        state.MergeSpacer(horizontalSpacer);
      }
    }
  }

  /// <summary>
  /// Allocates and routes connectors.
  /// </summary>
  public RouteConnectors(state: LayoutState, node: Node) {
    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
      super.RouteConnectors(state, node);
      return;
    }

    let count =
      1 + // one parent connector
      node.State.NumberOfSiblings + // one hook for each child
      node.State.NumberOfSiblingColumns; // one for each vertical carrier
    if (node.State.NumberOfSiblingColumns > 1) {
      // also have a horizontal carrier
      count++;
    }

    let segments: Edge[] = [];

    let rootRect = node.State;
    let center = rootRect.CenterH;

    let ix = 0;

    if (node.Children[0].State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }

    const rootRectV =
      this.ConnectorAlignment === ConnectorAlignment.Center
        ? rootRect.CenterV
        : rootRect.Bottom;

    // parent connector
    let space = node.Children[0].State.SiblingsRowV.From - rootRectV;
    segments[ix++] = new Edge(
      new Point(center, rootRectV),
      new Point(center, rootRectV + space - this.ChildConnectorHookLength)
    );

    // one hook for each child
    let iterator = new GroupIterator(
      node.State.NumberOfSiblings,
      node.State.NumberOfSiblingColumns
    );
    while (iterator.NextGroup()) {
      let carrier =
        node.Children[1 + node.State.NumberOfSiblings + iterator.Group].State;
      let from = carrier.CenterH;

      let isLeft = true;
      let countOnThisSide = 0;
      for (
        let i = iterator.FromIndex;
        i < iterator.FromIndex + iterator.Count;
        i++
      ) {
        let to =
          this.ConnectorAlignment === ConnectorAlignment.Center
            ? node.Children[i].State.CenterH
            : isLeft
            ? node.Children[i].State.Right
            : node.Children[i].State.Left;
        let y = node.Children[i].State.CenterV;
        segments[ix++] = new Edge(new Point(from, y), new Point(to, y));

        if (++countOnThisSide == iterator.MaxOnLeft) {
          countOnThisSide = 0;
          if (isLeft) {
            // one for each vertical carrier
            segments[
              1 + node.State.NumberOfSiblings + iterator.Group
            ] = new Edge(
              new Point(
                carrier.CenterH,
                carrier.Top - this.ChildConnectorHookLength
              ),
              new Point(carrier.CenterH, node.Children[i].State.CenterV)
            );
          }
          isLeft = !isLeft;
        }
      }
    }

    // vertical carriers already created
    ix += node.State.NumberOfSiblingColumns;

    if (node.State.NumberOfSiblingColumns > 1) {
      let leftGroup = node.Children[1 + node.State.NumberOfSiblings].State;
      let rightGroup =
        node.Children[
          1 +
            node.State.NumberOfSiblings +
            node.State.NumberOfSiblingColumns -
            1
        ].State;

      // one horizontal carrier
      segments[ix] = new Edge(
        new Point(
          leftGroup.CenterH,
          leftGroup.Top - this.ChildConnectorHookLength
        ),
        new Point(
          rightGroup.CenterH,
          rightGroup.Top - this.ChildConnectorHookLength
        )
      );
    }

    node.State.Connector = new Connector(segments);
  }

  /// <summary>
  /// <c>true</c> if this strategy supports special layout for assistant boxes.
  /// If not, assistants will be processed as part of normal children group.
  /// </summary>
  public GetSupportsAssistants = () => true;

  /// <summary>
  /// Implements layout for a single vertically stretched fishbone.
  /// Re-used by <see cref="MultiLineFishboneLayoutStrategy"/> to layout multiple groups of siblings.
  /// </summary>
}
