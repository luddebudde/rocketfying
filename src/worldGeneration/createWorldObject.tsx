import { Container } from "pixi.js";
import { world } from "../world";

export const createWorldObject = (object: any) => {
  world.worldObjects.push(object);
};
