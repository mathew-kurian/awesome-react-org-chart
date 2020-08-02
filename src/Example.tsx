import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import OrgChart, {
  LayoutType,
  NodeContainerRenderContext,
  NodeContainerRenderProps,
  NodeLineRenderProps,
  NodeLineRenderContext,
  Animated,
} from "../lib/";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Grid from "react-fast-grid";
import generateNodes, { Node, isNode } from "./misc/generate-nodes";
import Header from "./misc/Header";
import CollapsedCards from "./misc/CollapsedCards";

interface ExampleState {
  layout: LayoutType;
  nodes: Node[];
  collapsed: WeakMap<Node, boolean>;
  debug: boolean;
}

export default class Example extends Component<{}, ExampleState> {
  state = {
    layout: "fishbone2" as LayoutType,
    nodes: generateNodes(20),
    collapsed: new WeakMap<Node, boolean>(),
    debug: false,
  };

  private _header: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const header: HTMLDivElement | null = this._header.current;

      if (header) {
        header.style.transform = `translate3d(0, -${window.scrollY}px, 0)`;
      }
    });
  }

  private setCollapsed(node: Node, isCollapsed: boolean) {
    const { collapsed } = this.state;

    collapsed.set(node, isCollapsed);

    this.setState({ collapsed });
  }

  private isCollapsed(node: Node): boolean {
    const { collapsed } = this.state;

    return collapsed.get(node) || false;
  }

  private renderNodeContainer = (
    node: Node,
    props: NodeContainerRenderProps<Node>,
    context: NodeContainerRenderContext<Node>
  ) => (
    <Animated
      key={props.key}
      node={node}
      props={props}
      context={context}
      getStyle={() => null}
    />
  );

  private renderNodeLine = (
    node: Node,
    props: NodeLineRenderProps<Node>,
    context: NodeLineRenderContext<Node>
  ) => (
    <Animated
      key={props.key}
      node={node}
      props={props}
      context={context}
      getStyle={() => ({
        [context.direction === "horizontal"
          ? "borderTop"
          : "borderLeft"]: "2px solid rgba(255,255,255,0.15)",
      })}
    />
  );

  private renderNode = (node: Node): React.ReactElement => {
    const collapsed = this.isCollapsed(node);
    const collapsedCards = collapsed && <CollapsedCards />;

    return (
      <div style={{ position: "relative", fontSize: "0.7em" }}>
        {collapsedCards}
        <Card
          style={{
            width: 250,
            borderRadius: 8,
            border: "none",
            boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
            background: node.color,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <Card.Body>
            <Card.Title>{node.name}</Card.Title>
            <Card.Text>{node.description}</Card.Text>
            {node.children.length > 0 && (
              <Grid.Strict
                container
                spacing={1}
                alignItems="center"
                style={{
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  pointerEvents: "all",
                }}
                onClick={() => this.setCollapsed(node, !collapsed)}
              >
                <Grid item>
                  {collapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </Grid>
                <Grid item>{collapsed ? "More" : "Less"}</Grid>
              </Grid.Strict>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  };

  private isAssistantGetter = (node: Node): boolean => {
    return !!node.isAssistant;
  };

  private lineHorizontalStyle: React.CSSProperties = {
    borderTop: "2px solid rgba(255,255,255,0.15)",
    transition: "800ms transform, 800ms width, 800ms height",
  };

  private lineVerticalStyle: React.CSSProperties = {
    borderLeft: "2px solid rgba(255,255,255,0.15)",
    transition: "800ms transform, 800ms width, 800ms height",
  };

  private containerStyle: React.CSSProperties = {
    margin: "20px auto",
    pointerEvents: "none",
    // transition: "800ms width, 800ms height",
  };

  private childNodesGetter = (node: Node) =>
    this.isCollapsed(node)
      ? []
      : node.children
          .map((id: string) => this.state.nodes.find((node) => node.id === id))
          .filter(isNode);

  private keyGetter = (node: Node) => String(node.id);

  private onSelectLayout = (layout: LayoutType) =>
    this.setState({
      layout,
    });

  private onSelectNodeCount = (count: number) =>
    this.setState({ nodes: generateNodes(count) });

  private isValidNode = (id: string): boolean => {
    return !!this.state.nodes.find((node) => node.id === id);
  };

  private setDebug = (debug: boolean) => {
    this.setState({ debug });
  };

  render() {
    const { layout, nodes, debug } = this.state;

    const header = (
      <Header
        debug={debug}
        isPlaceholder={true}
        nodeCount={nodes.length}
        layout={layout}
        setDebug={this.setDebug}
        onSelectLayout={this.onSelectLayout}
        onSelectNodeCount={this.onSelectNodeCount}
      />
    );

    return (
      <>
        {header}
        <Header {...header.props} isPlaceholder={false} ref={this._header} />
        {nodes.length && (
          <OrgChart
            // required
            root={nodes[0]}
            isValidNode={this.isValidNode}
            keyGetter={this.keyGetter}
            renderNode={this.renderNode}
            childNodesGetter={this.childNodesGetter}
            // optional (but recommended)
            lineHorizontalStyle={this.lineHorizontalStyle}
            lineVerticalStyle={this.lineVerticalStyle}
            // optional
            measureStrategy="timeout"
            isAssistantGetter={this.isAssistantGetter} // wip
            layout={layout}
            containerStyle={this.containerStyle}
            renderNodeContainer={this.renderNodeContainer}
            renderNodeLine={this.renderNodeLine}
            debug={debug}
          />
        )}
      </>
    );
  }
}
