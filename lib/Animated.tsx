import React from "react";
import {
  NodeContainerRenderContext,
  NodeContainerRenderProps,
  NodeLineRenderProps,
  NodeLineRenderContext,
} from "./OrgChart";
import { Transition } from "react-transition-group";

interface AnimatedProps<T> {
  node: T;
  props: NodeContainerRenderProps<T> | NodeLineRenderProps<T>;
  context: NodeContainerRenderContext<T> | NodeLineRenderContext<T>;
  duration?: number;
  getStyle?: (
    node: T,
    props: NodeContainerRenderProps<T> | NodeLineRenderProps<T>,
    context: NodeContainerRenderContext<T> | NodeLineRenderContext<T>
  ) => React.CSSProperties;
}

interface AnimatedState {
  entered: boolean;
}

export default class Animated<T> extends React.Component<
  AnimatedProps<T>,
  AnimatedState
> {
  state = {
    entered: false,
  };

  render() {
    const { node, context, props, getStyle, duration = 500 } = this.props;
    const { entered } = this.state;
    const style = getStyle ? getStyle(node, props, context) : null;

    const defaultStyle = {
      transition: entered
        ? `opacity ${duration}ms, 
           width ${duration}ms, 
           height ${duration}ms, 
           transform ${duration}ms`
        : `opacity ${duration}ms`,
      opacity: 0,
    };

    const transitionStyles: Record<string, React.CSSProperties> = {
      entering: { opacity: 0 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    };

    return (
      <Transition
        in={entered || !context.hidden}
        appear={!context.hidden}
        timeout={duration}
        exit={false}
        onEntered={() => this.setState({ entered: true })}
      >
        {(state: keyof typeof transitionStyles) => {
          return (
            <div
              {...props}
              style={{
                ...props.style,
                ...defaultStyle,
                ...transitionStyles[state],
                ...style,
              }}
            />
          );
        }}
      </Transition>
    );
  }
}
