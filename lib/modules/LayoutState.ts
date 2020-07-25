import Operation from "./Operation";
import LayoutStateOperationChangedEventArgs from "./LayoutStateOperationChangedEventArgs";
import Func from "./Func";
import Boundary from "./Boundary";
import LayoutLevel from "./LayoutLevel";
import Diagram from "./Diagram";
import Size from "./Size";
import BoxTree from "./BoxTree";
import Node from "./Node";
import BoundaryChangedEventArgs from "./BoundaryChangedEventArgs";
import Rect from "./Rect";
import LayoutAlgorithm from "./LayoutAlgorithm";
import { peek } from "./Utils";
import EventHandler from "./EventHandler";

export default class LayoutState {
  private _currentOperation: Operation = Operation.Idle;

  get CurrentOperation(): Operation {
    return this._currentOperation;
  }

  set CurrentOperation(value: Operation) {
    this._currentOperation = value;

    if (this.OperationChanged) {
      this.OperationChanged(
        this,
        new LayoutStateOperationChangedEventArgs(this)
      );
    }
  }

  private _layoutStack: LayoutLevel[] = [];
  private _pooledBoundaries: Boundary[] = [];

  Diagram: Diagram;
  BoxSizeFunc: Func<string | null, Size> | null = null;
  LayoutOptimizerFunc: Func<Node, string> | null = null;
  BoundaryChanged: EventHandler<
    LayoutState,
    BoundaryChangedEventArgs
  > | null = null;
  OperationChanged: EventHandler<
    LayoutState,
    LayoutStateOperationChangedEventArgs
  > | null = null;

  constructor(diagram: Diagram) {
    this.Diagram = diagram;
  }

  /// <summary>
  /// Initializes the visual tree and pool of boundary objects.
  /// </summary>
  public AttachVisualTree(tree: BoxTree) {
    while (this._pooledBoundaries.length < tree.Depth) {
      this._pooledBoundaries.push(new Boundary());
    }
  }

  PushLayoutLevel(node: Node): LayoutLevel {
    if (this._pooledBoundaries.length == 0) {
      this._pooledBoundaries.push(new Boundary());
    }

    const boundary = this._pooledBoundaries.pop();

    switch (this.CurrentOperation) {
      case Operation.VerticalLayout:
        boundary?.Prepare(node);
        break;

      case Operation.HorizontalLayout:
        boundary?.PrepareForHorizontalLayout(node);
        break;
      default:
        throw new Error(
          "This operation can only be invoked when performing vertical or horizontal layouts"
        );
    }

    if (boundary == null) {
      throw Error("Boundary cannot be null");
    }

    var result = new LayoutLevel(node, boundary);
    this._layoutStack.push(result);

    if (this.BoundaryChanged) {
      this.BoundaryChanged(
        this,
        new BoundaryChangedEventArgs(boundary, result, this)
      );
    }

    return result;
  }

  MergeSpacer(spacer: Node): void {
    if (this.CurrentOperation != Operation.HorizontalLayout) {
      throw new Error("Spacers can only be merged during horizontal layout");
    }

    if (this._layoutStack.length == 0) {
      throw new Error("Cannot merge spacers at top nesting level");
    }

    const level = peek(this._layoutStack);

    if (level == null) {
      throw Error("Level is null");
    }

    level.Boundary.MergeFromNode(spacer);

    if (this.BoundaryChanged) {
      this.BoundaryChanged(
        this,
        new BoundaryChangedEventArgs(level.Boundary, level, this)
      );
    }
  }

  PopLayoutLevel(): void {
    const innerLevel = this._layoutStack.pop();

    if (innerLevel == null) {
      throw Error("innerLevel is null");
    }

    if (this.BoundaryChanged) {
      this.BoundaryChanged(
        this,
        new BoundaryChangedEventArgs(innerLevel.Boundary, innerLevel, this)
      );
    }

    // if this was not the root, merge boundaries into current level
    if (this._layoutStack.length > 0) {
      const higherLevel = peek(this._layoutStack);

      if (higherLevel == null) {
        throw Error("higherLevel is null");
      }

      switch (this.CurrentOperation) {
        case Operation.VerticalLayout:
          higherLevel.Boundary.VerticalMergeFrom(innerLevel.Boundary);
          higherLevel.BranchRoot.State.BranchExterior =
            higherLevel.Boundary.BoundingRect;
          break;

        case Operation.HorizontalLayout:
          {
            // do not apply overlap adjustment for assistant branch, they are always above regular children
            if (
              higherLevel.BranchRoot.AssistantsRoot != innerLevel.BranchRoot
            ) {
              const strategy =
                higherLevel.BranchRoot.State.RequireLayoutStrategy;

              const overlap = higherLevel.Boundary.ComputeOverlap(
                innerLevel.Boundary,
                strategy.SiblingSpacing,
                this.Diagram.LayoutSettings.BranchSpacing
              );

              if (overlap > 0) {
                LayoutAlgorithm.MoveBranch(this, innerLevel, overlap);
                if (this.BoundaryChanged) {
                  this.BoundaryChanged(
                    this,
                    new BoundaryChangedEventArgs(
                      innerLevel.Boundary,
                      innerLevel,
                      this
                    )
                  );
                }
              }
            }
            higherLevel.Boundary.MergeFrom(innerLevel.Boundary);

            // Do not update branch vertical measurements from the boundary, because boundary adds children one-by-one.
            // If we take it from boundary, then branch vertical measurement will be incorrect until all children are laid out horizontally,
            // and this temporarily incorrect state will break those algorithms that need to know combined branch height.
            higherLevel.BranchRoot.State.BranchExterior = new Rect(
              higherLevel.Boundary.BoundingRect.Left,
              higherLevel.BranchRoot.State.BranchExterior?.Top,
              higherLevel.Boundary.BoundingRect.Size.Width,
              higherLevel.BranchRoot.State.BranchExterior?.Size.Height
            );
          }
          break;
        default:
          throw new Error(
            "This operation can only be invoked when performing vertical or horizontal layouts"
          );
      }

      if (this.BoundaryChanged) {
        this.BoundaryChanged(
          this,
          new BoundaryChangedEventArgs(higherLevel.Boundary, higherLevel, this)
        );
      }
    }

    // return boundary to the pool
    this._pooledBoundaries.push(innerLevel.Boundary);
  }
}
