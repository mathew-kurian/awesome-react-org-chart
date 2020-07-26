import Diagram from "../lib/core/Diagram";
import BoxContainer from "../lib/core/BoxContainer";
import Box from "../lib/core/Box";
import Operation from "../lib/core/Operation";
import LinearLayoutStrategy from "../lib/core/LinearLayoutStrategy";
import StackingLayoutStrategy from "../lib/core/StackingLayoutStrategy";
import MultiLineFishboneLayoutStrategy from "../lib/core/MultiLineFishboneLayoutStrategy";
import SingleColumnLayoutStrategy from "../lib/core/SingleColumnLayoutStrategy";
import BranchParentAlignment from "../lib/core/BranchParentAlignment";
import TestDataSource from "../lib/test/TestDataSource";
import TestDataGen from "../lib/test/TestDataGen";
import LayoutStateOperationChangedEventArgs from "../lib/core/LayoutStateOperationChangedEventArgs";
import StackOrientation from "../lib/core/StackOrientation";
import LayoutState from "../lib/core/LayoutState";
import Node from "../lib/core/Node";
import Size from "../lib/core/Size";
import LayoutAlgorithm from "../lib/core/LayoutAlgorithm";
import MultiLineHangerLayoutStrategy from "../lib/core/MultiLineHangerLayoutStrategy";
import FishboneAssistantsLayoutStrategy from "../lib/core/FishboneAssistantsLayoutStrategy";

declare const $;

class ChartApp {
  diagram: Diagram;
  dataSource: TestDataSource;
  suppressRootBox = false;
  totalBoxCount = 20;
  percentAssistants = 10;

  constructor() {
    this.buildChart(true);
  }

  boxClick(boxId: number) {
    const box = this.diagram.Boxes.BoxesById.get(boxId);
    box.IsCollapsed = !box.IsCollapsed;
    this.positionBoxes();
  }

  buildChart(initData: boolean) {
    if (initData) {
      this.initDiagram();
    }
    this.positionBoxes();
  }

  collapseAllBoxes(boxContainer: BoxContainer, isCollapsed) {
    for (const box of boxContainer.BoxesByDataId.values()) {
      if (!box.IsSpecial) {
        box.IsCollapsed = isCollapsed;
      }
    }
  }

  generateData() {
    const count = this.totalBoxCount;
    const percentAssistants = this.percentAssistants;

    const dataSource = new TestDataSource();

    new TestDataGen().GenerateDataItems(dataSource, count, percentAssistants);

    if (this.suppressRootBox) {
      dataSource.Items.delete("0");

      for (const dataItem of dataSource.Items.values()) {
        if (dataItem.ParentId === "0") {
          dataItem.ParentId = null;
        }
      }
    }

    return dataSource;
  }

  initDiagram() {
    $("#myDiagramDiv").html(
      '<div id="myConnectors" class="chartConnectorsPlane"/>'
    );

    const dataSource = this.generateData();

    this.dataSource = dataSource;

    const boxContainer = new BoxContainer(dataSource);
    //OrgChart.Test.TestDataGen.GenerateBoxSizes(boxContainer);

    // @ts-ignore
    if ($("#CollapseAllOnRebuild")[0].checked) {
      this.collapseAllBoxes(boxContainer, true);
    }

    const diagram = (this.diagram = new Diagram());

    diagram.Boxes = boxContainer;

    const linearLayoutStrategy = new LinearLayoutStrategy();
    linearLayoutStrategy.ParentAlignment = BranchParentAlignment.Center;
    diagram.LayoutSettings.LayoutStrategies.set("linear", linearLayoutStrategy);

    let multiLineHangerLayoutStrategy = new MultiLineHangerLayoutStrategy();
    multiLineHangerLayoutStrategy.ParentAlignment =
      BranchParentAlignment.Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 2;
    diagram.LayoutSettings.LayoutStrategies.set(
      "hanger2",
      multiLineHangerLayoutStrategy
    );

    multiLineHangerLayoutStrategy = new MultiLineHangerLayoutStrategy();
    multiLineHangerLayoutStrategy.ParentAlignment =
      BranchParentAlignment.Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 4;
    diagram.LayoutSettings.LayoutStrategies.set(
      "hanger4",
      multiLineHangerLayoutStrategy
    );

    let singleColumnLayoutStrategy = new SingleColumnLayoutStrategy();
    singleColumnLayoutStrategy.ParentAlignment = BranchParentAlignment.Right;
    diagram.LayoutSettings.LayoutStrategies.set(
      "singleColumnRight",
      singleColumnLayoutStrategy
    );

    singleColumnLayoutStrategy = new SingleColumnLayoutStrategy();
    singleColumnLayoutStrategy.ParentAlignment = BranchParentAlignment.Left;
    diagram.LayoutSettings.LayoutStrategies.set(
      "singleColumnLeft",
      singleColumnLayoutStrategy
    );

    let fishboneLayoutStrategy = new MultiLineFishboneLayoutStrategy();
    fishboneLayoutStrategy.ParentAlignment = BranchParentAlignment.Center;
    fishboneLayoutStrategy.MaxGroups = 1;
    diagram.LayoutSettings.LayoutStrategies.set(
      "fishbone1",
      fishboneLayoutStrategy
    );

    fishboneLayoutStrategy = new MultiLineFishboneLayoutStrategy();
    fishboneLayoutStrategy.ParentAlignment = BranchParentAlignment.Center;
    fishboneLayoutStrategy.MaxGroups = 2;
    diagram.LayoutSettings.LayoutStrategies.set(
      "fishbone2",
      fishboneLayoutStrategy
    );

    let hstackLayoutStrategy = new StackingLayoutStrategy();
    hstackLayoutStrategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    hstackLayoutStrategy.Orientation = StackOrientation.SingleRowHorizontal;
    hstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("hstack", hstackLayoutStrategy);

    let vstackLayoutStrategy = new StackingLayoutStrategy();
    vstackLayoutStrategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    vstackLayoutStrategy.Orientation = StackOrientation.SingleColumnVertical;
    vstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("vstack", vstackLayoutStrategy);

    vstackLayoutStrategy = new StackingLayoutStrategy();
    vstackLayoutStrategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    vstackLayoutStrategy.Orientation = StackOrientation.SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 20;
    diagram.LayoutSettings.LayoutStrategies.set(
      "vstackMiddle",
      vstackLayoutStrategy
    );

    vstackLayoutStrategy = new StackingLayoutStrategy();
    vstackLayoutStrategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    vstackLayoutStrategy.Orientation = StackOrientation.SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 50;
    diagram.LayoutSettings.LayoutStrategies.set(
      "vstackTop",
      vstackLayoutStrategy
    );

    let assistantsLayoutStrategy = new FishboneAssistantsLayoutStrategy();
    assistantsLayoutStrategy.ParentAlignment = BranchParentAlignment.Center;
    diagram.LayoutSettings.LayoutStrategies.set(
      "assistants",
      assistantsLayoutStrategy
    );

    diagram.LayoutSettings.DefaultLayoutStrategyId = "fishbone1";
    diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
  }

  getBoxLevel(boxContainer: BoxContainer, box: Box): number {
    let level = 0;
    while (box.ParentId > 0) {
      const value = boxContainer.BoxesById.get(box.ParentId);
      if (!value) {
        break;
      }
      box = value;
      level++;
    }

    return level;
  }

  onLayoutStateChanged = (
    state: LayoutState,
    args: LayoutStateOperationChangedEventArgs
  ) => {
    if (state.CurrentOperation === Operation.PreprocessVisualTree) {
      // When layout algorithm is ready to preprocess the tree,
      // we need to have box sizes ready -> hence have to render visible boxes in HTML.
      // Rendering can happen at earlier time, but it's just more convenient to do it here,
      // to utilize some readily available information about visual tree.
      this.renderBoxes();
    }
  };

  renderBoxes() {
    let boxContainer = this.diagram.Boxes;
    let dataSource = this.dataSource;

    const elements: Element[] = [];
    const expanders: Element[] = [];

    let visitorFunc = (node: Node) => {
      let box = node.Element;

      if (box.IsDataBound) {
        // we're being run when nodes have already been marked as visible or hidden,
        // based on IsCollapsed attribute of each Box
        // so use this knowledge to prevent unnecessary rendering of invisible branches
        let existing = $("#box" + box.Id);
        if (existing.length > 0) {
          let exp = $("#exp" + box.Id);
          if (node.State.IsHidden) {
            existing.hide();
            if (exp.length > 0) exp.hide();
          } else {
            existing.show();
            if (exp.length > 0) exp.show();
          }
          return true;
        } else if (node.State.IsHidden) {
          return true;
        }

        let level = this.getBoxLevel(boxContainer, box);
        let dataItem = dataSource.GetDataItem(box.DataId);

        const className =
          {
            1: "chartBoxTop",
            2: "chartBoxMiddle",
            3: "chartBoxLower",
          }[level] || "chartBoxLowest";

        const position =
          {
            1: "Top",
            2: "Middle",
            3: "Lower",
          }[level] || level;

        const element = document.createElement("div");
        element.className = className;
        element.id = `box${box.Id}`;
        element.style.position = "absolute";
        element.style.width = "150px";
        element.style.height = "auto";
        element.innerText = `${position} - Box #${box.Id}, Data #${box.DataId}, Asst: ${box.IsAssistant}`;
        element.addEventListener("click", () => this.boxClick(box.Id));

        elements.push(element);

        if (node.ChildCount > 0 || node.AssistantsRoot != null) {
          const expander = document.createElement("div");
          expander.id = `exp${box.Id}`;
          expander.className = "expander";
          expander.addEventListener("click", () => this.boxClick(box.Id));

          expanders.push(expander);
        }

        // now store element size, as rendered by browser
        box.Size = this.getBoxElementSize(box.Id);
      }

      return true;
    };

    this.diagram.VisualTree.IterateParentFirst(visitorFunc);

    const myDiagramDiv = document.querySelector("#myDiagramDiv");

    for (const expander of expanders) {
      myDiagramDiv.appendChild(expander);
    }
    for (const element of elements) {
      myDiagramDiv.appendChild(element);
    }
  }

  getBranchOptimizerName(node: Node): string {
    const selector: HTMLInputElement | null = document.querySelector(
      "input[name='SelectBranchOptimizer']:checked"
    );

    const func =
      this["branchOptimizer" + selector?.value] ||
      this.branchOptimizerAllLinear;

    return func(node);
  }

  branchOptimizerAllLinear(node: Node) {
    return node.IsAssistantRoot ? null : "linear";
  }

  branchOptimizerAllHanger2(node: Node) {
    return node.IsAssistantRoot ? null : "hanger2";
  }

  branchOptimizerAllHanger4(node: Node) {
    return node.IsAssistantRoot ? null : "hanger4";
  }

  branchOptimizerAllFishbone1(node: Node) {
    return node.IsAssistantRoot ? null : "fishbone1";
  }

  branchOptimizerAllFishbone2(node: Node) {
    return node.IsAssistantRoot ? null : "fishbone2";
  }

  branchOptimizerAllSingleColumnLeft(node: Node) {
    return node.IsAssistantRoot ? null : "singleColumnRight";
  }

  branchOptimizerAllSingleColumnRight(node: Node) {
    return node.IsAssistantRoot ? null : "singleColumnLeft";
  }

  branchOptimizerStackers(node: Node) {
    if (node.IsAssistantRoot) {
      return null;
    }
    return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
      ? "vstackTop"
      : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
      ? "vstackMiddle"
      : "hstack";
  }

  branchOptimizerSmart(node: Node) {
    if (node.IsAssistantRoot) {
      return null;
    }

    let childCount = node.ChildCount;

    if (childCount <= 1) {
      return "vstack";
    }

    let nonLeafChildren = 0;
    for (let i = 0; i < childCount; i++) {
      if (node.Children[i].ChildCount > 0) {
        nonLeafChildren++;
      }
    }

    if (nonLeafChildren <= 1) {
      if (childCount <= 4) {
        return "vstack";
      }
      if (childCount <= 8) {
        return "fishbone1";
      }
      return "fishbone2";
    }

    return "hanger4";
  }

  boxSizeFunc(dataId: string) {
    // ChartLayoutAlgorithm requires this function to accept data ID
    // so have to convert it to Box ID first, to get rendered visual element
    let boxId = this.diagram.Boxes.BoxesByDataId.get(dataId).Id;
    return this.diagram.Boxes.BoxesById.get(boxId).Size;
  }

  getBoxElementSize(boxId: number) {
    return new Size(160, 50);
  }

  positionBoxes() {
    $("#myConnectors").html("");

    let boxContainer = this.diagram.Boxes;
    let dataSource = this.dataSource;
    let diagram = this.diagram;

    let state = new LayoutState(diagram);

    state.OperationChanged = this.onLayoutStateChanged;
    state.BoxSizeFunc = (dataId: string) => this.boxSizeFunc(dataId);

    state.LayoutOptimizerFunc = (node: Node) =>
      this.getBranchOptimizerName(node);

    console.log("positionBoxes");

    LayoutAlgorithm.Apply(state);

    const diagramBoundary = LayoutAlgorithm.ComputeBranchVisualBoundingRect(
      diagram.VisualTree
    );

    const myDiagramDiv: HTMLElement = document.querySelector("#myDiagramDiv");

    if (myDiagramDiv == null) {
      throw Error("Cannot find #myDiagramDiv");
    }

    myDiagramDiv.style.width = `${diagramBoundary.Size.Width}px`;
    myDiagramDiv.style.height = `${diagramBoundary.Size.Height}px`;

    let offsetx = -diagramBoundary.Left;
    let offsety = -diagramBoundary.Top;

    const connectors: Element[] = [];

    let visitorFunc = function (node: Node) {
      if (node.State.IsHidden) {
        return false;
      }

      let box = node.Element;

      if (box.IsDataBound) {
        // All boxes have already been rendered before the chart layout,
        // to have all box sizes available before layout.
        // So now we only have to position them.
        // Connectors, however, are not rendered until layout is complete (see next block).

        const element: HTMLElement | null = document.querySelector(
          `#box${box.Id}`
        );

        if (element) {
          let x = node.State.TopLeft.X + offsetx;
          let y = node.State.TopLeft.Y + offsety;

          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          element.style.width = `${node.State.Size.Width}px`;
          element.style.height = `${node.State.Size.Height}px`;

          if (node.ChildCount > 0 || node.AssistantsRoot != null) {
            const exp: HTMLElement | null = document.querySelector(
              "#exp" + box.Id
            );
            if (exp) {
              x = node.State.Right + offsetx - 15;
              y = node.State.Bottom + offsety - 15;

              exp.style.left = `${x}px`;
              exp.style.top = `${y}px`;

              if (box.IsCollapsed) {
                exp.innerText = "▼";
              } else {
                exp.innerText = "△";
              }
            }
          }
        }
      }

      // Render connectors
      if (node.State.Connector != null) {
        for (let ix = 0; ix < node.State.Connector.Segments.length; ix++) {
          let edge = node.State.Connector.Segments[ix];
          let edgeType;
          let topLeft;
          let width;
          let height;
          if (edge.From.Y === edge.To.Y) {
            edgeType = "chartHLine";
            height = 1;
            if (edge.From.X < edge.To.X) {
              topLeft = edge.From;
              width = edge.To.X - edge.From.X;
            } else {
              topLeft = edge.To;
              width = edge.From.X - edge.To.X;
            }
          } else {
            edgeType = "chartVLine";
            width = 1;
            if (edge.From.Y < edge.To.Y) {
              topLeft = edge.From;
              height = edge.To.Y - edge.From.Y;
            } else {
              topLeft = edge.To;
              height = edge.From.Y - edge.To.Y;
            }
          }

          if (node.IsAssistantRoot) {
            edgeType = edgeType + "Dotted";
          }

          const connector = document.createElement("div");
          connector.className = edgeType;
          connector.style.top = `${topLeft.Y + offsety}px`;
          connector.style.left = `${topLeft.X + offsetx}px`;
          connector.style.width = `${width}px`;
          connector.style.height = `${height}px`;

          connectors.push(connector);
        }
      }

      return true;
    };

    diagram.VisualTree.IterateParentFirst(visitorFunc);

    const myConnectors = document.querySelector("#myConnectors");
    for (const connector of connectors) {
      myConnectors.appendChild(connector);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded!");

  // @ts-ignore
  if (window.chartApp) {
    return;
  }
  // @ts-ignore
  const chartApp = (window.chartApp = new ChartApp());

  // @ts-ignore
  window.changedSuppressRootBox = function changedSuppressRootBox(cb) {
    chartApp.suppressRootBox = cb.checked;
    chartApp.buildChart(true);
  };

  // @ts-ignore
  window.clickCollapseAll = function clickCollapseAll(bt) {
    chartApp.collapseAllBoxes(chartApp.diagram.Boxes, true);
    chartApp.buildChart(false);
  };

  // @ts-ignore
  window.clickExpandAll = function clickExpandAll(bt) {
    chartApp.collapseAllBoxes(chartApp.diagram.Boxes, false);
    chartApp.buildChart(false);
  };

  // @ts-ignore
  window.clickOptimizer = function clickOptimizer(rd) {
    chartApp.buildChart(false);
  };

  // @ts-ignore
  window.clickDataCounts = function clickDataCounts(rd) {
    let value = rd.value;
    if (value === "small") {
      chartApp.totalBoxCount = 20;
      chartApp.percentAssistants = 0;
    } else if (value === "small-a") {
      chartApp.totalBoxCount = 20;
      chartApp.percentAssistants = 10;
    } else if (value === "large") {
      chartApp.totalBoxCount = 200;
      chartApp.percentAssistants = 0;
    } else if (value === "large-a") {
      chartApp.totalBoxCount = 200;
      chartApp.percentAssistants = 10;
    } else if (value === "huge-a") {
      chartApp.totalBoxCount = 1000;
      chartApp.percentAssistants = 5;
    }

    chartApp.buildChart(true);
  };
});
