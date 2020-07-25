import LayoutState from "./LayoutState";
import Operation from "./Operation";

export default class LayoutStateOperactionChangedEventArgs {
  State: LayoutState;
  CurrentOperation: Operation;

  constructor(state: LayoutState) {
    this.State = state;
    this.CurrentOperation = state.CurrentOperation;
  }
}
