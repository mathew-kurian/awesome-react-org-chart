export default class Dimensions {
  From: number;
  To: number;

  public static MinMax(): Dimensions {
    return new Dimensions(Number.MAX_VALUE, Number.MIN_VALUE);
  }

  constructor(from: number, to: number) {
    this.From = from;
    this.To = to;
  }

  public static add(x: Dimensions, y: Dimensions): Dimensions {
    return new Dimensions(Math.min(x.From, y.From), Math.max(x.To, y.To));
  }
}
