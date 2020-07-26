/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Called when boundary is updated.
    /// </summary>
    public class BoundaryChangedEventArgs : EventArgs
    {
        /// <summary>
        /// Current layout state.
        /// </summary>
        public readonly LayoutState State;

        /// <summary>
        /// Current layout level.
        /// </summary>
        public readonly LayoutState.LayoutLevel LayoutLevel;

        /// <summary>
        /// The boundary whose state has been changed.
        /// </summary>
        public readonly Boundary Boundary;

        /// <summary>
        /// Ctr.
        /// </summary>
        public BoundaryChangedEventArgs([NotNull]Boundary boundary, [NotNull]LayoutState.LayoutLevel layoutLevel, [NotNull]LayoutState state)
        {
            Boundary = boundary;
            LayoutLevel = layoutLevel;
            State = state;
        }
    }

    /// <summary>
    /// Called when boundary is updated.
    /// </summary>
    public class LayoutStateOperationChangedEventArgs : EventArgs
    {
        /// <summary>
        /// Current layout state.
        /// </summary>
        public readonly LayoutState State;

        /// <summary>
        /// Ctr.
        /// </summary>
        public LayoutStateOperationChangedEventArgs([NotNull]LayoutState state)
        {
            State = state;
        }
    }
}