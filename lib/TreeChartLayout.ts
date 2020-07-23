//@ts-nocheck

import { Bridge } from "./vendor/bridge";
import "./vendor/bridge.collections";
import "./vendor/OrgChartLayout";

let counter = 0;

export default class TreeChartLayout {
  constructor(
    container,
    dataItems,
    {
      branchOptimizer,
      renderCallback,
      connectorVerticalStyle,
      connectorHorizontalStyle,
      connectorVerticalClassName,
      connectorHorizontalClassName,
      parentSpacing,
      siblingSpacing,
    }
  ) {
    this._container = container;
    this._renderCallback = renderCallback;
    this._branchOptimizer = branchOptimizer;
    this._dataItems = dataItems;
    this._connectorVerticalStyle = connectorVerticalStyle;
    this._connectorHorizontalStyle = connectorHorizontalStyle;
    this._connectorVerticalClassName = connectorVerticalClassName;
    this._connectorHorizontalClassName = connectorHorizontalClassName;
    this._parentSpacing = parentSpacing;
    this._siblingSpacing = siblingSpacing;
    this._renderCount = 0;
  }

  render(nodeContainer, dataItem, level, box) {
    nodeContainer.style.position = "absolute";

    return this._renderCallback(nodeContainer, {
      data: dataItem,
      size: box.size,
      setCollapsed: (collapsed) => this._chartApp.boxClick(box.Id, collapsed),
      collapsed: box.IsCollapsed,
      hidden: box.IsHidden,
      dataBound: box.getIsDataBound(),
      level,
    });
  }

  renderCount() {
    return this._renderCount;
  }

  setSpacing({ parentSpacing, siblingSpacing }) {
    this._parentSpacing = parentSpacing;
    this._siblingSpacing = siblingSpacing;
  }

  setConnectorStyles({
    connectorVerticalStyle,
    connectorHorizontalStyle,
    connectorVerticalClassName,
    connectorHorizontalClassName,
  }) {
    this._connectorVerticalStyle = connectorVerticalStyle;
    this._connectorHorizontalStyle = connectorHorizontalStyle;
    this._connectorVerticalClassName = connectorVerticalClassName;
    this._connectorHorizontalClassName = connectorHorizontalClassName;
  }

  setBranchOptimizer(branchOptimizer) {
    this._branchOptimizer = branchOptimizer;
  }

  positionBoxes() {
    this._chartApp.positionBoxes();
  }

  rerender() {
    this._chartApp.renderBoxes();
  }

  getDataSource() {
    const OrgChart = Bridge.global.OrgChart;
    var dataSource = new OrgChart.Test.TestDataSource();

    new OrgChart.Test.TestDataGen().GenerateDataItems(dataSource, 2, 0);

    dataSource.Items.clear();

    for (const dataItem of this._dataItems) {
      try {
        dataSource.Items.add(dataItem.getId(), dataItem);
      } catch (e) {
        console.error(e);
      }
    }

    return dataSource;
  }

  setDataItems(dataItems) {
    this._dataItems = dataItems;
  }

  static createDataItem(id, parentId, data) {
    const OrgChart = Bridge.global.OrgChart;
    const dataItem = new OrgChart.Test.TestDataItem();

    dataItem.Id = id;
    dataItem.Data = data;
    dataItem.ParentId = parentId;

    return dataItem;
  }

  buildChart(initData) {
    const chartApp = this._chartApp;

    if (initData) {
      chartApp.initDiagram();
    }

    chartApp.positionBoxes();
  }

  init() {
    var ChartApp;
    var OrgChart;
    var chartAppId = counter++;

    Bridge.define("ChartApp" + chartAppId, {
      statics: {
        config: {
          init: () => {},
        },
        main: () => {
          Bridge.Console.log = console.log;
          Bridge.Console.error = console.error;
          Bridge.Console.debug = console.debug;

          ChartApp.buildChart(true);
        },

        diagram: {},
        dataSource: {},
        suppressRootBox: false,
        percentAssistants: 10,

        boxClick: (boxId, collapsed) => {
          var box = ChartApp.diagram.getBoxes().getBoxesById().getItem(boxId);
          box.IsCollapsed = collapsed;
          ChartApp.positionBoxes();
        },

        buildChart: (initData) => {
          if (initData) {
            ChartApp.initDiagram();
          }
          ChartApp.positionBoxes();
        },

        collapseAllBoxes: (boxContainer, isCollapsed) => {
          var en = boxContainer.getBoxesById().getValues().getEnumerator();
          while (en.moveNext()) {
            var box = en.getCurrent();
            if (!box.IsSpecial) {
              box.IsCollapsed = isCollapsed;
            }
          }
        },

        initDiagram: () => {
          const chartConnectorsPlane = document.createElement("div");
          chartConnectorsPlane.style.zIndex = 0;

          this._container.appendChild(chartConnectorsPlane);

          if (this._chartConnectorsPlane != null) {
            this._container.removeChild(this._chartConnectorsPlane);
          }

          this._chartConnectorsPlane = chartConnectorsPlane;

          var dataSource = this.getDataSource();

          ChartApp.dataSource = dataSource;

          var boxContainer = new OrgChart.Layout.BoxContainer.$ctor1(
            dataSource
          );

          // if ($("#CollapseAllOnRebuild")[0].checked) {
          ChartApp.collapseAllBoxes(boxContainer, false);
          // }

          ChartApp.diagram = new OrgChart.Layout.Diagram();

          var diagram = ChartApp.diagram;
          diagram.setBoxes(boxContainer);

          var strategies = [],
            strategy;

          strategy = new OrgChart.Layout.LinearLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          diagram.LayoutSettings.LayoutStrategies.add("linear", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          strategy.MaxSiblingsPerRow = 2;
          diagram.LayoutSettings.LayoutStrategies.add("hanger2", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          strategy.MaxSiblingsPerRow = 4;
          diagram.LayoutSettings.LayoutStrategies.add("hanger4", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Right;
          diagram.LayoutSettings.LayoutStrategies.add(
            "singleColumnRight",
            strategy
          );

          strategies.push(strategy);

          strategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
          strategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Left;
          diagram.LayoutSettings.LayoutStrategies.add(
            "singleColumnLeft",
            strategy
          );

          strategies.push(strategy);

          strategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          strategy.MaxGroups = 1;
          diagram.LayoutSettings.LayoutStrategies.add("fishbone1", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          strategy.MaxGroups = 2;
          diagram.LayoutSettings.LayoutStrategies.add("fishbone2", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.StackingLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.InvalidValue;
          strategy.Orientation =
            OrgChart.Layout.StackOrientation.SingleRowHorizontal;
          strategy.ParentChildSpacing = 10;
          diagram.LayoutSettings.LayoutStrategies.add("hstack", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.StackingLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.InvalidValue;
          strategy.Orientation =
            OrgChart.Layout.StackOrientation.SingleColumnVertical;
          strategy.ParentChildSpacing = 10;
          diagram.LayoutSettings.LayoutStrategies.add("vstack", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.StackingLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.InvalidValue;
          strategy.Orientation =
            OrgChart.Layout.StackOrientation.SingleColumnVertical;
          strategy.SiblingSpacing = 20;
          diagram.LayoutSettings.LayoutStrategies.add("vstackMiddle", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.StackingLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.InvalidValue;
          strategy.Orientation =
            OrgChart.Layout.StackOrientation.SingleColumnVertical;
          strategy.SiblingSpacing = 50;
          diagram.LayoutSettings.LayoutStrategies.add("vstackTop", strategy);

          strategies.push(strategy);

          strategy = new OrgChart.Layout.FishboneAssistantsLayoutStrategy();
          strategy.ParentAlignment =
            OrgChart.Layout.BranchParentAlignment.Center;
          diagram.LayoutSettings.LayoutStrategies.add("assistants", strategy);

          strategies.push(strategy);

          diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
          diagram.LayoutSettings.DefaultAssistantLayoutStrategyId =
            "assistants";

          for (const strategy of strategies) {
            strategy.ChildConnectorHookLength = this._parentSpacing / 2;
            strategy.ParentChildSpacing = this._parentSpacing;
            strategy.SiblingSpacing = this._siblingSpacing;
          }

          //diagram.LayoutSettings.setBranchSpacing(5);
        },

        getBoxLevel: (boxContainer, box) => {
          var level = 0;
          var obj = {};
          while (box.ParentId > 0) {
            if (!boxContainer.getBoxesById().tryGetValue(box.ParentId, obj)) {
              break;
            }
            box = obj.v;
            level++;
          }

          return level;
        },

        onLayoutStateChanged: (sender, args) => {
          if (
            args.State.getCurrentOperation() ===
            OrgChart.Layout.LayoutState.Operation.PreprocessVisualTree
          ) {
            // When layout algorithm is ready to preprocess the tree,
            // we need to have box sizes ready -> hence have to render visible boxes in HTML.
            // Rendering can happen at earlier time, but it's just more convenient to do it here,
            // to utilize some readily available information about visual tree.
            ChartApp.renderBoxes();
          }
        },

        renderBoxes: () => {
          this._renderCount++;

          var boxContainer = ChartApp.diagram.getBoxes();
          var dataSource = ChartApp.dataSource;

          var visitorFunc = (node) => {
            var box = node.Element;

            if (box.getIsDataBound()) {
              // we're being run when nodes have already been marked as visible or hidden,
              // based on IsCollapsed attribute of each Box
              // so use this knowledge to prevent unnecessary rendering of invisible branches
              var nodeContainer = this._container.querySelector(
                `[data-box-id="${box.Id}"]`
              );

              if (nodeContainer) {
                if (node.State.IsHidden) {
                  nodeContainer.style.display = "none";
                } else if (node.State.IsCollapsed) {
                  nodeContainer.style.display = "none";
                } else {
                  nodeContainer.style.display = "block";
                }
              } else {
                nodeContainer = document.createElement("div");
                nodeContainer.setAttribute("data-box-id", box.Id);

                this._container.appendChild(nodeContainer);

                if (node.State.IsHidden) {
                  return true;
                } else if (node.State.IsCollapsed) {
                  return true;
                }
              }

              var level = ChartApp.getBoxLevel(boxContainer, box);
              var dataItem = dataSource.Items.getItem(box.DataId).Data;

              // if (node.getChildCount() > 0 || node.AssistantsRoot != null) {
              //   $("#myDiagramDiv").append(expanderHtml.format(box.Id));
              // }

              // const boxContainer = this._container.querySelector(
              //   `[data-box-id="${box.Id}"]`
              // );

              const { width, height } = this.render(
                nodeContainer,
                dataItem,
                level,
                box
              );

              // now store element size, as rendered by browser
              box.Size = new OrgChart.Layout.Size.$ctor1(width, height);
              box.size = { width, height };
            }

            return true;
          };

          ChartApp.diagram.getVisualTree().IterateParentFirst(visitorFunc);
        },

        getBranchOptimizerFunc: () => {
          var value = this._branchOptimizer;
          var func = ChartApp["branchOptimizerAll__" + value];

          return func;
        },

        branchOptimizerAll__linear: (node) => {
          return node.getIsAssistantRoot() ? null : "linear";
        },

        branchOptimizerAll__hanger2: (node) => {
          return node.getIsAssistantRoot() ? null : "hanger2";
        },

        branchOptimizerAll__hanger4: (node) => {
          return node.getIsAssistantRoot() ? null : "hanger4";
        },

        branchOptimizerAll__fishbone1: (node) => {
          return node.getIsAssistantRoot() ? null : "fishbone1";
        },

        branchOptimizerAll__fishbone2: (node) => {
          return node.getIsAssistantRoot() ? null : "fishbone2";
        },

        branchOptimizerAll__singleColumnLeft: (node) => {
          return node.getIsAssistantRoot() ? null : "singleColumnRight";
        },

        branchOptimizerAll__singleColumnRight: (node) => {
          return node.getIsAssistantRoot() ? null : "singleColumnLeft";
        },

        branchOptimizerAll__stackers: (node) => {
          if (node.getIsAssistantRoot()) {
            return null;
          }
          return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
            ? "vstackTop"
            : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
            ? "vstackMiddle"
            : "hstack";
        },

        branchOptimizerAll__smart: (node) => {
          if (node.getIsAssistantRoot()) {
            return null;
          }

          var childCount = node.getChildCount();

          if (childCount <= 1) {
            return "vstack";
          }

          var nonLeafChildren = 0;
          for (var i = 0; i < childCount; i++) {
            if (node.Children.getItem(i).getChildCount() > 0) {
              nonLeafChildren++;
            }
          }

          if (nonLeafChildren <= 1) {
            if (childCount <= 4) {
              return "linear";
            }
            if (childCount <= 8) {
              return "fishbone1";
            }
            return "fishbone2";
          }

          return "hanger4";
        },

        boxSizeFunc: (dataId) => {
          // ChartLayoutAlgorithm requires this function to accept data ID
          // so have to convert it to Box ID first, to get rendered visual element
          var boxId = ChartApp.diagram
            .getBoxes()
            .getBoxesByDataId()
            .getItem(dataId).Id;
          return ChartApp.diagram.getBoxes().getBoxesById().getItem(boxId).Size;
        },

        positionBoxes: () => {
          this._chartConnectorsPlane.innerHTML = "";

          var boxContainer = ChartApp.diagram.getBoxes();
          var dataSource = ChartApp.dataSource;
          var diagram = ChartApp.diagram;

          var state = new OrgChart.Layout.LayoutState(diagram);

          state.addOperationChanged(ChartApp.onLayoutStateChanged);

          state.BoxSizeFunc = Bridge.fn.bind(
            this,
            ChartApp.boxSizeFunc,
            null,
            true
          );

          state.LayoutOptimizerFunc = Bridge.fn.bind(
            this,
            ChartApp.getBranchOptimizerFunc(),
            null,
            true
          );

          OrgChart.Layout.LayoutAlgorithm.Apply(state);

          var diagramBoundary = OrgChart.Layout.LayoutAlgorithm.ComputeBranchVisualBoundingRect(
            diagram.getVisualTree()
          );

          this._container.style.height = `${diagramBoundary.Size.Height}px`;
          this._container.style.width = `${diagramBoundary.Size.Width}px`;

          var offsetx = -diagramBoundary.getLeft();
          var offsety = 0;

          var visitorFunc = (node) => {
            if (node.State.IsHidden) {
              return false;
            }

            var box = node.Element;
            var size = box.size;

            let divOffsetX = 0;
            let divOffsetY = 0;

            if (box.getIsDataBound()) {
              // All boxes have already been rendered before the chart layout,
              // to have all box sizes available before layout.
              // So now we only have to position them.
              // Connectors, however, are not rendered until layout is complete (see next block).

              var div = this._container.querySelector(
                `[data-box-id="${box.Id}"]`
              );

              if (div) {
                var x = node.State.TopLeft.X + offsetx + divOffsetX;
                var y = node.State.TopLeft.Y + offsety + divOffsetY;

                div.style.left = `${x}px`;
                div.style.top = `${y}px`;
              }
            }

            // Render connectors
            if (node.State.Connector != null) {
              for (
                var ix = 0;
                ix < node.State.Connector.Segments.length;
                ix++
              ) {
                var edge = node.State.Connector.Segments[ix];
                var edgeType;
                var topLeft;
                var width;
                var height;
                let style;
                let className;

                if (edge.From.Y === edge.To.Y) {
                  style = this._connectorHorizontalStyle;
                  className = this._connectorHorizontalClassName;
                  height = 1;
                  if (edge.From.X < edge.To.X) {
                    topLeft = edge.From;
                    width = edge.To.X - edge.From.X;
                  } else {
                    topLeft = edge.To;
                    width = edge.From.X - edge.To.X;
                  }
                } else {
                  style = this._connectorVerticalStyle;
                  className = this._connectorVerticalClassName;
                  width = 1;
                  if (edge.From.Y < edge.To.Y) {
                    topLeft = edge.From;
                    height = edge.To.Y - edge.From.Y;
                  } else {
                    topLeft = edge.To;
                    height = edge.From.Y - edge.To.Y;
                  }
                }

                const segment = document.createElement("div");
                segment.setAttribute(
                  "data-line-assistant",
                  String(node.getIsAssistantRoot())
                );

                Object.assign(
                  segment.style,
                  {
                    top: `${topLeft.Y + offsety + divOffsetY}px`,
                    left: `${topLeft.X + offsetx + divOffsetX}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    position: "absolute",
                    zIndex: 0,
                    className: className || segment.className,
                  },
                  style
                );

                this._chartConnectorsPlane.appendChild(segment);
              }
            }

            return true;
          };

          diagram.getVisualTree().IterateParentFirst(visitorFunc);
        },
      },
    });

    this._chartApp = ChartApp = Bridge.global[`ChartApp${chartAppId}`];
    this._orgChart = OrgChart = Bridge.global.OrgChart;

    Bridge.init();
    ChartApp.main();
  }
}
