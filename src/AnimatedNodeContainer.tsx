import React from "react";
import {
  NodeContainerRenderContext,
  NodeContainerRenderProps,
} from "../lib/OrgChart";
import { Node } from "./generate-nodes";

interface AnimatedNodeContainerProps {
  node: Node;
  props: NodeContainerRenderProps<Node>;
  context: NodeContainerRenderContext<Node>;
}

interface AnimatedNodeContainerState {
  transition: string;
  opacity: number;
  firstVisible: boolean;
}

export default class AnimatedNodeContainer extends React.Component<
  AnimatedNodeContainerProps,
  AnimatedNodeContainerState
> {
  state = {
    transition: "opacity 800ms",
    opacity: 0,
    firstVisible: false,
  };

  static getDerivedStateFromProps(
    { context }: AnimatedNodeContainerProps,
    state: AnimatedNodeContainerState
  ): Partial<AnimatedNodeContainerState> {
    if (context.hidden) {
      return { opacity: 0 };
    } else if (!state.firstVisible) {
      return { opacity: 1, transition: "opacity 800ms", firstVisible: true };
    } else {
      return { opacity: 1, transition: "transform 800ms" };
    }
  }

  render() {
    const { props } = this.props;
    const { opacity, transition } = this.state;

    return (
      <div
        {...props}
        style={{
          ...props.style,
          opacity,
          transition,
        }}
      />
    );
  }
}
