﻿/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Collections.Generic;
using System.Linq;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Applies layout.
    /// </summary>
    public static class LayoutAlgorithm
    {
        /// <summary>
        /// Computes bounding rectangle in diagram space using only visible (non-autogenerated boxes).
        /// Useful for rendering the chart, as boxes frequently go into negative side horizontally, and have a special root box on top - all of those should not be accounted for.
        /// </summary>
        public static Rect ComputeBranchVisualBoundingRect([NotNull]BoxTree visualTree)
        {
            var result = new Rect();
            var initialized = false;

            visualTree.Root.IterateParentFirst(node =>
            {
                var box = node.Element;

                if (!node.State.IsHidden && !box.IsSpecial)
                {
                    if (initialized)
                    {
                        result += new Rect(node.State.TopLeft, node.State.Size);
                    }
                    else
                    {
                        initialized = true;
                        result = new Rect(node.State.TopLeft, node.State.Size);
                    }
                }

                return !box.IsCollapsed;
            });

            return result;
        }

        /// <summary>
        /// Initializes <paramref name="state"/> and performs all layout operations.
        /// </summary>
        public static void Apply([NotNull]LayoutState state)
        {
            // verify the root
            if (state.Diagram.Boxes.SystemRoot == null)
            {
                throw new InvalidOperationException("SystemRoot is not initialized on the box container");
            }

            state.CurrentOperation = LayoutState.Operation.Preparing;

            var tree = BoxTree.Build(state);

            state.Diagram.VisualTree = tree;

            // verify the root: regardless of data items, there must be a system root box on top of everything
            // the corresponding node is not supposed to be rendered, it only serves as layout algorithm's starting point
            if (tree.Root == null || tree.Root.Element.Id != state.Diagram.Boxes.SystemRoot.Id)
            {
                throw new Exception("SystemRoot is not on the top of the visual tree");
            }

            // set the tree and update visibility
            tree.UpdateHierarchyStats();
            state.AttachVisualTree(tree);

            // update visibility of boxes based on collapsed state
            tree.IterateParentFirst(
                node =>
                {
                    node.State.IsHidden =
                        node.ParentNode != null &&
                        (node.ParentNode.State.IsHidden || node.ParentNode.Element.IsCollapsed);

                    return true;
                });

            // In this phase, we will figure out layout strategy
            // and initialize layout state for each node.
            // Event listener may perform initial rendering /measuring of boxes when this event fires,
            // to determine box sizes and be ready to supply them via BoxSizeFunc delegate.
            state.CurrentOperation = LayoutState.Operation.PreprocessVisualTree;

            // initialize box sizes
            if (state.BoxSizeFunc != null)
            {
                // apply box sizes
                foreach (var box in state.Diagram.Boxes.BoxesById.Values.Where(x => x.IsDataBound))
                {
                    box.Size = state.BoxSizeFunc(box.DataId);
                }
            }

            foreach (var box in state.Diagram.Boxes.BoxesById.Values)
            {
                AssertBoxSize(box);
            }

            // initialize layout state on each node
            tree.IterateParentFirst(
                node =>
                {
                    node.State.MoveTo(0, 0);
                    node.State.Size = node.Element.Size;
                    node.State.BranchExterior = new Rect(new Point(0, 0), node.Element.Size);

                    return true;
                });

            PreprocessVisualTree(state, tree);
            tree.UpdateHierarchyStats();

            state.CurrentOperation = LayoutState.Operation.VerticalLayout;
            VerticalLayout(state, tree.Root);

            state.CurrentOperation = LayoutState.Operation.HorizontalLayout;
            HorizontalLayout(state, tree.Root);

            state.CurrentOperation = LayoutState.Operation.ConnectorsLayout;
            RouteConnectors(state, tree);

            state.CurrentOperation = LayoutState.Operation.Completed;
        }

        /// <summary>
        /// Ths function helps catch "undefined" values when operating in JavaScript-converted version of this code.
        /// Also, helps catch some bugs in C# version as well.
        /// They way it's implemented has direct impact on how JavaScript validation code looks like, so don't "optimize".
        /// </summary>
        private static void AssertBoxSize(Box box)
        {
            if (box.Size.Width >= 0.0 && box.Size.Width <= 1000000000.0)
            {
                if (box.Size.Height >= 0.0 && box.Size.Width <= 1000000000.0)
                {
                    return;
                }
            }

            throw new InvalidOperationException($"Box {box.Id} has invalid size: {box.Size.Width}x{box.Size.Height}");
        }

        private static void PreprocessVisualTree([NotNull]LayoutState state, [NotNull]BoxTree visualTree)
        {
            var defaultStrategy = state.Diagram.LayoutSettings.RequireDefaultLayoutStrategy();
            var defaultAssistantsStrategy = state.Diagram.LayoutSettings.RequireDefaultAssistantLayoutStrategy();

            var regular = new Stack<LayoutStrategyBase>();
            regular.Push(defaultStrategy);
            var assistants = new Stack<LayoutStrategyBase>();
            assistants.Push(defaultAssistantsStrategy);

            visualTree.IterateParentFirst(node =>
            {
                if (node.State.IsHidden)
                {
                    return false;
                }

                LayoutStrategyBase strategy = null;

                if (state.LayoutOptimizerFunc != null)
                {
                    var suggestedStrategyId = state.LayoutOptimizerFunc(node);
                    if (!string.IsNullOrEmpty(suggestedStrategyId))
                    {
                        strategy = state.Diagram.LayoutSettings.LayoutStrategies[suggestedStrategyId];
                    }
                }

                if (node.IsAssistantRoot)
                {
                    if (strategy == null)
                    {
                        strategy = node.ParentNode.Element.AssistantLayoutStrategyId != null
                            ? state.Diagram.LayoutSettings.LayoutStrategies[
                                node.ParentNode.Element.AssistantLayoutStrategyId]
                            : assistants.Peek();
                    }
                    assistants.Push(strategy);
                }
                else
                {
                    if (strategy == null)
                    {
                        strategy = node.Element.LayoutStrategyId != null
                            ? state.Diagram.LayoutSettings.LayoutStrategies[node.Element.LayoutStrategyId]
                            : regular.Peek();
                    }
                    regular.Push(strategy);

                    if (!strategy.SupportsAssistants)
                    {
                        node.SuppressAssistants();
                    }
                }

                // now let it pre-allocate special boxes etc
                node.State.EffectiveLayoutStrategy = strategy;
                node.State.RequireLayoutStrategy().PreProcessThisNode(state, node);

                return (!node.Element.IsCollapsed && node.ChildCount > 0) || node.AssistantsRoot != null;
            },
                node =>
                {
                    if (!node.State.IsHidden)
                    {
                        if (node.IsAssistantRoot)
                        {
                            assistants.Pop();
                        }
                        else
                        {
                            regular.Pop();
                        }
                    }
                });
        }

        /// <summary>
        /// Re-entrant layout algorithm,
        /// </summary>
        public static void HorizontalLayout([NotNull]LayoutState state, [NotNull]BoxTree.Node branchRoot)
        {
            if (branchRoot.State.IsHidden)
            {
                throw new InvalidOperationException($"Branch root {branchRoot.Element.Id} does not affect layout");
            }

            var level = state.PushLayoutLevel(branchRoot);
            try
            {
                if (branchRoot.Level == 0 || 
                    (branchRoot.State.NumberOfSiblings > 0 || branchRoot.AssistantsRoot != null) 
                    && !branchRoot.Element.IsCollapsed)
                {
                    branchRoot.State.RequireLayoutStrategy().ApplyHorizontalLayout(state, level);
                }
            }
            finally
            {
                state.PopLayoutLevel();
            }
        }

        /// <summary>
        /// Re-entrant layout algorithm.
        /// </summary>
        public static void VerticalLayout([NotNull]LayoutState state, [NotNull]BoxTree.Node branchRoot)
        {
            if (branchRoot.State.IsHidden)
            {
                throw new InvalidOperationException($"Branch root {branchRoot.Element.Id} does not affect layout");
            }

            var level = state.PushLayoutLevel(branchRoot);
            try
            {
                if (branchRoot.Level == 0 ||
                    (branchRoot.State.NumberOfSiblings > 0 || branchRoot.AssistantsRoot != null)
                    && !branchRoot.Element.IsCollapsed)
                {
                    branchRoot.State.RequireLayoutStrategy().ApplyVerticalLayout(state, level);
                }
            }
            finally
            {
                state.PopLayoutLevel();
            }
        }

        private static void RouteConnectors([NotNull]LayoutState state, [NotNull]BoxTree visualTree)
        {
            visualTree.IterateParentFirst(node =>
            {
                if (node.Element.IsCollapsed || node.State.NumberOfSiblings == 0 && node.AssistantsRoot == null)
                {
                    return false;
                }

                if (node.Level == 0)
                {
                    return true;
                }

                if (!node.Element.IsSpecial || node.IsAssistantRoot)
                {
                    node.State.RequireLayoutStrategy().RouteConnectors(state, node);
                    return true;
                }

                return false;
            });
        }

        /// <summary>
        /// Moves a given branch horizontally, except its root box.
        /// Also updates branch exterior rects.
        /// Also updates branch boundary for the current <paramref name="layoutLevel"/>.
        /// </summary>
        public static void MoveChildrenOnly([NotNull]LayoutState state, LayoutState.LayoutLevel layoutLevel, double offset)
        {
            var children = layoutLevel.BranchRoot.Children;
            if (children == null || children.Count == 0)
            {
                throw new InvalidOperationException("Should never be invoked when children not set");
            }

            Func<BoxTree.Node, bool> action = node =>
            {
                if (!node.State.IsHidden)
                {
                    node.State.TopLeft = node.State.TopLeft.MoveH(offset);
                    node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
                }
                return true;
            };
            
            foreach (var child in children)
            {
                child.IterateChildFirst(action);
            }

            layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
            layoutLevel.BranchRoot.State.BranchExterior = layoutLevel.Boundary.BoundingRect;
        }

        /// <summary>
        /// Moves a given branch horizontally, except its root box.
        /// Also updates branch exterior rects.
        /// Unlike <see cref="MoveChildrenOnly"/> and <see cref="MoveBranch"/>, does NOT update the boundary.
        /// </summary>
        /// <remarks>DOES NOT update branch boundary! Must call <see cref="Boundary.ReloadFromBranch"/> after batch of updates is complete</remarks>
        private static void MoveOneChild([NotNull]LayoutState state, [NotNull]BoxTree.Node root, double offset)
        {
            root.IterateChildFirst(node =>
                {
                    if (!node.State.IsHidden)
                    {
                        node.State.TopLeft = node.State.TopLeft.MoveH(offset);
                        node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
                    }
                    return true;
                });
        }

        /// <summary>
        /// Moves a given branch horizontally, including its root box.
        /// Also updates branch exterior rects.
        /// Also updates branch boundary for the current <paramref name="layoutLevel"/>.
        /// </summary>
        public static void MoveBranch([NotNull]LayoutState state, LayoutState.LayoutLevel layoutLevel, double offset)
        {
            MoveOneChild(state, layoutLevel.BranchRoot, offset);
            layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
            layoutLevel.BranchRoot.State.BranchExterior = layoutLevel.Boundary.BoundingRect;
        }

        /// <summary>
        /// Vertically aligns a subset of child nodes, presumably located one above another.
        /// All children must belong to the current layout level's root.
        /// Returns leftmost and rightmost boundaries of all branches in the <paramref name="subset"/>, after alignment.
        /// </summary>
        public static Dimensions AlignHorizontalCenters(
            [NotNull]LayoutState state, 
            [NotNull]LayoutState.LayoutLevel level,
            [NotNull]IEnumerable<BoxTree.Node> subset)
        {
            // compute the rightmost center in the column
            var center = double.MinValue;
            foreach (var child in subset)
            {
                var c = child.State.CenterH;
                if (c > center)
                {
                    center = c;
                }
            }

            // move those boxes in the column that are not aligned with the rightmost center
            var leftmost = double.MaxValue;
            var rightmost = double.MinValue;
            foreach (var child in subset)
            {
                var frame = child.State;
                var c = frame.CenterH;
                if (!c.IsEqual(center))
                {
                    var diff = center - c;
                    MoveOneChild(state, child, diff);
                }
                leftmost = Math.Min(leftmost, child.State.BranchExterior.Left);
                rightmost = Math.Max(rightmost, child.State.BranchExterior.Right);
            }

            // update branch boundary
            level.Boundary.ReloadFromBranch(level.BranchRoot);

            return new Dimensions(leftmost, rightmost);
        }

        /// <summary>
        /// Copies vertical and horionztal measurement data from <paramref name="other"/> frame.
        /// Does not copy <see cref="Connector"/>.
        /// </summary>
        public static void CopyExteriorFrom([NotNull]this NodeLayoutInfo state, [NotNull]NodeLayoutInfo other)
        {
            state.TopLeft = other.TopLeft;
            state.Size = other.Size;
            state.BranchExterior = other.BranchExterior;
            state.SiblingsRowV = other.SiblingsRowV;
        }

        /// <summary>
        /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
        /// </summary>
        public static bool IsMinValue(this double value)
        {
            return value <= double.MinValue + double.Epsilon;
        }

        /// <summary>
        /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
        /// </summary>
        public static bool IsMaxValue(this double value)
        {
            return value >= double.MaxValue - double.Epsilon;
        }

        /// <summary>
        /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
        /// </summary>
        public static bool IsZero(this double value)
        {
            return value <= double.Epsilon && value >= -double.Epsilon;
        }

        /// <summary>
        /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
        /// </summary>
        public static bool IsEqual(this double value, double other)
        {
            return Math.Abs(value - other) <= double.Epsilon;
        }

        /// <summary>
        /// Changes <see cref="NodeLayoutInfo.TopLeft"/>.
        /// </summary>
        public static void MoveTo([NotNull] this NodeLayoutInfo state, double x, double y)
        {
            state.TopLeft = new Point(x, y);
        }

        /// <summary>
        /// Uitility for special boxes, spacers etc. 
        /// Adjusts exterior and resets branch exterior to size.
        /// </summary>
        public static void AdjustSpacer([NotNull] this NodeLayoutInfo state, double x, double y, double w, double h)
        {
            state.TopLeft = new Point(x, y);
            state.Size = new Size(w, h);
            state.BranchExterior = new Rect(x, y, w, h);
        }
    }
}