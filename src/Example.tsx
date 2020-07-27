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

interface ExampleState {
  layout: LayoutType;
  nodes: Node[];
  collapsed: WeakMap<Node, boolean>;
}

const transition = "800ms opacity";
const collapsed = new WeakMap<Node, boolean>();

const NodeContainer = ({
  node,
  props,
  context,
}: {
  node: Node;
  props: NodeContainerRenderProps<Node>;
  context: NodeContainerRenderContext<Node>;
}): React.ReactElement => {
  const prevCollapsed = collapsed.get(node) || false;

  return (
    <div
      {...props}
      style={{
        ...props.style,
        opacity: context.hidden ? 0 : 1,
        transition: prevCollapsed ? "800ms opacity" : "800ms trasform",
      }}
    />
  );
};

export default class Example extends Component<{}, ExampleState> {
  state = {
    layout: "fishbone2" as LayoutType,
    nodes: generateNodes(20),
    collapsed,
  };

  _header: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    window.addEventListener("scroll", () => {
      const header: HTMLDivElement | null = this._header.current;

      if (header) {
        header.style.transform = `translate3d(0, -${window.scrollY}px, 0)`;
      }
    });
  }

  setCollapsed(node: Node, isCollapsed: boolean) {
    const { collapsed } = this.state;

    collapsed.set(node, isCollapsed);

    this.setState({ collapsed });
  }

  isCollapsed(node: Node): boolean {
    const { collapsed } = this.state;

    return collapsed.get(node) || false;
  }

  render() {
    const { layout, nodes } = this.state;

    const header = (
      <Header
        isPlaceholder={true}
        nodeCount={nodes.length}
        layout={layout}
        onSelectLayout={(layout) => this.setState({ layout })}
        onSelectNodeCount={(count) =>
          this.setState({ nodes: generateNodes(count) })
        }
      />
    );

    return (
      <>
        {header}
        <Header {...header.props} isPlaceholder={false} ref={this._header} />
        <OrgChart
          root={nodes[0]}
          keyGetter={(node) => String(node.id)}
          nodeContainerStyle={{ transition }}
          lineHorizontalStyle={{
            borderTop: "2px solid rgba(255,255,255,0.15)",
            transition: transition,
          }}
          lineVerticalStyle={{
            borderLeft: "2px solid rgba(255,255,255,0.15)",
            transition: transition,
          }}
          childNodesGetter={(node: Node) =>
            this.isCollapsed(node)
              ? []
              : node.children
                  .map((id: string) => nodes.find((node) => node.id === id))
                  .filter(isNode)
          }
          layout={layout}
          containerStyle={{
            margin: "20px auto",
            pointerEvents: "none",
            transition,
          }}
          renderNode={(node) => (
            <small>
              <Card
                style={{
                  width: 250,
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 3px 3px rgba(0,0,0,0.1)",
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
                      onClick={() =>
                        this.setCollapsed(node, !this.isCollapsed(node))
                      }
                    >
                      <Grid item>
                        {this.isCollapsed(node) ? (
                          <IoIosArrowDown />
                        ) : (
                          <IoIosArrowUp />
                        )}
                      </Grid>
                      <Grid item>
                        {this.isCollapsed(node) ? "More" : "Less"}
                      </Grid>
                    </Grid.Strict>
                  )}
                </Card.Body>
              </Card>
            </small>
          )}
          renderNodeContainer={(
            node: Node,
            props: NodeContainerRenderProps<Node>,
            context: NodeContainerRenderContext<Node>
          ) => (
            <NodeContainer
              key={props.key}
              node={node}
              props={props}
              context={context}
            />
          )}
        />
      </>
    );
  }
}
