export const findElement = (array: any[], name: string) => {
  //   console.log(array);

  const found = array.find(([arrName]) => arrName === name);

  const [, path] = found; // path är string
  //   console.log("Found path:", path);

  return found;
};
