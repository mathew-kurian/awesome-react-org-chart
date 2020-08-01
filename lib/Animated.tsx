import React from "react";
import {
  NodeContainerRenderContext,
  NodeContainerRenderProps,
  NodeLineRenderProps,
  NodeLineRenderContext,
} from "./OrgChart";

interface AnimatedProps<T> {
  node: T;
  props: NodeContainerRenderProps<T> | NodeLineRenderProps<T>;
  context: NodeContainerRenderContext<T> | NodeLineRenderContext<T>;
  defaultTransition?: string;
  entranceTransition?: string;
  getStyle?: (
    node: T,
    props: NodeContainerRenderProps<T> | NodeLineRenderProps<T>,
    context: NodeContainerRenderContext<T> | NodeLineRenderContext<T>
  ) => React.CSSProperties;
}

interface AnimatedState {
  transition: string;
  opacity: number;
  firstVisible: boolean;
}

export default class Animated<T> extends React.Component<
  AnimatedProps<T>,
  AnimatedState
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
    }: AnimatedProps<T>,
    state: AnimatedState
  ): Partial<AnimatedState> {
    if (context.hidden) {
      return { opacity: 0 };
    } else if (!state.firstVisible) {
      return { opacity: 1, transition: entranceTransition, firstVisible: true };
    } else {
      return { opacity: 1, transition: defaultTransition };
    }
  }

  render() {
    const { node, context, props, getStyle } = this.props;
    const { opacity, transition } = this.state;
    const style = getStyle ? getStyle(node, props, context) : null;

    return (
      <div
        {...props}
        style={{
          ...props.style,
          opacity,
          transition,
          ...style,
        }}
      />
    );
  }
}
