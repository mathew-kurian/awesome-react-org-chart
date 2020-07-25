import TestDataSource from "./test/TestDataSource";
import TestDataGen from "./test/TestDataGen";
import Diagram from "./modules/Diagram";
import BoxContainer from "./modules/BoxContainer";
import LayoutState from "./modules/LayoutState";
import LinearLayoutStrategy from "./modules/LinearLayoutStrategy";
import LayoutAlgorithm from "./modules/LayoutAlgorithm";
import Size from "./modules/Size";

const dataSource = new TestDataSource();
new TestDataGen().GenerateDataItems(dataSource, 10, 0);

console.log(dataSource);

const boxContainer = new BoxContainer(dataSource);
TestDataGen.GenerateBoxSizes(boxContainer);

const diagram = new Diagram();
diagram.Boxes = boxContainer;

diagram.LayoutSettings.LayoutStrategies.set(
  "default",
  new LinearLayoutStrategy()
);
diagram.LayoutSettings.DefaultLayoutStrategyId = "default";
diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "default";

const state = new LayoutState(diagram);
state.BoxSizeFunc = (dataId: string | null) => {
  if (dataId == null) {
    return new Size(0, 0);
    throw Error("dataId is null");
  }

  const box = boxContainer.BoxesByDataId.get(dataId);

  if (box == null) {
    throw Error("Box is null");
  }

  return box.Size;
};

LayoutAlgorithm.Apply(state);

console.log(diagram.VisualTree);

console.log(5, diagram.VisualTree?.Depth);
