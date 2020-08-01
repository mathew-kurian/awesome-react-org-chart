import Rect from "./Rect";
import Dimensions from "./Dimensions";
import Connector from "./Connector";

export default interface Frame {
  Exterior: Rect;
  BranchExterior: Rect;
  SiblingsRowV: Dimensions;
  Connector: Connector;
}
