import { Vec2 } from "./createPlanet";

export const changeWorldObject = (object: any, key: string, value: number) => {
  object[key] += value;
  object.sprite[key] = object[key];
};

export const changeWorldObjectVec = (object: any, key: string, vec: Vec2) => {
  object[key].x += vec.x;
  object[key].y += vec.y;
  object.sprite[key] = object[key];
};
