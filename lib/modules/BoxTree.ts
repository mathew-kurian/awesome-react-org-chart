import Box from "./Box";
import Node from "./Node";
import Func from "./Func";
import Predicate from "./Predicate";
import Action from "./Action";
import LayoutState from "./LayoutState";

export default class BoxTree {
  Root: Node | null;
  Nodes: Map<number, Node>;
  Depth: number = 0;

  IterateChildFirst(func: Func<Node, boolean>): boolean {
    if (this.Root == null) {
      throw Error("Root is null");
    }

    return this.Root.IterateChildFirst(func);
  }

  IterateParentFirst(enter: Predicate<Node>, exit?: Action<Node>) {
    if (this.Root == null) {
      throw Error("Root is null");
    }

    this.Root.IterateParentFirst(enter, exit);
  }

  UpdateHierarchyStats() {
    this.Depth = 0;
    this.IterateParentFirst((x) => {
      if (x.ParentNode != null) {
        x.Level = x.ParentNode.Level;
        if (!x.ParentNode.IsAssistantRoot) {
          x.Level = x.Level + 1;
        }
        this.Depth = Math.max(1 + x.Level, this.Depth);
      } else {
        x.Level = 0;
        this.Depth = 1;
      }
      return true;
    });
  }

  constructor() {
    this.Root = null;
    this.Nodes = new Map<number, Node>();
  }

  static Build(state: LayoutState): BoxTree {
    const result = new BoxTree();

    // TODO convert to const
    let box: Box;
    for (box of state.Diagram.Boxes.BoxesById.values()) {
      const node = new Node(box);
      result.Nodes.set(box.Id, node);
    }

    // build the tree
    for (const node of result.Nodes.values()) {
      const parentKey = node.Element.ParentId;
      const parentNode: Node | undefined = result.Nodes.get(parentKey);

      if (parentNode) {
        if (
          node.Element.IsAssistant &&
          parentNode.Element.ParentId != Box.None
        ) {
          parentNode.AddAssistantChild(node);
        } else {
          parentNode.AddRegularChild(node);
        }
      } else {
        if (result.Root != null) {
          throw new Error(
            "InvalidOperationException: More then one root found: " +
              node.Element.Id
          );
        }

        result.Root = node;
      }
    }

    return result;
  }
}
