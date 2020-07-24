import Step from "./Step";
import Rect from "./Rect";
import Node from "./Node";
import Size from "./Size";
import Point from "./Point";
import LayoutAlgorithm from "./LayoutAlgorithm";

export default class Boundary {
  public Left: Step[];
  public Right: Step[];

  private _spacerMerger: Boundary | null = null;
  private _boundingRect: Rect | null = null;

  get BoundingRect(): Rect {
    if (this._boundingRect == null) {
      throw Error("BoundingRect is null");
    }

    return this._boundingRect;
  }

  set BoundingRect(value: Rect) {
    this._boundingRect = value;
  }

  constructor(frompublic: boolean = true) {
    this.Left = [];
    this.Right = [];

    if (frompublic) {
      this._spacerMerger = new Boundary(false);
    }
  }

  /// <summary>
  /// Resets the edges, use when re-using this object from pool.
  /// </summary>
  public PrepareForHorizontalLayout(node: Node): void {
    this.Prepare(node);

    if (node.Element.DisableCollisionDetection) {
      return;
    }

    var rect = node.State;

    this.Left.push(new Step(node, rect.Left, rect.Top, rect.Bottom));
    this.Right.push(new Step(node, rect.Right, rect.Top, rect.Bottom));
  }

  /// <summary>
  /// Resets the edges, use when re-using this object from pool.
  /// </summary>
  public Prepare(node: Node): void {
    this.Left.length = 0;
    this.Right.length = 0;

    if (node.State.Size == null) {
      throw Error("Size is null");
    }

    // adjust the top edge to fit the logical grid
    this.BoundingRect = Rect.from(node.State.Size, node.State.TopLeft);
  }

  /// <summary>
  /// Merges another boundary into this one, potentially pushing its edges out.
  /// </summary>
  public VerticalMergeFrom(other: Boundary): void {
    this.BoundingRect = Rect.add(this.BoundingRect, other.BoundingRect);
  }

  /// <summary>
  /// Merges another boundary into this one, potentially pushing its edges out.
  /// </summary>
  public MergeFrom(other: Boundary): void {
    if (other.BoundingRect.Top >= other.BoundingRect.Bottom) {
      throw new Error(
        "Cannot merge boundary of height " +
          (other.BoundingRect.Bottom - other.BoundingRect.Top)
      );
    }

    let merge = "r";
    while (merge != "\0") {
      let mySteps = merge == "r" ? this.Right : this.Left;
      let theirSteps = merge == "r" ? other.Right : other.Left;
      let i = 0;
      let k = 0;
      for (; k < theirSteps.length && i < mySteps.length; ) {
        let my = mySteps[i];
        let th = theirSteps[k];

        if (my.Bottom <= th.Top) {
          // haven't reached the top of their boundary yet
          i++;
          continue;
        }

        if (th.Bottom <= my.Top) {
          // haven't reached the top of my boundary yet
          mySteps[i] = th;
          k++;

          this.ValidateState();
          continue;
        }

        var theirWins = merge == "r" ? my.X <= th.X : my.X >= th.X;

        if (my.Top === th.Top) {
          if (my.Bottom === th.Bottom) {
            // case 1: exactly same length and vertical position
            // th: ********
            // my: ********
            if (theirWins) {
              mySteps[i] = th; // replace entire step
            }
            i++;
            k++;

            this.ValidateState();
          } else if (my.Bottom < th.Bottom) {
            // case 2: tops aligned, but my is shorter
            // th: ********
            // my: ***
            if (theirWins) {
              mySteps[i] = my.ChangeOwner(th.Node, th.X); // replace my with a piece of theirs
            }
            theirSteps[k] = th.ChangeTop(my.Bottom); // push their top down
            i++;

            this.ValidateState();
          } else {
            // case 3: tops aligned, but my is longer
            // th: ***
            // my: ********
            if (theirWins) {
              mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
              mySteps.splice(i, 0, th); // insert theirs before my
              i++;
            }
            k++;

            this.ValidateState();
          }
        } else if (my.Bottom == th.Bottom) {
          if (my.Top < th.Top) {
            // case 4: bottoms aligned, but my is longer
            // th:      ***
            // my: ********
            if (theirWins) {
              mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
              mySteps.splice(i + 1, 0, th); // insert theirs after my
              i++;
            }
            i++;
            k++;

            this.ValidateState();
          } else {
            // case 5: bottoms aligned, but my is shorter
            // th: ********
            // my:      ***
            if (theirWins) {
              // replace my with theirs, we're guaranteed not to offend my previous
              mySteps[i] = th;
            } else {
              // insert a piece of theirs before my, we're guaranteed not to offend my previous
              mySteps.splice(i, 0, th.ChangeBottom(my.Top));
              i++;
            }
            i++;
            k++;

            this.ValidateState();
          }
        } else if (my.Top < th.Top && my.Bottom < th.Bottom) {
          // case 6: their overlaps my bottom
          // th:     ********
          // my: *******
          if (theirWins) {
            mySteps[i] = my.ChangeBottom(th.Top); // contract myself to their top
            mySteps.splice(
              i + 1,
              0,
              new Step(th.Node, th.X, th.Top, my.Bottom)
            ); // insert a piece of theirs after my
            i++;
          }
          theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
          i++;

          this.ValidateState();
        } else if (my.Top < th.Top && my.Bottom > th.Bottom) {
          // case 7: their cuts my into three pieces
          // th:     *****
          // my: ************
          if (theirWins) {
            mySteps[i] = my.ChangeBottom(th.Top); // contract my to their top
            mySteps.splice(i + 1, 0, th); // insert their after my
            mySteps.splice(i + 2, 0, my.ChangeTop(th.Bottom)); // insert my tail after theirs
            i += 2;
          }
          k++;

          this.ValidateState();
        } else if (my.Bottom > th.Bottom) {
          // case 8: their overlaps my top
          // th: ********
          // my:    ********
          if (theirWins) {
            mySteps[i] = my.ChangeTop(th.Bottom); // contract my to their bottom
            // insert theirs before my, we're guaranteed not to offend my previous
            mySteps.splice(i, 0, th);
          } else {
            mySteps.splice(i, 0, th.ChangeBottom(my.Top));
          }
          i++;
          k++;

          this.ValidateState();
        } else {
          // case 9: their completely covers my
          // th: ************
          // my:    *****
          if (theirWins) {
            mySteps[i] = th.ChangeBottom(my.Bottom); // replace my with a piece of theirs
          } else {
            mySteps.splice(i, 0, th.ChangeBottom(my.Top));
            i++;
          }
          theirSteps[k] = th.ChangeTop(my.Bottom); // push theirs down
          i++;

          this.ValidateState();
        }
      }

      if (i == mySteps.length) {
        while (k < theirSteps.length) {
          mySteps.push(theirSteps[k]);
          k++;

          this.ValidateState();
        }
      }

      merge = merge == "r" ? "l" : "\0";
    }

    this.BoundingRect = Rect.add(this.BoundingRect, other.BoundingRect);
  }

  private ValidateState() {
    for (var i = 1; i < this.Left.length; i++) {
      if (
        this.Left[i].Top == this.Left[i].Bottom ||
        this.Left[i].Top < this.Left[i - 1].Bottom ||
        this.Left[i].Top <= this.Left[i - 1].Top ||
        this.Left[i].Bottom <= this.Left[i].Top ||
        this.Left[i].Bottom <= this.Left[i - 1].Bottom
      ) {
        throw new Error("State error at Left index " + i);
      }
    }

    for (var i = 1; i < this.Right.length; i++) {
      if (
        this.Right[i].Top == this.Right[i].Bottom ||
        this.Right[i].Top < this.Right[i - 1].Bottom ||
        this.Right[i].Top <= this.Right[i - 1].Top ||
        this.Right[i].Bottom <= this.Right[i].Top ||
        this.Right[i].Bottom <= this.Right[i - 1].Bottom
      ) {
        throw new Error("State error at Right index " + i);
      }
    }
  }

  /// <summary>
  /// Merges a box into this one, potentially pushing its edges out.
  /// </summary>
  public MergeFromNode(node: Node): void {
    if (node.Element.DisableCollisionDetection) {
      return;
    }

    if (!node.State.Size || LayoutAlgorithm.IsZero(node.State.Size.Height)) {
      return;
    }

    if (this._spacerMerger == null) {
      throw Error("SpaceMerger is null");
    }

    this._spacerMerger.PrepareForHorizontalLayout(node);

    this.MergeFrom(this._spacerMerger);
  }

  /// <summary>
  /// Returns max horizontal overlap between myself and <paramref name="other"/>.
  /// </summary>
  public ComputeOverlap(
    other: Boundary,
    siblingSpacing: number,
    branchSpacing: number
  ): number {
    let i = 0,
      k = 0;
    let offense = 0.0;

    while (i < this.Right.length && k < other.Left.length) {
      let my = this.Right[i];
      let th = other.Left[k];

      if (my.Bottom <= th.Top) {
        i++;
      } else if (th.Bottom <= my.Top) {
        k++;
      } else {
        if (
          !my.Node.Element.DisableCollisionDetection &&
          !th.Node.Element.DisableCollisionDetection
        ) {
          var desiredSpacing =
            my.Node.Element.IsSpecial || th.Node.Element.IsSpecial
              ? 0 // when dealing with spacers, no need for additional cushion around them
              : my.Node.Element.ParentId == th.Node.Element.ParentId
              ? siblingSpacing // two siblings kicking each other
              : branchSpacing; // these are two different branches

          var diff = my.X + desiredSpacing - th.X;
          if (diff > offense) {
            offense = diff;
          }
        }

        if (my.Bottom >= th.Bottom) {
          k++;
        }
        if (th.Bottom >= my.Bottom) {
          i++;
        }
      }
    }

    return offense;
  }

  public ReloadFromBranch(branchRoot: Node) {
    var leftmost = Number.MAX_VALUE;
    var rightmost = Number.MIN_VALUE;
    for (var i = 0; i < this.Left.length; i++) {
      var left = this.Left[i];
      var newLeft = left.Node.State.Left;
      this.Left[i] = left.ChangeX(newLeft);
      leftmost = Math.min(leftmost, newLeft);
    }

    for (var i = 0; i < this.Right.length; i++) {
      var right = this.Right[i];
      var newRight = right.Node.State.Right;
      this.Right[i] = right.ChangeX(newRight);
      rightmost = Math.max(rightmost, newRight);
    }

    leftmost = Math.min(branchRoot.State.Left, leftmost);
    rightmost = Math.max(branchRoot.State.Right, rightmost);

    this.BoundingRect = Rect.from(
      new Size(rightmost - leftmost, this.BoundingRect.Size.Height),
      new Point(leftmost, this.BoundingRect.Top)
    );
  }
}
