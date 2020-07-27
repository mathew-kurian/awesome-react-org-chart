import Point from "./Point";
import Size from "./Size";

export default class Rect {
  TopLeft: Point;
  Size: Size;

  get BottomRight(): Point {
    return new Point(
      this.TopLeft.X + this.Size.Width,
      this.TopLeft.Y + this.Size.Height
    );
  }
  get Left(): number {
    return this.TopLeft.X;
  }
  get Right(): number {
    return this.TopLeft.X + this.Size.Width;
  }
  get CenterH(): number {
    return this.TopLeft.X + this.Size.Width / 2;
  }
  get CenterV(): number {
    return this.TopLeft.Y + this.Size.Height / 2;
  }
  get Top(): number {
    return this.TopLeft.Y;
  }
  get Bottom(): number {
    return this.TopLeft.Y + this.Size.Height;
  }

  constructor(x: number, y: number, w: number, h: number) {
    if (w < 0) {
      throw new Error(`Width out of range`);
    }

    if (h < 0) {
      throw new Error(`Height out of range`);
    }

    this.TopLeft = new Point(x, y);
    this.Size = new Size(w, h);
  }

  static from(size: Size, topLeft: Point = new Point(0, 0)): Rect {
    return new Rect(topLeft.X, topLeft.Y, size.Width, size.Height);
  }

  static add(x: Rect, y: Rect): Rect {
    const left = Math.min(x.Left, y.Left);
    const top = Math.min(x.Top, y.Top);
    const right = Math.max(x.Right, y.Right);
    const bottom = Math.max(x.Bottom, y.Bottom);

    return new Rect(left, top, right - left, bottom - top);
  }

  MoveH(offsetX: number): Rect {
    return Rect.from(this.Size, new Point(this.Left + offsetX, this.Top));
  }
}
