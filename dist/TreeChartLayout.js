"use strict";
//@ts-nocheck
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var bridge_1 = require("./vendor/bridge");
require("./vendor/bridge.collections");
require("./vendor/OrgChartLayout");
var counter = 0;
var TreeChartLayout = /** @class */ (function () {
    function TreeChartLayout(container, dataItems, _a) {
        var branchOptimizer = _a.branchOptimizer, renderCallback = _a.renderCallback, connectorVerticalStyle = _a.connectorVerticalStyle, connectorHorizontalStyle = _a.connectorHorizontalStyle, connectorVerticalClassName = _a.connectorVerticalClassName, connectorHorizontalClassName = _a.connectorHorizontalClassName, parentSpacing = _a.parentSpacing, siblingSpacing = _a.siblingSpacing;
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
    }
    TreeChartLayout.prototype.render = function (nodeContainer, dataItem, level, box) {
        var _this = this;
        nodeContainer.style.position = "absolute";
        return this._renderCallback(nodeContainer, {
            data: dataItem,
            size: box.size,
            setCollapsed: function (collapsed) { return _this._chartApp.boxClick(box.Id, collapsed); },
            collapsed: box.IsCollapsed,
            hidden: box.IsHidden,
            dataBound: box.getIsDataBound(),
            level: level,
        });
    };
    TreeChartLayout.prototype.setSpacing = function (_a) {
        var parentSpacing = _a.parentSpacing, siblingSpacing = _a.siblingSpacing;
        this._parentSpacing = parentSpacing;
        this._siblingSpacing = siblingSpacing;
    };
    TreeChartLayout.prototype.setConnectorStyles = function (_a) {
        var connectorVerticalStyle = _a.connectorVerticalStyle, connectorHorizontalStyle = _a.connectorHorizontalStyle, connectorVerticalClassName = _a.connectorVerticalClassName, connectorHorizontalClassName = _a.connectorHorizontalClassName;
        this._connectorVerticalStyle = connectorVerticalStyle;
        this._connectorHorizontalStyle = connectorHorizontalStyle;
        this._connectorVerticalClassName = connectorVerticalClassName;
        this._connectorHorizontalClassName = connectorHorizontalClassName;
    };
    TreeChartLayout.prototype.setBranchOptimizer = function (branchOptimizer) {
        this._branchOptimizer = branchOptimizer;
    };
    TreeChartLayout.prototype.positionBoxes = function () {
        this._chartApp.positionBoxes();
    };
    TreeChartLayout.prototype.getDataSource = function () {
        var e_1, _a;
        var OrgChart = bridge_1.Bridge.global.OrgChart;
        var dataSource = new OrgChart.Test.TestDataSource();
        new OrgChart.Test.TestDataGen().GenerateDataItems(dataSource, 2, 0);
        dataSource.Items.clear();
        try {
            for (var _b = __values(this._dataItems), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dataItem = _c.value;
                try {
                    dataSource.Items.add(dataItem.getId(), dataItem);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dataSource;
    };
    TreeChartLayout.prototype.setDataItems = function (dataItems) {
        this._dataItems = dataItems;
    };
    TreeChartLayout.createDataItem = function (id, parentId, data) {
        var OrgChart = bridge_1.Bridge.global.OrgChart;
        var dataItem = new OrgChart.Test.TestDataItem();
        dataItem.Id = id;
        dataItem.Data = data;
        dataItem.ParentId = parentId;
        return dataItem;
    };
    TreeChartLayout.prototype.buildChart = function (initData) {
        var chartApp = this._chartApp;
        if (initData) {
            chartApp.initDiagram();
        }
        chartApp.positionBoxes();
    };
    TreeChartLayout.prototype.init = function () {
        var _this = this;
        var ChartApp;
        var OrgChart;
        var chartAppId = counter++;
        bridge_1.Bridge.define("ChartApp" + chartAppId, {
            statics: {
                config: {
                    init: function () { },
                },
                main: function () {
                    bridge_1.Bridge.Console.log = console.log;
                    bridge_1.Bridge.Console.error = console.error;
                    bridge_1.Bridge.Console.debug = console.debug;
                    ChartApp.buildChart(true);
                },
                diagram: {},
                dataSource: {},
                suppressRootBox: false,
                percentAssistants: 10,
                boxClick: function (boxId, collapsed) {
                    var box = ChartApp.diagram.getBoxes().getBoxesById().getItem(boxId);
                    box.IsCollapsed = collapsed;
                    ChartApp.positionBoxes();
                },
                buildChart: function (initData) {
                    if (initData) {
                        ChartApp.initDiagram();
                    }
                    ChartApp.positionBoxes();
                },
                collapseAllBoxes: function (boxContainer, isCollapsed) {
                    var en = boxContainer.getBoxesById().getValues().getEnumerator();
                    while (en.moveNext()) {
                        var box = en.getCurrent();
                        if (!box.IsSpecial) {
                            box.IsCollapsed = isCollapsed;
                        }
                    }
                },
                initDiagram: function () {
                    var e_2, _a;
                    var chartConnectorsPlane = document.createElement("div");
                    chartConnectorsPlane.style.zIndex = 0;
                    _this._container.appendChild(chartConnectorsPlane);
                    _this._chartConnectorsPlane = chartConnectorsPlane;
                    var dataSource = _this.getDataSource();
                    ChartApp.dataSource = dataSource;
                    var boxContainer = new OrgChart.Layout.BoxContainer.$ctor1(dataSource);
                    // if ($("#CollapseAllOnRebuild")[0].checked) {
                    ChartApp.collapseAllBoxes(boxContainer, false);
                    // }
                    ChartApp.diagram = new OrgChart.Layout.Diagram();
                    var diagram = ChartApp.diagram;
                    diagram.setBoxes(boxContainer);
                    var strategies = [], strategy;
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
                    diagram.LayoutSettings.LayoutStrategies.add("singleColumnRight", strategy);
                    strategies.push(strategy);
                    strategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
                    strategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Left;
                    diagram.LayoutSettings.LayoutStrategies.add("singleColumnLeft", strategy);
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
                    try {
                        for (var strategies_1 = __values(strategies), strategies_1_1 = strategies_1.next(); !strategies_1_1.done; strategies_1_1 = strategies_1.next()) {
                            var strategy_1 = strategies_1_1.value;
                            strategy_1.ChildConnectorHookLength = _this._parentSpacing / 2;
                            strategy_1.ParentChildSpacing = _this._parentSpacing;
                            strategy_1.SiblingSpacing = _this._siblingSpacing;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (strategies_1_1 && !strategies_1_1.done && (_a = strategies_1.return)) _a.call(strategies_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    //diagram.LayoutSettings.setBranchSpacing(5);
                },
                getBoxLevel: function (boxContainer, box) {
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
                onLayoutStateChanged: function (sender, args) {
                    if (args.State.getCurrentOperation() ===
                        OrgChart.Layout.LayoutState.Operation.PreprocessVisualTree) {
                        // When layout algorithm is ready to preprocess the tree,
                        // we need to have box sizes ready -> hence have to render visible boxes in HTML.
                        // Rendering can happen at earlier time, but it's just more convenient to do it here,
                        // to utilize some readily available information about visual tree.
                        ChartApp.renderBoxes();
                    }
                },
                renderBoxes: function () {
                    var boxContainer = ChartApp.diagram.getBoxes();
                    var dataSource = ChartApp.dataSource;
                    var visitorFunc = function (node) {
                        var box = node.Element;
                        if (box.getIsDataBound()) {
                            // we're being run when nodes have already been marked as visible or hidden,
                            // based on IsCollapsed attribute of each Box
                            // so use this knowledge to prevent unnecessary rendering of invisible branches
                            var nodeContainer = _this._container.querySelector("[data-box-id=\"" + box.Id + "\"]");
                            if (nodeContainer) {
                                if (node.State.IsHidden) {
                                    nodeContainer.style.display = "none";
                                }
                                else if (node.State.IsCollapsed) {
                                    nodeContainer.style.display = "none";
                                }
                                else {
                                    nodeContainer.style.display = "block";
                                }
                            }
                            else {
                                nodeContainer = document.createElement("div");
                                nodeContainer.setAttribute("data-box-id", box.Id);
                                _this._container.appendChild(nodeContainer);
                                if (node.State.IsHidden) {
                                    return true;
                                }
                                else if (node.State.IsCollapsed) {
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
                            var _a = _this.render(nodeContainer, dataItem, level, box), width = _a.width, height = _a.height;
                            // now store element size, as rendered by browser
                            box.Size = new OrgChart.Layout.Size.$ctor1(width, height);
                            box.size = { width: width, height: height };
                        }
                        return true;
                    };
                    ChartApp.diagram.getVisualTree().IterateParentFirst(visitorFunc);
                },
                getBranchOptimizerFunc: function () {
                    var value = _this._branchOptimizer;
                    var func = ChartApp["branchOptimizerAll__" + value];
                    return func;
                },
                branchOptimizerAll__linear: function (node) {
                    return node.getIsAssistantRoot() ? null : "linear";
                },
                branchOptimizerAll__hanger2: function (node) {
                    return node.getIsAssistantRoot() ? null : "hanger2";
                },
                branchOptimizerAll__hanger4: function (node) {
                    return node.getIsAssistantRoot() ? null : "hanger4";
                },
                branchOptimizerAll__fishbone1: function (node) {
                    return node.getIsAssistantRoot() ? null : "fishbone1";
                },
                branchOptimizerAll__fishbone2: function (node) {
                    return node.getIsAssistantRoot() ? null : "fishbone2";
                },
                branchOptimizerAll__singleColumnLeft: function (node) {
                    return node.getIsAssistantRoot() ? null : "singleColumnRight";
                },
                branchOptimizerAll__singleColumnRight: function (node) {
                    return node.getIsAssistantRoot() ? null : "singleColumnLeft";
                },
                branchOptimizerAll__stackers: function (node) {
                    if (node.getIsAssistantRoot()) {
                        return null;
                    }
                    return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
                        ? "vstackTop"
                        : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
                            ? "vstackMiddle"
                            : "hstack";
                },
                branchOptimizerAll__smart: function (node) {
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
                boxSizeFunc: function (dataId) {
                    // ChartLayoutAlgorithm requires this function to accept data ID
                    // so have to convert it to Box ID first, to get rendered visual element
                    var boxId = ChartApp.diagram
                        .getBoxes()
                        .getBoxesByDataId()
                        .getItem(dataId).Id;
                    return ChartApp.diagram.getBoxes().getBoxesById().getItem(boxId).Size;
                },
                positionBoxes: function () {
                    _this._chartConnectorsPlane.innerHTML = "";
                    var boxContainer = ChartApp.diagram.getBoxes();
                    var dataSource = ChartApp.dataSource;
                    var diagram = ChartApp.diagram;
                    var state = new OrgChart.Layout.LayoutState(diagram);
                    state.addOperationChanged(ChartApp.onLayoutStateChanged);
                    state.BoxSizeFunc = bridge_1.Bridge.fn.bind(_this, ChartApp.boxSizeFunc, null, true);
                    state.LayoutOptimizerFunc = bridge_1.Bridge.fn.bind(_this, ChartApp.getBranchOptimizerFunc(), null, true);
                    OrgChart.Layout.LayoutAlgorithm.Apply(state);
                    var diagramBoundary = OrgChart.Layout.LayoutAlgorithm.ComputeBranchVisualBoundingRect(diagram.getVisualTree());
                    _this._container.style.height = diagramBoundary.Size.Height + "px";
                    _this._container.style.width = diagramBoundary.Size.Width + "px";
                    var offsetx = -diagramBoundary.getLeft();
                    var offsety = 0;
                    var visitorFunc = function (node) {
                        if (node.State.IsHidden) {
                            return false;
                        }
                        var box = node.Element;
                        var size = box.size;
                        var divOffsetX = 0;
                        var divOffsetY = 0;
                        if (box.getIsDataBound()) {
                            // All boxes have already been rendered before the chart layout,
                            // to have all box sizes available before layout.
                            // So now we only have to position them.
                            // Connectors, however, are not rendered until layout is complete (see next block).
                            var div = _this._container.querySelector("[data-box-id=\"" + box.Id + "\"]");
                            if (div) {
                                var x = node.State.TopLeft.X + offsetx + divOffsetX;
                                var y = node.State.TopLeft.Y + offsety + divOffsetY;
                                div.style.left = x + "px";
                                div.style.top = y + "px";
                            }
                        }
                        // Render connectors
                        if (node.State.Connector != null) {
                            for (var ix = 0; ix < node.State.Connector.Segments.length; ix++) {
                                var edge = node.State.Connector.Segments[ix];
                                var edgeType;
                                var topLeft;
                                var width;
                                var height;
                                var style = void 0;
                                var className = void 0;
                                if (edge.From.Y === edge.To.Y) {
                                    style = _this._connectorHorizontalStyle;
                                    className = _this._connectorHorizontalClassName;
                                    height = 1;
                                    if (edge.From.X < edge.To.X) {
                                        topLeft = edge.From;
                                        width = edge.To.X - edge.From.X;
                                    }
                                    else {
                                        topLeft = edge.To;
                                        width = edge.From.X - edge.To.X;
                                    }
                                }
                                else {
                                    style = _this._connectorVerticalStyle;
                                    className = _this._connectorVerticalClassName;
                                    width = 1;
                                    if (edge.From.Y < edge.To.Y) {
                                        topLeft = edge.From;
                                        height = edge.To.Y - edge.From.Y;
                                    }
                                    else {
                                        topLeft = edge.To;
                                        height = edge.From.Y - edge.To.Y;
                                    }
                                }
                                var segment = document.createElement("div");
                                segment.setAttribute("data-line-assistant", String(node.getIsAssistantRoot()));
                                Object.assign(segment.style, {
                                    top: topLeft.Y + offsety + divOffsetY + "px",
                                    left: topLeft.X + offsetx + divOffsetX + "px",
                                    width: width + "px",
                                    height: height + "px",
                                    position: "absolute",
                                    zIndex: 0,
                                    className: className || segment.className,
                                }, style);
                                _this._chartConnectorsPlane.appendChild(segment);
                            }
                        }
                        return true;
                    };
                    diagram.getVisualTree().IterateParentFirst(visitorFunc);
                },
            },
        });
        this._chartApp = ChartApp = bridge_1.Bridge.global["ChartApp" + chartAppId];
        this._orgChart = OrgChart = bridge_1.Bridge.global.OrgChart;
        bridge_1.Bridge.init();
        ChartApp.main();
    };
    return TreeChartLayout;
}());
exports.default = TreeChartLayout;
