/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
namespace OrgChart.Layout
{
    /// <summary>
    /// Alignment of a parent box above children nodes.
    /// </summary>
    public enum BranchParentAlignment
    {
        /// <summary>
        /// Default value is invalid, do not use it.
        /// </summary>
        InvalidValue = 0,
        /// <summary>
        /// Put parent on the left side of children.
        /// </summary>
        Left,
        /// <summary>
        /// Put parent in the middle above children.
        /// </summary>
        Center,
        /// <summary>
        /// Put parent on the right side of children.
        /// </summary>
        Right
    }
}