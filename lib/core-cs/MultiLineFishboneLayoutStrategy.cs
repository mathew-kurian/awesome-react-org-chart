/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Collections.Generic;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Arranges child boxes in multiple vertically stretched groups, stuffed onto "fish bones" on left and right sides of vertical carriers,
    /// with only one main horizontal carrier going under parent's bottom, connecting all vertical carriers.
    /// Can only be configured to position parent in the middle of children.
    /// </summary>
    public class MultiLineFishboneLayoutStrategy : LinearLayoutStrategy
    {
        /// <summary>
        /// Maximum number of boxes staffed onto a single vertical carrier.
        /// </summary>
        public int MaxGroups = 4;

        /// <summary>
        /// A chance for layout strategy to append special auto-generated boxes into the visual tree. 
        /// </summary>
        public override void PreProcessThisNode([NotNull]LayoutState state, [NotNull] BoxTree.Node node)
        {
            if (MaxGroups <= 0)
            {
                throw new InvalidOperationException(nameof(MaxGroups) + " must be a positive value");
            }

            if (node.ChildCount <= MaxGroups*2)
            {
                base.PreProcessThisNode(state, node);
                return;
            }

            node.State.NumberOfSiblings = node.ChildCount;

            // only add spacers for non-collapsed boxes
            if (node.State.NumberOfSiblings > 0)
            {
                // using column == group here, 
                // and each group consists of two vertical stretches of boxes with a vertical carrier in between
                node.State.NumberOfSiblingColumns = MaxGroups;
                node.State.NumberOfSiblingRows = node.State.NumberOfSiblings/(MaxGroups*2);
                if (node.State.NumberOfSiblings%(MaxGroups*2) != 0)
                {
                    node.State.NumberOfSiblingRows++;
                }

                // a connector from parent to horizontal carrier
                var parentSpacer = Box.Special(Box.None, node.Element.Id, false);
                node.AddRegularChild(parentSpacer);

                // spacers for vertical carriers 
                for (var i = 0; i < node.State.NumberOfSiblingColumns; i++)
                {
                    var verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
                    node.AddRegularChild(verticalSpacer);
                }

                // if needed, horizontal carrier 
                if (node.State.NumberOfSiblingColumns > 1)
                {
                    var horizontalSpacer = Box.Special(Box.None, node.Element.Id, false);
                    node.AddRegularChild(horizontalSpacer);
                }
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyVerticalLayout([NotNull]LayoutState state, [NotNull]LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;

            if (node.State.NumberOfSiblings <= MaxGroups * 2)
            {
                base.ApplyVerticalLayout(state, level);
                return;
            }

            if (node.Level == 0)
            {
                node.State.SiblingsRowV = new Dimensions(node.State.Top, node.State.Bottom);
            }

            if (node.AssistantsRoot != null)
            {
                // assistants root has to be initialized with main node's exterior 
                node.AssistantsRoot.State.CopyExteriorFrom(node.State);
                LayoutAlgorithm.VerticalLayout(state, node.AssistantsRoot);
            }

            var adapter = new SingleFishboneLayoutAdapter(node);
            while (adapter.NextGroup())
            {   
                LayoutAlgorithm.VerticalLayout(state, adapter.SpecialRoot);
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyHorizontalLayout([NotNull]LayoutState state, [NotNull]LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;

            if (node.State.NumberOfSiblings <= MaxGroups*2)
            {
                base.ApplyHorizontalLayout(state, level);
                return;
            }

            if (node.Level == 0)
            {
                node.State.SiblingsRowV = new Dimensions(node.State.Top, node.State.Bottom);
            }

            if (node.AssistantsRoot != null)
            {
                LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
            }

            var adapter = new SingleFishboneLayoutAdapter(node);
            while (adapter.NextGroup())
            {
                LayoutAlgorithm.HorizontalLayout(state, adapter.SpecialRoot);
            }

            var rect = node.State;

            // now align child nodes under the parent
            if (node.Level > 0)
            {
                double diff;
                if (node.State.NumberOfSiblingColumns > 1)
                {
                    var leftCarrier = node.Children[node.State.NumberOfSiblings + 1].State.CenterH;
                    var rightCarrier = node.Children[node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns].State.CenterH;

                    var desiredCenter =
                    node.State.NumberOfSiblings == 1 || ParentAlignment == BranchParentAlignment.Center
                    ? leftCarrier + (rightCarrier - leftCarrier) / 2
                    : ParentAlignment == BranchParentAlignment.Left
                    ? leftCarrier + ChildConnectorHookLength
                    : rightCarrier - ChildConnectorHookLength;

                    //var desiredCenter = (leftCarrier + rightCarrier)/2.0;
                    diff = rect.CenterH - desiredCenter;
                }
                else
                {
                    var carrier = node.Children[1 + node.State.NumberOfSiblings].State.CenterH;
                    var desiredCenter = rect.CenterH;
                    diff = desiredCenter - carrier;
                }
                LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
            }

            if (node.Level > 0)
            {
                // vertical connector from parent
                var ix = node.State.NumberOfSiblings;
                var verticalSpacer = node.Children[ix];
                verticalSpacer.State.AdjustSpacer(
                    rect.CenterH - ParentConnectorShield/2, rect.Bottom,
                    ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
                state.MergeSpacer(verticalSpacer);
                ix++;

                // vertical carriers already merged in
                ix += node.State.NumberOfSiblingColumns;

                if (node.State.NumberOfSiblingColumns > 1)
                {
                    // have a horizontal carrier
                    var horizontalSpacer = node.Children[ix];
                    var leftmost = node.Children[node.State.NumberOfSiblings + 1].State.TopLeft;
                    var rightmost = node.Children[ix - 1].State.Right;
                    horizontalSpacer.State.AdjustSpacer(
                        leftmost.X, leftmost.Y - ParentChildSpacing,
                        rightmost - leftmost.X, ParentChildSpacing);
                    state.MergeSpacer(horizontalSpacer);
                }
            }
        }

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public override void RouteConnectors([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            if (node.State.NumberOfSiblings <= MaxGroups * 2)
            {
                base.RouteConnectors(state, node);
                return;
            }

            var count = 1 // one parent connector
                        + node.State.NumberOfSiblings // one hook for each child
                        + node.State.NumberOfSiblingColumns; // one for each vertical carrier
            if (node.State.NumberOfSiblingColumns > 1)
            {
                // also have a horizontal carrier
                count++;
            }

            var segments = new Edge[count];

            var rootRect = node.State;
            var center = rootRect.CenterH;

            var ix = 0;

            // parent connector
            var space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;
            segments[ix++] = new Edge(new Point(center, rootRect.Bottom),
                new Point(center, rootRect.Bottom + space - ChildConnectorHookLength));

            // one hook for each child
            var iterator = new SingleFishboneLayoutAdapter.GroupIterator(node.State.NumberOfSiblings, node.State.NumberOfSiblingColumns);
            while (iterator.NextGroup())
            {
                var carrier = node.Children[1 + node.State.NumberOfSiblings + iterator.Group].State;
                var from = carrier.CenterH;

                var isLeft = true;
                var countOnThisSide = 0;
                for (var i = iterator.FromIndex; i < iterator.FromIndex + iterator.Count; i++)
                {
                    var to = isLeft ? node.Children[i].State.Right : node.Children[i].State.Left;
                    var y = node.Children[i].State.CenterV;
                    segments[ix++] = new Edge(new Point(from, y), new Point(to, y));

                    if (++countOnThisSide == iterator.MaxOnLeft)
                    {
                        countOnThisSide = 0;
                        if (isLeft)
                        {
                            // one for each vertical carrier
                            segments[1 + node.State.NumberOfSiblings + iterator.Group] = new Edge(
                                new Point(carrier.CenterH, carrier.Top - ChildConnectorHookLength),
                                new Point(carrier.CenterH, node.Children[i].State.CenterV));
                        }
                        isLeft = !isLeft;
                    }
                }
            }

            // vertical carriers already created
            ix += node.State.NumberOfSiblingColumns;

            if (node.State.NumberOfSiblingColumns > 1)
            {
                var leftGroup = node.Children[1 + node.State.NumberOfSiblings].State;
                var rightGroup = node.Children[1 + node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns - 1].State;

                // one horizontal carrier
                segments[ix] = new Edge(
                    new Point(leftGroup.CenterH, leftGroup.Top - ChildConnectorHookLength),
                    new Point(rightGroup.CenterH, rightGroup.Top - ChildConnectorHookLength));
            }

            node.State.Connector = new Connector(segments);
        }

        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        public override bool SupportsAssistants => true;

        /// <summary>
        /// Implements layout for a single vertically stretched fishbone.
        /// Re-used by <see cref="MultiLineFishboneLayoutStrategy"/> to layout multiple groups of siblings.
        /// </summary>
        private class SingleFishboneLayoutAdapter : LayoutStrategyBase
        {
            public class GroupIterator
            {
                private readonly int m_numberOfSiblings;
                private readonly int m_numberOfGroups;

                public int Group;
                public int FromIndex;
                public int Count;
                public int MaxOnLeft;

                public GroupIterator(int numberOfSiblings, int numberOfGroups)
                {
                    m_numberOfSiblings = numberOfSiblings;
                    m_numberOfGroups = numberOfGroups;
                }

                public int CountInGroup()
                {
                    var countInRow = m_numberOfGroups * 2;

                    var result = 0;
                    var countToThisGroup = Group * 2 + 2;
                    var firstInRow = 0;
                    while (true)
                    {
                        var countInThisRow = firstInRow >= m_numberOfSiblings - countInRow ? m_numberOfSiblings - firstInRow : countInRow;
                        if (countInThisRow >= countToThisGroup)
                        {
                            result += 2;
                        }
                        else
                        {
                            countToThisGroup--;
                            if (countInThisRow >= countToThisGroup)
                            {
                                result++;
                            }
                            break;
                        }
                        firstInRow += countInRow;
                    }

                    return result;
                }

                public bool NextGroup()
                {
                    FromIndex = FromIndex + Count;

                    if (FromIndex > 0)
                    {
                        Group++;
                    }
                    Count = CountInGroup();
                    MaxOnLeft = Count / 2 + Count % 2;
                    return Count != 0;
                }
            }

            public class TreeNodeView : BoxTree.Node
            {
                public TreeNodeView([NotNull] Box element) : base(element)
                {
                }

                public void Prepare(int capacity)
                {
                    if (Children == null)
                    {
                        Children = new List<BoxTree.Node>(capacity);
                    }
                    else
                    {
                        Children.Clear();
                    }
                }

                public void AddChildView(BoxTree.Node node)
                {
                    Children.Add(node);
                }
            }

            public readonly BoxTree.Node RealRoot;
            public readonly TreeNodeView SpecialRoot;
            public readonly GroupIterator Iterator;

            public SingleFishboneLayoutAdapter([NotNull]BoxTree.Node realRoot)
            {
                Iterator = new GroupIterator(realRoot.State.NumberOfSiblings, realRoot.State.NumberOfSiblingColumns);

                RealRoot = realRoot;
                SpecialRoot = new TreeNodeView(Box.Special(Box.None, realRoot.Element.Id, true))
                {
                    Level = RealRoot.Level,
                    ParentNode = RealRoot
                };

                SpecialRoot.State.EffectiveLayoutStrategy = this;

                var parentStrategy = (MultiLineFishboneLayoutStrategy)realRoot.State.RequireLayoutStrategy();
                SiblingSpacing = parentStrategy.SiblingSpacing;
                ParentConnectorShield = parentStrategy.ParentConnectorShield;
                ParentChildSpacing = parentStrategy.ParentChildSpacing;
                ParentAlignment = parentStrategy.ParentAlignment;
                ChildConnectorHookLength = parentStrategy.ChildConnectorHookLength;
            }

            public bool NextGroup()
            {
                if (!Iterator.NextGroup())
                {
                    return false;
                }

                SpecialRoot.State.NumberOfSiblings = Iterator.Count;
                SpecialRoot.Prepare(RealRoot.State.NumberOfSiblingRows * 2);

                for (var i = 0; i < Iterator.Count; i++)
                {
                    SpecialRoot.AddChildView(RealRoot.Children[Iterator.FromIndex + i]);
                }
                var spacer = RealRoot.Children[RealRoot.State.NumberOfSiblings + 1 + Iterator.Group];
                SpecialRoot.AddChildView(spacer);

                SpecialRoot.State.CopyExteriorFrom(RealRoot.State);
                return true;
            }

            public override void PreProcessThisNode(LayoutState state, BoxTree.Node node)
            {
                throw new NotSupportedException();
            }

            public override void ApplyVerticalLayout(LayoutState state, [NotNull]LayoutState.LayoutLevel level)
            {
                var prevRowBottom = 
                    RealRoot.AssistantsRoot?.State.BranchExterior.Bottom 
                    ?? SpecialRoot.State.SiblingsRowV.To;
                
                for (var i = 0; i < Iterator.MaxOnLeft; i++)
                {
                    var spacing = i == 0 ? ParentChildSpacing : SiblingSpacing;

                    var child = SpecialRoot.Children[i];
                    var frame = child.State;
                    frame.MoveTo(frame.Left, prevRowBottom + spacing);

                    var rowExterior = new Dimensions(frame.Top, frame.Bottom);

                    var i2 = i + Iterator.MaxOnLeft;
                    if (i2 < Iterator.Count)
                    {
                        var child2 = SpecialRoot.Children[i2];
                        var frame2 = child2.State;
                        frame2.MoveTo(frame2.Left, prevRowBottom + spacing);

                        if (frame2.Bottom > frame.Bottom)
                        {
                            frame.MoveTo(frame.Left, frame2.CenterV - frame.Size.Height/2);
                        }
                        else if (frame2.Bottom < frame.Bottom)
                        {
                            frame2.MoveTo(frame2.Left, frame.CenterV - frame2.Size.Height / 2);
                        }

                        frame2.BranchExterior = new Rect(frame2.TopLeft, frame2.Size);
                        rowExterior += new Dimensions(frame2.Top, frame2.Bottom);

                        frame2.SiblingsRowV = rowExterior;
                        LayoutAlgorithm.VerticalLayout(state, child2);
                        prevRowBottom = frame2.BranchExterior.Bottom;
                    }

                    frame.BranchExterior = new Rect(frame.TopLeft, frame.Size);
                    frame.SiblingsRowV = rowExterior;
                    LayoutAlgorithm.VerticalLayout(state, child);
                    prevRowBottom = Math.Max(prevRowBottom, frame.BranchExterior.Bottom);
                }
            }

            public override void ApplyHorizontalLayout(LayoutState state, [NotNull]LayoutState.LayoutLevel level)
            {
                if (level.BranchRoot != SpecialRoot)
                {
                    throw new InvalidOperationException("Wrong root node received");
                }

                var left = true;
                var countOnThisSide = 0;
                for (var i = 0; i < Iterator.Count; i++)
                {
                    var child = SpecialRoot.Children[i];
                    LayoutAlgorithm.HorizontalLayout(state, child);

                    // we go top-bottom to layout left side of the group,
                    // then add a carrier protector
                    // then top-bottom to fill right side of the group
                    if (++countOnThisSide == Iterator.MaxOnLeft)
                    {
                        if (left)
                        {
                            // horizontally align children in left pillar
                            LayoutAlgorithm.AlignHorizontalCenters(state, level, EnumerateSiblings(0, Iterator.MaxOnLeft));

                            left = false;
                            countOnThisSide = 0;

                            var rightmost = double.MinValue;
                            for (var k = 0; k < i; k++)
                            {
                                rightmost = Math.Max(rightmost, SpecialRoot.Children[k].State.BranchExterior.Right);
                            }

                            rightmost = Math.Max(rightmost, child.State.Right);
                            
                            // integrate protector for group's vertical carrier 
                            var spacer = SpecialRoot.Children[SpecialRoot.State.NumberOfSiblings];

                            spacer.State.AdjustSpacer(
                                rightmost, SpecialRoot.Children[0].State.SiblingsRowV.From,
                                SiblingSpacing, child.State.SiblingsRowV.To - SpecialRoot.Children[0].State.SiblingsRowV.From);
                            level.Boundary.MergeFrom(spacer);
                        }
                    }
                }
                // horizontally align children in right pillar
                LayoutAlgorithm.AlignHorizontalCenters(state, level, EnumerateSiblings(Iterator.MaxOnLeft, Iterator.Count));
            }

            private IEnumerable<BoxTree.Node> EnumerateSiblings(int from, int to)
            {
                for (var i = from; i < to; i++)
                {
                    yield return SpecialRoot.Children[i];
                }
            }

            public override void RouteConnectors(LayoutState state, BoxTree.Node node)
            {
                throw new NotSupportedException();
            }


            /// <summary>
            /// <c>true</c> if this strategy supports special layout for assistant boxes.
            /// If not, assistants will be processed as part of normal children group.
            /// </summary>
            public override bool SupportsAssistants => false;
        }
    }
}