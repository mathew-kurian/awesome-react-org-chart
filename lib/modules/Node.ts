import Box from "./Box";
import NodeLayoutInfo from "./NodeLayoutInfo";
import Func from "./Func";
import Predicate from "./Predicate";
import Action from "./Action";

export default class Node {
  Level: number = 0;
  Element: Box;
  State: NodeLayoutInfo;
  Children: Node[] = [];
  AssistantsRoot: Node | null = null;
  ParentNode: Node | null = null;

  get ChildCount(): number {
    return this.Children?.length || 0;
  }

  get IsAssistantRoot(): boolean {
    return this.ParentNode?.AssistantsRoot == this;
  }

  public AddAssistantChild(child: Node): Node {
    if (this.AssistantsRoot == null) {
      this.AssistantsRoot = new Node(
        Box.Special(Box.None, this.Element.Id, true)
      );

      this.AssistantsRoot.ParentNode = this;
      this.AssistantsRoot.Level = this.AssistantsRoot.Level + 1;
    }

    this.AssistantsRoot.AddRegularChild(child);

    return this;
  }

  /// <summary>
  /// Adds a new child to the list. Returns reference to self.
  /// </summary>
  public AddRegularChild(child: Node): Node {
    return this.InsertRegularChild(this.ChildCount, child);
  }

  public AddRegularChildBox(child: Box): Node {
    return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
  }

  /// <summary>
  /// Adds a new child to the list. Returns reference to self.
  /// </summary>
  public InsertRegularChildBox(child: Box) {
    return this.InsertRegularChildBoxByIndex(this.ChildCount, child);
  }

  /// <summary>
  /// Adds a new child to the list. Returns reference to self.
  /// </summary>
  public InsertRegularChildBoxByIndex(index: number, child: Box): Node {
    return this.InsertRegularChild(index, new Node(child));
  }

  /// <summary>
  /// Adds a new child to the list. Returns reference to self.
  /// </summary>
  public InsertRegularChild(index: number, child: Node): Node {
    if (this.Children == null) {
      this.Children = [];
    }

    this.Children.splice(index, 0, child);
    child.ParentNode = this;
    child.Level = this.Level + 1;

    return this;
  }

  constructor(element: Box) {
    this.Element = element;
    this.State = new NodeLayoutInfo();
  }

  IterateChildFirst(func: Func<Node, boolean>): boolean {
    if (this.AssistantsRoot != null) {
      if (!this.AssistantsRoot.IterateChildFirst(func)) {
        return false;
      }
    }

    if (this.Children != null) {
      for (const child of this.Children) {
        if (!child.IterateChildFirst(func)) {
          return false;
        }
      }
    }

    return func(this);
  }

  /// <summary>
  /// Goes through all elements depth-first. Applies <paramref name="enter"/> to the parent first, then to all children recursively.
  /// In this mode, children at each level decide for themselves whether they want to iterate further down,
  /// e.g. <paramref name="enter"/> can cut-off a branch.
  /// </summary>
  /// <param name="enter">A predicate to allow iteration of branch under this node</param>
  /// <param name="exit">An optional action to run afer iteration of some branch is complete</param>
  IterateParentFirst(enter: Predicate<Node>, exit?: Action<Node>): boolean {
    if (!enter(this)) {
      if (exit) {
        exit(this);
      }

      return false;
    }

    this.AssistantsRoot?.IterateParentFirst(enter, exit);

    if (this.Children != null) {
      for (const child of this.Children) {
        // Ignore returned value, in this mode children at each level
        // decide for themselves whether they want to iterate further down.
        child.IterateParentFirst(enter, exit);
      }
    }

    if (exit) {
      exit(this);
    }

    return true;
  }

  SuppressAssistants() {
    if (this.AssistantsRoot != null) {
      for (const child of this.AssistantsRoot.Children) {
        this.AddRegularChild(child);
      }

      this.AssistantsRoot = null;
    }
  }
}
