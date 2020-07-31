import React from "react";
import Card from "react-bootstrap/Card";
// @ts-ignore
import { FadeTransform } from "react-animation-components";

const CollapsedCards = () => (
  <>
    <FadeTransform
      style={{
        top: 0,
        height: "100%",
        left: "-0.5%",
        width: "101%",
        position: "absolute",
      }}
      enterTransform="translateY(9%)"
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
        top: 0,
        height: "100%",
        left: "-0.5%",
        width: "101%",
        position: "absolute",
      }}
      enterTransform="translateY(6%)"
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
        top: 0,
        height: "100%",
        left: "-0.5%",
        width: "101%",
        position: "absolute",
      }}
      enterTransform="translateY(3%)"
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
