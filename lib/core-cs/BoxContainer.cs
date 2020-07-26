/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System.Collections.Generic;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// A container for a bunch of <see cref="Box"/> objects. Defines scope of uniqueness of their identifiers.
    /// Used by <see cref="LayoutState"/> when computing boxes.
    /// </summary>
    public class BoxContainer
    {
        private int m_lastBoxId;
        private readonly Dictionary<int, Box> m_boxesById = new Dictionary<int, Box>();
        private readonly Dictionary<string, Box> m_boxesByDataId = new Dictionary<string, Box>();

        /// <summary>
        /// Access to internal collection of boxes.
        /// </summary>
        public IDictionary<int, Box> BoxesById => m_boxesById;

        /// <summary>
        /// Access to internal collection of boxes.
        /// </summary>
        public IDictionary<string, Box> BoxesByDataId => m_boxesByDataId;

        /// <summary>
        /// Auto-generated system root box. Added to guarantee a single-root hierarchy.
        /// </summary>
        [CanBeNull]
        public Box SystemRoot { get; set; }

        /// <summary>
        /// Ctr.
        /// </summary>
        public BoxContainer()
        {
        }

        /// <summary>
        /// Ctr. for case with readily available data source.
        /// </summary>
        public BoxContainer([NotNull]IChartDataSource source)
        {
            ReloadBoxes(source);
        }

        /// <summary>
        /// Wipes out and re-loads boxes collection from the data store.
        /// </summary>
        public void ReloadBoxes([NotNull]IChartDataSource source)
        {
            m_boxesByDataId.Clear();
            m_boxesById.Clear();
            m_lastBoxId = 0;

            // generate system root box
            SystemRoot = Box.Special(++m_lastBoxId, Box.None, true);
            m_boxesById.Add(SystemRoot.Id, SystemRoot);

            var map = new Dictionary<string, int>();
            
            // generate identifiers mapping, need this because data comes in random order
            foreach (var dataId in source.AllDataItemIds)
            {
                map.Add(dataId, NextBoxId());
            }

            // add data-bound boxes
            var getDataItem = source.GetDataItemFunc;
            foreach (var dataId in source.AllDataItemIds)
            {
                var parentDataId = string.IsNullOrEmpty(dataId) ? null : source.GetParentKeyFunc(dataId);
                var visualParentId = string.IsNullOrEmpty(parentDataId) ? SystemRoot.Id : map[parentDataId];

                AddBox(dataId, map[dataId], visualParentId, getDataItem(dataId).IsAssistant);
            }
        }

        /// <summary>
        /// Creates a new <see cref="Box"/> and adds it to collection.
        /// </summary>
        /// <returns>Newly created Node object</returns>
        public Box AddBox([CanBeNull]string dataId, int visualParentId, bool isAssistant)
        {
            return AddBox(dataId, NextBoxId(), visualParentId, isAssistant);
        }
        
        private Box AddBox([CanBeNull]string dataId, int id, int visualParentId, bool isAssistant)
        {
            var box = new Box(dataId, id, visualParentId, isAssistant);
            m_boxesById.Add(box.Id, box);
            if (!string.IsNullOrEmpty(dataId))
            {
                m_boxesByDataId.Add(box.DataId, box);
            }

            return box;
        }

        /// <summary>
        /// Generates a new identifier for a <see cref="Box"/>.
        /// </summary>
        public int NextBoxId()
        {
            m_lastBoxId++;
            return m_lastBoxId;
        }
    }
}