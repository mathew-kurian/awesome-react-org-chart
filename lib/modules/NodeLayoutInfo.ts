import Size from "./Size";
import Connector from "./Connector";
import Point from "./Point";
import Dimensions from "./Dimensions";
import Rect from "./Rect";
import LayoutStrategyBase from "./LayoutStrategyBase";

export default class NodeLayoutInfo {
  private _effectiveLayoutStrategy: LayoutStrategyBase | null = null;

  set EffectiveLayoutStrategy(value: LayoutStrategyBase) {
    this._effectiveLayoutStrategy = value;
  }

  get RequireLayoutStrategy(): LayoutStrategyBase {
    if (this._effectiveLayoutStrategy == null) {
      throw new Error("EffectiveLayoutStrategy is not set");
    }

    return this._effectiveLayoutStrategy;
  }

  IsHidden: boolean = false;
  NumberOfSiblings: number = 0;
  NumberOfSiblingRows: number = 0;
  NumberOfSiblingColumns: number = 0;
  Size: Size | null = null;
  SiblingsRowV: Dimensions | null = null;
  Connector: Connector | null = null;

  private _topLeft: Point | null = null;

  get TopLeft(): Point {
    if (this._topLeft == null) {
      throw Error("TopLeft is null");
    }

    return this._topLeft;
  }

  set TopLeft(value: Point) {
    this._topLeft = value;
  }

  private _branchExterior: Rect | null = null;

  get BranchExterior(): Rect {
    if (this._branchExterior == null) {
      throw Error("BranchExterior is null");
    }

    return this._branchExterior;
  }

  set BranchExterior(value: Rect) {
    this._branchExterior = value;
  }

  get Left(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    return this.TopLeft.X;
  }
  get Right(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    if (this.Size == null) {
      throw Error("Size is null");
    }

    return this.TopLeft.X + this.Size.Width;
  }
  get Top(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    if (this.Size == null) {
      throw Error("Size is null");
    }

    return this.TopLeft.Y;
  }
  get Bottom(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    if (this.Size == null) {
      throw Error("Size is null");
    }

    return this.TopLeft.Y + this.Size.Height;
  }
  get CenterH(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    if (this.Size == null) {
      throw Error("Size is null");
    }

    return this.TopLeft.X + this.Size.Width / 2;
  }
  get CenterV(): number {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }

    if (this.Size == null) {
      throw Error("Size is null");
    }

    return this.TopLeft.Y + this.Size.Height / 2;
  }
}
