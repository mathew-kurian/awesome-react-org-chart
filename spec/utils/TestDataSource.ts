import { IChartDataSource, IChartDataItem } from "../../dist";
import TestDataItem from "./TestDataItem";

export default class TestDataSource implements IChartDataSource {
  /// <summary>
  /// All items.
  /// </summary>
  Items = new Map<string, TestDataItem>();

  /// <summary>
  /// Implementation for <see cref="IChartDataSource.GetParentKeyFunc"/>.
  /// </summary>
  GetParentKey(itemId: string): string | null {
    return this.Items.get(itemId)?.ParentId || null;
  }

  /// <summary>
  /// Implementation for <see cref="IChartDataSource.GetDataItemFunc"/>.
  /// </summary>
  GetDataItem(itemId: string): IChartDataItem {
    const item = this.Items.get(itemId);

    if (!item) {
      throw Error("Could not find itemId");
    }

    return item;
  }

  /// <summary>
  /// Access to all data items.
  /// </summary>
  get AllDataItemIds(): string[] {
    return [...this.Items.keys()].sort();
  }

  /// <summary>
  /// Delegate that provides information about parent-child relationship of boxes.
  /// First argument is the underlying data item id.
  /// Return value is the parent data item id.
  /// This one should be implemented by the underlying data source.
  /// </summary>
  GetParentKeyFunc = (itemId: string) => this.GetParentKey(itemId);

  /// <summary>
  /// Delegate that provides information about advanced properties of boxes.
  /// First argument is the underlying data item id.
  /// This one should be implemented by the underlying data source.
  /// </summary>
  GetDataItemFunc = (itemId: string) => this.GetDataItem(itemId);
}
