/**
 * @version 1.0.0.0
 * @author Roman Polunin
 * @copyright Copyright © Roman Polunin 2016
 * @compiler Bridge.NET 15.6.0
 */
Bridge.assembly("OrgChart.Layout", function ($asm, globals) {
  "use strict";

  /** @namespace OrgChart.Annotations */

  /**
   * TODO: remove.
   *
   * @public
   * @class OrgChart.Annotations.CanBeNullAttribute
   * @augments System.Attribute
   */
  Bridge.define("OrgChart.Annotations.CanBeNullAttribute", {
    inherits: [System.Attribute],
  });

  /**
   * Describes dependency between method input and output.
   *
   * @public
   * @class OrgChart.Annotations.ContractAnnotationAttribute
   * @augments System.Attribute
   */
  Bridge.define("OrgChart.Annotations.ContractAnnotationAttribute", {
    inherits: [System.Attribute],
    config: {
      properties: {
        /**
         * Text of the contract.
         *
         * @instance
         * @public
         * @this OrgChart.Annotations.ContractAnnotationAttribute
         * @memberof OrgChart.Annotations.ContractAnnotationAttribute
         * @function getContract
         * @return  {string}
         */
        /**
         * Text of the contract.
         *
         * @instance
         * @private
         * @this OrgChart.Annotations.ContractAnnotationAttribute
         * @memberof OrgChart.Annotations.ContractAnnotationAttribute
         * @function setContract
         * @param   {string}    value
         * @return  {void}
         */
        Contract: null,
        /**
         * Require full list of states/possible values for covered member.
         *
         * @instance
         * @public
         * @this OrgChart.Annotations.ContractAnnotationAttribute
         * @memberof OrgChart.Annotations.ContractAnnotationAttribute
         * @function getForceFullStates
         * @return  {boolean}
         */
        /**
         * Require full list of states/possible values for covered member.
         *
         * @instance
         * @private
         * @this OrgChart.Annotations.ContractAnnotationAttribute
         * @memberof OrgChart.Annotations.ContractAnnotationAttribute
         * @function setForceFullStates
         * @param   {boolean}    value
         * @return  {void}
         */
        ForceFullStates: false,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Annotations.ContractAnnotationAttribute
     * @memberof OrgChart.Annotations.ContractAnnotationAttribute
     * @param   {string}    contract
     * @return  {void}
     */
    ctor: function (contract) {
      OrgChart.Annotations.ContractAnnotationAttribute.$ctor1.call(
        this,
        contract,
        false
      );
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Annotations.ContractAnnotationAttribute
     * @memberof OrgChart.Annotations.ContractAnnotationAttribute
     * @param   {string}     contract
     * @param   {boolean}    forceFullStates
     * @return  {void}
     */
    $ctor1: function (contract, forceFullStates) {
      this.$initialize();
      System.Attribute.ctor.call(this);
      this.setContract(contract);
      this.setForceFullStates(forceFullStates);
    },
  });

  /**
   * TODO: remove.
   *
   * @public
   * @class OrgChart.Annotations.NotNullAttribute
   * @augments System.Attribute
   */
  Bridge.define("OrgChart.Annotations.NotNullAttribute", {
    inherits: [System.Attribute],
  });

  /**
   * Indicates that a method does not make any observable state changes.
   The same as <pre><code>System.Diagnostics.Contracts.PureAttribute</code></pre>.
   *
   * @public
   * @class OrgChart.Annotations.PureAttribute
   * @augments System.Attribute
   * @example
   *
   * [Pure] int Multiply(int x, int y) => x * y;
   * void M() {
   *   Multiply(123, 42); // Waring: Return value of pure method is not used
   * }
   * 
   *
   *
   */
  Bridge.define("OrgChart.Annotations.PureAttribute", {
    inherits: [System.Attribute],
  });

  /** @namespace OrgChart.Layout */

  /**
   * Left and right edges of some group of boxes.
   *
   * @public
   * @class OrgChart.Layout.Boundary
   */
  Bridge.define("OrgChart.Layout.Boundary", {
    /**
       * Left edge. Each element is a point in some logical space.
       Vertical position is determined by the index of the element offset from Top,
       using certain resolution (resolution is defined externally).
       *
       * @instance
       */
    Left: null,
    /**
     * Right edge. Each element is a point in some logical space.
     *
     * @instance
     */
    Right: null,
    /**
     * A temporary Boundary used for merging Boxes in, since they don't come with their own Boundary.
     *
     * @instance
     */
    m_spacerMerger: null,
    config: {
      properties: {
        /**
         * Bounding rectangle.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.Boundary
         * @memberof OrgChart.Layout.Boundary
         * @function getBoundingRect
         * @return  {OrgChart.Layout.Rect}
         */
        /**
         * Bounding rectangle.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.Boundary
         * @memberof OrgChart.Layout.Boundary
         * @function setBoundingRect
         * @param   {OrgChart.Layout.Rect}    value
         * @return  {void}
         */
        BoundingRect: null,
      },
      init: function () {
        this.BoundingRect = new OrgChart.Layout.Rect();
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @return  {void}
     */
    ctor: function () {
      OrgChart.Layout.Boundary.$ctor1.call(this, true);
    },
    $ctor1: function (frompublic) {
      this.$initialize();
      this.Left = new (System.Collections.Generic.List$1(
        OrgChart.Layout.Boundary.Step
      ))();
      this.Right = new (System.Collections.Generic.List$1(
        OrgChart.Layout.Boundary.Step
      ))();

      if (frompublic) {
        this.m_spacerMerger = new OrgChart.Layout.Boundary.$ctor1(false);
      }
    },
    /**
     * Resets the edges, use when re-using this object from pool.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PrepareForHorizontalLayout: function (node) {
      this.Prepare(node);

      if (node.getElement().DisableCollisionDetection) {
        return;
      }

      var rect = node.getState();

      // if (node.Element.DataId === "2") {
      //   debugger;
      // }

      this.Left.add(
        new OrgChart.Layout.Boundary.Step.$ctor1(
          node,
          rect.getLeft(),
          rect.getTop(),
          rect.getBottom()
        )
      );
      this.Right.add(
        new OrgChart.Layout.Boundary.Step.$ctor1(
          node,
          rect.getRight(),
          rect.getTop(),
          rect.getBottom()
        )
      );
    },
    /**
     * Resets the edges, use when re-using this object from pool.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    Prepare: function (node) {
      this.Left.clear();
      this.Right.clear();

      // adjust the top edge to fit the logical grid
      this.setBoundingRect(
        new OrgChart.Layout.Rect.$ctor1(
          node.getState().TopLeft,
          node.getState().Size
        )
      );
    },
    /**
     * Merges another boundary into this one, potentially pushing its edges out.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.Boundary}    other
     * @return  {void}
     */
    VerticalMergeFrom: function (other) {
      this.setBoundingRect(
        OrgChart.Layout.Rect.op_Addition(
          this.getBoundingRect(),
          other.getBoundingRect()
        )
      );
    },
    /**
     * Merges another boundary into this one, potentially pushing its edges out.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.Boundary}    other
     * @return  {void}
     */
    MergeFrom: function (other) {
      if (
        other.getBoundingRect().getTop() >= other.getBoundingRect().getBottom()
      ) {
        throw new System.ArgumentException(
          "Cannot merge boundary of height " +
            System.Double.format(
              other.getBoundingRect().getBottom() -
                other.getBoundingRect().getTop(),
              "G"
            )
        );
      }

      var merge = 114;
      while (merge !== 0) {
        var mySteps = merge === 114 ? this.Right : this.Left;
        var theirSteps = merge === 114 ? other.Right : other.Left;
        var i = 0;
        var k = 0;
        for (; k < theirSteps.getCount() && i < mySteps.getCount(); ) {
          var my = mySteps.getItem(i);
          var th = theirSteps.getItem(k);

          if (my.Bottom <= th.Top) {
            // haven't reached the top of their boundary yet
            i = (i + 1) | 0;
            continue;
          }

          if (th.Bottom <= my.Top) {
            // haven't reached the top of my boundary yet
            mySteps.insert(i, th);
            k = (k + 1) | 0;

            this.ValidateState();
            continue;
          }

          var theirWins = merge === 114 ? my.X <= th.X : my.X >= th.X;

          if (OrgChart.Layout.LayoutAlgorithm.IsEqual(my.Top, th.Top)) {
            if (OrgChart.Layout.LayoutAlgorithm.IsEqual(my.Bottom, th.Bottom)) {
              // case 1: exactly same length and vertical position
              // th: ********
              // my: ********
              if (theirWins) {
                mySteps.setItem(i, th); // replace entire step
              }
              i = (i + 1) | 0;
              k = (k + 1) | 0;

              this.ValidateState();
            } else if (my.Bottom < th.Bottom) {
              // case 2: tops aligned, but my is shorter
              // th: ********
              // my: ***
              if (theirWins) {
                mySteps.setItem(i, my.ChangeOwner(th.Node, th.X)); // replace my with a piece of theirs
              }
              theirSteps.setItem(k, th.ChangeTop(my.Bottom)); // push their top down
              i = (i + 1) | 0;

              this.ValidateState();
            } else {
              // case 3: tops aligned, but my is longer
              // th: ***
              // my: ********
              if (theirWins) {
                mySteps.setItem(i, my.ChangeTop(th.Bottom)); // contract my to their bottom
                mySteps.insert(i, th); // insert theirs before my
                i = (i + 1) | 0;
              }
              k = (k + 1) | 0;

              this.ValidateState();
            }
          } else if (
            OrgChart.Layout.LayoutAlgorithm.IsEqual(my.Bottom, th.Bottom)
          ) {
            if (my.Top < th.Top) {
              // case 4: bottoms aligned, but my is longer
              // th:      ***
              // my: ********
              if (theirWins) {
                mySteps.setItem(i, my.ChangeBottom(th.Top)); // contract my to their top
                mySteps.insert((i + 1) | 0, th); // insert theirs after my
                i = (i + 1) | 0;
              }
              i = (i + 1) | 0;
              k = (k + 1) | 0;

              this.ValidateState();
            } else {
              // case 5: bottoms aligned, but my is shorter
              // th: ********
              // my:      ***
              if (theirWins) {
                // replace my with theirs, we're guaranteed not to offend my previous
                mySteps.setItem(i, th);
              } else {
                // insert a piece of theirs before my, we're guaranteed not to offend my previous
                mySteps.insert(i, th.ChangeBottom(my.Top));
                i = (i + 1) | 0;
              }
              i = (i + 1) | 0;
              k = (k + 1) | 0;

              this.ValidateState();
            }
          } else if (my.Top < th.Top && my.Bottom < th.Bottom) {
            // case 6: their overlaps my bottom
            // th:     ********
            // my: *******
            if (theirWins) {
              mySteps.setItem(i, my.ChangeBottom(th.Top)); // contract myself to their top
              mySteps.insert(
                (i + 1) | 0,
                new OrgChart.Layout.Boundary.Step.$ctor1(
                  th.Node,
                  th.X,
                  th.Top,
                  my.Bottom
                )
              ); // insert a piece of theirs after my
              i = (i + 1) | 0;
            }
            theirSteps.setItem(k, th.ChangeTop(my.Bottom)); // push theirs down
            i = (i + 1) | 0;

            this.ValidateState();
          } else if (my.Top < th.Top && my.Bottom > th.Bottom) {
            // case 7: their cuts my into three pieces
            // th:     *****
            // my: ************
            if (theirWins) {
              mySteps.setItem(i, my.ChangeBottom(th.Top)); // contract my to their top
              mySteps.insert((i + 1) | 0, th); // insert their after my
              mySteps.insert((i + 2) | 0, my.ChangeTop(th.Bottom)); // insert my tail after theirs
              i = (i + 2) | 0;
            }
            k = (k + 1) | 0;

            this.ValidateState();
          } else if (my.Bottom > th.Bottom) {
            // case 8: their overlaps my top
            // th: ********
            // my:    ********
            if (theirWins) {
              mySteps.setItem(i, my.ChangeTop(th.Bottom)); // contract my to their bottom
              // insert theirs before my, we're guaranteed not to offend my previous
              mySteps.insert(i, th);
            } else {
              mySteps.insert(i, th.ChangeBottom(my.Top));
            }
            i = (i + 1) | 0;
            k = (k + 1) | 0;

            this.ValidateState();
          } else {
            // case 9: their completely covers my
            // th: ************
            // my:    *****
            if (theirWins) {
              mySteps.setItem(i, th.ChangeBottom(my.Bottom)); // replace my with a piece of theirs
            } else {
              mySteps.insert(i, th.ChangeBottom(my.Top));
              i = (i + 1) | 0;
            }
            theirSteps.setItem(k, th.ChangeTop(my.Bottom)); // push theirs down
            i = (i + 1) | 0;

            this.ValidateState();
          }
        }

        if (i === mySteps.getCount()) {
          while (k < theirSteps.getCount()) {
            mySteps.add(theirSteps.getItem(k));
            k = (k + 1) | 0;

            this.ValidateState();
          }
        }

        merge = merge === 114 ? 108 : 0;
      }

      this.setBoundingRect(
        OrgChart.Layout.Rect.op_Addition(
          this.getBoundingRect(),
          other.getBoundingRect()
        )
      );
    },
    /**
     * Merges a box into this one, potentially pushing its edges out.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    MergeFrom$1: function (node) {
      if (node.getElement().DisableCollisionDetection) {
        return;
      }

      if (OrgChart.Layout.LayoutAlgorithm.IsZero(node.getState().Size.Height)) {
        return;
      }

      this.m_spacerMerger.PrepareForHorizontalLayout(node);
      this.MergeFrom(this.m_spacerMerger);
    },
    ValidateState: function () {
      for (var i = 1; i < this.Left.getCount(); i = (i + 1) | 0) {
        if (
          OrgChart.Layout.LayoutAlgorithm.IsEqual(
            this.Left.getItem(i).Top,
            this.Left.getItem(i).Bottom
          ) ||
          this.Left.getItem(i).Top < this.Left.getItem((i - 1) | 0).Bottom ||
          this.Left.getItem(i).Top <= this.Left.getItem((i - 1) | 0).Top ||
          this.Left.getItem(i).Bottom <= this.Left.getItem(i).Top ||
          this.Left.getItem(i).Bottom <= this.Left.getItem((i - 1) | 0).Bottom
        ) {
          throw new System.Exception("State error at Left index " + i);
        }
      }

      for (var i1 = 1; i1 < this.Right.getCount(); i1 = (i1 + 1) | 0) {
        if (
          OrgChart.Layout.LayoutAlgorithm.IsEqual(
            this.Right.getItem(i1).Top,
            this.Right.getItem(i1).Bottom
          ) ||
          this.Right.getItem(i1).Top <
            this.Right.getItem((i1 - 1) | 0).Bottom ||
          this.Right.getItem(i1).Top <= this.Right.getItem((i1 - 1) | 0).Top ||
          this.Right.getItem(i1).Bottom <= this.Right.getItem(i1).Top ||
          this.Right.getItem(i1).Bottom <=
            this.Right.getItem((i1 - 1) | 0).Bottom
        ) {
          throw new System.Exception("State error at Right index " + i1);
        }
      }
    },
    /**
     * Returns max horizontal overlap between myself and <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.Boundary}    other
     * @param   {number}                      siblingSpacing
     * @param   {number}                      branchSpacing
     * @return  {number}
     */
    ComputeOverlap: function (other, siblingSpacing, branchSpacing, debug) {
      var i = 0,
        k = 0;
      var offense = 0.0;

      while (i < this.Right.getCount() && k < other.Left.getCount()) {
        var my = this.Right.getItem(i);
        var th = other.Left.getItem(k);

        if (my.Bottom <= th.Top) {
          i = (i + 1) | 0;
        } else if (th.Bottom <= my.Top) {
          k = (k + 1) | 0;
        } else {
          if (
            !my.Node.getElement().DisableCollisionDetection &&
            !th.Node.getElement().DisableCollisionDetection
          ) {
            var desiredSpacing =
              my.Node.getElement().IsSpecial || th.Node.getElement().IsSpecial
                ? 0
                : my.Node.getElement().ParentId ===
                  th.Node.getElement().ParentId
                ? siblingSpacing
                : branchSpacing; // these are two different branches

            var diff = my.X + desiredSpacing - th.X;
            if (diff > offense) {
              offense = diff;
            }
          }

          if (my.Bottom >= th.Bottom) {
            k = (k + 1) | 0;
          }
          if (th.Bottom >= my.Bottom) {
            i = (i + 1) | 0;
          }
        }
      }

      return offense;
    },
    /**
     * Re-initializes left and right edges based on actual coordinates of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary
     * @memberof OrgChart.Layout.Boundary
     * @param   {OrgChart.Layout.BoxTree.Node}    branchRoot
     * @return  {void}
     */
    ReloadFromBranch: function (branchRoot) {
      var leftmost = System.Double.max;
      var rightmost = System.Double.min;
      for (var i = 0; i < this.Left.getCount(); i = (i + 1) | 0) {
        var left = this.Left.getItem(i);
        var newLeft = left.Node.getState().getLeft();
        this.Left.setItem(i, left.ChangeX(newLeft));
        leftmost = Math.min(leftmost, newLeft);
      }

      for (var i1 = 0; i1 < this.Right.getCount(); i1 = (i1 + 1) | 0) {
        var right = this.Right.getItem(i1);
        var newRight = right.Node.getState().getRight();
        this.Right.setItem(i1, right.ChangeX(newRight));
        rightmost = Math.max(rightmost, newRight);
      }

      leftmost = Math.min(branchRoot.getState().getLeft(), leftmost);
      rightmost = Math.max(branchRoot.getState().getRight(), rightmost);

      this.setBoundingRect(
        new OrgChart.Layout.Rect.$ctor1(
          new OrgChart.Layout.Point.$ctor1(
            leftmost,
            this.getBoundingRect().getTop()
          ),
          new OrgChart.Layout.Size.$ctor1(
            rightmost - leftmost,
            this.getBoundingRect().Size.Height
          )
        )
      );
    },
  });

  /**
   * A single step of the boundary.
   Each individual element in {@link } and {@link } collections
   represents one step of the boundary.
   *
   * @public
   * @class OrgChart.Layout.Boundary.Step
   */
  Bridge.define("OrgChart.Layout.Boundary.Step", {
    $kind: "struct",
    statics: {
      getDefaultValue: function () {
        return new OrgChart.Layout.Boundary.Step();
      },
    },
    /**
     * Which {@link } holds this edge.
     *
     * @instance
     */
    Node: null,
    /**
     * Horizontal position of the edge.
     *
     * @instance
     */
    X: 0,
    /**
     * Top edge.
     *
     * @instance
     */
    Top: 0,
    /**
     * Bottom edge.
     *
     * @instance
     */
    Bottom: 0,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary.Step
     * @memberof OrgChart.Layout.Boundary.Step
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @param   {number}                          x
     * @param   {number}                          top
     * @param   {number}                          bottom
     * @return  {void}
     */
    $ctor1: function (node, x, top, bottom) {
      this.$initialize();
      this.Node = node;
      this.X = x;
      this.Top = top;
      this.Bottom = bottom;
    },
    ctor: function () {
      this.$initialize();
    },
    /**
     * Returns a new {@link } whose {@link } property was set to <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary.Step
     * @memberof OrgChart.Layout.Boundary.Step
     * @param   {number}                           newTop
     * @return  {OrgChart.Layout.Boundary.Step}
     */
    ChangeTop: function (newTop) {
      return new OrgChart.Layout.Boundary.Step.$ctor1(
        this.Node,
        this.X,
        newTop,
        this.Bottom
      );
    },
    /**
     * Returns a new {@link } whose {@link } property was set to <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary.Step
     * @memberof OrgChart.Layout.Boundary.Step
     * @param   {number}                           newBottom
     * @return  {OrgChart.Layout.Boundary.Step}
     */
    ChangeBottom: function (newBottom) {
      return new OrgChart.Layout.Boundary.Step.$ctor1(
        this.Node,
        this.X,
        this.Top,
        newBottom
      );
    },
    /**
     * Returns a new {@link } whose {@link } property was set to <b /> and {@link } to <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary.Step
     * @memberof OrgChart.Layout.Boundary.Step
     * @param   {OrgChart.Layout.BoxTree.Node}     newNode
     * @param   {number}                           newX
     * @return  {OrgChart.Layout.Boundary.Step}
     */
    ChangeOwner: function (newNode, newX) {
      return new OrgChart.Layout.Boundary.Step.$ctor1(
        newNode,
        newX,
        this.Top,
        this.Bottom
      );
    },
    /**
     * Returns a new {@link } whose {@link } was set to <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Boundary.Step
     * @memberof OrgChart.Layout.Boundary.Step
     * @param   {number}                           newX
     * @return  {OrgChart.Layout.Boundary.Step}
     */
    ChangeX: function (newX) {
      return new OrgChart.Layout.Boundary.Step.$ctor1(
        this.Node,
        newX,
        this.Top,
        this.Bottom
      );
    },
    getHashCode: function () {
      var h = Bridge.addHash([
        1885697107,
        this.Node,
        this.X,
        this.Top,
        this.Bottom,
      ]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Boundary.Step)) {
        return false;
      }
      return (
        Bridge.equals(this.Node, o.Node) &&
        Bridge.equals(this.X, o.X) &&
        Bridge.equals(this.Top, o.Top) &&
        Bridge.equals(this.Bottom, o.Bottom)
      );
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Boundary.Step();
      s.Node = this.Node;
      s.X = this.X;
      s.Top = this.Top;
      s.Bottom = this.Bottom;
      return s;
    },
  });

  /**
   * Called when boundary is updated.
   *
   * @public
   * @class OrgChart.Layout.BoundaryChangedEventArgs
   */
  Bridge.define("OrgChart.Layout.BoundaryChangedEventArgs", {
    /**
     * Current layout state.
     *
     * @instance
     */
    State: null,
    /**
     * Current layout level.
     *
     * @instance
     */
    LayoutLevel: null,
    /**
     * The boundary whose state has been changed.
     *
     * @instance
     */
    Boundary: null,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoundaryChangedEventArgs
     * @memberof OrgChart.Layout.BoundaryChangedEventArgs
     * @param   {OrgChart.Layout.Boundary}                   boundary
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    layoutLevel
     * @param   {OrgChart.Layout.LayoutState}                state
     * @return  {void}
     */
    ctor: function (boundary, layoutLevel, state) {
      this.$initialize();
      this.Boundary = boundary;
      this.LayoutLevel = layoutLevel;
      this.State = state;
    },
  });

  /**
   * A box in some {@link }. 
   Has {@link } and layout-related config such as {@link }.
   This is a purely visual object, created based on underlying chart's data.
   *
   * @public
   * @class OrgChart.Layout.Box
   */
  Bridge.define("OrgChart.Layout.Box", {
    statics: {
      /**
       * Value to be used for box identifier to indicate an absent box.
       *
       * @instance
       */
      None: -1,
      /**
       * Ctr. for auto-generated boxes.
       *
       * @static
       * @public
       * @this OrgChart.Layout.Box
       * @memberof OrgChart.Layout.Box
       * @param   {number}                 id
       * @param   {number}                 visualParentId
       * @param   {boolean}                disableCollisionDetection
       * @return  {OrgChart.Layout.Box}
       */
      Special: function (id, visualParentId, disableCollisionDetection) {
        return new OrgChart.Layout.Box.$ctor1(
          null,
          id,
          visualParentId,
          true,
          disableCollisionDetection,
          false
        );
      },
    },
    /**
     * Identifier of this box. Unique in the scope of the parent {@link }.
     *
     * @instance
     */
    Id: 0,
    /**
       * Identifier of the parent box, usually driven by corresponding relationship between underlying data items.
       This parent is for the visual connections and arrangement of children boxes with their parents.
       *
       * @instance
       */
    ParentId: 0,
    /**
       * Identifier of some externally provided data item for which this box was created.
       Can be null for auto-generated boxes and manually added boxes.
       *
       * @instance
       */
    DataId: null,
    /**
       * This box has been auto-generated for layout purposes,
       so it can be deleted and re-created as needed.
       Special boxes are usually not stored in the {@link } (except {@link }).
       *
       * @instance
       */
    IsSpecial: false,
    /**
       * If <pre><code>true</code></pre>, this box has to be rendered using a special layout strategy directly under the parent.
       Assistants are always on top of other siblinbgs.
       *
       * @instance
       * @see {@link IChartDataItem.IsAssistant}
       */
    IsAssistant: false,
    /**
       * <pre><code>False</code></pre> (default) to enable collision detection for this box,
       e.g. whether it can make impact on {@link }.
       *
       * @instance
       */
    DisableCollisionDetection: false,
    /**
       * Layout strategy that should be used to apply layout on this Box and its children.
       References an element in {@link }.
       If <pre><code>null</code></pre>, use {@link }.
       *
       * @instance
       */
    LayoutStrategyId: null,
    /**
       * Layout strategy that should be used to apply layout on assistant children of this Box.
       References an element in {@link }.
       If <pre><code>null</code></pre>, use {@link }.
       *
       * @instance
       */
    AssistantLayoutStrategyId: null,
    /**
       * When <pre><code>true</code></pre>, layout operations can be applied only to this box.
       Its children will not participate in the layout.
       *
       * @instance
       */
    IsCollapsed: false,
    config: {
      init: function () {
        this.Size = new OrgChart.Layout.Size();
      },
    },
    /**
     * Ctr. for normal and data-bound boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Box
     * @memberof OrgChart.Layout.Box
     * @param   {string}     dataId
     * @param   {number}     id
     * @param   {number}     parentId
     * @param   {boolean}    isAssistant
     * @return  {void}
     */
    ctor: function (dataId, id, parentId, isAssistant) {
      OrgChart.Layout.Box.$ctor1.call(
        this,
        dataId,
        id,
        parentId,
        false,
        false,
        isAssistant
      );
    },
    $ctor1: function (
      dataId,
      id,
      parentId,
      isSpecial,
      disableCollisionDetection,
      isAssistant
    ) {
      this.$initialize();
      if (id === 0) {
        throw new System.ArgumentOutOfRangeException("id");
      }

      this.Id = id;
      this.ParentId = parentId;
      this.DataId = dataId;
      this.IsSpecial = isSpecial;
      this.IsAssistant = isAssistant;
      this.DisableCollisionDetection = disableCollisionDetection;
    },
    /**
     * <pre><code>true</code></pre> is this box is bound to some data item.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Box
     * @memberof OrgChart.Layout.Box
     * @function getIsDataBound
     * @return  {boolean}
     */
    /**
     * <pre><code>true</code></pre> is this box is bound to some data item.
     *
     * @instance
     * @function setIsDataBound
     */
    getIsDataBound: function () {
      return !System.String.isNullOrEmpty(this.DataId);
    },
  });

  /**
   * A container for a bunch of {@link } objects. Defines scope of uniqueness of their identifiers.
   Used by {@link } when computing boxes.
   *
   * @public
   * @class OrgChart.Layout.BoxContainer
   */
  Bridge.define("OrgChart.Layout.BoxContainer", {
    m_lastBoxId: 0,
    m_boxesById: null,
    m_boxesByDataId: null,
    config: {
      properties: {
        /**
         * Auto-generated system root box. Added to guarantee a single-root hierarchy.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxContainer
         * @memberof OrgChart.Layout.BoxContainer
         * @function getSystemRoot
         * @return  {OrgChart.Layout.Box}
         */
        /**
         * Auto-generated system root box. Added to guarantee a single-root hierarchy.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxContainer
         * @memberof OrgChart.Layout.BoxContainer
         * @function setSystemRoot
         * @param   {OrgChart.Layout.Box}    value
         * @return  {void}
         */
        SystemRoot: null,
      },
      init: function () {
        this.m_boxesById = new (System.Collections.Generic.Dictionary$2(
          System.Int32,
          OrgChart.Layout.Box
        ))();
        this.m_boxesByDataId = new (System.Collections.Generic.Dictionary$2(
          String,
          OrgChart.Layout.Box
        ))();
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @return  {void}
     */
    ctor: function () {
      this.$initialize();
    },
    /**
     * Ctr. for case with readily available data source.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @param   {OrgChart.Layout.IChartDataSource}    source
     * @return  {void}
     */
    $ctor1: function (source) {
      this.$initialize();
      this.ReloadBoxes(source);
    },
    /**
     * Access to internal collection of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @function getBoxesById
     * @return  {System.Collections.Generic.IDictionary$2}
     */
    /**
     * Access to internal collection of boxes.
     *
     * @instance
     * @function setBoxesById
     */
    getBoxesById: function () {
      return this.m_boxesById;
    },
    /**
     * Access to internal collection of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @function getBoxesByDataId
     * @return  {System.Collections.Generic.IDictionary$2}
     */
    /**
     * Access to internal collection of boxes.
     *
     * @instance
     * @function setBoxesByDataId
     */
    getBoxesByDataId: function () {
      return this.m_boxesByDataId;
    },
    /**
     * Wipes out and re-loads boxes collection from the data store.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @param   {OrgChart.Layout.IChartDataSource}    source
     * @return  {void}
     */
    ReloadBoxes: function (source) {
      var $t, $t1;
      this.m_boxesByDataId.clear();
      this.m_boxesById.clear();
      this.m_lastBoxId = 0;

      // generate system root box
      this.setSystemRoot(
        OrgChart.Layout.Box.Special(
          (this.m_lastBoxId = (this.m_lastBoxId + 1) | 0),
          OrgChart.Layout.Box.None,
          true
        )
      );
      this.m_boxesById.add(this.getSystemRoot().Id, this.getSystemRoot());

      var map = new (System.Collections.Generic.Dictionary$2(
        String,
        System.Int32
      ))();

      // generate identifiers mapping, need this because data comes in random order
      $t = Bridge.getEnumerator(
        source.OrgChart$Layout$IChartDataSource$getAllDataItemIds(),
        String
      );
      while ($t.moveNext()) {
        var dataId = $t.getCurrent();
        map.add(dataId, this.NextBoxId());
      }

      // add data-bound boxes
      var getDataItem = source.OrgChart$Layout$IChartDataSource$getGetDataItemFunc();
      $t1 = Bridge.getEnumerator(
        source.OrgChart$Layout$IChartDataSource$getAllDataItemIds(),
        String
      );
      while ($t1.moveNext()) {
        var dataId1 = $t1.getCurrent();
        var parentDataId = System.String.isNullOrEmpty(dataId1)
          ? null
          : source.OrgChart$Layout$IChartDataSource$getGetParentKeyFunc()(
              dataId1
            );
        var visualParentId = System.String.isNullOrEmpty(parentDataId)
          ? this.getSystemRoot().Id
          : map.get(parentDataId);

        this.AddBox$1(
          dataId1,
          map.get(dataId1),
          visualParentId,
          getDataItem(dataId1).OrgChart$Layout$IChartDataItem$getIsAssistant()
        );
      }
    },
    /**
     * Creates a new {@link } and adds it to collection.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @param   {string}                 dataId
     * @param   {number}                 visualParentId
     * @param   {boolean}                isAssistant
     * @return  {OrgChart.Layout.Box}                      Newly created Node object
     */
    AddBox: function (dataId, visualParentId, isAssistant) {
      return this.AddBox$1(
        dataId,
        this.NextBoxId(),
        visualParentId,
        isAssistant
      );
    },
    AddBox$1: function (dataId, id, visualParentId, isAssistant) {
      var box = new OrgChart.Layout.Box.ctor(
        dataId,
        id,
        visualParentId,
        isAssistant
      );
      this.m_boxesById.add(box.Id, box);
      if (!System.String.isNullOrEmpty(dataId)) {
        this.m_boxesByDataId.add(box.DataId, box);
      }

      return box;
    },
    /**
     * Generates a new identifier for a {@link }.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxContainer
     * @memberof OrgChart.Layout.BoxContainer
     * @return  {number}
     */
    NextBoxId: function () {
      this.m_lastBoxId = (this.m_lastBoxId + 1) | 0;
      return this.m_lastBoxId;
    },
  });

  /**
   * @memberof System
   * @callback System.Action
   * @param   {OrgChart.Layout.BoxTree.Node}    arg
   * @return  {void}
   */

  /**
   * @memberof System
   * @callback System.Predicate
   * @param   {OrgChart.Layout.BoxTree.Node}    obj
   * @return  {boolean}
   */

  /** @namespace System */

  /**
   * @memberof System
   * @callback System.Func
   * @param   {OrgChart.Layout.BoxTree.Node}    arg
   * @return  {boolean}
   */

  /**
   * Our tree logic instantiated for {@link } and {@link }.
   *
   * @public
   * @class OrgChart.Layout.BoxTree
   */
  Bridge.define("OrgChart.Layout.BoxTree", {
    statics: {
      /**
       * Constructs a new tree.
       *
       * @static
       * @public
       * @this OrgChart.Layout.BoxTree
       * @memberof OrgChart.Layout.BoxTree
       * @param   {OrgChart.Layout.LayoutState}    state
       * @return  {OrgChart.Layout.BoxTree}
       */
      Build: function (state) {
        var $t, $t1;
        var result = new OrgChart.Layout.BoxTree();

        // build dictionary of nodes
        $t = Bridge.getEnumerator(
          state
            .getDiagram()
            .getBoxes()
            .getBoxesById()
            .System$Collections$Generic$IDictionary$2$System$Int32$OrgChart$Layout$Box$getValues(),
          OrgChart.Layout.Box
        );
        while ($t.moveNext()) {
          var box = $t.getCurrent();
          var node = new OrgChart.Layout.BoxTree.Node(box);
          result.getNodes().add(box.Id, node);
        }

        // build the tree
        $t1 = Bridge.getEnumerator(
          result.getNodes().getValues(),
          OrgChart.Layout.BoxTree.Node
        );
        while ($t1.moveNext()) {
          var node1 = $t1.getCurrent();
          var parentKey = node1.getElement().ParentId;

          var parentNode = {};
          if (result.getNodes().tryGetValue(parentKey, parentNode)) {
            if (
              node1.getElement().IsAssistant &&
              parentNode.v.getElement().ParentId !== OrgChart.Layout.Box.None
            ) {
              parentNode.v.AddAssistantChild(node1);
            } else {
              parentNode.v.AddRegularChild$1(node1);
            }
          } else {
            if (result.getRoot() != null) {
              throw new System.InvalidOperationException(
                "More then one root found: " + node1.getElement().Id
              );
            }
            // In case of data errors, parent key may be not null, but parent node is not there.
            // Just add the node to roots.
            result.setRoot(node1);
          }
        }

        return result;
      },
    },
    config: {
      properties: {
        /**
               * Root node, as detected from data.
               Corresponds to {@link } box.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.BoxTree
               * @memberof OrgChart.Layout.BoxTree
               * @function getRoot
               * @return  {OrgChart.Layout.BoxTree.Node}
               */
        /**
               * Root node, as detected from data.
               Corresponds to {@link } box.
               *
               * @instance
               * @private
               * @this OrgChart.Layout.BoxTree
               * @memberof OrgChart.Layout.BoxTree
               * @function setRoot
               * @param   {OrgChart.Layout.BoxTree.Node}    value
               * @return  {void}
               */
        Root: null,
        /**
               * Dictionary of all node wrappers.
               Nodes are always one-to-one with elements, so they are identified by element keys.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.BoxTree
               * @memberof OrgChart.Layout.BoxTree
               * @function getNodes
               * @return  {System.Collections.Generic.Dictionary$2}
               */
        /**
               * Dictionary of all node wrappers.
               Nodes are always one-to-one with elements, so they are identified by element keys.
               *
               * @instance
               * @private
               * @this OrgChart.Layout.BoxTree
               * @memberof OrgChart.Layout.BoxTree
               * @function setNodes
               * @param   {System.Collections.Generic.Dictionary$2}    value
               * @return  {void}
               */
        Nodes: null,
        /**
         * Max value of {@link } plus one (because root nodes are level zero).
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree
         * @memberof OrgChart.Layout.BoxTree
         * @function getDepth
         * @return  {number}
         */
        /**
         * Max value of {@link } plus one (because root nodes are level zero).
         *
         * @instance
         * @private
         * @this OrgChart.Layout.BoxTree
         * @memberof OrgChart.Layout.BoxTree
         * @function setDepth
         * @param   {number}    value
         * @return  {void}
         */
        Depth: 0,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree
     * @memberof OrgChart.Layout.BoxTree
     * @return  {void}
     */
    ctor: function () {
      this.$initialize();
      this.setNodes(
        new (System.Collections.Generic.Dictionary$2(
          System.Int32,
          OrgChart.Layout.BoxTree.Node
        ))()
      );
    },
    /**
       * Goes through all elements depth-first. Applies <b /> to all children recursively, then to the parent.
       If <b /> returns <pre><code>false</code></pre>, it will stop entire processing.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree
       * @memberof OrgChart.Layout.BoxTree
       * @param   {System.Func}    func    A func to evaluate on {@link } and its children. Whenever it returns false, iteration stops
       * @return  {boolean}                True if <b /> never returned <pre><code>false</code></pre>
       */
    IterateChildFirst: function (func) {
      return this.getRoot().IterateChildFirst(func);
    },
    /**
       * Goes through all elements depth-first. Applies <b /> to the parent first, then to all children recursively.
       In this mode children at each level decide for themselves whether they want to iterate further down, 
       e.g. <b /> can cut-off a branch.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree
       * @memberof OrgChart.Layout.BoxTree
       * @param   {System.Predicate}    enter    A predicate to allow iteration of a specific branch
       * @param   {System.Action}       exit     An optional action to run after iteration of some branch is complete or canceled
       * @return  {void}
       */
    IterateParentFirst: function (enter, exit) {
      if (exit === void 0) {
        exit = null;
      }
      // Ignore returned value, in this mode children at each level
      // decide for themselves whether they want to iterate further down.
      this.getRoot().IterateParentFirst(enter, exit);
    },
    /**
     * Update every node's {@link } and {@link } of the tree.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree
     * @memberof OrgChart.Layout.BoxTree
     * @return  {void}
     */
    UpdateHierarchyStats: function () {
      // initialize hierarchy level numbers
      this.setDepth(0);
      this.IterateParentFirst(
        Bridge.fn.bind(this, $asm.$.OrgChart.Layout.BoxTree.f1)
      );
    },
  });

  Bridge.ns("OrgChart.Layout.BoxTree", $asm.$);

  Bridge.apply($asm.$.OrgChart.Layout.BoxTree, {
    f1: function (x) {
      if (x.getParentNode() != null) {
        x.setLevel(x.getParentNode().getLevel());
        if (!x.getParentNode().getIsAssistantRoot()) {
          x.setLevel((x.getLevel() + 1) | 0);
        }
        this.setDepth(Math.max((1 + x.getLevel()) | 0, this.getDepth()));
      } else {
        x.setLevel(0);
        this.setDepth(1);
      }
      return true;
    },
  });

  /**
   * Node wrapper.
   *
   * @public
   * @class OrgChart.Layout.BoxTree.Node
   */
  Bridge.define("OrgChart.Layout.BoxTree.Node", {
    config: {
      properties: {
        /**
         * Hierarchy level.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function getLevel
         * @return  {number}
         */
        /**
         * Hierarchy level.
         *
         * @instance
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function setLevel
         * @param   {number}    value
         * @return  {void}
         */
        Level: 0,
        /**
         * Reference to value element.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function getElement
         * @return  {OrgChart.Layout.Box}
         */
        /**
         * Reference to value element.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function setElement
         * @param   {OrgChart.Layout.Box}    value
         * @return  {void}
         */
        Element: null,
        /**
         * Additional information associated with the {@link } in this node.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function getState
         * @return  {OrgChart.Layout.NodeLayoutInfo}
         */
        /**
         * Additional information associated with the {@link } in this node.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function setState
         * @param   {OrgChart.Layout.NodeLayoutInfo}    value
         * @return  {void}
         */
        State: null,
        /**
         * Reference to parent node wrapper.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function getParentNode
         * @return  {OrgChart.Layout.BoxTree.Node}
         */
        /**
         * Reference to parent node wrapper.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function setParentNode
         * @param   {OrgChart.Layout.BoxTree.Node}    value
         * @return  {void}
         */
        ParentNode: null,
        /**
         * References to child node wrappers.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function getChildren
         * @return  {System.Collections.Generic.IList$1}
         */
        /**
         * References to child node wrappers.
         *
         * @instance
         * @protected
         * @this OrgChart.Layout.BoxTree.Node
         * @memberof OrgChart.Layout.BoxTree.Node
         * @function setChildren
         * @param   {System.Collections.Generic.IList$1}    value
         * @return  {void}
         */
        Children: null,
        /**
               * Special child used as root for assistants.
               Have to declare it separately to enable re-use of layout algorithms,
               otherwise this would not be possible due to mixing of assistants and regulars into shared collection.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.BoxTree.Node
               * @memberof OrgChart.Layout.BoxTree.Node
               * @function getAssistantsRoot
               * @return  {OrgChart.Layout.BoxTree.Node}
               */
        /**
               * Special child used as root for assistants.
               Have to declare it separately to enable re-use of layout algorithms,
               otherwise this would not be possible due to mixing of assistants and regulars into shared collection.
               *
               * @instance
               * @protected
               * @this OrgChart.Layout.BoxTree.Node
               * @memberof OrgChart.Layout.BoxTree.Node
               * @function setAssistantsRoot
               * @param   {OrgChart.Layout.BoxTree.Node}    value
               * @return  {void}
               */
        AssistantsRoot: null,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @param   {OrgChart.Layout.Box}    element
     * @return  {void}
     */
    ctor: function (element) {
      this.$initialize();
      this.setElement(element);
      this.setState(new OrgChart.Layout.NodeLayoutInfo());
    },
    /**
     * Number of children nodes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @function getChildCount
     * @return  {number}
     */
    /**
     * Number of children nodes.
     *
     * @instance
     * @function setChildCount
     */
    getChildCount: function () {
      return this.getChildren() == null
        ? 0
        : System.Array.getCount(
            this.getChildren(),
            OrgChart.Layout.BoxTree.Node
          );
    },
    /**
     * <pre><code>true</code></pre> if this node is set as {@link } on its {@link }.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @function getIsAssistantRoot
     * @return  {boolean}
     */
    /**
     * <pre><code>true</code></pre> if this node is set as {@link } on its {@link }.
     *
     * @instance
     * @function setIsAssistantRoot
     */
    getIsAssistantRoot: function () {
      var $t;
      return Bridge.referenceEquals(
        ($t = this.getParentNode()) != null ? $t.getAssistantsRoot() : null,
        this
      );
    },
    /**
       * Adds a new assistant child to the list, under {@link }. 
       Returns reference to self.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree.Node
       * @memberof OrgChart.Layout.BoxTree.Node
       * @param   {OrgChart.Layout.BoxTree.Node}    child
       * @return  {OrgChart.Layout.BoxTree.Node}
       */
    AddAssistantChild: function (child) {
      if (this.getAssistantsRoot() == null) {
        this.setAssistantsRoot(
          Bridge.merge(
            new OrgChart.Layout.BoxTree.Node(
              OrgChart.Layout.Box.Special(
                OrgChart.Layout.Box.None,
                this.getElement().Id,
                true
              )
            ),
            {
              setParentNode: this,
              setLevel: (this.getLevel() + 1) | 0,
            }
          )
        );
      }
      this.getAssistantsRoot().AddRegularChild$1(child);
      return this;
    },
    /**
     * Adds a new child to the list. Returns reference to self.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @param   {OrgChart.Layout.BoxTree.Node}    child
     * @return  {OrgChart.Layout.BoxTree.Node}
     */
    AddRegularChild$1: function (child) {
      return this.InsertRegularChild$1(this.getChildCount(), child);
    },
    /**
     * Adds a new child to the list. Returns reference to self.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @param   {OrgChart.Layout.Box}             child
     * @return  {OrgChart.Layout.BoxTree.Node}
     */
    AddRegularChild: function (child) {
      return this.InsertRegularChild(this.getChildCount(), child);
    },
    /**
     * Adds a new child to the list. Returns reference to self.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @param   {number}                          index
     * @param   {OrgChart.Layout.Box}             child
     * @return  {OrgChart.Layout.BoxTree.Node}
     */
    InsertRegularChild: function (index, child) {
      return this.InsertRegularChild$1(
        index,
        new OrgChart.Layout.BoxTree.Node(child)
      );
    },
    /**
     * Adds a new child to the list. Returns reference to self.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.BoxTree.Node
     * @memberof OrgChart.Layout.BoxTree.Node
     * @param   {number}                          index
     * @param   {OrgChart.Layout.BoxTree.Node}    child
     * @return  {OrgChart.Layout.BoxTree.Node}
     */
    InsertRegularChild$1: function (index, child) {
      if (this.getChildren() == null) {
        this.setChildren(
          new (System.Collections.Generic.List$1(
            OrgChart.Layout.BoxTree.Node
          ))()
        );
      }

      System.Array.insert(
        this.getChildren(),
        index,
        child,
        OrgChart.Layout.BoxTree.Node
      );
      child.setParentNode(this);
      child.setLevel((this.getLevel() + 1) | 0);

      return this;
    },
    /**
       * Goes through all elements depth-first. Applies <b /> to all children recursively, then to the parent.
       If <b /> returns <pre><code>false</code></pre>, it will stop entire processing.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree.Node
       * @memberof OrgChart.Layout.BoxTree.Node
       * @param   {System.Func}    func    A func to evaluate on this node and its children. Whenever it returns false, iteration stops
       * @return  {boolean}                True if <b /> never returned <pre><code>false</code></pre>
       */
    IterateChildFirst: function (func) {
      var $t;
      if (this.getAssistantsRoot() != null) {
        if (!this.getAssistantsRoot().IterateChildFirst(func)) {
          return false;
        }
      }

      if (this.getChildren() != null) {
        $t = Bridge.getEnumerator(
          this.getChildren(),
          OrgChart.Layout.BoxTree.Node
        );
        while ($t.moveNext()) {
          var child = $t.getCurrent();
          if (!child.IterateChildFirst(func)) {
            return false;
          }
        }
      }

      return func(this);
    },
    /**
       * Goes through all elements depth-first. Applies <b /> to the parent first, then to all children recursively.
       In this mode, children at each level decide for themselves whether they want to iterate further down, 
       e.g. <b /> can cut-off a branch.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree.Node
       * @memberof OrgChart.Layout.BoxTree.Node
       * @param   {System.Predicate}    enter    A predicate to allow iteration of branch under this node
       * @param   {System.Action}       exit     An optional action to run afer iteration of some branch is complete
       * @return  {boolean}
       */
    IterateParentFirst: function (enter, exit) {
      var $t, $t1;
      if (exit === void 0) {
        exit = null;
      }
      if (!enter(this)) {
        !Bridge.staticEquals(exit, null) ? exit(this) : null;
        return false;
      }
      ($t = this.getAssistantsRoot()) != null
        ? $t.IterateParentFirst(enter, exit)
        : null;

      if (this.getChildren() != null) {
        $t1 = Bridge.getEnumerator(
          this.getChildren(),
          OrgChart.Layout.BoxTree.Node
        );
        while ($t1.moveNext()) {
          var child = $t1.getCurrent();
          // Ignore returned value, in this mode children at each level
          // decide for themselves whether they want to iterate further down.
          child.IterateParentFirst(enter, exit);
        }
      }
      !Bridge.staticEquals(exit, null) ? exit(this) : null;

      return true;
    },
    /**
       * Transforms assistants into regular children, 
       sets {@link } to <pre><code>null</code></pre>.
       Since the appropriate layout strategy is chosen only after the tree is composed,
       we can't know if assistants are supported or no.
       Therefore, {@link } sometimes has to suppress assistant root.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.BoxTree.Node
       * @memberof OrgChart.Layout.BoxTree.Node
       * @return  {void}
       */
    SuppressAssistants: function () {
      var $t;
      if (this.getAssistantsRoot() != null) {
        $t = Bridge.getEnumerator(
          this.getAssistantsRoot().getChildren(),
          OrgChart.Layout.BoxTree.Node
        );
        while ($t.moveNext()) {
          var child = $t.getCurrent();
          this.AddRegularChild$1(child);
        }
        this.setAssistantsRoot(null);
      }
    },
  });

  /**
   * Alignment of a parent box above children nodes.
   *
   * @public
   * @class OrgChart.Layout.BranchParentAlignment
   */
  Bridge.define("OrgChart.Layout.BranchParentAlignment", {
    $kind: "enum",
    statics: {
      /**
       * Default value is invalid, do not use it.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.BranchParentAlignment
       * @constant
       * @default 0
       * @type OrgChart.Layout.BranchParentAlignment
       */
      InvalidValue: 0,
      /**
       * Put parent on the left side of children.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.BranchParentAlignment
       * @constant
       * @default 1
       * @type OrgChart.Layout.BranchParentAlignment
       */
      Left: 1,
      /**
       * Put parent in the middle above children.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.BranchParentAlignment
       * @constant
       * @default 2
       * @type OrgChart.Layout.BranchParentAlignment
       */
      Center: 2,
      /**
       * Put parent on the right side of children.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.BranchParentAlignment
       * @constant
       * @default 3
       * @type OrgChart.Layout.BranchParentAlignment
       */
      Right: 3,
    },
  });

  /**
   * A visual connector between two or more objects.
   *
   * @public
   * @class OrgChart.Layout.Connector
   */
  Bridge.define("OrgChart.Layout.Connector", {
    config: {
      properties: {
        /**
         * All individual segments of a connector, sorted from beginning to end.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.Connector
         * @memberof OrgChart.Layout.Connector
         * @function getSegments
         * @return  {Array.<OrgChart.Layout.Edge>}
         */
        /**
         * All individual segments of a connector, sorted from beginning to end.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.Connector
         * @memberof OrgChart.Layout.Connector
         * @function setSegments
         * @param   {Array.<OrgChart.Layout.Edge>}    value
         * @return  {void}
         */
        Segments: null,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Connector
     * @memberof OrgChart.Layout.Connector
     * @param   {Array.<OrgChart.Layout.Edge>}    segments
     * @return  {void}
     */
    ctor: function (segments) {
      this.$initialize();
      if (segments.length === 0) {
        throw new System.ArgumentException(
          "Need at least one segment",
          "segments"
        );
      }
      this.setSegments(segments);
    },
  });

  /**
   * A combination of source Boxes, layout setttings and all derived data.
   *
   * @public
   * @class OrgChart.Layout.Diagram
   */
  Bridge.define("OrgChart.Layout.Diagram", {
    m_visualTree: null,
    m_boxes: null,
    config: {
      properties: {
        /**
         * Diagram layout styles.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.Diagram
         * @memberof OrgChart.Layout.Diagram
         * @function getLayoutSettings
         * @return  {OrgChart.Layout.DiagramLayoutSettings}
         */
        /**
         * Diagram layout styles.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.Diagram
         * @memberof OrgChart.Layout.Diagram
         * @function setLayoutSettings
         * @param   {OrgChart.Layout.DiagramLayoutSettings}    value
         * @return  {void}
         */
        LayoutSettings: null,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @return  {void}
     */
    ctor: function () {
      this.$initialize();
      this.setLayoutSettings(new OrgChart.Layout.DiagramLayoutSettings());
    },
    /**
     * All boxes. If modified, resets {@link } to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function getBoxes
     * @return  {OrgChart.Layout.BoxContainer}
     */
    /**
     * All boxes. If modified, resets {@link } to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function setBoxes
     * @param   {OrgChart.Layout.BoxContainer}    value
     * @return  {void}
     */
    getBoxes: function () {
      return this.m_boxes;
    },
    /**
     * All boxes. If modified, resets {@link } to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function getBoxes
     * @return  {OrgChart.Layout.BoxContainer}
     */
    /**
     * All boxes. If modified, resets {@link } to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function setBoxes
     * @param   {OrgChart.Layout.BoxContainer}    value
     * @return  {void}
     */
    setBoxes: function (value) {
      this.m_visualTree = null;
      this.m_boxes = value;
    },
    /**
     * Visual tree of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function getVisualTree
     * @return  {OrgChart.Layout.BoxTree}
     */
    /**
     * Visual tree of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function setVisualTree
     * @param   {OrgChart.Layout.BoxTree}    value
     * @return  {void}
     */
    getVisualTree: function () {
      return this.m_visualTree;
    },
    /**
     * Visual tree of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function getVisualTree
     * @return  {OrgChart.Layout.BoxTree}
     */
    /**
     * Visual tree of boxes.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Diagram
     * @memberof OrgChart.Layout.Diagram
     * @function setVisualTree
     * @param   {OrgChart.Layout.BoxTree}    value
     * @return  {void}
     */
    setVisualTree: function (value) {
      this.m_visualTree = value;
    },
  });

  /**
   * Layout settings bound per-frame.
   *
   * @public
   * @class OrgChart.Layout.DiagramLayoutSettings
   */
  Bridge.define("OrgChart.Layout.DiagramLayoutSettings", {
    m_branchSpacing: 0,
    config: {
      properties: {
        /**
         * All unique layout strategies (semantically similar to CSS style sheets) referenced by sub-trees in the diagram.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.DiagramLayoutSettings
         * @memberof OrgChart.Layout.DiagramLayoutSettings
         * @function getLayoutStrategies
         * @return  {System.Collections.Generic.Dictionary$2}
         */
        /**
         * All unique layout strategies (semantically similar to CSS style sheets) referenced by sub-trees in the diagram.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.DiagramLayoutSettings
         * @memberof OrgChart.Layout.DiagramLayoutSettings
         * @function setLayoutStrategies
         * @param   {System.Collections.Generic.Dictionary$2}    value
         * @return  {void}
         */
        LayoutStrategies: null,
        /**
               * Optional explicitly specified default layout strategy to use for root boxes with {@link } set to <pre><code>null</code></pre>.
               If <pre><code>null</code></pre> or invalid, {@link } will throw up.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.DiagramLayoutSettings
               * @memberof OrgChart.Layout.DiagramLayoutSettings
               * @function getDefaultAssistantLayoutStrategyId
               * @return  {string}
               */
        /**
               * Optional explicitly specified default layout strategy to use for root boxes with {@link } set to <pre><code>null</code></pre>.
               If <pre><code>null</code></pre> or invalid, {@link } will throw up.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.DiagramLayoutSettings
               * @memberof OrgChart.Layout.DiagramLayoutSettings
               * @function setDefaultAssistantLayoutStrategyId
               * @param   {string}    value
               * @return  {void}
               */
        DefaultAssistantLayoutStrategyId: null,
        /**
               * Optional explicitly specified default layout strategy to use for root boxes with {@link } set to <pre><code>null</code></pre>.
               If <pre><code>null</code></pre> or invalid, {@link } will throw up.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.DiagramLayoutSettings
               * @memberof OrgChart.Layout.DiagramLayoutSettings
               * @function getDefaultLayoutStrategyId
               * @return  {string}
               */
        /**
               * Optional explicitly specified default layout strategy to use for root boxes with {@link } set to <pre><code>null</code></pre>.
               If <pre><code>null</code></pre> or invalid, {@link } will throw up.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.DiagramLayoutSettings
               * @memberof OrgChart.Layout.DiagramLayoutSettings
               * @function setDefaultLayoutStrategyId
               * @param   {string}    value
               * @return  {void}
               */
        DefaultLayoutStrategyId: null,
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @return  {void}
     */
    ctor: function () {
      this.$initialize();
      this.setBranchSpacing(50);
      this.setLayoutStrategies(
        new (System.Collections.Generic.Dictionary$2(
          String,
          OrgChart.Layout.LayoutStrategyBase
        ))()
      );
    },
    /**
     * Minimum space between boxes that belong to different branches.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @function getBranchSpacing
     * @return  {number}
     */
    /**
     * Minimum space between boxes that belong to different branches.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @function setBranchSpacing
     * @param   {number}    value
     * @return  {void}
     */
    getBranchSpacing: function () {
      return this.m_branchSpacing;
    },
    /**
     * Minimum space between boxes that belong to different branches.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @function getBranchSpacing
     * @return  {number}
     */
    /**
     * Minimum space between boxes that belong to different branches.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @function setBranchSpacing
     * @param   {number}    value
     * @return  {void}
     */
    setBranchSpacing: function (value) {
      if (value < 0) {
        throw new System.ArgumentOutOfRangeException(
          "value",
          "Cannot be negative",
          null,
          value
        );
      }
      this.m_branchSpacing = value;
    },
    /**
     * Layout strategy to be used for root boxes with {@link } set to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @throws {@link InvalidOperationException} is null or not valid
     * @return  {OrgChart.Layout.LayoutStrategyBase}
     */
    RequireDefaultLayoutStrategy: function () {
      var result = {};
      if (
        System.String.isNullOrEmpty(this.getDefaultLayoutStrategyId()) ||
        !this.getLayoutStrategies().tryGetValue(
          this.getDefaultLayoutStrategyId(),
          result
        )
      ) {
        throw new System.InvalidOperationException(
          "defaultLayoutStrategyId is null or not valid"
        );
      }

      return result.v;
    },
    /**
     * Layout strategy to be used for root boxes with {@link } set to <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.DiagramLayoutSettings
     * @memberof OrgChart.Layout.DiagramLayoutSettings
     * @throws {@link InvalidOperationException} is null or not valid
     * @return  {OrgChart.Layout.LayoutStrategyBase}
     */
    RequireDefaultAssistantLayoutStrategy: function () {
      var result = {};
      if (
        System.String.isNullOrEmpty(
          this.getDefaultAssistantLayoutStrategyId()
        ) ||
        !this.getLayoutStrategies().tryGetValue(
          this.getDefaultAssistantLayoutStrategyId(),
          result
        )
      ) {
        throw new System.InvalidOperationException(
          "defaultAssistantLayoutStrategyId is null or not valid"
        );
      }

      return result.v;
    },
  });

  /**
   * Template layout settings that can be referenced by {@link }.
   *
   * @public
   * @class OrgChart.Layout.DiagramLayoutTemplates
   */
  Bridge.define("OrgChart.Layout.DiagramLayoutTemplates");

  /**
   * Edges of a bunch of siblings on vertical or horizontal axis.
   *
   * @public
   * @class OrgChart.Layout.Dimensions
   */
  Bridge.define("OrgChart.Layout.Dimensions", {
    $kind: "struct",
    statics: {
      /**
       * Ctr.
       *
       * @static
       * @public
       * @this OrgChart.Layout.Dimensions
       * @memberof OrgChart.Layout.Dimensions
       * @return  {OrgChart.Layout.Dimensions}
       */
      MinMax: function () {
        return new OrgChart.Layout.Dimensions.$ctor1(
          System.Double.max,
          System.Double.min
        );
      },
      /**
       * Computes combined dimension.
       *
       * @static
       * @public
       * @this OrgChart.Layout.Dimensions
       * @memberof OrgChart.Layout.Dimensions
       * @param   {OrgChart.Layout.Dimensions}    x
       * @param   {OrgChart.Layout.Dimensions}    y
       * @return  {OrgChart.Layout.Dimensions}
       */ op_Addition: function (x, y) {
        return new OrgChart.Layout.Dimensions.$ctor1(
          Math.min(x.From, y.From),
          Math.max(x.To, y.To)
        );
      },
      getDefaultValue: function () {
        return new OrgChart.Layout.Dimensions();
      },
    },
    /**
     * Min value.
     *
     * @instance
     */
    From: 0,
    /**
     * Max value.
     *
     * @instance
     */
    To: 0,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Dimensions
     * @memberof OrgChart.Layout.Dimensions
     * @param   {number}    from
     * @param   {number}    to
     * @return  {void}
     */
    $ctor1: function (from, to) {
      this.$initialize();
      this.From = from;
      this.To = to;
    },
    ctor: function () {
      this.$initialize();
    },
    getHashCode: function () {
      var h = Bridge.addHash([3570880544, this.From, this.To]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Dimensions)) {
        return false;
      }
      return Bridge.equals(this.From, o.From) && Bridge.equals(this.To, o.To);
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Dimensions();
      s.From = this.From;
      s.To = this.To;
      return s;
    },
  });

  /**
   * An edge in the diagram logical coordinate space.
   *
   * @public
   * @class OrgChart.Layout.Edge
   */
  Bridge.define("OrgChart.Layout.Edge", {
    $kind: "struct",
    statics: {
      getDefaultValue: function () {
        return new OrgChart.Layout.Edge();
      },
    },
    config: {
      init: function () {
        this.From = new OrgChart.Layout.Point();
        this.To = new OrgChart.Layout.Point();
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Edge
     * @memberof OrgChart.Layout.Edge
     * @param   {OrgChart.Layout.Point}    from
     * @param   {OrgChart.Layout.Point}    to
     * @return  {void}
     */
    $ctor1: function (from, to) {
      this.$initialize();
      this.From = from;
      this.To = to;
    },
    ctor: function () {
      this.$initialize();
    },
    getHashCode: function () {
      var h = Bridge.addHash([1701274693, this.From, this.To]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Edge)) {
        return false;
      }
      return Bridge.equals(this.From, o.From) && Bridge.equals(this.To, o.To);
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Edge();
      s.From = this.From;
      s.To = this.To;
      return s;
    },
  });

  /**
   * Base class for all chart layout strategies.
   *
   * @abstract
   * @public
   * @class OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define("OrgChart.Layout.LayoutStrategyBase", {
    /**
     * Alignment of the parent box above child boxes.
     *
     * @instance
     */
    ParentAlignment: 0,
    /**
     * Minimum distance between a parent box and any child box.
     *
     * @instance
     */
    ParentChildSpacing: 20,
    /**
     * Width of the area used to protect long vertical segments of connectors.
     *
     * @instance
     */
    ParentConnectorShield: 50,
    /**
     * Minimum distance between two sibling boxes.
     *
     * @instance
     */
    SiblingSpacing: 20,
    /**
     * Length of the small angled connector segment entering every child box.
     *
     * @instance
     */
    ChildConnectorHookLength: 5,
  });

  /**
   * A rectangular frame in the diagram logical coordinate space,
   with its shape and connectors.
   *
   * @public
   * @class OrgChart.Layout.Frame1
   */
  Bridge.define("OrgChart.Layout.Frame1", {
    /**
     * Connectors to dependent objects.
     *
     * @instance
     */
    Connector: null,
    config: {
      init: function () {
        this.Exterior = new OrgChart.Layout.Rect();
        this.BranchExterior = new OrgChart.Layout.Rect();
        this.SiblingsRowV = new OrgChart.Layout.Dimensions();
      },
    },
  });

  /**
   * Access to underlying data.
   *
   * @abstract
   * @public
   * @class OrgChart.Layout.IChartDataItem
   */
  Bridge.define("OrgChart.Layout.IChartDataItem", {
    $kind: "interface",
  });

  /**
   * Access to underlying data.
   *
   * @abstract
   * @public
   * @class OrgChart.Layout.IChartDataSource
   */
  Bridge.define("OrgChart.Layout.IChartDataSource", {
    $kind: "interface",
  });

  /**
   * Applies layout.
   *
   * @static
   * @abstract
   * @public
   * @class OrgChart.Layout.LayoutAlgorithm
   */
  Bridge.define("OrgChart.Layout.LayoutAlgorithm", {
    statics: {
      /**
           * Computes bounding rectangle in diagram space using only visible (non-autogenerated boxes).
           Useful for rendering the chart, as boxes frequently go into negative side horizontally, and have a special root box on top - all of those should not be accounted for.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.BoxTree}    visualTree
           * @return  {OrgChart.Layout.Rect}
           */
      ComputeBranchVisualBoundingRect: function (visualTree) {
        var result = new OrgChart.Layout.Rect.ctor();
        var initialized = false;

        visualTree.getRoot().IterateParentFirst(function (node) {
          var box = node.getElement();

          if (!node.getState().IsHidden && !box.IsSpecial) {
            if (initialized) {
              result = OrgChart.Layout.Rect.op_Addition(
                result,
                new OrgChart.Layout.Rect.$ctor1(
                  node.getState().TopLeft,
                  node.getState().Size
                )
              );
            } else {
              initialized = true;
              result = new OrgChart.Layout.Rect.$ctor1(
                node.getState().TopLeft,
                node.getState().Size
              );
            }
          }

          return !box.IsCollapsed;
        });

        return result;
      },
      /**
       * Initializes <b /> and performs all layout operations.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {OrgChart.Layout.LayoutState}    state
       * @return  {void}
       */
      Apply: function (state) {
        var $t, $t1;
        // verify the root
        if (state.getDiagram().getBoxes().getSystemRoot() == null) {
          throw new System.InvalidOperationException(
            "SystemRoot is not initialized on the box container"
          );
        }

        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.Preparing
        );

        var tree = OrgChart.Layout.BoxTree.Build(state);

        state.getDiagram().setVisualTree(tree);

        // verify the root: regardless of data items, there must be a system root box on top of everything
        // the corresponding node is not supposed to be rendered, it only serves as layout algorithm's starting point
        if (
          tree.getRoot() == null ||
          tree.getRoot().getElement().Id !==
            state.getDiagram().getBoxes().getSystemRoot().Id
        ) {
          throw new System.Exception(
            "SystemRoot is not on the top of the visual tree"
          );
        }

        // set the tree and update visibility
        tree.UpdateHierarchyStats();
        state.AttachVisualTree(tree);

        // update visibility of boxes based on collapsed state
        tree.IterateParentFirst($asm.$.OrgChart.Layout.LayoutAlgorithm.f1);

        // In this phase, we will figure out layout strategy
        // and initialize layout state for each node.
        // Event listener may perform initial rendering /measuring of boxes when this event fires,
        // to determine box sizes and be ready to supply them via BoxSizeFunc delegate.
        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.PreprocessVisualTree
        );

        // initialize box sizes
        if (!Bridge.staticEquals(state.getBoxSizeFunc(), null)) {
          // apply box sizes
          $t = Bridge.getEnumerator(
            System.Linq.Enumerable.from(
              state
                .getDiagram()
                .getBoxes()
                .getBoxesById()
                .System$Collections$Generic$IDictionary$2$System$Int32$OrgChart$Layout$Box$getValues()
            ).where($asm.$.OrgChart.Layout.LayoutAlgorithm.f2)
          );
          while ($t.moveNext()) {
            var box = $t.getCurrent();
            box.Size = state.getBoxSizeFunc()(box.DataId);
          }
        }

        $t1 = Bridge.getEnumerator(
          state
            .getDiagram()
            .getBoxes()
            .getBoxesById()
            .System$Collections$Generic$IDictionary$2$System$Int32$OrgChart$Layout$Box$getValues(),
          OrgChart.Layout.Box
        );
        while ($t1.moveNext()) {
          var box1 = $t1.getCurrent();
          OrgChart.Layout.LayoutAlgorithm.AssertBoxSize(box1);
        }

        // initialize layout state on each node
        tree.IterateParentFirst($asm.$.OrgChart.Layout.LayoutAlgorithm.f3);

        OrgChart.Layout.LayoutAlgorithm.PreprocessVisualTree(state, tree);
        tree.UpdateHierarchyStats();

        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.VerticalLayout
        );
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, tree.getRoot());

        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.HorizontalLayout
        );
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, tree.getRoot());

        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.ConnectorsLayout
        );
        OrgChart.Layout.LayoutAlgorithm.RouteConnectors(state, tree);

        state.setCurrentOperation(
          OrgChart.Layout.LayoutState.Operation.Completed
        );
      },
      /**
           * Ths function helps catch "undefined" values when operating in JavaScript-converted version of this code.
           Also, helps catch some bugs in C# version as well.
           They way it's implemented has direct impact on how JavaScript validation code looks like, so don't "optimize".
           *
           * @static
           * @private
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.Box}    box
           * @return  {void}
           */
      AssertBoxSize: function (box) {
        if (box.Size.Width >= 0.0 && box.Size.Width <= 1000000000.0) {
          if (box.Size.Height >= 0.0 && box.Size.Width <= 1000000000.0) {
            return;
          }
        }

        throw new System.InvalidOperationException(
          System.String.format(
            "Box {0} has invalid size: {1}x{2}",
            box.Id,
            box.Size.Width,
            box.Size.Height
          )
        );
      },
      PreprocessVisualTree: function (state, visualTree) {
        var defaultStrategy = state
          .getDiagram()
          .getLayoutSettings()
          .RequireDefaultLayoutStrategy();
        var defaultAssistantsStrategy = state
          .getDiagram()
          .getLayoutSettings()
          .RequireDefaultAssistantLayoutStrategy();

        var regular = new (System.Collections.Generic.Stack$1(
          OrgChart.Layout.LayoutStrategyBase
        ).ctor)();
        regular.push(defaultStrategy);
        var assistants = new (System.Collections.Generic.Stack$1(
          OrgChart.Layout.LayoutStrategyBase
        ).ctor)();
        assistants.push(defaultAssistantsStrategy);

        visualTree.IterateParentFirst(
          function (node) {
            if (node.getState().IsHidden) {
              return false;
            }

            var strategy = null;

            if (!Bridge.staticEquals(state.getLayoutOptimizerFunc(), null)) {
              var suggestedStrategyId = state.getLayoutOptimizerFunc()(node);
              if (!System.String.isNullOrEmpty(suggestedStrategyId)) {
                strategy = state
                  .getDiagram()
                  .getLayoutSettings()
                  .getLayoutStrategies()
                  .get(suggestedStrategyId);
              }
            }

            if (node.getIsAssistantRoot()) {
              if (strategy == null) {
                strategy =
                  node.getParentNode().getElement().AssistantLayoutStrategyId !=
                  null
                    ? state
                        .getDiagram()
                        .getLayoutSettings()
                        .getLayoutStrategies()
                        .get(
                          node.getParentNode().getElement()
                            .AssistantLayoutStrategyId
                        )
                    : assistants.peek();
              }
              assistants.push(strategy);
            } else {
              if (strategy == null) {
                strategy =
                  node.getElement().LayoutStrategyId != null
                    ? state
                        .getDiagram()
                        .getLayoutSettings()
                        .getLayoutStrategies()
                        .get(node.getElement().LayoutStrategyId)
                    : regular.peek();
              }
              regular.push(strategy);

              if (!strategy.getSupportsAssistants()) {
                node.SuppressAssistants();
              }
            }

            // now let it pre-allocate special boxes etc
            node.getState().setEffectiveLayoutStrategy(strategy);
            node
              .getState()
              .RequireLayoutStrategy()
              .PreProcessThisNode(state, node);

            return (
              (!node.getElement().IsCollapsed && node.getChildCount() > 0) ||
              node.getAssistantsRoot() != null
            );
          },
          function (node) {
            if (!node.getState().IsHidden) {
              if (node.getIsAssistantRoot()) {
                assistants.pop();
              } else {
                regular.pop();
              }
            }
          }
        );
      },
      /**
       * Re-entrant layout algorithm,
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {OrgChart.Layout.LayoutState}     state
       * @param   {OrgChart.Layout.BoxTree.Node}    branchRoot
       * @return  {void}
       */
      HorizontalLayout: function (state, branchRoot) {
        if (branchRoot.getState().IsHidden) {
          throw new System.InvalidOperationException(
            System.String.format(
              "Branch root {0} does not affect layout",
              branchRoot.getElement().Id
            )
          );
        }

        var level = state.PushLayoutLevel(branchRoot);
        try {
          if (
            branchRoot.getLevel() === 0 ||
            ((branchRoot.getState().NumberOfSiblings > 0 ||
              branchRoot.getAssistantsRoot() != null) &&
              !branchRoot.getElement().IsCollapsed)
          ) {
            branchRoot
              .getState()
              .RequireLayoutStrategy()
              .ApplyHorizontalLayout(state, level);
          }
        } finally {
          state.PopLayoutLevel();
        }
      },
      /**
       * Re-entrant layout algorithm.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {OrgChart.Layout.LayoutState}     state
       * @param   {OrgChart.Layout.BoxTree.Node}    branchRoot
       * @return  {void}
       */
      VerticalLayout: function (state, branchRoot) {
        if (branchRoot.getState().IsHidden) {
          throw new System.InvalidOperationException(
            System.String.format(
              "Branch root {0} does not affect layout",
              branchRoot.getElement().Id
            )
          );
        }

        var level = state.PushLayoutLevel(branchRoot);
        try {
          if (
            branchRoot.getLevel() === 0 ||
            ((branchRoot.getState().NumberOfSiblings > 0 ||
              branchRoot.getAssistantsRoot() != null) &&
              !branchRoot.getElement().IsCollapsed)
          ) {
            branchRoot
              .getState()
              .RequireLayoutStrategy()
              .ApplyVerticalLayout(state, level);
          }
        } finally {
          state.PopLayoutLevel();
        }
      },
      RouteConnectors: function (state, visualTree) {
        visualTree.IterateParentFirst(function (node) {
          if (
            node.getElement().IsCollapsed ||
            (node.getState().NumberOfSiblings === 0 &&
              node.getAssistantsRoot() == null)
          ) {
            return false;
          }

          if (node.getLevel() === 0) {
            return true;
          }

          if (!node.getElement().IsSpecial || node.getIsAssistantRoot()) {
            node
              .getState()
              .RequireLayoutStrategy()
              .RouteConnectors(state, node);
            return true;
          }

          return false;
        });
      },
      /**
           * Moves a given branch horizontally, except its root box.
           Also updates branch exterior rects.
           Also updates branch boundary for the current <b />.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.LayoutState}                state          
           * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    layoutLevel    
           * @param   {number}                                     offset
           * @return  {void}
           */
      MoveChildrenOnly: function (state, layoutLevel, offset) {
        var $t;
        var children = layoutLevel.BranchRoot.getChildren();
        if (
          children == null ||
          System.Array.getCount(children, OrgChart.Layout.BoxTree.Node) === 0
        ) {
          throw new System.InvalidOperationException(
            "Should never be invoked when children not set"
          );
        }

        var action = function (node) {
          if (!node.getState().IsHidden) {
            node.getState().TopLeft = node.getState().TopLeft.MoveH(offset);
            node.getState().BranchExterior = node
              .getState()
              .BranchExterior.MoveH(offset);
          }
          return true;
        };

        $t = Bridge.getEnumerator(children, OrgChart.Layout.BoxTree.Node);
        while ($t.moveNext()) {
          var child = $t.getCurrent();
          child.IterateChildFirst(action);
        }

        layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
        layoutLevel.BranchRoot.getState().BranchExterior = layoutLevel.Boundary.getBoundingRect();
      },
      /**
           * Moves a given branch horizontally, except its root box.
           Also updates branch exterior rects.
           Unlike {@link } and {@link }, does NOT update the boundary.
           *
           * @static
           * @private
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.LayoutState}     state     
           * @param   {OrgChart.Layout.BoxTree.Node}    root      
           * @param   {number}                          offset
           * @return  {void}
           */
      MoveOneChild: function (state, root, offset) {
        root.IterateChildFirst(function (node) {
          if (!node.getState().IsHidden) {
            node.getState().TopLeft = node.getState().TopLeft.MoveH(offset);
            node.getState().BranchExterior = node
              .getState()
              .BranchExterior.MoveH(offset);
          }
          return true;
        });
      },
      /**
           * Moves a given branch horizontally, including its root box.
           Also updates branch exterior rects.
           Also updates branch boundary for the current <b />.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.LayoutState}                state          
           * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    layoutLevel    
           * @param   {number}                                     offset
           * @return  {void}
           */
      MoveBranch: function (state, layoutLevel, offset) {
        OrgChart.Layout.LayoutAlgorithm.MoveOneChild(
          state,
          layoutLevel.BranchRoot,
          offset
        );
        layoutLevel.Boundary.ReloadFromBranch(layoutLevel.BranchRoot);
        layoutLevel.BranchRoot.getState().BranchExterior = layoutLevel.Boundary.getBoundingRect();
      },
      /**
           * Vertically aligns a subset of child nodes, presumably located one above another.
           All children must belong to the current layout level's root.
           Returns leftmost and rightmost boundaries of all branches in the <b />, after alignment.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.LayoutState}                 state     
           * @param   {OrgChart.Layout.LayoutState.LayoutLevel}     level     
           * @param   {System.Collections.Generic.IEnumerable$1}    subset
           * @return  {OrgChart.Layout.Dimensions}
           */
      AlignHorizontalCenters: function (state, level, subset) {
        var $t, $t1;
        // compute the rightmost center in the column
        var center = System.Double.min;
        $t = Bridge.getEnumerator(subset, OrgChart.Layout.BoxTree.Node);
        while ($t.moveNext()) {
          var child = $t.getCurrent();
          var c = child.getState().getCenterH();
          if (c > center) {
            center = c;
          }
        }

        // move those boxes in the column that are not aligned with the rightmost center
        var leftmost = System.Double.max;
        var rightmost = System.Double.min;
        $t1 = Bridge.getEnumerator(subset, OrgChart.Layout.BoxTree.Node);
        while ($t1.moveNext()) {
          var child1 = $t1.getCurrent();
          var frame = child1.getState();
          var c1 = frame.getCenterH();
          if (!OrgChart.Layout.LayoutAlgorithm.IsEqual(c1, center)) {
            var diff = center - c1;
            OrgChart.Layout.LayoutAlgorithm.MoveOneChild(state, child1, diff);
          }
          leftmost = Math.min(
            leftmost,
            child1.getState().BranchExterior.getLeft()
          );
          rightmost = Math.max(
            rightmost,
            child1.getState().BranchExterior.getRight()
          );
        }

        // update branch boundary
        level.Boundary.ReloadFromBranch(level.BranchRoot);

        return new OrgChart.Layout.Dimensions.$ctor1(leftmost, rightmost);
      },
      /**
           * Copies vertical and horionztal measurement data from <b /> frame.
           Does not copy {@link }.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.NodeLayoutInfo}    state    
           * @param   {OrgChart.Layout.NodeLayoutInfo}    other
           * @return  {void}
           */
      CopyExteriorFrom: function (state, other) {
        state.TopLeft = other.TopLeft;
        state.Size = other.Size;
        state.BranchExterior = other.BranchExterior;
        state.SiblingsRowV = other.SiblingsRowV;
      },
      /**
       * <pre><code>true</code></pre> if specified <b /> is equal to {@link }.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {number}     value
       * @return  {boolean}
       */
      IsMinValue: function (value) {
        return value <= System.Double.min + 4.94065645841247e-324;
      },
      /**
       * <pre><code>true</code></pre> if specified <b /> is equal to {@link }.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {number}     value
       * @return  {boolean}
       */
      IsMaxValue: function (value) {
        return value >= System.Double.max - 4.94065645841247e-324;
      },
      /**
       * <pre><code>true</code></pre> if specified <b /> is equal to {@link }.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {number}     value
       * @return  {boolean}
       */
      IsZero: function (value) {
        return (
          value <= 4.94065645841247e-324 && value >= -4.94065645841247e-324
        );
      },
      /**
       * <pre><code>true</code></pre> if specified <b /> is equal to {@link }.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {number}     value
       * @param   {number}     other
       * @return  {boolean}
       */
      IsEqual: function (value, other) {
        return Math.abs(value - other) <= 4.94065645841247e-324;
      },
      /**
       * Changes {@link }.
       *
       * @static
       * @public
       * @this OrgChart.Layout.LayoutAlgorithm
       * @memberof OrgChart.Layout.LayoutAlgorithm
       * @param   {OrgChart.Layout.NodeLayoutInfo}    state
       * @param   {number}                            x
       * @param   {number}                            y
       * @return  {void}
       */
      MoveTo: function (state, x, y) {
        state.TopLeft = new OrgChart.Layout.Point.$ctor1(x, y);
      },
      /**
           * Uitility for special boxes, spacers etc. 
           Adjusts exterior and resets branch exterior to size.
           *
           * @static
           * @public
           * @this OrgChart.Layout.LayoutAlgorithm
           * @memberof OrgChart.Layout.LayoutAlgorithm
           * @param   {OrgChart.Layout.NodeLayoutInfo}    state    
           * @param   {number}                            x        
           * @param   {number}                            y        
           * @param   {number}                            w        
           * @param   {number}                            h
           * @return  {void}
           */
      AdjustSpacer: function (state, x, y, w, h) {
        state.TopLeft = new OrgChart.Layout.Point.$ctor1(x, y);
        state.Size = new OrgChart.Layout.Size.$ctor1(w, h);
        state.BranchExterior = new OrgChart.Layout.Rect.$ctor3(x, y, w, h);
      },
    },
  });

  Bridge.ns("OrgChart.Layout.LayoutAlgorithm", $asm.$);

  Bridge.apply($asm.$.OrgChart.Layout.LayoutAlgorithm, {
    f1: function (node) {
      node.getState().IsHidden =
        node.getParentNode() != null &&
        (node.getParentNode().getState().IsHidden ||
          node.getParentNode().getElement().IsCollapsed);

      return true;
    },
    f2: function (x) {
      return x.getIsDataBound();
    },
    f3: function (node) {
      OrgChart.Layout.LayoutAlgorithm.MoveTo(node.getState(), 0, 0);
      node.getState().Size = node.getElement().Size;
      node.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
        new OrgChart.Layout.Point.$ctor1(0, 0),
        node.getElement().Size
      );

      return true;
    },
  });

  /**
   * @memberof System
   * @callback System.EventHandler
   * @param   {Object}                                      sender
   * @param   {OrgChart.Layout.BoundaryChangedEventArgs}    e
   * @return  {void}
   */

  /**
   * Holds state for a particular layout operation, 
   such as reference to the {@link }, current stack of boundaries etc.
   *
   * @public
   * @class OrgChart.Layout.LayoutState
   */
  Bridge.define("OrgChart.Layout.LayoutState", {
    /**
       * Stack of the layout roots, as algorithm proceeds in depth-first fashion.
       Every box has a {@link } object associated with it, to keep track of corresponding visual tree's edges.
       *
       * @instance
       */
    m_layoutStack: null,
    /**
     * Pool of currently-unused {@link } objects. They are added and removed here as they are taken for use in {@link }.
     *
     * @instance
     */
    m_pooledBoundaries: null,
    m_currentOperation: 0,
    config: {
      events: {
        /**
         * Gets fired when any {@link } is modified by methods of this object.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function addBoundaryChanged
         * @param   {System.EventHandler}    value
         * @return  {void}
         */
        /**
         * Gets fired when any {@link } is modified by methods of this object.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function removeBoundaryChanged
         * @param   {System.EventHandler}    value
         * @return  {void}
         */
        BoundaryChanged: null,
        /**
         * Gets fired when {@link } is changed on this object.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function addOperationChanged
         * @param   {System.EventHandler}    value
         * @return  {void}
         */
        /**
         * Gets fired when {@link } is changed on this object.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function removeOperationChanged
         * @param   {System.EventHandler}    value
         * @return  {void}
         */
        OperationChanged: null,
      },
      properties: {
        /**
         * Reference to the diagram for which a layout is being computed.
         *
         * @instance
         * @public
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function getDiagram
         * @return  {OrgChart.Layout.Diagram}
         */
        /**
         * Reference to the diagram for which a layout is being computed.
         *
         * @instance
         * @private
         * @this OrgChart.Layout.LayoutState
         * @memberof OrgChart.Layout.LayoutState
         * @function setDiagram
         * @param   {OrgChart.Layout.Diagram}    value
         * @return  {void}
         */
        Diagram: null,
        /**
               * Delegate that provides information about sizes of boxes.
               First argument is the underlying data item id.
               Return value is the size of the corresponding box.
               This one should be implemented by the part of rendering engine that performs content layout inside a box.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.LayoutState
               * @memberof OrgChart.Layout.LayoutState
               * @function getBoxSizeFunc
               * @return  {System.Func}
               */
        /**
               * Delegate that provides information about sizes of boxes.
               First argument is the underlying data item id.
               Return value is the size of the corresponding box.
               This one should be implemented by the part of rendering engine that performs content layout inside a box.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.LayoutState
               * @memberof OrgChart.Layout.LayoutState
               * @function setBoxSizeFunc
               * @param   {System.Func}    value
               * @return  {void}
               */
        BoxSizeFunc: null,
        /**
               * Delegate that provides a layout strategy id for a node.
               Use this to implement branch optimization algorithms.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.LayoutState
               * @memberof OrgChart.Layout.LayoutState
               * @function getLayoutOptimizerFunc
               * @return  {System.Func}
               */
        /**
               * Delegate that provides a layout strategy id for a node.
               Use this to implement branch optimization algorithms.
               *
               * @instance
               * @public
               * @this OrgChart.Layout.LayoutState
               * @memberof OrgChart.Layout.LayoutState
               * @function setLayoutOptimizerFunc
               * @param   {System.Func}    value
               * @return  {void}
               */
        LayoutOptimizerFunc: null,
      },
      init: function () {
        this.m_layoutStack = new (System.Collections.Generic.Stack$1(
          OrgChart.Layout.LayoutState.LayoutLevel
        ).ctor)();
        this.m_pooledBoundaries = new (System.Collections.Generic.Stack$1(
          OrgChart.Layout.Boundary
        ).ctor)();
      },
    },
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @param   {OrgChart.Layout.Diagram}    diagram
     * @return  {void}
     */
    ctor: function (diagram) {
      this.$initialize();
      this.setDiagram(diagram);
    },
    /**
     * Current operation in progress.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @function getCurrentOperation
     * @return  {number}
     */
    /**
     * Current operation in progress.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @function setCurrentOperation
     * @param   {number}    value
     * @return  {void}
     */
    getCurrentOperation: function () {
      return this.m_currentOperation;
    },
    /**
     * Current operation in progress.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @function getCurrentOperation
     * @return  {number}
     */
    /**
     * Current operation in progress.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @function setCurrentOperation
     * @param   {number}    value
     * @return  {void}
     */
    setCurrentOperation: function (value) {
      this.m_currentOperation = value;
      !Bridge.staticEquals(this.OperationChanged, null)
        ? this.OperationChanged(
            this,
            new OrgChart.Layout.LayoutStateOperationChangedEventArgs(this)
          )
        : null;
    },
    /**
     * Initializes the visual tree and pool of boundary objects.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @param   {OrgChart.Layout.BoxTree}    tree
     * @return  {void}
     */
    AttachVisualTree: function (tree) {
      while (this.m_pooledBoundaries.getCount() < tree.getDepth()) {
        this.m_pooledBoundaries.push(new OrgChart.Layout.Boundary.ctor());
      }
    },
    /**
       * Push a new box onto the layout stack, thus getting deeper into layout hierarchy.
       Automatically allocates a Bondary object from pool.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.LayoutState
       * @memberof OrgChart.Layout.LayoutState
       * @param   {OrgChart.Layout.BoxTree.Node}               node
       * @return  {OrgChart.Layout.LayoutState.LayoutLevel}
       */
    PushLayoutLevel: function (node) {
      if (this.m_pooledBoundaries.getCount() === 0) {
        this.m_pooledBoundaries.push(new OrgChart.Layout.Boundary.ctor());
      }

      var boundary = this.m_pooledBoundaries.pop();

      switch (this.getCurrentOperation()) {
        case OrgChart.Layout.LayoutState.Operation.VerticalLayout:
          boundary.Prepare(node);
          break;
        case OrgChart.Layout.LayoutState.Operation.HorizontalLayout:
          boundary.PrepareForHorizontalLayout(node);
          break;
        default:
          throw new System.InvalidOperationException(
            "This operation can only be invoked when performing vertical or horizontal layouts"
          );
      }

      var result = new OrgChart.Layout.LayoutState.LayoutLevel(node, boundary);
      this.m_layoutStack.push(result);
      !Bridge.staticEquals(this.BoundaryChanged, null)
        ? this.BoundaryChanged(
            this,
            new OrgChart.Layout.BoundaryChangedEventArgs(boundary, result, this)
          )
        : null;

      return result;
    },
    /**
     * Merges a provided spacer box into the current branch boundary.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState
     * @memberof OrgChart.Layout.LayoutState
     * @param   {OrgChart.Layout.BoxTree.Node}    spacer
     * @return  {void}
     */
    MergeSpacer: function (spacer) {
      if (
        this.getCurrentOperation() !==
        OrgChart.Layout.LayoutState.Operation.HorizontalLayout
      ) {
        throw new System.InvalidOperationException(
          "Spacers can only be merged during horizontal layout"
        );
      }

      if (this.m_layoutStack.getCount() === 0) {
        throw new System.InvalidOperationException(
          "Cannot merge spacers at top nesting level"
        );
      }

      var level = this.m_layoutStack.peek();
      level.Boundary.MergeFrom$1(spacer);
      !Bridge.staticEquals(this.BoundaryChanged, null)
        ? this.BoundaryChanged(
            this,
            new OrgChart.Layout.BoundaryChangedEventArgs(
              level.Boundary,
              level,
              this
            )
          )
        : null;
    },
    /**
       * Pops a box from current layout stack, thus getting higher out from layout hierarchy.
       Automatically merges popped {@link } into the current level.
       *
       * @instance
       * @public
       * @this OrgChart.Layout.LayoutState
       * @memberof OrgChart.Layout.LayoutState
       * @return  {void}
       */
    PopLayoutLevel: function () {
      var innerLevel = this.m_layoutStack.pop();
      !Bridge.staticEquals(this.BoundaryChanged, null)
        ? this.BoundaryChanged(
            this,
            new OrgChart.Layout.BoundaryChangedEventArgs(
              innerLevel.Boundary,
              innerLevel,
              this
            )
          )
        : null;

      // if this was not the root, merge boundaries into current level
      if (this.m_layoutStack.getCount() > 0) {
        var higherLevel = this.m_layoutStack.peek();

        switch (this.getCurrentOperation()) {
          case OrgChart.Layout.LayoutState.Operation.VerticalLayout:
            higherLevel.Boundary.VerticalMergeFrom(innerLevel.Boundary);
            higherLevel.BranchRoot.getState().BranchExterior = higherLevel.Boundary.getBoundingRect();
            break;
          case OrgChart.Layout.LayoutState.Operation.HorizontalLayout:
            {
              // do not apply overlap adjustment for assistant branch, they are always above regular children
              if (
                !Bridge.referenceEquals(
                  higherLevel.BranchRoot.getAssistantsRoot(),
                  innerLevel.BranchRoot
                )
              ) {
                var strategy = higherLevel.BranchRoot.getState().RequireLayoutStrategy();

                var overlap = higherLevel.Boundary.ComputeOverlap(
                  innerLevel.Boundary,
                  strategy.SiblingSpacing,
                  this.getDiagram().getLayoutSettings().getBranchSpacing(),
                  (higherLevel.BranchRoot.getElement().DataId === "0") &
                    (innerLevel.BranchRoot.getElement().DataId === "2")
                );

                if (overlap > 0) {
                  OrgChart.Layout.LayoutAlgorithm.MoveBranch(
                    this,
                    innerLevel,
                    overlap
                  );
                  !Bridge.staticEquals(this.BoundaryChanged, null)
                    ? this.BoundaryChanged(
                        this,
                        new OrgChart.Layout.BoundaryChangedEventArgs(
                          innerLevel.Boundary,
                          innerLevel,
                          this
                        )
                      )
                    : null;
                }
              }
              higherLevel.Boundary.MergeFrom(innerLevel.Boundary);

              // Do not update branch vertical measurements from the boundary, because boundary adds children one-by-one.
              // If we take it from boundary, then branch vertical measurement will be incorrect until all children are laid out horizontally,
              // and this temporarily incorrect state will break those algorithms that need to know combined branch height.
              higherLevel.BranchRoot.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor3(
                higherLevel.Boundary.getBoundingRect().getLeft(),
                higherLevel.BranchRoot.getState().BranchExterior.getTop(),
                higherLevel.Boundary.getBoundingRect().Size.Width,
                higherLevel.BranchRoot.getState().BranchExterior.Size.Height
              );
            }
            break;
          default:
            throw new System.InvalidOperationException(
              "This operation can only be invoked when performing vertical or horizontal layouts"
            );
        }
        !Bridge.staticEquals(this.BoundaryChanged, null)
          ? this.BoundaryChanged(
              this,
              new OrgChart.Layout.BoundaryChangedEventArgs(
                higherLevel.Boundary,
                higherLevel,
                this
              )
            )
          : null;
      }

      // return boundary to the pool
      this.m_pooledBoundaries.push(innerLevel.Boundary);
    },
  });

  /**
   * State of the layout operation for a particular sub-branch.
   *
   * @public
   * @class OrgChart.Layout.LayoutState.LayoutLevel
   */
  Bridge.define("OrgChart.Layout.LayoutState.LayoutLevel", {
    /**
     * Root parent for this subtree.
     *
     * @instance
     */
    BranchRoot: null,
    /**
     * Boundaries of this entire subtree.
     *
     * @instance
     */
    Boundary: null,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutState.LayoutLevel
     * @memberof OrgChart.Layout.LayoutState.LayoutLevel
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @param   {OrgChart.Layout.Boundary}        boundary
     * @return  {void}
     */
    ctor: function (node, boundary) {
      this.$initialize();
      this.BranchRoot = node;
      this.Boundary = boundary;
    },
  });

  /**
   * Current layout operation.
   *
   * @public
   * @class number
   */
  Bridge.define("OrgChart.Layout.LayoutState.Operation", {
    $kind: "enum",
    statics: {
      /**
       * No op.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 0
       * @type number
       */
      Idle: 0,
      /**
       * Making initial preparations, creating visual tree.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 1
       * @type number
       */
      Preparing: 1,
      /**
       * Pre-layout modifications of the visual tree.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 2
       * @type number
       */
      PreprocessVisualTree: 2,
      /**
       * Vertical layout in progress.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 3
       * @type number
       */
      VerticalLayout: 3,
      /**
       * Horizontal layout in progress.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 4
       * @type number
       */
      HorizontalLayout: 4,
      /**
       * Creating and positioning connectors.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 5
       * @type number
       */
      ConnectorsLayout: 5,
      /**
       * All layout operations have been completed.
       *
       * @static
       * @public
       * @memberof number
       * @constant
       * @default 6
       * @type number
       */
      Completed: 6,
    },
  });

  /**
   * Called when boundary is updated.
   *
   * @public
   * @class OrgChart.Layout.LayoutStateOperationChangedEventArgs
   */
  Bridge.define("OrgChart.Layout.LayoutStateOperationChangedEventArgs", {
    /**
     * Current layout state.
     *
     * @instance
     */
    State: null,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.LayoutStateOperationChangedEventArgs
     * @memberof OrgChart.Layout.LayoutStateOperationChangedEventArgs
     * @param   {OrgChart.Layout.LayoutState}    state
     * @return  {void}
     */
    ctor: function (state) {
      this.$initialize();
      this.State = state;
    },
  });

  Bridge.define(
    "OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter.GroupIterator",
    {
      m_numberOfSiblings: 0,
      m_numberOfGroups: 0,
      Group: 0,
      FromIndex: 0,
      Count: 0,
      MaxOnLeft: 0,
      ctor: function (numberOfSiblings, numberOfGroups) {
        this.$initialize();
        this.m_numberOfSiblings = numberOfSiblings;
        this.m_numberOfGroups = numberOfGroups;
      },
      CountInGroup: function () {
        var countInRow = (this.m_numberOfGroups * 2) | 0;

        var result = 0;
        var countToThisGroup = (((this.Group * 2) | 0) + 2) | 0;
        var firstInRow = 0;
        while (true) {
          var countInThisRow =
            firstInRow >= ((this.m_numberOfSiblings - countInRow) | 0)
              ? (this.m_numberOfSiblings - firstInRow) | 0
              : countInRow;
          if (countInThisRow >= countToThisGroup) {
            result = (result + 2) | 0;
          } else {
            countToThisGroup = (countToThisGroup - 1) | 0;
            if (countInThisRow >= countToThisGroup) {
              result = (result + 1) | 0;
            }
            break;
          }
          firstInRow = (firstInRow + countInRow) | 0;
        }

        return result;
      },
      NextGroup: function () {
        this.FromIndex = (this.FromIndex + this.Count) | 0;

        if (this.FromIndex > 0) {
          this.Group = (this.Group + 1) | 0;
        }
        this.Count = this.CountInGroup();
        this.MaxOnLeft =
          ((Bridge.Int.div(this.Count, 2) | 0) + (this.Count % 2)) | 0;
        return this.Count !== 0;
      },
    }
  );

  /**
   * Supporting layout-related information, attached to every node of a visual tree.
   *
   * @public
   * @class OrgChart.Layout.NodeLayoutInfo
   */
  Bridge.define("OrgChart.Layout.NodeLayoutInfo", {
    /**
       * When <pre><code>false</code></pre>, this node and its children will participate in the layout.
       Is automatically set to <pre><code>true</code></pre> when any parent upwards is collapsed.
       *
       * @instance
       */
    IsHidden: false,
    /**
       * Number of visible regular children in this node's immediate children list
       that are affecting each other as siblings during layout.
       Some special auto-generated spacer boxes may not be included into this number,
       those are manually merged into the {@link } after other boxes are ready.
       Computed by implementations of {@link }.
       *
       * @instance
       */
    NumberOfSiblings: 0,
    /**
       * Number of sibling rows. Used by strategies that arrange box's immediate children into more than one line.
       Meaning of "row" may differ.
       Computed by implementations of {@link }.
       *
       * @instance
       */
    NumberOfSiblingRows: 0,
    /**
       * Number of sibling columns. Used by strategies that arrange box's immediate children into more than one column.
       Meaning of "column" may differ, e.g. it may include one or more boxes per each logical row.
       Computed by implementations of {@link }.
       *
       * @instance
       */
    NumberOfSiblingColumns: 0,
    /**
     * Connectors to dependent objects.
     *
     * @instance
     */
    Connector: null,
    m_effectiveLayoutStrategy: null,
    config: {
      init: function () {
        this.TopLeft = new OrgChart.Layout.Point();
        this.Size = new OrgChart.Layout.Size();
        this.BranchExterior = new OrgChart.Layout.Rect();
        this.SiblingsRowV = new OrgChart.Layout.Dimensions();
      },
    },
    /**
     * Effective layout strategy, derived from settings or inherited from parent.
     *
     * @instance
     * @function getEffectiveLayoutStrategy
     */
    /**
     * Effective layout strategy, derived from settings or inherited from parent.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function setEffectiveLayoutStrategy
     * @param   {OrgChart.Layout.LayoutStrategyBase}    value
     * @return  {void}
     */
    setEffectiveLayoutStrategy: function (value) {
      this.m_effectiveLayoutStrategy = value;
    },
    /**
     * Left edge of the bounding rectangle.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getLeft
     * @return  {number}
     */
    /**
     * Left edge of the bounding rectangle.
     *
     * @instance
     * @function setLeft
     */
    getLeft: function () {
      return this.TopLeft.X;
    },
    /**
     * Right edge of the bounding rectangle.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getRight
     * @return  {number}
     */
    /**
     * Right edge of the bounding rectangle.
     *
     * @instance
     * @function setRight
     */
    getRight: function () {
      return this.TopLeft.X + this.Size.Width;
    },
    /**
     * Top edge of the bounding rectangle.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getTop
     * @return  {number}
     */
    /**
     * Top edge of the bounding rectangle.
     *
     * @instance
     * @function setTop
     */
    getTop: function () {
      return this.TopLeft.Y;
    },
    /**
     * Bottom edge of the bounding rectangle.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getBottom
     * @return  {number}
     */
    /**
     * Bottom edge of the bounding rectangle.
     *
     * @instance
     * @function setBottom
     */
    getBottom: function () {
      return this.TopLeft.Y + this.Size.Height;
    },
    /**
     * Horizontal center.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getCenterH
     * @return  {number}
     */
    /**
     * Horizontal center.
     *
     * @instance
     * @function setCenterH
     */
    getCenterH: function () {
      return this.TopLeft.X + this.Size.Width / 2;
    },
    /**
     * Vertical center.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @function getCenterV
     * @return  {number}
     */
    /**
     * Vertical center.
     *
     * @instance
     * @function setCenterV
     */
    getCenterV: function () {
      return this.TopLeft.Y + this.Size.Height / 2;
    },
    /**
     * Returns value of {@link }, throws if <pre><code>null</code></pre>.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.NodeLayoutInfo
     * @memberof OrgChart.Layout.NodeLayoutInfo
     * @return  {OrgChart.Layout.LayoutStrategyBase}
     */
    RequireLayoutStrategy: function () {
      if (this.m_effectiveLayoutStrategy == null) {
        throw new System.Exception("effectiveLayoutStrategy is not set");
      }

      return this.m_effectiveLayoutStrategy;
    },
  });

  /**
   * A point in the diagram logical coordinate space.
   *
   * @public
   * @class OrgChart.Layout.Point
   */
  Bridge.define("OrgChart.Layout.Point", {
    $kind: "struct",
    statics: {
      getDefaultValue: function () {
        return new OrgChart.Layout.Point();
      },
    },
    /**
     * X-coordinate.
     *
     * @instance
     */
    X: 0,
    /**
     * Y-coordinate.
     *
     * @instance
     */
    Y: 0,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Point
     * @memberof OrgChart.Layout.Point
     * @param   {number}    x
     * @param   {number}    y
     * @return  {void}
     */
    $ctor1: function (x, y) {
      this.$initialize();
      this.X = x;
      this.Y = y;
    },
    ctor: function () {
      this.$initialize();
    },
    /**
     * Returns a point moved by <b /> horizontally.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Point
     * @memberof OrgChart.Layout.Point
     * @param   {number}                   offsetX
     * @return  {OrgChart.Layout.Point}
     */
    MoveH: function (offsetX) {
      return new OrgChart.Layout.Point.$ctor1(this.X + offsetX, this.Y);
    },
    getHashCode: function () {
      var h = Bridge.addHash([1852403652, this.X, this.Y]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Point)) {
        return false;
      }
      return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Point();
      s.X = this.X;
      s.Y = this.Y;
      return s;
    },
  });

  /**
   * A rectangle in the diagram logical coordinate space.
   *
   * @public
   * @class OrgChart.Layout.Rect
   */
  Bridge.define("OrgChart.Layout.Rect", {
    $kind: "struct",
    statics: {
      /**
       * Computes a rect that encloses both of given rectangles.
       *
       * @static
       * @public
       * @this OrgChart.Layout.Rect
       * @memberof OrgChart.Layout.Rect
       * @param   {OrgChart.Layout.Rect}    x
       * @param   {OrgChart.Layout.Rect}    y
       * @return  {OrgChart.Layout.Rect}
       */
      op_Addition: function (x, y) {
        var left = Math.min(x.getLeft(), y.getLeft());
        var top = Math.min(x.getTop(), y.getTop());
        var right = Math.max(x.getRight(), y.getRight());
        var bottom = Math.max(x.getBottom(), y.getBottom());
        return new OrgChart.Layout.Rect.$ctor3(
          left,
          top,
          right - left,
          bottom - top
        );
      },
      getDefaultValue: function () {
        return new OrgChart.Layout.Rect();
      },
    },
    config: {
      init: function () {
        this.TopLeft = new OrgChart.Layout.Point();
        this.Size = new OrgChart.Layout.Size();
      },
    },
    /**
     * Ctr. to help client code prevent naming conflicts with Rect, Point and Size type names.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @param   {number}    x
     * @param   {number}    y
     * @param   {number}    w
     * @param   {number}    h
     * @return  {void}
     */
    $ctor3: function (x, y, w, h) {
      this.$initialize();
      if (w < 0) {
        throw new System.ArgumentOutOfRangeException("w");
      }

      if (h < 0) {
        throw new System.ArgumentOutOfRangeException("h");
      }

      this.TopLeft = new OrgChart.Layout.Point.$ctor1(x, y);
      this.Size = new OrgChart.Layout.Size.$ctor1(w, h);
    },
    /**
     * Ctr. for case with known location.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @param   {OrgChart.Layout.Point}    topLeft
     * @param   {OrgChart.Layout.Size}     size
     * @return  {void}
     */
    $ctor1: function (topLeft, size) {
      this.$initialize();
      this.TopLeft = topLeft;
      this.Size = size;
    },
    /**
     * Ctr. for case with only the size known.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @param   {OrgChart.Layout.Size}    size
     * @return  {void}
     */
    $ctor2: function (size) {
      this.$initialize();
      this.TopLeft = new OrgChart.Layout.Point.$ctor1(0, 0);
      this.Size = size;
    },
    ctor: function () {
      this.$initialize();
    },
    /**
     * Computed bottom-right corner.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getBottomRight
     * @return  {OrgChart.Layout.Point}
     */
    /**
     * Computed bottom-right corner.
     *
     * @instance
     * @function setBottomRight
     */
    getBottomRight: function () {
      return new OrgChart.Layout.Point.$ctor1(
        this.TopLeft.X + this.Size.Width,
        this.TopLeft.Y + this.Size.Height
      );
    },
    /**
     * Left edge.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getLeft
     * @return  {number}
     */
    /**
     * Left edge.
     *
     * @instance
     * @function setLeft
     */
    getLeft: function () {
      return this.TopLeft.X;
    },
    /**
     * Right edge.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getRight
     * @return  {number}
     */
    /**
     * Right edge.
     *
     * @instance
     * @function setRight
     */
    getRight: function () {
      return this.TopLeft.X + this.Size.Width;
    },
    /**
     * Horizontal center.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getCenterH
     * @return  {number}
     */
    /**
     * Horizontal center.
     *
     * @instance
     * @function setCenterH
     */
    getCenterH: function () {
      return this.TopLeft.X + this.Size.Width / 2;
    },
    /**
     * Vertical center.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getCenterV
     * @return  {number}
     */
    /**
     * Vertical center.
     *
     * @instance
     * @function setCenterV
     */
    getCenterV: function () {
      return this.TopLeft.Y + this.Size.Height / 2;
    },
    /**
     * Top edge.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getTop
     * @return  {number}
     */
    /**
     * Top edge.
     *
     * @instance
     * @function setTop
     */
    getTop: function () {
      return this.TopLeft.Y;
    },
    /**
     * Bottom edge.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @function getBottom
     * @return  {number}
     */
    /**
     * Bottom edge.
     *
     * @instance
     * @function setBottom
     */
    getBottom: function () {
      return this.TopLeft.Y + this.Size.Height;
    },
    /**
     * Returns a rectangle moved by <b /> horizontally.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Rect
     * @memberof OrgChart.Layout.Rect
     * @param   {number}                  offsetX
     * @return  {OrgChart.Layout.Rect}
     */
    MoveH: function (offsetX) {
      return new OrgChart.Layout.Rect.$ctor1(
        new OrgChart.Layout.Point.$ctor1(
          this.getLeft() + offsetX,
          this.getTop()
        ),
        this.Size
      );
    },
    getHashCode: function () {
      var h = Bridge.addHash([1952671058, this.TopLeft, this.Size]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Rect)) {
        return false;
      }
      return (
        Bridge.equals(this.TopLeft, o.TopLeft) &&
        Bridge.equals(this.Size, o.Size)
      );
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Rect();
      s.TopLeft = this.TopLeft;
      s.Size = this.Size;
      return s;
    },
  });

  /**
   * A point in the diagram logical coordinate space.
   *
   * @public
   * @class OrgChart.Layout.Size
   */
  Bridge.define("OrgChart.Layout.Size", {
    $kind: "struct",
    statics: {
      getDefaultValue: function () {
        return new OrgChart.Layout.Size();
      },
    },
    /**
     * X-coordinate.
     *
     * @instance
     */
    Width: 0,
    /**
     * Y-coordinate.
     *
     * @instance
     */
    Height: 0,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.Size
     * @memberof OrgChart.Layout.Size
     * @param   {number}    w
     * @param   {number}    h
     * @return  {void}
     */
    $ctor1: function (w, h) {
      this.$initialize();
      this.Width = w;
      this.Height = h;
    },
    ctor: function () {
      this.$initialize();
    },
    getHashCode: function () {
      var h = Bridge.addHash([1702521171, this.Width, this.Height]);
      return h;
    },
    equals: function (o) {
      if (!Bridge.is(o, OrgChart.Layout.Size)) {
        return false;
      }
      return (
        Bridge.equals(this.Width, o.Width) &&
        Bridge.equals(this.Height, o.Height)
      );
    },
    $clone: function (to) {
      var s = to || new OrgChart.Layout.Size();
      s.Width = this.Width;
      s.Height = this.Height;
      return s;
    },
  });

  /**
   * For stacking layout strategies, direction of stacking child items.
   *
   * @public
   * @class OrgChart.Layout.StackOrientation
   */
  Bridge.define("OrgChart.Layout.StackOrientation", {
    $kind: "enum",
    statics: {
      /**
       * Default value is invalid, do not use it.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.StackOrientation
       * @constant
       * @default 0
       * @type OrgChart.Layout.StackOrientation
       */
      InvalidValue: 0,
      /**
       * Put all children in one line under parent, order left-to-right horizontally.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.StackOrientation
       * @constant
       * @default 1
       * @type OrgChart.Layout.StackOrientation
       */
      SingleRowHorizontal: 1,
      /**
       * Put all children in one column under parent, order top-bottom vertically.
       *
       * @static
       * @public
       * @memberof OrgChart.Layout.StackOrientation
       * @constant
       * @default 2
       * @type OrgChart.Layout.StackOrientation
       */
      SingleColumnVertical: 2,
    },
  });

  /** @namespace OrgChart.Test */

  /**
   * Test data generator utility.
   *
   * @public
   * @class OrgChart.Test.TestDataGen
   */
  Bridge.define("OrgChart.Test.TestDataGen", {
    statics: {
      /**
       * Some random box sizes.
       *
       * @static
       * @public
       * @this OrgChart.Test.TestDataGen
       * @memberof OrgChart.Test.TestDataGen
       * @param   {OrgChart.Layout.BoxContainer}    boxContainer
       * @return  {void}
       */
      GenerateBoxSizes: function (boxContainer) {
        var $t;
        var minWidth = 50;
        var minHeight = 50;
        var widthVariation = 50;
        var heightVariation = 50;

        var seed = 0; //Environment.TickCount;
        System.Diagnostics.Debug.writeln(seed.toString());
        var random = new System.Random.$ctor1(seed);
        $t = Bridge.getEnumerator(
          boxContainer
            .getBoxesById()
            .System$Collections$Generic$IDictionary$2$System$Int32$OrgChart$Layout$Box$getValues(),
          OrgChart.Layout.Box
        );
        while ($t.moveNext()) {
          var box = $t.getCurrent();
          if (!box.IsSpecial) {
            box.Size = new OrgChart.Layout.Size.$ctor1(
              (minWidth + random.next$1(widthVariation)) | 0,
              (minHeight + random.next$1(heightVariation)) | 0
            );
          }
        }
      },
    },
    /**
     * Adds some data items into supplied <b />.
     *
     * @instance
     * @public
     * @this OrgChart.Test.TestDataGen
     * @memberof OrgChart.Test.TestDataGen
     * @param   {OrgChart.Test.TestDataSource}    dataSource
     * @param   {number}                          count
     * @param   {number}                          percentAssistants
     * @return  {void}
     */
    GenerateDataItems: function (dataSource, count, percentAssistants) {
      var $t;
      $t = Bridge.getEnumerator(
        this.GenerateRandomDataItems(count, percentAssistants)
      );
      while ($t.moveNext()) {
        var item = $t.getCurrent();
        dataSource.Items.add(item.getId(), item);
      }
    },
    GenerateRandomDataItems: function (itemCount, percentAssistants) {
      if (itemCount < 0) {
        throw new System.ArgumentOutOfRangeException(
          "itemCount",
          "Count must be zero or positive",
          null,
          itemCount
        );
      }

      var random = new System.Random.$ctor1(0);

      var items = new (System.Collections.Generic.List$1(
        OrgChart.Test.TestDataItem
      ))(itemCount);
      for (var i = 0; i < itemCount; i = (i + 1) | 0) {
        items.add(
          Bridge.merge(new OrgChart.Test.TestDataItem(), {
            setId: i.toString(),
          })
        );
      }

      var firstInLayer = 1;
      var prevLayerSize = 1;
      while (firstInLayer < itemCount) {
        var layerSize =
          (((15 + prevLayerSize) | 0) +
            random.next$1((prevLayerSize * 2) | 0)) |
          0;
        for (
          var i1 = firstInLayer;
          i1 < ((firstInLayer + layerSize) | 0) && i1 < itemCount;
          i1 = (i1 + 1) | 0
        ) {
          var parentIndex =
            (((firstInLayer - 1) | 0) - random.next$1(prevLayerSize)) | 0;
          items.getItem(i1).setParentId(items.getItem(parentIndex).getId());
        }

        firstInLayer = (firstInLayer + layerSize) | 0;
        prevLayerSize = layerSize;
      }

      // now shuffle the items a bit, to prevent clients from assuming that data always comes in hierarchical order
      for (
        var i2 = 0;
        i2 < (Bridge.Int.div(items.getCount(), 2) | 0);
        i2 = (i2 + 1) | 0
      ) {
        var from = random.next$1(items.getCount());
        var to = random.next$1(items.getCount());
        var temp = items.getItem(from);
        items.setItem(from, items.getItem(to));
        items.setItem(to, temp);
      }

      // now mark first five boxes
      if (percentAssistants > 0) {
        var assistantCount = Math.min(
          items.getCount(),
          Bridge.Int.clip32(
            Math.ceil(((items.getCount() * percentAssistants) | 0) / 100.0)
          )
        );
        for (var i3 = 0; i3 < assistantCount; i3 = (i3 + 1) | 0) {
          items.getItem(random.next$1(items.getCount())).setIsAssistant(true);
        }
      }

      return items;
    },
  });

  /** @namespace System.Diagnostics */

  /**
   * Stub.
   *
   * @public
   * @class System.Diagnostics.DebuggerDisplayAttribute
   * @augments System.Attribute
   */
  Bridge.define("System.Diagnostics.DebuggerDisplayAttribute", {
    inherits: [System.Attribute],
    /**
     * Stub.
     *
     * @instance
     * @public
     * @this System.Diagnostics.DebuggerDisplayAttribute
     * @memberof System.Diagnostics.DebuggerDisplayAttribute
     * @param   {string}    template
     * @return  {void}
     */
    ctor: function (template) {
      this.$initialize();
      System.Attribute.ctor.call(this);
    },
  });

  /**
   * Arranges "assistant" child boxes in a single vertically stretched group, stuffed onto "fish bones" on left and right sides of vertical carrier.
   Can only be configured to position parent in the middle of children.
   *
   * @public
   * @class OrgChart.Layout.FishboneAssistantsLayoutStrategy
   * @augments OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define("OrgChart.Layout.FishboneAssistantsLayoutStrategy", {
    inherits: [OrgChart.Layout.LayoutStrategyBase],
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.FishboneAssistantsLayoutStrategy
       * @memberof OrgChart.Layout.FishboneAssistantsLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return false;
    },
    /**
     * A chance for layout strategy to append special auto-generated boxes into the visual tree.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @memberof OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PreProcessThisNode: function (state, node) {
      node.getState().NumberOfSiblings = node.getChildCount();

      // only add spacers for non-collapsed boxes
      if (node.getState().NumberOfSiblings > 0) {
        // using column == group here,
        // and each group consists of two vertical stretches of boxes with a vertical carrier in between
        node.getState().NumberOfSiblingColumns = 1;
        node.getState().NumberOfSiblingRows =
          Bridge.Int.div(node.getState().NumberOfSiblings, 2) | 0;
        if (node.getState().NumberOfSiblings % 2 !== 0) {
          node.getState().NumberOfSiblingRows =
            (node.getState().NumberOfSiblingRows + 1) | 0;
        }

        // a vertical carrier from parent
        var spacer = OrgChart.Layout.Box.Special(
          OrgChart.Layout.Box.None,
          node.getElement().Id,
          false
        );
        node.AddRegularChild(spacer);
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @memberof OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;
      if (node.getLevel() === 0) {
        throw new System.InvalidOperationException(
          "Should never be invoked on root node"
        );
      }

      var prevRowBottom = node.getState().SiblingsRowV.To;

      var maxOnLeft = this.MaxOnLeft(node);
      for (var i = 0; i < maxOnLeft; i = (i + 1) | 0) {
        var spacing = i === 0 ? this.ParentChildSpacing : this.SiblingSpacing;

        var child = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        );
        var frame = child.getState();
        OrgChart.Layout.LayoutAlgorithm.MoveTo(
          frame,
          frame.getLeft(),
          prevRowBottom + spacing
        );

        var rowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          frame.getTop(),
          frame.getBottom()
        );

        var i2 = (i + maxOnLeft) | 0;
        if (i2 < node.getState().NumberOfSiblings) {
          var child2 = System.Array.getItem(
            node.getChildren(),
            i2,
            OrgChart.Layout.BoxTree.Node
          );
          var frame2 = child2.getState();
          OrgChart.Layout.LayoutAlgorithm.MoveTo(
            frame2,
            frame2.getLeft(),
            prevRowBottom + spacing
          );

          if (frame2.getBottom() > frame.getBottom()) {
            OrgChart.Layout.LayoutAlgorithm.MoveTo(
              frame,
              frame.getLeft(),
              frame2.getCenterV() - frame.Size.Height / 2
            );
          } else if (frame2.getBottom() < frame.getBottom()) {
            OrgChart.Layout.LayoutAlgorithm.MoveTo(
              frame2,
              frame2.getLeft(),
              frame.getCenterV() - frame2.Size.Height / 2
            );
          }

          frame2.BranchExterior = new OrgChart.Layout.Rect.$ctor1(
            frame2.TopLeft,
            frame2.Size
          );
          rowExterior = OrgChart.Layout.Dimensions.op_Addition(
            rowExterior,
            new OrgChart.Layout.Dimensions.$ctor1(
              frame2.getTop(),
              frame2.getBottom()
            )
          );

          frame2.SiblingsRowV = rowExterior;
          OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child2);
          prevRowBottom = frame2.BranchExterior.getBottom();
        }

        frame.BranchExterior = new OrgChart.Layout.Rect.$ctor1(
          frame.TopLeft,
          frame.Size
        );
        frame.SiblingsRowV = rowExterior;
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child);
        prevRowBottom = Math.max(
          prevRowBottom,
          frame.BranchExterior.getBottom()
        );
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @memberof OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var node = level.BranchRoot;
      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      var left = true;
      var countOnThisSide = 0;
      var maxOnLeft = this.MaxOnLeft(node);
      for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
        var child = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        );
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);

        // we go top-bottom to layout left side of the group,
        // then add a carrier protector
        // then top-bottom to fill right side of the group
        if ((countOnThisSide = (countOnThisSide + 1) | 0) === maxOnLeft) {
          if (left) {
            // horizontally align children in left pillar
            OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
              state,
              level,
              this.EnumerateSiblings(node, 0, maxOnLeft)
            );

            left = false;
            countOnThisSide = 0;

            var rightmost = System.Double.min;
            for (var k = 0; k <= i; k = (k + 1) | 0) {
              rightmost = Math.max(
                rightmost,
                System.Array.getItem(
                  node.getChildren(),
                  k,
                  OrgChart.Layout.BoxTree.Node
                )
                  .getState()
                  .BranchExterior.getRight()
              );
            }

            // vertical spacer does not have to be extended to the bottom of the lowest branch,
            // unless the lowest branch on the right side has some children and is expanded
            if (node.getState().NumberOfSiblings % 2 !== 0) {
              rightmost = Math.max(rightmost, child.getState().getRight());
            } else {
              var opposite = System.Array.getItem(
                node.getChildren(),
                (node.getState().NumberOfSiblings - 1) | 0,
                OrgChart.Layout.BoxTree.Node
              );
              if (
                opposite.getElement().IsCollapsed ||
                opposite.getChildCount() === 0
              ) {
                rightmost = Math.max(rightmost, child.getState().getRight());
              } else {
                rightmost = Math.max(
                  rightmost,
                  child.getState().BranchExterior.getRight()
                );
              }
            }

            // integrate protector for group's vertical carrier
            // it must prevent boxes on the right side from overlapping the middle vertical connector,
            // so protector's height must be set to height of this entire assistant branch
            var spacer = System.Array.getItem(
              node.getChildren(),
              node.getState().NumberOfSiblings,
              OrgChart.Layout.BoxTree.Node
            );
            OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
              spacer.getState(),
              rightmost,
              node.getState().getBottom(),
              this.ParentConnectorShield,
              node.getState().BranchExterior.getBottom() -
                node.getState().getBottom()
            );
            level.Boundary.MergeFrom$1(spacer);
          }
        }
      }

      // horizontally align children in right pillar
      OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
        state,
        level,
        this.EnumerateSiblings(
          node,
          maxOnLeft,
          node.getState().NumberOfSiblings
        )
      );

      // align children under parent
      if (node.getLevel() > 0 && node.getState().NumberOfSiblings > 0) {
        var diff;
        var carrier = System.Array.getItem(
          node.getChildren(),
          node.getState().NumberOfSiblings,
          OrgChart.Layout.BoxTree.Node
        )
          .getState()
          .getCenterH();
        var desiredCenter = node.getState().getCenterH();
        diff = desiredCenter - carrier;
        OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
      }
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @memberof OrgChart.Layout.FishboneAssistantsLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      var count = node.getState().NumberOfSiblings;
      if (count === 0) {
        return;
      }

      if (this.NeedCarrierProtector(node)) {
        count = (count + 1) | 0;
      }

      var segments = System.Array.init(count, function () {
        return new OrgChart.Layout.Edge();
      });

      var ix = 0;

      // one hook for each child
      var maxOnLeft = this.MaxOnLeft(node);
      var carrier = System.Array.getItem(
        node.getChildren(),
        node.getState().NumberOfSiblings,
        OrgChart.Layout.BoxTree.Node
      ).getState();
      var from = carrier.getCenterH();

      var isLeft = true;
      var countOnThisSide = 0;
      var bottomMost = System.Double.min;
      for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
        var to = isLeft
          ? System.Array.getItem(
              node.getChildren(),
              i,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getRight()
          : System.Array.getItem(
              node.getChildren(),
              i,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getLeft();
        var y = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        )
          .getState()
          .getCenterV();
        bottomMost = Math.max(bottomMost, y);
        segments[
          Bridge.identity(ix, (ix = (ix + 1) | 0))
        ] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(from, y),
          new OrgChart.Layout.Point.$ctor1(to, y)
        );

        if ((countOnThisSide = (countOnThisSide + 1) | 0) === maxOnLeft) {
          countOnThisSide = 0;
          isLeft = !isLeft;
        }
      }

      if (this.NeedCarrierProtector(node)) {
        // one for each vertical carrier
        segments[
          node.getState().NumberOfSiblings
        ] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(
            carrier.getCenterH(),
            carrier.getTop()
          ),
          new OrgChart.Layout.Point.$ctor1(carrier.getCenterH(), bottomMost)
        );
      }

      node.getState().Connector = new OrgChart.Layout.Connector(segments);
    },
    MaxOnLeft: function (node) {
      return (
        ((Bridge.Int.div(node.getState().NumberOfSiblings, 2) | 0) +
          (node.getState().NumberOfSiblings % 2)) |
        0
      );
    },
    NeedCarrierProtector: function (node) {
      return node.getParentNode().getChildCount() === 0;
    },
    EnumerateSiblings: function (node, from, to) {
      var $yield = [];
      for (var i = from; i < to; i = (i + 1) | 0) {
        $yield.push(
          System.Array.getItem(
            node.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          )
        );
      }
      return System.Array.toEnumerable($yield);
    },
  });

  /**
   * Arranges child boxes in a single line under the parent.
   Can be configured to position parent in the middle, on the left or right from children.
   *
   * @public
   * @class OrgChart.Layout.LinearLayoutStrategy
   * @augments OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define("OrgChart.Layout.LinearLayoutStrategy", {
    inherits: [OrgChart.Layout.LayoutStrategyBase],
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.LinearLayoutStrategy
       * @memberof OrgChart.Layout.LinearLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return true;
    },
    /**
     * A chance for layout strategy to append special auto-generated boxes into the visual tree.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.LinearLayoutStrategy
     * @memberof OrgChart.Layout.LinearLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PreProcessThisNode: function (state, node) {
      if (node.getChildCount() > 0) {
        node.getState().NumberOfSiblings = node.getElement().IsCollapsed
          ? 0
          : node.getChildCount();

        // only add spacers for non-collapsed boxes
        if (!node.getElement().IsCollapsed) {
          var verticalSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.AddRegularChild(verticalSpacer);

          var horizontalSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.AddRegularChild(horizontalSpacer);
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.LinearLayoutStrategy
     * @memberof OrgChart.Layout.LinearLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getAssistantsRoot() != null) {
        // assistants root has to be initialized with main node's exterior
        OrgChart.Layout.LayoutAlgorithm.CopyExteriorFrom(
          node.getAssistantsRoot().getState(),
          node.getState()
        );
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      if (node.getState().NumberOfSiblings === 0) {
        return;
      }

      var siblingsRowExterior = OrgChart.Layout.Dimensions.MinMax();

      var top =
        node.getAssistantsRoot() == null
          ? node.getState().SiblingsRowV.To + this.ParentChildSpacing
          : node.getState().BranchExterior.getBottom() +
            this.ParentChildSpacing;

      for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
        var child = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        );
        var rect = child.getState();

        OrgChart.Layout.LayoutAlgorithm.MoveTo(child.getState(), 0, top);
        child.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
          child.getState().TopLeft,
          child.getState().Size
        );

        siblingsRowExterior = OrgChart.Layout.Dimensions.op_Addition(
          siblingsRowExterior,
          new OrgChart.Layout.Dimensions.$ctor1(top, top + rect.Size.Height)
        );
      }

      siblingsRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
        siblingsRowExterior.From,
        siblingsRowExterior.To
      );

      for (
        var i1 = 0;
        i1 < node.getState().NumberOfSiblings;
        i1 = (i1 + 1) | 0
      ) {
        var child1 = System.Array.getItem(
          node.getChildren(),
          i1,
          OrgChart.Layout.BoxTree.Node
        );
        child1.getState().SiblingsRowV = siblingsRowExterior;

        // re-enter layout algorithm for child branch
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child1);
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.LinearLayoutStrategy
     * @memberof OrgChart.Layout.LinearLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getAssistantsRoot() != null) {
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
        var child = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        );
        // re-enter layout algorithm for child branch
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);
      }

      if (node.getLevel() > 0 && node.getChildCount() > 0) {
        var rect = node.getState();
        var leftmost = System.Array.getItem(
          node.getChildren(),
          0,
          OrgChart.Layout.BoxTree.Node
        )
          .getState()
          .getCenterH();
        var rightmost = System.Array.getItem(
          node.getChildren(),
          (node.getState().NumberOfSiblings - 1) | 0,
          OrgChart.Layout.BoxTree.Node
        )
          .getState()
          .getCenterH();
        var desiredCenter =
          node.getState().NumberOfSiblings === 1 ||
          this.ParentAlignment === OrgChart.Layout.BranchParentAlignment.Center
            ? leftmost + (rightmost - leftmost) / 2
            : this.ParentAlignment ===
              OrgChart.Layout.BranchParentAlignment.Left
            ? leftmost + this.ChildConnectorHookLength
            : rightmost - this.ChildConnectorHookLength;
        var center = rect.getCenterH();
        var diff = center - desiredCenter;
        OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

        // vertical connector from parent
        var verticalSpacer = System.Array.getItem(
          node.getChildren(),
          node.getState().NumberOfSiblings,
          OrgChart.Layout.BoxTree.Node
        );

        OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
          verticalSpacer.getState(),
          center - this.ParentConnectorShield / 2,
          rect.getBottom(),
          this.ParentConnectorShield,
          System.Array.getItem(
            node.getChildren(),
            0,
            OrgChart.Layout.BoxTree.Node
          ).getState().SiblingsRowV.From - rect.getBottom()
        );

        state.MergeSpacer(verticalSpacer);

        // horizontal protector
        var firstInRow = System.Array.getItem(
          node.getChildren(),
          0,
          OrgChart.Layout.BoxTree.Node
        ).getState();

        var horizontalSpacer = System.Array.getItem(
          node.getChildren(),
          (node.getState().NumberOfSiblings + 1) | 0,
          OrgChart.Layout.BoxTree.Node
        );

        OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
          horizontalSpacer.getState(),
          firstInRow.getLeft(),
          firstInRow.SiblingsRowV.From - this.ParentChildSpacing,
          System.Array.getItem(
            node.getChildren(),
            (node.getState().NumberOfSiblings - 1) | 0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getRight() - firstInRow.getLeft(),
          this.ParentChildSpacing
        );
        state.MergeSpacer(horizontalSpacer);
      }
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.LinearLayoutStrategy
     * @memberof OrgChart.Layout.LinearLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      var normalChildCount = node.getState().NumberOfSiblings;

      var count =
        normalChildCount === 0
          ? 0
          : normalChildCount === 1
          ? 1
          : (2 + normalChildCount) | 0; // one upward edge for each child

      if (count === 0) {
        node.getState().Connector = null;
        return;
      }

      var segments = System.Array.init(count, function () {
        return new OrgChart.Layout.Edge();
      });

      var rootRect = node.getState();
      var center = rootRect.getCenterH();

      if (node.getChildren() == null) {
        throw new System.Exception("State is present, but children not set");
      }

      if (count === 1) {
        segments[0] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(center, rootRect.getBottom()),
          new OrgChart.Layout.Point.$ctor1(
            center,
            System.Array.getItem(
              node.getChildren(),
              0,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getTop()
          )
        );
      } else {
        var space =
          System.Array.getItem(
            node.getChildren(),
            0,
            OrgChart.Layout.BoxTree.Node
          ).getState().SiblingsRowV.From - rootRect.getBottom();

        segments[0] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(center, rootRect.getBottom()),
          new OrgChart.Layout.Point.$ctor1(
            center,
            rootRect.getBottom() + space - this.ChildConnectorHookLength
          )
        );

        for (var i = 0; i < normalChildCount; i = (i + 1) | 0) {
          var childRect = System.Array.getItem(
            node.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          ).getState();
          var childCenter = childRect.getCenterH();
          segments[(1 + i) | 0] = new OrgChart.Layout.Edge.$ctor1(
            new OrgChart.Layout.Point.$ctor1(childCenter, childRect.getTop()),
            new OrgChart.Layout.Point.$ctor1(
              childCenter,
              childRect.getTop() - this.ChildConnectorHookLength
            )
          );
        }

        segments[(count - 1) | 0] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(segments[1].To.X, segments[1].To.Y),
          new OrgChart.Layout.Point.$ctor1(
            segments[(count - 2) | 0].To.X,
            segments[1].To.Y
          )
        );
      }

      node.getState().Connector = new OrgChart.Layout.Connector(segments);
    },
  });

  /**
   * Implements layout for a single vertically stretched fishbone.
   Re-used by {@link } to layout multiple groups of siblings.
   *
   * @private
   * @class OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter
   * @augments OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define(
    "OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter",
    {
      inherits: [OrgChart.Layout.LayoutStrategyBase],
      RealRoot: null,
      SpecialRoot: null,
      Iterator: null,
      ctor: function (realRoot) {
        this.$initialize();
        OrgChart.Layout.LayoutStrategyBase.ctor.call(this);
        this.Iterator = new OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter.GroupIterator(
          realRoot.getState().NumberOfSiblings,
          realRoot.getState().NumberOfSiblingColumns
        );

        this.RealRoot = realRoot;
        this.SpecialRoot = Bridge.merge(
          new OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter.TreeNodeView(
            OrgChart.Layout.Box.Special(
              OrgChart.Layout.Box.None,
              realRoot.getElement().Id,
              true
            )
          ),
          {
            setLevel: this.RealRoot.getLevel(),
            setParentNode: this.RealRoot,
          }
        );

        this.SpecialRoot.getState().setEffectiveLayoutStrategy(this);

        var parentStrategy = Bridge.cast(
          realRoot.getState().RequireLayoutStrategy(),
          OrgChart.Layout.MultiLineFishboneLayoutStrategy
        );
        this.SiblingSpacing = parentStrategy.SiblingSpacing;
        this.ParentConnectorShield = parentStrategy.ParentConnectorShield;
        this.ParentChildSpacing = parentStrategy.ParentChildSpacing;
        this.ParentAlignment = parentStrategy.ParentAlignment;
        this.ChildConnectorHookLength = parentStrategy.ChildConnectorHookLength;
      },
      /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter
       * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter
       * @function getSupportsAssistants
       * @return  {boolean}
       */
      /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
      getSupportsAssistants: function () {
        return false;
      },
      NextGroup: function () {
        if (!this.Iterator.NextGroup()) {
          return false;
        }

        this.SpecialRoot.getState().NumberOfSiblings = this.Iterator.Count;
        this.SpecialRoot.Prepare(
          (this.RealRoot.getState().NumberOfSiblingRows * 2) | 0
        );

        for (var i = 0; i < this.Iterator.Count; i = (i + 1) | 0) {
          this.SpecialRoot.AddChildView(
            System.Array.getItem(
              this.RealRoot.getChildren(),
              (this.Iterator.FromIndex + i) | 0,
              OrgChart.Layout.BoxTree.Node
            )
          );
        }
        var spacer = System.Array.getItem(
          this.RealRoot.getChildren(),
          (((this.RealRoot.getState().NumberOfSiblings + 1) | 0) +
            this.Iterator.Group) |
            0,
          OrgChart.Layout.BoxTree.Node
        );
        this.SpecialRoot.AddChildView(spacer);

        OrgChart.Layout.LayoutAlgorithm.CopyExteriorFrom(
          this.SpecialRoot.getState(),
          this.RealRoot.getState()
        );
        return true;
      },
      PreProcessThisNode: function (state, node) {
        throw new System.NotSupportedException();
      },
      ApplyVerticalLayout: function (state, level) {
        var $t, $t1;
        var prevRowBottom =
          ($t = this.RealRoot.getAssistantsRoot()) != null
            ? $t.getState().BranchExterior.getBottom()
            : (($t1 = null),
              $t1 != null ? $t1 : this.SpecialRoot.getState().SiblingsRowV.To);

        for (var i = 0; i < this.Iterator.MaxOnLeft; i = (i + 1) | 0) {
          var spacing = i === 0 ? this.ParentChildSpacing : this.SiblingSpacing;

          var child = System.Array.getItem(
            this.SpecialRoot.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          );
          var frame = child.getState();
          OrgChart.Layout.LayoutAlgorithm.MoveTo(
            frame,
            frame.getLeft(),
            prevRowBottom + spacing
          );

          var rowExterior = new OrgChart.Layout.Dimensions.$ctor1(
            frame.getTop(),
            frame.getBottom()
          );

          var i2 = (i + this.Iterator.MaxOnLeft) | 0;
          if (i2 < this.Iterator.Count) {
            var child2 = System.Array.getItem(
              this.SpecialRoot.getChildren(),
              i2,
              OrgChart.Layout.BoxTree.Node
            );
            var frame2 = child2.getState();
            OrgChart.Layout.LayoutAlgorithm.MoveTo(
              frame2,
              frame2.getLeft(),
              prevRowBottom + spacing
            );

            if (frame2.getBottom() > frame.getBottom()) {
              OrgChart.Layout.LayoutAlgorithm.MoveTo(
                frame,
                frame.getLeft(),
                frame2.getCenterV() - frame.Size.Height / 2
              );
            } else if (frame2.getBottom() < frame.getBottom()) {
              OrgChart.Layout.LayoutAlgorithm.MoveTo(
                frame2,
                frame2.getLeft(),
                frame.getCenterV() - frame2.Size.Height / 2
              );
            }

            frame2.BranchExterior = new OrgChart.Layout.Rect.$ctor1(
              frame2.TopLeft,
              frame2.Size
            );
            rowExterior = OrgChart.Layout.Dimensions.op_Addition(
              rowExterior,
              new OrgChart.Layout.Dimensions.$ctor1(
                frame2.getTop(),
                frame2.getBottom()
              )
            );

            frame2.SiblingsRowV = rowExterior;
            OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child2);
            prevRowBottom = frame2.BranchExterior.getBottom();
          }

          frame.BranchExterior = new OrgChart.Layout.Rect.$ctor1(
            frame.TopLeft,
            frame.Size
          );
          frame.SiblingsRowV = rowExterior;
          OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child);
          prevRowBottom = Math.max(
            prevRowBottom,
            frame.BranchExterior.getBottom()
          );
        }
      },
      ApplyHorizontalLayout: function (state, level) {
        if (!Bridge.referenceEquals(level.BranchRoot, this.SpecialRoot)) {
          throw new System.InvalidOperationException(
            "Wrong root node received"
          );
        }

        var left = true;
        var countOnThisSide = 0;
        for (var i = 0; i < this.Iterator.Count; i = (i + 1) | 0) {
          var child = System.Array.getItem(
            this.SpecialRoot.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          );
          OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);

          // we go top-bottom to layout left side of the group,
          // then add a carrier protector
          // then top-bottom to fill right side of the group
          if (
            (countOnThisSide = (countOnThisSide + 1) | 0) ===
            this.Iterator.MaxOnLeft
          ) {
            if (left) {
              // horizontally align children in left pillar
              OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
                state,
                level,
                this.EnumerateSiblings(0, this.Iterator.MaxOnLeft)
              );

              left = false;
              countOnThisSide = 0;

              var rightmost = System.Double.min;
              for (var k = 0; k < i; k = (k + 1) | 0) {
                rightmost = Math.max(
                  rightmost,
                  System.Array.getItem(
                    this.SpecialRoot.getChildren(),
                    k,
                    OrgChart.Layout.BoxTree.Node
                  )
                    .getState()
                    .BranchExterior.getRight()
                );
              }

              rightmost = Math.max(rightmost, child.getState().getRight());

              // integrate protector for group's vertical carrier
              var spacer = System.Array.getItem(
                this.SpecialRoot.getChildren(),
                this.SpecialRoot.getState().NumberOfSiblings,
                OrgChart.Layout.BoxTree.Node
              );

              OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
                spacer.getState(),
                rightmost,
                System.Array.getItem(
                  this.SpecialRoot.getChildren(),
                  0,
                  OrgChart.Layout.BoxTree.Node
                ).getState().SiblingsRowV.From,
                this.SiblingSpacing,
                child.getState().SiblingsRowV.To -
                  System.Array.getItem(
                    this.SpecialRoot.getChildren(),
                    0,
                    OrgChart.Layout.BoxTree.Node
                  ).getState().SiblingsRowV.From
              );
              level.Boundary.MergeFrom$1(spacer);
            }
          }
        }
        // horizontally align children in right pillar
        OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
          state,
          level,
          this.EnumerateSiblings(this.Iterator.MaxOnLeft, this.Iterator.Count)
        );
      },
      EnumerateSiblings: function (from, to) {
        var $yield = [];
        for (var i = from; i < to; i = (i + 1) | 0) {
          $yield.push(
            System.Array.getItem(
              this.SpecialRoot.getChildren(),
              i,
              OrgChart.Layout.BoxTree.Node
            )
          );
        }
        return System.Array.toEnumerable($yield);
      },
      RouteConnectors: function (state, node) {
        throw new System.NotSupportedException();
      },
    }
  );

  Bridge.define(
    "OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter.TreeNodeView",
    {
      inherits: [OrgChart.Layout.BoxTree.Node],
      ctor: function (element) {
        this.$initialize();
        OrgChart.Layout.BoxTree.Node.ctor.call(this, element);
      },
      Prepare: function (capacity) {
        if (this.getChildren() == null) {
          this.setChildren(
            new (System.Collections.Generic.List$1(
              OrgChart.Layout.BoxTree.Node
            ))(capacity)
          );
        } else {
          System.Array.clear(this.getChildren(), OrgChart.Layout.BoxTree.Node);
        }
      },
      AddChildView: function (node) {
        System.Array.add(
          this.getChildren(),
          node,
          OrgChart.Layout.BoxTree.Node
        );
      },
    }
  );

  /**
   * Arranges child boxes in a single vertical column under the parent, 
   somewhat offset to the left or to the right, depending on {@link }.
   Cannot be configured to position parent in the middle of children.
   Children are attached to a central vertical carrier going from parent's bottom.
   *
   * @public
   * @class OrgChart.Layout.SingleColumnLayoutStrategy
   * @augments OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define("OrgChart.Layout.SingleColumnLayoutStrategy", {
    inherits: [OrgChart.Layout.LayoutStrategyBase],
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.SingleColumnLayoutStrategy
       * @memberof OrgChart.Layout.SingleColumnLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return true;
    },
    /**
     * A chance for layout strategy to append special auto-generated boxes into the visual tree.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.SingleColumnLayoutStrategy
     * @memberof OrgChart.Layout.SingleColumnLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PreProcessThisNode: function (state, node) {
      if (
        this.ParentAlignment !== OrgChart.Layout.BranchParentAlignment.Left &&
        this.ParentAlignment !== OrgChart.Layout.BranchParentAlignment.Right
      ) {
        throw new System.InvalidOperationException(
          "Unsupported value for ParentAlignment"
        );
      }

      node.getState().NumberOfSiblings = node.getElement().IsCollapsed
        ? 0
        : node.getChildCount();

      // only add spacers for non-collapsed boxes
      if (node.getState().NumberOfSiblings > 0 && node.getLevel() > 0) {
        // add one (for vertical spacer) into the count of layout columns
        node.getState().NumberOfSiblingColumns = 1;
        node.getState().NumberOfSiblingRows = node.getChildCount();

        // add parent's vertical carrier to the end
        var verticalSpacer = OrgChart.Layout.Box.Special(
          OrgChart.Layout.Box.None,
          node.getElement().Id,
          false
        );
        node.AddRegularChild(verticalSpacer);
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.SingleColumnLayoutStrategy
     * @memberof OrgChart.Layout.SingleColumnLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getAssistantsRoot() != null) {
        // assistants root has to be initialized with main node's exterior
        OrgChart.Layout.LayoutAlgorithm.CopyExteriorFrom(
          node.getAssistantsRoot().getState(),
          node.getState()
        );
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      var prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
        node.getState().SiblingsRowV.From,
        node.getAssistantsRoot() == null
          ? node.getState().SiblingsRowV.To
          : node.getState().BranchExterior.getBottom()
      );

      for (
        var row = 0;
        row < node.getState().NumberOfSiblings;
        row = (row + 1) | 0
      ) {
        // first, compute
        var child = System.Array.getItem(
          node.getChildren(),
          row,
          OrgChart.Layout.BoxTree.Node
        );
        var rect = child.getState();

        var top =
          prevRowExterior.To +
          (row === 0 ? this.ParentChildSpacing : this.SiblingSpacing);
        OrgChart.Layout.LayoutAlgorithm.MoveTo(
          child.getState(),
          rect.getLeft(),
          top
        );
        child.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
          child.getState().TopLeft,
          child.getState().Size
        );

        var rowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          top,
          top + rect.Size.Height
        );

        child = System.Array.getItem(
          node.getChildren(),
          row,
          OrgChart.Layout.BoxTree.Node
        );
        child.getState().SiblingsRowV = rowExterior;

        // re-enter layout algorithm for child branch
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child);

        var childBranchBottom = child.getState().BranchExterior.getBottom();

        prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          rowExterior.From,
          Math.max(childBranchBottom, rowExterior.To)
        );
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.SingleColumnLayoutStrategy
     * @memberof OrgChart.Layout.SingleColumnLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var node = level.BranchRoot;

      var nodeState = node.getState();

      if (node.getAssistantsRoot() != null) {
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      // first, perform horizontal layout for every node in this column
      for (var row = 0; row < nodeState.NumberOfSiblings; row = (row + 1) | 0) {
        var child = System.Array.getItem(
          node.getChildren(),
          row,
          OrgChart.Layout.BoxTree.Node
        );

        // re-enter layout algorithm for child branch
        // siblings are guaranteed not to offend each other
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);
      }

      // now align the column
      var edges = OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
        state,
        level,
        this.EnumerateColumn(node)
      );

      if (node.getLevel() > 0 && node.getChildCount() > 0) {
        var rect = node.getState();
        var diff;
        if (
          this.ParentAlignment === OrgChart.Layout.BranchParentAlignment.Left
        ) {
          var desiredLeft = rect.getCenterH() + this.ParentConnectorShield / 2;
          diff = desiredLeft - edges.From;
        } else if (
          this.ParentAlignment === OrgChart.Layout.BranchParentAlignment.Right
        ) {
          var desiredRight = rect.getCenterH() - this.ParentConnectorShield / 2;
          diff = desiredRight - edges.To;
        } else {
          throw new System.InvalidOperationException(
            "Invalid ParentAlignment setting"
          );
        }

        // vertical connector from parent
        OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

        // spacer for the vertical carrier
        var verticalSpacer =
          node.getLevel() > 0
            ? System.Array.getItem(
                node.getChildren(),
                (node.getChildCount() - 1) | 0,
                OrgChart.Layout.BoxTree.Node
              )
            : null;
        if (verticalSpacer != null) {
          var spacerTop = node.getState().getBottom();
          var spacerBottom = System.Array.getItem(
            node.getChildren(),
            (node.getChildCount() - 2) | 0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getBottom();
          OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
            verticalSpacer.getState(),
            rect.getCenterH() - this.ParentConnectorShield / 2,
            spacerTop,
            this.ParentConnectorShield,
            spacerBottom - spacerTop
          );
          state.MergeSpacer(verticalSpacer);
        }
      }
    },
    EnumerateColumn: function (branchRoot) {
      var $yield = [];
      for (
        var i = 0;
        i < branchRoot.getState().NumberOfSiblings;
        i = (i + 1) | 0
      ) {
        $yield.push(
          System.Array.getItem(
            branchRoot.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          )
        );
      }
      return System.Array.toEnumerable($yield);
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.SingleColumnLayoutStrategy
     * @memberof OrgChart.Layout.SingleColumnLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      if (node.getChildCount() === 0) {
        return;
      }

      // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
      var count = (1 + node.getState().NumberOfSiblings) | 0;

      var segments = System.Array.init(count, function () {
        return new OrgChart.Layout.Edge();
      });

      var rootRect = node.getState();
      var center = rootRect.getCenterH();

      var verticalCarrierHeight =
        System.Array.getItem(
          node.getChildren(),
          (node.getState().NumberOfSiblings - 1) | 0,
          OrgChart.Layout.BoxTree.Node
        )
          .getState()
          .getCenterV() - node.getState().getBottom();

      // big vertical connector, from parent to last row
      segments[0] = new OrgChart.Layout.Edge.$ctor1(
        new OrgChart.Layout.Point.$ctor1(center, rootRect.getBottom()),
        new OrgChart.Layout.Point.$ctor1(
          center,
          rootRect.getBottom() + verticalCarrierHeight
        )
      );

      for (
        var ix = 0;
        ix < node.getState().NumberOfSiblings;
        ix = (ix + 1) | 0
      ) {
        var rect = System.Array.getItem(
          node.getChildren(),
          ix,
          OrgChart.Layout.BoxTree.Node
        ).getState();
        var destination =
          this.ParentAlignment === OrgChart.Layout.BranchParentAlignment.Left
            ? rect.getLeft()
            : rect.getRight();
        segments[(1 + ix) | 0] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(center, rect.getCenterV()),
          new OrgChart.Layout.Point.$ctor1(destination, rect.getCenterV())
        );
      }

      node.getState().Connector = new OrgChart.Layout.Connector(segments);
    },
  });

  /**
   * Arranges child boxes in a single or multiple lines or columns under the parent,
   but does not render any connectors and thus produces a much more compact set of nodes.
   Can be configured to put children into horizontal or vertical groups.
   *
   * @public
   * @class OrgChart.Layout.StackingLayoutStrategy
   * @augments OrgChart.Layout.LayoutStrategyBase
   */
  Bridge.define("OrgChart.Layout.StackingLayoutStrategy", {
    inherits: [OrgChart.Layout.LayoutStrategyBase],
    /**
     * Which direction to send child boxes: horizontally, vertically, whether to use multiple lines.
     *
     * @instance
     */
    Orientation: 0,
    /**
     * Ctr.
     *
     * @instance
     * @public
     * @this OrgChart.Layout.StackingLayoutStrategy
     * @memberof OrgChart.Layout.StackingLayoutStrategy
     * @return  {void}
     */
    ctor: function () {
      this.$initialize();
      OrgChart.Layout.LayoutStrategyBase.ctor.call(this);
      this.Orientation = OrgChart.Layout.StackOrientation.SingleRowHorizontal;
      this.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
      this.ChildConnectorHookLength = 0;
      this.ParentConnectorShield = 0;
      this.SiblingSpacing = 5;
    },
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.StackingLayoutStrategy
       * @memberof OrgChart.Layout.StackingLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return false;
    },
    /**
       * A chance for layout strategy to append special auto-generated boxes into the visual tree. 
       This strategy does not use connectors and spacers.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.StackingLayoutStrategy
       * @memberof OrgChart.Layout.StackingLayoutStrategy
       * @param   {OrgChart.Layout.LayoutState}     state    
       * @param   {OrgChart.Layout.BoxTree.Node}    node
       * @return  {void}
       */
    PreProcessThisNode: function (state, node) {
      node.getState().NumberOfSiblings = node.getElement().IsCollapsed
        ? 0
        : node.getChildCount();

      if (node.getState().NumberOfSiblings > 0) {
        // this strategy requires certain adjustments to be made to the box sizes
        // they will only affect corresponding Nodes, not the size on the box itself
        if (
          this.Orientation !==
            OrgChart.Layout.StackOrientation.SingleRowHorizontal &&
          this.Orientation !==
            OrgChart.Layout.StackOrientation.SingleColumnVertical
        ) {
          throw new System.InvalidOperationException(
            "Unsupported value for orientation: " +
              System.Enum.toString(
                OrgChart.Layout.StackOrientation,
                this.Orientation
              )
          );
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.StackingLayoutStrategy
     * @memberof OrgChart.Layout.StackingLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getState().NumberOfSiblings === 0) {
        return;
      }

      var siblingsRowExterior = OrgChart.Layout.Dimensions.MinMax();

      if (
        this.Orientation ===
        OrgChart.Layout.StackOrientation.SingleRowHorizontal
      ) {
        var top =
          node.getAssistantsRoot() == null
            ? node.getState().SiblingsRowV.To + this.ParentChildSpacing
            : node.getState().BranchExterior.getBottom() +
              this.ParentChildSpacing;

        for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
          var child = System.Array.getItem(
            node.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          );
          var rect = child.getState();

          OrgChart.Layout.LayoutAlgorithm.MoveTo(child.getState(), 0, top);
          child.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
            child.getState().TopLeft,
            child.getState().Size
          );

          siblingsRowExterior = OrgChart.Layout.Dimensions.op_Addition(
            siblingsRowExterior,
            new OrgChart.Layout.Dimensions.$ctor1(top, top + rect.Size.Height)
          );
        }

        siblingsRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          siblingsRowExterior.From,
          siblingsRowExterior.To
        );

        for (
          var i1 = 0;
          i1 < node.getState().NumberOfSiblings;
          i1 = (i1 + 1) | 0
        ) {
          var child1 = System.Array.getItem(
            node.getChildren(),
            i1,
            OrgChart.Layout.BoxTree.Node
          );
          child1.getState().SiblingsRowV = siblingsRowExterior;

          // re-enter layout algorithm for child branch
          OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child1);
        }
      } else if (
        this.Orientation ===
        OrgChart.Layout.StackOrientation.SingleColumnVertical
      ) {
        var prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().SiblingsRowV.From,
          node.getState().SiblingsRowV.To
        );

        for (
          var row = 0;
          row < node.getState().NumberOfSiblings;
          row = (row + 1) | 0
        ) {
          // first, compute
          var child2 = System.Array.getItem(
            node.getChildren(),
            row,
            OrgChart.Layout.BoxTree.Node
          );
          var rect1 = child2.getState();

          var top1 =
            prevRowExterior.To +
            (row === 0 ? this.ParentChildSpacing : this.SiblingSpacing);
          OrgChart.Layout.LayoutAlgorithm.MoveTo(
            child2.getState(),
            rect1.getLeft(),
            top1
          );
          child2.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
            child2.getState().TopLeft,
            child2.getState().Size
          );

          var rowExterior = new OrgChart.Layout.Dimensions.$ctor1(
            top1,
            top1 + rect1.Size.Height
          );

          child2 = System.Array.getItem(
            node.getChildren(),
            row,
            OrgChart.Layout.BoxTree.Node
          );
          child2.getState().SiblingsRowV = rowExterior;

          // re-enter layout algorithm for child branch
          OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child2);

          var childBranchBottom = child2.getState().BranchExterior.getBottom();

          prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
            rowExterior.From,
            Math.max(childBranchBottom, rowExterior.To)
          );
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.StackingLayoutStrategy
     * @memberof OrgChart.Layout.StackingLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var $t;
      var node = level.BranchRoot;

      $t = Bridge.getEnumerator(
        node.getChildren(),
        OrgChart.Layout.BoxTree.Node
      );
      while ($t.moveNext()) {
        var child = $t.getCurrent();
        // re-enter layout algorithm for child branch
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);
      }

      if (node.getChildCount() > 0) {
        if (
          this.Orientation ===
          OrgChart.Layout.StackOrientation.SingleRowHorizontal
        ) {
          // now auto-extend or contract the parent box
          var width =
            System.Array.getItem(
              node.getChildren(),
              (node.getState().NumberOfSiblings - 1) | 0,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getRight() -
            System.Array.getItem(
              node.getChildren(),
              0,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getLeft();
          node.getState().Size = new OrgChart.Layout.Size.$ctor1(
            Math.max(node.getState().Size.Width, width),
            node.getState().Size.Height
          );

          // now position children under the parent
          var center =
            (System.Array.getItem(
              node.getChildren(),
              0,
              OrgChart.Layout.BoxTree.Node
            )
              .getState()
              .getLeft() +
              System.Array.getItem(
                node.getChildren(),
                (node.getChildCount() - 1) | 0,
                OrgChart.Layout.BoxTree.Node
              )
                .getState()
                .getRight()) /
            2;
          var desiredCenter = node.getState().getCenterH();
          var diff = desiredCenter - center;
          OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
        } else if (
          this.Orientation ===
          OrgChart.Layout.StackOrientation.SingleColumnVertical
        ) {
          OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
            state,
            level,
            node.getChildren()
          );

          // now position children under the parent
          var center1 = System.Array.getItem(
            node.getChildren(),
            0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getCenterH();
          var desiredCenter1 = node.getState().getCenterH();
          var diff1 = desiredCenter1 - center1;
          OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff1);
        }
      }
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.StackingLayoutStrategy
     * @memberof OrgChart.Layout.StackingLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      // this strategy does not use connectors
    },
  });

  /**
   * A data item wrapper.
   *
   * @public
   * @class OrgChart.Test.TestDataItem
   * @implements  OrgChart.Layout.IChartDataItem
   */
  Bridge.define("OrgChart.Test.TestDataItem", {
    inherits: [OrgChart.Layout.IChartDataItem],
    config: {
      properties: {
        /**
         * Data item id.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getId
         * @return  {string}
         */
        /**
         * Data item id.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setId
         * @param   {string}    value
         * @return  {void}
         */
        Id: null,
        /**
         * <pre><code>True</code></pre> if corresponding box should be rendered as assistant.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getIsAssistant
         * @return  {boolean}
         */
        /**
         * <pre><code>True</code></pre> if corresponding box should be rendered as assistant.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setIsAssistant
         * @param   {boolean}    value
         * @return  {void}
         */
        IsAssistant: false,
        /**
         * Optional identifier of the parent data item.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getParentId
         * @return  {string}
         */
        /**
         * Optional identifier of the parent data item.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setParentId
         * @param   {string}    value
         * @return  {void}
         */
        ParentId: null,
        /**
         * Some string field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getString1
         * @return  {string}
         */
        /**
         * Some string field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setString1
         * @param   {string}    value
         * @return  {void}
         */
        String1: null,
        /**
         * Some string field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getString2
         * @return  {string}
         */
        /**
         * Some string field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setString2
         * @param   {string}    value
         * @return  {void}
         */
        String2: null,
        /**
         * Some date-time field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function getDate1
         * @return  {Date}
         */
        /**
         * Some date-time field.
         *
         * @instance
         * @public
         * @this OrgChart.Test.TestDataItem
         * @memberof OrgChart.Test.TestDataItem
         * @function setDate1
         * @param   {Date}    value
         * @return  {void}
         */
        Date1: null,
      },
      alias: [
        "getId",
        "OrgChart$Layout$IChartDataItem$getId",
        "setId",
        "OrgChart$Layout$IChartDataItem$setId",
        "getIsAssistant",
        "OrgChart$Layout$IChartDataItem$getIsAssistant",
        "setIsAssistant",
        "OrgChart$Layout$IChartDataItem$setIsAssistant",
      ],
      init: function () {
        this.Date1 = new Date(-864e13);
      },
    },
  });

  /**
   * Test data source implementation.
   *
   * @public
   * @class OrgChart.Test.TestDataSource
   * @implements  OrgChart.Layout.IChartDataSource
   */
  Bridge.define("OrgChart.Test.TestDataSource", {
    inherits: [OrgChart.Layout.IChartDataSource],
    /**
     * All items.
     *
     * @instance
     */
    Items: null,
    config: {
      alias: [
        "getAllDataItemIds",
        "OrgChart$Layout$IChartDataSource$getAllDataItemIds",
        "getGetParentKeyFunc",
        "OrgChart$Layout$IChartDataSource$getGetParentKeyFunc",
        "getGetDataItemFunc",
        "OrgChart$Layout$IChartDataSource$getGetDataItemFunc",
      ],
      init: function () {
        this.Items = new (System.Collections.Generic.Dictionary$2(
          String,
          OrgChart.Test.TestDataItem
        ))();
      },
    },
    /**
     * Access to all data items.
     *
     * @instance
     * @public
     * @this OrgChart.Test.TestDataSource
     * @memberof OrgChart.Test.TestDataSource
     * @function getAllDataItemIds
     * @return  {System.Collections.Generic.IEnumerable$1}
     */
    /**
     * Access to all data items.
     *
     * @instance
     * @function setAllDataItemIds
     */
    getAllDataItemIds: function () {
      return System.Linq.Enumerable.from(this.Items.getKeys()).orderBy(
        $asm.$.OrgChart.Test.TestDataSource.f1
      );
    },
    /**
       * Delegate that provides information about parent-child relationship of boxes.
       First argument is the underlying data item id.
       Return value is the parent data item id.
       This one should be implemented by the underlying data source.
       *
       * @instance
       * @public
       * @this OrgChart.Test.TestDataSource
       * @memberof OrgChart.Test.TestDataSource
       * @function getGetParentKeyFunc
       * @return  {System.Func}
       */
    /**
       * Delegate that provides information about parent-child relationship of boxes.
       First argument is the underlying data item id.
       Return value is the parent data item id.
       This one should be implemented by the underlying data source.
       *
       * @instance
       * @function setGetParentKeyFunc
       */
    getGetParentKeyFunc: function () {
      return Bridge.fn.bind(this, this.GetParentKey);
    },
    /**
       * Delegate that provides information about advanced properties of boxes.
       First argument is the underlying data item id.
       This one should be implemented by the underlying data source.
       *
       * @instance
       * @public
       * @this OrgChart.Test.TestDataSource
       * @memberof OrgChart.Test.TestDataSource
       * @function getGetDataItemFunc
       * @return  {System.Func}
       */
    /**
       * Delegate that provides information about advanced properties of boxes.
       First argument is the underlying data item id.
       This one should be implemented by the underlying data source.
       *
       * @instance
       * @function setGetDataItemFunc
       */
    getGetDataItemFunc: function () {
      return Bridge.fn.bind(this, this.GetDataItem);
    },
    /**
     * Implementation for {@link }.
     *
     * @instance
     * @public
     * @this OrgChart.Test.TestDataSource
     * @memberof OrgChart.Test.TestDataSource
     * @param   {string}    itemId
     * @return  {string}
     */
    GetParentKey: function (itemId) {
      return this.Items.get(itemId).getParentId();
    },
    /**
     * Implementation for {@link }.
     *
     * @instance
     * @public
     * @this OrgChart.Test.TestDataSource
     * @memberof OrgChart.Test.TestDataSource
     * @param   {string}                            itemId
     * @return  {OrgChart.Layout.IChartDataItem}
     */
    GetDataItem: function (itemId) {
      return this.Items.get(itemId);
    },
  });

  Bridge.ns("OrgChart.Test.TestDataSource", $asm.$);

  Bridge.apply($asm.$.OrgChart.Test.TestDataSource, {
    f1: function (x) {
      return x;
    },
  });

  /**
   * Arranges child boxes in multiple vertically stretched groups, stuffed onto "fish bones" on left and right sides of vertical carriers,
   with only one main horizontal carrier going under parent's bottom, connecting all vertical carriers.
   Can only be configured to position parent in the middle of children.
   *
   * @public
   * @class OrgChart.Layout.MultiLineFishboneLayoutStrategy
   * @augments OrgChart.Layout.LinearLayoutStrategy
   */
  Bridge.define("OrgChart.Layout.MultiLineFishboneLayoutStrategy", {
    inherits: [OrgChart.Layout.LinearLayoutStrategy],
    /**
     * Maximum number of boxes staffed onto a single vertical carrier.
     *
     * @instance
     */
    MaxGroups: 4,
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy
       * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return true;
    },
    /**
     * A chance for layout strategy to append special auto-generated boxes into the visual tree.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PreProcessThisNode: function (state, node) {
      if (this.MaxGroups <= 0) {
        throw new System.InvalidOperationException(
          "MaxGroups must be a positive value"
        );
      }

      if (node.getChildCount() <= ((this.MaxGroups * 2) | 0)) {
        OrgChart.Layout.LinearLayoutStrategy.prototype.PreProcessThisNode.call(
          this,
          state,
          node
        );
        return;
      }

      node.getState().NumberOfSiblings = node.getChildCount();

      // only add spacers for non-collapsed boxes
      if (node.getState().NumberOfSiblings > 0) {
        // using column == group here,
        // and each group consists of two vertical stretches of boxes with a vertical carrier in between
        node.getState().NumberOfSiblingColumns = this.MaxGroups;
        node.getState().NumberOfSiblingRows =
          Bridge.Int.div(
            node.getState().NumberOfSiblings,
            (this.MaxGroups * 2) | 0
          ) | 0;
        if (
          node.getState().NumberOfSiblings % ((this.MaxGroups * 2) | 0) !==
          0
        ) {
          node.getState().NumberOfSiblingRows =
            (node.getState().NumberOfSiblingRows + 1) | 0;
        }

        // a connector from parent to horizontal carrier
        var parentSpacer = OrgChart.Layout.Box.Special(
          OrgChart.Layout.Box.None,
          node.getElement().Id,
          false
        );
        node.AddRegularChild(parentSpacer);

        // spacers for vertical carriers
        for (
          var i = 0;
          i < node.getState().NumberOfSiblingColumns;
          i = (i + 1) | 0
        ) {
          var verticalSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.AddRegularChild(verticalSpacer);
        }

        // if needed, horizontal carrier
        if (node.getState().NumberOfSiblingColumns > 1) {
          var horizontalSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.AddRegularChild(horizontalSpacer);
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getState().NumberOfSiblings <= ((this.MaxGroups * 2) | 0)) {
        OrgChart.Layout.LinearLayoutStrategy.prototype.ApplyVerticalLayout.call(
          this,
          state,
          level
        );
        return;
      }

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getAssistantsRoot() != null) {
        // assistants root has to be initialized with main node's exterior
        OrgChart.Layout.LayoutAlgorithm.CopyExteriorFrom(
          node.getAssistantsRoot().getState(),
          node.getState()
        );
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      var adapter = new OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter(
        node
      );
      while (adapter.NextGroup()) {
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(
          state,
          adapter.SpecialRoot
        );
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getState().NumberOfSiblings <= ((this.MaxGroups * 2) | 0)) {
        OrgChart.Layout.LinearLayoutStrategy.prototype.ApplyHorizontalLayout.call(
          this,
          state,
          level
        );
        return;
      }

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getAssistantsRoot() != null) {
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      var adapter = new OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter(
        node
      );
      while (adapter.NextGroup()) {
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(
          state,
          adapter.SpecialRoot
        );
      }

      var rect = node.getState();

      // now align child nodes under the parent
      if (node.getLevel() > 0) {
        var diff;
        if (node.getState().NumberOfSiblingColumns > 1) {
          var leftCarrier = System.Array.getItem(
            node.getChildren(),
            (node.getState().NumberOfSiblings + 1) | 0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getCenterH();
          var rightCarrier = System.Array.getItem(
            node.getChildren(),
            (node.getState().NumberOfSiblings +
              node.getState().NumberOfSiblingColumns) |
              0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getCenterH();

          var desiredCenter =
            node.getState().NumberOfSiblings === 1 ||
            this.ParentAlignment ===
              OrgChart.Layout.BranchParentAlignment.Center
              ? leftCarrier + (rightCarrier - leftCarrier) / 2
              : this.ParentAlignment ===
                OrgChart.Layout.BranchParentAlignment.Left
              ? leftCarrier + this.ChildConnectorHookLength
              : rightCarrier - this.ChildConnectorHookLength;

          //var desiredCenter = (leftCarrier + rightCarrier)/2.0;
          diff = rect.getCenterH() - desiredCenter;
        } else {
          var carrier = System.Array.getItem(
            node.getChildren(),
            (1 + node.getState().NumberOfSiblings) | 0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getCenterH();
          var desiredCenter1 = rect.getCenterH();
          diff = desiredCenter1 - carrier;
        }
        OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);
      }

      if (node.getLevel() > 0) {
        // vertical connector from parent
        var ix = node.getState().NumberOfSiblings;
        var verticalSpacer = System.Array.getItem(
          node.getChildren(),
          ix,
          OrgChart.Layout.BoxTree.Node
        );
        OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
          verticalSpacer.getState(),
          rect.getCenterH() - this.ParentConnectorShield / 2,
          rect.getBottom(),
          this.ParentConnectorShield,
          System.Array.getItem(
            node.getChildren(),
            0,
            OrgChart.Layout.BoxTree.Node
          ).getState().SiblingsRowV.From - rect.getBottom()
        );
        state.MergeSpacer(verticalSpacer);
        ix = (ix + 1) | 0;

        // vertical carriers already merged in
        ix = (ix + node.getState().NumberOfSiblingColumns) | 0;

        if (node.getState().NumberOfSiblingColumns > 1) {
          // have a horizontal carrier
          var horizontalSpacer = System.Array.getItem(
            node.getChildren(),
            ix,
            OrgChart.Layout.BoxTree.Node
          );
          var leftmost = System.Array.getItem(
            node.getChildren(),
            (node.getState().NumberOfSiblings + 1) | 0,
            OrgChart.Layout.BoxTree.Node
          ).getState().TopLeft;
          var rightmost = System.Array.getItem(
            node.getChildren(),
            (ix - 1) | 0,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getRight();
          OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
            horizontalSpacer.getState(),
            leftmost.X,
            leftmost.Y - this.ParentChildSpacing,
            rightmost - leftmost.X,
            this.ParentChildSpacing
          );
          state.MergeSpacer(horizontalSpacer);
        }
      }
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineFishboneLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      if (node.getState().NumberOfSiblings <= ((this.MaxGroups * 2) | 0)) {
        OrgChart.Layout.LinearLayoutStrategy.prototype.RouteConnectors.call(
          this,
          state,
          node
        );
        return;
      }

      var count =
        (((1 + node.getState().NumberOfSiblings) | 0) +
          node.getState().NumberOfSiblingColumns) |
        0; // one for each vertical carrier
      if (node.getState().NumberOfSiblingColumns > 1) {
        // also have a horizontal carrier
        count = (count + 1) | 0;
      }

      var segments = System.Array.init(count, function () {
        return new OrgChart.Layout.Edge();
      });

      var rootRect = node.getState();
      var center = rootRect.getCenterH();

      var ix = 0;

      // parent connector
      var space =
        System.Array.getItem(
          node.getChildren(),
          0,
          OrgChart.Layout.BoxTree.Node
        ).getState().SiblingsRowV.From - rootRect.getBottom();
      segments[
        Bridge.identity(ix, (ix = (ix + 1) | 0))
      ] = new OrgChart.Layout.Edge.$ctor1(
        new OrgChart.Layout.Point.$ctor1(center, rootRect.getBottom()),
        new OrgChart.Layout.Point.$ctor1(
          center,
          rootRect.getBottom() + space - this.ChildConnectorHookLength
        )
      );

      // one hook for each child
      var iterator = new OrgChart.Layout.MultiLineFishboneLayoutStrategy.SingleFishboneLayoutAdapter.GroupIterator(
        node.getState().NumberOfSiblings,
        node.getState().NumberOfSiblingColumns
      );
      while (iterator.NextGroup()) {
        var carrier = System.Array.getItem(
          node.getChildren(),
          (((1 + node.getState().NumberOfSiblings) | 0) + iterator.Group) | 0,
          OrgChart.Layout.BoxTree.Node
        ).getState();
        var from = carrier.getCenterH();

        var isLeft = true;
        var countOnThisSide = 0;
        for (
          var i = iterator.FromIndex;
          i < ((iterator.FromIndex + iterator.Count) | 0);
          i = (i + 1) | 0
        ) {
          var to = isLeft
            ? System.Array.getItem(
                node.getChildren(),
                i,
                OrgChart.Layout.BoxTree.Node
              )
                .getState()
                .getRight()
            : System.Array.getItem(
                node.getChildren(),
                i,
                OrgChart.Layout.BoxTree.Node
              )
                .getState()
                .getLeft();
          var y = System.Array.getItem(
            node.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          )
            .getState()
            .getCenterV();
          segments[
            Bridge.identity(ix, (ix = (ix + 1) | 0))
          ] = new OrgChart.Layout.Edge.$ctor1(
            new OrgChart.Layout.Point.$ctor1(from, y),
            new OrgChart.Layout.Point.$ctor1(to, y)
          );

          if (
            (countOnThisSide = (countOnThisSide + 1) | 0) === iterator.MaxOnLeft
          ) {
            countOnThisSide = 0;
            if (isLeft) {
              // one for each vertical carrier
              segments[
                (((1 + node.getState().NumberOfSiblings) | 0) +
                  iterator.Group) |
                  0
              ] = new OrgChart.Layout.Edge.$ctor1(
                new OrgChart.Layout.Point.$ctor1(
                  carrier.getCenterH(),
                  carrier.getTop() - this.ChildConnectorHookLength
                ),
                new OrgChart.Layout.Point.$ctor1(
                  carrier.getCenterH(),
                  System.Array.getItem(
                    node.getChildren(),
                    i,
                    OrgChart.Layout.BoxTree.Node
                  )
                    .getState()
                    .getCenterV()
                )
              );
            }
            isLeft = !isLeft;
          }
        }
      }

      // vertical carriers already created
      ix = (ix + node.getState().NumberOfSiblingColumns) | 0;

      if (node.getState().NumberOfSiblingColumns > 1) {
        var leftGroup = System.Array.getItem(
          node.getChildren(),
          (1 + node.getState().NumberOfSiblings) | 0,
          OrgChart.Layout.BoxTree.Node
        ).getState();
        var rightGroup = System.Array.getItem(
          node.getChildren(),
          (((((1 + node.getState().NumberOfSiblings) | 0) +
            node.getState().NumberOfSiblingColumns) |
            0) -
            1) |
            0,
          OrgChart.Layout.BoxTree.Node
        ).getState();

        // one horizontal carrier
        segments[ix] = new OrgChart.Layout.Edge.$ctor1(
          new OrgChart.Layout.Point.$ctor1(
            leftGroup.getCenterH(),
            leftGroup.getTop() - this.ChildConnectorHookLength
          ),
          new OrgChart.Layout.Point.$ctor1(
            rightGroup.getCenterH(),
            rightGroup.getTop() - this.ChildConnectorHookLength
          )
        );
      }

      node.getState().Connector = new OrgChart.Layout.Connector(segments);
    },
  });

  /**
   * Arranges child boxes in multiple lines under the parent.
   Can only be configured to position parent in the middle of children.
   Children are attached to long horizontal carriers,
   with a central vertical carrier going through them from parent's bottom.
   *
   * @public
   * @class OrgChart.Layout.MultiLineHangerLayoutStrategy
   * @augments OrgChart.Layout.LinearLayoutStrategy
   */
  Bridge.define("OrgChart.Layout.MultiLineHangerLayoutStrategy", {
    inherits: [OrgChart.Layout.LinearLayoutStrategy],
    /**
     * Maximum number of siblings in a horizontal row.
     *
     * @instance
     */
    MaxSiblingsPerRow: 4,
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @public
       * @override
       * @this OrgChart.Layout.MultiLineHangerLayoutStrategy
       * @memberof OrgChart.Layout.MultiLineHangerLayoutStrategy
       * @function getSupportsAssistants
       * @return  {boolean}
       */
    /**
       * <pre><code>true</code></pre> if this strategy supports special layout for assistant boxes.
       If not, assistants will be processed as part of normal children group.
       *
       * @instance
       * @function setSupportsAssistants
       */
    getSupportsAssistants: function () {
      return true;
    },
    /**
     * A chance for layout strategy to append special auto-generated boxes into the visual tree.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    PreProcessThisNode: function (state, node) {
      if (this.MaxSiblingsPerRow <= 0 || this.MaxSiblingsPerRow % 2 !== 0) {
        throw new System.InvalidOperationException(
          "MaxSiblingsPerRow must be a positive even value"
        );
      }

      if (node.getChildCount() <= this.MaxSiblingsPerRow) {
        // fall back to linear layout, only have one row of boxes
        OrgChart.Layout.LinearLayoutStrategy.prototype.PreProcessThisNode.call(
          this,
          state,
          node
        );
        return;
      }

      node.getState().NumberOfSiblings = node.getChildCount();

      // only add spacers for non-collapsed boxes
      if (node.getState().NumberOfSiblings > 0) {
        var lastRowBoxCount = node.getChildCount() % this.MaxSiblingsPerRow;

        // add one (for vertical spacer) into the count of layout columns
        node.getState().NumberOfSiblingColumns =
          (1 + this.MaxSiblingsPerRow) | 0;

        node.getState().NumberOfSiblingRows =
          Bridge.Int.div(node.getChildCount(), this.MaxSiblingsPerRow) | 0;
        if (lastRowBoxCount !== 0) {
          node.getState().NumberOfSiblingRows =
            (node.getState().NumberOfSiblingRows + 1) | 0;
        }

        // include vertical spacers into the count of layout siblings
        node.getState().NumberOfSiblings =
          (node.getChildCount() + node.getState().NumberOfSiblingRows) | 0;
        if (
          lastRowBoxCount > 0 &&
          lastRowBoxCount <= (Bridge.Int.div(this.MaxSiblingsPerRow, 2) | 0)
        ) {
          // don't need the last spacer, last row is half-full or even less
          node.getState().NumberOfSiblings =
            (node.getState().NumberOfSiblings - 1) | 0;
        }

        // sibling middle-spacers have to be inserted between siblings
        var ix = Bridge.Int.div(this.MaxSiblingsPerRow, 2) | 0;
        while (ix < node.getState().NumberOfSiblings) {
          var siblingSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.InsertRegularChild(ix, siblingSpacer);
          ix = (ix + node.getState().NumberOfSiblingColumns) | 0;
        }

        // add parent vertical spacer to the end
        var verticalSpacer = OrgChart.Layout.Box.Special(
          OrgChart.Layout.Box.None,
          node.getElement().Id,
          false
        );
        node.AddRegularChild(verticalSpacer);

        // add horizontal spacers to the end
        for (
          var i = 0;
          i < node.getState().NumberOfSiblingRows;
          i = (i + 1) | 0
        ) {
          var horizontalSpacer = OrgChart.Layout.Box.Special(
            OrgChart.Layout.Box.None,
            node.getElement().Id,
            false
          );
          node.AddRegularChild(horizontalSpacer);
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyVerticalLayout: function (state, level) {
      var node = level.BranchRoot;
      if (node.getState().NumberOfSiblings <= this.MaxSiblingsPerRow) {
        // fall back to linear layout, only have one row of boxes
        OrgChart.Layout.LinearLayoutStrategy.prototype.ApplyVerticalLayout.call(
          this,
          state,
          level
        );
        return;
      }

      if (node.getLevel() === 0) {
        node.getState().SiblingsRowV = new OrgChart.Layout.Dimensions.$ctor1(
          node.getState().getTop(),
          node.getState().getBottom()
        );
      }

      if (node.getAssistantsRoot() != null) {
        // assistants root has to be initialized with main node's exterior
        OrgChart.Layout.LayoutAlgorithm.CopyExteriorFrom(
          node.getAssistantsRoot().getState(),
          node.getState()
        );
        OrgChart.Layout.LayoutAlgorithm.VerticalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      var prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
        node.getState().SiblingsRowV.From,
        node.getAssistantsRoot() == null
          ? node.getState().SiblingsRowV.To
          : node.getState().BranchExterior.getBottom()
      );

      for (
        var row = 0;
        row < node.getState().NumberOfSiblingRows;
        row = (row + 1) | 0
      ) {
        var siblingsRowExterior = OrgChart.Layout.Dimensions.MinMax();

        var spacing = row === 0 ? this.ParentChildSpacing : this.SiblingSpacing;

        // first, compute
        var from = (row * node.getState().NumberOfSiblingColumns) | 0;
        var to = Math.min(
          (from + node.getState().NumberOfSiblingColumns) | 0,
          node.getState().NumberOfSiblings
        );
        for (var i = from; i < to; i = (i + 1) | 0) {
          var child = System.Array.getItem(
            node.getChildren(),
            i,
            OrgChart.Layout.BoxTree.Node
          );
          if (child.getElement().IsSpecial) {
            // skip vertical spacers for now
            continue;
          }

          var rect = child.getState();

          var top = prevRowExterior.To + spacing;
          OrgChart.Layout.LayoutAlgorithm.MoveTo(
            child.getState(),
            rect.getLeft(),
            top
          );
          child.getState().BranchExterior = new OrgChart.Layout.Rect.$ctor1(
            child.getState().TopLeft,
            child.getState().Size
          );

          siblingsRowExterior = OrgChart.Layout.Dimensions.op_Addition(
            siblingsRowExterior,
            new OrgChart.Layout.Dimensions.$ctor1(top, top + rect.Size.Height)
          );
        }

        siblingsRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          siblingsRowExterior.From,
          siblingsRowExterior.To
        );

        var siblingsBottom = System.Double.min;
        for (var i1 = from; i1 < to; i1 = (i1 + 1) | 0) {
          var child1 = System.Array.getItem(
            node.getChildren(),
            i1,
            OrgChart.Layout.BoxTree.Node
          );
          child1.getState().SiblingsRowV = siblingsRowExterior;

          // re-enter layout algorithm for child branch
          OrgChart.Layout.LayoutAlgorithm.VerticalLayout(state, child1);

          siblingsBottom = Math.max(
            siblingsBottom,
            child1.getState().BranchExterior.getBottom()
          );
        }

        prevRowExterior = new OrgChart.Layout.Dimensions.$ctor1(
          siblingsRowExterior.From,
          Math.max(siblingsBottom, siblingsRowExterior.To)
        );

        // now assign size to the vertical spacer, if any
        var spacerIndex =
          (from +
            (Bridge.Int.div(node.getState().NumberOfSiblingColumns, 2) | 0)) |
          0;
        if (spacerIndex < node.getState().NumberOfSiblings) {
          // in the last row, spacer should only extend to the siblings row bottom,
          // because main vertical carrier does not go below last row
          // and thus cannot conflict with branches of children of the last row
          var spacerBottom =
            row === ((node.getState().NumberOfSiblingRows - 1) | 0)
              ? System.Array.getItem(
                  node.getChildren(),
                  (spacerIndex - 1) | 0,
                  OrgChart.Layout.BoxTree.Node
                ).getState().SiblingsRowV.To
              : prevRowExterior.To;

          var spacer = System.Array.getItem(
            node.getChildren(),
            spacerIndex,
            OrgChart.Layout.BoxTree.Node
          ).getState();
          OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
            spacer,
            0,
            prevRowExterior.From,
            this.ParentConnectorShield,
            spacerBottom - prevRowExterior.From
          );
        }
      }
    },
    /**
     * Applies layout changes to a given box and its children.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}                state
     * @param   {OrgChart.Layout.LayoutState.LayoutLevel}    level
     * @return  {void}
     */
    ApplyHorizontalLayout: function (state, level) {
      var node = level.BranchRoot;

      if (node.getState().NumberOfSiblings <= this.MaxSiblingsPerRow) {
        // fall back to linear layout, only have one row of boxes
        OrgChart.Layout.LinearLayoutStrategy.prototype.ApplyHorizontalLayout.call(
          this,
          state,
          level
        );
        return;
      }

      if (node.getAssistantsRoot() != null) {
        OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(
          state,
          node.getAssistantsRoot()
        );
      }

      for (
        var col = 0;
        col < node.getState().NumberOfSiblingColumns;
        col = (col + 1) | 0
      ) {
        // first, perform horizontal layout for every node in this column
        for (
          var row = 0;
          row < node.getState().NumberOfSiblingRows;
          row = (row + 1) | 0
        ) {
          var ix =
            (((row * node.getState().NumberOfSiblingColumns) | 0) + col) | 0;
          if (ix >= node.getState().NumberOfSiblings) {
            break;
          }

          var child = System.Array.getItem(
            node.getChildren(),
            ix,
            OrgChart.Layout.BoxTree.Node
          );
          // re-enter layout algorithm for child branch
          OrgChart.Layout.LayoutAlgorithm.HorizontalLayout(state, child);
        }

        OrgChart.Layout.LayoutAlgorithm.AlignHorizontalCenters(
          state,
          level,
          this.EnumerateColumn(node, col)
        );
      }

      // now align children under parent
      var rect = node.getState();
      var spacer = System.Array.getItem(
        node.getChildren(),
        Bridge.Int.div(node.getState().NumberOfSiblingColumns, 2) | 0,
        OrgChart.Layout.BoxTree.Node
      );
      var desiredCenter = spacer.getState().getCenterH();
      var diff = rect.getCenterH() - desiredCenter;
      OrgChart.Layout.LayoutAlgorithm.MoveChildrenOnly(state, level, diff);

      // vertical connector from parent
      var verticalSpacer = System.Array.getItem(
        node.getChildren(),
        node.getState().NumberOfSiblings,
        OrgChart.Layout.BoxTree.Node
      );
      OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
        verticalSpacer.getState(),
        rect.getCenterH() - this.ParentConnectorShield / 2,
        rect.getBottom(),
        this.ParentConnectorShield,
        System.Array.getItem(
          node.getChildren(),
          0,
          OrgChart.Layout.BoxTree.Node
        ).getState().SiblingsRowV.From - rect.getBottom()
      );
      state.MergeSpacer(verticalSpacer);

      // horizontal row carrier protectors
      var spacing = this.ParentChildSpacing;
      for (
        var firstInRowIndex = 0;
        firstInRowIndex < node.getState().NumberOfSiblings;
        firstInRowIndex =
          (firstInRowIndex + node.getState().NumberOfSiblingColumns) | 0
      ) {
        var firstInRow = System.Array.getItem(
          node.getChildren(),
          firstInRowIndex,
          OrgChart.Layout.BoxTree.Node
        ).getState();
        var lastInRow = System.Array.getItem(
          node.getChildren(),
          Math.min(
            (((firstInRowIndex + node.getState().NumberOfSiblingColumns) | 0) -
              1) |
              0,
            (node.getState().NumberOfSiblings - 1) | 0
          ),
          OrgChart.Layout.BoxTree.Node
        ).getState();

        var horizontalSpacer = System.Array.getItem(
          node.getChildren(),
          (((1 + node.getState().NumberOfSiblings) | 0) +
            (Bridge.Int.div(
              firstInRowIndex,
              node.getState().NumberOfSiblingColumns
            ) |
              0)) |
            0,
          OrgChart.Layout.BoxTree.Node
        );

        var width =
          lastInRow.getRight() >= verticalSpacer.getState().getRight()
            ? lastInRow.getRight() - firstInRow.getLeft()
            : verticalSpacer.getState().getRight() - firstInRow.getLeft();

        OrgChart.Layout.LayoutAlgorithm.AdjustSpacer(
          horizontalSpacer.getState(),
          firstInRow.getLeft(),
          firstInRow.SiblingsRowV.From - spacing,
          width,
          spacing
        );
        state.MergeSpacer(horizontalSpacer);

        spacing = this.SiblingSpacing;
      }
    },
    EnumerateColumn: function (branchRoot, col) {
      var $yield = [];
      for (
        var row = 0;
        row < branchRoot.getState().NumberOfSiblingRows;
        row = (row + 1) | 0
      ) {
        var ix =
          (((row * branchRoot.getState().NumberOfSiblingColumns) | 0) + col) |
          0;
        if (ix >= branchRoot.getState().NumberOfSiblings) {
          break;
        }

        $yield.push(
          System.Array.getItem(
            branchRoot.getChildren(),
            ix,
            OrgChart.Layout.BoxTree.Node
          )
        );
      }
      return System.Array.toEnumerable($yield);
    },
    /**
     * Allocates and routes connectors.
     *
     * @instance
     * @public
     * @override
     * @this OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @memberof OrgChart.Layout.MultiLineHangerLayoutStrategy
     * @param   {OrgChart.Layout.LayoutState}     state
     * @param   {OrgChart.Layout.BoxTree.Node}    node
     * @return  {void}
     */
    RouteConnectors: function (state, node) {
      var $t;
      if (node.getState().NumberOfSiblings <= this.MaxSiblingsPerRow) {
        // fall back to linear layout, only have one row of boxes
        OrgChart.Layout.LinearLayoutStrategy.prototype.RouteConnectors.call(
          this,
          state,
          node
        );
        return;
      }

      // one parent connector (also serves as mid-sibling carrier) and horizontal carriers
      var count = (1 + node.getState().NumberOfSiblingRows) | 0;

      $t = Bridge.getEnumerator(
        node.getChildren(),
        OrgChart.Layout.BoxTree.Node
      );
      while ($t.moveNext()) {
        var child = $t.getCurrent();
        // normal boxes get one upward hook
        if (!child.getElement().IsSpecial) {
          count = (count + 1) | 0;
        }
      }

      var segments = System.Array.init(count, function () {
        return new OrgChart.Layout.Edge();
      });

      var rootRect = node.getState();
      var center = rootRect.getCenterH();

      var verticalCarrierHeight =
        System.Array.getItem(
          node.getChildren(),
          (node.getState().NumberOfSiblings - 1) | 0,
          OrgChart.Layout.BoxTree.Node
        ).getState().SiblingsRowV.From -
        this.ChildConnectorHookLength -
        rootRect.getBottom();

      // central mid-sibling vertical connector, from parent to last row
      segments[0] = new OrgChart.Layout.Edge.$ctor1(
        new OrgChart.Layout.Point.$ctor1(center, rootRect.getBottom()),
        new OrgChart.Layout.Point.$ctor1(
          center,
          rootRect.getBottom() + verticalCarrierHeight
        )
      );

      // short hook for each child
      var ix = 1;
      for (var i = 0; i < node.getState().NumberOfSiblings; i = (i + 1) | 0) {
        var child1 = System.Array.getItem(
          node.getChildren(),
          i,
          OrgChart.Layout.BoxTree.Node
        );
        if (!child1.getElement().IsSpecial) {
          var childRect = child1.getState();
          var childCenter = childRect.getCenterH();
          segments[
            Bridge.identity(ix, (ix = (ix + 1) | 0))
          ] = new OrgChart.Layout.Edge.$ctor1(
            new OrgChart.Layout.Point.$ctor1(childCenter, childRect.getTop()),
            new OrgChart.Layout.Point.$ctor1(
              childCenter,
              childRect.getTop() - this.ChildConnectorHookLength
            )
          );
        }
      }

      // horizontal carriers go from leftmost child hook to righmost child hook
      // for the last row which is just half or less full, it will only go to the central vertical carrier
      var lastChildHookIndex =
        (((count - node.getState().NumberOfSiblingRows) | 0) - 1) | 0;
      for (
        var firstInRowIndex = 1;
        firstInRowIndex < ((count - node.getState().NumberOfSiblingRows) | 0);
        firstInRowIndex = (firstInRowIndex + this.MaxSiblingsPerRow) | 0
      ) {
        var firstInRow = segments[firstInRowIndex];

        var lastInRow =
          segments[
            Math.min(
              (((firstInRowIndex + this.MaxSiblingsPerRow) | 0) - 1) | 0,
              lastChildHookIndex
            )
          ];

        if (lastInRow.From.X < segments[0].From.X) {
          segments[
            Bridge.identity(ix, (ix = (ix + 1) | 0))
          ] = new OrgChart.Layout.Edge.$ctor1(
            new OrgChart.Layout.Point.$ctor1(firstInRow.To.X, firstInRow.To.Y),
            new OrgChart.Layout.Point.$ctor1(segments[0].To.X, firstInRow.To.Y)
          );
        } else {
          segments[
            Bridge.identity(ix, (ix = (ix + 1) | 0))
          ] = new OrgChart.Layout.Edge.$ctor1(
            new OrgChart.Layout.Point.$ctor1(firstInRow.To.X, firstInRow.To.Y),
            new OrgChart.Layout.Point.$ctor1(lastInRow.To.X, firstInRow.To.Y)
          );
        }
      }

      node.getState().Connector = new OrgChart.Layout.Connector(segments);
    },
  });

  var $m = Bridge.setMetadata,
    $n = [
      OrgChart.Layout,
      System,
      System.Collections.Generic,
      OrgChart.Annotations,
      OrgChart.Test,
    ];
  $m($n[3].ContractAnnotationAttribute, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Contract",
          t: 16,
          rt: String,
          g: { a: 2, n: "get_Contract", t: 8, sn: "getContract", rt: String },
          s: {
            a: 1,
            n: "set_Contract",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setContract",
            rt: Object,
            p: [String],
          },
        },
      ],
      am: true,
    };
  });
  $m($n[0].Boundary.Step, function () {
    return {
      at: [
        new System.Diagnostics.DebuggerDisplayAttribute(
          "{X}, {Top} - {Bottom}, {Node.Element.Id}"
        ),
      ],
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Node",
          t: 4,
          rt: $n[0].BoxTree.Node,
          sn: "Node",
          ro: true,
        },
      ],
    };
  });
  $m($n[0].Box, function () {
    return {
      at: [
        new System.Diagnostics.DebuggerDisplayAttribute(
          "{Id}, Size.Width}x{Size.Height}"
        ),
      ],
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Special",
          is: true,
          t: 8,
          pi: [
            { n: "id", pt: $n[1].Int32, ps: 0 },
            { n: "visualParentId", pt: $n[1].Int32, ps: 1 },
            { n: "disableCollisionDetection", pt: Boolean, ps: 2 },
          ],
          sn: "Special",
          rt: $n[0].Box,
          p: [$n[1].Int32, $n[1].Int32, Boolean],
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "AssistantLayoutStrategyId",
          t: 4,
          rt: String,
          sn: "AssistantLayoutStrategyId",
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "DataId",
          t: 4,
          rt: String,
          sn: "DataId",
          ro: true,
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "LayoutStrategyId",
          t: 4,
          rt: String,
          sn: "LayoutStrategyId",
        },
      ],
    };
  });
  $m($n[0].BoxContainer, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "SystemRoot",
          t: 16,
          rt: $n[0].Box,
          g: {
            a: 2,
            n: "get_SystemRoot",
            t: 8,
            sn: "getSystemRoot",
            rt: $n[0].Box,
          },
          s: {
            a: 2,
            n: "set_SystemRoot",
            t: 8,
            pi: [{ n: "value", pt: $n[0].Box, ps: 0 }],
            sn: "setSystemRoot",
            rt: Object,
            p: [$n[0].Box],
          },
        },
      ],
    };
  });
  $m($n[0].BoxTree.Node, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "AssistantsRoot",
          t: 16,
          rt: $n[0].BoxTree.Node,
          g: {
            a: 2,
            n: "get_AssistantsRoot",
            t: 8,
            sn: "getAssistantsRoot",
            rt: $n[0].BoxTree.Node,
          },
          s: {
            a: 3,
            n: "set_AssistantsRoot",
            t: 8,
            pi: [{ n: "value", pt: $n[0].BoxTree.Node, ps: 0 }],
            sn: "setAssistantsRoot",
            rt: Object,
            p: [$n[0].BoxTree.Node],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "Children",
          t: 16,
          rt: $n[2].IList$1(OrgChart.Layout.BoxTree.Node),
          g: {
            a: 2,
            n: "get_Children",
            t: 8,
            sn: "getChildren",
            rt: $n[2].IList$1(OrgChart.Layout.BoxTree.Node),
          },
          s: {
            a: 3,
            n: "set_Children",
            t: 8,
            pi: [
              {
                n: "value",
                pt: $n[2].IList$1(OrgChart.Layout.BoxTree.Node),
                ps: 0,
              },
            ],
            sn: "setChildren",
            rt: Object,
            p: [$n[2].IList$1(OrgChart.Layout.BoxTree.Node)],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Element",
          t: 16,
          rt: $n[0].Box,
          g: { a: 2, n: "get_Element", t: 8, sn: "getElement", rt: $n[0].Box },
          s: {
            a: 1,
            n: "set_Element",
            t: 8,
            pi: [{ n: "value", pt: $n[0].Box, ps: 0 }],
            sn: "setElement",
            rt: Object,
            p: [$n[0].Box],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "ParentNode",
          t: 16,
          rt: $n[0].BoxTree.Node,
          g: {
            a: 2,
            n: "get_ParentNode",
            t: 8,
            sn: "getParentNode",
            rt: $n[0].BoxTree.Node,
          },
          s: {
            a: 2,
            n: "set_ParentNode",
            t: 8,
            pi: [{ n: "value", pt: $n[0].BoxTree.Node, ps: 0 }],
            sn: "setParentNode",
            rt: Object,
            p: [$n[0].BoxTree.Node],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "State",
          t: 16,
          rt: $n[0].NodeLayoutInfo,
          g: {
            a: 2,
            n: "get_State",
            t: 8,
            sn: "getState",
            rt: $n[0].NodeLayoutInfo,
          },
          s: {
            a: 1,
            n: "set_State",
            t: 8,
            pi: [{ n: "value", pt: $n[0].NodeLayoutInfo, ps: 0 }],
            sn: "setState",
            rt: Object,
            p: [$n[0].NodeLayoutInfo],
          },
        },
      ],
    };
  });
  $m($n[0].Connector, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Segments",
          t: 16,
          rt: Array,
          g: { a: 2, n: "get_Segments", t: 8, sn: "getSegments", rt: Array },
          s: {
            a: 1,
            n: "set_Segments",
            t: 8,
            pi: [{ n: "value", pt: Array, ps: 0 }],
            sn: "setSegments",
            rt: Object,
            p: [Array],
          },
        },
      ],
    };
  });
  $m($n[0].Diagram, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "VisualTree",
          t: 16,
          rt: $n[0].BoxTree,
          g: {
            a: 2,
            n: "get_VisualTree",
            t: 8,
            sn: "getVisualTree",
            rt: $n[0].BoxTree,
          },
          s: {
            a: 2,
            n: "set_VisualTree",
            t: 8,
            pi: [{ n: "value", pt: $n[0].BoxTree, ps: 0 }],
            sn: "setVisualTree",
            rt: Object,
            p: [$n[0].BoxTree],
          },
        },
      ],
    };
  });
  $m($n[0].DiagramLayoutSettings, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "DefaultAssistantLayoutStrategyId",
          t: 16,
          rt: String,
          g: {
            a: 2,
            n: "get_DefaultAssistantLayoutStrategyId",
            t: 8,
            sn: "getDefaultAssistantLayoutStrategyId",
            rt: String,
          },
          s: {
            a: 2,
            n: "set_DefaultAssistantLayoutStrategyId",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setDefaultAssistantLayoutStrategyId",
            rt: Object,
            p: [String],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "DefaultLayoutStrategyId",
          t: 16,
          rt: String,
          g: {
            a: 2,
            n: "get_DefaultLayoutStrategyId",
            t: 8,
            sn: "getDefaultLayoutStrategyId",
            rt: String,
          },
          s: {
            a: 2,
            n: "set_DefaultLayoutStrategyId",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setDefaultLayoutStrategyId",
            rt: Object,
            p: [String],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "LayoutStrategies",
          t: 16,
          rt: $n[2].Dictionary$2(String, OrgChart.Layout.LayoutStrategyBase),
          g: {
            a: 2,
            n: "get_LayoutStrategies",
            t: 8,
            sn: "getLayoutStrategies",
            rt: $n[2].Dictionary$2(String, OrgChart.Layout.LayoutStrategyBase),
          },
          s: {
            a: 1,
            n: "set_LayoutStrategies",
            t: 8,
            pi: [
              {
                n: "value",
                pt: $n[2].Dictionary$2(
                  String,
                  OrgChart.Layout.LayoutStrategyBase
                ),
                ps: 0,
              },
            ],
            sn: "setLayoutStrategies",
            rt: Object,
            p: [$n[2].Dictionary$2(String, OrgChart.Layout.LayoutStrategyBase)],
          },
        },
      ],
    };
  });
  $m($n[0].Frame1, function () {
    return {
      at: [
        new System.Diagnostics.DebuggerDisplayAttribute(
          "{Exterior.Left}:{Exterior.Top}, {Exterior.Size.Width}x{Exterior.Size.Height}"
        ),
      ],
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "Connector",
          t: 4,
          rt: $n[0].Connector,
          sn: "Connector",
        },
      ],
    };
  });
  $m($n[0].IChartDataSource, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          ab: true,
          a: 2,
          n: "AllDataItemIds",
          t: 16,
          rt: $n[2].IEnumerable$1(String),
          g: {
            ab: true,
            a: 2,
            n: "get_AllDataItemIds",
            t: 8,
            sn: "OrgChart$Layout$IChartDataSource$getAllDataItemIds",
            rt: $n[2].IEnumerable$1(String),
          },
          s: {
            ab: true,
            a: 1,
            n: "set_AllDataItemIds",
            t: 8,
            pi: [{ n: "value", pt: $n[2].IEnumerable$1(String), ps: 0 }],
            sn: "OrgChart$Layout$IChartDataSource$setAllDataItemIds",
            rt: Object,
            p: [$n[2].IEnumerable$1(String)],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          ab: true,
          a: 2,
          n: "GetDataItemFunc",
          t: 16,
          rt: Function,
          g: {
            ab: true,
            a: 2,
            n: "get_GetDataItemFunc",
            t: 8,
            sn: "OrgChart$Layout$IChartDataSource$getGetDataItemFunc",
            rt: Function,
          },
          s: {
            ab: true,
            a: 1,
            n: "set_GetDataItemFunc",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "OrgChart$Layout$IChartDataSource$setGetDataItemFunc",
            rt: Object,
            p: [Function],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          ab: true,
          a: 2,
          n: "GetParentKeyFunc",
          t: 16,
          rt: Function,
          g: {
            ab: true,
            a: 2,
            n: "get_GetParentKeyFunc",
            t: 8,
            sn: "OrgChart$Layout$IChartDataSource$getGetParentKeyFunc",
            rt: Function,
          },
          s: {
            ab: true,
            a: 1,
            n: "set_GetParentKeyFunc",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "OrgChart$Layout$IChartDataSource$setGetParentKeyFunc",
            rt: Object,
            p: [Function],
          },
        },
      ],
    };
  });
  $m($n[0].LayoutState, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "BoxSizeFunc",
          t: 16,
          rt: Function,
          g: {
            a: 2,
            n: "get_BoxSizeFunc",
            t: 8,
            sn: "getBoxSizeFunc",
            rt: Function,
          },
          s: {
            a: 2,
            n: "set_BoxSizeFunc",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "setBoxSizeFunc",
            rt: Object,
            p: [Function],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Diagram",
          t: 16,
          rt: $n[0].Diagram,
          g: {
            a: 2,
            n: "get_Diagram",
            t: 8,
            sn: "getDiagram",
            rt: $n[0].Diagram,
          },
          s: {
            a: 1,
            n: "set_Diagram",
            t: 8,
            pi: [{ n: "value", pt: $n[0].Diagram, ps: 0 }],
            sn: "setDiagram",
            rt: Object,
            p: [$n[0].Diagram],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "LayoutOptimizerFunc",
          t: 16,
          rt: Function,
          g: {
            a: 2,
            n: "get_LayoutOptimizerFunc",
            t: 8,
            sn: "getLayoutOptimizerFunc",
            rt: Function,
          },
          s: {
            a: 2,
            n: "set_LayoutOptimizerFunc",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "setLayoutOptimizerFunc",
            rt: Object,
            p: [Function],
          },
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 1,
          n: "m_layoutStack",
          t: 4,
          rt: $n[2].Stack$1(OrgChart.Layout.LayoutState.LayoutLevel),
          sn: "m_layoutStack",
          ro: true,
        },
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 1,
          n: "m_pooledBoundaries",
          t: 4,
          rt: $n[2].Stack$1(OrgChart.Layout.Boundary),
          sn: "m_pooledBoundaries",
          ro: true,
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "BoundaryChanged",
          t: 2,
          ad: {
            a: 2,
            n: "add_BoundaryChanged",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "addBoundaryChanged",
            rt: Object,
            p: [Function],
          },
          r: {
            a: 2,
            n: "remove_BoundaryChanged",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "removeBoundaryChanged",
            rt: Object,
            p: [Function],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "OperationChanged",
          t: 2,
          ad: {
            a: 2,
            n: "add_OperationChanged",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "addOperationChanged",
            rt: Object,
            p: [Function],
          },
          r: {
            a: 2,
            n: "remove_OperationChanged",
            t: 8,
            pi: [{ n: "value", pt: Function, ps: 0 }],
            sn: "removeOperationChanged",
            rt: Object,
            p: [Function],
          },
        },
      ],
    };
  });
  $m($n[0].LayoutState.LayoutLevel, function () {
    return {
      at: [
        new System.Diagnostics.DebuggerDisplayAttribute(
          "{BranchRoot.Element.Id}, {Boundary.BoundingRect.Top}..{Boundary.BoundingRect.Bottom}"
        ),
      ],
    };
  });
  $m($n[0].NodeLayoutInfo, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "RequireLayoutStrategy",
          t: 8,
          sn: "RequireLayoutStrategy",
          rt: $n[0].LayoutStrategyBase,
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "Connector",
          t: 4,
          rt: $n[0].Connector,
          sn: "Connector",
        },
      ],
    };
  });
  $m($n[0].Rect, function () {
    return {
      at: [
        new System.Diagnostics.DebuggerDisplayAttribute(
          "{TopLeft.X}:{TopLeft.Y}, {Size.Width}x{Size.Height}"
        ),
      ],
    };
  });
  $m($n[4].TestDataItem, function () {
    return {
      m: [
        {
          at: [new OrgChart.Annotations.NotNullAttribute()],
          a: 2,
          n: "Id",
          t: 16,
          rt: String,
          g: { a: 2, n: "get_Id", t: 8, sn: "getId", rt: String },
          s: {
            a: 2,
            n: "set_Id",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setId",
            rt: Object,
            p: [String],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "ParentId",
          t: 16,
          rt: String,
          g: { a: 2, n: "get_ParentId", t: 8, sn: "getParentId", rt: String },
          s: {
            a: 2,
            n: "set_ParentId",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setParentId",
            rt: Object,
            p: [String],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "String1",
          t: 16,
          rt: String,
          g: { a: 2, n: "get_String1", t: 8, sn: "getString1", rt: String },
          s: {
            a: 2,
            n: "set_String1",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setString1",
            rt: Object,
            p: [String],
          },
        },
        {
          at: [new OrgChart.Annotations.CanBeNullAttribute()],
          a: 2,
          n: "String2",
          t: 16,
          rt: String,
          g: { a: 2, n: "get_String2", t: 8, sn: "getString2", rt: String },
          s: {
            a: 2,
            n: "set_String2",
            t: 8,
            pi: [{ n: "value", pt: String, ps: 0 }],
            sn: "setString2",
            rt: Object,
            p: [String],
          },
        },
      ],
    };
  });
});
