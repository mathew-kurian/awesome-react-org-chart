/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// A visual connector between two or more objects.
    /// </summary>
    public class Connector
    {
        /// <summary>
        /// Ctr.
        /// </summary>
        public Connector([NotNull]Edge[] segments)
        {
            if (segments.Length == 0)
            {
                throw new ArgumentException("Need at least one segment", nameof(Segments));
            }
            Segments = segments;
        }

        /// <summary>
        /// All individual segments of a connector, sorted from beginning to end.
        /// </summary>
        [NotNull]
        public Edge[] Segments { get; }
    }
}