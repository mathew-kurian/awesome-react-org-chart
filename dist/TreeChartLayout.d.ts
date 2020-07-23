import "./vendor/bridge.collections";
import "./vendor/OrgChartLayout";
export default class TreeChartLayout {
    constructor(container: any, dataItems: any, { branchOptimizer, renderCallback, connectorVerticalStyle, connectorHorizontalStyle, connectorVerticalClassName, connectorHorizontalClassName, parentSpacing, siblingSpacing, }: {
        branchOptimizer: any;
        renderCallback: any;
        connectorVerticalStyle: any;
        connectorHorizontalStyle: any;
        connectorVerticalClassName: any;
        connectorHorizontalClassName: any;
        parentSpacing: any;
        siblingSpacing: any;
    });
    render(nodeContainer: any, dataItem: any, level: any, box: any): any;
    setSpacing({ parentSpacing, siblingSpacing }: {
        parentSpacing: any;
        siblingSpacing: any;
    }): void;
    setConnectorStyles({ connectorVerticalStyle, connectorHorizontalStyle, connectorVerticalClassName, connectorHorizontalClassName, }: {
        connectorVerticalStyle: any;
        connectorHorizontalStyle: any;
        connectorVerticalClassName: any;
        connectorHorizontalClassName: any;
    }): void;
    setBranchOptimizer(branchOptimizer: any): void;
    positionBoxes(): void;
    getDataSource(): any;
    setDataItems(dataItems: any): void;
    static createDataItem(id: any, parentId: any, data: any): any;
    buildChart(initData: any): void;
    init(): void;
}
