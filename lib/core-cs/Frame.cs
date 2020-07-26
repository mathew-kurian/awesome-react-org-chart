using System.Diagnostics;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// A rectangular frame in the diagram logical coordinate space,
    /// with its shape and connectors.
    /// </summary>
    [DebuggerDisplay("{Exterior.Left}:{Exterior.Top}, {Exterior.Size.Width}x{Exterior.Size.Height}")]
    public class Frame1
    {
        /// <summary>
        /// Exterior bounds of this frame.
        /// </summary>
        public Rect Exterior;

        /// <summary>
        /// External boundaries of this branch, updated by <see cref="LayoutAlgorithm"/> 
        /// after each merge of <see cref="Boundary"/> containing children boxes.
        /// </summary>
        public Rect BranchExterior;

        /// <summary>
        /// Exterior vertical boundaries of the layout row of siblings of this frame.
        /// </summary>
        public Dimensions SiblingsRowV;

        /// <summary>
        /// Connectors to dependent objects.
        /// </summary>
        [CanBeNull]
        public Connector Connector;
    }
}
