/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// A combination of source Boxes, layout setttings and all derived data.
    /// </summary>
    public class Diagram
    {
        private BoxTree m_visualTree;
        private BoxContainer m_boxes;

        /// <summary>
        /// Diagram layout styles.
        /// </summary>
        public DiagramLayoutSettings LayoutSettings { get; }

        /// <summary>
        /// All boxes. If modified, resets <see cref="VisualTree"/> to <c>null</c>.
        /// </summary>
        public BoxContainer Boxes
        {
            get { return m_boxes; }
            set
            {
                m_visualTree = null;
                m_boxes = value;
            }
        }

        /// <summary>
        /// Visual tree of boxes.
        /// </summary>
        [CanBeNull]
        public BoxTree VisualTree
        {
            get { return m_visualTree; }
            set
            {
                m_visualTree = value;
            }
        }

        /// <summary>
        /// Ctr.
        /// </summary>
        public Diagram()
        {
            LayoutSettings = new DiagramLayoutSettings();
        }
    }
}