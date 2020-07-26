/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/

using System;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Arranges child boxes in a single or multiple lines or columns under the parent,
    /// but does not render any connectors and thus produces a much more compact set of nodes.
    /// Can be configured to put children into horizontal or vertical groups.
    /// </summary>
    public class StackingLayoutStrategy : LayoutStrategyBase
    {
        /// <summary>
        /// Which direction to send child boxes: horizontally, vertically, whether to use multiple lines.
        /// </summary>
        public StackOrientation Orientation;

        /// <summary>
        /// Ctr.
        /// </summary>
        public StackingLayoutStrategy()
        {
            Orientation = StackOrientation.SingleRowHorizontal;
            ParentAlignment = BranchParentAlignment.InvalidValue;
            ChildConnectorHookLength = 0;
            ParentConnectorShield = 0;
            SiblingSpacing = 5;
        }

        /// <summary>
        /// A chance for layout strategy to append special auto-generated boxes into the visual tree. 
        /// This strategy does not use connectors and spacers.
        /// </summary>
        public override void PreProcessThisNode([NotNull]LayoutState state, [NotNull] BoxTree.Node node)
        {
            node.State.NumberOfSiblings = node.Element.IsCollapsed ? 0 : node.ChildCount;

            if (node.State.NumberOfSiblings > 0)
            {
                // this strategy requires certain adjustments to be made to the box sizes
                // they will only affect corresponding Nodes, not the size on the box itself
                if (Orientation != StackOrientation.SingleRowHorizontal 
                    && Orientation != StackOrientation.SingleColumnVertical)
                {
                    throw new InvalidOperationException("Unsupported value for orientation: " + Orientation);
                }
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
                node.State.SiblingsRowV = new Dimensions(
                    node.State.Top,
                    node.State.Bottom);
            }

            if (node.State.NumberOfSiblings == 0)
            {
                return;
            }

            var siblingsRowExterior = Dimensions.MinMax();

            if (Orientation == StackOrientation.SingleRowHorizontal)
            {
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
            else if (Orientation == StackOrientation.SingleColumnVertical)
            {
                var prevRowExterior = new Dimensions(
                    node.State.SiblingsRowV.From,
                    node.State.SiblingsRowV.To);

                for (var row = 0; row < node.State.NumberOfSiblings; row++)
                {
                    // first, compute
                    var child = node.Children[row];
                    var rect = child.State;

                    var top = prevRowExterior.To + (row == 0 ? ParentChildSpacing : SiblingSpacing);
                    child.State.MoveTo(rect.Left, top);
                    child.State.BranchExterior = new Rect(child.State.TopLeft, child.State.Size);

                    var rowExterior = new Dimensions(top, top + rect.Size.Height);

                    child = node.Children[row];
                    child.State.SiblingsRowV = rowExterior;

                    // re-enter layout algorithm for child branch
                    LayoutAlgorithm.VerticalLayout(state, child);

                    var childBranchBottom = child.State.BranchExterior.Bottom;

                    prevRowExterior = new Dimensions(rowExterior.From, Math.Max(childBranchBottom, rowExterior.To));
                }
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyHorizontalLayout([NotNull]LayoutState state, [NotNull]LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;

            foreach (var child in node.Children)
            {
                // re-enter layout algorithm for child branch
                LayoutAlgorithm.HorizontalLayout(state, child);
            }

            if (node.ChildCount > 0)
            {
                if (Orientation == StackOrientation.SingleRowHorizontal)
                {
                    // now auto-extend or contract the parent box
                    var width = node.Children[node.State.NumberOfSiblings - 1].State.Right - node.Children[0].State.Left;
                    node.State.Size = new Size(Math.Max(node.State.Size.Width, width), node.State.Size.Height);

                    // now position children under the parent
                    var center = (node.Children[0].State.Left + node.Children[node.ChildCount - 1].State.Right) / 2;
                    var desiredCenter = node.State.CenterH;
                    var diff = desiredCenter - center;
                    LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
                }
                else if (Orientation == StackOrientation.SingleColumnVertical)
                {
                    LayoutAlgorithm.AlignHorizontalCenters(state, level, node.Children);
                    
                    // now position children under the parent
                    var center = node.Children[0].State.CenterH;
                    var desiredCenter = node.State.CenterH;
                    var diff = desiredCenter - center;
                    LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
                }
            }
        }

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public override void RouteConnectors([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            // this strategy does not use connectors
        }

        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        public override bool SupportsAssistants => false;
    }
}