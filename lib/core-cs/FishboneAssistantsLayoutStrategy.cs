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
    /// Arranges "assistant" child boxes in a single vertically stretched group, stuffed onto "fish bones" on left and right sides of vertical carrier.
    /// Can only be configured to position parent in the middle of children.
    /// </summary>
    public class FishboneAssistantsLayoutStrategy : LayoutStrategyBase
    {
        /// <summary>
        /// A chance for layout strategy to append special auto-generated boxes into the visual tree. 
        /// </summary>
        public override void PreProcessThisNode([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            node.State.NumberOfSiblings = node.ChildCount;

            // only add spacers for non-collapsed boxes
            if (node.State.NumberOfSiblings > 0)
            {
                // using column == group here, 
                // and each group consists of two vertical stretches of boxes with a vertical carrier in between
                node.State.NumberOfSiblingColumns = 1;
                node.State.NumberOfSiblingRows = node.State.NumberOfSiblings/2;
                if (node.State.NumberOfSiblings%2 != 0)
                {
                    node.State.NumberOfSiblingRows++;
                }

                // a vertical carrier from parent 
                var spacer = Box.Special(Box.None, node.Element.Id, false);
                node.AddRegularChild(spacer);
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyVerticalLayout([NotNull] LayoutState state, [NotNull] LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;
            if (node.Level == 0)
            {
                throw new InvalidOperationException("Should never be invoked on root node");
            }

            var prevRowBottom = node.State.SiblingsRowV.To;

            var maxOnLeft = MaxOnLeft(node);
            for (var i = 0; i < maxOnLeft; i++)
            {
                var spacing = i == 0 ? ParentChildSpacing : SiblingSpacing;

                var child = node.Children[i];
                var frame = child.State;
                frame.MoveTo(frame.Left, prevRowBottom + spacing);

                var rowExterior = new Dimensions(frame.Top, frame.Bottom);

                var i2 = i + maxOnLeft;
                if (i2 < node.State.NumberOfSiblings)
                {
                    var child2 = node.Children[i2];
                    var frame2 = child2.State;
                    frame2.MoveTo(frame2.Left, prevRowBottom + spacing);

                    if (frame2.Bottom > frame.Bottom)
                    {
                        frame.MoveTo(frame.Left, frame2.CenterV - frame.Size.Height/2);
                    }
                    else if (frame2.Bottom < frame.Bottom)
                    {
                        frame2.MoveTo(frame2.Left, frame.CenterV - frame2.Size.Height/2);
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

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyHorizontalLayout([NotNull] LayoutState state, [NotNull] LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;
            if (node.Level == 0)
            {
                node.State.SiblingsRowV = new Dimensions(node.State.Top, node.State.Bottom);
            }

            var left = true;
            var countOnThisSide = 0;
            var maxOnLeft = MaxOnLeft(node);
            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var child = node.Children[i];
                LayoutAlgorithm.HorizontalLayout(state, child);

                // we go top-bottom to layout left side of the group,
                // then add a carrier protector
                // then top-bottom to fill right side of the group
                if (++countOnThisSide == maxOnLeft)
                {
                    if (left)
                    {
                        // horizontally align children in left pillar
                        LayoutAlgorithm.AlignHorizontalCenters(state, level, EnumerateSiblings(node, 0, maxOnLeft));

                        left = false;
                        countOnThisSide = 0;

                        var rightmost = double.MinValue;
                        for (var k = 0; k <= i; k++)
                        {
                            rightmost = Math.Max(rightmost, node.Children[k].State.BranchExterior.Right);
                        }

                        // vertical spacer does not have to be extended to the bottom of the lowest branch,
                        // unless the lowest branch on the right side has some children and is expanded
                        if (node.State.NumberOfSiblings % 2 != 0)
                        {
                            rightmost = Math.Max(rightmost, child.State.Right);
                        }
                        else
                        {
                            var opposite = node.Children[node.State.NumberOfSiblings - 1];
                            if (opposite.Element.IsCollapsed || opposite.ChildCount == 0)
                            {
                                rightmost = Math.Max(rightmost, child.State.Right);
                            }
                            else
                            {
                                rightmost = Math.Max(rightmost, child.State.BranchExterior.Right);
                            }
                        }

                        // integrate protector for group's vertical carrier 
                        // it must prevent boxes on the right side from overlapping the middle vertical connector,
                        // so protector's height must be set to height of this entire assistant branch
                        var spacer = node.Children[node.State.NumberOfSiblings];
                        spacer.State.AdjustSpacer(
                            rightmost,
                            node.State.Bottom,
                            ParentConnectorShield,
                            node.State.BranchExterior.Bottom - node.State.Bottom
                        );
                        level.Boundary.MergeFrom(spacer);
                    }
                }
            }

            // horizontally align children in right pillar
            LayoutAlgorithm.AlignHorizontalCenters(state, level, EnumerateSiblings(node, maxOnLeft, node.State.NumberOfSiblings));

            // align children under parent
            if (node.Level > 0 && node.State.NumberOfSiblings > 0)
            {
                double diff;
                var carrier = node.Children[node.State.NumberOfSiblings].State.CenterH;
                var desiredCenter = node.State.CenterH;
                diff = desiredCenter - carrier;
                LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
            }
        }

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public override void RouteConnectors([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            var count = node.State.NumberOfSiblings;
            if (count == 0)
            {
                return;
            }

            if (NeedCarrierProtector(node))
            {
                count++;
            }

            var segments = new Edge[count];

            var ix = 0;

            // one hook for each child
            var maxOnLeft = MaxOnLeft(node);
            var carrier = node.Children[node.State.NumberOfSiblings].State;
            var from = carrier.CenterH;

            var isLeft = true;
            var countOnThisSide = 0;
            var bottomMost = double.MinValue;
            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var to = isLeft ? node.Children[i].State.Right : node.Children[i].State.Left;
                var y = node.Children[i].State.CenterV;
                bottomMost = Math.Max(bottomMost, y);
                segments[ix++] = new Edge(new Point(from, y), new Point(to, y));

                if (++countOnThisSide == maxOnLeft)
                {
                    countOnThisSide = 0;
                    isLeft = !isLeft;
                }
            }

            if (NeedCarrierProtector(node))
            {
                // one for each vertical carrier
                segments[node.State.NumberOfSiblings] = new Edge(
                    new Point(carrier.CenterH, carrier.Top), 
                    new Point(carrier.CenterH, bottomMost));
            }

            node.State.Connector = new Connector(segments);
        }

        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        public override bool SupportsAssistants => false;

        private int MaxOnLeft(BoxTree.Node node) => node.State.NumberOfSiblings/2 + node.State.NumberOfSiblings % 2;
        private bool NeedCarrierProtector(BoxTree.Node node) => node.ParentNode.ChildCount == 0;

        private IEnumerable<BoxTree.Node> EnumerateSiblings(BoxTree.Node node, int from, int to)
        {
            for (var i = from; i < to; i++)
            {
                yield return node.Children[i];
            }
        }
    }
}