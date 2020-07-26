import Func from "./Func";
import IChartDataItem from "./IChartDataItem";

export default interface IChartDataSource<
  T extends IChartDataItem = IChartDataItem
> {
  AllDataItemIds: string[];
  GetParentKeyFunc: Func<string, string | null>;
  GetDataItemFunc: Func<string, T>;
}
