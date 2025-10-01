export const changeWorldObject = (object: any, key: string, value: number) => {
  object[key] += value;
  object.sprite[key] = object[key];
};
