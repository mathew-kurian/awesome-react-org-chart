import Box from "./Box";
import IChartDataSource from "./IChartDataSource";

export default class BoxContainer {
  private _lastBoxId: number = 0;
  private _boxesById: Map<number, Box> = new Map<number, Box>();
  private _boxesByDataId: Map<string, Box> = new Map<string, Box>();

  get BoxesById(): Map<number, Box> {
    return this._boxesById;
  }

  get BoxesByDataId() {
    return this._boxesByDataId;
  }

  SystemRoot: Box | null = null;

  constructor(source?: IChartDataSource) {
    if (source) {
      this.ReloadBoxes(source);
    }
  }

  public ReloadBoxes(source: IChartDataSource) {
    this._boxesByDataId.clear();
    this._boxesById.clear();
    this._lastBoxId = 0;

    // generate system root box
    this.SystemRoot = Box.Special(++this._lastBoxId, Box.None, true);
    this._boxesById.set(this.SystemRoot.Id, this.SystemRoot);

    const map = new Map<string, number>();

    // generate identifiers mapping, need this because data comes in random order
    for (const dataId in source.AllDataItemIds) {
      map.set(dataId, this.NextBoxId());
    }

    // add data-bound boxes
    const getDataItem = source.GetDataItemFunc;
    for (const dataId of source.AllDataItemIds) {
      const parentDataId = !dataId ? null : source.GetParentKeyFunc(dataId);
      const visualParentId = !parentDataId
        ? this.SystemRoot.Id
        : map.get(parentDataId);

      const nextBoxId = map.get(dataId);

      if (nextBoxId != null && visualParentId != null) {
        this._AddBox(
          dataId,
          nextBoxId,
          visualParentId,
          getDataItem(dataId).IsAssistant
        );
      } else {
        throw Error("_AddBox null");
      }
    }
  }

  /// <summary>
  /// Creates a new <see cref="Box"/> and adds it to collection.
  /// </summary>
  /// <returns>Newly created Node object</returns>
  public AddBox(
    dataId: string | null,
    visualParentId: number,
    isAssistant: boolean
  ): Box {
    return this._AddBox(dataId, this.NextBoxId(), visualParentId, isAssistant);
  }

  private _AddBox(
    dataId: string | null,
    id: number,
    visualParentId: number,
    isAssistant: boolean
  ): Box {
    const box = new Box(dataId, id, visualParentId, false, false, isAssistant);

    this._boxesById.set(box.Id, box);

    if (box.DataId) {
      this._boxesByDataId.set(box.DataId, box);
    }

    return box;
  }

  public NextBoxId(): number {
    this._lastBoxId++;
    return this._lastBoxId;
  }
}
