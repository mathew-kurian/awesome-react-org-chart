enum StackOrientation {
  /// <summary>
  /// Default value is invalid, do not use it.
  /// </summary>
  InvalidValue = 0,
  /// <summary>
  /// Put all children in one line under parent, order left-to-right horizontally.
  /// </summary>
  SingleRowHorizontal,
  /// <summary>
  /// Put all children in one column under parent, order top-bottom vertically.
  /// </summary>
  SingleColumnVertical,
}

export default StackOrientation;
