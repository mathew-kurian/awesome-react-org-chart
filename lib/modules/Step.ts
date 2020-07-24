import Node from "./Node";

export default class Step {
  public readonly Node: Node;
  public readonly X: number;
  public readonly Top: number;
  public readonly Bottom: number;

  constructor(node: Node, x: number, top: number, bottom: number) {
    this.Node = node;
    this.X = x;
    this.Top = top;
    this.Bottom = bottom;
  }

  public ChangeTop(newTop: number): Step {
    return new Step(this.Node, this.X, newTop, this.Bottom);
  }

  public ChangeBottom(newBottom: number): Step {
    return new Step(this.Node, this.X, this.Top, newBottom);
  }

  public ChangeOwner(newNode: Node, newX: number): Step {
    return new Step(newNode, newX, this.Top, this.Bottom);
  }

  public ChangeX(newX: number): Step {
    return new Step(this.Node, newX, this.Top, this.Bottom);
  }
}
