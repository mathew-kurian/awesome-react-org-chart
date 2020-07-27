/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
namespace OrgChart.Layout
{
    /// <summary>
    /// A point in the diagram logical coordinate space.
    /// </summary>
    public struct Point
    {
        /// <summary>
        /// X-coordinate.
        /// </summary>
        public readonly double X;
        /// <summary>
        /// Y-coordinate.
        /// </summary>
        public readonly double Y;

        /// <summary>
        /// Ctr.
        /// </summary>
        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }

        /// <summary>
        /// Returns a point moved by <paramref name="offsetX"/> horizontally.
        /// </summary>
        public Point MoveH(double offsetX)
        {
            return new Point(X + offsetX, Y);
        }
    }

    /// <summary>
    /// A point in the diagram logical coordinate space.
    /// </summary>
    public struct Size
    {
        /// <summary>
        /// X-coordinate.
        /// </summary>
        public readonly double Width;
        /// <summary>
        /// Y-coordinate.
        /// </summary>
        public readonly double Height;

        /// <summary>
        /// Ctr.
        /// </summary>
        public Size(double w, double h)
        {
            Width = w;
            Height = h;
        }
    }
}