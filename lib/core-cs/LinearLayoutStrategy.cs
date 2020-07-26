/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Arranges child boxes in a single line under the parent.
    /// Can be configured to position parent in the middle, on the left or right from children.
    /// </summary>
    public class LinearLayoutStrategy : LayoutStrategyBase
    {
        /// <summary>
        /// A chance for layout strategy to append special auto-generated boxes into the visual tree. 
        /// </summary>
        public override void PreProcessThisNode([NotNull]LayoutState state, [NotNull] BoxTree.Node node)
        {
            if (node.ChildCount > 0)
            {
                node.State.NumberOfSiblings = node.Element.IsCollapsed ? 0 : node.ChildCount;

                // only add spacers for non-collapsed boxes
                if (!node.Element.IsCollapsed)
                {
                    var verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
                    node.AddRegularChild(verticalSpacer);

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

            if (node.Level == 0)
            {
                node.State.SiblingsRowV = new Dimensions(
                    node.State.Top, 
                    node.State.Bottom);
            }

            if (node.AssistantsRoot != null)
            {
                // assistants root has to be initialized with main node's exterior 
                node.AssistantsRoot.State.CopyExteriorFrom(node.State);
                LayoutAlgorithm.VerticalLayout(state, node.AssistantsRoot);
            }

            if (node.State.NumberOfSiblings == 0)
            {
                return;
            }
            
            var siblingsRowExterior = Dimensions.MinMax();

            var top = node.AssistantsRoot == null 
                ? node.State.SiblingsRowV.To + ParentChildSpacing
                : node.State.BranchExterior.Bottom + ParentChildSpacing;
            
            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var child = node.Children[i];
                var rect = child.State;
                
                child.State.MoveTo(0, top);
                child.State.BranchExterior = new Rect(child.State.TopLeft, child.State.Size);

                siblingsRowExterior += new Dimensions(top, top + rect.Size.Height);
            }

            siblingsRowExterior = new Dimensions(siblingsRowExterior.From, siblingsRowExterior.To);

            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var child = node.Children[i];
                child.State.SiblingsRowV = siblingsRowExterior;

                // re-enter layout algorithm for child branch
                LayoutAlgorithm.VerticalLayout(state, child);
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyHorizontalLayout([NotNull]LayoutState state, [NotNull]LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;

            if (node.AssistantsRoot != null)
            {
                LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
            }

            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var child = node.Children[i];
                // re-enter layout algorithm for child branch
                LayoutAlgorithm.HorizontalLayout(state, child);
            }
            
            if (node.Level > 0 && node.ChildCount > 0)
            {
                var rect = node.State;
                var leftmost = node.Children[0].State.CenterH;
                var rightmost = node.Children[node.State.NumberOfSiblings - 1].State.CenterH;
                var desiredCenter = 
                    node.State.NumberOfSiblings == 1 || ParentAlignment == BranchParentAlignment.Center 
                    ? leftmost + (rightmost - leftmost)/2
                    : ParentAlignment == BranchParentAlignment.Left 
                    ? leftmost + ChildConnectorHookLength
                    : rightmost - ChildConnectorHookLength;
                var center = rect.CenterH;
                var diff = center - desiredCenter;
                LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

                // vertical connector from parent 
                var verticalSpacer = node.Children[node.State.NumberOfSiblings];
                verticalSpacer.State.AdjustSpacer(
                    center - ParentConnectorShield / 2, rect.Bottom,
                    ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);

                state.MergeSpacer(verticalSpacer);

                // horizontal protector
                var firstInRow = node.Children[0].State;

                var horizontalSpacer = node.Children[node.State.NumberOfSiblings + 1];
                horizontalSpacer.State.AdjustSpacer(
                    firstInRow.Left,
                    firstInRow.SiblingsRowV.From - ParentChildSpacing,
                    node.Children[node.State.NumberOfSiblings - 1].State.Right - firstInRow.Left,
                    ParentChildSpacing);
                state.MergeSpacer(horizontalSpacer);
            }
        }

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public override void RouteConnectors([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            var normalChildCount = node.State.NumberOfSiblings;

            var count = normalChildCount == 0
                ? 0 // no visible children = no edges
                : normalChildCount == 1
                    ? 1 // one child = one direct edge between parent and child
                    : 1 // one downward edge for parent 
                      + 1 // one for horizontal carrier
                      + normalChildCount; // one upward edge for each child

            if (count == 0)
            {
                node.State.Connector = null;
                return;
            }

            var segments = new Edge[count];

            var rootRect = node.State;
            var center = rootRect.CenterH;

            if (node.Children == null)
            {
                throw new Exception("State is present, but children not set");
            }

            if (count == 1)
            {
                segments[0] = new Edge(new Point(center, rootRect.Bottom),
                    new Point(center, node.Children[0].State.Top));
            }
            else
            {
                var space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;

                segments[0] = new Edge(new Point(center, rootRect.Bottom),
                    new Point(center, rootRect.Bottom + space - ChildConnectorHookLength));

                for (var i = 0; i < normalChildCount; i++)
                {
                    var childRect = node.Children[i].State;
                    var childCenter = childRect.CenterH;
                    segments[1 + i] = new Edge(new Point(childCenter, childRect.Top),
                        new Point(childCenter, childRect.Top - ChildConnectorHookLength));
                }

                segments[count - 1] = new Edge(
                    new Point(segments[1].To.X, segments[1].To.Y),
                    new Point(segments[count-2].To.X, segments[1].To.Y));
            }

            node.State.Connector = new Connector(segments);
        }

        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        public override bool SupportsAssistants => true;
    }
}