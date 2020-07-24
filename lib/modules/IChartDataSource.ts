import Func from "./Func";
import IChartDataItem from "./IChartDataItem";

export default interface IChartDataSource {
  AllDataItemIds: string[];
  GetParentKeyFunc: Func<string, string>;
  GetDataItemFunc: Func<string, IChartDataItem>;
}
