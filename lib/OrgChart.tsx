import React, { RefObject } from "react";
import Diagram from "./core/Diagram";
import BoxContainer from "./core/BoxContainer";
import LinearLayoutStrategy from "./core/LinearLayoutStrategy";
import StackingLayoutStrategy from "./core/StackingLayoutStrategy";
import MultiLineFishboneLayoutStrategy from "./core/MultiLineFishboneLayoutStrategy";
import SingleColumnLayoutStrategy from "./core/SingleColumnLayoutStrategy";
import BranchParentAlignment from "./core/BranchParentAlignment";
import StackOrientation from "./core/StackOrientation";
import LayoutState from "./core/LayoutState";
import Node from "./core/Node";
import Size from "./core/Size";
import LayoutAlgorithm from "./core/LayoutAlgorithm";
import MultiLineHangerLayoutStrategy from "./core/MultiLineHangerLayoutStrategy";
import FishboneAssistantsLayoutStrategy from "./core/FishboneAssistantsLayoutStrategy";
import IChartDataSource from "./core/IChartDataSource";
import IChartDataItem from "./core/IChartDataItem";
import LayoutStrategyBase from "./core/LayoutStrategyBase";

const NOOP_SIZE = new Size(5, 5);

const get3dOffset = (
  position: number,
  size: number | string,
  containerSize: number
): string => {
  if (typeof size === "string") {
    return position + "px";
  }

  return (position / containerSize) * 100 * (containerSize / size) + "%";
};

export interface Rect {
  top: number;
  left: number;
  height: number | string;
  width: number | string;
}

export interface Line {
  rect: Rect;
  direction: "vertical" | "horizontal";
  assistant: boolean;
  key: string;
}

export interface NodeRenderContext<T> {
  rect: Rect;
  data: T;
  dataId: string;
  boxId: number;
}

export interface NodeContainerRenderContext<T> {
  hidden: boolean;
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

interface OrgChartState<T> {
  lines: Line[];
  width: number;
  height: number;
  diagram: OrgChartDiagram<T> | null;
  nodes: NodeRenderContext<T>[];
  hidden: boolean;
}

export type NodeContainerRenderProps<T> = {
  "data-box-id": string;
  key: string;
  style: React.CSSProperties;
  children: React.ReactNode;
};

interface OrgChartProps<T> {
  root: T;
  keyGetter: (node: T) => string;
  childNodesGetter: (node: T) => T[];
  collapsedGetter?: (node: T) => boolean;
  lineVerticalClassName?: string;
  lineHorizontalClassName?: string;
  lineVerticalStyle?: React.CSSProperties;
  lineHorizontalStyle?: React.CSSProperties;
  layout?: LayoutType | LayoutStrategyBase;
  containerStyle?: React.CSSProperties;
  nodeContainerStyle?: React.CSSProperties;
  renderNode: (node: T) => React.ReactElement;
  renderNodeContainer?: (
    node: T,
    props: NodeContainerRenderProps<T>,
    context: NodeContainerRenderContext<T>
  ) => React.ReactElement;
  parentSpacing?: number;
  siblingSpacing?: number;
}

export default class OrgChart<T> extends React.Component<
  OrgChartProps<T>,
  OrgChartState<T>
> {
  state: OrgChartState<T> = {
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

  private createDiagram() {
    const {
      root,
      layout,
      parentSpacing = 40,
      siblingSpacing = 30,
    } = this.props;

    const dataSource = this.getDataSource(root);
    const boxContainer = new BoxContainer(dataSource);
    const diagram = new OrgChartDiagram<T>(dataSource);

    diagram.Boxes = boxContainer;

    const strategies = OrgChart.assignStrategies(diagram);

    if (layout instanceof LayoutStrategyBase) {
      diagram.LayoutSettings.LayoutStrategies.set("custom", layout);
    }

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
      return OrgChart.getBranchOptimizerSmart(node);
    } else if (layout === "stackers") {
      return OrgChart.getBranchOptimizerStackers(node);
    } else if (node.IsAssistantRoot) {
      return null;
    } else if (layout instanceof LayoutStrategyBase) {
      return "custom";
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
      const contexts: NodeRenderContext<T>[] = [];

      for (const box of diagram.Boxes.BoxesById.values()) {
        if (!box.IsDataBound) {
          continue;
        }

        const id = box.Id;
        const data = dataSource.GetDataItemFunc(box.DataId || "").data;

        contexts.push({
          rect: {
            left: 0,
            top: 0,
            width: "auto",
            height: "auto",
          },
          data,
          dataId: box.DataId || String(id),
          boxId: id,
        });
      }

      this.setState(
        {
          hidden: true,
          nodes: contexts,
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
        if (dataId == null) {
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

    const contexts: NodeRenderContext<T>[] = [];
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

        contexts.push({
          rect: {
            left: x,
            top: y,
            width: box.Size.Width,
            height: box.Size.Height,
          },
          data,
          dataId: dataId || String(box.Id),
          boxId: box.Id,
        });
      }

      // Render connectors
      if (node.State.Connector != null) {
        const segments = node.State.Connector.Segments;

        for (let ix = 0; ix < segments.length; ix++) {
          const edge = segments[ix];
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
            key: box.DataId + "-" + ix,
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
      nodes: contexts,
      hidden: false,
    });
  }

  // private tryDrawDiagram(
  //   diagram: OrgChartDiagram<T> | null = this.state.diagram
  // ) {
  //   if (diagram == null) {
  //     throw Error("Diagram is null");
  //   }

  //   this.drawDiagram(diagram);
  // }

  componentDidUpdate(prevProps: OrgChartProps<T>) {
    if (this.props !== prevProps) {
      this.createDiagram();
    }
  }

  render() {
    const {
      lines,
      width: containerWidth,
      height: containerHeight,
      nodes,
      hidden,
    } = this.state;
    const {
      lineVerticalClassName,
      lineHorizontalClassName,
      lineHorizontalStyle,
      lineVerticalStyle,
      containerStyle,
      renderNode,
      renderNodeContainer,
      nodeContainerStyle,
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
        style={{
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          ...containerStyle,
        }}
        ref={this._container}
      >
        {lines.map(
          ({
            rect: { width, height, left, top },
            assistant,
            direction,
            key,
          }) => (
            <div
              key={key}
              data-line-assistant={assistant}
              data-line-direction={direction}
              className={lineClassNames[direction]}
              style={{
                left: 0,
                top: 0,
                width,
                height,
                transform: `translate3d(${left}px, ${top}px, 0)`,
                position: "absolute",
                visibility: hidden ? "hidden" : "visible",
                pointerEvents: "none",
                ...lineStyles[direction],
              }}
            />
          )
        )}
        {nodes.map((context) => {
          const {
            rect: { top, left, width, height },
            dataId: key,
            boxId: dataBoxId,
            data,
          } = context;
          const children = renderNode(data);
          const style: React.CSSProperties = {
            left: 0,
            top: 0,
            transform: `translate3d(${get3dOffset(
              left,
              width,
              containerWidth
            )}, ${get3dOffset(top, height, containerHeight)}, 0)`,
            position: "absolute",
            ...nodeContainerStyle,
          };

          if (typeof renderNodeContainer === "function") {
            const props = {
              children,
              style,
              key,
              "data-box-id": String(dataBoxId),
            };

            return renderNodeContainer(data, props, { hidden });
          }

          return (
            <div
              key={key}
              style={{
                ...style,
                visibility: hidden ? "hidden" : "visible",
                pointerEvents: hidden ? "none" : "auto",
              }}
              data-box-id={dataBoxId}
            >
              {children}
            </div>
          );
        })}
      </div>
    );
  }
}
