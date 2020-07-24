const peek = <T>(array: T[]): T | undefined => {
  return array[array.length - 1];
};

export { peek };
