import React, { RefObject } from "react";
import ReactDOM from "react-dom";
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
import IChartDataSource from "./core/IChartDataSource";
import IChartDataItem from "./core/IChartDataItem";
import LayoutStrategyBase from "./core/LayoutStrategyBase";

const NOOP_SIZE = new Size(5, 5);

interface Rect {
  top: number;
  left: number;
  height: number | string;
  width: number | string;
}

interface Line {
  rect: Rect;
  direction: "vertical" | "horizontal";
  assistant: boolean;
}

interface NodeRenderInfo<T> {
  top: number;
  left: number;
  data: T;
  id: number;
  collapsed: boolean;
}

export type LayoutType =
  | "linear"
  | "smart"
  | "fishbone1"
  | "fishbone2"
  | "singleColumnRight"
  | "singleColumnLeft"
  | "stackers";

interface OrgChartDataItem<T> extends IChartDataItem {
  data: T;
  parentKey: string | null;
}

class OrgChartDiagram<T> extends Diagram {
  DataSource: IChartDataSource<OrgChartDataItem<T>>;

  constructor(dataSource: IChartDataSource<OrgChartDataItem<T>>) {
    super();

    this.DataSource = dataSource;
  }
}

interface OrgChart2State<T> {
  lines: Line[];
  width: number;
  height: number;
  diagram: OrgChartDiagram<T> | null;
  nodes: NodeRenderInfo<T>[];
  hidden: boolean;
}

interface OrgChart2Props<T> {
  root: T;
  keyGetter: (node: T) => string;
  childNodesGetter: (node: T) => T[];
  collapsedGetter?: (node: T) => boolean;
  lineVerticalClassName?: string;
  lineHorizontalClassName?: string;
  lineVerticalStyle?: React.CSSProperties;
  lineHorizontalStyle?: React.CSSProperties;
  layout?: LayoutType;
  containerStyle?: React.CSSProperties;
  renderNode: (node: T) => React.ReactElement;
  parentSpacing?: number;
  siblingSpacing?: number;
}

export default class OrgChart2<T> extends React.Component<
  OrgChart2Props<T>,
  OrgChart2State<T>
> {
  state: OrgChart2State<T> = {
    lines: Array<Line>(),
    width: 0,
    height: 0,
    diagram: null,
    nodes: [],
    hidden: true,
  };

  _container: React.RefObject<HTMLDivElement> = React.createRef();

  private static assignStrategies(diagram: Diagram): LayoutStrategyBase[] {
    const strategies: LayoutStrategyBase[] = [];

    let strategy: LayoutStrategyBase;

    strategy = new LinearLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    diagram.LayoutSettings.LayoutStrategies.set("linear", strategy);

    strategies.push(strategy);

    strategy = new MultiLineHangerLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    (strategy as MultiLineHangerLayoutStrategy).MaxSiblingsPerRow = 2;
    diagram.LayoutSettings.LayoutStrategies.set("hanger2", strategy);

    strategies.push(strategy);

    strategy = new MultiLineHangerLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    (strategy as MultiLineHangerLayoutStrategy).MaxSiblingsPerRow = 4;
    diagram.LayoutSettings.LayoutStrategies.set("hanger4", strategy);

    strategies.push(strategy);

    strategy = new SingleColumnLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Right;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnRight", strategy);

    strategies.push(strategy);

    strategy = new SingleColumnLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Left;
    diagram.LayoutSettings.LayoutStrategies.set("singleColumnLeft", strategy);

    strategies.push(strategy);

    strategy = new MultiLineFishboneLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    (strategy as MultiLineFishboneLayoutStrategy).MaxGroups = 1;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone1", strategy);

    strategies.push(strategy);

    strategy = new MultiLineFishboneLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    (strategy as MultiLineFishboneLayoutStrategy).MaxGroups = 2;
    diagram.LayoutSettings.LayoutStrategies.set("fishbone2", strategy);

    strategies.push(strategy);

    strategy = new StackingLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    (strategy as StackingLayoutStrategy).Orientation =
      StackOrientation.SingleRowHorizontal;
    strategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("hstack", strategy);

    strategies.push(strategy);

    strategy = new StackingLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    (strategy as StackingLayoutStrategy).Orientation =
      StackOrientation.SingleColumnVertical;
    strategy.ParentChildSpacing = 10;
    diagram.LayoutSettings.LayoutStrategies.set("vstack", strategy);

    strategies.push(strategy);

    strategy = new StackingLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    (strategy as StackingLayoutStrategy).Orientation =
      StackOrientation.SingleColumnVertical;
    strategy.SiblingSpacing = 20;
    diagram.LayoutSettings.LayoutStrategies.set("vstackMiddle", strategy);

    strategies.push(strategy);

    strategy = new StackingLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.InvalidValue;
    (strategy as StackingLayoutStrategy).Orientation =
      StackOrientation.SingleColumnVertical;
    strategy.SiblingSpacing = 50;
    diagram.LayoutSettings.LayoutStrategies.set("vstackTop", strategy);

    strategies.push(strategy);

    strategy = new FishboneAssistantsLayoutStrategy();
    strategy.ParentAlignment = BranchParentAlignment.Center;
    diagram.LayoutSettings.LayoutStrategies.set("assistants", strategy);

    strategies.push(strategy);

    diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
    diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";

    return strategies;
  }

  getDataSource(root: T): IChartDataSource<OrgChartDataItem<T>> {
    const items: Map<string, OrgChartDataItem<T>> = new Map();
    const sortedKeys: string[] = [];
    const { childNodesGetter, keyGetter } = this.props;

    const processNode = (node: T, parentKey: string | null = null) => {
      const key = keyGetter(node);

      if (process.env.NODE_ENV !== "production") {
        if (!key) {
          throw Error("Invalid key");
        }

        if (items.has(key)) {
          throw Error("Duplicate key");
        }
      }

      sortedKeys.push(key);

      items.set(key, {
        IsAssistant: false,
        Id: key,
        data: node,
        parentKey,
      });

      for (const childNode of childNodesGetter(node)) {
        processNode(childNode, key);
      }
    };

    processNode(root, null);

    const getDataItem = (id: string) => {
      const item = items.get(id);

      if (item == null) {
        throw Error("Could not find item");
      }

      return item;
    };

    return {
      GetDataItemFunc: (id: string) => getDataItem(id),
      GetParentKeyFunc: (id: string) => items.get(id)?.parentKey || null,
      AllDataItemIds: sortedKeys,
    };
  }

  private static getBranchOptimizerStackers(node: Node): string | null {
    if (node.IsAssistantRoot) {
      return null;
    }
    return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
      ? "vstackTop"
      : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
      ? "vstackMiddle"
      : "hstack";
  }

  private static getBranchOptimizerSmart(node: Node): string | null {
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

  componentDidMount() {
    this.createDiagram();
  }

  private createDiagram(root: T = this.props.root) {
    const dataSource = this.getDataSource(root);
    const boxContainer = new BoxContainer(dataSource);
    const diagram = new OrgChartDiagram<T>(dataSource);

    diagram.Boxes = boxContainer;

    const strategies = OrgChart2.assignStrategies(diagram);
    const { parentSpacing = 40, siblingSpacing = 30 } = this.props;

    for (const strategy of strategies) {
      strategy.ChildConnectorHookLength = parentSpacing / 2;
      strategy.ParentChildSpacing = parentSpacing;
      strategy.SiblingSpacing = siblingSpacing;
    }

    this.setState({ diagram }, () => this.drawDiagram(diagram));
  }

  private onComputeBranchOptimizer = (node: Node): string | null => {
    const { layout = "linear" } = this.props;

    if (layout === "smart") {
      return OrgChart2.getBranchOptimizerSmart(node);
    } else if (layout === "stackers") {
      return OrgChart2.getBranchOptimizerStackers(node);
    } else if (node.IsAssistantRoot) {
      return null;
    } else {
      return layout;
    }
  };

  private drawDiagram(
    diagram: OrgChartDiagram<T>,
    computeSize: boolean = false
  ) {
    if (diagram !== this.state.diagram) {
      return;
    }

    if (!computeSize) {
      const dataSource = diagram.DataSource;
      const nodeRenderInfos: NodeRenderInfo<T>[] = [];

      for (const box of diagram.Boxes.BoxesById.values()) {
        if (!box.IsDataBound) {
          continue;
        }

        const id = box.Id;
        const data = dataSource.GetDataItemFunc(box.DataId || "").data;

        nodeRenderInfos.push({
          left: 0,
          top: 0,
          data,
          id: id,
          collapsed: box.IsCollapsed,
        });
      }

      this.setState(
        {
          hidden: true,
          nodes: nodeRenderInfos,
        },
        () => this.drawDiagram(diagram, true)
      );

      return;
    }

    const state = new LayoutState(diagram);
    const nodeMap: Map<number, HTMLDivElement> = new Map();

    if (computeSize) {
      const container: HTMLDivElement | null = this._container.current;

      if (container) {
        container.querySelectorAll("[data-box-id]").forEach((node: Element) => {
          const id = node.getAttribute("data-box-id");

          if (id) {
            nodeMap.set(parseInt(id), node as HTMLDivElement);
          }
        });
      }
    }

    // state.OperationChanged = this.onLayoutStateChanged;
    state.LayoutOptimizerFunc = this.onComputeBranchOptimizer;
    state.BoxSizeFunc = () => new Size(5, 5);

    if (computeSize) {
      state.BoxSizeFunc = (dataId: string | null) => {
        if (!dataId) {
          return NOOP_SIZE;
        }

        const box = diagram.Boxes.BoxesByDataId.get(dataId);

        if (box) {
          const element = nodeMap.get(box.Id);

          if (element) {
            const rect = element.getBoundingClientRect();

            return new Size(rect.width, rect.height);
          }
        }

        return NOOP_SIZE;
      };
    }

    LayoutAlgorithm.Apply(state);

    if (diagram.VisualTree == null) {
      throw Error("VisualTree is null");
    }

    const diagramBoundary = LayoutAlgorithm.ComputeBranchVisualBoundingRect(
      diagram.VisualTree
    );

    const offsetX = -diagramBoundary.Left;
    const offsetY = -diagramBoundary.Top;

    const nodes: NodeRenderInfo<T>[] = [];
    const lines: Line[] = [];

    diagram.VisualTree.IterateParentFirst((node: Node) => {
      if (node.State.IsHidden) {
        return false;
      }

      const box = node.Element;

      if (box.IsDataBound) {
        // All boxes have already been rendered before the chart layout,
        // to have all box sizes available before layout.
        // So now we only have to position them.
        // Connectors, however, are not rendered until layout is complete (see next block).

        const x = node.State.TopLeft.X + offsetX;
        const y = node.State.TopLeft.Y + offsetY;
        const dataId = box.DataId || "";
        const { data } = diagram.DataSource.GetDataItemFunc(dataId);

        nodes.push({
          left: x,
          top: y,
          data,
          id: box.Id,
          collapsed: box.IsCollapsed,
        });
      }

      // Render connectors
      if (node.State.Connector != null) {
        for (let ix = 0; ix < node.State.Connector.Segments.length; ix++) {
          const edge = node.State.Connector.Segments[ix];
          let direction: "horizontal" | "vertical" = "horizontal";
          let assistant = node.IsAssistantRoot;
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
            rect: {
              left: topLeft.X + offsetX,
              top: topLeft.Y + offsetY,
              width,
              height,
            },
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
      hidden: false,
    });
  }

  private tryDrawDiagram(
    diagram: OrgChartDiagram<T> | null = this.state.diagram
  ) {
    if (diagram == null) {
      throw Error("Diagram is null");
    }

    this.drawDiagram(diagram);
  }

  componentDidUpdate(prevProps: OrgChart2Props<T>) {
    if (this.props !== prevProps) {
      this.createDiagram(prevProps.root);
    }
  }

  render() {
    const { lines, width, height, nodes, hidden } = this.state;
    const {
      lineVerticalClassName,
      lineHorizontalClassName,
      lineHorizontalStyle,
      lineVerticalStyle,
      containerStyle,
      renderNode,
    } = this.props;

    const lineClassNames: Record<Line["direction"], string | undefined> = {
      vertical: lineVerticalClassName,
      horizontal: lineHorizontalClassName,
    };

    const lineStyles: Record<
      Line["direction"],
      React.CSSProperties | undefined
    > = {
      vertical: lineVerticalStyle,
      horizontal: lineHorizontalStyle,
    };

    return (
      <div
        style={{ width, height, position: "relative", ...containerStyle }}
        ref={this._container}
      >
        {lines.map(({ rect, assistant, direction }, index) => (
          <div
            key={index}
            data-line-assistant={assistant}
            data-line-direction={direction}
            className={lineClassNames[direction]}
            style={{
              ...rect,
              position: "absolute",
              ...lineStyles[direction],
              opacity: hidden ? 0 : 1,
            }}
          />
        ))}
        {nodes.map(({ top, left, id, data }, index) => (
          <div
            key={index}
            style={{
              top,
              left,
              opacity: hidden ? 0 : 1,
              position: "absolute",
            }}
            data-box-id={id}
          >
            {renderNode(data)}
          </div>
        ))}
      </div>
    );
  }
}
