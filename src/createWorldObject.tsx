import { Container } from "pixi.js";
import { world } from "./world";
import { app } from "./app";

export const createWorldObject = (object: any) => {
  world.worldObjects.push(object);
};
