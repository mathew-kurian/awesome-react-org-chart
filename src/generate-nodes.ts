import TestDataSource from "../dist/test/TestDataSource";
import TestDataGen from "../dist/test/TestDataGen";
import faker from "faker";

export interface Node {
  id: string;
  children: string[];
  name: string;
  description: string;
  color: string;
}

export function isNode(obj: any): obj is Node {
  return obj != null && Array.isArray((obj as Node).children);
}

export default (count: number) => {
  const percentAssistants = 0;
  const dataSource = new TestDataSource();

  new TestDataGen().GenerateDataItems(dataSource, count, percentAssistants);

  const nodeMap: Map<string, Node> = new Map();

  for (const id of dataSource.AllDataItemIds) {
    const colors: string[] = [
      "#6a3fff",
      "#6a3fff",
      "#6a3fff",
      "#fe3efa",
      "#fea83e",
    ];

    const card = faker.helpers.createCard();
    const colorIndex = Math.floor(Math.random() * colors.length);

    nodeMap.set(id, {
      children: [],
      id,
      name: card.name,
      description: faker.hacker.phrase(),
      color: colors[colorIndex],
    });
  }

  let parentNode;
  let childrenSet = new Set<string>();

  for (const item of dataSource.Items.values()) {
    const id = item.Id;
    const parentId = dataSource.GetParentKeyFunc(id);

    if (childrenSet.has(id)) {
      continue;
    }

    childrenSet.add(id);

    if (parentId) {
      const node = nodeMap.get(parentId);
      node?.children.push(id);
    } else {
      parentNode = nodeMap.get(id);
    }
  }

  const nodes = [...nodeMap.values()].filter((node) => node !== parentNode);

  nodes.unshift(parentNode);

  return nodes;
};
