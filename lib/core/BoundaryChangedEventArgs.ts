import LayoutLevel from "./LayoutLevel";
import LayoutState from "./LayoutState";
import Boundary from "./Boundary";

export default class BoundaryChangedEventArgs {
  State: LayoutState;
  LayoutLevel: LayoutLevel;
  Boundary: Boundary;

  constructor(
    boundary: Boundary,
    layoutLevel: LayoutLevel,
    state: LayoutState
  ) {
    this.Boundary = boundary;
    this.LayoutLevel = layoutLevel;
    this.State = state;
  }
}
