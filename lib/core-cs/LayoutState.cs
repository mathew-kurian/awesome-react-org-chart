/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Collections.Generic;
using System.Diagnostics;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Holds state for a particular layout operation, 
    /// such as reference to the <see cref="Diagram"/>, current stack of boundaries etc.
    /// </summary>
    public class LayoutState
    {
        /// <summary>
        /// Current layout operation.
        /// </summary>
        public enum Operation
        {
            /// <summary>
            /// No op.
            /// </summary>
            Idle,
            /// <summary>
            /// Making initial preparations, creating visual tree.
            /// </summary>
            Preparing,
            /// <summary>
            /// Pre-layout modifications of the visual tree.
            /// </summary>
            PreprocessVisualTree,
            /// <summary>
            /// Vertical layout in progress.
            /// </summary>
            VerticalLayout,
            /// <summary>
            /// Horizontal layout in progress.
            /// </summary>
            HorizontalLayout,
            /// <summary>
            /// Creating and positioning connectors.
            /// </summary>
            ConnectorsLayout,
            /// <summary>
            /// All layout operations have been completed.
            /// </summary>
            Completed
        }

        /// <summary>
        /// State of the layout operation for a particular sub-branch.
        /// </summary>
        [DebuggerDisplay("{BranchRoot.Element.Id}, {Boundary.BoundingRect.Top}..{Boundary.BoundingRect.Bottom}")]
        public class LayoutLevel
        {
            /// <summary>
            /// Root parent for this subtree.
            /// </summary>
            public readonly BoxTree.Node BranchRoot;

            /// <summary>
            /// Boundaries of this entire subtree.
            /// </summary>
            public readonly Boundary Boundary;

            /// <summary>
            /// Ctr.
            /// </summary>
            public LayoutLevel([NotNull] BoxTree.Node node, [NotNull] Boundary boundary)
            {
                BranchRoot = node;
                Boundary = boundary;
            }
        }

        /// <summary>
        /// Current operation in progress.
        /// </summary>
        public Operation CurrentOperation
        {
            get { return m_currentOperation; }
            set
            {
                m_currentOperation = value;
                OperationChanged?.Invoke(this, new LayoutStateOperationChangedEventArgs(this));
            }
        }

        /// <summary>
        /// Stack of the layout roots, as algorithm proceeds in depth-first fashion.
        /// Every box has a <see cref="Boundary"/> object associated with it, to keep track of corresponding visual tree's edges.
        /// </summary>
        [NotNull]
        private readonly Stack<LayoutLevel> m_layoutStack = new Stack<LayoutLevel>();
        /// <summary>
        /// Pool of currently-unused <see cref="Boundary"/> objects. They are added and removed here as they are taken for use in <see cref="m_layoutStack"/>.
        /// </summary>
        [NotNull]
        private readonly Stack<Boundary> m_pooledBoundaries = new Stack<Boundary>();

        private Operation m_currentOperation;

        /// <summary>
        /// Reference to the diagram for which a layout is being computed.
        /// </summary>
        [NotNull]
        public Diagram Diagram { get; }

        /// <summary>
        /// Delegate that provides information about sizes of boxes.
        /// First argument is the underlying data item id.
        /// Return value is the size of the corresponding box.
        /// This one should be implemented by the part of rendering engine that performs content layout inside a box.
        /// </summary>
        [CanBeNull]
        public Func<string, Size> BoxSizeFunc { get; set; }

        /// <summary>
        /// Delegate that provides a layout strategy id for a node.
        /// Use this to implement branch optimization algorithms.
        /// </summary>
        [CanBeNull]
        public Func<BoxTree.Node, string> LayoutOptimizerFunc { get; set; }

        /// <summary>
        /// Gets fired when any <see cref="Boundary"/> is modified by methods of this object.
        /// </summary>
        [CanBeNull]
        public event EventHandler<BoundaryChangedEventArgs> BoundaryChanged;

        /// <summary>
        /// Gets fired when <see cref="CurrentOperation"/> is changed on this object.
        /// </summary>
        [CanBeNull]
        public event EventHandler<LayoutStateOperationChangedEventArgs> OperationChanged;

        /// <summary>
        /// Ctr.
        /// </summary>
        public LayoutState([NotNull] Diagram diagram)
        {
            Diagram = diagram;
        }

        /// <summary>
        /// Initializes the visual tree and pool of boundary objects.
        /// </summary>
        public void AttachVisualTree([NotNull] BoxTree tree)
        {
            while (m_pooledBoundaries.Count < tree.Depth)
            {
                m_pooledBoundaries.Push(new Boundary());
            }
        }

        /// <summary>
        /// Push a new box onto the layout stack, thus getting deeper into layout hierarchy.
        /// Automatically allocates a Bondary object from pool.
        /// </summary>
        public LayoutLevel PushLayoutLevel([NotNull] BoxTree.Node node)
        {
            if (m_pooledBoundaries.Count == 0)
            {
                m_pooledBoundaries.Push(new Boundary());
            }

            var boundary = m_pooledBoundaries.Pop();

            switch (CurrentOperation)
            {
                case Operation.VerticalLayout:
                    boundary.Prepare(node);
                    break;

                case Operation.HorizontalLayout:
                    boundary.PrepareForHorizontalLayout(node);
                    break;
                default:
                    throw new InvalidOperationException("This operation can only be invoked when performing vertical or horizontal layouts");
            }

            var result = new LayoutLevel(node, boundary);
            m_layoutStack.Push(result);

            BoundaryChanged?.Invoke(this, new BoundaryChangedEventArgs(boundary, result, this));

            return result;
        }

        /// <summary>
        /// Merges a provided spacer box into the current branch boundary.
        /// </summary>
        public void MergeSpacer([NotNull]BoxTree.Node spacer)
        {
            if (CurrentOperation != Operation.HorizontalLayout)
            {
                throw new InvalidOperationException("Spacers can only be merged during horizontal layout");
            }

            if (m_layoutStack.Count == 0)
            {
                throw new InvalidOperationException("Cannot merge spacers at top nesting level");
            }

            var level = m_layoutStack.Peek();
            level.Boundary.MergeFrom(spacer);

            BoundaryChanged?.Invoke(this, new BoundaryChangedEventArgs(level.Boundary, level, this));
        }

        /// <summary>
        /// Pops a box from current layout stack, thus getting higher out from layout hierarchy.
        /// Automatically merges popped <see cref="Boundary"/> into the current level.
        /// </summary>
        public void PopLayoutLevel()
        {
            var innerLevel = m_layoutStack.Pop();

            BoundaryChanged?.Invoke(this, new BoundaryChangedEventArgs(innerLevel.Boundary, innerLevel, this));

            // if this was not the root, merge boundaries into current level
            if (m_layoutStack.Count > 0)
            {
                var higherLevel = m_layoutStack.Peek();

                switch (CurrentOperation)
                {
                    case Operation.VerticalLayout:
                        higherLevel.Boundary.VerticalMergeFrom(innerLevel.Boundary);
                        higherLevel.BranchRoot.State.BranchExterior = higherLevel.Boundary.BoundingRect;
                        break;

                    case Operation.HorizontalLayout:
                    {
                        // do not apply overlap adjustment for assistant branch, they are always above regular children
                        if (higherLevel.BranchRoot.AssistantsRoot != innerLevel.BranchRoot)
                        {
                            var strategy = higherLevel.BranchRoot.State.RequireLayoutStrategy();

                            var overlap = higherLevel.Boundary.ComputeOverlap(
                                innerLevel.Boundary, strategy.SiblingSpacing, Diagram.LayoutSettings.BranchSpacing);

                            if (overlap > 0)
                            {
                                LayoutAlgorithm.MoveBranch(this, innerLevel, overlap);
                                BoundaryChanged?.Invoke(this, new BoundaryChangedEventArgs(innerLevel.Boundary, innerLevel, this));
                            }
                        }
                        higherLevel.Boundary.MergeFrom(innerLevel.Boundary);

                        // Do not update branch vertical measurements from the boundary, because boundary adds children one-by-one.
                        // If we take it from boundary, then branch vertical measurement will be incorrect until all children are laid out horizontally,
                        // and this temporarily incorrect state will break those algorithms that need to know combined branch height.
                        higherLevel.BranchRoot.State.BranchExterior = new Rect(
                            higherLevel.Boundary.BoundingRect.Left,
                            higherLevel.BranchRoot.State.BranchExterior.Top,
                            higherLevel.Boundary.BoundingRect.Size.Width,
                            higherLevel.BranchRoot.State.BranchExterior.Size.Height);
                    }
                        break;
                    default:
                        throw new InvalidOperationException(
                            "This operation can only be invoked when performing vertical or horizontal layouts");
                }

                BoundaryChanged?.Invoke(this, new BoundaryChangedEventArgs(higherLevel.Boundary, higherLevel, this));
            }

            // return boundary to the pool
            m_pooledBoundaries.Push(innerLevel.Boundary);
        }
    }
}