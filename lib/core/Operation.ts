enum Operation {
  /// <summary>
  /// No op.
  /// </summary>
  Idle,
  /// <summary>
  /// Making initial preparations, creating visual tree.
  /// </summary>
  Preparing,
  /// <summary>
  /// Pre-layout modifications of the visual tree.
  /// </summary>
  PreprocessVisualTree,
  /// <summary>
  /// Vertical layout in progress.
  /// </summary>
  VerticalLayout,
  /// <summary>
  /// Horizontal layout in progress.
  /// </summary>
  HorizontalLayout,
  /// <summary>
  /// Creating and positioning connectors.
  /// </summary>
  ConnectorsLayout,
  /// <summary>
  /// All layout operations have been completed.
  /// </summary>
  Completed,
}

export default Operation;
