import IChartDataItem from "../modules/IChartDataItem";

export default interface TestDataItem extends IChartDataItem {
  /// <summary>
  /// Optional identifier of the parent data item.
  /// </summary>
  ParentId: string | null;
  /// <summary>
  /// Some string field.
  /// </summary>
  String1: string | null;
  /// <summary>
  /// Some string field.
  /// </summary>
  String2: string | null;
  /// <summary>
  /// Some date-time field.
  /// </summary>
  Date1: Date;
}
