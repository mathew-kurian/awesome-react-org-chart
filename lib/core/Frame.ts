import Rect from "./Rect";
import Dimensions from "./Dimensions";
import Connector from "./Connector";

export default interface Frame1 {
  Exterior: Rect;
  BranchExterior: Rect;
  SiblingsRowV: Dimensions;
  Connector: Connector;
}
