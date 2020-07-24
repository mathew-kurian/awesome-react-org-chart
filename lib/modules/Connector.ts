import Edge from "./Edge";

export default class Connector {
  Segments: Edge[];

  constructor(segments: Edge[]) {
    if (segments.length == 0) {
      throw new Error("Need at least one segment");
    }

    this.Segments = segments;
  }
}
