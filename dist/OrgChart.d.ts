import React from "react";
export declare type LayoutType = "linear" | "smart" | "fishbone1" | "fishbone2" | "singleColumnRight" | "singleColumnLeft" | "stackers";
interface TreeChartLayoutRenderProps<T> {
    data: T;
    size: {
        width: number;
        height: number;
    };
    setCollapsed: (collapsed: boolean) => void;
    collapsed: boolean;
    hidden: boolean;
    dataBound: boolean;
    level: number;
}
interface OrgChartProps<T> {
    root: T;
    layout?: LayoutType;
    containerStyle?: React.CSSProperties;
    keyGetter: (node: T) => string;
    childNodeGetter: (node: T) => T[];
    sizeGetter: (node: T, domElement: HTMLDivElement, reactElement: React.ReactElement) => {
        width: number;
        height: number;
    };
    renderNode: (node: T, props: Omit<TreeChartLayoutRenderProps<T>, "data">) => React.ReactElement;
    connectorVerticalStyle?: React.CSSProperties;
    connectorHorizontalStyle?: React.CSSProperties;
    connectorVerticalClassName?: string;
    connectorHorizontalClassName?: string;
    parentSpacing?: number;
    siblingSpacing?: number;
}
export default class OrgChart<T> extends React.Component<OrgChartProps<T>> {
    state: {
        ready: boolean;
    };
    private _mounted;
    private _innerContainer;
    private _treeLayout;
    componentDidMount(): void;
    componentWillUnmount(): void;
    delayedInit(): void;
    computeItems(root: T): any[];
    componentDidUpdate(prevProps: OrgChartProps<T>): void;
    delayedUpdate(prevProps: OrgChartProps<T>): void;
    renderNode(domNode: HTMLDivElement, props: TreeChartLayoutRenderProps<T>): {
        width: number;
        height: number;
    };
    render(): JSX.Element;
}
export {};
