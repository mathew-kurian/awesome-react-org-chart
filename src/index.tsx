import React from "react";
import { render } from "react-dom";
import Example from "./Example";

const start = () => render(<Example />, document.getElementById("root"));

if (["complete", "interactive"].includes(document.readyState)) {
  start();
} else {
  document.addEventListener("DOMContentLoaded", start);
}

//@ts-ignore
window.module = {}; // obligatory line for now (TODO remove)
