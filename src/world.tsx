import { Container } from "pixi.js";
import { Planet, Vec2 } from "./createPlanet";
import { Player } from "./createPlayer";
import { app } from "./app";

type World = {
  planets: Planet[];
  worldObjects: (Planet | Player)[];
};

export const world: World = {
  planets: [],
  worldObjects: [],
};

export const cameraScale = 0.5;

export const screenSize: Vec2 = {
  x: app.screen.width,
  y: app.screen.height,
};

export const worldScale = 9e8;
export const GForce: number = 0.01;
export const simulationSpeed: number = 1;
// export const getScreenSize = (): Vec2 => ({
//   x: app.screen.width,
//   y: app.screen.height,
// });
// console.log(screenSize);
