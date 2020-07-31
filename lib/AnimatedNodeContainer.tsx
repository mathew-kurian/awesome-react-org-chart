import React from "react";
import {
  NodeContainerRenderContext,
  NodeContainerRenderProps,
} from "./OrgChart";

interface AnimatedNodeContainerProps<T> {
  node: T;
  props: NodeContainerRenderProps<T>;
  context: NodeContainerRenderContext<T>;
  defaultTransition?: string;
  entranceTransition?: string;
}

interface AnimatedNodeContainerState {
  transition: string;
  opacity: number;
  firstVisible: boolean;
}

export default class AnimatedNodeContainer<T> extends React.Component<
  AnimatedNodeContainerProps<T>,
  AnimatedNodeContainerState
> {
  state = {
    transition: this.props.entranceTransition || "opacity 800ms",
    opacity: 0,
    firstVisible: false,
  };

  static getDerivedStateFromProps<T>(
    {
      context,
      defaultTransition = "transform 800ms, opacity 800ms",
      entranceTransition = "opacity 800ms",
    }: AnimatedNodeContainerProps<T>,
    state: AnimatedNodeContainerState
  ): Partial<AnimatedNodeContainerState> {
    if (context.hidden) {
      return { opacity: 0 };
    } else if (!state.firstVisible) {
      return { opacity: 1, transition: entranceTransition, firstVisible: true };
    } else {
      return { opacity: 1, transition: defaultTransition };
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
