/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Collections.Generic;
using System.Diagnostics;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Left and right edges of some group of boxes.
    /// </summary>
    public class Boundary
    {
        /// <summary>
        /// A single step of the boundary.
        /// Each individual element in <see cref="Left"/> and <see cref="Right"/> collections
        /// represents one step of the boundary.
        /// </summary>
        [DebuggerDisplay("{X}, {Top} - {Bottom}, {Node.Element.Id}")]
        public struct Step
        {
            /// <summary>
            /// Which <see cref="Node"/> holds this edge.
            /// </summary>
            [NotNull]
            public readonly BoxTree.Node Node;
            /// <summary>
            /// Horizontal position of the edge.
            /// </summary>
            public readonly double X;
            /// <summary>
            /// Top edge.
            /// </summary>
            public readonly double Top;
            /// <summary>
            /// Bottom edge.
            /// </summary>
            public readonly double Bottom;

            /// <summary>
            /// Ctr.
            /// </summary>
            public Step([NotNull]BoxTree.Node node, double x, double top, double bottom)
            {
                Node = node;
                X = x;
                Top = top;
                Bottom = bottom;
            }

            /// <summary>
            /// Returns a new <see cref="Step"/> whose <see cref="Top"/> property was set to <paramref name="newTop"/>.
            /// </summary>
            public Step ChangeTop(double newTop)
            {
                return new Step(Node, X, newTop, Bottom);
            }

            /// <summary>
            /// Returns a new <see cref="Step"/> whose <see cref="Bottom"/> property was set to <paramref name="newBottom"/>.
            /// </summary>
            public Step ChangeBottom(double newBottom)
            {
                return new Step(Node, X, Top, newBottom);
            }

            /// <summary>
            /// Returns a new <see cref="Step"/> whose <see cref="Node"/> property was set to <paramref name="newNode"/> and <see cref="X"/> to <paramref name="newX"/>.
            /// </summary>
            public Step ChangeOwner([NotNull]BoxTree.Node newNode, double newX)
            {
                return new Step(newNode, newX, Top, Bottom);
            }

            /// <summary>
            /// Returns a new <see cref="Step"/> whose <see cref="X"/> was set to <paramref name="newX"/>.
            /// </summary>
            public Step ChangeX(double newX)
            {
                return new Step(Node, newX, Top, Bottom);
            }
        }

        /// <summary>
        /// Bounding rectangle.
        /// </summary>
        public Rect BoundingRect { get; private set; }

        /// <summary>
        /// Left edge. Each element is a point in some logical space.
        /// Vertical position is determined by the index of the element offset from Top,
        /// using certain resolution (resolution is defined externally).
        /// </summary>
        public List<Step> Left;
        /// <summary>
        /// Right edge. Each element is a point in some logical space.
        /// </summary>
        public List<Step> Right;
        
        /// <summary>
        /// A temporary Boundary used for merging Boxes in, since they don't come with their own Boundary.
        /// </summary>
        private readonly Boundary m_spacerMerger;

        /// <summary>
        /// Ctr.
        /// </summary>
        public Boundary() : this(true)
        {
        }

        private Boundary(bool frompublic)
        {
            Left = new List<Step>();
            Right = new List<Step>();

            if (frompublic)
            {
                m_spacerMerger = new Boundary(false);
            }
        }

        /// <summary>
        /// Resets the edges, use when re-using this object from pool.
        /// </summary>
        public void PrepareForHorizontalLayout([NotNull]BoxTree.Node node)
        {
            Prepare(node);

            if (node.Element.DisableCollisionDetection)
            {
                return;
            }

            var rect = node.State;

            Left.Add(new Step(node, rect.Left, rect.Top, rect.Bottom));
            Right.Add(new Step(node, rect.Right, rect.Top, rect.Bottom));
        }

        /// <summary>
        /// Resets the edges, use when re-using this object from pool.
        /// </summary>
        public void Prepare([NotNull]BoxTree.Node node)
        {
            Left.Clear();
            Right.Clear();

            // adjust the top edge to fit the logical grid
            BoundingRect = new Rect(node.State.TopLeft, node.State.Size);
        }

        /// <summary>
        /// Merges another boundary into this one, potentially pushing its edges out.
        /// </summary>
        public void VerticalMergeFrom([NotNull]Boundary other)
        {
            BoundingRect += other.BoundingRect;
        }

        /// <summary>
        /// Merges another boundary into this one, potentially pushing its edges out.
        /// </summary>
        public void MergeFrom([NotNull]Boundary other)
        {
            if (other.BoundingRect.Top >= other.BoundingRect.Bottom)
            {
                throw new ArgumentException("Cannot merge boundary of height " + (other.BoundingRect.Bottom - other.BoundingRect.Top));
            }

            var merge = 'r';
            while (merge != '\0')
            {
                var mySteps = merge == 'r' ? Right : Left;
                var theirSteps = merge == 'r' ? other.Right : other.Left;
                var i = 0;
                var k = 0;
                for (; k < theirSteps.Count && i < mySteps.Count;)
                {
                    var my = mySteps[i];
                    var th = theirSteps[k];

                    if (my.Bottom <= th.Top)
                    {
                        // haven't reached the top of their boundary yet
                        i++;
                        continue;
                    }

                    if (th.Bottom <= my.Top)
                    {
                        // haven't reached the top of my boundary yet
                        mySteps.Insert(i, th);
                        k++;

                        ValidateState();
                        continue;
                    }
                    
                    var theirWins = merge == 'r' ? my.X <= th.X : my.X >= th.X;

                    if (my.Top.IsEqual(th.Top))
                    {
                        if (my.Bottom.IsEqual(th.Bottom))
                        {
                            // case 1: exactly same length and vertical position
                            // th: ********
                            // my: ********
                            if (theirWins)
                            {
                                mySteps[i] = th; // replace entire step
                            }
                            i++;
                            k++;

                            ValidateState();
                        }
                        else if (my.Bottom < th.Bottom)
                        {
                            // case 2: tops aligned, but my is shorter 
                            // th: ********
                            // my: ***
                            if (theirWins)
                            {
                                mySteps[i] = my.ChangeOwner(th.Node, th.X); // replace my with a piece of theirs
                            }
                            theirSteps[k] = th.ChangeTop(my.Bottom); // push their top down
                            i++;

                            ValidateState();
                        }
                        else
                        {
                            // case 3: tops aligned, but my is longer
                            // th: ***
                            // my: ********
                            if (theirWins)
                            {
                                mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
                                mySteps.Insert(i, th); // insert theirs before my
                                i++;
                            }
                            k++;

                            ValidateState();
                        }
                    }
                    else if (my.Bottom.IsEqual(th.Bottom))
                    {
                        if (my.Top < th.Top)
                        {
                            // case 4: bottoms aligned, but my is longer
                            // th:      ***
                            // my: ********
                            if (theirWins)
                            {
                                mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
                                mySteps.Insert(i + 1, th); // insert theirs after my
                                i++;
                            }
                            i++;
                            k++;

                            ValidateState();
                        }
                        else
                        {
                            // case 5: bottoms aligned, but my is shorter
                            // th: ********
                            // my:      ***
                            if (theirWins)
                            {
                                // replace my with theirs, we're guaranteed not to offend my previous
                                mySteps[i] = th; 
                            }
                            else
                            {
                                // insert a piece of theirs before my, we're guaranteed not to offend my previous
                                mySteps.Insert(i, th.ChangeBottom(my.Top));
                                i++;
                            }
                            i++;
                            k++;

                            ValidateState();
                        }
                    }
                    else if (my.Top < th.Top && my.Bottom < th.Bottom)
                    {
                        // case 6: their overlaps my bottom
                        // th:     ********
                        // my: *******
                        if (theirWins)
                        {
                            mySteps[i] = my.ChangeBottom(th.Top); // contract myself to their top
                            mySteps.Insert(i + 1, new Step(th.Node, th.X, th.Top, my.Bottom)); // insert a piece of theirs after my
                            i++;
                        }
                        theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
                        i++;

                        ValidateState();
                    }
                    else if (my.Top < th.Top && my.Bottom > th.Bottom)
                    {
                        // case 7: their cuts my into three pieces
                        // th:     ***** 
                        // my: ************
                        if (theirWins)
                        {
                            mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
                            mySteps.Insert(i + 1, th); // insert their after my
                            mySteps.Insert(i + 2, my.ChangeTop(th.Bottom)); // insert my tail after theirs
                            i += 2;
                        }
                        k++;

                        ValidateState();
                    }
                    else if (my.Bottom > th.Bottom)
                    {
                        // case 8: their overlaps my top
                        // th: ********
                        // my:    ********
                        if (theirWins)
                        {
                            mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
                            // insert theirs before my, we're guaranteed not to offend my previous
                            mySteps.Insert(i, th);
                        }
                        else
                        {
                            mySteps.Insert(i, th.ChangeBottom(my.Top));
                        }
                        i++;
                        k++;

                        ValidateState();
                    }
                    else
                    {
                        // case 9: their completely covers my
                        // th: ************
                        // my:    *****
                        if (theirWins)
                        {
                            mySteps[i] = th.ChangeBottom(my.Bottom); // replace my with a piece of theirs
                        }
                        else
                        {
                            mySteps.Insert(i, th.ChangeBottom(my.Top));
                            i++;
                        }
                        theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
                        i++;

                        ValidateState();
                    }
                }

                if (i == mySteps.Count)
                {
                    while (k < theirSteps.Count)
                    {
                        mySteps.Add(theirSteps[k]);
                        k++;

                        ValidateState();
                    }
                }

                merge = merge == 'r' ? 'l' : '\0';
            }

            BoundingRect += other.BoundingRect;
        }

        [Conditional("DEBUG")]
        private void ValidateState()
        {
            for (var i = 1; i < Left.Count; i++)
            {
                if (Left[i].Top.IsEqual(Left[i].Bottom) 
                    || Left[i].Top < Left[i - 1].Bottom 
                    || Left[i].Top <= Left[i - 1].Top 
                    || Left[i].Bottom <= Left[i].Top 
                    || Left[i].Bottom <= Left[i - 1].Bottom)
                {
                    throw new Exception("State error at Left index " + i);
                }
            }

            for (var i = 1; i < Right.Count; i++)
            {
                if (Right[i].Top.IsEqual(Right[i].Bottom) 
                    || Right[i].Top < Right[i - 1].Bottom 
                    || Right[i].Top <= Right[i - 1].Top 
                    || Right[i].Bottom <= Right[i].Top 
                    || Right[i].Bottom <= Right[i - 1].Bottom)
                {
                    throw new Exception("State error at Right index " + i);
                }
            }
        }

        /// <summary>
        /// Merges a box into this one, potentially pushing its edges out.
        /// </summary>
        public void MergeFrom([NotNull]BoxTree.Node node)
        {
            if (node.Element.DisableCollisionDetection)
            {
                return;
            }

            if (node.State.Size.Height.IsZero())
            {
                return;
            }

            m_spacerMerger.PrepareForHorizontalLayout(node);
            MergeFrom(m_spacerMerger);
        }

        /// <summary>
        /// Returns max horizontal overlap between myself and <paramref name="other"/>.
        /// </summary>
        public double ComputeOverlap([NotNull]Boundary other, double siblingSpacing, double branchSpacing)
        {
            int i = 0, k = 0;
            var offense = 0.0d;
            while (i < Right.Count && k < other.Left.Count)
            {
                var my = Right[i];
                var th = other.Left[k];

                if (my.Bottom <= th.Top)
                {
                    i++;
                }
                else if (th.Bottom <= my.Top)
                {
                    k++;
                }
                else
                {
                    if (!my.Node.Element.DisableCollisionDetection && !th.Node.Element.DisableCollisionDetection)
                    {
                        var desiredSpacing =
                            my.Node.Element.IsSpecial || th.Node.Element.IsSpecial
                            ? 0 // when dealing with spacers, no need for additional cushion around them
                            : my.Node.Element.ParentId == th.Node.Element.ParentId
                                ? siblingSpacing // two siblings kicking each other
                                : branchSpacing; // these are two different branches

                        var diff = my.X + desiredSpacing - th.X;
                        if (diff > offense)
                        {
                            offense = diff;
                        }
                    }

                    if (my.Bottom >= th.Bottom)
                    {
                        k++;
                    }
                    if (th.Bottom >= my.Bottom)
                    {
                        i++;
                    }
                }
            }

            return offense;
        }

        /// <summary>
        /// Re-initializes left and right edges based on actual coordinates of boxes.
        /// </summary>
        public void ReloadFromBranch(BoxTree.Node branchRoot)
        {
            var leftmost = double.MaxValue;
            var rightmost = double.MinValue;
            for (var i = 0; i < Left.Count; i++)
            {
                var left = Left[i];
                var newLeft = left.Node.State.Left;
                Left[i] = left.ChangeX(newLeft);
                leftmost = Math.Min(leftmost, newLeft);
            }

            for (var i = 0; i < Right.Count; i++)
            {
                var right = Right[i];
                var newRight = right.Node.State.Right;
                Right[i] = right.ChangeX(newRight);
                rightmost = Math.Max(rightmost, newRight);
            }

            leftmost = Math.Min(branchRoot.State.Left, leftmost);
            rightmost = Math.Max(branchRoot.State.Right, rightmost);

            BoundingRect = new Rect(new Point(leftmost, BoundingRect.Top),
                new Size(rightmost - leftmost, BoundingRect.Size.Height));
        }
    }
}