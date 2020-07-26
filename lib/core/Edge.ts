import Point from "./Point";

export default class Edge {
  From: Point;
  To: Point;

  constructor(from: Point, to: Point) {
    this.From = from;
    this.To = to;
  }
}
