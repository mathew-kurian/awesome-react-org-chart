/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
namespace OrgChart.Layout
{
    /// <summary>
    /// Access to underlying data.
    /// </summary>
    public interface IChartDataItem
    {
        /// <summary>
        /// Unique identifier of this data element.
        /// </summary>
        string Id { get; }

        /// <summary>
        /// <c>True if corresponding box in the chart should be rendered as Assistant</c>
        /// </summary>
        bool IsAssistant { get; }
    }
}