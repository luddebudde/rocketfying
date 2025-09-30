import { Application } from "pixi.js";
import { Planet } from "./createPlanet";
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
