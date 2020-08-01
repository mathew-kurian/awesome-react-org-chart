import React from "react";
import Card from "react-bootstrap/Card";
// @ts-ignore
import { FadeTransform } from "react-animation-components";

const CollapsedCards = () => (
  <>
    <FadeTransform
      style={{
        top: 6,
        left: -6,
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      enterTransform="transform3d(-9%, 9%, 0)"
      in
    >
      <Card
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 8,
          border: "none",
          boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
          background: "#6a3fff",
          color: "rgba(255,255,255,0.75)",
        }}
      />
    </FadeTransform>
    <FadeTransform
      style={{
        top: 4,
        left: -4,
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      enterTransform="transform3d(-6%, 6%, 0)"
      in
    >
      <Card
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 8,
          border: "none",
          boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
          background: "#fe3efa",
          color: "rgba(255,255,255,0.75)",
        }}
      />
    </FadeTransform>
    <FadeTransform
      style={{
        top: 2,
        left: -2,
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
      enterTransform="transform3d(-3%, 3%, 0)"
      in
    >
      <Card
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 8,
          border: "none",
          boxShadow: "0 3px 3px rgba(0,0,0,0.2)",
          background: "#fea83e",
          color: "rgba(255,255,255,0.75)",
        }}
      />
    </FadeTransform>
  </>
);

export default CollapsedCards;
