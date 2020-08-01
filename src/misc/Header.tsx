import React from "react";
import { LayoutType } from "../../lib/OrgChart";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
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

interface HeaderProps {
  isPlaceholder: boolean;
  nodeCount: number;
  layout: LayoutType;
  onSelectNodeCount: (count: number) => void;
  onSelectLayout: (layout: LayoutType) => void;
}

export default React.forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      isPlaceholder,
      nodeCount,
      layout,
      onSelectLayout,
      onSelectNodeCount,
    }: HeaderProps,
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        style={{
          padding: 30,
          paddingBottom: 300,
          marginBottom: -300,
          background: "#3c4165",
          position: isPlaceholder ? "relative" : "fixed",
          opacity: isPlaceholder ? 0 : 1,
          width: "100%",
          top: 0,
          left: 0,
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#fff" }}>Awesome React OrgChart 👥</h1>
        <p style={{ color: "#fff" }}>
          Renders large organization charts with multiple compaction/packing
          techniques to improve readability and accessibility. Select a layout
          engine for the org chart
        </p>
        <br />
        <br />
        <Grid container justify="center">
          <Grid item>
            <Button
              href="https://github.com/mathew-kurian/awesome-react-org-chart"
              style={{
                fontWeight: "bold",
                fontSize: "1em",
                borderRadius: 50,
                padding: "10px 30px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
              target="_blank"
              variant="outline-light"
            >
              Fork on Github
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                Select Layout: {layout}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {layouts.map((layout) => (
                  <Dropdown.Item
                    key={layout}
                    onClick={() => onSelectLayout(layout)}
                  >
                    {layout}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
          <Grid item>
            <Dropdown>
              <Dropdown.Toggle variant="info">
                Select Node Count: {nodeCount}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[0, 20, 50, 100, 200, 300, 500, 1000].map((count) => (
                  <Dropdown.Item
                    key={count}
                    onClick={() => onSelectNodeCount(count)}
                  >
                    {count}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid>
        <br />
        <br />
      </div>
    );
  }
);
