import { Container } from "pixi.js";
import { app, world } from "./world";

export const createWorldObject = (object: any) => {
  //   const objectContainer = container === undefined ? new Container() : container;
  //   app.stage.addChild(objectContainer);

  //   objectContainer.addChild(object.sprite);
  world.worldObjects.push(object);
};
