import Size from "./Size";

export default class Box {
  Id: number;
  ParentId: number;
  DataId: string | null;
  IsSpecial: boolean;
  IsAssistant: boolean;
  DisableCollisionDetection: boolean;
  LayoutStrategyId: string | null;
  AssistantLayoutStrategyId: string | null;
  Size: Size;
  IsCollapsed: boolean;

  static None = -1;

  get IsDataBound() {
    return this.DataId != null;
  }

  static Special(
    id: number,
    visualParentId: number,
    disableCollisionDetection: boolean
  ): Box {
    return new Box(
      null,
      id,
      visualParentId,
      true,
      disableCollisionDetection,
      false
    );
  }

  constructor(
    dataId: string | null,
    id: number,
    parentId: number,
    isSpecial: boolean,
    disableCollisionDetection: boolean,
    isAssistant: boolean
  ) {
    if (id == 0) {
      throw new Error(`Invalid ${id}`);
    }

    this.Id = id;
    this.ParentId = parentId;
    this.DataId = dataId;
    this.IsSpecial = isSpecial;
    this.IsAssistant = isAssistant;
    this.DisableCollisionDetection = disableCollisionDetection;
    this.AssistantLayoutStrategyId = null;
    this.LayoutStrategyId = null;
    this.IsCollapsed = false;
    this.Size = new Size(0, 0);
  }
}
