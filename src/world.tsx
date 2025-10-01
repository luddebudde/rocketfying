import { Application } from "pixi.js";
import { Planet, Vec2 } from "./createPlanet";
import { Player } from "./createPlayer";

type World = {
  planets: Planet[];
  worldObjects: (Planet | Player)[];
};

export const app = new Application();

export const world: World = {
  planets: [],
  worldObjects: [],
};

export const screenSize: Vec2 = {
  x: app.screen.width,
  y: app.screen.height,
};
// console.log(screenSize);
