import BranchParentAlignment from "./BranchParentAlignment";
import LayoutState from "./LayoutState";
import Node from "./Node";
import LayoutLevel from "./LayoutLevel";

export default abstract class LayoutStrategyBase {
  ParentAlignment: BranchParentAlignment = BranchParentAlignment.InvalidValue;
  ParentChildSpacing: number = 20;
  ParentConnectorShield: number = 50;
  SiblingSpacing: number = 20;
  ChildConnectorHookLength: number = 5;

  get SupportsAssistants(): boolean {
    return this.GetSupportsAssistants();
  }

  abstract GetSupportsAssistants(): boolean;
  abstract PreProcessThisNode(state: LayoutState, node: Node): void;
  abstract ApplyVerticalLayout(state: LayoutState, level: LayoutLevel): void;
  abstract ApplyHorizontalLayout(state: LayoutState, level: LayoutLevel): void;
  abstract RouteConnectors(state: LayoutState, node: Node): void;
}
