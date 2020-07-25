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
  Connector: Connector | null = null;

  _numberOfSiblings: number = 0;
  _numberOfSiblingsRows: number = 0;
  _numberOfSiblingsColumns: number = 0;

  get NumberOfSiblings(): number {
    return this._numberOfSiblings;
  }
  get NumberOfSiblingRows(): number {
    return this._numberOfSiblingsRows;
  }
  get NumberOfSiblingColumns(): number {
    return this._numberOfSiblingsColumns;
  }
  set NumberOfSiblings(value: number) {
    this._numberOfSiblings = Math.floor(value);
  }
  set NumberOfSiblingRows(value: number) {
    this._numberOfSiblingsRows = Math.floor(value);
  }
  set NumberOfSiblingColumns(value: number) {
    this._numberOfSiblingsColumns = Math.floor(value);
  }

  Size = new Size(0, 0);
  TopLeft = new Point(0, 0);
  BranchExterior: Rect = new Rect(0, 0, 0, 0);

  private _siblingsRowV: Dimensions | null = null;

  get SiblingsRowV(): Dimensions {
    if (this._siblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }

    return this._siblingsRowV;
  }

  set SiblingsRowV(value: Dimensions) {
    this._siblingsRowV = value;
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
