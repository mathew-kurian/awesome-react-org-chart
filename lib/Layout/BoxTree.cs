/*
 * Copyright (c) Roman Polunin 2016. 
 * MIT license, see https://opensource.org/licenses/MIT. 
*/
using System;
using System.Collections.Generic;
using OrgChart.Annotations;

namespace OrgChart.Layout
{
    /// <summary>
    /// Our tree logic instantiated for <see cref="Box"/> and <see cref="NodeLayoutInfo"/>.
    /// </summary>
    public class BoxTree
    {
        /// <summary>
        /// Node wrapper.
        /// </summary>
        public class Node
        {
            /// <summary>
            /// Hierarchy level.
            /// </summary>
            public int Level { get; protected internal set; }

            /// <summary>
            /// Reference to value element.
            /// </summary>
            [NotNull]
            public Box Element { get; }

            /// <summary>
            /// Additional information associated with the <see cref="Element"/> in this node.
            /// </summary>
            [NotNull]
            public NodeLayoutInfo State { get; }

            /// <summary>
            /// Reference to parent node wrapper.
            /// </summary>
            [CanBeNull]
            public Node ParentNode { get; set; }

            /// <summary>
            /// References to child node wrappers.
            /// </summary>
            [CanBeNull]
            public IList<Node> Children { get; protected set; }

            /// <summary>
            /// Special child used as root for assistants.
            /// Have to declare it separately to enable re-use of layout algorithms,
            /// otherwise this would not be possible due to mixing of assistants and regulars into shared collection.
            /// </summary>
            [CanBeNull]
            public Node AssistantsRoot { get; protected set; }

            /// <summary>
            /// Number of children nodes.
            /// </summary>
            public int ChildCount => Children == null ? 0 : Children.Count;

            /// <summary>
            /// <c>true</c> if this node is set as <see cref="AssistantsRoot"/> on its <see cref="ParentNode"/>.
            /// </summary>
            /// <remarks>Important! Do not remove parentheses from the null-coalescing expression.
            /// When this code is converted to JavaScript using Bridge.Net v15.6.0,
            /// it produces incorrect condition. Parentheses are the workaround for their bug.</remarks>
            public bool IsAssistantRoot => (ParentNode?.AssistantsRoot) == this;

            /// <summary>
            /// Adds a new assistant child to the list, under <see cref="AssistantsRoot"/>. 
            /// Returns reference to self.
            /// </summary>
            public Node AddAssistantChild([NotNull] Node child)
            {
                if (AssistantsRoot == null)
                {
                    AssistantsRoot = new Node(Box.Special(Box.None, Element.Id, true))
                    {
                        ParentNode = this,
                        Level = Level + 1
                    };
                }
                AssistantsRoot.AddRegularChild(child);
                return this;
            }

            /// <summary>
            /// Adds a new child to the list. Returns reference to self.
            /// </summary>
            public Node AddRegularChild([NotNull] Node child)
            {
                return InsertRegularChild(ChildCount, child);
            }

            /// <summary>
            /// Adds a new child to the list. Returns reference to self.
            /// </summary>
            public Node AddRegularChild([NotNull] Box child)
            {
                return InsertRegularChild(ChildCount, child);
            }

            /// <summary>
            /// Adds a new child to the list. Returns reference to self.
            /// </summary>
            public Node InsertRegularChild(int index, [NotNull] Box child)
            {
                return InsertRegularChild(index, new Node(child));
            }

            /// <summary>
            /// Adds a new child to the list. Returns reference to self.
            /// </summary>
            public Node InsertRegularChild(int index, [NotNull] Node child)
            {
                if (Children == null)
                {
                    Children = new List<Node>();
                }

                Children.Insert(index, child);
                child.ParentNode = this;
                child.Level = Level + 1;

                return this;
            }

            /// <summary>
            /// Ctr.
            /// </summary>
            public Node([NotNull]Box element)
            {
                Element = element;
                State = new NodeLayoutInfo();
            }

            /// <summary>
            /// Goes through all elements depth-first. Applies <paramref name="func"/> to all children recursively, then to the parent.
            /// If <paramref name="func"/> returns <c>false</c>, it will stop entire processing.
            /// </summary>
            /// <param name="func">A func to evaluate on this node and its children. Whenever it returns false, iteration stops</param>
            /// <returns>True if <paramref name="func"/> never returned <c>false</c></returns>
            public bool IterateChildFirst([NotNull] Func<Node, bool> func)
            {
                if (AssistantsRoot != null)
                {
                    if (!AssistantsRoot.IterateChildFirst(func))
                    {
                        return false;
                    }
                }

                if (Children != null)
                {
                    foreach (var child in Children)
                    {
                        if (!child.IterateChildFirst(func))
                        {
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
            public bool IterateParentFirst([NotNull] Predicate<Node> enter, [CanBeNull] Action<Node> exit = null)
            {
                if (!enter(this))
                {
                    exit?.Invoke(this);
                    return false;
                }

                AssistantsRoot?.IterateParentFirst(enter, exit);

                if (Children != null)
                {
                    foreach (var child in Children)
                    {
                        // Ignore returned value, in this mode children at each level 
                        // decide for themselves whether they want to iterate further down.
                        child.IterateParentFirst(enter, exit);
                    }
                }

                exit?.Invoke(this);

                return true;
            }

            /// <summary>
            /// Transforms assistants into regular children, 
            /// sets <see cref="AssistantsRoot"/> to <c>null</c>.
            /// Since the appropriate layout strategy is chosen only after the tree is composed,
            /// we can't know if assistants are supported or no.
            /// Therefore, <see cref="LayoutAlgorithm"/> sometimes has to suppress assistant root.
            /// </summary>
            public void SuppressAssistants()
            {
                if (AssistantsRoot != null)
                {
                    foreach (var child in AssistantsRoot.Children)
                    {
                        AddRegularChild(child);
                    }
                    AssistantsRoot = null;
                }
            }
        }

        /// <summary>
        /// Root node, as detected from data.
        /// Corresponds to <see cref="BoxContainer.SystemRoot"/> box.
        /// </summary>
        public Node Root { get; private set; }

        /// <summary>
        /// Dictionary of all node wrappers.
        /// Nodes are always one-to-one with elements, so they are identified by element keys.
        /// </summary>
        public Dictionary<int, Node> Nodes { get; }

        /// <summary>
        /// Max value of <see cref="Node.Level"/> plus one (because root nodes are level zero).
        /// </summary>
        public int Depth { get; private set; }

        /// <summary>
        /// Goes through all elements depth-first. Applies <paramref name="func"/> to all children recursively, then to the parent.
        /// If <paramref name="func"/> returns <c>false</c>, it will stop entire processing.
        /// </summary>
        /// <param name="func">A func to evaluate on <see cref="Root"/> and its children. Whenever it returns false, iteration stops</param>
        /// <returns>True if <paramref name="func"/> never returned <c>false</c></returns>
        public bool IterateChildFirst([NotNull] Func<Node, bool> func)
        {
            return Root.IterateChildFirst(func);
        }

        /// <summary>
        /// Goes through all elements depth-first. Applies <paramref name="enter"/> to the parent first, then to all children recursively.
        /// In this mode children at each level decide for themselves whether they want to iterate further down, 
        /// e.g. <paramref name="enter"/> can cut-off a branch.
        /// </summary>
        /// <param name="enter">A predicate to allow iteration of a specific branch</param>
        /// <param name="exit">An optional action to run after iteration of some branch is complete or canceled</param>
        public void IterateParentFirst([NotNull] Predicate<Node> enter, [CanBeNull] Action<Node> exit = null)
        {
            // Ignore returned value, in this mode children at each level 
            // decide for themselves whether they want to iterate further down.
            Root.IterateParentFirst(enter, exit);
        }

        /// <summary>
        /// Update every node's <see cref="Node.Level"/> and <see cref="Depth"/> of the tree.
        /// </summary>
        public void UpdateHierarchyStats()
        {
            // initialize hierarchy level numbers
            Depth = 0;
            IterateParentFirst(x =>
            {
                if (x.ParentNode != null)
                {
                    x.Level = x.ParentNode.Level;
                    if (!x.ParentNode.IsAssistantRoot)
                    {
                        x.Level = x.Level + 1;
                    }
                    Depth = Math.Max(1 + x.Level, Depth);
                }
                else
                {
                    x.Level = 0;
                    Depth = 1;
                }
                return true;
            });
        }

        /// <summary>
        /// Ctr.
        /// </summary>
        public BoxTree()
        {
            Nodes = new Dictionary<int, Node>();
        }

        /// <summary>
        /// Constructs a new tree.
        /// </summary>
        public static BoxTree Build([NotNull] LayoutState state)
        {
            var result = new BoxTree();

            // build dictionary of nodes
            foreach (var box in state.Diagram.Boxes.BoxesById.Values)
            {
                var node = new Node(box);
                result.Nodes.Add(box.Id, node);
            }
            
            // build the tree
            foreach (var node in result.Nodes.Values)
            {
                var parentKey = node.Element.ParentId;

                Node parentNode;
                if (result.Nodes.TryGetValue(parentKey, out parentNode))
                {
                    if (node.Element.IsAssistant && parentNode.Element.ParentId != Box.None)
                    {
                        parentNode.AddAssistantChild(node);
                    }
                    else
                    {
                        parentNode.AddRegularChild(node);
                    }
                }
                else
                {
                    if (result.Root != null)
                    {
                        throw new InvalidOperationException("More then one root found: " + node.Element.Id);
                    }
                    // In case of data errors, parent key may be not null, but parent node is not there.
                    // Just add the node to roots.
                    result.Root = node;
                }
            }

            return result;
        }
    }
}