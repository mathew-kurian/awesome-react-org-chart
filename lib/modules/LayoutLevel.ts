import Node from "./Node";
import Boundary from "./Boundary";

export default class LayoutLevel {
  BranchRoot: Node;
  Boundary: Boundary;

  constructor(node: Node, boundary: Boundary) {
    this.BranchRoot = node;
    this.Boundary = boundary;
  }
}
