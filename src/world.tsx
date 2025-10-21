import { Container } from "pixi.js";
import { Planet, Vec2 } from "./createPlanet";
import { Player } from "./createPlayer";
import { app } from "./app";
import { SolarSystem } from "./createSolarSystem";

type World = {
  planets: Planet[];
  worldObjects: (Planet | Player)[];
  solarSystems: SolarSystem[];
};

export const world: World = {
  planets: [],
  worldObjects: [],
  solarSystems: [],
};

// export const cameraZoom = 1;

export const screenSize: Vec2 = {
  x: app.screen.width,
  y: app.screen.height,
};

export const GForce: number = 0.01;
export const simulationSpeed: number = 1;
// export const getScreenSize = (): Vec2 => ({
//   x: app.screen.width,
//   y: app.screen.height,
// });
// console.log(screenSize);
