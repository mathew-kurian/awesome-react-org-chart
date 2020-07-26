import BoxContainer from "./BoxContainer";
import BoxTree from "./BoxTree";
import DiagramLayoutSettings from "./DiagramLayoutSettings";

export default class Diagram {
  private _visualTree: BoxTree | null = null;
  private _boxes: BoxContainer | null = null;

  LayoutSettings: DiagramLayoutSettings;

  get Boxes(): BoxContainer {
    if (this._boxes == null) {
      throw Error("Boxes is null");
    }

    return this._boxes;
  }

  set Boxes(value: BoxContainer) {
    this._visualTree = null;
    this._boxes = value;
  }

  get VisualTree(): BoxTree | null {
    return this._visualTree;
  }

  set VisualTree(value: BoxTree | null) {
    this._visualTree = value;
  }

  constructor() {
    this.LayoutSettings = new DiagramLayoutSettings();
  }
}
