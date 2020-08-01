/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/VanillaExample.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/Animated.js":
/*!**************************!*\
  !*** ./dist/Animated.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var Animated = /** @class */ (function (_super) {
    __extends(Animated, _super);
    function Animated() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            transition: _this.props.entranceTransition || "opacity 800ms",
            opacity: 0,
            firstVisible: false,
        };
        return _this;
    }
    Animated.getDerivedStateFromProps = function (_a, state) {
        var context = _a.context, _b = _a.defaultTransition, defaultTransition = _b === void 0 ? "transform 800ms, opacity 800ms" : _b, _c = _a.entranceTransition, entranceTransition = _c === void 0 ? "opacity 800ms" : _c;
        if (context.hidden) {
            return { opacity: 0 };
        }
        else if (!state.firstVisible) {
            return { opacity: 1, transition: entranceTransition, firstVisible: true };
        }
        else {
            return { opacity: 1, transition: defaultTransition };
        }
    };
    Animated.prototype.render = function () {
        var _a = this.props, node = _a.node, context = _a.context, props = _a.props, getStyle = _a.getStyle;
        var _b = this.state, opacity = _b.opacity, transition = _b.transition;
        var style = getStyle ? getStyle(node, props, context) : null;
        return (react_1.default.createElement("div", __assign({}, props, { style: __assign(__assign(__assign({}, props.style), { opacity: opacity,
                transition: transition }), style) })));
    };
    return Animated;
}(react_1.default.Component));
exports.default = Animated;


/***/ }),

/***/ "./dist/OrgChart.js":
/*!**************************!*\
  !*** ./dist/OrgChart.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var core_1 = __webpack_require__(/*! ./core */ "./dist/core/index.js");
var NOOP_SIZE = new core_1.Size(5, 5);
var OrgChartDiagram = /** @class */ (function (_super) {
    __extends(OrgChartDiagram, _super);
    function OrgChartDiagram(dataSource) {
        var _this = _super.call(this) || this;
        _this.DataSource = dataSource;
        return _this;
    }
    return OrgChartDiagram;
}(core_1.Diagram));
var OrgChart = /** @class */ (function (_super) {
    __extends(OrgChart, _super);
    function OrgChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            lines: Array(),
            width: 0,
            height: 0,
            diagram: null,
            nodes: [],
            hidden: true,
            boundaries: [],
            prevProps: null,
            renderIndex: 0,
        };
        _this._mounted = true;
        _this._container = react_1.default.createRef();
        _this.onComputeBranchOptimizer = function (node) {
            var _a = _this.props.layout, layout = _a === void 0 ? "linear" : _a;
            if (node.IsAssistantRoot) {
                var _b = _this.props.assistantLayout, assistantLayout = _b === void 0 ? "assistants" : _b;
                if (assistantLayout instanceof core_1.LayoutStrategyBase) {
                    return "assistantCustom";
                }
                else {
                    return assistantLayout;
                }
            }
            else if (layout === "smart") {
                return OrgChart.getBranchOptimizerSmart(node);
            }
            else if (layout === "stackers") {
                return OrgChart.getBranchOptimizerStackers(node);
            }
            else if (layout instanceof core_1.LayoutStrategyBase) {
                return "custom";
            }
            else {
                return layout;
            }
        };
        _this._lastRenderIndex = 0;
        return _this;
    }
    OrgChart.assignStrategies = function (diagram) {
        var strategies = [];
        var strategy;
        strategy = new core_1.LinearLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        diagram.LayoutSettings.LayoutStrategies.set("linear", strategy);
        strategies.push(strategy);
        strategy = new core_1.MultiLineHangerLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        strategy.MaxSiblingsPerRow = 2;
        diagram.LayoutSettings.LayoutStrategies.set("hanger2", strategy);
        strategies.push(strategy);
        strategy = new core_1.MultiLineHangerLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        strategy.MaxSiblingsPerRow = 4;
        diagram.LayoutSettings.LayoutStrategies.set("hanger4", strategy);
        strategies.push(strategy);
        strategy = new core_1.SingleColumnLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Right;
        diagram.LayoutSettings.LayoutStrategies.set("singleColumnRight", strategy);
        strategies.push(strategy);
        strategy = new core_1.SingleColumnLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Left;
        diagram.LayoutSettings.LayoutStrategies.set("singleColumnLeft", strategy);
        strategies.push(strategy);
        strategy = new core_1.MultiLineFishboneLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        strategy.MaxGroups = 1;
        diagram.LayoutSettings.LayoutStrategies.set("fishbone1", strategy);
        strategies.push(strategy);
        strategy = new core_1.MultiLineFishboneLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        strategy.MaxGroups = 2;
        diagram.LayoutSettings.LayoutStrategies.set("fishbone2", strategy);
        strategies.push(strategy);
        strategy = new core_1.StackingLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.InvalidValue;
        strategy.Orientation =
            core_1.StackOrientation.SingleRowHorizontal;
        strategy.ParentChildSpacing = 10;
        diagram.LayoutSettings.LayoutStrategies.set("hstack", strategy);
        strategies.push(strategy);
        strategy = new core_1.StackingLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.InvalidValue;
        strategy.Orientation =
            core_1.StackOrientation.SingleColumnVertical;
        strategy.ParentChildSpacing = 10;
        diagram.LayoutSettings.LayoutStrategies.set("vstack", strategy);
        strategies.push(strategy);
        strategy = new core_1.StackingLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.InvalidValue;
        strategy.Orientation =
            core_1.StackOrientation.SingleColumnVertical;
        strategy.SiblingSpacing = 20;
        diagram.LayoutSettings.LayoutStrategies.set("vstackMiddle", strategy);
        strategies.push(strategy);
        strategy = new core_1.StackingLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.InvalidValue;
        strategy.Orientation =
            core_1.StackOrientation.SingleColumnVertical;
        strategy.SiblingSpacing = 50;
        diagram.LayoutSettings.LayoutStrategies.set("vstackTop", strategy);
        strategies.push(strategy);
        strategy = new core_1.FishboneAssistantsLayoutStrategy();
        strategy.ParentAlignment = core_1.BranchParentAlignment.Center;
        diagram.LayoutSettings.LayoutStrategies.set("assistants", strategy);
        strategies.push(strategy);
        diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
        diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
        return strategies;
    };
    OrgChart.getDataSource = function (props) {
        var root = props.root, childNodesGetter = props.childNodesGetter, keyGetter = props.keyGetter, isAssistantGetter = props.isAssistantGetter;
        var items = new Map();
        var sortedKeys = [];
        var processNode = function (node, parentKey) {
            var e_1, _a;
            if (parentKey === void 0) { parentKey = null; }
            var key = keyGetter(node);
            if (true) {
                if (!key) {
                    throw Error("Invalid key");
                }
                if (items.has(key)) {
                    throw Error("Duplicate key");
                }
            }
            sortedKeys.push(key);
            var emphasized = isAssistantGetter ? isAssistantGetter(node) : false;
            items.set(key, {
                IsAssistant: emphasized,
                Id: key,
                data: node,
                parentKey: parentKey,
            });
            try {
                for (var _b = __values(childNodesGetter(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var childNode = _c.value;
                    processNode(childNode, key);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        processNode(root, null);
        var getDataItem = function (id) {
            var item = items.get(id);
            if (item == null) {
                throw Error("Could not find item");
            }
            return item;
        };
        return {
            GetDataItemFunc: function (id) { return getDataItem(id); },
            GetParentKeyFunc: function (id) { var _a; return ((_a = items.get(id)) === null || _a === void 0 ? void 0 : _a.parentKey) || null; },
            AllDataItemIds: sortedKeys,
        };
    };
    OrgChart.getBranchOptimizerStackers = function (node) {
        if (node.IsAssistantRoot) {
            return null;
        }
        return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
            ? "vstackTop"
            : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
                ? "vstackMiddle"
                : "hstack";
    };
    OrgChart.getBranchOptimizerSmart = function (node) {
        if (node.IsAssistantRoot) {
            return null;
        }
        var childCount = node.ChildCount;
        if (childCount <= 1) {
            return "vstack";
        }
        var nonLeafChildren = 0;
        for (var i = 0; i < childCount; i++) {
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
    };
    OrgChart.prototype.componentWillUnmount = function () {
        this._mounted = true;
    };
    OrgChart.getDerivedStateFromProps = function (props, state) {
        if (props !== state.prevProps) {
            var diagram = OrgChart.createDiagram(props);
            var placeholders = OrgChart.getPlaceholders(diagram, state.nodes);
            return __assign(__assign({ diagram: diagram }, placeholders), { prevProps: props, renderIndex: state.renderIndex + 1 });
        }
        return { prevProps: props };
    };
    OrgChart.prototype.componentWillMount = function () {
        var nextState = OrgChart.getDerivedStateFromProps(this.props, this.state);
        // @ts-ignore
        this.setState(nextState);
    };
    OrgChart.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps !== this.props) {
            var nextState = OrgChart.getDerivedStateFromProps(nextProps, this.state);
            // @ts-ignore
            this.setState(nextState);
        }
    };
    OrgChart.createDiagram = function (props) {
        var e_2, _a;
        var layout = props.layout, assistantLayout = props.assistantLayout, _b = props.parentSpacing, parentSpacing = _b === void 0 ? 40 : _b, _c = props.siblingSpacing, siblingSpacing = _c === void 0 ? 30 : _c;
        var dataSource = OrgChart.getDataSource(props);
        var boxContainer = new core_1.BoxContainer(dataSource);
        var diagram = new OrgChartDiagram(dataSource);
        diagram.Boxes = boxContainer;
        var strategies = OrgChart.assignStrategies(diagram);
        if (layout instanceof core_1.LayoutStrategyBase) {
            diagram.LayoutSettings.LayoutStrategies.set("custom", layout);
        }
        if (assistantLayout instanceof core_1.LayoutStrategyBase) {
            diagram.LayoutSettings.LayoutStrategies.set("assistantCustom", assistantLayout);
        }
        try {
            for (var strategies_1 = __values(strategies), strategies_1_1 = strategies_1.next(); !strategies_1_1.done; strategies_1_1 = strategies_1.next()) {
                var strategy = strategies_1_1.value;
                strategy.ChildConnectorHookLength = parentSpacing / 2;
                strategy.ParentChildSpacing = parentSpacing;
                strategy.SiblingSpacing = siblingSpacing;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (strategies_1_1 && !strategies_1_1.done && (_a = strategies_1.return)) _a.call(strategies_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return diagram;
    };
    OrgChart.getPlaceholders = function (diagram, prevNodes) {
        var e_3, _a, e_4, _b;
        var dataSource = diagram.DataSource;
        var nodes = [];
        var prevNodesByDataId = new Map();
        try {
            for (var prevNodes_1 = __values(prevNodes), prevNodes_1_1 = prevNodes_1.next(); !prevNodes_1_1.done; prevNodes_1_1 = prevNodes_1.next()) {
                var node = prevNodes_1_1.value;
                prevNodesByDataId.set(node.dataId, node);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (prevNodes_1_1 && !prevNodes_1_1.done && (_a = prevNodes_1.return)) _a.call(prevNodes_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var DEFAULT_RECT = {
            left: 0,
            top: 0,
            // unused
            width: "",
            height: "",
        };
        try {
            for (var _c = __values(diagram.Boxes.BoxesById.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var box = _d.value;
                if (!box.IsDataBound) {
                    continue;
                }
                var id = box.Id;
                var dataId = box.DataId || "";
                var data = dataSource.GetDataItemFunc(dataId).data;
                var prevNode = prevNodesByDataId.get(dataId);
                var nextRect = (prevNode === null || prevNode === void 0 ? void 0 : prevNode.rect) || DEFAULT_RECT;
                nodes.push({
                    rect: {
                        left: nextRect.left,
                        top: nextRect.top,
                        width: "auto",
                        height: "auto",
                    },
                    data: data,
                    dataId: box.DataId || String(id),
                    boxId: id,
                    assistant: box.IsAssistant,
                });
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
        nodes.sort(function (a, b) { return a.boxId - b.boxId; });
        return { hidden: true, nodes: nodes };
    };
    OrgChart.prototype.safelyDrawDiagram = function () {
        if (this.props !== this.state.prevProps) {
            // this.setState({});
            return;
        }
        if (!this._mounted) {
            return;
        }
        var _a = this.state, diagram = _a.diagram, renderIndex = _a.renderIndex;
        var debug = this.props.debug;
        if (renderIndex > this._lastRenderIndex) {
            this._lastRenderIndex = renderIndex;
            if (diagram) {
                this.drawDiagram(diagram, debug);
            }
        }
    };
    OrgChart.prototype.componentDidMount = function () {
        this.safelyDrawDiagram();
    };
    OrgChart.prototype.componentDidUpdate = function () {
        this.safelyDrawDiagram();
    };
    OrgChart.prototype.drawDiagram = function (diagram, debug) {
        if (diagram !== this.state.diagram) {
            return;
        }
        if (diagram.DataSource.AllDataItemIds.length === 0) {
            return;
        }
        var state = new core_1.LayoutState(diagram);
        var nodeMap = new Map();
        var container = this._container.current;
        if (container) {
            container.querySelectorAll("[data-box-id]").forEach(function (node) {
                var id = node.getAttribute("data-box-id");
                if (id) {
                    nodeMap.set(parseInt(id), node);
                }
            });
        }
        // state.OperationChanged = this.onLayoutStateChanged;
        state.LayoutOptimizerFunc = this.onComputeBranchOptimizer;
        state.BoxSizeFunc = function (dataId) {
            if (dataId == null) {
                return NOOP_SIZE;
            }
            var box = diagram.Boxes.BoxesByDataId.get(dataId);
            if (box) {
                var element = nodeMap.get(box.Id);
                if (element) {
                    // force recalculate
                    void element.offsetWidth;
                    void element.offsetHeight;
                    var rect = element.getBoundingClientRect();
                    return new core_1.Size(rect.width, rect.height);
                }
            }
            return NOOP_SIZE;
        };
        core_1.LayoutAlgorithm.Apply(state);
        if (diagram.VisualTree == null) {
            throw Error("VisualTree is null");
        }
        var diagramBoundary = core_1.LayoutAlgorithm.ComputeBranchVisualBoundingRect(diagram.VisualTree);
        var offsetX = -diagramBoundary.Left;
        var offsetY = -diagramBoundary.Top;
        var nodes = [];
        var lines = [];
        var boundaries = [];
        diagram.VisualTree.IterateParentFirst(function (node) {
            if (node.State.IsHidden) {
                return false;
            }
            var box = node.Element;
            if (!box.IsDataBound) {
                return true;
            }
            // All boxes have already been rendered before the chart layout,
            // to have all box sizes available before layout.
            // So now we only have to position them.
            // Connectors, however, are not rendered until layout is complete (see next block).
            var x = node.State.TopLeft.X + offsetX;
            var y = node.State.TopLeft.Y + offsetY;
            var dataId = box.DataId || "";
            var data = diagram.DataSource.GetDataItemFunc(dataId).data;
            nodes.push({
                rect: {
                    left: x,
                    top: y,
                    width: box.Size.Width,
                    height: box.Size.Height,
                },
                data: data,
                dataId: dataId || String(box.Id),
                boxId: box.Id,
                assistant: box.IsAssistant,
            });
            if (debug) {
                boundaries.push({
                    branchLeft: node.State.BranchExterior.Left,
                    branchTop: node.State.BranchExterior.Top,
                    left: node.State.BranchExterior.Left + offsetX,
                    top: node.State.BranchExterior.Top + offsetY,
                    width: node.State.BranchExterior.Size.Width,
                    height: node.State.BranchExterior.Size.Height,
                });
            }
            // Render connectors
            if (node.State.Connector != null) {
                var segments = node.State.Connector.Segments;
                for (var ix = 0; ix < segments.length; ix++) {
                    var edge = segments[ix];
                    var direction = "horizontal";
                    var assistant = box.IsAssistant;
                    var topLeft = void 0;
                    var width = 0;
                    var height = 0;
                    if (edge.From.Y === edge.To.Y) {
                        direction = "horizontal";
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
                        direction = "vertical";
                        if (edge.From.Y < edge.To.Y) {
                            topLeft = edge.From;
                            height = edge.To.Y - edge.From.Y;
                        }
                        else {
                            topLeft = edge.To;
                            height = edge.From.Y - edge.To.Y;
                        }
                    }
                    lines.push({
                        direction: direction,
                        assistant: assistant,
                        data: data,
                        dataId: dataId,
                        boxId: box.Id,
                        index: ix,
                        rect: {
                            left: topLeft.X + offsetX,
                            top: topLeft.Y + offsetY,
                            width: width,
                            height: height,
                        },
                    });
                }
            }
            return true;
        });
        this.setState({
            width: diagramBoundary.Size.Width,
            height: diagramBoundary.Size.Height,
            lines: lines,
            nodes: nodes,
            boundaries: boundaries,
            hidden: false,
        });
    };
    OrgChart.prototype.render = function () {
        var _a = this.state, lines = _a.lines, containerWidth = _a.width, containerHeight = _a.height, nodes = _a.nodes, hidden = _a.hidden, boundaries = _a.boundaries;
        var _b = this.props, lineVerticalClassName = _b.lineVerticalClassName, lineHorizontalClassName = _b.lineHorizontalClassName, lineHorizontalStyle = _b.lineHorizontalStyle, lineVerticalStyle = _b.lineVerticalStyle, containerStyle = _b.containerStyle, renderNode = _b.renderNode, renderNodeContainer = _b.renderNodeContainer, renderNodeLine = _b.renderNodeLine, nodeContainerStyle = _b.nodeContainerStyle, isValidNode = _b.isValidNode;
        var lineClassNames = {
            vertical: lineVerticalClassName,
            horizontal: lineHorizontalClassName,
        };
        var lineStyles = {
            vertical: lineVerticalStyle,
            horizontal: lineHorizontalStyle,
        };
        return (react_1.default.createElement("div", { style: __assign({ width: containerWidth, height: containerHeight, position: "relative" }, containerStyle), ref: this._container },
            react_1.default.createElement("div", null, lines.map(function (_a) {
                var _b = _a.rect, width = _b.width, height = _b.height, left = _b.left, top = _b.top, data = _a.data, assistant = _a.assistant, direction = _a.direction, dataId = _a.dataId, index = _a.index;
                var isValid = isValidNode(dataId);
                if (!isValid) {
                    return null;
                }
                var props = {
                    "data-line-assistant": assistant,
                    "data-line-direction": direction,
                    className: lineClassNames[direction],
                    key: dataId + "-" + index,
                    style: __assign({ left: 0, top: 0, width: width,
                        height: height, transform: "translate3d(" + left + "px, " + top + "px, 0)", position: "absolute" }, lineStyles[direction]),
                };
                if (typeof renderNodeLine === "function") {
                    return renderNodeLine(data, props, { hidden: hidden, direction: direction });
                }
                // props.style = { ...props.style };
                props.style.visibility = hidden ? "hidden" : "visible";
                props.style.pointerEvents = hidden ? "none" : "auto";
                return react_1.default.createElement("div", __assign({}, props));
            })),
            react_1.default.createElement("div", null, nodes.map(function (context) {
                var _a = context.rect, top = _a.top, left = _a.left, width = _a.width, height = _a.height, dataId = context.dataId, dataBoxId = context.boxId, data = context.data;
                var isValid = isValidNode(dataId);
                if (!isValid) {
                    return null;
                }
                var children = renderNode(data);
                var props = {
                    "data-box-id": String(dataBoxId),
                    children: children,
                    key: dataId,
                    style: __assign({ left: 0, top: 0, transform: "translate3d(" + left + "px, " + top + "px, 0)", position: "absolute" }, nodeContainerStyle),
                };
                if (typeof renderNodeContainer === "function") {
                    return renderNodeContainer(data, props, { hidden: hidden });
                }
                // props.style = { ...props.style };
                props.style.visibility = hidden ? "hidden" : "visible";
                props.style.pointerEvents = hidden ? "none" : "auto";
                return react_1.default.createElement("div", __assign({}, props));
            })),
            react_1.default.createElement("div", null, boundaries.map(function (_a, i) {
                var top = _a.top, left = _a.left, width = _a.width, height = _a.height, branchLeft = _a.branchLeft, branchTop = _a.branchTop;
                return (react_1.default.createElement("div", { key: i, style: {
                        transform: "translate3d(" + left + "px, " + top + "px, 0)",
                        width: width,
                        height: height,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                        visibility: hidden ? "hidden" : "visible",
                        background: "rgba(255,0,0,0.1)",
                        border: "1px solid red",
                    } },
                    react_1.default.createElement("div", { style: {
                            backgroundColor: "red",
                            color: "white",
                            display: "inline-block",
                            padding: "0 2px",
                        } },
                        "(",
                        +branchLeft.toFixed(2),
                        ",",
                        +branchTop.toFixed(2),
                        ")",
                        " ",
                        +width.toFixed(2),
                        "x",
                        +height.toFixed(2))));
            }))));
    };
    return OrgChart;
}(react_1.default.Component));
exports.default = OrgChart;


/***/ }),

/***/ "./dist/core/Boundary.js":
/*!*******************************!*\
  !*** ./dist/core/Boundary.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = __importDefault(__webpack_require__(/*! ./Step */ "./dist/core/Step.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var Boundary = /** @class */ (function () {
    function Boundary(frompublic) {
        if (frompublic === void 0) { frompublic = true; }
        this._spacerMerger = null;
        this._boundingRect = null;
        this.Left = [];
        this.Right = [];
        if (frompublic) {
            this._spacerMerger = new Boundary(false);
        }
    }
    Object.defineProperty(Boundary.prototype, "BoundingRect", {
        get: function () {
            if (this._boundingRect == null) {
                throw Error("BoundingRect is null");
            }
            return this._boundingRect;
        },
        set: function (value) {
            this._boundingRect = value;
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Resets the edges, use when re-using this object from pool.
    /// </summary>
    Boundary.prototype.PrepareForHorizontalLayout = function (node) {
        this.Prepare(node);
        if (node.Element.DisableCollisionDetection) {
            return;
        }
        var rect = node.State;
        this.Left.push(new Step_1.default(node, rect.Left, rect.Top, rect.Bottom));
        this.Right.push(new Step_1.default(node, rect.Right, rect.Top, rect.Bottom));
    };
    /// <summary>
    /// Resets the edges, use when re-using this object from pool.
    /// </summary>
    Boundary.prototype.Prepare = function (node) {
        this.Left = [];
        this.Right = [];
        // adjust the top edge to fit the logical grid
        this.BoundingRect = Rect_1.default.from(node.State.Size, node.State.TopLeft);
    };
    /// <summary>
    /// Merges another boundary into this one, potentially pushing its edges out.
    /// </summary>
    Boundary.prototype.VerticalMergeFrom = function (other) {
        this.BoundingRect = Rect_1.default.add(this.BoundingRect, other.BoundingRect);
    };
    /// <summary>
    /// Merges another boundary into this one, potentially pushing its edges out.
    /// </summary>
    Boundary.prototype.MergeFrom = function (other) {
        if (other.BoundingRect.Top >= other.BoundingRect.Bottom) {
            throw new Error("Cannot merge boundary of height " +
                (other.BoundingRect.Bottom - other.BoundingRect.Top));
        }
        var merge = "r";
        while (merge != "\0") {
            var mySteps = merge == "r" ? this.Right : this.Left;
            var theirSteps = merge == "r" ? other.Right : other.Left;
            var i = 0;
            var k = 0;
            for (; k < theirSteps.length && i < mySteps.length;) {
                var my = mySteps[i];
                var th = theirSteps[k];
                if (my.Bottom <= th.Top) {
                    // haven't reached the top of their boundary yet
                    i++;
                    continue;
                }
                if (th.Bottom <= my.Top) {
                    // haven't reached the top of my boundary yet
                    mySteps.splice(i, 0, th);
                    k++;
                    this.ValidateState();
                    continue;
                }
                var theirWins = merge == "r" ? my.X <= th.X : my.X >= th.X;
                if (LayoutAlgorithm_1.default.IsEqual(my.Top, th.Top)) {
                    if (LayoutAlgorithm_1.default.IsEqual(my.Bottom, th.Bottom)) {
                        // case 1: exactly same length and vertical position
                        // th: ********
                        // my: ********
                        if (theirWins) {
                            mySteps[i] = th; // replace entire step
                        }
                        i++;
                        k++;
                        this.ValidateState();
                    }
                    else if (my.Bottom < th.Bottom) {
                        // case 2: tops aligned, but my is shorter
                        // th: ********
                        // my: ***
                        if (theirWins) {
                            mySteps[i] = my.ChangeOwner(th.Node, th.X); // replace my with a piece of theirs
                        }
                        theirSteps[k] = th.ChangeTop(my.Bottom); // push their top down
                        i++;
                        this.ValidateState();
                    }
                    else {
                        // case 3: tops aligned, but my is longer
                        // th: ***
                        // my: ********
                        if (theirWins) {
                            mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
                            mySteps.splice(i, 0, th); // insert theirs before my
                            i++;
                        }
                        k++;
                        this.ValidateState();
                    }
                }
                else if (LayoutAlgorithm_1.default.IsEqual(my.Bottom, th.Bottom)) {
                    if (my.Top < th.Top) {
                        // case 4: bottoms aligned, but my is longer
                        // th:      ***
                        // my: ********
                        if (theirWins) {
                            mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
                            mySteps.splice(i + 1, 0, th); // insert theirs after my
                            i++;
                        }
                        i++;
                        k++;
                        this.ValidateState();
                    }
                    else {
                        // case 5: bottoms aligned, but my is shorter
                        // th: ********
                        // my:      ***
                        if (theirWins) {
                            // replace my with theirs, we're guaranteed not to offend my previous
                            mySteps[i] = th;
                        }
                        else {
                            // insert a piece of theirs before my, we're guaranteed not to offend my previous
                            mySteps.splice(i, 0, th.ChangeBottom(my.Top));
                            i++;
                        }
                        i++;
                        k++;
                        this.ValidateState();
                    }
                }
                else if (my.Top < th.Top && my.Bottom < th.Bottom) {
                    // case 6: their overlaps my bottom
                    // th:     ********
                    // my: *******
                    if (theirWins) {
                        mySteps[i] = my.ChangeBottom(th.Top); // contract myself to their top
                        mySteps.splice(i + 1, 0, new Step_1.default(th.Node, th.X, th.Top, my.Bottom)); // insert a piece of theirs after my
                        i++;
                    }
                    theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
                    i++;
                    this.ValidateState();
                }
                else if (my.Top < th.Top && my.Bottom > th.Bottom) {
                    // case 7: their cuts my into three pieces
                    // th:     *****
                    // my: ************
                    if (theirWins) {
                        mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
                        mySteps.splice(i + 1, 0, th); // insert their after my
                        mySteps.splice(i + 2, 0, my.ChangeTop(th.Bottom)); // insert my tail after theirs
                        i += 2;
                    }
                    k++;
                    this.ValidateState();
                }
                else if (my.Bottom > th.Bottom) {
                    // case 8: their overlaps my top
                    // th: ********
                    // my:    ********
                    if (theirWins) {
                        mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
                        // insert theirs before my, we're guaranteed not to offend my previous
                        mySteps.splice(i, 0, th);
                    }
                    else {
                        mySteps.splice(i, 0, th.ChangeBottom(my.Top));
                    }
                    i++;
                    k++;
                    this.ValidateState();
                }
                else {
                    // case 9: their completely covers my
                    // th: ************
                    // my:    *****
                    if (theirWins) {
                        mySteps[i] = th.ChangeBottom(my.Bottom); // replace my with a piece of theirs
                    }
                    else {
                        mySteps.splice(i, 0, th.ChangeBottom(my.Top));
                        i++;
                    }
                    theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
                    i++;
                    this.ValidateState();
                }
            }
            if (i == mySteps.length) {
                while (k < theirSteps.length) {
                    mySteps.push(theirSteps[k]);
                    k++;
                    this.ValidateState();
                }
            }
            merge = merge == "r" ? "l" : "\0";
        }
        this.BoundingRect = Rect_1.default.add(this.BoundingRect, other.BoundingRect);
    };
    Boundary.prototype.ValidateState = function () {
        for (var i = 1; i < this.Left.length; i++) {
            if (this.Left[i].Top == this.Left[i].Bottom ||
                this.Left[i].Top < this.Left[i - 1].Bottom ||
                this.Left[i].Top <= this.Left[i - 1].Top ||
                this.Left[i].Bottom <= this.Left[i].Top ||
                this.Left[i].Bottom <= this.Left[i - 1].Bottom) {
                throw new Error("State error at Left index " + i);
            }
        }
        for (var i = 1; i < this.Right.length; i++) {
            if (this.Right[i].Top == this.Right[i].Bottom ||
                this.Right[i].Top < this.Right[i - 1].Bottom ||
                this.Right[i].Top <= this.Right[i - 1].Top ||
                this.Right[i].Bottom <= this.Right[i].Top ||
                this.Right[i].Bottom <= this.Right[i - 1].Bottom) {
                throw new Error("State error at Right index " + i);
            }
        }
    };
    /// <summary>
    /// Merges a box into this one, potentially pushing its edges out.
    /// </summary>
    Boundary.prototype.MergeFromNode = function (node) {
        if (node.Element.DisableCollisionDetection) {
            return;
        }
        if (!node.State.Size || LayoutAlgorithm_1.default.IsZero(node.State.Size.Height)) {
            return;
        }
        if (this._spacerMerger == null) {
            throw Error("SpaceMerger is null");
        }
        this._spacerMerger.PrepareForHorizontalLayout(node);
        this.MergeFrom(this._spacerMerger);
    };
    /// <summary>
    /// Returns max horizontal overlap between myself and <paramref name="other"/>.
    /// </summary>
    Boundary.prototype.ComputeOverlap = function (other, siblingSpacing, branchSpacing) {
        var i = 0, k = 0;
        var offense = 0.0;
        while (i < this.Right.length && k < other.Left.length) {
            var my = this.Right[i];
            var th = other.Left[k];
            if (my.Bottom <= th.Top) {
                i++;
            }
            else if (th.Bottom <= my.Top) {
                k++;
            }
            else {
                if (!my.Node.Element.DisableCollisionDetection &&
                    !th.Node.Element.DisableCollisionDetection) {
                    var desiredSpacing = my.Node.Element.IsSpecial || th.Node.Element.IsSpecial
                        ? 0 // when dealing with spacers, no need for additional cushion around them
                        : my.Node.Element.ParentId == th.Node.Element.ParentId
                            ? siblingSpacing // two siblings kicking each other
                            : branchSpacing; // these are two different branches
                    var diff = my.X + desiredSpacing - th.X;
                    if (diff > offense) {
                        offense = diff;
                    }
                }
                if (my.Bottom >= th.Bottom) {
                    k++;
                }
                if (th.Bottom >= my.Bottom) {
                    i++;
                }
            }
        }
        return offense;
    };
    Boundary.prototype.ReloadFromBranch = function (branchRoot) {
        var leftmost = Number.MAX_VALUE;
        var rightmost = Number.MIN_VALUE;
        for (var i = 0; i < this.Left.length; i++) {
            var left = this.Left[i];
            var newLeft = left.Node.State.Left;
            this.Left[i] = left.ChangeX(newLeft);
            leftmost = Math.min(leftmost, newLeft);
        }
        for (var i = 0; i < this.Right.length; i++) {
            var right = this.Right[i];
            var newRight = right.Node.State.Right;
            this.Right[i] = right.ChangeX(newRight);
            rightmost = Math.max(rightmost, newRight);
        }
        leftmost = Math.min(branchRoot.State.Left, leftmost);
        rightmost = Math.max(branchRoot.State.Right, rightmost);
        this.BoundingRect = Rect_1.default.from(new Size_1.default(rightmost - leftmost, this.BoundingRect.Size.Height), new Point_1.default(leftmost, this.BoundingRect.Top));
    };
    return Boundary;
}());
exports.default = Boundary;


/***/ }),

/***/ "./dist/core/BoundaryChangedEventArgs.js":
/*!***********************************************!*\
  !*** ./dist/core/BoundaryChangedEventArgs.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BoundaryChangedEventArgs = /** @class */ (function () {
    function BoundaryChangedEventArgs(boundary, layoutLevel, state) {
        this.Boundary = boundary;
        this.LayoutLevel = layoutLevel;
        this.State = state;
    }
    return BoundaryChangedEventArgs;
}());
exports.default = BoundaryChangedEventArgs;


/***/ }),

/***/ "./dist/core/Box.js":
/*!**************************!*\
  !*** ./dist/core/Box.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Box = /** @class */ (function () {
    function Box(dataId, id, parentId, isSpecial, disableCollisionDetection, isAssistant) {
        if (id == 0) {
            throw new Error("Invalid " + id);
        }
        this.Id = id;
        this.ParentId = parentId;
        this.DataId = dataId;
        this.IsSpecial = isSpecial;
        this.IsAssistant = isAssistant;
        this.DisableCollisionDetection = disableCollisionDetection;
        this.AssistantLayoutStrategyId = null;
        this.LayoutStrategyId = null;
        this.IsCollapsed = false;
        this.Size = new Size_1.default(0, 0);
    }
    Object.defineProperty(Box.prototype, "IsDataBound", {
        get: function () {
            return !!this.DataId;
        },
        enumerable: true,
        configurable: true
    });
    Box.Special = function (id, visualParentId, disableCollisionDetection) {
        return new Box(null, id, visualParentId, true, disableCollisionDetection, false);
    };
    Box.None = -1;
    return Box;
}());
exports.default = Box;


/***/ }),

/***/ "./dist/core/BoxContainer.js":
/*!***********************************!*\
  !*** ./dist/core/BoxContainer.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var BoxContainer = /** @class */ (function () {
    function BoxContainer(source) {
        this._lastBoxId = 0;
        this._boxesById = new Map();
        this._boxesByDataId = new Map();
        this.SystemRoot = null;
        if (source) {
            this.ReloadBoxes(source);
        }
    }
    Object.defineProperty(BoxContainer.prototype, "BoxesById", {
        get: function () {
            return this._boxesById;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoxContainer.prototype, "BoxesByDataId", {
        get: function () {
            return this._boxesByDataId;
        },
        enumerable: true,
        configurable: true
    });
    BoxContainer.prototype.ReloadBoxes = function (source) {
        var e_1, _a, e_2, _b;
        this._boxesByDataId.clear();
        this._boxesById.clear();
        this._lastBoxId = 0;
        // generate system root box
        this.SystemRoot = Box_1.default.Special(++this._lastBoxId, Box_1.default.None, true);
        this._boxesById.set(this.SystemRoot.Id, this.SystemRoot);
        var map = new Map();
        try {
            // generate identifiers mapping, need this because data comes in random order
            for (var _c = __values(source.AllDataItemIds), _d = _c.next(); !_d.done; _d = _c.next()) {
                var dataId = _d.value;
                map.set(dataId, this.NextBoxId());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // add data-bound boxes
        var getDataItem = source.GetDataItemFunc;
        try {
            for (var _e = __values(source.AllDataItemIds), _f = _e.next(); !_f.done; _f = _e.next()) {
                var dataId = _f.value;
                var parentDataId = !dataId ? null : source.GetParentKeyFunc(dataId);
                var visualParentId = !parentDataId
                    ? this.SystemRoot.Id
                    : map.get(parentDataId);
                var nextBoxId = map.get(dataId);
                if (nextBoxId != null && visualParentId != null) {
                    this._AddBox(dataId, nextBoxId, visualParentId, getDataItem(dataId).IsAssistant);
                }
                else {
                    // throw Error("_AddBox null");
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /// <summary>
    /// Creates a new <see cref="Box"/> and adds it to collection.
    /// </summary>
    /// <returns>Newly created Node object</returns>
    BoxContainer.prototype.AddBox = function (dataId, visualParentId, isAssistant) {
        return this._AddBox(dataId, this.NextBoxId(), visualParentId, isAssistant);
    };
    BoxContainer.prototype._AddBox = function (dataId, id, visualParentId, isAssistant) {
        var box = new Box_1.default(dataId, id, visualParentId, false, false, isAssistant);
        this._boxesById.set(box.Id, box);
        if (box.DataId) {
            this._boxesByDataId.set(box.DataId, box);
        }
        return box;
    };
    BoxContainer.prototype.NextBoxId = function () {
        this._lastBoxId++;
        return this._lastBoxId;
    };
    return BoxContainer;
}());
exports.default = BoxContainer;


/***/ }),

/***/ "./dist/core/BoxTree.js":
/*!******************************!*\
  !*** ./dist/core/BoxTree.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Node_1 = __importDefault(__webpack_require__(/*! ./Node */ "./dist/core/Node.js"));
var BoxTree = /** @class */ (function () {
    function BoxTree() {
        this.Depth = 0;
        this.Root = null;
        this.Nodes = new Map();
    }
    BoxTree.prototype.IterateChildFirst = function (func) {
        if (this.Root == null) {
            throw Error("Root is null");
        }
        return this.Root.IterateChildFirst(func);
    };
    BoxTree.prototype.IterateParentFirst = function (enter, exit) {
        if (this.Root == null) {
            throw Error("Root is null");
        }
        this.Root.IterateParentFirst(enter, exit);
    };
    BoxTree.prototype.UpdateHierarchyStats = function () {
        var _this = this;
        this.Depth = 0;
        this.IterateParentFirst(function (x) {
            if (x.ParentNode != null) {
                x.Level = x.ParentNode.Level;
                if (!x.ParentNode.IsAssistantRoot) {
                    x.Level = x.Level + 1;
                }
                _this.Depth = Math.max(1 + x.Level, _this.Depth);
            }
            else {
                x.Level = 0;
                _this.Depth = 1;
            }
            return true;
        });
    };
    BoxTree.Build = function (state) {
        var e_1, _a, e_2, _b;
        var result = new BoxTree();
        // TODO convert to const
        var box;
        try {
            for (var _c = __values(state.Diagram.Boxes.BoxesById.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                box = _d.value;
                var node = new Node_1.default(box);
                result.Nodes.set(box.Id, node);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // build the tree
            for (var _e = __values(result.Nodes.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var node = _f.value;
                var parentKey = node.Element.ParentId;
                var parentNode = result.Nodes.get(parentKey);
                if (parentNode) {
                    if (node.Element.IsAssistant &&
                        parentNode.Element.ParentId != Box_1.default.None) {
                        parentNode.AddAssistantChild(node);
                    }
                    else {
                        parentNode.AddRegularChild(node);
                    }
                }
                else {
                    if (result.Root != null) {
                        throw new Error("InvalidOperationException: More then one root found: " +
                            node.Element.Id);
                    }
                    result.Root = node;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    return BoxTree;
}());
exports.default = BoxTree;


/***/ }),

/***/ "./dist/core/BranchParentAlignment.js":
/*!********************************************!*\
  !*** ./dist/core/BranchParentAlignment.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BranchParentAlignment;
(function (BranchParentAlignment) {
    BranchParentAlignment[BranchParentAlignment["InvalidValue"] = 0] = "InvalidValue";
    BranchParentAlignment[BranchParentAlignment["Left"] = 1] = "Left";
    BranchParentAlignment[BranchParentAlignment["Center"] = 2] = "Center";
    BranchParentAlignment[BranchParentAlignment["Right"] = 3] = "Right";
})(BranchParentAlignment || (BranchParentAlignment = {}));
exports.default = BranchParentAlignment;


/***/ }),

/***/ "./dist/core/Connector.js":
/*!********************************!*\
  !*** ./dist/core/Connector.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Connector = /** @class */ (function () {
    function Connector(segments) {
        if (segments.length == 0) {
            throw new Error("Need at least one segment");
        }
        this.Segments = segments;
    }
    return Connector;
}());
exports.default = Connector;


/***/ }),

/***/ "./dist/core/Diagram.js":
/*!******************************!*\
  !*** ./dist/core/Diagram.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DiagramLayoutSettings_1 = __importDefault(__webpack_require__(/*! ./DiagramLayoutSettings */ "./dist/core/DiagramLayoutSettings.js"));
var Diagram = /** @class */ (function () {
    function Diagram() {
        this._visualTree = null;
        this._boxes = null;
        this.LayoutSettings = new DiagramLayoutSettings_1.default();
    }
    Object.defineProperty(Diagram.prototype, "Boxes", {
        get: function () {
            if (this._boxes == null) {
                throw Error("Boxes is null");
            }
            return this._boxes;
        },
        set: function (value) {
            this._visualTree = null;
            this._boxes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Diagram.prototype, "VisualTree", {
        get: function () {
            return this._visualTree;
        },
        set: function (value) {
            this._visualTree = value;
        },
        enumerable: true,
        configurable: true
    });
    return Diagram;
}());
exports.default = Diagram;


/***/ }),

/***/ "./dist/core/DiagramLayoutSettings.js":
/*!********************************************!*\
  !*** ./dist/core/DiagramLayoutSettings.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DiagramLayoutSettings = /** @class */ (function () {
    function DiagramLayoutSettings() {
        this.BranchSpacing = 50;
        this.DefaultAssistantLayoutStrategyId = null;
        this.DefaultLayoutStrategyId = null;
        this.BranchSpacing = 50;
        this.LayoutStrategies = new Map();
    }
    DiagramLayoutSettings.prototype.RequireDefaultLayoutStrategy = function () {
        var id = this.DefaultLayoutStrategyId;
        if (!id) {
            throw new Error("DefaultLayoutStrategyId is null or not valid");
        }
        var result = this.LayoutStrategies.get(id);
        if (!result) {
            throw new Error("DefaultLayoutStrategyId is null or not valid");
        }
        return result;
    };
    DiagramLayoutSettings.prototype.RequireDefaultAssistantLayoutStrategy = function () {
        var id = this.DefaultAssistantLayoutStrategyId;
        if (!id) {
            throw new Error("RequireDefaultAssistantLayoutStrategy is null or not valid");
        }
        var result = this.LayoutStrategies.get(id);
        if (!result) {
            throw new Error("RequireDefaultAssistantLayoutStrategy is null or not valid");
        }
        return result;
    };
    return DiagramLayoutSettings;
}());
exports.default = DiagramLayoutSettings;


/***/ }),

/***/ "./dist/core/DiagramLayoutTemplates.js":
/*!*********************************************!*\
  !*** ./dist/core/DiagramLayoutTemplates.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DiagramLayoutTemplates = /** @class */ (function () {
    function DiagramLayoutTemplates() {
    }
    return DiagramLayoutTemplates;
}());
exports.default = DiagramLayoutTemplates;


/***/ }),

/***/ "./dist/core/Dimensions.js":
/*!*********************************!*\
  !*** ./dist/core/Dimensions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dimensions = /** @class */ (function () {
    function Dimensions(from, to) {
        this.From = from;
        this.To = to;
    }
    Dimensions.MinMax = function () {
        return new Dimensions(Number.MAX_VALUE, Number.MIN_VALUE);
    };
    Dimensions.add = function (x, y) {
        return new Dimensions(Math.min(x.From, y.From), Math.max(x.To, y.To));
    };
    return Dimensions;
}());
exports.default = Dimensions;


/***/ }),

/***/ "./dist/core/Edge.js":
/*!***************************!*\
  !*** ./dist/core/Edge.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Edge = /** @class */ (function () {
    function Edge(from, to) {
        this.From = from;
        this.To = to;
    }
    return Edge;
}());
exports.default = Edge;


/***/ }),

/***/ "./dist/core/FishboneAssistantsLayoutStrategy.js":
/*!*******************************************************!*\
  !*** ./dist/core/FishboneAssistantsLayoutStrategy.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutStrategyBase_1 = __importDefault(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var Edge_1 = __importDefault(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Connector_1 = __importDefault(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var FishboneAssistantsLayoutStrategy = /** @class */ (function (_super) {
    __extends(FishboneAssistantsLayoutStrategy, _super);
    function FishboneAssistantsLayoutStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return false; };
        _this.MaxOnLeft = function (node) {
            return Math.floor(node.State.NumberOfSiblings / 2) + (node.State.NumberOfSiblings % 2);
        };
        _this.NeedCarrierProtector = function (node) { var _a; return ((_a = node.ParentNode) === null || _a === void 0 ? void 0 : _a.ChildCount) == 0; };
        return _this;
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// </summary>
    FishboneAssistantsLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        node.State.NumberOfSiblings = node.ChildCount;
        // only add spacers for non-collapsed boxes
        if (node.State.NumberOfSiblings > 0) {
            // using column == group here,
            // and each group consists of two vertical stretches of boxes with a vertical carrier in between
            node.State.NumberOfSiblingColumns = 1;
            node.State.NumberOfSiblingRows = Math.floor(node.State.NumberOfSiblings / 2);
            if (node.State.NumberOfSiblings % 2 != 0) {
                node.State.NumberOfSiblingRows++;
            }
            // a vertical carrier from parent
            var spacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
            node.AddRegularChildBox(spacer);
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    FishboneAssistantsLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.Level == 0) {
            throw new Error("Should never be invoked on root node");
        }
        if (node.State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
        }
        var prevRowBottom = node.State.SiblingsRowV.To;
        var maxOnLeft = this.MaxOnLeft(node);
        for (var i = 0; i < maxOnLeft; i++) {
            var spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
            var child = node.Children[i];
            var frame = child.State;
            LayoutAlgorithm_1.default.MoveTo(frame, frame.Left, prevRowBottom + spacing);
            var rowExterior = new Dimensions_1.default(frame.Top, frame.Bottom);
            var i2 = i + maxOnLeft;
            if (frame.Size == null) {
                throw Error("Size is null");
            }
            if (i2 < node.State.NumberOfSiblings) {
                var child2 = node.Children[i2];
                var frame2 = child2.State;
                LayoutAlgorithm_1.default.MoveTo(frame2, frame2.Left, prevRowBottom + spacing);
                if (frame2.Size == null) {
                    throw Error("Size is null");
                }
                if (frame2.Bottom > frame.Bottom) {
                    LayoutAlgorithm_1.default.MoveTo(frame, frame.Left, frame2.CenterV - frame.Size.Height / 2);
                }
                else if (frame2.Bottom < frame.Bottom) {
                    LayoutAlgorithm_1.default.MoveTo(frame2, frame2.Left, frame.CenterV - frame2.Size.Height / 2);
                }
                frame2.BranchExterior = Rect_1.default.from(frame2.Size, frame2.TopLeft);
                rowExterior = Dimensions_1.default.add(rowExterior, new Dimensions_1.default(frame2.Top, frame2.Bottom));
                frame2.SiblingsRowV = rowExterior;
                LayoutAlgorithm_1.default.VerticalLayout(state, child2);
                prevRowBottom = frame2.BranchExterior.Bottom;
            }
            frame.BranchExterior = Rect_1.default.from(frame.Size, frame.TopLeft);
            frame.SiblingsRowV = rowExterior;
            LayoutAlgorithm_1.default.VerticalLayout(state, child);
            prevRowBottom = Math.max(prevRowBottom, frame.BranchExterior.Bottom);
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    FishboneAssistantsLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        var left = true;
        var countOnThisSide = 0;
        var maxOnLeft = this.MaxOnLeft(node);
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var child = node.Children[i];
            LayoutAlgorithm_1.default.HorizontalLayout(state, child);
            // we go top-bottom to layout left side of the group,
            // then add a carrier protector
            // then top-bottom to fill right side of the group
            if (++countOnThisSide == maxOnLeft) {
                if (left) {
                    // horizontally align children in left pillar
                    LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateSiblings(node, 0, maxOnLeft));
                    left = false;
                    countOnThisSide = 0;
                    var rightmost = Number.MIN_VALUE;
                    for (var k = 0; k <= i; k++) {
                        rightmost = Math.max(rightmost, node.Children[k].State.BranchExterior.Right);
                    }
                    // vertical spacer does not have to be extended to the bottom of the lowest branch,
                    // unless the lowest branch on the right side has some children and is expanded
                    if (node.State.NumberOfSiblings % 2 != 0) {
                        rightmost = Math.max(rightmost, child.State.Right);
                    }
                    else {
                        var opposite = node.Children[node.State.NumberOfSiblings - 1];
                        if (opposite.Element.IsCollapsed || opposite.ChildCount == 0) {
                            rightmost = Math.max(rightmost, child.State.Right);
                        }
                        else {
                            rightmost = Math.max(rightmost, child.State.BranchExterior.Right);
                        }
                    }
                    // integrate protector for group's vertical carrier
                    // it must prevent boxes on the right side from overlapping the middle vertical connector,
                    // so protector's height must be set to height of this entire assistant branch
                    var spacer = node.Children[node.State.NumberOfSiblings];
                    LayoutAlgorithm_1.default.AdjustSpacer(spacer.State, rightmost, node.State.Bottom, this.ParentConnectorShield, node.State.BranchExterior.Bottom - node.State.Bottom);
                    level.Boundary.MergeFromNode(spacer);
                }
            }
        }
        // horizontally align children in right pillar
        LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateSiblings(node, maxOnLeft, node.State.NumberOfSiblings));
        // align children under parent
        if (node.Level > 0 && node.State.NumberOfSiblings > 0) {
            var carrier = node.Children[node.State.NumberOfSiblings].State.CenterH;
            var desiredCenter = node.State.CenterH;
            var diff = desiredCenter - carrier;
            LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
        }
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    FishboneAssistantsLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        var count = node.State.NumberOfSiblings;
        if (count == 0) {
            return;
        }
        if (this.NeedCarrierProtector(node)) {
            count++;
        }
        var segments = [];
        var ix = 0;
        // one hook for each child
        var maxOnLeft = this.MaxOnLeft(node);
        var carrier = node.Children[node.State.NumberOfSiblings].State;
        var from = carrier.CenterH;
        var isLeft = true;
        var countOnThisSide = 0;
        var bottomMost = Number.MIN_VALUE;
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var to = isLeft
                ? node.Children[i].State.Right
                : node.Children[i].State.Left;
            var y = node.Children[i].State.CenterV;
            bottomMost = Math.max(bottomMost, y);
            segments[ix++] = new Edge_1.default(new Point_1.default(from, y), new Point_1.default(to, y));
            if (++countOnThisSide == maxOnLeft) {
                countOnThisSide = 0;
                isLeft = !isLeft;
            }
        }
        if (this.NeedCarrierProtector(node)) {
            // one for each vertical carrier
            segments[node.State.NumberOfSiblings] = new Edge_1.default(new Point_1.default(carrier.CenterH, carrier.Top), new Point_1.default(carrier.CenterH, bottomMost));
        }
        node.State.Connector = new Connector_1.default(segments);
    };
    FishboneAssistantsLayoutStrategy.prototype.EnumerateSiblings = function (node, from, to) {
        var nodes = [];
        for (var i = from; i < to; i++) {
            nodes.push(node.Children[i]);
        }
        return nodes;
    };
    return FishboneAssistantsLayoutStrategy;
}(LayoutStrategyBase_1.default));
exports.default = FishboneAssistantsLayoutStrategy;


/***/ }),

/***/ "./dist/core/LayoutAlgorithm.js":
/*!**************************************!*\
  !*** ./dist/core/LayoutAlgorithm.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var BoxTree_1 = __importDefault(__webpack_require__(/*! ./BoxTree */ "./dist/core/BoxTree.js"));
var Operation_1 = __importDefault(__webpack_require__(/*! ./Operation */ "./dist/core/Operation.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Utils_1 = __webpack_require__(/*! ./Utils */ "./dist/core/Utils.js");
var LayoutAlgorithm = /** @class */ (function () {
    function LayoutAlgorithm() {
    }
    /// <summary>
    /// Computes bounding rectangle in diagram space using only visible (non-autogenerated boxes).
    /// Useful for rendering the chart, as boxes frequently go into negative side horizontally, and have a special root box on top - all of those should not be accounted for.
    /// </summary>
    LayoutAlgorithm.ComputeBranchVisualBoundingRect = function (visualTree) {
        var result = new Rect_1.default(0, 0, 0, 0);
        var initialized = false;
        if (visualTree.Root == null) {
            throw Error("Root is null");
        }
        visualTree.Root.IterateParentFirst(function (node) {
            var box = node.Element;
            if (!node.State.IsHidden && !box.IsSpecial) {
                if (node.State.Size == null) {
                    throw Error("Size is null");
                }
                if (node.State.TopLeft == null) {
                    throw Error("TopLeft is null");
                }
                if (initialized) {
                    result = Rect_1.default.add(result, Rect_1.default.from(node.State.Size, node.State.TopLeft));
                }
                else {
                    initialized = true;
                    result = Rect_1.default.from(node.State.Size, node.State.TopLeft);
                }
            }
            return !box.IsCollapsed;
        });
        return result;
    };
    /// <summary>
    /// Initializes <paramref name="state"/> and performs all layout operations.
    /// </summary>
    LayoutAlgorithm.Apply = function (state) {
        var e_1, _a, e_2, _b;
        var _c, _d;
        // verify the root
        if (state.Diagram.Boxes && state.Diagram.Boxes.SystemRoot == null) {
            throw new Error("SystemRoot is not initialized on the box container");
        }
        state.CurrentOperation = Operation_1.default.Preparing;
        var tree = BoxTree_1.default.Build(state);
        state.Diagram.VisualTree = tree;
        // verify the root: regardless of data items, there must be a system root box on top of everything
        // the corresponding node is not supposed to be rendered, it only serves as layout algorithm's starting point
        if (tree.Root == null ||
            (state.Diagram.Boxes &&
                tree.Root.Element.Id != ((_c = state.Diagram.Boxes.SystemRoot) === null || _c === void 0 ? void 0 : _c.Id))) {
            throw new Error("SystemRoot is not on the top of the visual tree");
        }
        // set the tree and update visibility
        tree.UpdateHierarchyStats();
        state.AttachVisualTree(tree);
        // update visibility of boxes based on collapsed state
        tree.IterateParentFirst(function (node) {
            node.State.IsHidden =
                node.ParentNode != null &&
                    (node.ParentNode.State.IsHidden || node.ParentNode.Element.IsCollapsed);
            return true;
        });
        // In this phase, we will figure out layout strategy
        // and initialize layout state for each node.
        // Event listener may perform initial rendering /measuring of boxes when this event fires,
        // to determine box sizes and be ready to supply them via BoxSizeFunc delegate.
        state.CurrentOperation = Operation_1.default.PreprocessVisualTree;
        // initialize box sizes
        if (state.BoxSizeFunc != null) {
            try {
                // apply box sizes
                for (var _e = __values(__spread((_d = state.Diagram.Boxes) === null || _d === void 0 ? void 0 : _d.BoxesById.values()).filter(function (x) { return x.IsDataBound; })), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var box = _f.value;
                    box.Size = state.BoxSizeFunc(box.DataId);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        try {
            for (var _g = __values(state.Diagram.Boxes.BoxesById.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                var box = _h.value;
                this.AssertBoxSize(box);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // initialize layout state on each node
        tree.IterateParentFirst(function (node) {
            LayoutAlgorithm.MoveTo(node.State, 0, 0);
            node.State.Size = node.Element.Size;
            node.State.BranchExterior = Rect_1.default.from(node.Element.Size, new Point_1.default(0, 0));
            return true;
        });
        this.PreprocessVisualTree(state, tree);
        tree.UpdateHierarchyStats();
        state.CurrentOperation = Operation_1.default.VerticalLayout;
        this.VerticalLayout(state, tree.Root);
        state.CurrentOperation = Operation_1.default.HorizontalLayout;
        this.HorizontalLayout(state, tree.Root);
        state.CurrentOperation = Operation_1.default.ConnectorsLayout;
        this.RouteConnectors(state, tree);
        state.CurrentOperation = Operation_1.default.Completed;
    };
    /// <summary>
    /// Ths function helps catch "undefined" values when operating in JavaScript-converted version of this code.
    /// Also, helps catch some bugs in C# version as well.
    /// They way it's implemented has direct impact on how JavaScript validation code looks like, so don't "optimize".
    /// </summary>
    LayoutAlgorithm.AssertBoxSize = function (box) {
        if (box.Size.Width >= 0.0 && box.Size.Width <= 1000000000.0) {
            if (box.Size.Height >= 0.0 && box.Size.Width <= 1000000000.0) {
                return;
            }
        }
        throw new Error("Box " + box.Id + " has invalid size: " + box.Size.Width + "x" + box.Size.Height);
    };
    LayoutAlgorithm.PreprocessVisualTree = function (state, visualTree) {
        var defaultStrategy = state.Diagram.LayoutSettings.RequireDefaultLayoutStrategy();
        var defaultAssistantsStrategy = state.Diagram.LayoutSettings.RequireDefaultAssistantLayoutStrategy();
        var regular = [];
        regular.push(defaultStrategy);
        var assistants = [];
        assistants.push(defaultAssistantsStrategy);
        visualTree.IterateParentFirst(function (node) {
            var _a;
            if (node.State.IsHidden) {
                return false;
            }
            var strategy = null;
            if (state.LayoutOptimizerFunc != null) {
                var suggestedStrategyId = state.LayoutOptimizerFunc(node);
                if (suggestedStrategyId) {
                    strategy = state.Diagram.LayoutSettings.LayoutStrategies.get(suggestedStrategyId);
                    if (true) {
                        if (!strategy) {
                            console.info("Invalid strategy:", {
                                suggestedStrategyId: suggestedStrategyId,
                                strategy: strategy,
                            });
                        }
                    }
                }
            }
            if (node.IsAssistantRoot) {
                if (strategy == null) {
                    strategy =
                        ((_a = node.ParentNode) === null || _a === void 0 ? void 0 : _a.Element.AssistantLayoutStrategyId) != null
                            ? state.Diagram.LayoutSettings.LayoutStrategies.get(node.ParentNode.Element.AssistantLayoutStrategyId)
                            : Utils_1.peek(assistants);
                }
                if (strategy == null) {
                    throw Error("Strategy is null. Maybe it allows null?");
                }
                assistants.push(strategy);
            }
            else {
                if (strategy == null) {
                    strategy =
                        node.Element.LayoutStrategyId != null
                            ? state.Diagram.LayoutSettings.LayoutStrategies.get(node.Element.LayoutStrategyId)
                            : Utils_1.peek(regular);
                }
                if (strategy == null) {
                    throw Error("Strategy is null. Maybe it allows null?");
                }
                regular.push(strategy);
                if (!strategy.SupportsAssistants) {
                    node.SuppressAssistants();
                }
            }
            // now let it pre-allocate special boxes etc
            node.State.EffectiveLayoutStrategy = strategy;
            node.State.RequireLayoutStrategy.PreProcessThisNode(state, node);
            return ((!node.Element.IsCollapsed && node.ChildCount > 0) ||
                node.AssistantsRoot != null);
        }, function (node) {
            if (!node.State.IsHidden) {
                if (node.IsAssistantRoot) {
                    assistants.pop();
                }
                else {
                    regular.pop();
                }
            }
        });
    };
    LayoutAlgorithm.HorizontalLayout = function (state, branchRoot) {
        if (branchRoot.State.IsHidden) {
            throw new Error("Branch root " + branchRoot.Element.Id + " does not affect layout");
        }
        var level = state.PushLayoutLevel(branchRoot);
        try {
            if (branchRoot.Level == 0 ||
                ((branchRoot.State.NumberOfSiblings > 0 ||
                    branchRoot.AssistantsRoot != null) &&
                    !branchRoot.Element.IsCollapsed)) {
                branchRoot.State.RequireLayoutStrategy.ApplyHorizontalLayout(state, level);
            }
        }
        finally {
            state.PopLayoutLevel();
        }
    };
    /// <summary>
    /// Re-entrant layout algorithm.
    /// </summary>
    LayoutAlgorithm.VerticalLayout = function (state, branchRoot) {
        if (branchRoot.State.IsHidden) {
            throw new Error("Branch root " + branchRoot.Element.Id + " does not affect layout");
        }
        var level = state.PushLayoutLevel(branchRoot);
        try {
            if (branchRoot.Level == 0 ||
                ((branchRoot.State.NumberOfSiblings > 0 ||
                    branchRoot.AssistantsRoot != null) &&
                    !branchRoot.Element.IsCollapsed)) {
                branchRoot.State.RequireLayoutStrategy.ApplyVerticalLayout(state, level);
            }
        }
        finally {
            state.PopLayoutLevel();
        }
    };
    LayoutAlgorithm.RouteConnectors = function (state, visualTree) {
        visualTree.IterateParentFirst(function (node) {
            if (node.Element.IsCollapsed ||
                (node.State.NumberOfSiblings == 0 && node.AssistantsRoot == null)) {
                return false;
            }
            if (node.Level == 0) {
                return true;
            }
            if (!node.Element.IsSpecial || node.IsAssistantRoot) {
                node.State.RequireLayoutStrategy.RouteConnectors(state, node);
                return true;
            }
            return false;
        });
    };
    /// <summary>
    /// Moves a given branch horizontally, except its root box.
    /// Also updates branch exterior rects.
    /// Also updates branch boundary for the current <paramref name="layoutLevel"/>.
    /// </summary>
    LayoutAlgorithm.MoveChildrenOnly = function (state, layoutLevel, offset) {
        var e_3, _a;
        var children = layoutLevel.BranchRoot.Children;
        if (children == null || children.length == 0) {
            throw new Error("Should never be invoked when children not set");
        }
        var action = function (node) {
            if (!node.State.IsHidden) {
                try {
                    node.State.TopLeft = node.State.TopLeft.MoveH(offset);
                    node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
                }
                catch (e) {
                    // ignore
                }
            }
            return true;
        };
        try {
            for (var children_1 = __values(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
                var child = children_1_1.value;
                child.IterateChildFirst(action);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
        layoutLevel.BranchRoot.State.BranchExterior =
            layoutLevel.Boundary.BoundingRect;
    };
    /// <summary>
    /// Moves a given branch horizontally, except its root box.
    /// Also updates branch exterior rects.
    /// Unlike <see cref="MoveChildrenOnly"/> and <see cref="MoveBranch"/>, does NOT update the boundary.
    /// </summary>
    /// <remarks>DOES NOT update branch boundary! Must call <see cref="Boundary.ReloadFromBranch"/> after batch of updates is complete</remarks>
    LayoutAlgorithm.MoveOneChild = function (state, root, offset) {
        root.IterateChildFirst(function (node) {
            if (!node.State.IsHidden) {
                node.State.TopLeft = node.State.TopLeft.MoveH(offset);
                node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
            }
            return true;
        });
    };
    /// <summary>
    /// Moves a given branch horizontally, including its root box.
    /// Also updates branch exterior rects.
    /// Also updates branch boundary for the current <paramref name="layoutLevel"/>.
    /// </summary>
    LayoutAlgorithm.MoveBranch = function (state, layoutLevel, offset) {
        this.MoveOneChild(state, layoutLevel.BranchRoot, offset);
        layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
        layoutLevel.BranchRoot.State.BranchExterior =
            layoutLevel.Boundary.BoundingRect;
    };
    /// <summary>
    /// Vertically aligns a subset of child nodes, presumably located one above another.
    /// All children must belong to the current layout level's root.
    /// Returns leftmost and rightmost boundaries of all branches in the <paramref name="subset"/>, after alignment.
    /// </summary>
    LayoutAlgorithm.AlignHorizontalCenters = function (state, level, subset) {
        var e_4, _a, e_5, _b;
        // compute the rightmost center in the column
        var center = Number.MIN_VALUE;
        try {
            for (var subset_1 = __values(subset), subset_1_1 = subset_1.next(); !subset_1_1.done; subset_1_1 = subset_1.next()) {
                var child = subset_1_1.value;
                var c = child.State.CenterH;
                if (c > center) {
                    center = c;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (subset_1_1 && !subset_1_1.done && (_a = subset_1.return)) _a.call(subset_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        // move those boxes in the column that are not aligned with the rightmost center
        var leftmost = Number.MAX_VALUE;
        var rightmost = Number.MIN_VALUE;
        try {
            for (var subset_2 = __values(subset), subset_2_1 = subset_2.next(); !subset_2_1.done; subset_2_1 = subset_2.next()) {
                var child = subset_2_1.value;
                var frame = child.State;
                var c_1 = frame.CenterH;
                if (c_1 !== center) {
                    var diff = center - c_1;
                    this.MoveOneChild(state, child, diff);
                }
                leftmost = Math.min(leftmost, child.State.BranchExterior.Left);
                rightmost = Math.max(rightmost, child.State.BranchExterior.Right);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (subset_2_1 && !subset_2_1.done && (_b = subset_2.return)) _b.call(subset_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        // update branch boundary
        level.Boundary.ReloadFromBranch(level.BranchRoot);
        return new Dimensions_1.default(leftmost, rightmost);
    };
    /// <summary>
    /// Copies vertical and horionztal measurement data from <paramref name="other"/> frame.
    /// Does not copy <see cref="Connector"/>.
    /// </summary>
    LayoutAlgorithm.CopyExteriorFrom = function (state, other) {
        state.TopLeft = other.TopLeft;
        state.Size = other.Size;
        state.BranchExterior = other.BranchExterior;
        state.SiblingsRowV = other.SiblingsRowV;
    };
    /// <summary>
    /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
    /// </summary>
    LayoutAlgorithm.IsMinValue = function (value) {
        return value <= Number.MIN_VALUE + Number.EPSILON;
    };
    /// <summary>
    /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
    /// </summary>
    LayoutAlgorithm.IsMaxValue = function (value) {
        return value >= Number.MAX_VALUE - Number.EPSILON;
    };
    /// <summary>
    /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
    /// </summary>
    LayoutAlgorithm.IsZero = function (value) {
        return value <= Number.EPSILON && value >= -Number.EPSILON;
    };
    /// <summary>
    /// <c>true</c> if specified <paramref name="value"/> is equal to <see cref="double.MinValue"/>.
    /// </summary>
    LayoutAlgorithm.IsEqual = function (value, other) {
        return Math.abs(value - other) <= Number.EPSILON;
    };
    /// <summary>
    /// Changes <see cref="NodeLayoutInfo.TopLeft"/>.
    /// </summary>
    LayoutAlgorithm.MoveTo = function (state, x, y) {
        state.TopLeft = new Point_1.default(x, y);
    };
    /// <summary>
    /// Uitility for special boxes, spacers etc.
    /// Adjusts exterior and resets branch exterior to size.
    /// </summary>
    LayoutAlgorithm.AdjustSpacer = function (state, x, y, w, h) {
        state.TopLeft = new Point_1.default(x, y);
        state.Size = new Size_1.default(w, h);
        state.BranchExterior = new Rect_1.default(x, y, w, h);
    };
    return LayoutAlgorithm;
}());
exports.default = LayoutAlgorithm;


/***/ }),

/***/ "./dist/core/LayoutLevel.js":
/*!**********************************!*\
  !*** ./dist/core/LayoutLevel.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LayoutLevel = /** @class */ (function () {
    function LayoutLevel(node, boundary) {
        this.BranchRoot = node;
        this.Boundary = boundary;
    }
    return LayoutLevel;
}());
exports.default = LayoutLevel;


/***/ }),

/***/ "./dist/core/LayoutState.js":
/*!**********************************!*\
  !*** ./dist/core/LayoutState.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Operation_1 = __importDefault(__webpack_require__(/*! ./Operation */ "./dist/core/Operation.js"));
var LayoutStateOperationChangedEventArgs_1 = __importDefault(__webpack_require__(/*! ./LayoutStateOperationChangedEventArgs */ "./dist/core/LayoutStateOperationChangedEventArgs.js"));
var Boundary_1 = __importDefault(__webpack_require__(/*! ./Boundary */ "./dist/core/Boundary.js"));
var LayoutLevel_1 = __importDefault(__webpack_require__(/*! ./LayoutLevel */ "./dist/core/LayoutLevel.js"));
var BoundaryChangedEventArgs_1 = __importDefault(__webpack_require__(/*! ./BoundaryChangedEventArgs */ "./dist/core/BoundaryChangedEventArgs.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var Utils_1 = __webpack_require__(/*! ./Utils */ "./dist/core/Utils.js");
var LayoutState = /** @class */ (function () {
    function LayoutState(diagram) {
        this._currentOperation = Operation_1.default.Idle;
        this._layoutStack = [];
        this._pooledBoundaries = [];
        this.BoxSizeFunc = null;
        this.LayoutOptimizerFunc = null;
        this.BoundaryChanged = null;
        this.OperationChanged = null;
        this.Diagram = diagram;
    }
    Object.defineProperty(LayoutState.prototype, "CurrentOperation", {
        get: function () {
            return this._currentOperation;
        },
        set: function (value) {
            this._currentOperation = value;
            if (this.OperationChanged) {
                this.OperationChanged(this, new LayoutStateOperationChangedEventArgs_1.default(this));
            }
        },
        enumerable: true,
        configurable: true
    });
    /// <summary>
    /// Initializes the visual tree and pool of boundary objects.
    /// </summary>
    LayoutState.prototype.AttachVisualTree = function (tree) {
        while (this._pooledBoundaries.length < tree.Depth) {
            this._pooledBoundaries.push(new Boundary_1.default());
        }
    };
    LayoutState.prototype.PushLayoutLevel = function (node) {
        if (this._pooledBoundaries.length == 0) {
            this._pooledBoundaries.push(new Boundary_1.default());
        }
        var boundary = this._pooledBoundaries.pop();
        if (boundary == null) {
            throw Error("Boundary is null");
        }
        switch (this.CurrentOperation) {
            case Operation_1.default.VerticalLayout:
                boundary.Prepare(node);
                break;
            case Operation_1.default.HorizontalLayout:
                boundary.PrepareForHorizontalLayout(node);
                break;
            default:
                throw new Error("This operation can only be invoked when performing vertical or horizontal layouts");
        }
        if (boundary == null) {
            throw Error("Boundary cannot be null");
        }
        var result = new LayoutLevel_1.default(node, boundary);
        this._layoutStack.push(result);
        if (this.BoundaryChanged) {
            this.BoundaryChanged(this, new BoundaryChangedEventArgs_1.default(boundary, result, this));
        }
        return result;
    };
    LayoutState.prototype.MergeSpacer = function (spacer) {
        if (this.CurrentOperation != Operation_1.default.HorizontalLayout) {
            throw new Error("Spacers can only be merged during horizontal layout");
        }
        if (this._layoutStack.length == 0) {
            throw new Error("Cannot merge spacers at top nesting level");
        }
        var level = Utils_1.peek(this._layoutStack);
        if (level == null) {
            throw Error("Level is null");
        }
        level.Boundary.MergeFromNode(spacer);
        if (this.BoundaryChanged) {
            this.BoundaryChanged(this, new BoundaryChangedEventArgs_1.default(level.Boundary, level, this));
        }
    };
    LayoutState.prototype.PopLayoutLevel = function () {
        var innerLevel = this._layoutStack.pop();
        if (innerLevel == null) {
            throw Error("innerLevel is null");
        }
        if (this.BoundaryChanged) {
            this.BoundaryChanged(this, new BoundaryChangedEventArgs_1.default(innerLevel.Boundary, innerLevel, this));
        }
        // if this was not the root, merge boundaries into current level
        if (this._layoutStack.length > 0) {
            var higherLevel = Utils_1.peek(this._layoutStack);
            if (higherLevel == null) {
                throw Error("higherLevel is null");
            }
            switch (this.CurrentOperation) {
                case Operation_1.default.VerticalLayout:
                    higherLevel.Boundary.VerticalMergeFrom(innerLevel.Boundary);
                    higherLevel.BranchRoot.State.BranchExterior =
                        higherLevel.Boundary.BoundingRect;
                    break;
                case Operation_1.default.HorizontalLayout:
                    {
                        // do not apply overlap adjustment for assistant branch, they are always above regular children
                        if (higherLevel.BranchRoot.AssistantsRoot != innerLevel.BranchRoot) {
                            var strategy = higherLevel.BranchRoot.State.RequireLayoutStrategy;
                            var overlap = higherLevel.Boundary.ComputeOverlap(innerLevel.Boundary, strategy.SiblingSpacing, this.Diagram.LayoutSettings.BranchSpacing);
                            if (overlap > 0) {
                                LayoutAlgorithm_1.default.MoveBranch(this, innerLevel, overlap);
                                if (this.BoundaryChanged) {
                                    this.BoundaryChanged(this, new BoundaryChangedEventArgs_1.default(innerLevel.Boundary, innerLevel, this));
                                }
                            }
                        }
                        higherLevel.Boundary.MergeFrom(innerLevel.Boundary);
                        // Do not update branch vertical measurements from the boundary, because boundary adds children one-by-one.
                        // If we take it from boundary, then branch vertical measurement will be incorrect until all children are laid out horizontally,
                        // and this temporarily incorrect state will break those algorithms that need to know combined branch height.
                        higherLevel.BranchRoot.State.BranchExterior = new Rect_1.default(higherLevel.Boundary.BoundingRect.Left, higherLevel.BranchRoot.State.BranchExterior.Top, higherLevel.Boundary.BoundingRect.Size.Width, higherLevel.BranchRoot.State.BranchExterior.Size.Height);
                    }
                    break;
                default:
                    throw new Error("This operation can only be invoked when performing vertical or horizontal layouts");
            }
            if (this.BoundaryChanged) {
                this.BoundaryChanged(this, new BoundaryChangedEventArgs_1.default(higherLevel.Boundary, higherLevel, this));
            }
        }
        // return boundary to the pool
        this._pooledBoundaries.push(innerLevel.Boundary);
    };
    return LayoutState;
}());
exports.default = LayoutState;


/***/ }),

/***/ "./dist/core/LayoutStateOperationChangedEventArgs.js":
/*!***********************************************************!*\
  !*** ./dist/core/LayoutStateOperationChangedEventArgs.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LayoutStateOperactionChangedEventArgs = /** @class */ (function () {
    function LayoutStateOperactionChangedEventArgs(state) {
        this.State = state;
        this.CurrentOperation = state.CurrentOperation;
    }
    return LayoutStateOperactionChangedEventArgs;
}());
exports.default = LayoutStateOperactionChangedEventArgs;


/***/ }),

/***/ "./dist/core/LayoutStrategyBase.js":
/*!*****************************************!*\
  !*** ./dist/core/LayoutStrategyBase.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BranchParentAlignment_1 = __importDefault(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var LayoutStrategyBase = /** @class */ (function () {
    function LayoutStrategyBase() {
        this.ParentAlignment = BranchParentAlignment_1.default.InvalidValue;
        this.ParentChildSpacing = 20;
        this.ParentConnectorShield = 50;
        this.SiblingSpacing = 20;
        this.ChildConnectorHookLength = 5;
    }
    Object.defineProperty(LayoutStrategyBase.prototype, "SupportsAssistants", {
        get: function () {
            return this.GetSupportsAssistants();
        },
        enumerable: true,
        configurable: true
    });
    return LayoutStrategyBase;
}());
exports.default = LayoutStrategyBase;


/***/ }),

/***/ "./dist/core/LinearLayoutStrategy.js":
/*!*******************************************!*\
  !*** ./dist/core/LinearLayoutStrategy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var LayoutStrategyBase_1 = __importDefault(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var BranchParentAlignment_1 = __importDefault(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var Edge_1 = __importDefault(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Connector_1 = __importDefault(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var LinearLayoutStrategy = /** @class */ (function (_super) {
    __extends(LinearLayoutStrategy, _super);
    function LinearLayoutStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return true; };
        return _this;
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// </summary>
    LinearLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        if (node.ChildCount > 0) {
            node.State.NumberOfSiblings = node.Element.IsCollapsed
                ? 0
                : node.ChildCount;
            // only add spacers for non-collapsed boxes
            if (!node.Element.IsCollapsed) {
                var verticalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.AddRegularChildBox(verticalSpacer);
                var horizontalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.AddRegularChildBox(horizontalSpacer);
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    LinearLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.AssistantsRoot != null) {
            // assistants root has to be initialized with main node's exterior
            LayoutAlgorithm_1.default.CopyExteriorFrom(node.AssistantsRoot.State, node.State);
            LayoutAlgorithm_1.default.VerticalLayout(state, node.AssistantsRoot);
        }
        if (node.State.NumberOfSiblings == 0) {
            return;
        }
        var siblingsRowExterior = Dimensions_1.default.MinMax();
        var top;
        if (node.AssistantsRoot == null) {
            if (node.State.SiblingsRowV == null) {
                throw Error("SiblingsRowV is null");
            }
            top = node.State.SiblingsRowV.To + this.ParentChildSpacing;
        }
        else {
            top = node.State.BranchExterior.Bottom + this.ParentChildSpacing;
        }
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var child = node.Children[i];
            var rect = child.State;
            LayoutAlgorithm_1.default.MoveTo(child.State, 0, top);
            if (child.State.Size == null) {
                throw Error("Size is null");
            }
            child.State.BranchExterior = Rect_1.default.from(child.State.Size, child.State.TopLeft);
            if (rect.Size == null) {
                throw Error("Size is null");
            }
            siblingsRowExterior = Dimensions_1.default.add(siblingsRowExterior, new Dimensions_1.default(top, top + rect.Size.Height));
        }
        siblingsRowExterior = new Dimensions_1.default(siblingsRowExterior.From, siblingsRowExterior.To);
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var child = node.Children[i];
            child.State.SiblingsRowV = siblingsRowExterior;
            // re-enter layout algorithm for child branch
            LayoutAlgorithm_1.default.VerticalLayout(state, child);
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    LinearLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.AssistantsRoot != null) {
            LayoutAlgorithm_1.default.HorizontalLayout(state, node.AssistantsRoot);
        }
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var child = node.Children[i];
            // re-enter layout algorithm for child branch
            LayoutAlgorithm_1.default.HorizontalLayout(state, child);
        }
        if (node.Level > 0 && node.ChildCount > 0) {
            var rect = node.State;
            var leftmost = node.Children[0].State.CenterH;
            var rightmost = node.Children[node.State.NumberOfSiblings - 1].State.CenterH;
            var desiredCenter = node.State.NumberOfSiblings == 1 ||
                this.ParentAlignment == BranchParentAlignment_1.default.Center
                ? leftmost + (rightmost - leftmost) / 2
                : this.ParentAlignment == BranchParentAlignment_1.default.Left
                    ? leftmost + this.ChildConnectorHookLength
                    : rightmost - this.ChildConnectorHookLength;
            var center = rect.CenterH;
            var diff = center - desiredCenter;
            LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
            // vertical connector from parent
            var verticalSpacer = node.Children[node.State.NumberOfSiblings];
            if (node.Children[0].State.SiblingsRowV == null) {
                throw Error("SiblingsRowV is null");
            }
            LayoutAlgorithm_1.default.AdjustSpacer(verticalSpacer.State, center - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
            state.MergeSpacer(verticalSpacer);
            // horizontal protector
            var firstInRow = node.Children[0].State;
            var horizontalSpacer = node.Children[node.State.NumberOfSiblings + 1];
            if (firstInRow.SiblingsRowV == null) {
                throw Error("SiblingsRowV is null");
            }
            LayoutAlgorithm_1.default.AdjustSpacer(horizontalSpacer.State, firstInRow.Left, firstInRow.SiblingsRowV.From - this.ParentChildSpacing, node.Children[node.State.NumberOfSiblings - 1].State.Right -
                firstInRow.Left, this.ParentChildSpacing);
            state.MergeSpacer(horizontalSpacer);
        }
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    LinearLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        var normalChildCount = node.State.NumberOfSiblings;
        var count = normalChildCount == 0
            ? 0 // no visible children = no edges
            : normalChildCount == 1
                ? 1 // one child = one direct edge between parent and child
                : 1 + // one downward edge for parent
                    1 + // one for horizontal carrier
                    normalChildCount; // one upward edge for each child
        if (count == 0) {
            node.State.Connector = null;
            return;
        }
        var segments = [];
        var rootRect = node.State;
        var center = rootRect.CenterH;
        if (node.Children == null) {
            throw new Error("State is present, but children not set");
        }
        if (count == 1) {
            segments[0] = new Edge_1.default(new Point_1.default(center, rootRect.Bottom), new Point_1.default(center, node.Children[0].State.Top));
        }
        else {
            if (node.Children[0].State.SiblingsRowV == null) {
                throw Error("SiblingsRowV is null");
            }
            var space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;
            segments[0] = new Edge_1.default(new Point_1.default(center, rootRect.Bottom), new Point_1.default(center, rootRect.Bottom + space - this.ChildConnectorHookLength));
            for (var i = 0; i < normalChildCount; i++) {
                var childRect = node.Children[i].State;
                var childCenter = childRect.CenterH;
                segments[1 + i] = new Edge_1.default(new Point_1.default(childCenter, childRect.Top), new Point_1.default(childCenter, childRect.Top - this.ChildConnectorHookLength));
            }
            segments[count - 1] = new Edge_1.default(new Point_1.default(segments[1].To.X, segments[1].To.Y), new Point_1.default(segments[count - 2].To.X, segments[1].To.Y));
        }
        node.State.Connector = new Connector_1.default(segments);
    };
    return LinearLayoutStrategy;
}(LayoutStrategyBase_1.default));
exports.default = LinearLayoutStrategy;


/***/ }),

/***/ "./dist/core/MultiLineFishboneLayoutStrategy.js":
/*!******************************************************!*\
  !*** ./dist/core/MultiLineFishboneLayoutStrategy.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LinearLayoutStrategy_1 = __importDefault(__webpack_require__(/*! ./LinearLayoutStrategy */ "./dist/core/LinearLayoutStrategy.js"));
var LayoutStrategyBase_1 = __importDefault(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var Node_1 = __importDefault(__webpack_require__(/*! ./Node */ "./dist/core/Node.js"));
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var BranchParentAlignment_1 = __importDefault(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var Edge_1 = __importDefault(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Connector_1 = __importDefault(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var GroupIterator = /** @class */ (function () {
    function GroupIterator(numberOfSiblings, numberOfGroups) {
        this.Group = 0;
        this.FromIndex = 0;
        this.Count = 0;
        this.MaxOnLeft = 0;
        this._numberOfSiblings = numberOfSiblings;
        this._numberOfGroups = numberOfGroups;
    }
    GroupIterator.prototype.CountInGroup = function () {
        var countInRow = this._numberOfGroups * 2;
        var result = 0;
        var countToThisGroup = this.Group * 2 + 2;
        var firstInRow = 0;
        while (true) {
            var countInThisRow = firstInRow >= this._numberOfSiblings - countInRow
                ? this._numberOfSiblings - firstInRow
                : countInRow;
            if (countInThisRow >= countToThisGroup) {
                result += 2;
            }
            else {
                countToThisGroup--;
                if (countInThisRow >= countToThisGroup) {
                    result++;
                }
                break;
            }
            firstInRow += countInRow;
        }
        return result;
    };
    GroupIterator.prototype.NextGroup = function () {
        this.FromIndex = this.FromIndex + this.Count;
        if (this.FromIndex > 0) {
            this.Group++;
        }
        this.Count = this.CountInGroup();
        this.MaxOnLeft = Math.floor(this.Count / 2) + (this.Count % 2);
        return this.Count != 0;
    };
    return GroupIterator;
}());
var TreeNodeView = /** @class */ (function (_super) {
    __extends(TreeNodeView, _super);
    function TreeNodeView(element) {
        return _super.call(this, element) || this;
    }
    TreeNodeView.prototype.Prepare = function (capacity) {
        if (this.Children == null) {
            this.Children = [];
        }
        else {
            this.Children.length = 0;
        }
    };
    TreeNodeView.prototype.AddChildView = function (node) {
        this.Children.push(node);
    };
    return TreeNodeView;
}(Node_1.default));
var SingleFishboneLayoutAdapter = /** @class */ (function (_super) {
    __extends(SingleFishboneLayoutAdapter, _super);
    function SingleFishboneLayoutAdapter(realRoot) {
        var _this = _super.call(this) || this;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return false; };
        _this.Iterator = new GroupIterator(realRoot.State.NumberOfSiblings, realRoot.State.NumberOfSiblingColumns);
        _this.RealRoot = realRoot;
        _this.SpecialRoot = new TreeNodeView(Box_1.default.Special(Box_1.default.None, realRoot.Element.Id, true));
        (_this.SpecialRoot.Level = _this.RealRoot.Level),
            (_this.SpecialRoot.ParentNode = _this.RealRoot);
        _this.SpecialRoot.State.EffectiveLayoutStrategy = _this;
        var parentStrategy = realRoot.State
            .RequireLayoutStrategy;
        _this.SiblingSpacing = parentStrategy.SiblingSpacing;
        _this.ParentConnectorShield = parentStrategy.ParentConnectorShield;
        _this.ParentChildSpacing = parentStrategy.ParentChildSpacing;
        _this.ParentAlignment = parentStrategy.ParentAlignment;
        _this.ChildConnectorHookLength = parentStrategy.ChildConnectorHookLength;
        return _this;
    }
    SingleFishboneLayoutAdapter.prototype.NextGroup = function () {
        if (!this.Iterator.NextGroup()) {
            return false;
        }
        this.SpecialRoot.State.NumberOfSiblings = this.Iterator.Count;
        this.SpecialRoot.Prepare(this.RealRoot.State.NumberOfSiblingRows * 2);
        for (var i = 0; i < this.Iterator.Count; i++) {
            this.SpecialRoot.AddChildView(this.RealRoot.Children[this.Iterator.FromIndex + i]);
        }
        var spacer = this.RealRoot.Children[this.RealRoot.State.NumberOfSiblings + 1 + this.Iterator.Group];
        this.SpecialRoot.AddChildView(spacer);
        LayoutAlgorithm_1.default.CopyExteriorFrom(this.SpecialRoot.State, this.RealRoot.State);
        return true;
    };
    SingleFishboneLayoutAdapter.prototype.PreProcessThisNode = function (state, node) {
        throw new Error("NotSupportedException");
    };
    SingleFishboneLayoutAdapter.prototype.ApplyVerticalLayout = function (state, level) {
        var _a, _b;
        if (this.SpecialRoot.State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
        }
        var prevRowBottom = (_b = (_a = this.RealRoot.AssistantsRoot) === null || _a === void 0 ? void 0 : _a.State.BranchExterior.Bottom) !== null && _b !== void 0 ? _b : this.SpecialRoot.State.SiblingsRowV.To;
        for (var i = 0; i < this.Iterator.MaxOnLeft; i++) {
            var spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
            var child = this.SpecialRoot.Children[i];
            var frame = child.State;
            LayoutAlgorithm_1.default.MoveTo(frame, frame.Left, prevRowBottom + spacing);
            var rowExterior = new Dimensions_1.default(frame.Top, frame.Bottom);
            var i2 = i + this.Iterator.MaxOnLeft;
            if (frame.Size == null) {
                throw Error("Size is null");
            }
            if (i2 < this.Iterator.Count) {
                var child2 = this.SpecialRoot.Children[i2];
                var frame2 = child2.State;
                LayoutAlgorithm_1.default.MoveTo(frame2, frame2.Left, prevRowBottom + spacing);
                if (frame2.Size == null) {
                    throw Error("Size is null");
                }
                if (frame2.Bottom > frame.Bottom) {
                    LayoutAlgorithm_1.default.MoveTo(frame, frame.Left, frame2.CenterV - frame.Size.Height / 2);
                }
                else if (frame2.Bottom < frame.Bottom) {
                    LayoutAlgorithm_1.default.MoveTo(frame2, frame2.Left, frame.CenterV - frame2.Size.Height / 2);
                }
                frame2.BranchExterior = Rect_1.default.from(frame2.Size, frame2.TopLeft);
                rowExterior = Dimensions_1.default.add(rowExterior, new Dimensions_1.default(frame2.Top, frame2.Bottom));
                frame2.SiblingsRowV = rowExterior;
                LayoutAlgorithm_1.default.VerticalLayout(state, child2);
                prevRowBottom = frame2.BranchExterior.Bottom;
            }
            frame.BranchExterior = Rect_1.default.from(frame.Size, frame.TopLeft);
            frame.SiblingsRowV = rowExterior;
            LayoutAlgorithm_1.default.VerticalLayout(state, child);
            prevRowBottom = Math.max(prevRowBottom, frame.BranchExterior.Bottom);
        }
    };
    SingleFishboneLayoutAdapter.prototype.ApplyHorizontalLayout = function (state, level) {
        if (level.BranchRoot != this.SpecialRoot) {
            throw new Error("InvalidOperationException: Wrong root node received");
        }
        var left = true;
        var countOnThisSide = 0;
        for (var i = 0; i < this.Iterator.Count; i++) {
            var child = this.SpecialRoot.Children[i];
            LayoutAlgorithm_1.default.HorizontalLayout(state, child);
            // we go top-bottom to layout left side of the group,
            // then add a carrier protector
            // then top-bottom to fill right side of the group
            if (++countOnThisSide == this.Iterator.MaxOnLeft) {
                if (left) {
                    // horizontally align children in left pillar
                    LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateSiblings(0, this.Iterator.MaxOnLeft));
                    left = false;
                    countOnThisSide = 0;
                    var rightmost = Number.MIN_VALUE;
                    for (var k = 0; k < i; k++) {
                        rightmost = Math.max(rightmost, this.SpecialRoot.Children[k].State.BranchExterior.Right);
                    }
                    rightmost = Math.max(rightmost, child.State.Right);
                    // integrate protector for group's vertical carrier
                    var spacer = this.SpecialRoot.Children[this.SpecialRoot.State.NumberOfSiblings];
                    if (this.SpecialRoot.Children[0].State.SiblingsRowV == null) {
                        throw Error("SiblingsRowV is null");
                    }
                    if (child.State.SiblingsRowV == null) {
                        throw Error("SiblingsRowV is null");
                    }
                    LayoutAlgorithm_1.default.AdjustSpacer(spacer.State, rightmost, this.SpecialRoot.Children[0].State.SiblingsRowV.From, this.SiblingSpacing, child.State.SiblingsRowV.To -
                        this.SpecialRoot.Children[0].State.SiblingsRowV.From);
                    level.Boundary.MergeFromNode(spacer);
                }
            }
        }
        // horizontally align children in right pillar
        LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateSiblings(this.Iterator.MaxOnLeft, this.Iterator.Count));
    };
    SingleFishboneLayoutAdapter.prototype.EnumerateSiblings = function (from, to) {
        var nodes = [];
        for (var i = from; i < to; i++) {
            nodes.push(this.SpecialRoot.Children[i]);
        }
        return nodes;
    };
    SingleFishboneLayoutAdapter.prototype.RouteConnectors = function (state, node) {
        throw new Error();
    };
    return SingleFishboneLayoutAdapter;
}(LayoutStrategyBase_1.default));
var MultiLineFishboneLayoutStrategy = /** @class */ (function (_super) {
    __extends(MultiLineFishboneLayoutStrategy, _super);
    function MultiLineFishboneLayoutStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// Maximum number of boxes staffed onto a single vertical carrier.
        /// </summary>
        _this.MaxGroups = 4;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return true; };
        return _this;
        /// <summary>
        /// Implements layout for a single vertically stretched fishbone.
        /// Re-used by <see cref="MultiLineFishboneLayoutStrategy"/> to layout multiple groups of siblings.
        /// </summary>
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// </summary>
    MultiLineFishboneLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        if (this.MaxGroups <= 0) {
            throw new Error("MaxGroups must be a positive value");
        }
        if (node.ChildCount <= this.MaxGroups * 2) {
            _super.prototype.PreProcessThisNode.call(this, state, node);
            return;
        }
        node.State.NumberOfSiblings = node.ChildCount;
        // only add spacers for non-collapsed boxes
        if (node.State.NumberOfSiblings > 0) {
            // using column == group here,
            // and each group consists of two vertical stretches of boxes with a vertical carrier in between
            node.State.NumberOfSiblingColumns = this.MaxGroups;
            node.State.NumberOfSiblingRows = Math.floor(node.State.NumberOfSiblings / (this.MaxGroups * 2));
            if (node.State.NumberOfSiblings % (this.MaxGroups * 2) != 0) {
                node.State.NumberOfSiblingRows++;
            }
            // a connector from parent to horizontal carrier
            var parentSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
            node.AddRegularChildBox(parentSpacer);
            // spacers for vertical carriers
            for (var i = 0; i < node.State.NumberOfSiblingColumns; i++) {
                var verticalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.AddRegularChildBox(verticalSpacer);
            }
            // if needed, horizontal carrier
            if (node.State.NumberOfSiblingColumns > 1) {
                var horizontalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.AddRegularChildBox(horizontalSpacer);
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    MultiLineFishboneLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
            _super.prototype.ApplyVerticalLayout.call(this, state, level);
            return;
        }
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.AssistantsRoot != null) {
            // assistants root has to be initialized with main node's exterior
            LayoutAlgorithm_1.default.CopyExteriorFrom(node.AssistantsRoot.State, node.State);
            LayoutAlgorithm_1.default.VerticalLayout(state, node.AssistantsRoot);
        }
        var adapter = new SingleFishboneLayoutAdapter(node);
        while (adapter.NextGroup()) {
            LayoutAlgorithm_1.default.VerticalLayout(state, adapter.SpecialRoot);
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    MultiLineFishboneLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
            _super.prototype.ApplyHorizontalLayout.call(this, state, level);
            return;
        }
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.AssistantsRoot != null) {
            LayoutAlgorithm_1.default.HorizontalLayout(state, node.AssistantsRoot);
        }
        var adapter = new SingleFishboneLayoutAdapter(node);
        while (adapter.NextGroup()) {
            LayoutAlgorithm_1.default.HorizontalLayout(state, adapter.SpecialRoot);
        }
        var rect = node.State;
        // now align child nodes under the parent
        if (node.Level > 0) {
            var diff = 0;
            if (node.State.NumberOfSiblingColumns > 1) {
                var leftCarrier = node.Children[node.State.NumberOfSiblings + 1].State.CenterH;
                var rightCarrier = node.Children[node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns].State.CenterH;
                var desiredCenter = node.State.NumberOfSiblings == 1 ||
                    this.ParentAlignment == BranchParentAlignment_1.default.Center
                    ? leftCarrier + (rightCarrier - leftCarrier) / 2
                    : this.ParentAlignment == BranchParentAlignment_1.default.Left
                        ? leftCarrier + this.ChildConnectorHookLength
                        : rightCarrier - this.ChildConnectorHookLength;
                //let desiredCenter = (leftCarrier + rightCarrier)/2.0;
                diff = rect.CenterH - desiredCenter;
            }
            else {
                var carrier = node.Children[1 + node.State.NumberOfSiblings].State.CenterH;
                var desiredCenter = rect.CenterH;
                diff = desiredCenter - carrier;
            }
            LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
        }
        if (node.Level > 0) {
            if (node.Children[0].State.SiblingsRowV == null) {
                throw Error("SiblingsRowV is null");
            }
            // vertical connector from parent
            var ix = node.State.NumberOfSiblings;
            var verticalSpacer = node.Children[ix];
            LayoutAlgorithm_1.default.AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
            state.MergeSpacer(verticalSpacer);
            ix++;
            // vertical carriers already merged in
            ix += node.State.NumberOfSiblingColumns;
            if (node.State.NumberOfSiblingColumns > 1) {
                // have a horizontal carrier
                var horizontalSpacer = node.Children[ix];
                var leftmost = node.Children[node.State.NumberOfSiblings + 1].State.TopLeft;
                var rightmost = node.Children[ix - 1].State.Right;
                LayoutAlgorithm_1.default.AdjustSpacer(horizontalSpacer.State, leftmost.X, leftmost.Y - this.ParentChildSpacing, rightmost - leftmost.X, this.ParentChildSpacing);
                state.MergeSpacer(horizontalSpacer);
            }
        }
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    MultiLineFishboneLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
            _super.prototype.RouteConnectors.call(this, state, node);
            return;
        }
        var count = 1 + // one parent connector
            node.State.NumberOfSiblings + // one hook for each child
            node.State.NumberOfSiblingColumns; // one for each vertical carrier
        if (node.State.NumberOfSiblingColumns > 1) {
            // also have a horizontal carrier
            count++;
        }
        var segments = [];
        var rootRect = node.State;
        var center = rootRect.CenterH;
        var ix = 0;
        if (node.Children[0].State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
        }
        // parent connector
        var space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;
        segments[ix++] = new Edge_1.default(new Point_1.default(center, rootRect.Bottom), new Point_1.default(center, rootRect.Bottom + space - this.ChildConnectorHookLength));
        // one hook for each child
        var iterator = new GroupIterator(node.State.NumberOfSiblings, node.State.NumberOfSiblingColumns);
        while (iterator.NextGroup()) {
            var carrier = node.Children[1 + node.State.NumberOfSiblings + iterator.Group].State;
            var from = carrier.CenterH;
            var isLeft = true;
            var countOnThisSide = 0;
            for (var i = iterator.FromIndex; i < iterator.FromIndex + iterator.Count; i++) {
                var to = isLeft
                    ? node.Children[i].State.Right
                    : node.Children[i].State.Left;
                var y = node.Children[i].State.CenterV;
                segments[ix++] = new Edge_1.default(new Point_1.default(from, y), new Point_1.default(to, y));
                if (++countOnThisSide == iterator.MaxOnLeft) {
                    countOnThisSide = 0;
                    if (isLeft) {
                        // one for each vertical carrier
                        segments[1 + node.State.NumberOfSiblings + iterator.Group] = new Edge_1.default(new Point_1.default(carrier.CenterH, carrier.Top - this.ChildConnectorHookLength), new Point_1.default(carrier.CenterH, node.Children[i].State.CenterV));
                    }
                    isLeft = !isLeft;
                }
            }
        }
        // vertical carriers already created
        ix += node.State.NumberOfSiblingColumns;
        if (node.State.NumberOfSiblingColumns > 1) {
            var leftGroup = node.Children[1 + node.State.NumberOfSiblings].State;
            var rightGroup = node.Children[1 +
                node.State.NumberOfSiblings +
                node.State.NumberOfSiblingColumns -
                1].State;
            // one horizontal carrier
            segments[ix] = new Edge_1.default(new Point_1.default(leftGroup.CenterH, leftGroup.Top - this.ChildConnectorHookLength), new Point_1.default(rightGroup.CenterH, rightGroup.Top - this.ChildConnectorHookLength));
        }
        node.State.Connector = new Connector_1.default(segments);
    };
    return MultiLineFishboneLayoutStrategy;
}(LinearLayoutStrategy_1.default));
exports.default = MultiLineFishboneLayoutStrategy;


/***/ }),

/***/ "./dist/core/MultiLineHangerLayoutStrategy.js":
/*!****************************************************!*\
  !*** ./dist/core/MultiLineHangerLayoutStrategy.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LinearLayoutStrategy_1 = __importDefault(__webpack_require__(/*! ./LinearLayoutStrategy */ "./dist/core/LinearLayoutStrategy.js"));
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var Edge_1 = __importDefault(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Connector_1 = __importDefault(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
/// <summary>
/// Arranges child boxes in multiple lines under the parent.
/// Can only be configured to position parent in the middle of children.
/// Children are attached to long horizontal carriers,
/// with a central vertical carrier going through them from parent's bottom.
/// </summary>
var MultiLineHangerLayoutStrategy = /** @class */ (function (_super) {
    __extends(MultiLineHangerLayoutStrategy, _super);
    function MultiLineHangerLayoutStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// Maximum number of siblings in a horizontal row.
        /// </summary>
        _this.MaxSiblingsPerRow = 4;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return true; };
        return _this;
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// </summary>
    MultiLineHangerLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        if (this.MaxSiblingsPerRow <= 0 || this.MaxSiblingsPerRow % 2 != 0) {
            throw new Error("MaxSiblingsPerRow must be a positive even value");
        }
        if (node.ChildCount <= this.MaxSiblingsPerRow) {
            // fall back to linear layout, only have one row of boxes
            _super.prototype.PreProcessThisNode.call(this, state, node);
            return;
        }
        node.State.NumberOfSiblings = node.ChildCount;
        // only add spacers for non-collapsed boxes
        if (node.State.NumberOfSiblings > 0) {
            var lastRowBoxCount = node.ChildCount % this.MaxSiblingsPerRow;
            // add one (for vertical spacer) into the count of layout columns
            node.State.NumberOfSiblingColumns = 1 + this.MaxSiblingsPerRow;
            node.State.NumberOfSiblingRows = Math.floor(node.ChildCount / this.MaxSiblingsPerRow);
            if (lastRowBoxCount != 0) {
                node.State.NumberOfSiblingRows++;
            }
            // include vertical spacers into the count of layout siblings
            node.State.NumberOfSiblings =
                node.ChildCount + node.State.NumberOfSiblingRows;
            if (lastRowBoxCount > 0 &&
                lastRowBoxCount <= Math.floor(this.MaxSiblingsPerRow / 2)) {
                // don't need the last spacer, last row is half-full or even less
                node.State.NumberOfSiblings--;
            }
            // sibling middle-spacers have to be inserted between siblings
            var ix = Math.floor(this.MaxSiblingsPerRow / 2);
            while (ix < node.State.NumberOfSiblings) {
                var siblingSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.InsertRegularChildBoxByIndex(ix, siblingSpacer);
                ix += node.State.NumberOfSiblingColumns;
            }
            // add parent vertical spacer to the end
            var verticalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
            node.AddRegularChildBox(verticalSpacer);
            // add horizontal spacers to the end
            for (var i = 0; i < node.State.NumberOfSiblingRows; i++) {
                var horizontalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
                node.AddRegularChildBox(horizontalSpacer);
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    MultiLineHangerLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
            // fall back to linear layout, only have one row of boxes
            _super.prototype.ApplyVerticalLayout.call(this, state, level);
            return;
        }
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.AssistantsRoot != null) {
            // assistants root has to be initialized with main node's exterior
            LayoutAlgorithm_1.default.CopyExteriorFrom(node.AssistantsRoot.State, node.State);
            LayoutAlgorithm_1.default.VerticalLayout(state, node.AssistantsRoot);
        }
        var prevRowExterior = new Dimensions_1.default(node.State.SiblingsRowV.From, node.AssistantsRoot == null
            ? node.State.SiblingsRowV.To
            : node.State.BranchExterior.Bottom);
        for (var row = 0; row < node.State.NumberOfSiblingRows; row++) {
            var siblingsRowExterior = Dimensions_1.default.MinMax();
            var spacing = row == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
            // first, compute
            var from = row * node.State.NumberOfSiblingColumns;
            var to = Math.min(from + node.State.NumberOfSiblingColumns, node.State.NumberOfSiblings);
            for (var i = from; i < to; i++) {
                var child = node.Children[i];
                if (child.Element.IsSpecial) {
                    // skip vertical spacers for now
                    continue;
                }
                var rect = child.State;
                var top_1 = prevRowExterior.To + spacing;
                LayoutAlgorithm_1.default.MoveTo(child.State, rect.Left, top_1);
                child.State.BranchExterior = Rect_1.default.from(child.State.Size, child.State.TopLeft);
                siblingsRowExterior = Dimensions_1.default.add(siblingsRowExterior, new Dimensions_1.default(top_1, top_1 + rect.Size.Height));
            }
            siblingsRowExterior = new Dimensions_1.default(siblingsRowExterior.From, siblingsRowExterior.To);
            var siblingsBottom = Number.MIN_VALUE;
            for (var i = from; i < to; i++) {
                var child = node.Children[i];
                child.State.SiblingsRowV = siblingsRowExterior;
                // re-enter layout algorithm for child branch
                LayoutAlgorithm_1.default.VerticalLayout(state, child);
                siblingsBottom = Math.max(siblingsBottom, child.State.BranchExterior.Bottom);
            }
            prevRowExterior = new Dimensions_1.default(siblingsRowExterior.From, Math.max(siblingsBottom, siblingsRowExterior.To));
            // now assign size to the vertical spacer, if any
            var spacerIndex = from + Math.floor(node.State.NumberOfSiblingColumns / 2);
            if (spacerIndex < node.State.NumberOfSiblings) {
                // in the last row, spacer should only extend to the siblings row bottom,
                // because main vertical carrier does not go below last row
                // and thus cannot conflict with branches of children of the last row
                var spacerBottom = row == node.State.NumberOfSiblingRows - 1
                    ? node.Children[spacerIndex - 1].State.SiblingsRowV.To
                    : prevRowExterior.To;
                var spacer = node.Children[spacerIndex].State;
                LayoutAlgorithm_1.default.AdjustSpacer(spacer, 0, prevRowExterior.From, this.ParentConnectorShield, spacerBottom - prevRowExterior.From);
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    MultiLineHangerLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
            // fall back to linear layout, only have one row of boxes
            _super.prototype.ApplyHorizontalLayout.call(this, state, level);
            return;
        }
        if (node.AssistantsRoot != null) {
            LayoutAlgorithm_1.default.HorizontalLayout(state, node.AssistantsRoot);
        }
        for (var col = 0; col < node.State.NumberOfSiblingColumns; col++) {
            // first, perform horizontal layout for every node in this column
            for (var row = 0; row < node.State.NumberOfSiblingRows; row++) {
                var ix = row * node.State.NumberOfSiblingColumns + col;
                if (ix >= node.State.NumberOfSiblings) {
                    break;
                }
                var child = node.Children[ix];
                // re-enter layout algorithm for child branch
                LayoutAlgorithm_1.default.HorizontalLayout(state, child);
            }
            LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateColumn(node, col));
        }
        // now align children under parent
        var rect = node.State;
        var spacer = node.Children[Math.floor(node.State.NumberOfSiblingColumns / 2)];
        var desiredCenter = spacer.State.CenterH;
        var diff = rect.CenterH - desiredCenter;
        LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
        // vertical connector from parent
        var verticalSpacer = node.Children[node.State.NumberOfSiblings];
        LayoutAlgorithm_1.default.AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
        state.MergeSpacer(verticalSpacer);
        // horizontal row carrier protectors
        var spacing = this.ParentChildSpacing;
        for (var firstInRowIndex = 0; firstInRowIndex < node.State.NumberOfSiblings; firstInRowIndex += node.State.NumberOfSiblingColumns) {
            var firstInRow = node.Children[firstInRowIndex].State;
            var lastInRow = node.Children[Math.min(firstInRowIndex + node.State.NumberOfSiblingColumns - 1, node.State.NumberOfSiblings - 1)].State;
            var horizontalSpacer = node.Children[1 +
                node.State.NumberOfSiblings +
                Math.floor(firstInRowIndex / node.State.NumberOfSiblingColumns)];
            var width = lastInRow.Right >= verticalSpacer.State.Right
                ? lastInRow.Right - firstInRow.Left
                : // extend protector at least to the central carrier
                    verticalSpacer.State.Right - firstInRow.Left;
            LayoutAlgorithm_1.default.AdjustSpacer(horizontalSpacer.State, firstInRow.Left, firstInRow.SiblingsRowV.From - spacing, width, spacing);
            state.MergeSpacer(horizontalSpacer);
            spacing = this.SiblingSpacing;
        }
    };
    MultiLineHangerLayoutStrategy.prototype.EnumerateColumn = function (branchRoot, col) {
        var nodes = [];
        for (var row = 0; row < branchRoot.State.NumberOfSiblingRows; row++) {
            var ix = row * branchRoot.State.NumberOfSiblingColumns + col;
            if (ix >= branchRoot.State.NumberOfSiblings) {
                break;
            }
            nodes.push(branchRoot.Children[ix]);
        }
        return nodes;
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    MultiLineHangerLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        var e_1, _a;
        if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
            // fall back to linear layout, only have one row of boxes
            _super.prototype.RouteConnectors.call(this, state, node);
            return;
        }
        // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
        var count = 1 + node.State.NumberOfSiblingRows;
        try {
            for (var _b = __values(node.Children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                // normal boxes get one upward hook
                if (!child.Element.IsSpecial) {
                    count++;
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
        var segments = [];
        var rootRect = node.State;
        var center = rootRect.CenterH;
        var verticalCarrierHeight = node.Children[node.State.NumberOfSiblings - 1].State.SiblingsRowV.From -
            this.ChildConnectorHookLength -
            rootRect.Bottom;
        // central mid-sibling vertical connector, from parent to last row
        segments[0] = new Edge_1.default(new Point_1.default(center, rootRect.Bottom), new Point_1.default(center, rootRect.Bottom + verticalCarrierHeight));
        // short hook for each child
        var ix = 1;
        for (var i = 0; i < node.State.NumberOfSiblings; i++) {
            var child = node.Children[i];
            if (!child.Element.IsSpecial) {
                var childRect = child.State;
                var childCenter = childRect.CenterH;
                segments[ix++] = new Edge_1.default(new Point_1.default(childCenter, childRect.Top), new Point_1.default(childCenter, childRect.Top - this.ChildConnectorHookLength));
            }
        }
        // horizontal carriers go from leftmost child hook to righmost child hook
        // for the last row which is just half or less full, it will only go to the central vertical carrier
        var lastChildHookIndex = count - node.State.NumberOfSiblingRows - 1;
        for (var firstInRowIndex = 1; firstInRowIndex < count - node.State.NumberOfSiblingRows; firstInRowIndex += this.MaxSiblingsPerRow) {
            var firstInRow = segments[firstInRowIndex];
            var lastInRow = segments[Math.min(firstInRowIndex + this.MaxSiblingsPerRow - 1, lastChildHookIndex)];
            if (lastInRow.From.X < segments[0].From.X) {
                segments[ix++] = new Edge_1.default(new Point_1.default(firstInRow.To.X, firstInRow.To.Y), new Point_1.default(segments[0].To.X, firstInRow.To.Y));
            }
            else {
                segments[ix++] = new Edge_1.default(new Point_1.default(firstInRow.To.X, firstInRow.To.Y), new Point_1.default(lastInRow.To.X, firstInRow.To.Y));
            }
        }
        node.State.Connector = new Connector_1.default(segments);
    };
    return MultiLineHangerLayoutStrategy;
}(LinearLayoutStrategy_1.default));
exports.default = MultiLineHangerLayoutStrategy;


/***/ }),

/***/ "./dist/core/Node.js":
/*!***************************!*\
  !*** ./dist/core/Node.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var NodeLayoutInfo_1 = __importDefault(__webpack_require__(/*! ./NodeLayoutInfo */ "./dist/core/NodeLayoutInfo.js"));
var Node = /** @class */ (function () {
    function Node(element) {
        this.Level = 0;
        this.Children = [];
        this.AssistantsRoot = null;
        this.ParentNode = null;
        this.Element = element;
        this.State = new NodeLayoutInfo_1.default();
    }
    Object.defineProperty(Node.prototype, "ChildCount", {
        get: function () {
            var _a;
            return ((_a = this.Children) === null || _a === void 0 ? void 0 : _a.length) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "IsAssistantRoot", {
        get: function () {
            var _a;
            return ((_a = this.ParentNode) === null || _a === void 0 ? void 0 : _a.AssistantsRoot) == this;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.AddAssistantChild = function (child) {
        if (this.AssistantsRoot == null) {
            this.AssistantsRoot = new Node(Box_1.default.Special(Box_1.default.None, this.Element.Id, true));
            this.AssistantsRoot.ParentNode = this;
            this.AssistantsRoot.Level = this.AssistantsRoot.Level + 1;
        }
        this.AssistantsRoot.AddRegularChild(child);
        return this;
    };
    /// <summary>
    /// Adds a new child to the list. Returns reference to self.
    /// </summary>
    Node.prototype.AddRegularChild = function (child) {
        return this.InsertRegularChild(this.ChildCount, child);
    };
    Node.prototype.AddRegularChildBox = function (child) {
        return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
    };
    /// <summary>
    /// Adds a new child to the list. Returns reference to self.
    /// </summary>
    Node.prototype.InsertRegularChildBox = function (child) {
        return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
    };
    /// <summary>
    /// Adds a new child to the list. Returns reference to self.
    /// </summary>
    Node.prototype.InsertRegularChildBoxByIndex = function (index, child) {
        return this.InsertRegularChild(index, new Node(child));
    };
    /// <summary>
    /// Adds a new child to the list. Returns reference to self.
    /// </summary>
    Node.prototype.InsertRegularChild = function (index, child) {
        if (this.Children == null) {
            this.Children = [];
        }
        this.Children.splice(index, 0, child);
        child.ParentNode = this;
        child.Level = this.Level + 1;
        // if (child.Element.Id === -1) {
        //   debugger;
        // }
        return this;
    };
    Node.prototype.IterateChildFirst = function (func) {
        var e_1, _a;
        if (this.AssistantsRoot != null) {
            if (!this.AssistantsRoot.IterateChildFirst(func)) {
                return false;
            }
        }
        if (this.Children != null) {
            try {
                for (var _b = __values(this.Children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (!child.IterateChildFirst(func)) {
                        return false;
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
        }
        return func(this);
    };
    /// <summary>
    /// Goes through all elements depth-first. Applies <paramref name="enter"/> to the parent first, then to all children recursively.
    /// In this mode, children at each level decide for themselves whether they want to iterate further down,
    /// e.g. <paramref name="enter"/> can cut-off a branch.
    /// </summary>
    /// <param name="enter">A predicate to allow iteration of branch under this node</param>
    /// <param name="exit">An optional action to run afer iteration of some branch is complete</param>
    Node.prototype.IterateParentFirst = function (enter, exit) {
        var e_2, _a;
        var _b;
        if (!enter(this)) {
            if (exit) {
                exit(this);
            }
            return false;
        }
        (_b = this.AssistantsRoot) === null || _b === void 0 ? void 0 : _b.IterateParentFirst(enter, exit);
        if (this.Children != null) {
            try {
                for (var _c = __values(this.Children), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var child = _d.value;
                    // Ignore returned value, in this mode children at each level
                    // decide for themselves whether they want to iterate further down.
                    child.IterateParentFirst(enter, exit);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (exit) {
            exit(this);
        }
        return true;
    };
    Node.prototype.SuppressAssistants = function () {
        var e_3, _a;
        if (this.AssistantsRoot != null) {
            try {
                for (var _b = __values(this.AssistantsRoot.Children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.AddRegularChild(child);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            this.AssistantsRoot = null;
        }
    };
    return Node;
}());
exports.default = Node;


/***/ }),

/***/ "./dist/core/NodeLayoutInfo.js":
/*!*************************************!*\
  !*** ./dist/core/NodeLayoutInfo.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var NodeLayoutInfo = /** @class */ (function () {
    function NodeLayoutInfo() {
        this._effectiveLayoutStrategy = null;
        this.IsHidden = false;
        this.Connector = null;
        this.NumberOfSiblings = 0;
        this.NumberOfSiblingRows = 0;
        this.NumberOfSiblingColumns = 0;
        this.Size = new Size_1.default(0, 0);
        this.TopLeft = new Point_1.default(0, 0);
        this.BranchExterior = new Rect_1.default(0, 0, 0, 0);
        this.SiblingsRowV = new Dimensions_1.default(0, 0);
    }
    Object.defineProperty(NodeLayoutInfo.prototype, "EffectiveLayoutStrategy", {
        set: function (value) {
            this._effectiveLayoutStrategy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "RequireLayoutStrategy", {
        get: function () {
            if (this._effectiveLayoutStrategy == null) {
                throw new Error("EffectiveLayoutStrategy is not set");
            }
            return this._effectiveLayoutStrategy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "Left", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            return this.TopLeft.X;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "Right", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            if (this.Size == null) {
                throw Error("Size is null");
            }
            return this.TopLeft.X + this.Size.Width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "Top", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            if (this.Size == null) {
                throw Error("Size is null");
            }
            return this.TopLeft.Y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "Bottom", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            if (this.Size == null) {
                throw Error("Size is null");
            }
            return this.TopLeft.Y + this.Size.Height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "CenterH", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            if (this.Size == null) {
                throw Error("Size is null");
            }
            return this.TopLeft.X + this.Size.Width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeLayoutInfo.prototype, "CenterV", {
        get: function () {
            if (this.TopLeft == null) {
                throw Error("TopLeft is null");
            }
            if (this.Size == null) {
                throw Error("Size is null");
            }
            return this.TopLeft.Y + this.Size.Height / 2;
        },
        enumerable: true,
        configurable: true
    });
    return NodeLayoutInfo;
}());
exports.default = NodeLayoutInfo;


/***/ }),

/***/ "./dist/core/Operation.js":
/*!********************************!*\
  !*** ./dist/core/Operation.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Operation;
(function (Operation) {
    /// <summary>
    /// No op.
    /// </summary>
    Operation[Operation["Idle"] = 0] = "Idle";
    /// <summary>
    /// Making initial preparations, creating visual tree.
    /// </summary>
    Operation[Operation["Preparing"] = 1] = "Preparing";
    /// <summary>
    /// Pre-layout modifications of the visual tree.
    /// </summary>
    Operation[Operation["PreprocessVisualTree"] = 2] = "PreprocessVisualTree";
    /// <summary>
    /// Vertical layout in progress.
    /// </summary>
    Operation[Operation["VerticalLayout"] = 3] = "VerticalLayout";
    /// <summary>
    /// Horizontal layout in progress.
    /// </summary>
    Operation[Operation["HorizontalLayout"] = 4] = "HorizontalLayout";
    /// <summary>
    /// Creating and positioning connectors.
    /// </summary>
    Operation[Operation["ConnectorsLayout"] = 5] = "ConnectorsLayout";
    /// <summary>
    /// All layout operations have been completed.
    /// </summary>
    Operation[Operation["Completed"] = 6] = "Completed";
})(Operation || (Operation = {}));
exports.default = Operation;


/***/ }),

/***/ "./dist/core/Point.js":
/*!****************************!*\
  !*** ./dist/core/Point.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    Point.prototype.MoveH = function (offsetX) {
        return new Point(this.X + offsetX, this.Y);
    };
    return Point;
}());
exports.default = Point;


/***/ }),

/***/ "./dist/core/Rect.js":
/*!***************************!*\
  !*** ./dist/core/Rect.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Rect = /** @class */ (function () {
    function Rect(x, y, w, h) {
        if (w < 0) {
            throw new Error("Width out of range");
        }
        if (h < 0) {
            throw new Error("Height out of range");
        }
        this.TopLeft = new Point_1.default(x, y);
        this.Size = new Size_1.default(w, h);
    }
    Object.defineProperty(Rect.prototype, "BottomRight", {
        get: function () {
            return new Point_1.default(this.TopLeft.X + this.Size.Width, this.TopLeft.Y + this.Size.Height);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "Left", {
        get: function () {
            return this.TopLeft.X;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "Right", {
        get: function () {
            return this.TopLeft.X + this.Size.Width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "CenterH", {
        get: function () {
            return this.TopLeft.X + this.Size.Width / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "CenterV", {
        get: function () {
            return this.TopLeft.Y + this.Size.Height / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "Top", {
        get: function () {
            return this.TopLeft.Y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "Bottom", {
        get: function () {
            return this.TopLeft.Y + this.Size.Height;
        },
        enumerable: true,
        configurable: true
    });
    Rect.from = function (size, topLeft) {
        if (topLeft === void 0) { topLeft = new Point_1.default(0, 0); }
        return new Rect(topLeft.X, topLeft.Y, size.Width, size.Height);
    };
    Rect.add = function (x, y) {
        var left = Math.min(x.Left, y.Left);
        var top = Math.min(x.Top, y.Top);
        var right = Math.max(x.Right, y.Right);
        var bottom = Math.max(x.Bottom, y.Bottom);
        return new Rect(left, top, right - left, bottom - top);
    };
    Rect.prototype.MoveH = function (offsetX) {
        return Rect.from(this.Size, new Point_1.default(this.Left + offsetX, this.Top));
    };
    return Rect;
}());
exports.default = Rect;


/***/ }),

/***/ "./dist/core/SingleColumnLayoutStrategy.js":
/*!*************************************************!*\
  !*** ./dist/core/SingleColumnLayoutStrategy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutStrategyBase_1 = __importDefault(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var Box_1 = __importDefault(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var BranchParentAlignment_1 = __importDefault(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var Edge_1 = __importDefault(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Point_1 = __importDefault(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Connector_1 = __importDefault(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var SingleColumnLayoutStrategy = /** @class */ (function (_super) {
    __extends(SingleColumnLayoutStrategy, _super);
    function SingleColumnLayoutStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return true; };
        return _this;
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// </summary>
    SingleColumnLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        if (this.ParentAlignment != BranchParentAlignment_1.default.Left &&
            this.ParentAlignment != BranchParentAlignment_1.default.Right) {
            throw new Error("InvalidOperationException: Unsupported value for ParentAlignment");
        }
        node.State.NumberOfSiblings = node.Element.IsCollapsed
            ? 0
            : node.ChildCount;
        // only add spacers for non-collapsed boxes
        if (node.State.NumberOfSiblings > 0 && node.Level > 0) {
            // add one (for vertical spacer) into the count of layout columns
            node.State.NumberOfSiblingColumns = 1;
            node.State.NumberOfSiblingRows = node.ChildCount;
            // add parent's vertical carrier to the end
            var verticalSpacer = Box_1.default.Special(Box_1.default.None, node.Element.Id, false);
            node.AddRegularChildBox(verticalSpacer);
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    SingleColumnLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.AssistantsRoot != null) {
            // assistants root has to be initialized with main node's exterior
            LayoutAlgorithm_1.default.CopyExteriorFrom(node.AssistantsRoot.State, node.State);
            LayoutAlgorithm_1.default.VerticalLayout(state, node.AssistantsRoot);
        }
        var prevRowExterior = new Dimensions_1.default(node.State.SiblingsRowV.From, node.AssistantsRoot == null
            ? node.State.SiblingsRowV.To
            : node.State.BranchExterior.Bottom);
        for (var row = 0; row < node.State.NumberOfSiblings; row++) {
            // first, compute
            var child = node.Children[row];
            var rect = child.State;
            var top_1 = prevRowExterior.To +
                (row == 0 ? this.ParentChildSpacing : this.SiblingSpacing);
            LayoutAlgorithm_1.default.MoveTo(child.State, rect.Left, top_1);
            child.State.BranchExterior = Rect_1.default.from(child.State.Size, child.State.TopLeft);
            var rowExterior = new Dimensions_1.default(top_1, top_1 + rect.Size.Height);
            child = node.Children[row];
            child.State.SiblingsRowV = rowExterior;
            // re-enter layout algorithm for child branch
            LayoutAlgorithm_1.default.VerticalLayout(state, child);
            var childBranchBottom = child.State.BranchExterior.Bottom;
            prevRowExterior = new Dimensions_1.default(rowExterior.From, Math.max(childBranchBottom, rowExterior.To));
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    SingleColumnLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var node = level.BranchRoot;
        var nodeState = node.State;
        if (node.AssistantsRoot != null) {
            LayoutAlgorithm_1.default.HorizontalLayout(state, node.AssistantsRoot);
        }
        // first, perform horizontal layout for every node in this column
        for (var row = 0; row < nodeState.NumberOfSiblings; row++) {
            var child = node.Children[row];
            // re-enter layout algorithm for child branch
            // siblings are guaranteed not to offend each other
            LayoutAlgorithm_1.default.HorizontalLayout(state, child);
        }
        // now align the column
        var edges = LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, this.EnumerateColumn(node));
        if (node.Level > 0 && node.ChildCount > 0) {
            var rect = node.State;
            var diff = void 0;
            if (this.ParentAlignment == BranchParentAlignment_1.default.Left) {
                var desiredLeft = rect.CenterH + this.ParentConnectorShield / 2;
                diff = desiredLeft - edges.From;
            }
            else if (this.ParentAlignment == BranchParentAlignment_1.default.Right) {
                var desiredRight = rect.CenterH - this.ParentConnectorShield / 2;
                diff = desiredRight - edges.To;
            }
            else {
                throw new Error("InvalidOperationException: Invalid ParentAlignment setting");
            }
            // vertical connector from parent
            LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
            // spacer for the vertical carrier
            var verticalSpacer = node.Level > 0 ? node.Children[node.ChildCount - 1] : null;
            if (verticalSpacer != null) {
                var spacerTop = node.State.Bottom;
                var spacerBottom = node.Children[node.ChildCount - 2].State.Bottom;
                LayoutAlgorithm_1.default.AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, spacerTop, this.ParentConnectorShield, spacerBottom - spacerTop);
                state.MergeSpacer(verticalSpacer);
            }
        }
    };
    SingleColumnLayoutStrategy.prototype.EnumerateColumn = function (branchRoot) {
        var nodes = [];
        for (var i = 0; i < branchRoot.State.NumberOfSiblings; i++) {
            nodes.push(branchRoot.Children[i]);
        }
        return nodes;
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    SingleColumnLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        if (node.ChildCount == 0) {
            return;
        }
        // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
        var count = 1 + node.State.NumberOfSiblings;
        var segments = Array(count);
        var rootRect = node.State;
        var center = rootRect.CenterH;
        var verticalCarrierHeight = node.Children[node.State.NumberOfSiblings - 1].State.CenterV -
            node.State.Bottom;
        // big vertical connector, from parent to last row
        segments[0] = new Edge_1.default(new Point_1.default(center, rootRect.Bottom), new Point_1.default(center, rootRect.Bottom + verticalCarrierHeight));
        for (var ix = 0; ix < node.State.NumberOfSiblings; ix++) {
            var rect = node.Children[ix].State;
            var destination = this.ParentAlignment == BranchParentAlignment_1.default.Left
                ? rect.Left
                : rect.Right;
            segments[1 + ix] = new Edge_1.default(new Point_1.default(center, rect.CenterV), new Point_1.default(destination, rect.CenterV));
        }
        node.State.Connector = new Connector_1.default(segments);
    };
    return SingleColumnLayoutStrategy;
}(LayoutStrategyBase_1.default));
exports.default = SingleColumnLayoutStrategy;


/***/ }),

/***/ "./dist/core/Size.js":
/*!***************************!*\
  !*** ./dist/core/Size.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = /** @class */ (function () {
    function Size(w, h) {
        this.Width = w;
        this.Height = h;
    }
    return Size;
}());
exports.default = Size;


/***/ }),

/***/ "./dist/core/StackOrientation.js":
/*!***************************************!*\
  !*** ./dist/core/StackOrientation.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StackOrientation;
(function (StackOrientation) {
    /// <summary>
    /// Default value is invalid, do not use it.
    /// </summary>
    StackOrientation[StackOrientation["InvalidValue"] = 0] = "InvalidValue";
    /// <summary>
    /// Put all children in one line under parent, order left-to-right horizontally.
    /// </summary>
    StackOrientation[StackOrientation["SingleRowHorizontal"] = 1] = "SingleRowHorizontal";
    /// <summary>
    /// Put all children in one column under parent, order top-bottom vertically.
    /// </summary>
    StackOrientation[StackOrientation["SingleColumnVertical"] = 2] = "SingleColumnVertical";
})(StackOrientation || (StackOrientation = {}));
exports.default = StackOrientation;


/***/ }),

/***/ "./dist/core/StackingLayoutStrategy.js":
/*!*********************************************!*\
  !*** ./dist/core/StackingLayoutStrategy.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LayoutStrategyBase_1 = __importDefault(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var Dimensions_1 = __importDefault(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var LayoutAlgorithm_1 = __importDefault(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var BranchParentAlignment_1 = __importDefault(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var Size_1 = __importDefault(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Rect_1 = __importDefault(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var StackOrientation_1 = __importDefault(__webpack_require__(/*! ./StackOrientation */ "./dist/core/StackOrientation.js"));
var StackingLayoutStrategy = /** @class */ (function (_super) {
    __extends(StackingLayoutStrategy, _super);
    /// <summary>
    /// Ctr.
    /// </summary>
    function StackingLayoutStrategy() {
        var _this = _super.call(this) || this;
        /// <summary>
        /// <c>true</c> if this strategy supports special layout for assistant boxes.
        /// If not, assistants will be processed as part of normal children group.
        /// </summary>
        _this.GetSupportsAssistants = function () { return false; };
        _this.Orientation = StackOrientation_1.default.SingleRowHorizontal;
        _this.ParentAlignment = BranchParentAlignment_1.default.InvalidValue;
        _this.ChildConnectorHookLength = 0;
        _this.ParentConnectorShield = 0;
        _this.SiblingSpacing = 5;
        return _this;
    }
    /// <summary>
    /// A chance for layout strategy to append special auto-generated boxes into the visual tree.
    /// This strategy does not use connectors and spacers.
    /// </summary>
    StackingLayoutStrategy.prototype.PreProcessThisNode = function (state, node) {
        node.State.NumberOfSiblings = node.Element.IsCollapsed
            ? 0
            : node.ChildCount;
        if (node.State.NumberOfSiblings > 0) {
            // this strategy requires certain adjustments to be made to the box sizes
            // they will only affect corresponding Nodes, not the size on the box itself
            if (this.Orientation != StackOrientation_1.default.SingleRowHorizontal &&
                this.Orientation != StackOrientation_1.default.SingleColumnVertical) {
                throw new Error("InvalidOperationException: Unsupported value for orientation: " +
                    this.Orientation);
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    StackingLayoutStrategy.prototype.ApplyVerticalLayout = function (state, level) {
        var node = level.BranchRoot;
        if (node.Level == 0) {
            node.State.SiblingsRowV = new Dimensions_1.default(node.State.Top, node.State.Bottom);
        }
        if (node.State.NumberOfSiblings == 0) {
            return;
        }
        var siblingsRowExterior = Dimensions_1.default.MinMax();
        if (this.Orientation == StackOrientation_1.default.SingleRowHorizontal) {
            var top_1 = node.AssistantsRoot == null
                ? node.State.SiblingsRowV.To + this.ParentChildSpacing
                : node.State.BranchExterior.Bottom + this.ParentChildSpacing;
            for (var i = 0; i < node.State.NumberOfSiblings; i++) {
                var child = node.Children[i];
                var rect = child.State;
                LayoutAlgorithm_1.default.MoveTo(child.State, 0, top_1);
                child.State.BranchExterior = Rect_1.default.from(child.State.Size, child.State.TopLeft);
                siblingsRowExterior = Dimensions_1.default.add(siblingsRowExterior, new Dimensions_1.default(top_1, top_1 + rect.Size.Height));
            }
            siblingsRowExterior = new Dimensions_1.default(siblingsRowExterior.From, siblingsRowExterior.To);
            for (var i = 0; i < node.State.NumberOfSiblings; i++) {
                var child = node.Children[i];
                child.State.SiblingsRowV = siblingsRowExterior;
                // re-enter layout algorithm for child branch
                LayoutAlgorithm_1.default.VerticalLayout(state, child);
            }
        }
        else if (this.Orientation == StackOrientation_1.default.SingleColumnVertical) {
            var prevRowExterior = new Dimensions_1.default(node.State.SiblingsRowV.From, node.State.SiblingsRowV.To);
            for (var row = 0; row < node.State.NumberOfSiblings; row++) {
                // first, compute
                var child = node.Children[row];
                var rect = child.State;
                var top_2 = prevRowExterior.To +
                    (row == 0 ? this.ParentChildSpacing : this.SiblingSpacing);
                LayoutAlgorithm_1.default.MoveTo(child.State, rect.Left, top_2);
                child.State.BranchExterior = Rect_1.default.from(child.State.Size, child.State.TopLeft);
                var rowExterior = new Dimensions_1.default(top_2, top_2 + rect.Size.Height);
                child = node.Children[row];
                child.State.SiblingsRowV = rowExterior;
                // re-enter layout algorithm for child branch
                LayoutAlgorithm_1.default.VerticalLayout(state, child);
                var childBranchBottom = child.State.BranchExterior.Bottom;
                prevRowExterior = new Dimensions_1.default(rowExterior.From, Math.max(childBranchBottom, rowExterior.To));
            }
        }
    };
    /// <summary>
    /// Applies layout changes to a given box and its children.
    /// </summary>
    StackingLayoutStrategy.prototype.ApplyHorizontalLayout = function (state, level) {
        var e_1, _a;
        var node = level.BranchRoot;
        try {
            for (var _b = __values(node.Children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                // re-enter layout algorithm for child branch
                LayoutAlgorithm_1.default.HorizontalLayout(state, child);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (node.ChildCount > 0) {
            if (this.Orientation == StackOrientation_1.default.SingleRowHorizontal) {
                // now auto-extend or contract the parent box
                var width = node.Children[node.State.NumberOfSiblings - 1].State.Right -
                    node.Children[0].State.Left;
                node.State.Size = new Size_1.default(Math.max(node.State.Size.Width, width), node.State.Size.Height);
                // now position children under the parent
                var center = (node.Children[0].State.Left +
                    node.Children[node.ChildCount - 1].State.Right) /
                    2;
                var desiredCenter = node.State.CenterH;
                var diff = desiredCenter - center;
                LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
            }
            else if (this.Orientation == StackOrientation_1.default.SingleColumnVertical) {
                LayoutAlgorithm_1.default.AlignHorizontalCenters(state, level, node.Children);
                // now position children under the parent
                var center = node.Children[0].State.CenterH;
                var desiredCenter = node.State.CenterH;
                var diff = desiredCenter - center;
                LayoutAlgorithm_1.default.MoveChildrenOnly(state, level, diff);
            }
        }
    };
    /// <summary>
    /// Allocates and routes connectors.
    /// </summary>
    StackingLayoutStrategy.prototype.RouteConnectors = function (state, node) {
        // this strategy does not use connectors
    };
    return StackingLayoutStrategy;
}(LayoutStrategyBase_1.default));
exports.default = StackingLayoutStrategy;


/***/ }),

/***/ "./dist/core/Step.js":
/*!***************************!*\
  !*** ./dist/core/Step.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Step = /** @class */ (function () {
    function Step(node, x, top, bottom) {
        this.Node = node;
        this.X = x;
        this.Top = top;
        this.Bottom = bottom;
    }
    Step.prototype.ChangeTop = function (newTop) {
        return new Step(this.Node, this.X, newTop, this.Bottom);
    };
    Step.prototype.ChangeBottom = function (newBottom) {
        return new Step(this.Node, this.X, this.Top, newBottom);
    };
    Step.prototype.ChangeOwner = function (newNode, newX) {
        return new Step(newNode, newX, this.Top, this.Bottom);
    };
    Step.prototype.ChangeX = function (newX) {
        return new Step(this.Node, newX, this.Top, this.Bottom);
    };
    return Step;
}());
exports.default = Step;


/***/ }),

/***/ "./dist/core/Utils.js":
/*!****************************!*\
  !*** ./dist/core/Utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var peek = function (array) {
    return array[array.length - 1];
};
exports.peek = peek;


/***/ }),

/***/ "./dist/core/index.js":
/*!****************************!*\
  !*** ./dist/core/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./Boundary */ "./dist/core/Boundary.js"));
var Boundary_1 = __webpack_require__(/*! ./Boundary */ "./dist/core/Boundary.js");
exports.Boundary = Boundary_1.default;
__export(__webpack_require__(/*! ./BoundaryChangedEventArgs */ "./dist/core/BoundaryChangedEventArgs.js"));
var BoundaryChangedEventArgs_1 = __webpack_require__(/*! ./BoundaryChangedEventArgs */ "./dist/core/BoundaryChangedEventArgs.js");
exports.BoundaryChangedEventArgs = BoundaryChangedEventArgs_1.default;
__export(__webpack_require__(/*! ./Box */ "./dist/core/Box.js"));
var Box_1 = __webpack_require__(/*! ./Box */ "./dist/core/Box.js");
exports.Box = Box_1.default;
__export(__webpack_require__(/*! ./BoxContainer */ "./dist/core/BoxContainer.js"));
var BoxContainer_1 = __webpack_require__(/*! ./BoxContainer */ "./dist/core/BoxContainer.js");
exports.BoxContainer = BoxContainer_1.default;
__export(__webpack_require__(/*! ./BoxTree */ "./dist/core/BoxTree.js"));
var BoxTree_1 = __webpack_require__(/*! ./BoxTree */ "./dist/core/BoxTree.js");
exports.BoxTree = BoxTree_1.default;
__export(__webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js"));
var BranchParentAlignment_1 = __webpack_require__(/*! ./BranchParentAlignment */ "./dist/core/BranchParentAlignment.js");
exports.BranchParentAlignment = BranchParentAlignment_1.default;
__export(__webpack_require__(/*! ./Connector */ "./dist/core/Connector.js"));
var Connector_1 = __webpack_require__(/*! ./Connector */ "./dist/core/Connector.js");
exports.Connector = Connector_1.default;
__export(__webpack_require__(/*! ./Diagram */ "./dist/core/Diagram.js"));
var Diagram_1 = __webpack_require__(/*! ./Diagram */ "./dist/core/Diagram.js");
exports.Diagram = Diagram_1.default;
__export(__webpack_require__(/*! ./DiagramLayoutSettings */ "./dist/core/DiagramLayoutSettings.js"));
var DiagramLayoutSettings_1 = __webpack_require__(/*! ./DiagramLayoutSettings */ "./dist/core/DiagramLayoutSettings.js");
exports.DiagramLayoutSettings = DiagramLayoutSettings_1.default;
__export(__webpack_require__(/*! ./DiagramLayoutTemplates */ "./dist/core/DiagramLayoutTemplates.js"));
var DiagramLayoutTemplates_1 = __webpack_require__(/*! ./DiagramLayoutTemplates */ "./dist/core/DiagramLayoutTemplates.js");
exports.DiagramLayoutTemplates = DiagramLayoutTemplates_1.default;
__export(__webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js"));
var Dimensions_1 = __webpack_require__(/*! ./Dimensions */ "./dist/core/Dimensions.js");
exports.Dimensions = Dimensions_1.default;
__export(__webpack_require__(/*! ./Edge */ "./dist/core/Edge.js"));
var Edge_1 = __webpack_require__(/*! ./Edge */ "./dist/core/Edge.js");
exports.Edge = Edge_1.default;
__export(__webpack_require__(/*! ./FishboneAssistantsLayoutStrategy */ "./dist/core/FishboneAssistantsLayoutStrategy.js"));
var FishboneAssistantsLayoutStrategy_1 = __webpack_require__(/*! ./FishboneAssistantsLayoutStrategy */ "./dist/core/FishboneAssistantsLayoutStrategy.js");
exports.FishboneAssistantsLayoutStrategy = FishboneAssistantsLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js"));
var LayoutAlgorithm_1 = __webpack_require__(/*! ./LayoutAlgorithm */ "./dist/core/LayoutAlgorithm.js");
exports.LayoutAlgorithm = LayoutAlgorithm_1.default;
__export(__webpack_require__(/*! ./LayoutLevel */ "./dist/core/LayoutLevel.js"));
var LayoutLevel_1 = __webpack_require__(/*! ./LayoutLevel */ "./dist/core/LayoutLevel.js");
exports.LayoutLevel = LayoutLevel_1.default;
__export(__webpack_require__(/*! ./LayoutState */ "./dist/core/LayoutState.js"));
var LayoutState_1 = __webpack_require__(/*! ./LayoutState */ "./dist/core/LayoutState.js");
exports.LayoutState = LayoutState_1.default;
__export(__webpack_require__(/*! ./LayoutStateOperationChangedEventArgs */ "./dist/core/LayoutStateOperationChangedEventArgs.js"));
var LayoutStateOperationChangedEventArgs_1 = __webpack_require__(/*! ./LayoutStateOperationChangedEventArgs */ "./dist/core/LayoutStateOperationChangedEventArgs.js");
exports.LayoutStateOperationChangedEventArgs = LayoutStateOperationChangedEventArgs_1.default;
__export(__webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js"));
var LayoutStrategyBase_1 = __webpack_require__(/*! ./LayoutStrategyBase */ "./dist/core/LayoutStrategyBase.js");
exports.LayoutStrategyBase = LayoutStrategyBase_1.default;
__export(__webpack_require__(/*! ./LinearLayoutStrategy */ "./dist/core/LinearLayoutStrategy.js"));
var LinearLayoutStrategy_1 = __webpack_require__(/*! ./LinearLayoutStrategy */ "./dist/core/LinearLayoutStrategy.js");
exports.LinearLayoutStrategy = LinearLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./MultiLineFishboneLayoutStrategy */ "./dist/core/MultiLineFishboneLayoutStrategy.js"));
var MultiLineFishboneLayoutStrategy_1 = __webpack_require__(/*! ./MultiLineFishboneLayoutStrategy */ "./dist/core/MultiLineFishboneLayoutStrategy.js");
exports.MultiLineFishboneLayoutStrategy = MultiLineFishboneLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./MultiLineHangerLayoutStrategy */ "./dist/core/MultiLineHangerLayoutStrategy.js"));
var MultiLineHangerLayoutStrategy_1 = __webpack_require__(/*! ./MultiLineHangerLayoutStrategy */ "./dist/core/MultiLineHangerLayoutStrategy.js");
exports.MultiLineHangerLayoutStrategy = MultiLineHangerLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./Node */ "./dist/core/Node.js"));
var Node_1 = __webpack_require__(/*! ./Node */ "./dist/core/Node.js");
exports.Node = Node_1.default;
__export(__webpack_require__(/*! ./NodeLayoutInfo */ "./dist/core/NodeLayoutInfo.js"));
var NodeLayoutInfo_1 = __webpack_require__(/*! ./NodeLayoutInfo */ "./dist/core/NodeLayoutInfo.js");
exports.NodeLayoutInfo = NodeLayoutInfo_1.default;
__export(__webpack_require__(/*! ./Operation */ "./dist/core/Operation.js"));
var Operation_1 = __webpack_require__(/*! ./Operation */ "./dist/core/Operation.js");
exports.Operation = Operation_1.default;
__export(__webpack_require__(/*! ./Point */ "./dist/core/Point.js"));
var Point_1 = __webpack_require__(/*! ./Point */ "./dist/core/Point.js");
exports.Point = Point_1.default;
__export(__webpack_require__(/*! ./Rect */ "./dist/core/Rect.js"));
var Rect_1 = __webpack_require__(/*! ./Rect */ "./dist/core/Rect.js");
exports.Rect = Rect_1.default;
__export(__webpack_require__(/*! ./SingleColumnLayoutStrategy */ "./dist/core/SingleColumnLayoutStrategy.js"));
var SingleColumnLayoutStrategy_1 = __webpack_require__(/*! ./SingleColumnLayoutStrategy */ "./dist/core/SingleColumnLayoutStrategy.js");
exports.SingleColumnLayoutStrategy = SingleColumnLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./Size */ "./dist/core/Size.js"));
var Size_1 = __webpack_require__(/*! ./Size */ "./dist/core/Size.js");
exports.Size = Size_1.default;
__export(__webpack_require__(/*! ./StackOrientation */ "./dist/core/StackOrientation.js"));
var StackOrientation_1 = __webpack_require__(/*! ./StackOrientation */ "./dist/core/StackOrientation.js");
exports.StackOrientation = StackOrientation_1.default;
__export(__webpack_require__(/*! ./StackingLayoutStrategy */ "./dist/core/StackingLayoutStrategy.js"));
var StackingLayoutStrategy_1 = __webpack_require__(/*! ./StackingLayoutStrategy */ "./dist/core/StackingLayoutStrategy.js");
exports.StackingLayoutStrategy = StackingLayoutStrategy_1.default;
__export(__webpack_require__(/*! ./Step */ "./dist/core/Step.js"));
var Step_1 = __webpack_require__(/*! ./Step */ "./dist/core/Step.js");
exports.Step = Step_1.default;
__export(__webpack_require__(/*! ./Utils */ "./dist/core/Utils.js"));
// export {default as Utils} from "./Utils"


/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var OrgChart_1 = __importDefault(__webpack_require__(/*! ./OrgChart */ "./dist/OrgChart.js"));
__export(__webpack_require__(/*! ./OrgChart */ "./dist/OrgChart.js"));
exports.default = OrgChart_1.default;
__export(__webpack_require__(/*! ./Animated */ "./dist/Animated.js"));
var Animated_1 = __webpack_require__(/*! ./Animated */ "./dist/Animated.js");
exports.Animated = Animated_1.default;
__export(__webpack_require__(/*! ./core */ "./dist/core/index.js"));


/***/ }),

/***/ "./lib/Animated.tsx":
/*!**************************!*\
  !*** ./lib/Animated.tsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Animated; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __assign = Object.assign;

class Animated extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super(...arguments);
    this.state = {
      transition: this.props.entranceTransition || "opacity 800ms",
      opacity: 0,
      firstVisible: false
    };
  }
  static getDerivedStateFromProps({
    context,
    defaultTransition = "transform 800ms, opacity 800ms",
    entranceTransition = "opacity 800ms"
  }, state) {
    if (context.hidden) {
      return {opacity: 0};
    } else if (!state.firstVisible) {
      return {opacity: 1, transition: entranceTransition, firstVisible: true};
    } else {
      return {opacity: 1, transition: defaultTransition};
    }
  }
  render() {
    const {node, context, props, getStyle} = this.props;
    const {opacity, transition} = this.state;
    const style = getStyle ? getStyle(node, props, context) : null;
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", __assign(__assign({}, props), {
      style: __assign(__assign(__assign({}, props.style), {
        opacity,
        transition
      }), style)
    }));
  }
}


/***/ }),

/***/ "./lib/OrgChart.tsx":
/*!**************************!*\
  !*** ./lib/OrgChart.tsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrgChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ "./lib/core/index.ts");
var __assign = Object.assign;


const NOOP_SIZE = new _core__WEBPACK_IMPORTED_MODULE_1__["Size"](5, 5);
class OrgChartDiagram extends _core__WEBPACK_IMPORTED_MODULE_1__["Diagram"] {
  constructor(dataSource) {
    super();
    this.DataSource = dataSource;
  }
}
class OrgChart extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor() {
    super(...arguments);
    this.state = {
      lines: Array(),
      width: 0,
      height: 0,
      diagram: null,
      nodes: [],
      hidden: true,
      boundaries: [],
      prevProps: null,
      renderIndex: 0
    };
    this._mounted = true;
    this._container = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.onComputeBranchOptimizer = (node) => {
      const {layout = "linear"} = this.props;
      if (node.IsAssistantRoot) {
        const {assistantLayout = "assistants"} = this.props;
        if (assistantLayout instanceof _core__WEBPACK_IMPORTED_MODULE_1__["LayoutStrategyBase"]) {
          return "assistantCustom";
        } else {
          return assistantLayout;
        }
      } else if (layout === "smart") {
        return OrgChart.getBranchOptimizerSmart(node);
      } else if (layout === "stackers") {
        return OrgChart.getBranchOptimizerStackers(node);
      } else if (layout instanceof _core__WEBPACK_IMPORTED_MODULE_1__["LayoutStrategyBase"]) {
        return "custom";
      } else {
        return layout;
      }
    };
    this._lastRenderIndex = 0;
  }
  static assignStrategies(diagram) {
    const strategies = [];
    let strategy;
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["LinearLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    diagram.LayoutSettings.LayoutStrategies.set("linear", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["MultiLineHangerLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    strategy.MaxSiblingsPerRow = 2;
    diagram.LayoutSettings.LayoutStrategies.set("hanger2", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["MultiLineHangerLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    strategy.MaxSiblingsPerRow = 4;
    diagram.LayoutSettings.LayoutStrategies.set("hanger4", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["SingleColumnLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Right;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnRight", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["SingleColumnLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Left;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnLeft", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["MultiLineFishboneLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    strategy.MaxGroups = 1;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone1", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["MultiLineFishboneLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    strategy.MaxGroups = 2;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone2", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["StackingLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].InvalidValue;
    strategy.Orientation = _core__WEBPACK_IMPORTED_MODULE_1__["StackOrientation"].SingleRowHorizontal;
    strategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("hstack", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["StackingLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].InvalidValue;
    strategy.Orientation = _core__WEBPACK_IMPORTED_MODULE_1__["StackOrientation"].SingleColumnVertical;
    strategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("vstack", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["StackingLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].InvalidValue;
    strategy.Orientation = _core__WEBPACK_IMPORTED_MODULE_1__["StackOrientation"].SingleColumnVertical;
    strategy.SiblingSpacing = 20;
    diagram.LayoutSettings.LayoutStrategies.set("vstackMiddle", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["StackingLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].InvalidValue;
    strategy.Orientation = _core__WEBPACK_IMPORTED_MODULE_1__["StackOrientation"].SingleColumnVertical;
    strategy.SiblingSpacing = 50;
    diagram.LayoutSettings.LayoutStrategies.set("vstackTop", strategy);
    strategies.push(strategy);
    strategy = new _core__WEBPACK_IMPORTED_MODULE_1__["FishboneAssistantsLayoutStrategy"]();
    strategy.ParentAlignment = _core__WEBPACK_IMPORTED_MODULE_1__["BranchParentAlignment"].Center;
    diagram.LayoutSettings.LayoutStrategies.set("assistants", strategy);
    strategies.push(strategy);
    diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
    diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
    return strategies;
  }
  static getDataSource(props) {
    const {root, childNodesGetter, keyGetter, isAssistantGetter} = props;
    const items = new Map();
    const sortedKeys = [];
    const processNode = (node, parentKey = null) => {
      const key = keyGetter(node);
      if (true) {
        if (!key) {
          throw Error("Invalid key");
        }
        if (items.has(key)) {
          throw Error("Duplicate key");
        }
      }
      sortedKeys.push(key);
      const emphasized = isAssistantGetter ? isAssistantGetter(node) : false;
      items.set(key, {
        IsAssistant: emphasized,
        Id: key,
        data: node,
        parentKey
      });
      for (const childNode of childNodesGetter(node)) {
        processNode(childNode, key);
      }
    };
    processNode(root, null);
    const getDataItem = (id) => {
      const item = items.get(id);
      if (item == null) {
        throw Error("Could not find item");
      }
      return item;
    };
    return {
      GetDataItemFunc: (id) => getDataItem(id),
      GetParentKeyFunc: (id) => {
        var _a;
        return ((_a = items.get(id)) == null ? void 0 : _a.parentKey) || null;
      },
      AllDataItemIds: sortedKeys
    };
  }
  static getBranchOptimizerStackers(node) {
    if (node.IsAssistantRoot) {
      return null;
    }
    return node.Level === 0 ? "vstackTop" : node.Level === 1 ? "vstackMiddle" : "hstack";
  }
  static getBranchOptimizerSmart(node) {
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
  componentWillUnmount() {
    this._mounted = true;
  }
  static getDerivedStateFromProps(props, state) {
    if (props !== state.prevProps) {
      const diagram = OrgChart.createDiagram(props);
      const placeholders = OrgChart.getPlaceholders(diagram, state.nodes);
      return __assign(__assign({
        diagram
      }, placeholders), {
        prevProps: props,
        renderIndex: state.renderIndex + 1
      });
    }
    return {prevProps: props};
  }
  componentWillMount() {
    const nextState = OrgChart.getDerivedStateFromProps(this.props, this.state);
    this.setState(nextState);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const nextState = OrgChart.getDerivedStateFromProps(nextProps, this.state);
      this.setState(nextState);
    }
  }
  static createDiagram(props) {
    const {
      layout,
      assistantLayout,
      parentSpacing = 40,
      siblingSpacing = 30
    } = props;
    const dataSource = OrgChart.getDataSource(props);
    const boxContainer = new _core__WEBPACK_IMPORTED_MODULE_1__["BoxContainer"](dataSource);
    const diagram = new OrgChartDiagram(dataSource);
    diagram.Boxes = boxContainer;
    const strategies = OrgChart.assignStrategies(diagram);
    if (layout instanceof _core__WEBPACK_IMPORTED_MODULE_1__["LayoutStrategyBase"]) {
      diagram.LayoutSettings.LayoutStrategies.set("custom", layout);
    }
    if (assistantLayout instanceof _core__WEBPACK_IMPORTED_MODULE_1__["LayoutStrategyBase"]) {
      diagram.LayoutSettings.LayoutStrategies.set("assistantCustom", assistantLayout);
    }
    for (const strategy of strategies) {
      strategy.ChildConnectorHookLength = parentSpacing / 2;
      strategy.ParentChildSpacing = parentSpacing;
      strategy.SiblingSpacing = siblingSpacing;
    }
    return diagram;
  }
  static getPlaceholders(diagram, prevNodes) {
    const dataSource = diagram.DataSource;
    const nodes = [];
    const prevNodesByDataId = new Map();
    for (const node of prevNodes) {
      prevNodesByDataId.set(node.dataId, node);
    }
    const DEFAULT_RECT = {
      left: 0,
      top: 0,
      width: "",
      height: ""
    };
    for (const box of diagram.Boxes.BoxesById.values()) {
      if (!box.IsDataBound) {
        continue;
      }
      const id = box.Id;
      const dataId = box.DataId || "";
      const data = dataSource.GetDataItemFunc(dataId).data;
      const prevNode = prevNodesByDataId.get(dataId);
      const nextRect = (prevNode == null ? void 0 : prevNode.rect) || DEFAULT_RECT;
      nodes.push({
        rect: {
          left: nextRect.left,
          top: nextRect.top,
          width: "auto",
          height: "auto"
        },
        data,
        dataId: box.DataId || String(id),
        boxId: id,
        assistant: box.IsAssistant
      });
    }
    nodes.sort((a, b) => a.boxId - b.boxId);
    return {hidden: true, nodes};
  }
  safelyDrawDiagram() {
    if (this.props !== this.state.prevProps) {
      return;
    }
    if (!this._mounted) {
      return;
    }
    const {diagram, renderIndex} = this.state;
    const {debug} = this.props;
    if (renderIndex > this._lastRenderIndex) {
      this._lastRenderIndex = renderIndex;
      if (diagram) {
        this.drawDiagram(diagram, debug);
      }
    }
  }
  componentDidMount() {
    this.safelyDrawDiagram();
  }
  componentDidUpdate() {
    this.safelyDrawDiagram();
  }
  drawDiagram(diagram, debug) {
    if (diagram !== this.state.diagram) {
      return;
    }
    if (diagram.DataSource.AllDataItemIds.length === 0) {
      return;
    }
    const state = new _core__WEBPACK_IMPORTED_MODULE_1__["LayoutState"](diagram);
    const nodeMap = new Map();
    const container = this._container.current;
    if (container) {
      container.querySelectorAll("[data-box-id]").forEach((node) => {
        const id = node.getAttribute("data-box-id");
        if (id) {
          nodeMap.set(parseInt(id), node);
        }
      });
    }
    state.LayoutOptimizerFunc = this.onComputeBranchOptimizer;
    state.BoxSizeFunc = (dataId) => {
      if (dataId == null) {
        return NOOP_SIZE;
      }
      const box = diagram.Boxes.BoxesByDataId.get(dataId);
      if (box) {
        const element = nodeMap.get(box.Id);
        if (element) {
          void element.offsetWidth;
          void element.offsetHeight;
          const rect = element.getBoundingClientRect();
          return new _core__WEBPACK_IMPORTED_MODULE_1__["Size"](rect.width, rect.height);
        }
      }
      return NOOP_SIZE;
    };
    _core__WEBPACK_IMPORTED_MODULE_1__["LayoutAlgorithm"].Apply(state);
    if (diagram.VisualTree == null) {
      throw Error("VisualTree is null");
    }
    const diagramBoundary = _core__WEBPACK_IMPORTED_MODULE_1__["LayoutAlgorithm"].ComputeBranchVisualBoundingRect(diagram.VisualTree);
    const offsetX = -diagramBoundary.Left;
    const offsetY = -diagramBoundary.Top;
    const nodes = [];
    const lines = [];
    const boundaries = [];
    diagram.VisualTree.IterateParentFirst((node) => {
      if (node.State.IsHidden) {
        return false;
      }
      const box = node.Element;
      if (!box.IsDataBound) {
        return true;
      }
      const x = node.State.TopLeft.X + offsetX;
      const y = node.State.TopLeft.Y + offsetY;
      const dataId = box.DataId || "";
      const {data} = diagram.DataSource.GetDataItemFunc(dataId);
      nodes.push({
        rect: {
          left: x,
          top: y,
          width: box.Size.Width,
          height: box.Size.Height
        },
        data,
        dataId: dataId || String(box.Id),
        boxId: box.Id,
        assistant: box.IsAssistant
      });
      if (debug) {
        boundaries.push({
          branchLeft: node.State.BranchExterior.Left,
          branchTop: node.State.BranchExterior.Top,
          left: node.State.BranchExterior.Left + offsetX,
          top: node.State.BranchExterior.Top + offsetY,
          width: node.State.BranchExterior.Size.Width,
          height: node.State.BranchExterior.Size.Height
        });
      }
      if (node.State.Connector != null) {
        const segments = node.State.Connector.Segments;
        for (let ix = 0; ix < segments.length; ix++) {
          const edge = segments[ix];
          let direction = "horizontal";
          let assistant = box.IsAssistant;
          let topLeft;
          let width = 0;
          let height = 0;
          if (edge.From.Y === edge.To.Y) {
            direction = "horizontal";
            height = 1;
            if (edge.From.X < edge.To.X) {
              topLeft = edge.From;
              width = edge.To.X - edge.From.X;
            } else {
              topLeft = edge.To;
              width = edge.From.X - edge.To.X;
            }
          } else {
            direction = "vertical";
            if (edge.From.Y < edge.To.Y) {
              topLeft = edge.From;
              height = edge.To.Y - edge.From.Y;
            } else {
              topLeft = edge.To;
              height = edge.From.Y - edge.To.Y;
            }
          }
          lines.push({
            direction,
            assistant,
            data,
            dataId,
            boxId: box.Id,
            index: ix,
            rect: {
              left: topLeft.X + offsetX,
              top: topLeft.Y + offsetY,
              width,
              height
            }
          });
        }
      }
      return true;
    });
    this.setState({
      width: diagramBoundary.Size.Width,
      height: diagramBoundary.Size.Height,
      lines,
      nodes,
      boundaries,
      hidden: false
    });
  }
  render() {
    const {
      lines,
      width: containerWidth,
      height: containerHeight,
      nodes,
      hidden,
      boundaries
    } = this.state;
    const {
      lineVerticalClassName,
      lineHorizontalClassName,
      lineHorizontalStyle,
      lineVerticalStyle,
      containerStyle,
      renderNode,
      renderNodeContainer,
      renderNodeLine,
      nodeContainerStyle,
      isValidNode
    } = this.props;
    const lineClassNames = {
      vertical: lineVerticalClassName,
      horizontal: lineHorizontalClassName
    };
    const lineStyles = {
      vertical: lineVerticalStyle,
      horizontal: lineHorizontalStyle
    };
    return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: __assign({
        width: containerWidth,
        height: containerHeight,
        position: "relative"
      }, containerStyle),
      ref: this._container
    }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, lines.map(({
      rect: {width, height, left, top},
      data,
      assistant,
      direction,
      dataId,
      index
    }) => {
      const isValid = isValidNode(dataId);
      if (!isValid) {
        return null;
      }
      const props = {
        "data-line-assistant": assistant,
        "data-line-direction": direction,
        className: lineClassNames[direction],
        key: dataId + "-" + index,
        style: __assign({
          left: 0,
          top: 0,
          width,
          height,
          transform: `translate3d(${left}px, ${top}px, 0)`,
          position: "absolute"
        }, lineStyles[direction])
      };
      if (typeof renderNodeLine === "function") {
        return renderNodeLine(data, props, {hidden, direction});
      }
      props.style.visibility = hidden ? "hidden" : "visible";
      props.style.pointerEvents = hidden ? "none" : "auto";
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", __assign({}, props));
    })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, nodes.map((context) => {
      const {
        rect: {top, left, width, height},
        dataId,
        boxId: dataBoxId,
        data
      } = context;
      const isValid = isValidNode(dataId);
      if (!isValid) {
        return null;
      }
      const children = renderNode(data);
      const props = {
        "data-box-id": String(dataBoxId),
        children,
        key: dataId,
        style: __assign({
          left: 0,
          top: 0,
          transform: `translate3d(${left}px, ${top}px, 0)`,
          position: "absolute"
        }, nodeContainerStyle)
      };
      if (typeof renderNodeContainer === "function") {
        return renderNodeContainer(data, props, {hidden});
      }
      props.style.visibility = hidden ? "hidden" : "visible";
      props.style.pointerEvents = hidden ? "none" : "auto";
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", __assign({}, props));
    })), /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, boundaries.map(({top, left, width, height, branchLeft, branchTop}, i) => {
      return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: i,
        style: {
          transform: `translate3d(${left}px, ${top}px, 0)`,
          width,
          height,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
          visibility: hidden ? "hidden" : "visible",
          background: "rgba(255,0,0,0.1)",
          border: "1px solid red"
        }
      }, /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          backgroundColor: "red",
          color: "white",
          display: "inline-block",
          padding: "0 2px"
        }
      }, "(", +branchLeft.toFixed(2), ",", +branchTop.toFixed(2), ")", " ", +width.toFixed(2), "x", +height.toFixed(2)));
    })));
  }
}


/***/ }),

/***/ "./lib/core/Boundary.ts":
/*!******************************!*\
  !*** ./lib/core/Boundary.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Boundary; });
/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Step */ "./lib/core/Step.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");





class Boundary {
  constructor(frompublic = true) {
    this._spacerMerger = null;
    this._boundingRect = null;
    this.Left = [];
    this.Right = [];
    if (frompublic) {
      this._spacerMerger = new Boundary(false);
    }
  }
  get BoundingRect() {
    if (this._boundingRect == null) {
      throw Error("BoundingRect is null");
    }
    return this._boundingRect;
  }
  set BoundingRect(value) {
    this._boundingRect = value;
  }
  PrepareForHorizontalLayout(node) {
    this.Prepare(node);
    if (node.Element.DisableCollisionDetection) {
      return;
    }
    let rect = node.State;
    this.Left.push(new _Step__WEBPACK_IMPORTED_MODULE_0__["default"](node, rect.Left, rect.Top, rect.Bottom));
    this.Right.push(new _Step__WEBPACK_IMPORTED_MODULE_0__["default"](node, rect.Right, rect.Top, rect.Bottom));
  }
  Prepare(node) {
    this.Left = [];
    this.Right = [];
    this.BoundingRect = _Rect__WEBPACK_IMPORTED_MODULE_1__["default"].from(node.State.Size, node.State.TopLeft);
  }
  VerticalMergeFrom(other) {
    this.BoundingRect = _Rect__WEBPACK_IMPORTED_MODULE_1__["default"].add(this.BoundingRect, other.BoundingRect);
  }
  MergeFrom(other) {
    if (other.BoundingRect.Top >= other.BoundingRect.Bottom) {
      throw new Error("Cannot merge boundary of height " + (other.BoundingRect.Bottom - other.BoundingRect.Top));
    }
    let merge = "r";
    while (merge != "\0") {
      let mySteps = merge == "r" ? this.Right : this.Left;
      let theirSteps = merge == "r" ? other.Right : other.Left;
      let i = 0;
      let k = 0;
      for (; k < theirSteps.length && i < mySteps.length; ) {
        let my = mySteps[i];
        let th = theirSteps[k];
        if (my.Bottom <= th.Top) {
          i++;
          continue;
        }
        if (th.Bottom <= my.Top) {
          mySteps.splice(i, 0, th);
          k++;
          this.ValidateState();
          continue;
        }
        let theirWins = merge == "r" ? my.X <= th.X : my.X >= th.X;
        if (_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_4__["default"].IsEqual(my.Top, th.Top)) {
          if (_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_4__["default"].IsEqual(my.Bottom, th.Bottom)) {
            if (theirWins) {
              mySteps[i] = th;
            }
            i++;
            k++;
            this.ValidateState();
          } else if (my.Bottom < th.Bottom) {
            if (theirWins) {
              mySteps[i] = my.ChangeOwner(th.Node, th.X);
            }
            theirSteps[k] = th.ChangeTop(my.Bottom);
            i++;
            this.ValidateState();
          } else {
            if (theirWins) {
              mySteps[i] = my.ChangeTop(th.Bottom);
              mySteps.splice(i, 0, th);
              i++;
            }
            k++;
            this.ValidateState();
          }
        } else if (_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_4__["default"].IsEqual(my.Bottom, th.Bottom)) {
          if (my.Top < th.Top) {
            if (theirWins) {
              mySteps[i] = my.ChangeBottom(th.Top);
              mySteps.splice(i + 1, 0, th);
              i++;
            }
            i++;
            k++;
            this.ValidateState();
          } else {
            if (theirWins) {
              mySteps[i] = th;
            } else {
              mySteps.splice(i, 0, th.ChangeBottom(my.Top));
              i++;
            }
            i++;
            k++;
            this.ValidateState();
          }
        } else if (my.Top < th.Top && my.Bottom < th.Bottom) {
          if (theirWins) {
            mySteps[i] = my.ChangeBottom(th.Top);
            mySteps.splice(i + 1, 0, new _Step__WEBPACK_IMPORTED_MODULE_0__["default"](th.Node, th.X, th.Top, my.Bottom));
            i++;
          }
          theirSteps[k] = th.ChangeTop(my.Bottom);
          i++;
          this.ValidateState();
        } else if (my.Top < th.Top && my.Bottom > th.Bottom) {
          if (theirWins) {
            mySteps[i] = my.ChangeBottom(th.Top);
            mySteps.splice(i + 1, 0, th);
            mySteps.splice(i + 2, 0, my.ChangeTop(th.Bottom));
            i += 2;
          }
          k++;
          this.ValidateState();
        } else if (my.Bottom > th.Bottom) {
          if (theirWins) {
            mySteps[i] = my.ChangeTop(th.Bottom);
            mySteps.splice(i, 0, th);
          } else {
            mySteps.splice(i, 0, th.ChangeBottom(my.Top));
          }
          i++;
          k++;
          this.ValidateState();
        } else {
          if (theirWins) {
            mySteps[i] = th.ChangeBottom(my.Bottom);
          } else {
            mySteps.splice(i, 0, th.ChangeBottom(my.Top));
            i++;
          }
          theirSteps[k] = th.ChangeTop(my.Bottom);
          i++;
          this.ValidateState();
        }
      }
      if (i == mySteps.length) {
        while (k < theirSteps.length) {
          mySteps.push(theirSteps[k]);
          k++;
          this.ValidateState();
        }
      }
      merge = merge == "r" ? "l" : "\0";
    }
    this.BoundingRect = _Rect__WEBPACK_IMPORTED_MODULE_1__["default"].add(this.BoundingRect, other.BoundingRect);
  }
  ValidateState() {
    for (let i = 1; i < this.Left.length; i++) {
      if (this.Left[i].Top == this.Left[i].Bottom || this.Left[i].Top < this.Left[i - 1].Bottom || this.Left[i].Top <= this.Left[i - 1].Top || this.Left[i].Bottom <= this.Left[i].Top || this.Left[i].Bottom <= this.Left[i - 1].Bottom) {
        throw new Error("State error at Left index " + i);
      }
    }
    for (let i = 1; i < this.Right.length; i++) {
      if (this.Right[i].Top == this.Right[i].Bottom || this.Right[i].Top < this.Right[i - 1].Bottom || this.Right[i].Top <= this.Right[i - 1].Top || this.Right[i].Bottom <= this.Right[i].Top || this.Right[i].Bottom <= this.Right[i - 1].Bottom) {
        throw new Error("State error at Right index " + i);
      }
    }
  }
  MergeFromNode(node) {
    if (node.Element.DisableCollisionDetection) {
      return;
    }
    if (!node.State.Size || _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_4__["default"].IsZero(node.State.Size.Height)) {
      return;
    }
    if (this._spacerMerger == null) {
      throw Error("SpaceMerger is null");
    }
    this._spacerMerger.PrepareForHorizontalLayout(node);
    this.MergeFrom(this._spacerMerger);
  }
  ComputeOverlap(other, siblingSpacing, branchSpacing) {
    let i = 0, k = 0;
    let offense = 0;
    while (i < this.Right.length && k < other.Left.length) {
      let my = this.Right[i];
      let th = other.Left[k];
      if (my.Bottom <= th.Top) {
        i++;
      } else if (th.Bottom <= my.Top) {
        k++;
      } else {
        if (!my.Node.Element.DisableCollisionDetection && !th.Node.Element.DisableCollisionDetection) {
          const desiredSpacing = my.Node.Element.IsSpecial || th.Node.Element.IsSpecial ? 0 : my.Node.Element.ParentId == th.Node.Element.ParentId ? siblingSpacing : branchSpacing;
          const diff = my.X + desiredSpacing - th.X;
          if (diff > offense) {
            offense = diff;
          }
        }
        if (my.Bottom >= th.Bottom) {
          k++;
        }
        if (th.Bottom >= my.Bottom) {
          i++;
        }
      }
    }
    return offense;
  }
  ReloadFromBranch(branchRoot) {
    let leftmost = Number.MAX_VALUE;
    let rightmost = Number.MIN_VALUE;
    for (let i = 0; i < this.Left.length; i++) {
      let left = this.Left[i];
      let newLeft = left.Node.State.Left;
      this.Left[i] = left.ChangeX(newLeft);
      leftmost = Math.min(leftmost, newLeft);
    }
    for (let i = 0; i < this.Right.length; i++) {
      let right = this.Right[i];
      let newRight = right.Node.State.Right;
      this.Right[i] = right.ChangeX(newRight);
      rightmost = Math.max(rightmost, newRight);
    }
    leftmost = Math.min(branchRoot.State.Left, leftmost);
    rightmost = Math.max(branchRoot.State.Right, rightmost);
    this.BoundingRect = _Rect__WEBPACK_IMPORTED_MODULE_1__["default"].from(new _Size__WEBPACK_IMPORTED_MODULE_2__["default"](rightmost - leftmost, this.BoundingRect.Size.Height), new _Point__WEBPACK_IMPORTED_MODULE_3__["default"](leftmost, this.BoundingRect.Top));
  }
}


/***/ }),

/***/ "./lib/core/BoundaryChangedEventArgs.ts":
/*!**********************************************!*\
  !*** ./lib/core/BoundaryChangedEventArgs.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoundaryChangedEventArgs; });
class BoundaryChangedEventArgs {
  constructor(boundary, layoutLevel, state) {
    this.Boundary = boundary;
    this.LayoutLevel = layoutLevel;
    this.State = state;
  }
}


/***/ }),

/***/ "./lib/core/Box.ts":
/*!*************************!*\
  !*** ./lib/core/Box.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Box; });
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");

class Box {
  get IsDataBound() {
    return !!this.DataId;
  }
  static Special(id, visualParentId, disableCollisionDetection) {
    return new Box(null, id, visualParentId, true, disableCollisionDetection, false);
  }
  constructor(dataId, id, parentId, isSpecial, disableCollisionDetection, isAssistant) {
    if (id == 0) {
      throw new Error(`Invalid ${id}`);
    }
    this.Id = id;
    this.ParentId = parentId;
    this.DataId = dataId;
    this.IsSpecial = isSpecial;
    this.IsAssistant = isAssistant;
    this.DisableCollisionDetection = disableCollisionDetection;
    this.AssistantLayoutStrategyId = null;
    this.LayoutStrategyId = null;
    this.IsCollapsed = false;
    this.Size = new _Size__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
  }
}
Box.None = -1;


/***/ }),

/***/ "./lib/core/BoxContainer.ts":
/*!**********************************!*\
  !*** ./lib/core/BoxContainer.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoxContainer; });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");

class BoxContainer {
  constructor(source) {
    this._lastBoxId = 0;
    this._boxesById = new Map();
    this._boxesByDataId = new Map();
    this.SystemRoot = null;
    if (source) {
      this.ReloadBoxes(source);
    }
  }
  get BoxesById() {
    return this._boxesById;
  }
  get BoxesByDataId() {
    return this._boxesByDataId;
  }
  ReloadBoxes(source) {
    this._boxesByDataId.clear();
    this._boxesById.clear();
    this._lastBoxId = 0;
    this.SystemRoot = _Box__WEBPACK_IMPORTED_MODULE_0__["default"].Special(++this._lastBoxId, _Box__WEBPACK_IMPORTED_MODULE_0__["default"].None, true);
    this._boxesById.set(this.SystemRoot.Id, this.SystemRoot);
    const map = new Map();
    for (const dataId of source.AllDataItemIds) {
      map.set(dataId, this.NextBoxId());
    }
    const getDataItem = source.GetDataItemFunc;
    for (const dataId of source.AllDataItemIds) {
      const parentDataId = !dataId ? null : source.GetParentKeyFunc(dataId);
      const visualParentId = !parentDataId ? this.SystemRoot.Id : map.get(parentDataId);
      const nextBoxId = map.get(dataId);
      if (nextBoxId != null && visualParentId != null) {
        this._AddBox(dataId, nextBoxId, visualParentId, getDataItem(dataId).IsAssistant);
      } else {
      }
    }
  }
  AddBox(dataId, visualParentId, isAssistant) {
    return this._AddBox(dataId, this.NextBoxId(), visualParentId, isAssistant);
  }
  _AddBox(dataId, id, visualParentId, isAssistant) {
    const box = new _Box__WEBPACK_IMPORTED_MODULE_0__["default"](dataId, id, visualParentId, false, false, isAssistant);
    this._boxesById.set(box.Id, box);
    if (box.DataId) {
      this._boxesByDataId.set(box.DataId, box);
    }
    return box;
  }
  NextBoxId() {
    this._lastBoxId++;
    return this._lastBoxId;
  }
}


/***/ }),

/***/ "./lib/core/BoxTree.ts":
/*!*****************************!*\
  !*** ./lib/core/BoxTree.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BoxTree; });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Node */ "./lib/core/Node.ts");


class BoxTree {
  constructor() {
    this.Depth = 0;
    this.Root = null;
    this.Nodes = new Map();
  }
  IterateChildFirst(func) {
    if (this.Root == null) {
      throw Error("Root is null");
    }
    return this.Root.IterateChildFirst(func);
  }
  IterateParentFirst(enter, exit) {
    if (this.Root == null) {
      throw Error("Root is null");
    }
    this.Root.IterateParentFirst(enter, exit);
  }
  UpdateHierarchyStats() {
    this.Depth = 0;
    this.IterateParentFirst((x) => {
      if (x.ParentNode != null) {
        x.Level = x.ParentNode.Level;
        if (!x.ParentNode.IsAssistantRoot) {
          x.Level = x.Level + 1;
        }
        this.Depth = Math.max(1 + x.Level, this.Depth);
      } else {
        x.Level = 0;
        this.Depth = 1;
      }
      return true;
    });
  }
  static Build(state) {
    const result = new BoxTree();
    let box;
    for (box of state.Diagram.Boxes.BoxesById.values()) {
      const node = new _Node__WEBPACK_IMPORTED_MODULE_1__["default"](box);
      result.Nodes.set(box.Id, node);
    }
    for (const node of result.Nodes.values()) {
      const parentKey = node.Element.ParentId;
      const parentNode = result.Nodes.get(parentKey);
      if (parentNode) {
        if (node.Element.IsAssistant && parentNode.Element.ParentId != _Box__WEBPACK_IMPORTED_MODULE_0__["default"].None) {
          parentNode.AddAssistantChild(node);
        } else {
          parentNode.AddRegularChild(node);
        }
      } else {
        if (result.Root != null) {
          throw new Error("InvalidOperationException: More then one root found: " + node.Element.Id);
        }
        result.Root = node;
      }
    }
    return result;
  }
}


/***/ }),

/***/ "./lib/core/BranchParentAlignment.ts":
/*!*******************************************!*\
  !*** ./lib/core/BranchParentAlignment.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BranchParentAlignment;
(function(BranchParentAlignment2) {
  BranchParentAlignment2[BranchParentAlignment2["InvalidValue"] = 0] = "InvalidValue";
  BranchParentAlignment2[BranchParentAlignment2["Left"] = 1] = "Left";
  BranchParentAlignment2[BranchParentAlignment2["Center"] = 2] = "Center";
  BranchParentAlignment2[BranchParentAlignment2["Right"] = 3] = "Right";
})(BranchParentAlignment || (BranchParentAlignment = {}));
/* harmony default export */ __webpack_exports__["default"] = (BranchParentAlignment);


/***/ }),

/***/ "./lib/core/Connector.ts":
/*!*******************************!*\
  !*** ./lib/core/Connector.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Connector; });
class Connector {
  constructor(segments) {
    if (segments.length == 0) {
      throw new Error("Need at least one segment");
    }
    this.Segments = segments;
  }
}


/***/ }),

/***/ "./lib/core/Diagram.ts":
/*!*****************************!*\
  !*** ./lib/core/Diagram.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Diagram; });
/* harmony import */ var _DiagramLayoutSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DiagramLayoutSettings */ "./lib/core/DiagramLayoutSettings.ts");

class Diagram {
  constructor() {
    this._visualTree = null;
    this._boxes = null;
    this.LayoutSettings = new _DiagramLayoutSettings__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  get Boxes() {
    if (this._boxes == null) {
      throw Error("Boxes is null");
    }
    return this._boxes;
  }
  set Boxes(value) {
    this._visualTree = null;
    this._boxes = value;
  }
  get VisualTree() {
    return this._visualTree;
  }
  set VisualTree(value) {
    this._visualTree = value;
  }
}


/***/ }),

/***/ "./lib/core/DiagramLayoutSettings.ts":
/*!*******************************************!*\
  !*** ./lib/core/DiagramLayoutSettings.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiagramLayoutSettings; });
class DiagramLayoutSettings {
  constructor() {
    this.BranchSpacing = 50;
    this.DefaultAssistantLayoutStrategyId = null;
    this.DefaultLayoutStrategyId = null;
    this.BranchSpacing = 50;
    this.LayoutStrategies = new Map();
  }
  RequireDefaultLayoutStrategy() {
    const id = this.DefaultLayoutStrategyId;
    if (!id) {
      throw new Error("DefaultLayoutStrategyId is null or not valid");
    }
    const result = this.LayoutStrategies.get(id);
    if (!result) {
      throw new Error("DefaultLayoutStrategyId is null or not valid");
    }
    return result;
  }
  RequireDefaultAssistantLayoutStrategy() {
    const id = this.DefaultAssistantLayoutStrategyId;
    if (!id) {
      throw new Error("RequireDefaultAssistantLayoutStrategy is null or not valid");
    }
    const result = this.LayoutStrategies.get(id);
    if (!result) {
      throw new Error("RequireDefaultAssistantLayoutStrategy is null or not valid");
    }
    return result;
  }
}


/***/ }),

/***/ "./lib/core/DiagramLayoutTemplates.ts":
/*!********************************************!*\
  !*** ./lib/core/DiagramLayoutTemplates.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DiagramLayoutTemplates; });
class DiagramLayoutTemplates {
}


/***/ }),

/***/ "./lib/core/Dimensions.ts":
/*!********************************!*\
  !*** ./lib/core/Dimensions.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dimensions; });
class Dimensions {
  static MinMax() {
    return new Dimensions(Number.MAX_VALUE, Number.MIN_VALUE);
  }
  constructor(from, to) {
    this.From = from;
    this.To = to;
  }
  static add(x, y) {
    return new Dimensions(Math.min(x.From, y.From), Math.max(x.To, y.To));
  }
}


/***/ }),

/***/ "./lib/core/Edge.ts":
/*!**************************!*\
  !*** ./lib/core/Edge.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Edge; });
class Edge {
  constructor(from, to) {
    this.From = from;
    this.To = to;
  }
}


/***/ }),

/***/ "./lib/core/FishboneAssistantsLayoutStrategy.ts":
/*!******************************************************!*\
  !*** ./lib/core/FishboneAssistantsLayoutStrategy.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FishboneAssistantsLayoutStrategy; });
/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");








class FishboneAssistantsLayoutStrategy extends _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.GetSupportsAssistants = () => false;
    this.MaxOnLeft = (node) => Math.floor(node.State.NumberOfSiblings / 2) + node.State.NumberOfSiblings % 2;
    this.NeedCarrierProtector = (node) => {
      var _a;
      return ((_a = node.ParentNode) == null ? void 0 : _a.ChildCount) == 0;
    };
  }
  PreProcessThisNode(state, node) {
    node.State.NumberOfSiblings = node.ChildCount;
    if (node.State.NumberOfSiblings > 0) {
      node.State.NumberOfSiblingColumns = 1;
      node.State.NumberOfSiblingRows = Math.floor(node.State.NumberOfSiblings / 2);
      if (node.State.NumberOfSiblings % 2 != 0) {
        node.State.NumberOfSiblingRows++;
      }
      var spacer = _Box__WEBPACK_IMPORTED_MODULE_1__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_1__["default"].None, node.Element.Id, false);
      node.AddRegularChildBox(spacer);
    }
  }
  ApplyVerticalLayout(state, level) {
    const node = level.BranchRoot;
    if (node.Level == 0) {
      throw new Error("Should never be invoked on root node");
    }
    if (node.State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }
    let prevRowBottom = node.State.SiblingsRowV.To;
    const maxOnLeft = this.MaxOnLeft(node);
    for (var i = 0; i < maxOnLeft; i++) {
      const spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
      const child = node.Children[i];
      const frame = child.State;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(frame, frame.Left, prevRowBottom + spacing);
      let rowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](frame.Top, frame.Bottom);
      const i2 = i + maxOnLeft;
      if (frame.Size == null) {
        throw Error("Size is null");
      }
      if (i2 < node.State.NumberOfSiblings) {
        const child2 = node.Children[i2];
        const frame2 = child2.State;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(frame2, frame2.Left, prevRowBottom + spacing);
        if (frame2.Size == null) {
          throw Error("Size is null");
        }
        if (frame2.Bottom > frame.Bottom) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(frame, frame.Left, frame2.CenterV - frame.Size.Height / 2);
        } else if (frame2.Bottom < frame.Bottom) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(frame2, frame2.Left, frame.CenterV - frame2.Size.Height / 2);
        }
        frame2.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_4__["default"].from(frame2.Size, frame2.TopLeft);
        rowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"].add(rowExterior, new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](frame2.Top, frame2.Bottom));
        frame2.SiblingsRowV = rowExterior;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, child2);
        prevRowBottom = frame2.BranchExterior.Bottom;
      }
      frame.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_4__["default"].from(frame.Size, frame.TopLeft);
      frame.SiblingsRowV = rowExterior;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, child);
      prevRowBottom = Math.max(prevRowBottom, frame.BranchExterior.Bottom);
    }
  }
  ApplyHorizontalLayout(state, level) {
    var node = level.BranchRoot;
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.Top, node.State.Bottom);
    }
    var left = true;
    var countOnThisSide = 0;
    var maxOnLeft = this.MaxOnLeft(node);
    for (var i = 0; i < node.State.NumberOfSiblings; i++) {
      var child = node.Children[i];
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, child);
      if (++countOnThisSide == maxOnLeft) {
        if (left) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AlignHorizontalCenters(state, level, this.EnumerateSiblings(node, 0, maxOnLeft));
          left = false;
          countOnThisSide = 0;
          var rightmost = Number.MIN_VALUE;
          for (var k = 0; k <= i; k++) {
            rightmost = Math.max(rightmost, node.Children[k].State.BranchExterior.Right);
          }
          if (node.State.NumberOfSiblings % 2 != 0) {
            rightmost = Math.max(rightmost, child.State.Right);
          } else {
            var opposite = node.Children[node.State.NumberOfSiblings - 1];
            if (opposite.Element.IsCollapsed || opposite.ChildCount == 0) {
              rightmost = Math.max(rightmost, child.State.Right);
            } else {
              rightmost = Math.max(rightmost, child.State.BranchExterior.Right);
            }
          }
          const spacer = node.Children[node.State.NumberOfSiblings];
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(spacer.State, rightmost, node.State.Bottom, this.ParentConnectorShield, node.State.BranchExterior.Bottom - node.State.Bottom);
          level.Boundary.MergeFromNode(spacer);
        }
      }
    }
    _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AlignHorizontalCenters(state, level, this.EnumerateSiblings(node, maxOnLeft, node.State.NumberOfSiblings));
    if (node.Level > 0 && node.State.NumberOfSiblings > 0) {
      let carrier = node.Children[node.State.NumberOfSiblings].State.CenterH;
      let desiredCenter = node.State.CenterH;
      const diff = desiredCenter - carrier;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveChildrenOnly(state, level, diff);
    }
  }
  RouteConnectors(state, node) {
    var count = node.State.NumberOfSiblings;
    if (count == 0) {
      return;
    }
    if (this.NeedCarrierProtector(node)) {
      count++;
    }
    var segments = [];
    var ix = 0;
    var maxOnLeft = this.MaxOnLeft(node);
    var carrier = node.Children[node.State.NumberOfSiblings].State;
    var from = carrier.CenterH;
    var isLeft = true;
    var countOnThisSide = 0;
    var bottomMost = Number.MIN_VALUE;
    for (var i = 0; i < node.State.NumberOfSiblings; i++) {
      var to = isLeft ? node.Children[i].State.Right : node.Children[i].State.Left;
      var y = node.Children[i].State.CenterV;
      bottomMost = Math.max(bottomMost, y);
      segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_5__["default"](new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](from, y), new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](to, y));
      if (++countOnThisSide == maxOnLeft) {
        countOnThisSide = 0;
        isLeft = !isLeft;
      }
    }
    if (this.NeedCarrierProtector(node)) {
      segments[node.State.NumberOfSiblings] = new _Edge__WEBPACK_IMPORTED_MODULE_5__["default"](new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](carrier.CenterH, carrier.Top), new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](carrier.CenterH, bottomMost));
    }
    node.State.Connector = new _Connector__WEBPACK_IMPORTED_MODULE_7__["default"](segments);
  }
  EnumerateSiblings(node, from, to) {
    const nodes = [];
    for (var i = from; i < to; i++) {
      nodes.push(node.Children[i]);
    }
    return nodes;
  }
}


/***/ }),

/***/ "./lib/core/LayoutAlgorithm.ts":
/*!*************************************!*\
  !*** ./lib/core/LayoutAlgorithm.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutAlgorithm; });
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _BoxTree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoxTree */ "./lib/core/BoxTree.ts");
/* harmony import */ var _Operation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Operation */ "./lib/core/Operation.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utils */ "./lib/core/Utils.ts");







class LayoutAlgorithm {
  static ComputeBranchVisualBoundingRect(visualTree) {
    let result = new _Rect__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0, 0, 0);
    let initialized = false;
    if (visualTree.Root == null) {
      throw Error("Root is null");
    }
    visualTree.Root.IterateParentFirst((node) => {
      var box = node.Element;
      if (!node.State.IsHidden && !box.IsSpecial) {
        if (node.State.Size == null) {
          throw Error("Size is null");
        }
        if (node.State.TopLeft == null) {
          throw Error("TopLeft is null");
        }
        if (initialized) {
          result = _Rect__WEBPACK_IMPORTED_MODULE_0__["default"].add(result, _Rect__WEBPACK_IMPORTED_MODULE_0__["default"].from(node.State.Size, node.State.TopLeft));
        } else {
          initialized = true;
          result = _Rect__WEBPACK_IMPORTED_MODULE_0__["default"].from(node.State.Size, node.State.TopLeft);
        }
      }
      return !box.IsCollapsed;
    });
    return result;
  }
  static Apply(state) {
    var _a, _b;
    if (state.Diagram.Boxes && state.Diagram.Boxes.SystemRoot == null) {
      throw new Error("SystemRoot is not initialized on the box container");
    }
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].Preparing;
    var tree = _BoxTree__WEBPACK_IMPORTED_MODULE_1__["default"].Build(state);
    state.Diagram.VisualTree = tree;
    if (tree.Root == null || state.Diagram.Boxes && tree.Root.Element.Id != ((_a = state.Diagram.Boxes.SystemRoot) == null ? void 0 : _a.Id)) {
      throw new Error("SystemRoot is not on the top of the visual tree");
    }
    tree.UpdateHierarchyStats();
    state.AttachVisualTree(tree);
    tree.IterateParentFirst((node) => {
      node.State.IsHidden = node.ParentNode != null && (node.ParentNode.State.IsHidden || node.ParentNode.Element.IsCollapsed);
      return true;
    });
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].PreprocessVisualTree;
    if (state.BoxSizeFunc != null) {
      for (const box of [...(_b = state.Diagram.Boxes) == null ? void 0 : _b.BoxesById.values()].filter((x) => x.IsDataBound)) {
        box.Size = state.BoxSizeFunc(box.DataId);
      }
    }
    for (const box of state.Diagram.Boxes.BoxesById.values()) {
      this.AssertBoxSize(box);
    }
    tree.IterateParentFirst((node) => {
      LayoutAlgorithm.MoveTo(node.State, 0, 0);
      node.State.Size = node.Element.Size;
      node.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_0__["default"].from(node.Element.Size, new _Point__WEBPACK_IMPORTED_MODULE_3__["default"](0, 0));
      return true;
    });
    this.PreprocessVisualTree(state, tree);
    tree.UpdateHierarchyStats();
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].VerticalLayout;
    this.VerticalLayout(state, tree.Root);
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].HorizontalLayout;
    this.HorizontalLayout(state, tree.Root);
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].ConnectorsLayout;
    this.RouteConnectors(state, tree);
    state.CurrentOperation = _Operation__WEBPACK_IMPORTED_MODULE_2__["default"].Completed;
  }
  static AssertBoxSize(box) {
    if (box.Size.Width >= 0 && box.Size.Width <= 1e9) {
      if (box.Size.Height >= 0 && box.Size.Width <= 1e9) {
        return;
      }
    }
    throw new Error(`Box ${box.Id} has invalid size: ${box.Size.Width}x${box.Size.Height}`);
  }
  static PreprocessVisualTree(state, visualTree) {
    const defaultStrategy = state.Diagram.LayoutSettings.RequireDefaultLayoutStrategy();
    const defaultAssistantsStrategy = state.Diagram.LayoutSettings.RequireDefaultAssistantLayoutStrategy();
    const regular = [];
    regular.push(defaultStrategy);
    const assistants = [];
    assistants.push(defaultAssistantsStrategy);
    visualTree.IterateParentFirst((node) => {
      var _a;
      if (node.State.IsHidden) {
        return false;
      }
      let strategy = null;
      if (state.LayoutOptimizerFunc != null) {
        var suggestedStrategyId = state.LayoutOptimizerFunc(node);
        if (suggestedStrategyId) {
          strategy = state.Diagram.LayoutSettings.LayoutStrategies.get(suggestedStrategyId);
          if (true) {
            if (!strategy) {
              console.info("Invalid strategy:", {
                suggestedStrategyId,
                strategy
              });
            }
          }
        }
      }
      if (node.IsAssistantRoot) {
        if (strategy == null) {
          strategy = ((_a = node.ParentNode) == null ? void 0 : _a.Element.AssistantLayoutStrategyId) != null ? state.Diagram.LayoutSettings.LayoutStrategies.get(node.ParentNode.Element.AssistantLayoutStrategyId) : Object(_Utils__WEBPACK_IMPORTED_MODULE_6__["peek"])(assistants);
        }
        if (strategy == null) {
          throw Error("Strategy is null. Maybe it allows null?");
        }
        assistants.push(strategy);
      } else {
        if (strategy == null) {
          strategy = node.Element.LayoutStrategyId != null ? state.Diagram.LayoutSettings.LayoutStrategies.get(node.Element.LayoutStrategyId) : Object(_Utils__WEBPACK_IMPORTED_MODULE_6__["peek"])(regular);
        }
        if (strategy == null) {
          throw Error("Strategy is null. Maybe it allows null?");
        }
        regular.push(strategy);
        if (!strategy.SupportsAssistants) {
          node.SuppressAssistants();
        }
      }
      node.State.EffectiveLayoutStrategy = strategy;
      node.State.RequireLayoutStrategy.PreProcessThisNode(state, node);
      return !node.Element.IsCollapsed && node.ChildCount > 0 || node.AssistantsRoot != null;
    }, (node) => {
      if (!node.State.IsHidden) {
        if (node.IsAssistantRoot) {
          assistants.pop();
        } else {
          regular.pop();
        }
      }
    });
  }
  static HorizontalLayout(state, branchRoot) {
    if (branchRoot.State.IsHidden) {
      throw new Error(`Branch root ${branchRoot.Element.Id} does not affect layout`);
    }
    let level = state.PushLayoutLevel(branchRoot);
    try {
      if (branchRoot.Level == 0 || (branchRoot.State.NumberOfSiblings > 0 || branchRoot.AssistantsRoot != null) && !branchRoot.Element.IsCollapsed) {
        branchRoot.State.RequireLayoutStrategy.ApplyHorizontalLayout(state, level);
      }
    } finally {
      state.PopLayoutLevel();
    }
  }
  static VerticalLayout(state, branchRoot) {
    if (branchRoot.State.IsHidden) {
      throw new Error(`Branch root ${branchRoot.Element.Id} does not affect layout`);
    }
    var level = state.PushLayoutLevel(branchRoot);
    try {
      if (branchRoot.Level == 0 || (branchRoot.State.NumberOfSiblings > 0 || branchRoot.AssistantsRoot != null) && !branchRoot.Element.IsCollapsed) {
        branchRoot.State.RequireLayoutStrategy.ApplyVerticalLayout(state, level);
      }
    } finally {
      state.PopLayoutLevel();
    }
  }
  static RouteConnectors(state, visualTree) {
    visualTree.IterateParentFirst((node) => {
      if (node.Element.IsCollapsed || node.State.NumberOfSiblings == 0 && node.AssistantsRoot == null) {
        return false;
      }
      if (node.Level == 0) {
        return true;
      }
      if (!node.Element.IsSpecial || node.IsAssistantRoot) {
        node.State.RequireLayoutStrategy.RouteConnectors(state, node);
        return true;
      }
      return false;
    });
  }
  static MoveChildrenOnly(state, layoutLevel, offset) {
    const children = layoutLevel.BranchRoot.Children;
    if (children == null || children.length == 0) {
      throw new Error("Should never be invoked when children not set");
    }
    const action = (node) => {
      if (!node.State.IsHidden) {
        try {
          node.State.TopLeft = node.State.TopLeft.MoveH(offset);
          node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
        } catch (e) {
        }
      }
      return true;
    };
    for (const child of children) {
      child.IterateChildFirst(action);
    }
    layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
    layoutLevel.BranchRoot.State.BranchExterior = layoutLevel.Boundary.BoundingRect;
  }
  static MoveOneChild(state, root, offset) {
    root.IterateChildFirst((node) => {
      if (!node.State.IsHidden) {
        node.State.TopLeft = node.State.TopLeft.MoveH(offset);
        node.State.BranchExterior = node.State.BranchExterior.MoveH(offset);
      }
      return true;
    });
  }
  static MoveBranch(state, layoutLevel, offset) {
    this.MoveOneChild(state, layoutLevel.BranchRoot, offset);
    layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
    layoutLevel.BranchRoot.State.BranchExterior = layoutLevel.Boundary.BoundingRect;
  }
  static AlignHorizontalCenters(state, level, subset) {
    let center = Number.MIN_VALUE;
    for (const child of subset) {
      var c = child.State.CenterH;
      if (c > center) {
        center = c;
      }
    }
    let leftmost = Number.MAX_VALUE;
    let rightmost = Number.MIN_VALUE;
    for (const child of subset) {
      const frame = child.State;
      const c2 = frame.CenterH;
      if (c2 !== center) {
        const diff = center - c2;
        this.MoveOneChild(state, child, diff);
      }
      leftmost = Math.min(leftmost, child.State.BranchExterior.Left);
      rightmost = Math.max(rightmost, child.State.BranchExterior.Right);
    }
    level.Boundary.ReloadFromBranch(level.BranchRoot);
    return new _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"](leftmost, rightmost);
  }
  static CopyExteriorFrom(state, other) {
    state.TopLeft = other.TopLeft;
    state.Size = other.Size;
    state.BranchExterior = other.BranchExterior;
    state.SiblingsRowV = other.SiblingsRowV;
  }
  static IsMinValue(value) {
    return value <= Number.MIN_VALUE + Number.EPSILON;
  }
  static IsMaxValue(value) {
    return value >= Number.MAX_VALUE - Number.EPSILON;
  }
  static IsZero(value) {
    return value <= Number.EPSILON && value >= -Number.EPSILON;
  }
  static IsEqual(value, other) {
    return Math.abs(value - other) <= Number.EPSILON;
  }
  static MoveTo(state, x, y) {
    state.TopLeft = new _Point__WEBPACK_IMPORTED_MODULE_3__["default"](x, y);
  }
  static AdjustSpacer(state, x, y, w, h) {
    state.TopLeft = new _Point__WEBPACK_IMPORTED_MODULE_3__["default"](x, y);
    state.Size = new _Size__WEBPACK_IMPORTED_MODULE_5__["default"](w, h);
    state.BranchExterior = new _Rect__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, w, h);
  }
}


/***/ }),

/***/ "./lib/core/LayoutLevel.ts":
/*!*********************************!*\
  !*** ./lib/core/LayoutLevel.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutLevel; });
class LayoutLevel {
  constructor(node, boundary) {
    this.BranchRoot = node;
    this.Boundary = boundary;
  }
}


/***/ }),

/***/ "./lib/core/LayoutState.ts":
/*!*********************************!*\
  !*** ./lib/core/LayoutState.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutState; });
/* harmony import */ var _Operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Operation */ "./lib/core/Operation.ts");
/* harmony import */ var _LayoutStateOperationChangedEventArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutStateOperationChangedEventArgs */ "./lib/core/LayoutStateOperationChangedEventArgs.ts");
/* harmony import */ var _Boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Boundary */ "./lib/core/Boundary.ts");
/* harmony import */ var _LayoutLevel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutLevel */ "./lib/core/LayoutLevel.ts");
/* harmony import */ var _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BoundaryChangedEventArgs */ "./lib/core/BoundaryChangedEventArgs.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Utils */ "./lib/core/Utils.ts");








class LayoutState {
  constructor(diagram) {
    this._currentOperation = _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].Idle;
    this._layoutStack = [];
    this._pooledBoundaries = [];
    this.BoxSizeFunc = null;
    this.LayoutOptimizerFunc = null;
    this.BoundaryChanged = null;
    this.OperationChanged = null;
    this.Diagram = diagram;
  }
  get CurrentOperation() {
    return this._currentOperation;
  }
  set CurrentOperation(value) {
    this._currentOperation = value;
    if (this.OperationChanged) {
      this.OperationChanged(this, new _LayoutStateOperationChangedEventArgs__WEBPACK_IMPORTED_MODULE_1__["default"](this));
    }
  }
  AttachVisualTree(tree) {
    while (this._pooledBoundaries.length < tree.Depth) {
      this._pooledBoundaries.push(new _Boundary__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
  }
  PushLayoutLevel(node) {
    if (this._pooledBoundaries.length == 0) {
      this._pooledBoundaries.push(new _Boundary__WEBPACK_IMPORTED_MODULE_2__["default"]());
    }
    const boundary = this._pooledBoundaries.pop();
    if (boundary == null) {
      throw Error("Boundary is null");
    }
    switch (this.CurrentOperation) {
      case _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].VerticalLayout:
        boundary.Prepare(node);
        break;
      case _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].HorizontalLayout:
        boundary.PrepareForHorizontalLayout(node);
        break;
      default:
        throw new Error("This operation can only be invoked when performing vertical or horizontal layouts");
    }
    if (boundary == null) {
      throw Error("Boundary cannot be null");
    }
    var result = new _LayoutLevel__WEBPACK_IMPORTED_MODULE_3__["default"](node, boundary);
    this._layoutStack.push(result);
    if (this.BoundaryChanged) {
      this.BoundaryChanged(this, new _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__["default"](boundary, result, this));
    }
    return result;
  }
  MergeSpacer(spacer) {
    if (this.CurrentOperation != _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].HorizontalLayout) {
      throw new Error("Spacers can only be merged during horizontal layout");
    }
    if (this._layoutStack.length == 0) {
      throw new Error("Cannot merge spacers at top nesting level");
    }
    const level = Object(_Utils__WEBPACK_IMPORTED_MODULE_7__["peek"])(this._layoutStack);
    if (level == null) {
      throw Error("Level is null");
    }
    level.Boundary.MergeFromNode(spacer);
    if (this.BoundaryChanged) {
      this.BoundaryChanged(this, new _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__["default"](level.Boundary, level, this));
    }
  }
  PopLayoutLevel() {
    const innerLevel = this._layoutStack.pop();
    if (innerLevel == null) {
      throw Error("innerLevel is null");
    }
    if (this.BoundaryChanged) {
      this.BoundaryChanged(this, new _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__["default"](innerLevel.Boundary, innerLevel, this));
    }
    if (this._layoutStack.length > 0) {
      const higherLevel = Object(_Utils__WEBPACK_IMPORTED_MODULE_7__["peek"])(this._layoutStack);
      if (higherLevel == null) {
        throw Error("higherLevel is null");
      }
      switch (this.CurrentOperation) {
        case _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].VerticalLayout:
          higherLevel.Boundary.VerticalMergeFrom(innerLevel.Boundary);
          higherLevel.BranchRoot.State.BranchExterior = higherLevel.Boundary.BoundingRect;
          break;
        case _Operation__WEBPACK_IMPORTED_MODULE_0__["default"].HorizontalLayout:
          {
            if (higherLevel.BranchRoot.AssistantsRoot != innerLevel.BranchRoot) {
              const strategy = higherLevel.BranchRoot.State.RequireLayoutStrategy;
              const overlap = higherLevel.Boundary.ComputeOverlap(innerLevel.Boundary, strategy.SiblingSpacing, this.Diagram.LayoutSettings.BranchSpacing);
              if (overlap > 0) {
                _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_6__["default"].MoveBranch(this, innerLevel, overlap);
                if (this.BoundaryChanged) {
                  this.BoundaryChanged(this, new _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__["default"](innerLevel.Boundary, innerLevel, this));
                }
              }
            }
            higherLevel.Boundary.MergeFrom(innerLevel.Boundary);
            higherLevel.BranchRoot.State.BranchExterior = new _Rect__WEBPACK_IMPORTED_MODULE_5__["default"](higherLevel.Boundary.BoundingRect.Left, higherLevel.BranchRoot.State.BranchExterior.Top, higherLevel.Boundary.BoundingRect.Size.Width, higherLevel.BranchRoot.State.BranchExterior.Size.Height);
          }
          break;
        default:
          throw new Error("This operation can only be invoked when performing vertical or horizontal layouts");
      }
      if (this.BoundaryChanged) {
        this.BoundaryChanged(this, new _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_4__["default"](higherLevel.Boundary, higherLevel, this));
      }
    }
    this._pooledBoundaries.push(innerLevel.Boundary);
  }
}


/***/ }),

/***/ "./lib/core/LayoutStateOperationChangedEventArgs.ts":
/*!**********************************************************!*\
  !*** ./lib/core/LayoutStateOperationChangedEventArgs.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutStateOperactionChangedEventArgs; });
class LayoutStateOperactionChangedEventArgs {
  constructor(state) {
    this.State = state;
    this.CurrentOperation = state.CurrentOperation;
  }
}


/***/ }),

/***/ "./lib/core/LayoutStrategyBase.ts":
/*!****************************************!*\
  !*** ./lib/core/LayoutStrategyBase.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LayoutStrategyBase; });
/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");

class LayoutStrategyBase {
  constructor() {
    this.ParentAlignment = _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_0__["default"].InvalidValue;
    this.ParentChildSpacing = 20;
    this.ParentConnectorShield = 50;
    this.SiblingSpacing = 20;
    this.ChildConnectorHookLength = 5;
  }
  get SupportsAssistants() {
    return this.GetSupportsAssistants();
  }
}


/***/ }),

/***/ "./lib/core/LinearLayoutStrategy.ts":
/*!******************************************!*\
  !*** ./lib/core/LinearLayoutStrategy.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LinearLayoutStrategy; });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");









class LinearLayoutStrategy extends _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);
    this.GetSupportsAssistants = () => true;
  }
  PreProcessThisNode(state, node) {
    if (node.ChildCount > 0) {
      node.State.NumberOfSiblings = node.Element.IsCollapsed ? 0 : node.ChildCount;
      if (!node.Element.IsCollapsed) {
        const verticalSpacer = _Box__WEBPACK_IMPORTED_MODULE_4__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_4__["default"].None, node.Element.Id, false);
        node.AddRegularChildBox(verticalSpacer);
        const horizontalSpacer = _Box__WEBPACK_IMPORTED_MODULE_4__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_4__["default"].None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }
  ApplyVerticalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].CopyExteriorFrom(node.AssistantsRoot.State, node.State);
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, node.AssistantsRoot);
    }
    if (node.State.NumberOfSiblings == 0) {
      return;
    }
    let siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"].MinMax();
    let top;
    if (node.AssistantsRoot == null) {
      if (node.State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }
      top = node.State.SiblingsRowV.To + this.ParentChildSpacing;
    } else {
      top = node.State.BranchExterior.Bottom + this.ParentChildSpacing;
    }
    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      let rect = child.State;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(child.State, 0, top);
      if (child.State.Size == null) {
        throw Error("Size is null");
      }
      child.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_6__["default"].from(child.State.Size, child.State.TopLeft);
      if (rect.Size == null) {
        throw Error("Size is null");
      }
      siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"].add(siblingsRowExterior, new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](top, top + rect.Size.Height));
    }
    siblingsRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](siblingsRowExterior.From, siblingsRowExterior.To);
    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      child.State.SiblingsRowV = siblingsRowExterior;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, child);
    }
  }
  ApplyHorizontalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, node.AssistantsRoot);
    }
    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, child);
    }
    if (node.Level > 0 && node.ChildCount > 0) {
      let rect = node.State;
      let leftmost = node.Children[0].State.CenterH;
      let rightmost = node.Children[node.State.NumberOfSiblings - 1].State.CenterH;
      let desiredCenter = node.State.NumberOfSiblings == 1 || this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_5__["default"].Center ? leftmost + (rightmost - leftmost) / 2 : this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_5__["default"].Left ? leftmost + this.ChildConnectorHookLength : rightmost - this.ChildConnectorHookLength;
      let center = rect.CenterH;
      let diff = center - desiredCenter;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveChildrenOnly(state, level, diff);
      let verticalSpacer = node.Children[node.State.NumberOfSiblings];
      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(verticalSpacer.State, center - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
      state.MergeSpacer(verticalSpacer);
      let firstInRow = node.Children[0].State;
      let horizontalSpacer = node.Children[node.State.NumberOfSiblings + 1];
      if (firstInRow.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(horizontalSpacer.State, firstInRow.Left, firstInRow.SiblingsRowV.From - this.ParentChildSpacing, node.Children[node.State.NumberOfSiblings - 1].State.Right - firstInRow.Left, this.ParentChildSpacing);
      state.MergeSpacer(horizontalSpacer);
    }
  }
  RouteConnectors(state, node) {
    let normalChildCount = node.State.NumberOfSiblings;
    let count = normalChildCount == 0 ? 0 : normalChildCount == 1 ? 1 : 1 + 1 + normalChildCount;
    if (count == 0) {
      node.State.Connector = null;
      return;
    }
    let segments = [];
    let rootRect = node.State;
    let center = rootRect.CenterH;
    if (node.Children == null) {
      throw new Error("State is present, but children not set");
    }
    if (count == 1) {
      segments[0] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](center, rootRect.Bottom), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](center, node.Children[0].State.Top));
    } else {
      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }
      let space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;
      segments[0] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](center, rootRect.Bottom), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](center, rootRect.Bottom + space - this.ChildConnectorHookLength));
      for (let i = 0; i < normalChildCount; i++) {
        let childRect = node.Children[i].State;
        let childCenter = childRect.CenterH;
        segments[1 + i] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](childCenter, childRect.Top), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](childCenter, childRect.Top - this.ChildConnectorHookLength));
      }
      segments[count - 1] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](segments[1].To.X, segments[1].To.Y), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](segments[count - 2].To.X, segments[1].To.Y));
    }
    node.State.Connector = new _Connector__WEBPACK_IMPORTED_MODULE_8__["default"](segments);
  }
}


/***/ }),

/***/ "./lib/core/MultiLineFishboneLayoutStrategy.ts":
/*!*****************************************************!*\
  !*** ./lib/core/MultiLineFishboneLayoutStrategy.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultiLineFishboneLayoutStrategy; });
/* harmony import */ var _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinearLayoutStrategy */ "./lib/core/LinearLayoutStrategy.ts");
/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Node */ "./lib/core/Node.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");











class GroupIterator {
  constructor(numberOfSiblings, numberOfGroups) {
    this.Group = 0;
    this.FromIndex = 0;
    this.Count = 0;
    this.MaxOnLeft = 0;
    this._numberOfSiblings = numberOfSiblings;
    this._numberOfGroups = numberOfGroups;
  }
  CountInGroup() {
    let countInRow = this._numberOfGroups * 2;
    let result = 0;
    let countToThisGroup = this.Group * 2 + 2;
    let firstInRow = 0;
    while (true) {
      let countInThisRow = firstInRow >= this._numberOfSiblings - countInRow ? this._numberOfSiblings - firstInRow : countInRow;
      if (countInThisRow >= countToThisGroup) {
        result += 2;
      } else {
        countToThisGroup--;
        if (countInThisRow >= countToThisGroup) {
          result++;
        }
        break;
      }
      firstInRow += countInRow;
    }
    return result;
  }
  NextGroup() {
    this.FromIndex = this.FromIndex + this.Count;
    if (this.FromIndex > 0) {
      this.Group++;
    }
    this.Count = this.CountInGroup();
    this.MaxOnLeft = Math.floor(this.Count / 2) + this.Count % 2;
    return this.Count != 0;
  }
}
class TreeNodeView extends _Node__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(element) {
    super(element);
  }
  Prepare(capacity) {
    if (this.Children == null) {
      this.Children = [];
    } else {
      this.Children.length = 0;
    }
  }
  AddChildView(node) {
    this.Children.push(node);
  }
}
class SingleFishboneLayoutAdapter extends _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(realRoot) {
    super();
    this.GetSupportsAssistants = () => false;
    this.Iterator = new GroupIterator(realRoot.State.NumberOfSiblings, realRoot.State.NumberOfSiblingColumns);
    this.RealRoot = realRoot;
    this.SpecialRoot = new TreeNodeView(_Box__WEBPACK_IMPORTED_MODULE_3__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_3__["default"].None, realRoot.Element.Id, true));
    this.SpecialRoot.Level = this.RealRoot.Level, this.SpecialRoot.ParentNode = this.RealRoot;
    this.SpecialRoot.State.EffectiveLayoutStrategy = this;
    let parentStrategy = realRoot.State.RequireLayoutStrategy;
    this.SiblingSpacing = parentStrategy.SiblingSpacing;
    this.ParentConnectorShield = parentStrategy.ParentConnectorShield;
    this.ParentChildSpacing = parentStrategy.ParentChildSpacing;
    this.ParentAlignment = parentStrategy.ParentAlignment;
    this.ChildConnectorHookLength = parentStrategy.ChildConnectorHookLength;
  }
  NextGroup() {
    if (!this.Iterator.NextGroup()) {
      return false;
    }
    this.SpecialRoot.State.NumberOfSiblings = this.Iterator.Count;
    this.SpecialRoot.Prepare(this.RealRoot.State.NumberOfSiblingRows * 2);
    for (let i = 0; i < this.Iterator.Count; i++) {
      this.SpecialRoot.AddChildView(this.RealRoot.Children[this.Iterator.FromIndex + i]);
    }
    let spacer = this.RealRoot.Children[this.RealRoot.State.NumberOfSiblings + 1 + this.Iterator.Group];
    this.SpecialRoot.AddChildView(spacer);
    _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].CopyExteriorFrom(this.SpecialRoot.State, this.RealRoot.State);
    return true;
  }
  PreProcessThisNode(state, node) {
    throw new Error("NotSupportedException");
  }
  ApplyVerticalLayout(state, level) {
    var _a, _b;
    if (this.SpecialRoot.State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }
    let prevRowBottom = (_b = (_a = this.RealRoot.AssistantsRoot) == null ? void 0 : _a.State.BranchExterior.Bottom) != null ? _b : this.SpecialRoot.State.SiblingsRowV.To;
    for (let i = 0; i < this.Iterator.MaxOnLeft; i++) {
      let spacing = i == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
      let child = this.SpecialRoot.Children[i];
      let frame = child.State;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].MoveTo(frame, frame.Left, prevRowBottom + spacing);
      let rowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"](frame.Top, frame.Bottom);
      let i2 = i + this.Iterator.MaxOnLeft;
      if (frame.Size == null) {
        throw Error("Size is null");
      }
      if (i2 < this.Iterator.Count) {
        let child2 = this.SpecialRoot.Children[i2];
        let frame2 = child2.State;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].MoveTo(frame2, frame2.Left, prevRowBottom + spacing);
        if (frame2.Size == null) {
          throw Error("Size is null");
        }
        if (frame2.Bottom > frame.Bottom) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].MoveTo(frame, frame.Left, frame2.CenterV - frame.Size.Height / 2);
        } else if (frame2.Bottom < frame.Bottom) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].MoveTo(frame2, frame2.Left, frame.CenterV - frame2.Size.Height / 2);
        }
        frame2.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_10__["default"].from(frame2.Size, frame2.TopLeft);
        rowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"].add(rowExterior, new _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"](frame2.Top, frame2.Bottom));
        frame2.SiblingsRowV = rowExterior;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].VerticalLayout(state, child2);
        prevRowBottom = frame2.BranchExterior.Bottom;
      }
      frame.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_10__["default"].from(frame.Size, frame.TopLeft);
      frame.SiblingsRowV = rowExterior;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].VerticalLayout(state, child);
      prevRowBottom = Math.max(prevRowBottom, frame.BranchExterior.Bottom);
    }
  }
  ApplyHorizontalLayout(state, level) {
    if (level.BranchRoot != this.SpecialRoot) {
      throw new Error("InvalidOperationException: Wrong root node received");
    }
    let left = true;
    let countOnThisSide = 0;
    for (let i = 0; i < this.Iterator.Count; i++) {
      let child = this.SpecialRoot.Children[i];
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].HorizontalLayout(state, child);
      if (++countOnThisSide == this.Iterator.MaxOnLeft) {
        if (left) {
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].AlignHorizontalCenters(state, level, this.EnumerateSiblings(0, this.Iterator.MaxOnLeft));
          left = false;
          countOnThisSide = 0;
          let rightmost = Number.MIN_VALUE;
          for (let k = 0; k < i; k++) {
            rightmost = Math.max(rightmost, this.SpecialRoot.Children[k].State.BranchExterior.Right);
          }
          rightmost = Math.max(rightmost, child.State.Right);
          let spacer = this.SpecialRoot.Children[this.SpecialRoot.State.NumberOfSiblings];
          if (this.SpecialRoot.Children[0].State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
          }
          if (child.State.SiblingsRowV == null) {
            throw Error("SiblingsRowV is null");
          }
          _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].AdjustSpacer(spacer.State, rightmost, this.SpecialRoot.Children[0].State.SiblingsRowV.From, this.SiblingSpacing, child.State.SiblingsRowV.To - this.SpecialRoot.Children[0].State.SiblingsRowV.From);
          level.Boundary.MergeFromNode(spacer);
        }
      }
    }
    _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].AlignHorizontalCenters(state, level, this.EnumerateSiblings(this.Iterator.MaxOnLeft, this.Iterator.Count));
  }
  EnumerateSiblings(from, to) {
    const nodes = [];
    for (let i = from; i < to; i++) {
      nodes.push(this.SpecialRoot.Children[i]);
    }
    return nodes;
  }
  RouteConnectors(state, node) {
    throw new Error();
  }
}
class MultiLineFishboneLayoutStrategy extends _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.MaxGroups = 4;
    this.GetSupportsAssistants = () => true;
  }
  PreProcessThisNode(state, node) {
    if (this.MaxGroups <= 0) {
      throw new Error("MaxGroups must be a positive value");
    }
    if (node.ChildCount <= this.MaxGroups * 2) {
      super.PreProcessThisNode(state, node);
      return;
    }
    node.State.NumberOfSiblings = node.ChildCount;
    if (node.State.NumberOfSiblings > 0) {
      node.State.NumberOfSiblingColumns = this.MaxGroups;
      node.State.NumberOfSiblingRows = Math.floor(node.State.NumberOfSiblings / (this.MaxGroups * 2));
      if (node.State.NumberOfSiblings % (this.MaxGroups * 2) != 0) {
        node.State.NumberOfSiblingRows++;
      }
      let parentSpacer = _Box__WEBPACK_IMPORTED_MODULE_3__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_3__["default"].None, node.Element.Id, false);
      node.AddRegularChildBox(parentSpacer);
      for (let i = 0; i < node.State.NumberOfSiblingColumns; i++) {
        let verticalSpacer = _Box__WEBPACK_IMPORTED_MODULE_3__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_3__["default"].None, node.Element.Id, false);
        node.AddRegularChildBox(verticalSpacer);
      }
      if (node.State.NumberOfSiblingColumns > 1) {
        let horizontalSpacer = _Box__WEBPACK_IMPORTED_MODULE_3__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_3__["default"].None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }
  ApplyVerticalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
      super.ApplyVerticalLayout(state, level);
      return;
    }
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].CopyExteriorFrom(node.AssistantsRoot.State, node.State);
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].VerticalLayout(state, node.AssistantsRoot);
    }
    let adapter = new SingleFishboneLayoutAdapter(node);
    while (adapter.NextGroup()) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].VerticalLayout(state, adapter.SpecialRoot);
    }
  }
  ApplyHorizontalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
      super.ApplyHorizontalLayout(state, level);
      return;
    }
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_4__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].HorizontalLayout(state, node.AssistantsRoot);
    }
    let adapter = new SingleFishboneLayoutAdapter(node);
    while (adapter.NextGroup()) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].HorizontalLayout(state, adapter.SpecialRoot);
    }
    let rect = node.State;
    if (node.Level > 0) {
      let diff = 0;
      if (node.State.NumberOfSiblingColumns > 1) {
        let leftCarrier = node.Children[node.State.NumberOfSiblings + 1].State.CenterH;
        let rightCarrier = node.Children[node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns].State.CenterH;
        let desiredCenter = node.State.NumberOfSiblings == 1 || this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_6__["default"].Center ? leftCarrier + (rightCarrier - leftCarrier) / 2 : this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_6__["default"].Left ? leftCarrier + this.ChildConnectorHookLength : rightCarrier - this.ChildConnectorHookLength;
        diff = rect.CenterH - desiredCenter;
      } else {
        let carrier = node.Children[1 + node.State.NumberOfSiblings].State.CenterH;
        let desiredCenter = rect.CenterH;
        diff = desiredCenter - carrier;
      }
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].MoveChildrenOnly(state, level, diff);
    }
    if (node.Level > 0) {
      if (node.Children[0].State.SiblingsRowV == null) {
        throw Error("SiblingsRowV is null");
      }
      let ix = node.State.NumberOfSiblings;
      let verticalSpacer = node.Children[ix];
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
      state.MergeSpacer(verticalSpacer);
      ix++;
      ix += node.State.NumberOfSiblingColumns;
      if (node.State.NumberOfSiblingColumns > 1) {
        let horizontalSpacer = node.Children[ix];
        let leftmost = node.Children[node.State.NumberOfSiblings + 1].State.TopLeft;
        let rightmost = node.Children[ix - 1].State.Right;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_5__["default"].AdjustSpacer(horizontalSpacer.State, leftmost.X, leftmost.Y - this.ParentChildSpacing, rightmost - leftmost.X, this.ParentChildSpacing);
        state.MergeSpacer(horizontalSpacer);
      }
    }
  }
  RouteConnectors(state, node) {
    if (node.State.NumberOfSiblings <= this.MaxGroups * 2) {
      super.RouteConnectors(state, node);
      return;
    }
    let count = 1 + node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns;
    if (node.State.NumberOfSiblingColumns > 1) {
      count++;
    }
    let segments = [];
    let rootRect = node.State;
    let center = rootRect.CenterH;
    let ix = 0;
    if (node.Children[0].State.SiblingsRowV == null) {
      throw Error("SiblingsRowV is null");
    }
    let space = node.Children[0].State.SiblingsRowV.From - rootRect.Bottom;
    segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](center, rootRect.Bottom), new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](center, rootRect.Bottom + space - this.ChildConnectorHookLength));
    let iterator = new GroupIterator(node.State.NumberOfSiblings, node.State.NumberOfSiblingColumns);
    while (iterator.NextGroup()) {
      let carrier = node.Children[1 + node.State.NumberOfSiblings + iterator.Group].State;
      let from = carrier.CenterH;
      let isLeft = true;
      let countOnThisSide = 0;
      for (let i = iterator.FromIndex; i < iterator.FromIndex + iterator.Count; i++) {
        let to = isLeft ? node.Children[i].State.Right : node.Children[i].State.Left;
        let y = node.Children[i].State.CenterV;
        segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](from, y), new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](to, y));
        if (++countOnThisSide == iterator.MaxOnLeft) {
          countOnThisSide = 0;
          if (isLeft) {
            segments[1 + node.State.NumberOfSiblings + iterator.Group] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](carrier.CenterH, carrier.Top - this.ChildConnectorHookLength), new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](carrier.CenterH, node.Children[i].State.CenterV));
          }
          isLeft = !isLeft;
        }
      }
    }
    ix += node.State.NumberOfSiblingColumns;
    if (node.State.NumberOfSiblingColumns > 1) {
      let leftGroup = node.Children[1 + node.State.NumberOfSiblings].State;
      let rightGroup = node.Children[1 + node.State.NumberOfSiblings + node.State.NumberOfSiblingColumns - 1].State;
      segments[ix] = new _Edge__WEBPACK_IMPORTED_MODULE_7__["default"](new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](leftGroup.CenterH, leftGroup.Top - this.ChildConnectorHookLength), new _Point__WEBPACK_IMPORTED_MODULE_8__["default"](rightGroup.CenterH, rightGroup.Top - this.ChildConnectorHookLength));
    }
    node.State.Connector = new _Connector__WEBPACK_IMPORTED_MODULE_9__["default"](segments);
  }
}


/***/ }),

/***/ "./lib/core/MultiLineHangerLayoutStrategy.ts":
/*!***************************************************!*\
  !*** ./lib/core/MultiLineHangerLayoutStrategy.ts ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultiLineHangerLayoutStrategy; });
/* harmony import */ var _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinearLayoutStrategy */ "./lib/core/LinearLayoutStrategy.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");








class MultiLineHangerLayoutStrategy extends _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.MaxSiblingsPerRow = 4;
    this.GetSupportsAssistants = () => true;
  }
  PreProcessThisNode(state, node) {
    if (this.MaxSiblingsPerRow <= 0 || this.MaxSiblingsPerRow % 2 != 0) {
      throw new Error("MaxSiblingsPerRow must be a positive even value");
    }
    if (node.ChildCount <= this.MaxSiblingsPerRow) {
      super.PreProcessThisNode(state, node);
      return;
    }
    node.State.NumberOfSiblings = node.ChildCount;
    if (node.State.NumberOfSiblings > 0) {
      let lastRowBoxCount = node.ChildCount % this.MaxSiblingsPerRow;
      node.State.NumberOfSiblingColumns = 1 + this.MaxSiblingsPerRow;
      node.State.NumberOfSiblingRows = Math.floor(node.ChildCount / this.MaxSiblingsPerRow);
      if (lastRowBoxCount != 0) {
        node.State.NumberOfSiblingRows++;
      }
      node.State.NumberOfSiblings = node.ChildCount + node.State.NumberOfSiblingRows;
      if (lastRowBoxCount > 0 && lastRowBoxCount <= Math.floor(this.MaxSiblingsPerRow / 2)) {
        node.State.NumberOfSiblings--;
      }
      let ix = Math.floor(this.MaxSiblingsPerRow / 2);
      while (ix < node.State.NumberOfSiblings) {
        let siblingSpacer = _Box__WEBPACK_IMPORTED_MODULE_1__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_1__["default"].None, node.Element.Id, false);
        node.InsertRegularChildBoxByIndex(ix, siblingSpacer);
        ix += node.State.NumberOfSiblingColumns;
      }
      let verticalSpacer = _Box__WEBPACK_IMPORTED_MODULE_1__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_1__["default"].None, node.Element.Id, false);
      node.AddRegularChildBox(verticalSpacer);
      for (let i = 0; i < node.State.NumberOfSiblingRows; i++) {
        let horizontalSpacer = _Box__WEBPACK_IMPORTED_MODULE_1__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_1__["default"].None, node.Element.Id, false);
        node.AddRegularChildBox(horizontalSpacer);
      }
    }
  }
  ApplyVerticalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      super.ApplyVerticalLayout(state, level);
      return;
    }
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].CopyExteriorFrom(node.AssistantsRoot.State, node.State);
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, node.AssistantsRoot);
    }
    let prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.SiblingsRowV.From, node.AssistantsRoot == null ? node.State.SiblingsRowV.To : node.State.BranchExterior.Bottom);
    for (let row = 0; row < node.State.NumberOfSiblingRows; row++) {
      let siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"].MinMax();
      let spacing = row == 0 ? this.ParentChildSpacing : this.SiblingSpacing;
      let from = row * node.State.NumberOfSiblingColumns;
      let to = Math.min(from + node.State.NumberOfSiblingColumns, node.State.NumberOfSiblings);
      for (let i = from; i < to; i++) {
        let child = node.Children[i];
        if (child.Element.IsSpecial) {
          continue;
        }
        let rect = child.State;
        let top = prevRowExterior.To + spacing;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(child.State, rect.Left, top);
        child.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_7__["default"].from(child.State.Size, child.State.TopLeft);
        siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"].add(siblingsRowExterior, new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](top, top + rect.Size.Height));
      }
      siblingsRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](siblingsRowExterior.From, siblingsRowExterior.To);
      let siblingsBottom = Number.MIN_VALUE;
      for (let i = from; i < to; i++) {
        let child = node.Children[i];
        child.State.SiblingsRowV = siblingsRowExterior;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, child);
        siblingsBottom = Math.max(siblingsBottom, child.State.BranchExterior.Bottom);
      }
      prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](siblingsRowExterior.From, Math.max(siblingsBottom, siblingsRowExterior.To));
      let spacerIndex = from + Math.floor(node.State.NumberOfSiblingColumns / 2);
      if (spacerIndex < node.State.NumberOfSiblings) {
        let spacerBottom = row == node.State.NumberOfSiblingRows - 1 ? node.Children[spacerIndex - 1].State.SiblingsRowV.To : prevRowExterior.To;
        let spacer = node.Children[spacerIndex].State;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(spacer, 0, prevRowExterior.From, this.ParentConnectorShield, spacerBottom - prevRowExterior.From);
      }
    }
  }
  ApplyHorizontalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      super.ApplyHorizontalLayout(state, level);
      return;
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, node.AssistantsRoot);
    }
    for (let col = 0; col < node.State.NumberOfSiblingColumns; col++) {
      for (let row = 0; row < node.State.NumberOfSiblingRows; row++) {
        let ix = row * node.State.NumberOfSiblingColumns + col;
        if (ix >= node.State.NumberOfSiblings) {
          break;
        }
        let child = node.Children[ix];
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, child);
      }
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AlignHorizontalCenters(state, level, this.EnumerateColumn(node, col));
    }
    let rect = node.State;
    let spacer = node.Children[Math.floor(node.State.NumberOfSiblingColumns / 2)];
    let desiredCenter = spacer.State.CenterH;
    let diff = rect.CenterH - desiredCenter;
    _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveChildrenOnly(state, level, diff);
    let verticalSpacer = node.Children[node.State.NumberOfSiblings];
    _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, rect.Bottom, this.ParentConnectorShield, node.Children[0].State.SiblingsRowV.From - rect.Bottom);
    state.MergeSpacer(verticalSpacer);
    let spacing = this.ParentChildSpacing;
    for (let firstInRowIndex = 0; firstInRowIndex < node.State.NumberOfSiblings; firstInRowIndex += node.State.NumberOfSiblingColumns) {
      let firstInRow = node.Children[firstInRowIndex].State;
      let lastInRow = node.Children[Math.min(firstInRowIndex + node.State.NumberOfSiblingColumns - 1, node.State.NumberOfSiblings - 1)].State;
      let horizontalSpacer = node.Children[1 + node.State.NumberOfSiblings + Math.floor(firstInRowIndex / node.State.NumberOfSiblingColumns)];
      let width = lastInRow.Right >= verticalSpacer.State.Right ? lastInRow.Right - firstInRow.Left : verticalSpacer.State.Right - firstInRow.Left;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(horizontalSpacer.State, firstInRow.Left, firstInRow.SiblingsRowV.From - spacing, width, spacing);
      state.MergeSpacer(horizontalSpacer);
      spacing = this.SiblingSpacing;
    }
  }
  EnumerateColumn(branchRoot, col) {
    const nodes = [];
    for (let row = 0; row < branchRoot.State.NumberOfSiblingRows; row++) {
      let ix = row * branchRoot.State.NumberOfSiblingColumns + col;
      if (ix >= branchRoot.State.NumberOfSiblings) {
        break;
      }
      nodes.push(branchRoot.Children[ix]);
    }
    return nodes;
  }
  RouteConnectors(state, node) {
    if (node.State.NumberOfSiblings <= this.MaxSiblingsPerRow) {
      super.RouteConnectors(state, node);
      return;
    }
    let count = 1 + node.State.NumberOfSiblingRows;
    for (let child of node.Children) {
      if (!child.Element.IsSpecial) {
        count++;
      }
    }
    let segments = [];
    let rootRect = node.State;
    let center = rootRect.CenterH;
    let verticalCarrierHeight = node.Children[node.State.NumberOfSiblings - 1].State.SiblingsRowV.From - this.ChildConnectorHookLength - rootRect.Bottom;
    segments[0] = new _Edge__WEBPACK_IMPORTED_MODULE_4__["default"](new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](center, rootRect.Bottom), new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](center, rootRect.Bottom + verticalCarrierHeight));
    let ix = 1;
    for (let i = 0; i < node.State.NumberOfSiblings; i++) {
      let child = node.Children[i];
      if (!child.Element.IsSpecial) {
        let childRect = child.State;
        let childCenter = childRect.CenterH;
        segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_4__["default"](new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](childCenter, childRect.Top), new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](childCenter, childRect.Top - this.ChildConnectorHookLength));
      }
    }
    let lastChildHookIndex = count - node.State.NumberOfSiblingRows - 1;
    for (let firstInRowIndex = 1; firstInRowIndex < count - node.State.NumberOfSiblingRows; firstInRowIndex += this.MaxSiblingsPerRow) {
      let firstInRow = segments[firstInRowIndex];
      let lastInRow = segments[Math.min(firstInRowIndex + this.MaxSiblingsPerRow - 1, lastChildHookIndex)];
      if (lastInRow.From.X < segments[0].From.X) {
        segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_4__["default"](new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](firstInRow.To.X, firstInRow.To.Y), new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](segments[0].To.X, firstInRow.To.Y));
      } else {
        segments[ix++] = new _Edge__WEBPACK_IMPORTED_MODULE_4__["default"](new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](firstInRow.To.X, firstInRow.To.Y), new _Point__WEBPACK_IMPORTED_MODULE_5__["default"](lastInRow.To.X, firstInRow.To.Y));
      }
    }
    node.State.Connector = new _Connector__WEBPACK_IMPORTED_MODULE_6__["default"](segments);
  }
}


/***/ }),

/***/ "./lib/core/Node.ts":
/*!**************************!*\
  !*** ./lib/core/Node.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Node; });
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _NodeLayoutInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NodeLayoutInfo */ "./lib/core/NodeLayoutInfo.ts");


class Node {
  constructor(element) {
    this.Level = 0;
    this.Children = [];
    this.AssistantsRoot = null;
    this.ParentNode = null;
    this.Element = element;
    this.State = new _NodeLayoutInfo__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  get ChildCount() {
    var _a;
    return ((_a = this.Children) == null ? void 0 : _a.length) || 0;
  }
  get IsAssistantRoot() {
    var _a;
    return ((_a = this.ParentNode) == null ? void 0 : _a.AssistantsRoot) == this;
  }
  AddAssistantChild(child) {
    if (this.AssistantsRoot == null) {
      this.AssistantsRoot = new Node(_Box__WEBPACK_IMPORTED_MODULE_0__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_0__["default"].None, this.Element.Id, true));
      this.AssistantsRoot.ParentNode = this;
      this.AssistantsRoot.Level = this.AssistantsRoot.Level + 1;
    }
    this.AssistantsRoot.AddRegularChild(child);
    return this;
  }
  AddRegularChild(child) {
    return this.InsertRegularChild(this.ChildCount, child);
  }
  AddRegularChildBox(child) {
    return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
  }
  InsertRegularChildBox(child) {
    return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
  }
  InsertRegularChildBoxByIndex(index, child) {
    return this.InsertRegularChild(index, new Node(child));
  }
  InsertRegularChild(index, child) {
    if (this.Children == null) {
      this.Children = [];
    }
    this.Children.splice(index, 0, child);
    child.ParentNode = this;
    child.Level = this.Level + 1;
    return this;
  }
  IterateChildFirst(func) {
    if (this.AssistantsRoot != null) {
      if (!this.AssistantsRoot.IterateChildFirst(func)) {
        return false;
      }
    }
    if (this.Children != null) {
      for (const child of this.Children) {
        if (!child.IterateChildFirst(func)) {
          return false;
        }
      }
    }
    return func(this);
  }
  IterateParentFirst(enter, exit) {
    var _a;
    if (!enter(this)) {
      if (exit) {
        exit(this);
      }
      return false;
    }
    (_a = this.AssistantsRoot) == null ? void 0 : _a.IterateParentFirst(enter, exit);
    if (this.Children != null) {
      for (const child of this.Children) {
        child.IterateParentFirst(enter, exit);
      }
    }
    if (exit) {
      exit(this);
    }
    return true;
  }
  SuppressAssistants() {
    if (this.AssistantsRoot != null) {
      for (const child of this.AssistantsRoot.Children) {
        this.AddRegularChild(child);
      }
      this.AssistantsRoot = null;
    }
  }
}


/***/ }),

/***/ "./lib/core/NodeLayoutInfo.ts":
/*!************************************!*\
  !*** ./lib/core/NodeLayoutInfo.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NodeLayoutInfo; });
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");




class NodeLayoutInfo {
  constructor() {
    this._effectiveLayoutStrategy = null;
    this.IsHidden = false;
    this.Connector = null;
    this.NumberOfSiblings = 0;
    this.NumberOfSiblingRows = 0;
    this.NumberOfSiblingColumns = 0;
    this.Size = new _Size__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
    this.TopLeft = new _Point__WEBPACK_IMPORTED_MODULE_1__["default"](0, 0);
    this.BranchExterior = new _Rect__WEBPACK_IMPORTED_MODULE_3__["default"](0, 0, 0, 0);
    this.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](0, 0);
  }
  set EffectiveLayoutStrategy(value) {
    this._effectiveLayoutStrategy = value;
  }
  get RequireLayoutStrategy() {
    if (this._effectiveLayoutStrategy == null) {
      throw new Error("EffectiveLayoutStrategy is not set");
    }
    return this._effectiveLayoutStrategy;
  }
  get Left() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    return this.TopLeft.X;
  }
  get Right() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    if (this.Size == null) {
      throw Error("Size is null");
    }
    return this.TopLeft.X + this.Size.Width;
  }
  get Top() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    if (this.Size == null) {
      throw Error("Size is null");
    }
    return this.TopLeft.Y;
  }
  get Bottom() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    if (this.Size == null) {
      throw Error("Size is null");
    }
    return this.TopLeft.Y + this.Size.Height;
  }
  get CenterH() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    if (this.Size == null) {
      throw Error("Size is null");
    }
    return this.TopLeft.X + this.Size.Width / 2;
  }
  get CenterV() {
    if (this.TopLeft == null) {
      throw Error("TopLeft is null");
    }
    if (this.Size == null) {
      throw Error("Size is null");
    }
    return this.TopLeft.Y + this.Size.Height / 2;
  }
}


/***/ }),

/***/ "./lib/core/Operation.ts":
/*!*******************************!*\
  !*** ./lib/core/Operation.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Operation;
(function(Operation2) {
  Operation2[Operation2["Idle"] = 0] = "Idle";
  Operation2[Operation2["Preparing"] = 1] = "Preparing";
  Operation2[Operation2["PreprocessVisualTree"] = 2] = "PreprocessVisualTree";
  Operation2[Operation2["VerticalLayout"] = 3] = "VerticalLayout";
  Operation2[Operation2["HorizontalLayout"] = 4] = "HorizontalLayout";
  Operation2[Operation2["ConnectorsLayout"] = 5] = "ConnectorsLayout";
  Operation2[Operation2["Completed"] = 6] = "Completed";
})(Operation || (Operation = {}));
/* harmony default export */ __webpack_exports__["default"] = (Operation);


/***/ }),

/***/ "./lib/core/Point.ts":
/*!***************************!*\
  !*** ./lib/core/Point.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
class Point {
  constructor(x, y) {
    this.X = x;
    this.Y = y;
  }
  MoveH(offsetX) {
    return new Point(this.X + offsetX, this.Y);
  }
}


/***/ }),

/***/ "./lib/core/Rect.ts":
/*!**************************!*\
  !*** ./lib/core/Rect.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rect; });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");


class Rect {
  get BottomRight() {
    return new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.TopLeft.X + this.Size.Width, this.TopLeft.Y + this.Size.Height);
  }
  get Left() {
    return this.TopLeft.X;
  }
  get Right() {
    return this.TopLeft.X + this.Size.Width;
  }
  get CenterH() {
    return this.TopLeft.X + this.Size.Width / 2;
  }
  get CenterV() {
    return this.TopLeft.Y + this.Size.Height / 2;
  }
  get Top() {
    return this.TopLeft.Y;
  }
  get Bottom() {
    return this.TopLeft.Y + this.Size.Height;
  }
  constructor(x, y, w, h) {
    if (w < 0) {
      throw new Error(`Width out of range`);
    }
    if (h < 0) {
      throw new Error(`Height out of range`);
    }
    this.TopLeft = new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x, y);
    this.Size = new _Size__WEBPACK_IMPORTED_MODULE_1__["default"](w, h);
  }
  static from(size, topLeft = new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0)) {
    return new Rect(topLeft.X, topLeft.Y, size.Width, size.Height);
  }
  static add(x, y) {
    const left = Math.min(x.Left, y.Left);
    const top = Math.min(x.Top, y.Top);
    const right = Math.max(x.Right, y.Right);
    const bottom = Math.max(x.Bottom, y.Bottom);
    return new Rect(left, top, right - left, bottom - top);
  }
  MoveH(offsetX) {
    return Rect.from(this.Size, new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](this.Left + offsetX, this.Top));
  }
}


/***/ }),

/***/ "./lib/core/SingleColumnLayoutStrategy.ts":
/*!************************************************!*\
  !*** ./lib/core/SingleColumnLayoutStrategy.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SingleColumnLayoutStrategy; });
/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");









class SingleColumnLayoutStrategy extends _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.GetSupportsAssistants = () => true;
  }
  PreProcessThisNode(state, node) {
    if (this.ParentAlignment != _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__["default"].Left && this.ParentAlignment != _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__["default"].Right) {
      throw new Error("InvalidOperationException: Unsupported value for ParentAlignment");
    }
    node.State.NumberOfSiblings = node.Element.IsCollapsed ? 0 : node.ChildCount;
    if (node.State.NumberOfSiblings > 0 && node.Level > 0) {
      node.State.NumberOfSiblingColumns = 1;
      node.State.NumberOfSiblingRows = node.ChildCount;
      let verticalSpacer = _Box__WEBPACK_IMPORTED_MODULE_1__["default"].Special(_Box__WEBPACK_IMPORTED_MODULE_1__["default"].None, node.Element.Id, false);
      node.AddRegularChildBox(verticalSpacer);
    }
  }
  ApplyVerticalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].CopyExteriorFrom(node.AssistantsRoot.State, node.State);
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, node.AssistantsRoot);
    }
    let prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](node.State.SiblingsRowV.From, node.AssistantsRoot == null ? node.State.SiblingsRowV.To : node.State.BranchExterior.Bottom);
    for (let row = 0; row < node.State.NumberOfSiblings; row++) {
      let child = node.Children[row];
      let rect = child.State;
      let top = prevRowExterior.To + (row == 0 ? this.ParentChildSpacing : this.SiblingSpacing);
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveTo(child.State, rect.Left, top);
      child.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_8__["default"].from(child.State.Size, child.State.TopLeft);
      let rowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](top, top + rect.Size.Height);
      child = node.Children[row];
      child.State.SiblingsRowV = rowExterior;
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].VerticalLayout(state, child);
      let childBranchBottom = child.State.BranchExterior.Bottom;
      prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_2__["default"](rowExterior.From, Math.max(childBranchBottom, rowExterior.To));
    }
  }
  ApplyHorizontalLayout(state, level) {
    let node = level.BranchRoot;
    let nodeState = node.State;
    if (node.AssistantsRoot != null) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, node.AssistantsRoot);
    }
    for (let row = 0; row < nodeState.NumberOfSiblings; row++) {
      let child = node.Children[row];
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].HorizontalLayout(state, child);
    }
    let edges = _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AlignHorizontalCenters(state, level, this.EnumerateColumn(node));
    if (node.Level > 0 && node.ChildCount > 0) {
      let rect = node.State;
      let diff;
      if (this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__["default"].Left) {
        let desiredLeft = rect.CenterH + this.ParentConnectorShield / 2;
        diff = desiredLeft - edges.From;
      } else if (this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__["default"].Right) {
        let desiredRight = rect.CenterH - this.ParentConnectorShield / 2;
        diff = desiredRight - edges.To;
      } else {
        throw new Error("InvalidOperationException: Invalid ParentAlignment setting");
      }
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].MoveChildrenOnly(state, level, diff);
      let verticalSpacer = node.Level > 0 ? node.Children[node.ChildCount - 1] : null;
      if (verticalSpacer != null) {
        let spacerTop = node.State.Bottom;
        let spacerBottom = node.Children[node.ChildCount - 2].State.Bottom;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_3__["default"].AdjustSpacer(verticalSpacer.State, rect.CenterH - this.ParentConnectorShield / 2, spacerTop, this.ParentConnectorShield, spacerBottom - spacerTop);
        state.MergeSpacer(verticalSpacer);
      }
    }
  }
  EnumerateColumn(branchRoot) {
    const nodes = [];
    for (let i = 0; i < branchRoot.State.NumberOfSiblings; i++) {
      nodes.push(branchRoot.Children[i]);
    }
    return nodes;
  }
  RouteConnectors(state, node) {
    if (node.ChildCount == 0) {
      return;
    }
    let count = 1 + node.State.NumberOfSiblings;
    let segments = Array(count);
    let rootRect = node.State;
    let center = rootRect.CenterH;
    let verticalCarrierHeight = node.Children[node.State.NumberOfSiblings - 1].State.CenterV - node.State.Bottom;
    segments[0] = new _Edge__WEBPACK_IMPORTED_MODULE_5__["default"](new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](center, rootRect.Bottom), new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](center, rootRect.Bottom + verticalCarrierHeight));
    for (let ix = 0; ix < node.State.NumberOfSiblings; ix++) {
      let rect = node.Children[ix].State;
      let destination = this.ParentAlignment == _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_4__["default"].Left ? rect.Left : rect.Right;
      segments[1 + ix] = new _Edge__WEBPACK_IMPORTED_MODULE_5__["default"](new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](center, rect.CenterV), new _Point__WEBPACK_IMPORTED_MODULE_6__["default"](destination, rect.CenterV));
    }
    node.State.Connector = new _Connector__WEBPACK_IMPORTED_MODULE_7__["default"](segments);
  }
}


/***/ }),

/***/ "./lib/core/Size.ts":
/*!**************************!*\
  !*** ./lib/core/Size.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Size; });
class Size {
  constructor(w, h) {
    this.Width = w;
    this.Height = h;
  }
}


/***/ }),

/***/ "./lib/core/StackOrientation.ts":
/*!**************************************!*\
  !*** ./lib/core/StackOrientation.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var StackOrientation;
(function(StackOrientation2) {
  StackOrientation2[StackOrientation2["InvalidValue"] = 0] = "InvalidValue";
  StackOrientation2[StackOrientation2["SingleRowHorizontal"] = 1] = "SingleRowHorizontal";
  StackOrientation2[StackOrientation2["SingleColumnVertical"] = 2] = "SingleColumnVertical";
})(StackOrientation || (StackOrientation = {}));
/* harmony default export */ __webpack_exports__["default"] = (StackOrientation);


/***/ }),

/***/ "./lib/core/StackingLayoutStrategy.ts":
/*!********************************************!*\
  !*** ./lib/core/StackingLayoutStrategy.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackingLayoutStrategy; });
/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");
/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* harmony import */ var _StackOrientation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./StackOrientation */ "./lib/core/StackOrientation.ts");







class StackingLayoutStrategy extends _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.GetSupportsAssistants = () => false;
    this.Orientation = _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleRowHorizontal;
    this.ParentAlignment = _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_3__["default"].InvalidValue;
    this.ChildConnectorHookLength = 0;
    this.ParentConnectorShield = 0;
    this.SiblingSpacing = 5;
  }
  PreProcessThisNode(state, node) {
    node.State.NumberOfSiblings = node.Element.IsCollapsed ? 0 : node.ChildCount;
    if (node.State.NumberOfSiblings > 0) {
      if (this.Orientation != _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleRowHorizontal && this.Orientation != _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleColumnVertical) {
        throw new Error("InvalidOperationException: Unsupported value for orientation: " + this.Orientation);
      }
    }
  }
  ApplyVerticalLayout(state, level) {
    let node = level.BranchRoot;
    if (node.Level == 0) {
      node.State.SiblingsRowV = new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](node.State.Top, node.State.Bottom);
    }
    if (node.State.NumberOfSiblings == 0) {
      return;
    }
    let siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"].MinMax();
    if (this.Orientation == _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleRowHorizontal) {
      let top = node.AssistantsRoot == null ? node.State.SiblingsRowV.To + this.ParentChildSpacing : node.State.BranchExterior.Bottom + this.ParentChildSpacing;
      for (let i = 0; i < node.State.NumberOfSiblings; i++) {
        let child = node.Children[i];
        let rect = child.State;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].MoveTo(child.State, 0, top);
        child.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_5__["default"].from(child.State.Size, child.State.TopLeft);
        siblingsRowExterior = _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"].add(siblingsRowExterior, new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](top, top + rect.Size.Height));
      }
      siblingsRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](siblingsRowExterior.From, siblingsRowExterior.To);
      for (let i = 0; i < node.State.NumberOfSiblings; i++) {
        let child = node.Children[i];
        child.State.SiblingsRowV = siblingsRowExterior;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].VerticalLayout(state, child);
      }
    } else if (this.Orientation == _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleColumnVertical) {
      let prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](node.State.SiblingsRowV.From, node.State.SiblingsRowV.To);
      for (let row = 0; row < node.State.NumberOfSiblings; row++) {
        let child = node.Children[row];
        let rect = child.State;
        let top = prevRowExterior.To + (row == 0 ? this.ParentChildSpacing : this.SiblingSpacing);
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].MoveTo(child.State, rect.Left, top);
        child.State.BranchExterior = _Rect__WEBPACK_IMPORTED_MODULE_5__["default"].from(child.State.Size, child.State.TopLeft);
        let rowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](top, top + rect.Size.Height);
        child = node.Children[row];
        child.State.SiblingsRowV = rowExterior;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].VerticalLayout(state, child);
        let childBranchBottom = child.State.BranchExterior.Bottom;
        prevRowExterior = new _Dimensions__WEBPACK_IMPORTED_MODULE_1__["default"](rowExterior.From, Math.max(childBranchBottom, rowExterior.To));
      }
    }
  }
  ApplyHorizontalLayout(state, level) {
    let node = level.BranchRoot;
    for (let child of node.Children) {
      _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].HorizontalLayout(state, child);
    }
    if (node.ChildCount > 0) {
      if (this.Orientation == _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleRowHorizontal) {
        let width = node.Children[node.State.NumberOfSiblings - 1].State.Right - node.Children[0].State.Left;
        node.State.Size = new _Size__WEBPACK_IMPORTED_MODULE_4__["default"](Math.max(node.State.Size.Width, width), node.State.Size.Height);
        let center = (node.Children[0].State.Left + node.Children[node.ChildCount - 1].State.Right) / 2;
        let desiredCenter = node.State.CenterH;
        let diff = desiredCenter - center;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].MoveChildrenOnly(state, level, diff);
      } else if (this.Orientation == _StackOrientation__WEBPACK_IMPORTED_MODULE_6__["default"].SingleColumnVertical) {
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].AlignHorizontalCenters(state, level, node.Children);
        let center = node.Children[0].State.CenterH;
        let desiredCenter = node.State.CenterH;
        let diff = desiredCenter - center;
        _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_2__["default"].MoveChildrenOnly(state, level, diff);
      }
    }
  }
  RouteConnectors(state, node) {
  }
}


/***/ }),

/***/ "./lib/core/Step.ts":
/*!**************************!*\
  !*** ./lib/core/Step.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Step; });
class Step {
  constructor(node, x, top, bottom) {
    this.Node = node;
    this.X = x;
    this.Top = top;
    this.Bottom = bottom;
  }
  ChangeTop(newTop) {
    return new Step(this.Node, this.X, newTop, this.Bottom);
  }
  ChangeBottom(newBottom) {
    return new Step(this.Node, this.X, this.Top, newBottom);
  }
  ChangeOwner(newNode, newX) {
    return new Step(newNode, newX, this.Top, this.Bottom);
  }
  ChangeX(newX) {
    return new Step(this.Node, newX, this.Top, this.Bottom);
  }
}


/***/ }),

/***/ "./lib/core/Utils.ts":
/*!***************************!*\
  !*** ./lib/core/Utils.ts ***!
  \***************************/
/*! exports provided: peek */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return peek; });
const peek = (array) => {
  return array[array.length - 1];
};



/***/ }),

/***/ "./lib/core/index.ts":
/*!***************************!*\
  !*** ./lib/core/index.ts ***!
  \***************************/
/*! exports provided: Boundary, BoundaryChangedEventArgs, Box, BoxContainer, BoxTree, BranchParentAlignment, Connector, Diagram, DiagramLayoutSettings, DiagramLayoutTemplates, Dimensions, Edge, FishboneAssistantsLayoutStrategy, LayoutAlgorithm, LayoutLevel, LayoutState, LayoutStateOperationChangedEventArgs, LayoutStrategyBase, LinearLayoutStrategy, MultiLineFishboneLayoutStrategy, MultiLineHangerLayoutStrategy, Node, NodeLayoutInfo, Operation, Point, Rect, SingleColumnLayoutStrategy, Size, StackOrientation, StackingLayoutStrategy, Step, peek */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Boundary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Boundary */ "./lib/core/Boundary.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Boundary", function() { return _Boundary__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoundaryChangedEventArgs */ "./lib/core/BoundaryChangedEventArgs.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundaryChangedEventArgs", function() { return _BoundaryChangedEventArgs__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box */ "./lib/core/Box.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _Box__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _BoxContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BoxContainer */ "./lib/core/BoxContainer.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoxContainer", function() { return _BoxContainer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _BoxTree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BoxTree */ "./lib/core/BoxTree.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoxTree", function() { return _BoxTree__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BranchParentAlignment", function() { return _BranchParentAlignment__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Connector */ "./lib/core/Connector.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Connector", function() { return _Connector__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Diagram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Diagram */ "./lib/core/Diagram.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Diagram", function() { return _Diagram__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _DiagramLayoutSettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DiagramLayoutSettings */ "./lib/core/DiagramLayoutSettings.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiagramLayoutSettings", function() { return _DiagramLayoutSettings__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _DiagramLayoutTemplates__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DiagramLayoutTemplates */ "./lib/core/DiagramLayoutTemplates.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiagramLayoutTemplates", function() { return _DiagramLayoutTemplates__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Dimensions */ "./lib/core/Dimensions.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dimensions", function() { return _Dimensions__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _Edge__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Edge */ "./lib/core/Edge.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Edge", function() { return _Edge__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _FishboneAssistantsLayoutStrategy__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./FishboneAssistantsLayoutStrategy */ "./lib/core/FishboneAssistantsLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FishboneAssistantsLayoutStrategy", function() { return _FishboneAssistantsLayoutStrategy__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutAlgorithm", function() { return _LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _LayoutLevel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./LayoutLevel */ "./lib/core/LayoutLevel.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutLevel", function() { return _LayoutLevel__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _LayoutState__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./LayoutState */ "./lib/core/LayoutState.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutState", function() { return _LayoutState__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _LayoutStateOperationChangedEventArgs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./LayoutStateOperationChangedEventArgs */ "./lib/core/LayoutStateOperationChangedEventArgs.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutStateOperationChangedEventArgs", function() { return _LayoutStateOperationChangedEventArgs__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./LayoutStrategyBase */ "./lib/core/LayoutStrategyBase.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutStrategyBase", function() { return _LayoutStrategyBase__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./LinearLayoutStrategy */ "./lib/core/LinearLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinearLayoutStrategy", function() { return _LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _MultiLineFishboneLayoutStrategy__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./MultiLineFishboneLayoutStrategy */ "./lib/core/MultiLineFishboneLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiLineFishboneLayoutStrategy", function() { return _MultiLineFishboneLayoutStrategy__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _MultiLineHangerLayoutStrategy__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./MultiLineHangerLayoutStrategy */ "./lib/core/MultiLineHangerLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiLineHangerLayoutStrategy", function() { return _MultiLineHangerLayoutStrategy__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Node */ "./lib/core/Node.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _Node__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _NodeLayoutInfo__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./NodeLayoutInfo */ "./lib/core/NodeLayoutInfo.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeLayoutInfo", function() { return _NodeLayoutInfo__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _Operation__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Operation */ "./lib/core/Operation.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Operation", function() { return _Operation__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Point */ "./lib/core/Point.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _Point__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _Rect__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Rect */ "./lib/core/Rect.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _Rect__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _SingleColumnLayoutStrategy__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./SingleColumnLayoutStrategy */ "./lib/core/SingleColumnLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleColumnLayoutStrategy", function() { return _SingleColumnLayoutStrategy__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _Size__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Size */ "./lib/core/Size.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return _Size__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _StackOrientation__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./StackOrientation */ "./lib/core/StackOrientation.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackOrientation", function() { return _StackOrientation__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./StackingLayoutStrategy */ "./lib/core/StackingLayoutStrategy.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackingLayoutStrategy", function() { return _StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _Step__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Step */ "./lib/core/Step.ts");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return _Step__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Utils */ "./lib/core/Utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return _Utils__WEBPACK_IMPORTED_MODULE_31__["peek"]; });


































































/***/ }),

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
/*! exports provided: default, Animated, Boundary, BoundaryChangedEventArgs, Box, BoxContainer, BoxTree, BranchParentAlignment, Connector, Diagram, DiagramLayoutSettings, DiagramLayoutTemplates, Dimensions, Edge, FishboneAssistantsLayoutStrategy, LayoutAlgorithm, LayoutLevel, LayoutState, LayoutStateOperationChangedEventArgs, LayoutStrategyBase, LinearLayoutStrategy, MultiLineFishboneLayoutStrategy, MultiLineHangerLayoutStrategy, Node, NodeLayoutInfo, Operation, Point, Rect, SingleColumnLayoutStrategy, Size, StackOrientation, StackingLayoutStrategy, Step, peek */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrgChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrgChart */ "./lib/OrgChart.tsx");
/* empty/unused harmony star reexport *//* harmony import */ var _Animated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Animated */ "./lib/Animated.tsx");
/* empty/unused harmony star reexport *//* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Animated", function() { return _Animated__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core */ "./lib/core/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Boundary", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Boundary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoundaryChangedEventArgs", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["BoundaryChangedEventArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Box"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoxContainer", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["BoxContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoxTree", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["BoxTree"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BranchParentAlignment", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["BranchParentAlignment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Connector", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Connector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Diagram", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Diagram"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiagramLayoutSettings", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["DiagramLayoutSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DiagramLayoutTemplates", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["DiagramLayoutTemplates"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Dimensions", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Dimensions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Edge", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Edge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FishboneAssistantsLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["FishboneAssistantsLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutAlgorithm", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LayoutAlgorithm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutLevel", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LayoutLevel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutState", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LayoutState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutStateOperationChangedEventArgs", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LayoutStateOperationChangedEventArgs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutStrategyBase", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LayoutStrategyBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinearLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["LinearLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiLineFishboneLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["MultiLineFishboneLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MultiLineHangerLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["MultiLineHangerLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Node"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodeLayoutInfo", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["NodeLayoutInfo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Operation", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Operation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Point"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rect", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Rect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleColumnLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["SingleColumnLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Size"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackOrientation", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["StackOrientation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackingLayoutStrategy", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["StackingLayoutStrategy"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["Step"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "peek", function() { return _core__WEBPACK_IMPORTED_MODULE_2__["peek"]; });



/* harmony default export */ __webpack_exports__["default"] = (_OrgChart__WEBPACK_IMPORTED_MODULE_0__["default"]);





/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var ReactVersion = '16.13.1';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  suspense: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var Resolved = 1;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var ReactDebugCurrentFrame = {};
var currentlyValidatingElement = null;
function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */
var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

    if (!hasExistingStack) {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  }
}

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

_assign(pureComponentPrototype, Component.prototype);

pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
    }
  }

  var propName; // Original props are copied

  var props = _assign({}, element.props); // Reserved names are extracted


  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];

function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;

  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}
/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {

      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
          }

          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';

      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }

      var childrenString = '' + children;

      {
        {
          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum );
        }
      }
    }
  }

  return subtreeCount;
}
/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}
/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;
  func.call(context, child, bookKeeping.count++);
}
/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */


function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;
  var mappedChild = func.call(context, child, bookKeeping.count++);

  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }

    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';

  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }

  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */


function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error( "React.Children.only expected to receive a single React element child." );
    }
  }

  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;

            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;

            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          defaultProps = newDefaultProps; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          propTypes = newPropTypes; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }

    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  if (!(dispatcher !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();

  {
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
    } // TODO: add a more generic warning for invalid values.


    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }

  setCurrentlyValidatingElement(element);

  {
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }

  setCurrentlyValidatingElement(null);
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var name = getComponentName(type);
    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      setCurrentlyValidatingElement(element);
      checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
      setCurrentlyValidatingElement(null);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    setCurrentlyValidatingElement(fragment);
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        break;
      }
    }

    if (fragment.ref !== null) {
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
    }

    setCurrentlyValidatingElement(null);
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;

      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    } // Legacy hook: remove it


    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

{

  try {
    var frozenObject = Object.freeze({});
    var testMap = new Map([[frozenObject, null]]);
    var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.

    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
  }
}

var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};

exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
  })();
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}


/***/ }),

/***/ "./spec/utils/Random.ts":
/*!******************************!*\
  !*** ./spec/utils/Random.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Random; });
class Random {
  constructor(seed) {
  }
  Next(range) {
    return Math.floor(Math.random() * range);
  }
}


/***/ }),

/***/ "./spec/utils/TestDataGen.ts":
/*!***********************************!*\
  !*** ./spec/utils/TestDataGen.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDataGen; });
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dist */ "./dist/index.js");
/* harmony import */ var _dist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dist__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Random */ "./spec/utils/Random.ts");


class TestDataGen {
  GenerateDataItems(dataSource, count, percentAssistants) {
    for (let item of this.GenerateRandomDataItems(count, percentAssistants)) {
      dataSource.Items.set(item.Id, item);
    }
  }
  GenerateRandomDataItems(itemCount, percentAssistants) {
    if (itemCount < 0) {
      throw new Error("ArgumentOutOfRangeException: " + itemCount + " - Count must be zero or positive");
    }
    let random = new _Random__WEBPACK_IMPORTED_MODULE_1__["default"](0);
    let items = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({
        Id: i.toString(),
        Date1: new Date(),
        ParentId: null,
        String1: null,
        String2: null,
        IsAssistant: false
      });
    }
    let firstInLayer = 1;
    let prevLayerSize = 1;
    while (firstInLayer < itemCount) {
      let layerSize = 15 + prevLayerSize + random.Next(prevLayerSize * 2);
      for (let i = firstInLayer; i < firstInLayer + layerSize && i < itemCount; i++) {
        let parentIndex = firstInLayer - 1 - random.Next(prevLayerSize);
        items[i].ParentId = items[parentIndex].Id;
      }
      firstInLayer = firstInLayer + layerSize;
      prevLayerSize = layerSize;
    }
    for (let i = 0; i < items.length / 2; i++) {
      let from = random.Next(items.length);
      let to = random.Next(items.length);
      let temp = items[from];
      items[from] = items[to];
      items[to] = temp;
    }
    if (percentAssistants > 0) {
      let assistantCount = Math.min(items.length, Math.round(Math.ceil(items.length * percentAssistants / 100)));
      for (let i = 0; i < assistantCount; i++) {
        items[random.Next(items.length)].IsAssistant = true;
      }
    }
    return items;
  }
  static GenerateBoxSizes(boxContainer) {
    const minWidth = 50;
    const minHeight = 50;
    const widthVariation = 50;
    const heightVariation = 50;
    let seed = 0;
    let random = new _Random__WEBPACK_IMPORTED_MODULE_1__["default"](seed);
    for (let box of boxContainer.BoxesById.values()) {
      if (!box.IsSpecial) {
        box.Size = new _dist__WEBPACK_IMPORTED_MODULE_2__["Size"](minWidth + random.Next(widthVariation), minHeight + random.Next(heightVariation));
      }
    }
  }
}


/***/ }),

/***/ "./spec/utils/TestDataSource.ts":
/*!**************************************!*\
  !*** ./spec/utils/TestDataSource.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDataSource; });
class TestDataSource {
  constructor() {
    this.Items = new Map();
    this.GetParentKeyFunc = (itemId) => this.GetParentKey(itemId);
    this.GetDataItemFunc = (itemId) => this.GetDataItem(itemId);
  }
  GetParentKey(itemId) {
    var _a;
    return ((_a = this.Items.get(itemId)) == null ? void 0 : _a.ParentId) || null;
  }
  GetDataItem(itemId) {
    const item = this.Items.get(itemId);
    if (!item) {
      throw Error("Could not find itemId");
    }
    return item;
  }
  get AllDataItemIds() {
    return [...this.Items.keys()].sort();
  }
}


/***/ }),

/***/ "./src/VanillaExample.ts":
/*!*******************************!*\
  !*** ./src/VanillaExample.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./lib/index.ts");
/* harmony import */ var _spec_utils_TestDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../spec/utils/TestDataSource */ "./spec/utils/TestDataSource.ts");
/* harmony import */ var _spec_utils_TestDataGen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spec/utils/TestDataGen */ "./spec/utils/TestDataGen.ts");



class ChartApp {
  constructor() {
    this.diagram = null;
    this.dataSource = null;
    this.suppressRootBox = false;
    this.totalBoxCount = 20;
    this.percentAssistants = 10;
    this.onLayoutStateChanged = (state, args) => {
      if (state.CurrentOperation === _lib__WEBPACK_IMPORTED_MODULE_0__["Operation"].PreprocessVisualTree) {
        this.renderBoxes();
      }
    };
    this.buildChart(true);
  }
  boxClick(boxId) {
    var _a;
    const box = (_a = this.diagram) == null ? void 0 : _a.Boxes.BoxesById.get(boxId);
    if (box) {
      box.IsCollapsed = !box.IsCollapsed;
      this.positionBoxes();
    }
  }
  buildChart(initData) {
    if (initData) {
      this.initDiagram();
    }
    this.positionBoxes();
  }
  collapseAllBoxes(boxContainer, isCollapsed) {
    for (const box of boxContainer.BoxesByDataId.values()) {
      if (!box.IsSpecial) {
        box.IsCollapsed = isCollapsed;
      }
    }
  }
  generateData() {
    const count = this.totalBoxCount;
    const percentAssistants = this.percentAssistants;
    const dataSource = new _spec_utils_TestDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
    new _spec_utils_TestDataGen__WEBPACK_IMPORTED_MODULE_2__["default"]().GenerateDataItems(dataSource, count, percentAssistants);
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
    $("#myDiagramDiv").html('<div id="myConnectors" class="chartConnectorsPlane"/>');
    const dataSource = this.generateData();
    this.dataSource = dataSource;
    const boxContainer = new _lib__WEBPACK_IMPORTED_MODULE_0__["BoxContainer"](dataSource);
    if ($("#CollapseAllOnRebuild")[0].checked) {
      this.collapseAllBoxes(boxContainer, true);
    }
    const diagram = this.diagram = new _lib__WEBPACK_IMPORTED_MODULE_0__["Diagram"]();
    diagram.Boxes = boxContainer;
    const linearLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["LinearLayoutStrategy"]();
    linearLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    diagram.LayoutSettings.LayoutStrategies.set("linear", linearLayoutStrategy);
    let multiLineHangerLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["MultiLineHangerLayoutStrategy"]();
    multiLineHangerLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 2;
    diagram.LayoutSettings.LayoutStrategies.set("hanger2", multiLineHangerLayoutStrategy);
    multiLineHangerLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["MultiLineHangerLayoutStrategy"]();
    multiLineHangerLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 4;
    diagram.LayoutSettings.LayoutStrategies.set("hanger4", multiLineHangerLayoutStrategy);
    let singleColumnLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["SingleColumnLayoutStrategy"]();
    singleColumnLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Right;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnRight", singleColumnLayoutStrategy);
    singleColumnLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["SingleColumnLayoutStrategy"]();
    singleColumnLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Left;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnLeft", singleColumnLayoutStrategy);
    let fishboneLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["MultiLineFishboneLayoutStrategy"]();
    fishboneLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    fishboneLayoutStrategy.MaxGroups = 1;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone1", fishboneLayoutStrategy);
    fishboneLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["MultiLineFishboneLayoutStrategy"]();
    fishboneLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    fishboneLayoutStrategy.MaxGroups = 2;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone2", fishboneLayoutStrategy);
    let hstackLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["StackingLayoutStrategy"]();
    hstackLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].InvalidValue;
    hstackLayoutStrategy.Orientation = _lib__WEBPACK_IMPORTED_MODULE_0__["StackOrientation"].SingleRowHorizontal;
    hstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("hstack", hstackLayoutStrategy);
    let vstackLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["StackingLayoutStrategy"]();
    vstackLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib__WEBPACK_IMPORTED_MODULE_0__["StackOrientation"].SingleColumnVertical;
    vstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("vstack", vstackLayoutStrategy);
    vstackLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["StackingLayoutStrategy"]();
    vstackLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib__WEBPACK_IMPORTED_MODULE_0__["StackOrientation"].SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 20;
    diagram.LayoutSettings.LayoutStrategies.set("vstackMiddle", vstackLayoutStrategy);
    vstackLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["StackingLayoutStrategy"]();
    vstackLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib__WEBPACK_IMPORTED_MODULE_0__["StackOrientation"].SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 50;
    diagram.LayoutSettings.LayoutStrategies.set("vstackTop", vstackLayoutStrategy);
    let assistantsLayoutStrategy = new _lib__WEBPACK_IMPORTED_MODULE_0__["FishboneAssistantsLayoutStrategy"]();
    assistantsLayoutStrategy.ParentAlignment = _lib__WEBPACK_IMPORTED_MODULE_0__["BranchParentAlignment"].Center;
    diagram.LayoutSettings.LayoutStrategies.set("assistants", assistantsLayoutStrategy);
    diagram.LayoutSettings.DefaultLayoutStrategyId = "fishbone1";
    diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
  }
  getBoxLevel(boxContainer, box) {
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
  renderBoxes() {
    var _a, _b, _c;
    let boxContainer = (_a = this.diagram) == null ? void 0 : _a.Boxes;
    let dataSource = this.dataSource;
    if (boxContainer == null) {
      throw Error("BoxContainer is null");
    }
    if (dataSource == null) {
      throw Error("DataSource is null");
    }
    const elements = [];
    const expanders = [];
    let visitorFunc = (node) => {
      let box = node.Element;
      if (box.IsDataBound) {
        let existing = $("#box" + box.Id);
        if (existing.length > 0) {
          let exp = $("#exp" + box.Id);
          if (node.State.IsHidden) {
            existing.hide();
            if (exp.length > 0)
              exp.hide();
          } else {
            existing.show();
            if (exp.length > 0)
              exp.show();
          }
          return true;
        } else if (node.State.IsHidden) {
          return true;
        }
        if (boxContainer == null) {
          throw Error("BoxContainer is null");
        }
        const level = this.getBoxLevel(boxContainer, box);
        const className = [null, "chartBoxTop", "chartBoxMiddle", "chartBoxLower"][level] || "chartBoxLowest";
        const position = [null, "Top", "Middle", "Lower"][level] || String(level);
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
        box.Size = this.getBoxElementSize(box.Id);
      }
      return true;
    };
    (_c = (_b = this.diagram) == null ? void 0 : _b.VisualTree) == null ? void 0 : _c.IterateParentFirst(visitorFunc);
    const myDiagramDiv = document.querySelector("#myDiagramDiv");
    if (myDiagramDiv) {
      for (const expander of expanders) {
        myDiagramDiv.appendChild(expander);
      }
      for (const element of elements) {
        myDiagramDiv.appendChild(element);
      }
    }
  }
  getBranchOptimizerName(node) {
    const selector = document.querySelector("input[name='SelectBranchOptimizer']:checked");
    const func = this["branchOptimizer" + (selector == null ? void 0 : selector.value)] || this.branchOptimizerAllLinear;
    return func(node);
  }
  branchOptimizerAllLinear(node) {
    return node.IsAssistantRoot ? null : "linear";
  }
  branchOptimizerAllHanger2(node) {
    return node.IsAssistantRoot ? null : "hanger2";
  }
  branchOptimizerAllHanger4(node) {
    return node.IsAssistantRoot ? null : "hanger4";
  }
  branchOptimizerAllFishbone1(node) {
    return node.IsAssistantRoot ? null : "fishbone1";
  }
  branchOptimizerAllFishbone2(node) {
    return node.IsAssistantRoot ? null : "fishbone2";
  }
  branchOptimizerAllSingleColumnLeft(node) {
    return node.IsAssistantRoot ? null : "singleColumnRight";
  }
  branchOptimizerAllSingleColumnRight(node) {
    return node.IsAssistantRoot ? null : "singleColumnLeft";
  }
  branchOptimizerStackers(node) {
    if (node.IsAssistantRoot) {
      return null;
    }
    return node.Level === 0 ? "vstackTop" : node.Level === 1 ? "vstackMiddle" : "hstack";
  }
  branchOptimizerSmart(node) {
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
  boxSizeFunc(dataId) {
    var _a, _b, _c, _d;
    const boxId = (_b = (_a = this.diagram) == null ? void 0 : _a.Boxes.BoxesByDataId.get(dataId)) == null ? void 0 : _b.Id;
    if (boxId == null) {
      throw Error("BoxId is null");
    }
    const size = (_d = (_c = this.diagram) == null ? void 0 : _c.Boxes.BoxesById.get(boxId)) == null ? void 0 : _d.Size;
    if (size == null) {
      throw Error("Size is null");
    }
    return size;
  }
  getBoxElementSize(boxId) {
    return new _lib__WEBPACK_IMPORTED_MODULE_0__["Size"](160, 50);
  }
  positionBoxes() {
    $("#myConnectors").html("");
    let diagram = this.diagram;
    if (diagram == null) {
      throw Error("Diagram is null");
    }
    let state = new _lib__WEBPACK_IMPORTED_MODULE_0__["LayoutState"](diagram);
    state.OperationChanged = this.onLayoutStateChanged;
    state.BoxSizeFunc = (dataId) => {
      if (dataId == null) {
        throw Error("DataId is null");
      }
      return this.boxSizeFunc(dataId);
    };
    state.LayoutOptimizerFunc = (node) => this.getBranchOptimizerName(node);
    _lib__WEBPACK_IMPORTED_MODULE_0__["LayoutAlgorithm"].Apply(state);
    if (diagram.VisualTree == null) {
      throw Error("diagram.VisualTree is null");
    }
    const diagramBoundary = _lib__WEBPACK_IMPORTED_MODULE_0__["LayoutAlgorithm"].ComputeBranchVisualBoundingRect(diagram.VisualTree);
    const myDiagramDiv = document.querySelector("#myDiagramDiv");
    if (myDiagramDiv == null) {
      throw Error("Cannot find #myDiagramDiv");
    }
    myDiagramDiv.style.width = `${diagramBoundary.Size.Width}px`;
    myDiagramDiv.style.height = `${diagramBoundary.Size.Height}px`;
    let offsetx = -diagramBoundary.Left;
    let offsety = -diagramBoundary.Top;
    const connectors = [];
    let visitorFunc = function(node) {
      if (node.State.IsHidden) {
        return false;
      }
      let box = node.Element;
      if (box.IsDataBound) {
        const element = document.querySelector(`#box${box.Id}`);
        if (element) {
          let x = node.State.TopLeft.X + offsetx;
          let y = node.State.TopLeft.Y + offsety;
          element.style.left = `${x}px`;
          element.style.top = `${y}px`;
          element.style.width = `${node.State.Size.Width}px`;
          element.style.height = `${node.State.Size.Height}px`;
          if (node.ChildCount > 0 || node.AssistantsRoot != null) {
            const exp = document.querySelector("#exp" + box.Id);
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
    if (myConnectors == null) {
      throw Error("myConnectors is null");
    }
    for (const connector of connectors) {
      myConnectors.appendChild(connector);
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded!");
  if (window.chartApp) {
    return;
  }
  const chartApp = window.chartApp = new ChartApp();
  window.changedSuppressRootBox = function changedSuppressRootBox(cb) {
    chartApp.suppressRootBox = cb.checked;
    chartApp.buildChart(true);
  };
  window.clickCollapseAll = function clickCollapseAll(bt) {
    if (chartApp.diagram == null) {
      throw Error("chartApp.diagram is null");
    }
    chartApp.collapseAllBoxes(chartApp.diagram.Boxes, true);
    chartApp.buildChart(false);
  };
  window.clickExpandAll = function clickExpandAll(bt) {
    if (chartApp.diagram == null) {
      throw Error("chartApp.diagram is null");
    }
    chartApp.collapseAllBoxes(chartApp.diagram.Boxes, false);
    chartApp.buildChart(false);
  };
  window.clickOptimizer = function clickOptimizer(rd) {
    chartApp.buildChart(false);
  };
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
      chartApp.totalBoxCount = 1e3;
      chartApp.percentAssistants = 5;
    }
    chartApp.buildChart(true);
  };
});


/***/ })

/******/ });
//# sourceMappingURL=vanilla.js.map