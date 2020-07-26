/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Diagnostics;

namespace OrgChart.Layout
{
    /// <summary>
    /// A rectangle in the diagram logical coordinate space.
    /// </summary>
    [DebuggerDisplay("{TopLeft.X}:{TopLeft.Y}, {Size.Width}x{Size.Height}")]
    public struct Rect
    {
        /// <summary>
        /// Top-left corner.
        /// </summary>
        public readonly Point TopLeft;

        /// <summary>
        /// Computed bottom-right corner.
        /// </summary>
        public Point BottomRight => new Point(TopLeft.X + Size.Width, TopLeft.Y + Size.Height);

        /// <summary>
        /// Left edge.
        /// </summary>
        public double Left => TopLeft.X;

        /// <summary>
        /// Right edge.
        /// </summary>
        public double Right => TopLeft.X + Size.Width;

        /// <summary>
        /// Horizontal center.
        /// </summary>
        public double CenterH => TopLeft.X + Size.Width/2;

        /// <summary>
        /// Vertical center.
        /// </summary>
        public double CenterV => TopLeft.Y + Size.Height/2;

        /// <summary>
        /// Top edge.
        /// </summary>
        public double Top => TopLeft.Y;

        /// <summary>
        /// Bottom edge.
        /// </summary>
        public double Bottom => TopLeft.Y + Size.Height;

        /// <summary>
        /// Size of the rectangle.
        /// </summary>
        public readonly Size Size;

        /// <summary>
        /// Ctr. to help client code prevent naming conflicts with Rect, Point and Size type names.
        /// </summary>
        public Rect(double x, double y, double w, double h)
        {
            if (w < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(w));
            }

            if (h < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(h));
            }

            TopLeft = new Point(x, y);
            Size = new Size(w, h);
        }

        /// <summary>
        /// Ctr. for case with known location.
        /// </summary>
        public Rect(Point topLeft, Size size)
        {
            TopLeft = topLeft;
            Size = size;
        }

        /// <summary>
        /// Ctr. for case with only the size known.
        /// </summary>
        public Rect(Size size)
        {
            TopLeft = new Point(0, 0);
            Size = size;
        }

        /// <summary>
        /// Computes a rect that encloses both of given rectangles.
        /// </summary>
        public static Rect operator +(Rect x, Rect y)
        {
            var left = Math.Min(x.Left, y.Left);
            var top = Math.Min(x.Top, y.Top);
            var right = Math.Max(x.Right, y.Right);
            var bottom = Math.Max(x.Bottom, y.Bottom);
            return new Rect(left, top, right - left, bottom - top);
        }

        /// <summary>
        /// Returns a rectangle moved by <paramref name="offsetX"/> horizontally.
        /// </summary>
        public Rect MoveH(double offsetX)
        {
            return new Rect(new Point(Left + offsetX, Top), Size);
        }
    }
}