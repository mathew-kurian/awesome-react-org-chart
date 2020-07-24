import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import TreeChartLayout from "./TreeChartLayout";

export type LayoutType =
  | "linear"
  | "smart"
  | "fishbone1"
  | "fishbone2"
  | "singleColumnRight"
  | "singleColumnLeft"
  | "stackers";

export interface TreeChartLayoutRenderCallbackProps<T> {
  data: T;
  size: { width: number; height: number };
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
  hidden: boolean;
  dataBound: boolean;
  level: number;
}

export type LayoutRenderProps<T> = Omit<
  TreeChartLayoutRenderCallbackProps<T>,
  "data"
>;

interface OrgChartProps<T> {
  root: T;
  layout?: LayoutType;
  containerStyle?: React.CSSProperties;
  keyGetter: (node: T) => string;
  childNodesGetter: (node: T) => T[];
  sizeGetter: (
    node: T,
    domElement: HTMLDivElement,
    reactElement: React.ReactElement
  ) => { width: number; height: number };
  renderNode: (node: T, props: LayoutRenderProps<T>) => React.ReactElement;
  connectorVerticalStyle?: React.CSSProperties;
  connectorHorizontalStyle?: React.CSSProperties;
  connectorVerticalClassName?: string;
  connectorHorizontalClassName?: string;
  parentSpacing?: number;
  siblingSpacing?: number;
}

export default class OrgChart<T> extends React.Component<OrgChartProps<T>> {
  state = {
    ready: false,
  };

  private _mounted: boolean = false;
  private _innerContainer: React.RefObject<HTMLDivElement> = React.createRef();
  private _treeLayout: TreeChartLayout | null = null;

  componentDidMount() {
    this._mounted = true;
    setTimeout(() => this.delayedInit(), 0);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  delayedInit() {
    if (!this._mounted) {
      return;
    }

    const container: HTMLDivElement | null = this._innerContainer?.current;

    if (container == null) {
      return;
    }

    const {
      root,
      connectorVerticalStyle,
      connectorHorizontalStyle,
      connectorVerticalClassName,
      connectorHorizontalClassName,
      layout = "linear",
      parentSpacing = 40,
      siblingSpacing = 30,
    } = this.props;

    const treeLayout = new TreeChartLayout(container, this.computeItems(root), {
      branchOptimizer: layout,
      connectorVerticalStyle,
      connectorHorizontalStyle,
      connectorVerticalClassName,
      connectorHorizontalClassName,
      parentSpacing,
      siblingSpacing,
      renderCallback: (
        node: HTMLDivElement,
        props: TreeChartLayoutRenderCallbackProps<T>
      ) => this.renderNode(node, props),
    });

    treeLayout.init();

    this._treeLayout = treeLayout;

    this.setState({ ready: true });
  }

  computeItems(root: T): any[] {
    const dataItems: any[] = [];

    const { childNodesGetter, keyGetter } = this.props;

    const processNode = (node: T, parentKey: string | null) => {
      const key = keyGetter(node);
      dataItems.push(TreeChartLayout.createDataItem(key, parentKey, node));

      for (const childNode of childNodesGetter(node)) {
        processNode(childNode, key);
      }
    };

    processNode(root, null);

    return dataItems;
  }

  componentDidUpdate(prevProps: OrgChartProps<T>) {
    setTimeout(() => this.delayedUpdate(prevProps), 0);
  }

  delayedUpdate(prevProps: OrgChartProps<T>) {
    if (!this.state.ready) {
      return;
    }

    if (!this._mounted) {
      return;
    }

    const treeLayout = this._treeLayout;

    if (treeLayout == null) {
      return;
    }

    const {
      connectorVerticalStyle,
      connectorHorizontalStyle,
      connectorVerticalClassName,
      connectorHorizontalClassName,
      layout = "linear",
      root,
      parentSpacing = 40,
      siblingSpacing = 30,
    } = this.props;

    const {
      parentSpacing: prevParentSpacing = 40,
      siblingSpacing: prevSiblingSpacing = 30,
    } = prevProps;

    treeLayout.setBranchOptimizer(layout);
    treeLayout.setConnectorStyles({
      connectorVerticalStyle,
      connectorHorizontalStyle,
      connectorVerticalClassName,
      connectorHorizontalClassName,
    });

    let rebuild = false;

    if (prevProps.root !== this.props.root) {
      treeLayout.setDataItems(this.computeItems(root));
      rebuild = true;
    }

    if (
      prevParentSpacing !== parentSpacing ||
      siblingSpacing !== prevSiblingSpacing
    ) {
      treeLayout.setSpacing({ parentSpacing, siblingSpacing });
      rebuild = true;
    }

    if (rebuild) {
      treeLayout.buildChart(true);
    } else {
      const renderCount = treeLayout.renderCount();

      treeLayout.positionBoxes();

      setTimeout(() => {
        if (this._mounted) {
          const nextRenderCount = treeLayout.renderCount();

          if (nextRenderCount === renderCount) {
            treeLayout.rerender();
          }
        }
      }, 0);
    }
  }

  renderNode(
    domNode: HTMLDivElement,
    props: TreeChartLayoutRenderCallbackProps<T>
  ): { width: number; height: number } {
    const { sizeGetter } = this.props;
    const { data: node, ...otherProps } = props;
    const reactElement = this.props.renderNode(node, otherProps);

    ReactDOM.render(reactElement, domNode);

    return sizeGetter(node, domNode, reactElement);
  }

  render() {
    const { containerStyle } = this.props;

    return (
      <div
        style={{ ...containerStyle, position: "relative" }}
        ref={this._innerContainer}
      />
    );
  }
}
