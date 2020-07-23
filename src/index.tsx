import React from "react";
import { render } from "react-dom";
import App from "./App";

const start = () =>
  render(
    <App>
      <p>Welcome to the boilerplate</p>
    </App>,
    document.getElementById("root")
  );

if (["complete", "interactive"].includes(document.readyState)) {
  start();
} else {
  document.addEventListener("DOMContentLoaded", start);
}

//@ts-ignore
window.module = {}; // obligatory line for now (TODO remove)
