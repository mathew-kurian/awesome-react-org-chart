export default class Point {
  X: number;
  Y: number;

  constructor(x: number, y: number) {
    this.X = x;
    this.Y = y;
  }

  public MoveH(offsetX: number): Point {
    return new Point(this.X + offsetX, this.Y);
  }
}
