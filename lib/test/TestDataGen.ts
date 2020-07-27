import TestDataSource from "./TestDataSource";
import TestDataItem from "./TestDataItem";
import BoxContainer from "../core/BoxContainer";
import Size from "../core/Size";
import Random from "./Random";

export default class TestDataGen {
  /// <summary>
  /// Adds some data items into supplied <paramref name="dataSource"/>.
  /// </summary>
  GenerateDataItems(
    dataSource: TestDataSource,
    count: number,
    percentAssistants: number
  ) {
    for (let item of this.GenerateRandomDataItems(count, percentAssistants)) {
      dataSource.Items.set(item.Id, item);
    }
  }

  private GenerateRandomDataItems(
    itemCount: number,
    percentAssistants: number
  ): TestDataItem[] {
    if (itemCount < 0) {
      throw new Error(
        "ArgumentOutOfRangeException: " +
          itemCount +
          " - Count must be zero or positive"
      );
    }

    let random = new Random(0);
    let items: TestDataItem[] = [];

    for (let i = 0; i < itemCount; i++) {
      items.push({
        Id: i.toString(),
        Date1: new Date(),
        ParentId: null,
        String1: null,
        String2: null,
        IsAssistant: false,
      });
    }

    let firstInLayer = 1;
    let prevLayerSize = 1;
    while (firstInLayer < itemCount) {
      let layerSize = 15 + prevLayerSize + random.Next(prevLayerSize * 2);
      for (
        let i = firstInLayer;
        i < firstInLayer + layerSize && i < itemCount;
        i++
      ) {
        let parentIndex = firstInLayer - 1 - random.Next(prevLayerSize);
        items[i].ParentId = items[parentIndex].Id;
      }

      firstInLayer = firstInLayer + layerSize;
      prevLayerSize = layerSize;
    }

    // now shuffle the items a bit, to prevent clients from assuming that data always comes in hierarchical order
    for (let i = 0; i < items.length / 2; i++) {
      let from = random.Next(items.length);
      let to = random.Next(items.length);
      let temp = items[from];
      items[from] = items[to];
      items[to] = temp;
    }

    // now mark first five boxes
    if (percentAssistants > 0) {
      let assistantCount = Math.min(
        items.length,
        Math.round(Math.ceil((items.length * percentAssistants) / 100.0))
      );
      for (let i = 0; i < assistantCount; i++) {
        items[random.Next(items.length)].IsAssistant = true;
      }
    }

    return items;
  }

  /// <summary>
  /// Some random box sizes.
  /// </summary>
  static GenerateBoxSizes(boxContainer: BoxContainer) {
    const minWidth = 50;
    const minHeight = 50;
    const widthVariation = 50;
    const heightVariation = 50;

    let seed = 0; //Environment.TickCount;
    let random = new Random(seed);

    for (let box of boxContainer.BoxesById.values()) {
      if (!box.IsSpecial) {
        box.Size = new Size(
          minWidth + random.Next(widthVariation),
          minHeight + random.Next(heightVariation)
        );
      }
    }
  }
}
