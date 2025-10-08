import { Application, Container } from "pixi.js";
import { Planet, Vec2 } from "./createPlanet";
import { Player } from "./createPlayer";

type World = {
  planets: Planet[];
  worldObjects: (Planet | Player)[];
};

export const app = new Application();
await app.init({
  view: document.createElement("canvas"),
  resizeTo: window,
  preference: "webgl",
  background: "#000000",
  antialias: true,
});

export const GForce: number = 0.1;

document.body.appendChild(app.canvas);
export const world: World = {
  planets: [],
  worldObjects: [],
};

export const screenSize: Vec2 = {
  x: app.screen.width,
  y: app.screen.height,
};
// export const getScreenSize = (): Vec2 => ({
//   x: app.screen.width,
//   y: app.screen.height,
// });
// console.log(screenSize);
