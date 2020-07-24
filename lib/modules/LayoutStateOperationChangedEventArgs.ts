import LayoutState from "./LayoutState";

export default class LayoutStateOperactionChangedEventArgs {
  State: LayoutState;

  constructor(state: LayoutState) {
    this.State = state;
  }
}
