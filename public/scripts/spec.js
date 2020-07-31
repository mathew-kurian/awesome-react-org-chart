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
/******/ 	return __webpack_require__(__webpack_require__.s = "./spec/spec.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./lib/test/Random.ts":
/*!****************************!*\
  !*** ./lib/test/Random.ts ***!
  \****************************/
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

/***/ "./lib/test/TestDataGen.ts":
/*!*********************************!*\
  !*** ./lib/test/TestDataGen.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestDataGen; });
/* harmony import */ var _core_Size__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Size */ "./lib/core/Size.ts");
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Random */ "./lib/test/Random.ts");


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
        box.Size = new _core_Size__WEBPACK_IMPORTED_MODULE_0__["default"](minWidth + random.Next(widthVariation), minHeight + random.Next(heightVariation));
      }
    }
  }
}


/***/ }),

/***/ "./lib/test/TestDataSource.ts":
/*!************************************!*\
  !*** ./lib/test/TestDataSource.ts ***!
  \************************************/
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

/***/ "./spec/spec.ts":
/*!**********************!*\
  !*** ./spec/spec.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_core_Diagram__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/core/Diagram */ "./lib/core/Diagram.ts");
/* harmony import */ var _lib_core_BoxContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/core/BoxContainer */ "./lib/core/BoxContainer.ts");
/* harmony import */ var _lib_core_Operation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/core/Operation */ "./lib/core/Operation.ts");
/* harmony import */ var _lib_core_LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/core/LinearLayoutStrategy */ "./lib/core/LinearLayoutStrategy.ts");
/* harmony import */ var _lib_core_StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/core/StackingLayoutStrategy */ "./lib/core/StackingLayoutStrategy.ts");
/* harmony import */ var _lib_core_MultiLineFishboneLayoutStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/core/MultiLineFishboneLayoutStrategy */ "./lib/core/MultiLineFishboneLayoutStrategy.ts");
/* harmony import */ var _lib_core_SingleColumnLayoutStrategy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/core/SingleColumnLayoutStrategy */ "./lib/core/SingleColumnLayoutStrategy.ts");
/* harmony import */ var _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/core/BranchParentAlignment */ "./lib/core/BranchParentAlignment.ts");
/* harmony import */ var _lib_test_TestDataSource__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/test/TestDataSource */ "./lib/test/TestDataSource.ts");
/* harmony import */ var _lib_test_TestDataGen__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/test/TestDataGen */ "./lib/test/TestDataGen.ts");
/* harmony import */ var _lib_core_StackOrientation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/core/StackOrientation */ "./lib/core/StackOrientation.ts");
/* harmony import */ var _lib_core_LayoutState__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../lib/core/LayoutState */ "./lib/core/LayoutState.ts");
/* harmony import */ var _lib_core_Size__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../lib/core/Size */ "./lib/core/Size.ts");
/* harmony import */ var _lib_core_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../lib/core/LayoutAlgorithm */ "./lib/core/LayoutAlgorithm.ts");
/* harmony import */ var _lib_core_MultiLineHangerLayoutStrategy__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../lib/core/MultiLineHangerLayoutStrategy */ "./lib/core/MultiLineHangerLayoutStrategy.ts");
/* harmony import */ var _lib_core_FishboneAssistantsLayoutStrategy__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../lib/core/FishboneAssistantsLayoutStrategy */ "./lib/core/FishboneAssistantsLayoutStrategy.ts");
















class ChartApp {
  constructor() {
    this.suppressRootBox = false;
    this.totalBoxCount = 20;
    this.percentAssistants = 10;
    this.onLayoutStateChanged = (state, args) => {
      if (state.CurrentOperation === _lib_core_Operation__WEBPACK_IMPORTED_MODULE_2__["default"].PreprocessVisualTree) {
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
    const dataSource = new _lib_test_TestDataSource__WEBPACK_IMPORTED_MODULE_8__["default"]();
    new _lib_test_TestDataGen__WEBPACK_IMPORTED_MODULE_9__["default"]().GenerateDataItems(dataSource, count, percentAssistants);
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
    const boxContainer = new _lib_core_BoxContainer__WEBPACK_IMPORTED_MODULE_1__["default"](dataSource);
    if ($("#CollapseAllOnRebuild")[0].checked) {
      this.collapseAllBoxes(boxContainer, true);
    }
    const diagram = this.diagram = new _lib_core_Diagram__WEBPACK_IMPORTED_MODULE_0__["default"]();
    diagram.Boxes = boxContainer;
    const linearLayoutStrategy = new _lib_core_LinearLayoutStrategy__WEBPACK_IMPORTED_MODULE_3__["default"]();
    linearLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
    diagram.LayoutSettings.LayoutStrategies.set("linear", linearLayoutStrategy);
    let multiLineHangerLayoutStrategy = new _lib_core_MultiLineHangerLayoutStrategy__WEBPACK_IMPORTED_MODULE_14__["default"]();
    multiLineHangerLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 2;
    diagram.LayoutSettings.LayoutStrategies.set("hanger2", multiLineHangerLayoutStrategy);
    multiLineHangerLayoutStrategy = new _lib_core_MultiLineHangerLayoutStrategy__WEBPACK_IMPORTED_MODULE_14__["default"]();
    multiLineHangerLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
    multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 4;
    diagram.LayoutSettings.LayoutStrategies.set("hanger4", multiLineHangerLayoutStrategy);
    let singleColumnLayoutStrategy = new _lib_core_SingleColumnLayoutStrategy__WEBPACK_IMPORTED_MODULE_6__["default"]();
    singleColumnLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Right;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnRight", singleColumnLayoutStrategy);
    singleColumnLayoutStrategy = new _lib_core_SingleColumnLayoutStrategy__WEBPACK_IMPORTED_MODULE_6__["default"]();
    singleColumnLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Left;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnLeft", singleColumnLayoutStrategy);
    let fishboneLayoutStrategy = new _lib_core_MultiLineFishboneLayoutStrategy__WEBPACK_IMPORTED_MODULE_5__["default"]();
    fishboneLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
    fishboneLayoutStrategy.MaxGroups = 1;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone1", fishboneLayoutStrategy);
    fishboneLayoutStrategy = new _lib_core_MultiLineFishboneLayoutStrategy__WEBPACK_IMPORTED_MODULE_5__["default"]();
    fishboneLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
    fishboneLayoutStrategy.MaxGroups = 2;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone2", fishboneLayoutStrategy);
    let hstackLayoutStrategy = new _lib_core_StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_4__["default"]();
    hstackLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].InvalidValue;
    hstackLayoutStrategy.Orientation = _lib_core_StackOrientation__WEBPACK_IMPORTED_MODULE_10__["default"].SingleRowHorizontal;
    hstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("hstack", hstackLayoutStrategy);
    let vstackLayoutStrategy = new _lib_core_StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_4__["default"]();
    vstackLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib_core_StackOrientation__WEBPACK_IMPORTED_MODULE_10__["default"].SingleColumnVertical;
    vstackLayoutStrategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("vstack", vstackLayoutStrategy);
    vstackLayoutStrategy = new _lib_core_StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_4__["default"]();
    vstackLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib_core_StackOrientation__WEBPACK_IMPORTED_MODULE_10__["default"].SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 20;
    diagram.LayoutSettings.LayoutStrategies.set("vstackMiddle", vstackLayoutStrategy);
    vstackLayoutStrategy = new _lib_core_StackingLayoutStrategy__WEBPACK_IMPORTED_MODULE_4__["default"]();
    vstackLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].InvalidValue;
    vstackLayoutStrategy.Orientation = _lib_core_StackOrientation__WEBPACK_IMPORTED_MODULE_10__["default"].SingleColumnVertical;
    vstackLayoutStrategy.SiblingSpacing = 50;
    diagram.LayoutSettings.LayoutStrategies.set("vstackTop", vstackLayoutStrategy);
    let assistantsLayoutStrategy = new _lib_core_FishboneAssistantsLayoutStrategy__WEBPACK_IMPORTED_MODULE_15__["default"]();
    assistantsLayoutStrategy.ParentAlignment = _lib_core_BranchParentAlignment__WEBPACK_IMPORTED_MODULE_7__["default"].Center;
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
    if (!boxContainer) {
      return;
    }
    if (!dataSource) {
      return;
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
    let boxId = this.diagram.Boxes.BoxesByDataId.get(dataId).Id;
    return this.diagram.Boxes.BoxesById.get(boxId).Size;
  }
  getBoxElementSize(boxId) {
    return new _lib_core_Size__WEBPACK_IMPORTED_MODULE_12__["default"](160, 50);
  }
  positionBoxes() {
    $("#myConnectors").html("");
    let boxContainer = this.diagram.Boxes;
    let dataSource = this.dataSource;
    let diagram = this.diagram;
    let state = new _lib_core_LayoutState__WEBPACK_IMPORTED_MODULE_11__["default"](diagram);
    state.OperationChanged = this.onLayoutStateChanged;
    state.BoxSizeFunc = (dataId) => this.boxSizeFunc(dataId);
    state.LayoutOptimizerFunc = (node) => this.getBranchOptimizerName(node);
    console.log("positionBoxes");
    _lib_core_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_13__["default"].Apply(state);
    const diagramBoundary = _lib_core_LayoutAlgorithm__WEBPACK_IMPORTED_MODULE_13__["default"].ComputeBranchVisualBoundingRect(diagram.VisualTree);
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
    chartApp.collapseAllBoxes(chartApp.diagram.Boxes, true);
    chartApp.buildChart(false);
  };
  window.clickExpandAll = function clickExpandAll(bt) {
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
//# sourceMappingURL=spec.js.map