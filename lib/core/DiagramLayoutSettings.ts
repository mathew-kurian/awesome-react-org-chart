import LayoutStrategyBase from "./LayoutStrategyBase";

export default class DiagramLayoutSettings {
  BranchSpacing: number = 50;
  LayoutStrategies: Map<string, LayoutStrategyBase>;
  DefaultAssistantLayoutStrategyId: string | null = null;
  DefaultLayoutStrategyId: string | null = null;

  constructor() {
    this.BranchSpacing = 50;
    this.LayoutStrategies = new Map<string, LayoutStrategyBase>();
  }

  RequireDefaultLayoutStrategy(): LayoutStrategyBase {
    const id = this.DefaultLayoutStrategyId;

    if (!id) {
      throw new Error("DefaultLayoutStrategyId is null or not valid");
    }

    const result = this.LayoutStrategies.get(id);

    if (!result) {
      throw new Error("DefaultLayoutStrategyId is null or not valid");
    }

    return result;
  }

  RequireDefaultAssistantLayoutStrategy(): LayoutStrategyBase {
    const id = this.DefaultAssistantLayoutStrategyId;

    if (!id) {
      throw new Error(
        "RequireDefaultAssistantLayoutStrategy is null or not valid"
      );
    }

    const result = this.LayoutStrategies.get(id);

    if (!result) {
      throw new Error(
        "RequireDefaultAssistantLayoutStrategy is null or not valid"
      );
    }

    return result;
  }
}
