import { Container } from "pixi.js";
import { Planet, Vec2 } from "./worldGeneration/objects/createPlanet";
import { Player } from "./worldGeneration/createPlayer";
import { app } from "./app";
import { SolarSystem } from "./worldGeneration/createSolarSystem";
import { Blackhole } from "./worldGeneration/objects/createBlackhole";
import { Sun } from "./worldGeneration/objects/createSun";

export type World = {
  planets: (Planet | Sun | Blackhole)[];
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

export const GForce: number = 0.00001;
export const worldScale = 1;
export const simulationSpeed: number = 1;
// export const getScreenSize = (): Vec2 => ({
//   x: app.screen.width,
//   y: app.screen.height,
// });
// console.log(screenSize);
