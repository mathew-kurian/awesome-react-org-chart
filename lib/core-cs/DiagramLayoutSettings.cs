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
    /// Layout settings bound per-frame.
    /// </summary>
    public class DiagramLayoutSettings
    {
        private double m_branchSpacing;

        /// <summary>
        /// All unique layout strategies (semantically similar to CSS style sheets) referenced by sub-trees in the diagram.
        /// </summary>
        [NotNull] public Dictionary<string, LayoutStrategyBase> LayoutStrategies { get; }

        /// <summary>
        /// Optional explicitly specified default layout strategy to use for root boxes with <see cref="Box.AssistantLayoutStrategyId"/> set to <c>null</c>.
        /// If <c>null</c> or invalid, <see cref="RequireDefaultLayoutStrategy"/> will throw up.
        /// </summary>
        [CanBeNull] public string DefaultAssistantLayoutStrategyId { get; set; }

        /// <summary>
        /// Optional explicitly specified default layout strategy to use for root boxes with <see cref="Box.LayoutStrategyId"/> set to <c>null</c>.
        /// If <c>null</c> or invalid, <see cref="RequireDefaultLayoutStrategy"/> will throw up.
        /// </summary>
        [CanBeNull] public string DefaultLayoutStrategyId { get; set; }

        /// <summary>
        /// Minimum space between boxes that belong to different branches.
        /// </summary>
        public double BranchSpacing
        {
            get { return m_branchSpacing; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException(nameof(value), value, "Cannot be negative");
                }
                m_branchSpacing = value;
            }
        }
        
        /// <summary>
        /// Ctr.
        /// </summary>
        public DiagramLayoutSettings()
        {
            BranchSpacing = 50;
            LayoutStrategies = new Dictionary<string, LayoutStrategyBase>();
        }

        /// <summary>
        /// Layout strategy to be used for root boxes with <see cref="Box.LayoutStrategyId"/> set to <c>null</c>.
        /// </summary>
        /// <exception cref="InvalidOperationException"><see cref="DefaultLayoutStrategyId"/> is null or not valid</exception>
        public LayoutStrategyBase RequireDefaultLayoutStrategy()
        {
            LayoutStrategyBase result;
            if (string.IsNullOrEmpty(DefaultLayoutStrategyId)
                || !LayoutStrategies.TryGetValue(DefaultLayoutStrategyId, out result))
            {
                throw new InvalidOperationException(nameof(DefaultLayoutStrategyId) + " is null or not valid");
            }

            return result;
        }

        /// <summary>
        /// Layout strategy to be used for root boxes with <see cref="Box.AssistantLayoutStrategyId"/> set to <c>null</c>.
        /// </summary>
        /// <exception cref="InvalidOperationException"><see cref="DefaultAssistantLayoutStrategyId"/> is null or not valid</exception>
        public LayoutStrategyBase RequireDefaultAssistantLayoutStrategy()
        {
            LayoutStrategyBase result;
            if (string.IsNullOrEmpty(DefaultAssistantLayoutStrategyId)
                || !LayoutStrategies.TryGetValue(DefaultAssistantLayoutStrategyId, out result))
            {
                throw new InvalidOperationException(nameof(DefaultAssistantLayoutStrategyId) + " is null or not valid");
            }

            return result;
        }
    }
}