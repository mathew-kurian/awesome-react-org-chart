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
    /// Access to underlying data.
    /// </summary>
    public interface IChartDataSource
    {
        /// <summary>
        /// Access to all data items.
        /// </summary>
        [NotNull] IEnumerable<string> AllDataItemIds { get; }

        /// <summary>
        /// Delegate that provides information about parent-child relationship of boxes.
        /// First argument is the underlying data item id.
        /// Return value is the parent data item id.
        /// This one should be implemented by the underlying data source.
        /// </summary>
        [NotNull] Func<string, string> GetParentKeyFunc { get; }

        /// <summary>
        /// Delegate that provides information about advanced properties of boxes.
        /// First argument is the underlying data item id.
        /// This one should be implemented by the underlying data source.
        /// </summary>
        [NotNull] Func<string, IChartDataItem> GetDataItemFunc { get; }
    }
}