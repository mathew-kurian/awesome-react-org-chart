/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Base class for all chart layout strategies.
    /// </summary>
    public abstract class LayoutStrategyBase
    {
        /// <summary>
        /// Alignment of the parent box above child boxes.
        /// </summary>
        public BranchParentAlignment ParentAlignment;

        /// <summary>
        /// 
        /// Minimum distance between a parent box and any child box.
        /// </summary>
        public double ParentChildSpacing = 20;

        /// <summary>
        /// Width of the area used to protect long vertical segments of connectors.
        /// </summary>
        public double ParentConnectorShield = 50;

        /// <summary>
        /// Minimum distance between two sibling boxes.
        /// </summary>
        public double SiblingSpacing = 20;

        /// <summary>
        /// Length of the small angled connector segment entering every child box.
        /// </summary>
        public double ChildConnectorHookLength = 5;

        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        public abstract bool SupportsAssistants { get; }

        /// <summary>
        /// A chance for layout strategy to insert special auto-generated boxes into the visual tree. 
        /// </summary>
        public abstract void PreProcessThisNode([NotNull] LayoutState state, [NotNull] BoxTree.Node node);

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public abstract void ApplyVerticalLayout([NotNull] LayoutState state, [NotNull]LayoutState.LayoutLevel level);

        /// <summary>
        /// Applies layout changes to a given box and its children.
        /// </summary>
        public abstract void ApplyHorizontalLayout([NotNull] LayoutState state, [NotNull]LayoutState.LayoutLevel level);

        /// <summary>
        /// Allocates and routes connectors.
        /// </summary>
        public abstract void RouteConnectors([NotNull]LayoutState state, [NotNull]BoxTree.Node node);
    }
}