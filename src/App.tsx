import React, { Component } from "react";
import OrgChart, { LayoutType } from "../dist/OrgChart";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../lib/Test";

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
  id: number | string;
  name: string;
  children: (number | string)[];
}

function isNode(object: any): object is Node {
  return object != null && Array.isArray((object as Node).children);
}

const dataSets: Node[][] = [
  [
    { id: 0, name: "Johnny Cash", children: [1, "2a"] },
    { id: 1, name: "Logan James", children: [] },
    { id: "2a", name: "Kevin Smith", children: [3] },
    { id: 3, name: "Paul Knele", children: [4, 5] },
    { id: 4, name: "Jimmy Jones", children: [] },
    { id: 5, name: "Tommy Hille", children: [] },
  ],
  [
    { id: 0, name: "Kyle Matthew", children: [1, "2a"] },
    { id: 1, name: "James Kurian", children: [] },
    { id: "2a", name: "Usain Bolt", children: [] },
  ],
];

export default class App extends Component<
  void,
  {
    layout: string;
    dataSetIndex: number;
    globalCounter: number;
  }
> {
  state = {
    layout: layouts[0],
    dataSetIndex: 0,
    globalCounter: 0,
  };

  render() {
    const { layout, dataSetIndex, globalCounter } = this.state;
    const nodes = dataSets[dataSetIndex % dataSets.length];

    return (
      <div style={{ padding: 10, paddingBottom: 50 }}>
        <Breadcrumb>
          <Breadcrumb.Item>OrgChart</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Body>Select a layout engine for the org chart</Card.Body>
        </Card>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="success">
            Select Layout: {layout}
          </Dropdown.Toggle>
          {"   "}
          <Button
            variant="primary"
            onClick={() => this.setState({ dataSetIndex: dataSetIndex + 1 })}
          >
            Change Dataset
          </Button>
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
        <div>
          <OrgChart
            root={nodes[0]}
            keyGetter={(node) => String(node.id)}
            childNodesGetter={(node) =>
              node.children
                // @ts-ignore
                .map((id: string | number) =>
                  nodes.find((node) => node.id === id)
                )
                .filter(isNode)
            }
            layout={layout}
            connectorHorizontalStyle={{ borderTop: "2px solid gray" }}
            connectorVerticalStyle={{ borderLeft: "2px solid gray" }}
            sizeGetter={(node, domElement) =>
              domElement.getBoundingClientRect()
            }
            containerStyle={{ margin: "0 auto" }}
            renderNode={(node, { setCollapsed, collapsed }) => (
              <Card style={{ width: "25rem" }}>
                <Card.Body>
                  <div
                    style={{
                      backgroundImage: `url(https://randomuser.me/api/portraits/men/${Math.floor(
                        Math.random() * 25
                      )}.jpg)`,
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      backgroundSize: "cover",
                      float: "left",
                      marginRight: 20,
                    }}
                  />
                  <Card.Title>{node.name}</Card.Title>
                  <Card.Text>
                    Content marketing professional at HubSpot, an inbound
                    marketing and sales platform.
                  </Card.Text>
                  {node.children.length > 0 && (
                    <Button
                      variant="primary"
                      style={{ marginRight: 5 }}
                      onClick={() => setCollapsed(!collapsed)}
                    >
                      {collapsed ? "Expand" : "Collapse"}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      this.setState({ globalCounter: globalCounter + 1 })
                    }
                  >
                    Global Counter ({globalCounter})
                  </Button>
                </Card.Body>
              </Card>
            )}
          />
        </div>
      </div>
    );
  }
}
