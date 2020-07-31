import TestDataSource from "../lib/test/TestDataSource";
import TestDataGen from "../lib/test/TestDataGen";
import faker from "faker";

export interface Node {
  id: string;
  children: string[];
  name: string;
  description: string;
  color: string;
  isAssistant?: boolean;
}

export function isNode(obj: any): obj is Node {
  return obj != null && Array.isArray((obj as Node).children);
}
const simpleData: Node[] = [
  { id: "0", children: ["1", "2"], name: "0", description: "", color: "black" },
  {
    id: "1",
    children: ["3", "4", "5"],
    name: "1",
    description: "",
    color: "black",
  },
  {
    id: "2",
    children: ["6", "7", "8"],
    name: "2",
    description: "",
    color: "black",
  },
  {
    id: "3",
    children: [],
    name: "3",
    description: "",
    color: "black",
  },
  { id: "4", children: [], name: "4", description: "", color: "black" },
  { id: "5", children: [], name: "5", description: "", color: "black" },
  { id: "6", children: [], name: "6", description: "", color: "black" },
  { id: "7", children: [], name: "7", description: "", color: "black" },
  { id: "8", children: [], name: "8", description: "", color: "black" },
  { id: "9", children: [], name: "9", description: "", color: "black" },
  { id: "10", children: [], name: "10", description: "", color: "black" },
];

export { simpleData };

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
      isAssistant: dataSource.GetDataItem(id).IsAssistant,
    });
  }

  let parentNode: Node | null | undefined;
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

  if (!parentNode) {
    throw Error("Could not find parent node");
  }

  const nodes = [...nodeMap.values()].filter((node) => node !== parentNode);

  nodes.unshift(parentNode);

  return nodes;
};
