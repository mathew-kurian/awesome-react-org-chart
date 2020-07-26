/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Diagnostics;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// A box in some <see cref="Diagram"/>. 
    /// Has <see cref="Size"/> and layout-related config such as <see cref="LayoutStrategyId"/>.
    /// This is a purely visual object, created based on underlying chart's data.
    /// </summary>
    [DebuggerDisplay("{Id}, Size.Width}x{Size.Height}")]
    public class Box
    {
        /// <summary>
        /// Value to be used for box identifier to indicate an absent box.
        /// </summary>
        public const int None = -1;

        /// <summary>
        /// Identifier of this box. Unique in the scope of the parent <see cref="BoxContainer"/>.
        /// </summary>
        public readonly int Id;
        /// <summary>
        /// Identifier of the parent box, usually driven by corresponding relationship between underlying data items.
        /// This parent is for the visual connections and arrangement of children boxes with their parents.
        /// </summary>
        public readonly int ParentId;

        /// <summary>
        /// Identifier of some externally provided data item for which this box was created.
        /// Can be null for auto-generated boxes and manually added boxes.
        /// </summary>
        [CanBeNull] public readonly string DataId;

        /// <summary>
        /// This box has been auto-generated for layout purposes,
        /// so it can be deleted and re-created as needed.
        /// Special boxes are usually not stored in the <see cref="BoxContainer"/> (except <see cref="BoxContainer.SystemRoot"/>).
        /// </summary>
        public readonly bool IsSpecial;

        /// <summary>
        /// If <c>true</c>, this box has to be rendered using a special layout strategy directly under the parent.
        /// Assistants are always on top of other siblinbgs.
        /// </summary>
        /// <seealso cref="IChartDataItem.IsAssistant"/>
        public readonly bool IsAssistant;

        /// <summary>
        /// <c>False</c> (default) to enable collision detection for this box,
        /// e.g. whether it can make impact on <see cref="Boundary"/>.
        /// </summary>
        public readonly bool DisableCollisionDetection;

        /// <summary>
        /// Layout strategy that should be used to apply layout on this Box and its children.
        /// References an element in <see cref="DiagramLayoutSettings.LayoutStrategies"/>.
        /// If <c>null</c>, use <see cref="DiagramLayoutSettings.DefaultLayoutStrategyId"/>.
        /// </summary>
        [CanBeNull] public string LayoutStrategyId;

        /// <summary>
        /// Layout strategy that should be used to apply layout on assistant children of this Box.
        /// References an element in <see cref="DiagramLayoutSettings.LayoutStrategies"/>.
        /// If <c>null</c>, use <see cref="DiagramLayoutSettings.DefaultAssistantLayoutStrategyId"/>.
        /// </summary>
        [CanBeNull] public string AssistantLayoutStrategyId;

        /// <summary>
        /// Size of this box.
        /// </summary>
        public Size Size;
        
        /// <summary>
        /// When <c>true</c>, layout operations can be applied only to this box.
        /// Its children will not participate in the layout.
        /// </summary>
        public bool IsCollapsed;
        
        /// <summary>
        /// <c>true</c> is this box is bound to some data item.
        /// </summary>
        public bool IsDataBound => !string.IsNullOrEmpty(DataId);

        /// <summary>
        /// Ctr. for normal and data-bound boxes.
        /// </summary>
        public Box([CanBeNull]string dataId, int id, int parentId, bool isAssistant) : this(dataId, id, parentId, false, false, isAssistant)
        {
        }

        /// <summary>
        /// Ctr. for auto-generated boxes.
        /// </summary>
        [NotNull]
        public static Box Special(int id, int visualParentId, bool disableCollisionDetection)
        {
            return new Box(null, id, visualParentId, true, disableCollisionDetection, false);
        }

        private Box([CanBeNull] string dataId, int id, int parentId, bool isSpecial, bool disableCollisionDetection, bool isAssistant)
        {
            if (id == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id));
            }

            Id = id;
            ParentId = parentId;
            DataId = dataId;
            IsSpecial = isSpecial;
            IsAssistant = isAssistant;
            DisableCollisionDetection = disableCollisionDetection;
        }
    }
}