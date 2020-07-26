/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;

namespace OrgChart.Layout
{
    /// <summary>
    /// Edges of a bunch of siblings on vertical or horizontal axis.
    /// </summary>
    public struct Dimensions
    {
        /// <summary>
        /// Min value.
        /// </summary>
        public readonly double From;
        /// <summary>
        /// Max value.
        /// </summary>
        public readonly double To;

        /// <summary>
        /// Ctr.
        /// </summary>
        public static Dimensions MinMax()
        {
            return new Dimensions(double.MaxValue, double.MinValue);
        }
        
        /// <summary>
        /// Ctr.
        /// </summary>
        public Dimensions(double from, double to)
        {
            From = from;
            To = to;
        }

        /// <summary>
        /// Computes combined dimension.
        /// </summary>
        public static Dimensions operator +(Dimensions x, Dimensions y)
        {
            return new Dimensions(Math.Min(x.From, y.From), Math.Max(x.To, y.To));
        }
    }
}