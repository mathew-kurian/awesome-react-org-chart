import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OrgChart2, { LayoutType } from "../lib/OrgChart2";
import TestDataSource from "../lib/test/TestDataSource";
import TestDataGen from "../lib/test/TestDataGen";
import faker from "faker";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Grid from "react-fast-grid";

const layouts: LayoutType[] = [
  "linear",
  "smart",
  "fishbone1",
  "fishbone2",
  "singleColumnRight",
  "singleColumnLeft",
  "stackers",
];

interface Node {
  id: string;
  children: string[];
  name: string;
  description: string;
  color: string;
}

interface AppState {
  layout: string;
  nodes: Node[];
  collapsed: WeakMap<Node, boolean>;
}

function isNode(obj: any): obj is Node {
  return obj != null && Array.isArray((obj as Node).children);
}

export default class App extends Component<void, AppState> {
  state = {
    layout: layouts[3],
    nodes: App.generateData(20),
    collapsed: new WeakMap<Node, boolean>(),
  };

  private static generateData(count: number): Node[] {
    const percentAssistants = 0;
    const dataSource = new TestDataSource();

    new TestDataGen().GenerateDataItems(dataSource, count, percentAssistants);

    const nodeMap: Map<string, Node> = new Map();

    for (const id of dataSource.AllDataItemIds) {
      const colors: string[] = [
        "#6a3fff",
        "#6a3fff",
        "#6a3fff",
        "#fe3efa",
        "#fea83e",
      ];

      const card = faker.helpers.createCard();
      const colorIndex = Math.floor(Math.random() * colors.length);

      nodeMap.set(id, {
        children: [],
        id,
        name: card.name,
        description: faker.hacker.phrase(),
        color: colors[colorIndex],
      });
    }

    let parentNode;

    for (const id of dataSource.AllDataItemIds) {
      const parentId = dataSource.GetParentKeyFunc(id);

      if (parentId) {
        const node = nodeMap.get(parentId);
        node?.children.push(id);
      } else {
        parentNode = nodeMap.get(id);
      }
    }

    const nodes = [...nodeMap.values()].filter((node) => node !== parentNode);

    nodes.unshift(parentNode);

    return nodes;
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

    return (
      <div style={{ padding: 20, paddingBottom: 50 }}>
        <h1 style={{ color: "#fff" }}>Awesome React OrgChart 👥 🤼</h1>
        <p style={{ color: "#fff" }}>
          Renders large organization charts with multiple compaction/packing
          techniques to improve readability and accessibility. Select a layout
          engine for the org chart
        </p>
        <br />
        <ButtonToolbar>
          <Dropdown style={{ marginRight: 10 }}>
            <Dropdown.Toggle variant="success">
              Select Layout: {layout}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {layouts.map((layout) => (
                <Dropdown.Item
                  key={layout}
                  onClick={() => this.setState({ layout })}
                >
                  {layout}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="info">
              Select Node Count: {nodes.length}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {[20, 50, 100, 200, 300, 500, 1000].map((count) => (
                <Dropdown.Item
                  key={count}
                  onClick={() =>
                    this.setState({ nodes: App.generateData(count) })
                  }
                >
                  {count}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
        <br />
        <div>
          <OrgChart2
            root={nodes[0]}
            keyGetter={(node) => String(node.id)}
            lineHorizontalStyle={{ borderTop: "2px solid #33385d" }}
            lineVerticalStyle={{ borderLeft: "2px solid #33385d" }}
            childNodesGetter={(node: Node) =>
              this.isCollapsed(node)
                ? []
                : node.children
                    .map((id: string) => nodes.find((node) => node.id === id))
                    .filter(isNode)
            }
            layout={layout}
            containerStyle={{ margin: "0 auto" }}
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
          />
        </div>
      </div>
    );
  }
}
