import { Application } from "pixi.js";
import { Planet } from "./createPlanet";

type Game = {
  planets: Planet[];
};

export const app = new Application();

export const game: Game = {
  planets: [],
};
