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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
// @ts-ignore
var TreeChartLayout_1 = __importDefault(require("./TreeChartLayout"));
var OrgChart = /** @class */ (function (_super) {
    __extends(OrgChart, _super);
    function OrgChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            ready: false,
        };
        _this._mounted = false;
        _this._innerContainer = react_1.default.createRef();
        _this._treeLayout = null;
        return _this;
    }
    OrgChart.prototype.componentDidMount = function () {
        var _this = this;
        this._mounted = true;
        setTimeout(function () { return _this.delayedInit(); }, 0);
    };
    OrgChart.prototype.componentWillUnmount = function () {
        this._mounted = false;
    };
    OrgChart.prototype.delayedInit = function () {
        var _this = this;
        var _a;
        if (!this._mounted) {
            return;
        }
        var container = (_a = this._innerContainer) === null || _a === void 0 ? void 0 : _a.current;
        if (container == null) {
            return;
        }
        var _b = this.props, root = _b.root, connectorVerticalStyle = _b.connectorVerticalStyle, connectorHorizontalStyle = _b.connectorHorizontalStyle, connectorVerticalClassName = _b.connectorVerticalClassName, connectorHorizontalClassName = _b.connectorHorizontalClassName, _c = _b.layout, layout = _c === void 0 ? "linear" : _c, _d = _b.parentSpacing, parentSpacing = _d === void 0 ? 40 : _d, _e = _b.siblingSpacing, siblingSpacing = _e === void 0 ? 30 : _e;
        var treeLayout = new TreeChartLayout_1.default(container, this.computeItems(root), {
            branchOptimizer: layout,
            connectorVerticalStyle: connectorVerticalStyle,
            connectorHorizontalStyle: connectorHorizontalStyle,
            connectorVerticalClassName: connectorVerticalClassName,
            connectorHorizontalClassName: connectorHorizontalClassName,
            parentSpacing: parentSpacing,
            siblingSpacing: siblingSpacing,
            renderCallback: function (node, props) { return _this.renderNode(node, props); },
        });
        treeLayout.init();
        this._treeLayout = treeLayout;
        this.setState({ ready: true });
    };
    OrgChart.prototype.computeItems = function (root) {
        var dataItems = [];
        var _a = this.props, childNodeGetter = _a.childNodeGetter, keyGetter = _a.keyGetter;
        var processNode = function (node, parentKey) {
            var e_1, _a;
            var key = keyGetter(node);
            dataItems.push(TreeChartLayout_1.default.createDataItem(key, parentKey, node));
            try {
                for (var _b = __values(childNodeGetter(node)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        return dataItems;
    };
    OrgChart.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        setTimeout(function () { return _this.delayedUpdate(prevProps); }, 0);
    };
    OrgChart.prototype.delayedUpdate = function (prevProps) {
        if (!this.state.ready) {
            return;
        }
        if (!this._mounted) {
            return;
        }
        var treeLayout = this._treeLayout;
        if (treeLayout == null) {
            return;
        }
        var _a = this.props, connectorVerticalStyle = _a.connectorVerticalStyle, connectorHorizontalStyle = _a.connectorHorizontalStyle, connectorVerticalClassName = _a.connectorVerticalClassName, connectorHorizontalClassName = _a.connectorHorizontalClassName, _b = _a.layout, layout = _b === void 0 ? "linear" : _b, root = _a.root, _c = _a.parentSpacing, parentSpacing = _c === void 0 ? 40 : _c, _d = _a.siblingSpacing, siblingSpacing = _d === void 0 ? 30 : _d;
        var _e = prevProps.parentSpacing, prevParentSpacing = _e === void 0 ? 40 : _e, _f = prevProps.siblingSpacing, prevSiblingSpacing = _f === void 0 ? 30 : _f;
        treeLayout.setBranchOptimizer(layout);
        treeLayout.setConnectorStyles({
            connectorVerticalStyle: connectorVerticalStyle,
            connectorHorizontalStyle: connectorHorizontalStyle,
            connectorVerticalClassName: connectorVerticalClassName,
            connectorHorizontalClassName: connectorHorizontalClassName,
        });
        var rebuild = false;
        if (prevProps.root !== this.props.root) {
            treeLayout.setDataItems(this.computeItems(root));
            rebuild = true;
        }
        if (prevParentSpacing !== parentSpacing ||
            siblingSpacing !== prevSiblingSpacing) {
            treeLayout.setSpacing({ parentSpacing: parentSpacing, siblingSpacing: siblingSpacing });
            rebuild = true;
        }
        if (rebuild) {
            treeLayout.buildChart(true);
        }
        else {
            treeLayout.positionBoxes();
        }
    };
    OrgChart.prototype.renderNode = function (domNode, props) {
        var sizeGetter = this.props.sizeGetter;
        var node = props.data, otherProps = __rest(props, ["data"]);
        var reactElement = this.props.renderNode(node, otherProps);
        react_dom_1.default.render(reactElement, domNode);
        return sizeGetter(node, domNode, reactElement);
    };
    OrgChart.prototype.render = function () {
        var containerStyle = this.props.containerStyle;
        return (react_1.default.createElement("div", { style: __assign(__assign({}, containerStyle), { position: "relative" }), ref: this._innerContainer }));
    };
    return OrgChart;
}(react_1.default.Component));
exports.default = OrgChart;
