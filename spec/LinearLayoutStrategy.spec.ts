import TestDataSource from "./utils/TestDataSource";
import TestDataGen from "./utils/TestDataGen";
import {
  Diagram,
  BoxContainer,
  LayoutState,
  LinearLayoutStrategy,
  LayoutAlgorithm,
  Size,
} from "../dist";
import "mocha";
import assert from "assert";

describe("LinearLayoutStrategy", () => {
  it("should build a layout 3 levels deep", () => {
    const dataSource = new TestDataSource();
    new TestDataGen().GenerateDataItems(dataSource, 10, 0);

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
        throw Error("dataId is null");
      }

      const box = boxContainer.BoxesByDataId.get(dataId);

      if (box == null) {
        throw Error("Box is null");
      }

      return box.Size;
    };

    LayoutAlgorithm.Apply(state);

    assert.equal(3, diagram.VisualTree?.Depth, "verify depth");
  });
});
