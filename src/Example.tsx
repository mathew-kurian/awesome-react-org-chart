import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import OrgChart, {
  LayoutType,
  NodeContainerRenderContext,
  NodeContainerRenderProps,
} from "../lib/OrgChart";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Grid from "react-fast-grid";
import generateNodes, { Node, isNode } from "./generate-nodes";
import Header from "./Header";
import AnimatedNodeContainer from "./AnimatedNodeContainer";

interface ExampleState {
  layout: LayoutType;
  nodes: Node[];
  collapsed: WeakMap<Node, boolean>;
}

const CollapsedCards = () => (
  <>
    <Card
      style={{
        top: "-4%",
        height: "92%",
        left: "-4%",
        width: "108%",
        borderRadius: 8,
        border: "none",
        position: "absolute",
        boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
        background: "#fe3efa",
        color: "rgba(255,255,255,0.75)",
      }}
    />
    <Card
      style={{
        top: "-2%",
        height: "96%",
        left: "-2%",
        width: "104%",
        borderRadius: 8,
        border: "none",
        position: "absolute",
        boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
        background: "#fea83e",
        color: "rgba(255,255,255,0.75)",
      }}
    />
  </>
);

export default class Example extends Component<{}, ExampleState> {
  state = {
    layout: "fishbone2" as LayoutType,
    nodes: generateNodes(20),
    collapsed: new WeakMap<Node, boolean>(),
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
    <AnimatedNodeContainer
      key={props.key}
      node={node}
      props={props}
      context={context}
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

  render() {
    const { layout, nodes } = this.state;

    const header = (
      <Header
        isPlaceholder={true}
        nodeCount={nodes.length}
        layout={layout}
        onSelectLayout={this.onSelectLayout}
        onSelectNodeCount={this.onSelectNodeCount}
      />
    );

    return (
      <>
        {header}
        <Header {...header.props} isPlaceholder={false} ref={this._header} />
        <OrgChart
          // required
          root={nodes[0]}
          keyGetter={this.keyGetter}
          renderNode={this.renderNode}
          childNodesGetter={this.childNodesGetter}
          // optional (but recommended)
          lineHorizontalStyle={this.lineHorizontalStyle}
          lineVerticalStyle={this.lineVerticalStyle}
          // optional
          layout={layout}
          containerStyle={this.containerStyle}
          renderNodeContainer={this.renderNodeContainer}
        />
      </>
    );
  }
}
