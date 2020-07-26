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
    /// Arranges child boxes in multiple lines under the parent.
    /// Can only be configured to position parent in the middle of children.
    /// Children are attached to long horizontal carriers,
    /// with a central vertical carrier going through them from parent's bottom.
    /// </summary>
    public class MultiLineHangerLayoutStrategy : LinearLayoutStrategy
    {
        /// <summary>
        /// Maximum number of siblings in a horizontal row.
        /// </summary>
        public int MaxSiblingsPerRow = 4;
        
        /// <summary>
        /// A chance for layout strategy to append special auto-generated boxes into the visual tree. 
        /// </summary>
        public override void PreProcessThisNode([NotNull]LayoutState state, [NotNull] BoxTree.Node node)
        {
            if (MaxSiblingsPerRow <= 0 || MaxSiblingsPerRow%2 != 0)
            {
                throw new InvalidOperationException(nameof(MaxSiblingsPerRow) + " must be a positive even value");
            }

            if (node.ChildCount <= MaxSiblingsPerRow)
            {
                // fall back to linear layout, only have one row of boxes
                base.PreProcessThisNode(state, node);
                return;
            }

            node.State.NumberOfSiblings = node.ChildCount;

            // only add spacers for non-collapsed boxes
            if (node.State.NumberOfSiblings > 0)
            {
                var lastRowBoxCount = node.ChildCount%MaxSiblingsPerRow;

                // add one (for vertical spacer) into the count of layout columns
                node.State.NumberOfSiblingColumns = 1 + MaxSiblingsPerRow;

                node.State.NumberOfSiblingRows = node.ChildCount/MaxSiblingsPerRow;
                if (lastRowBoxCount != 0)
                {
                    node.State.NumberOfSiblingRows++;
                }

                // include vertical spacers into the count of layout siblings
                node.State.NumberOfSiblings = node.ChildCount + node.State.NumberOfSiblingRows;
                if (lastRowBoxCount > 0 && lastRowBoxCount <= MaxSiblingsPerRow/2)
                {
                    // don't need the last spacer, last row is half-full or even less
                    node.State.NumberOfSiblings--;
                }

                // sibling middle-spacers have to be inserted between siblings
                var ix = MaxSiblingsPerRow/2;
                while (ix < node.State.NumberOfSiblings)
                {
                    var siblingSpacer = Box.Special(Box.None, node.Element.Id, false);
                    node.InsertRegularChild(ix, siblingSpacer);
                    ix += node.State.NumberOfSiblingColumns;
                }

                // add parent vertical spacer to the end
                var verticalSpacer = Box.Special(Box.None, node.Element.Id, false);
                node.AddRegularChild(verticalSpacer);

                // add horizontal spacers to the end
                for (var i = 0; i < node.State.NumberOfSiblingRows; i++)
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
            if (node.State.NumberOfSiblings <= MaxSiblingsPerRow)
            {
                // fall back to linear layout, only have one row of boxes
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

            var prevRowExterior = new Dimensions(
                node.State.SiblingsRowV.From, 
                node.AssistantsRoot == null
                ? node.State.SiblingsRowV.To
                : node.State.BranchExterior.Bottom);

            for (var row = 0; row < node.State.NumberOfSiblingRows; row++)
            {
                var siblingsRowExterior = Dimensions.MinMax();

                var spacing = row == 0 ? ParentChildSpacing : SiblingSpacing;

                // first, compute
                var from = row* node.State.NumberOfSiblingColumns;
                var to = Math.Min(from + node.State.NumberOfSiblingColumns, node.State.NumberOfSiblings);
                for (var i = from; i < to; i++)
                {
                    var child = node.Children[i];
                    if (child.Element.IsSpecial)
                    {
                        // skip vertical spacers for now
                        continue;
                    }

                    var rect = child.State;

                    var top = prevRowExterior.To + spacing;
                    child.State.MoveTo(rect.Left, top);
                    child.State.BranchExterior = new Rect(child.State.TopLeft, child.State.Size);

                    siblingsRowExterior += new Dimensions(top, top + rect.Size.Height);
                }

                siblingsRowExterior = new Dimensions(siblingsRowExterior.From, siblingsRowExterior.To);

                var siblingsBottom = double.MinValue;
                for (var i = from; i < to; i++)
                {
                    var child = node.Children[i];
                    child.State.SiblingsRowV = siblingsRowExterior;

                    // re-enter layout algorithm for child branch
                    LayoutAlgorithm.VerticalLayout(state, child);

                    siblingsBottom = Math.Max(siblingsBottom, child.State.BranchExterior.Bottom);
                }

                prevRowExterior = new Dimensions(siblingsRowExterior.From, Math.Max(siblingsBottom, siblingsRowExterior.To));

                // now assign size to the vertical spacer, if any
                var spacerIndex = from + node.State.NumberOfSiblingColumns / 2;
                if (spacerIndex < node.State.NumberOfSiblings)
                {
                    // in the last row, spacer should only extend to the siblings row bottom,
                    // because main vertical carrier does not go below last row 
                    // and thus cannot conflict with branches of children of the last row
                    var spacerBottom = row == node.State.NumberOfSiblingRows - 1
                        ? node.Children[spacerIndex - 1].State.SiblingsRowV.To
                        : prevRowExterior.To;

                    var spacer = node.Children[spacerIndex].State;
                    spacer.AdjustSpacer(
                        0, prevRowExterior.From,
                        ParentConnectorShield, spacerBottom - prevRowExterior.From);
                }
            }
        }

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public override void ApplyHorizontalLayout([NotNull]LayoutState state, [NotNull]LayoutState.LayoutLevel level)
        {
            var node = level.BranchRoot;

            if (node.State.NumberOfSiblings <= MaxSiblingsPerRow)
            {
                // fall back to linear layout, only have one row of boxes
                base.ApplyHorizontalLayout(state, level);
                return;
            }

            if (node.AssistantsRoot != null)
            {
                LayoutAlgorithm.HorizontalLayout(state, node.AssistantsRoot);
            }

            for (var col = 0; col < node.State.NumberOfSiblingColumns; col++)
            {
                // first, perform horizontal layout for every node in this column
                for (var row = 0; row < node.State.NumberOfSiblingRows; row++)
                {
                    var ix = row*node.State.NumberOfSiblingColumns + col;
                    if (ix >= node.State.NumberOfSiblings)
                    {
                        break;
                    }

                    var child = node.Children[ix];
                    // re-enter layout algorithm for child branch
                    LayoutAlgorithm.HorizontalLayout(state, child);
                }

                LayoutAlgorithm.AlignHorizontalCenters(state, level, EnumerateColumn(node, col));
            }

            // now align children under parent
            var rect = node.State;
            var spacer = node.Children[node.State.NumberOfSiblingColumns/2];
            var desiredCenter = spacer.State.CenterH;
            var diff = rect.CenterH - desiredCenter;
            LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

            // vertical connector from parent
            var verticalSpacer = node.Children[node.State.NumberOfSiblings];
            verticalSpacer.State.AdjustSpacer(
                rect.CenterH - ParentConnectorShield/2, rect.Bottom,
                ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
            state.MergeSpacer(verticalSpacer);

            // horizontal row carrier protectors
            var spacing = ParentChildSpacing;
            for (var firstInRowIndex = 0; firstInRowIndex < node.State.NumberOfSiblings; firstInRowIndex += node.State.NumberOfSiblingColumns)
            {
                var firstInRow = node.Children[firstInRowIndex].State;
                var lastInRow = node.Children[Math.Min(firstInRowIndex + node.State.NumberOfSiblingColumns - 1, node.State.NumberOfSiblings - 1)].State;

                var horizontalSpacer = node.Children[1 + node.State.NumberOfSiblings + firstInRowIndex/node.State.NumberOfSiblingColumns];

                var width = lastInRow.Right >= verticalSpacer.State.Right
                    ? lastInRow.Right - firstInRow.Left
                    : // extend protector at least to the central carrier
                    verticalSpacer.State.Right - firstInRow.Left;

                horizontalSpacer.State.AdjustSpacer(
                    firstInRow.Left, firstInRow.SiblingsRowV.From - spacing,
                    width, spacing);
                state.MergeSpacer(horizontalSpacer);

                spacing = SiblingSpacing;
            }
        }

        private IEnumerable<BoxTree.Node> EnumerateColumn(BoxTree.Node branchRoot, int col)
        {
            for (var row = 0; row < branchRoot.State.NumberOfSiblingRows; row++)
            {
                var ix = row * branchRoot.State.NumberOfSiblingColumns + col;
                if (ix >= branchRoot.State.NumberOfSiblings)
                {
                    yield break;
                }

                yield return branchRoot.Children[ix];
            }
        }

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public override void RouteConnectors([NotNull] LayoutState state, [NotNull] BoxTree.Node node)
        {
            if (node.State.NumberOfSiblings <= MaxSiblingsPerRow)
            {
                // fall back to linear layout, only have one row of boxes
                base.RouteConnectors(state, node);
                return;
            }

            // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
            var count = 1 + node.State.NumberOfSiblingRows;

            foreach (var child in node.Children)
            {
                // normal boxes get one upward hook 
                if (!child.Element.IsSpecial)
                {
                    count++;
                }
            }

            var segments = new Edge[count];

            var rootRect = node.State;
            var center = rootRect.CenterH;

            var verticalCarrierHeight = node.Children[node.State.NumberOfSiblings - 1].State.SiblingsRowV.From 
                - ChildConnectorHookLength - rootRect.Bottom;

            // central mid-sibling vertical connector, from parent to last row
            segments[0] = new Edge(new Point(center, rootRect.Bottom), new Point(center, rootRect.Bottom + verticalCarrierHeight));

            // short hook for each child
            var ix = 1;
            for (var i = 0; i < node.State.NumberOfSiblings; i++)
            {
                var child = node.Children[i];
                if (!child.Element.IsSpecial)
                {
                    var childRect = child.State;
                    var childCenter = childRect.CenterH;
                    segments[ix++] = new Edge(
                        new Point(childCenter, childRect.Top),
                        new Point(childCenter, childRect.Top - ChildConnectorHookLength));
                }
            }

            // horizontal carriers go from leftmost child hook to righmost child hook
            // for the last row which is just half or less full, it will only go to the central vertical carrier
            var lastChildHookIndex = count - node.State.NumberOfSiblingRows - 1;
            for (var firstInRowIndex = 1; firstInRowIndex < count - node.State.NumberOfSiblingRows; firstInRowIndex += MaxSiblingsPerRow)
            {
                var firstInRow = segments[firstInRowIndex];

                var lastInRow = segments[Math.Min(firstInRowIndex + MaxSiblingsPerRow - 1, lastChildHookIndex)];

                if (lastInRow.From.X < segments[0].From.X)
                {
                    segments[ix++] = new Edge(
                        new Point(firstInRow.To.X, firstInRow.To.Y),
                        new Point(segments[0].To.X, firstInRow.To.Y));
                }
                else
                {
                    segments[ix++] = new Edge(
                        new Point(firstInRow.To.X, firstInRow.To.Y),
                        new Point(lastInRow.To.X, firstInRow.To.Y));
                }
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