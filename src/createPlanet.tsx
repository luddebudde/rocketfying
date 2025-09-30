import { Assets, Container, Sprite, Texture } from "pixi.js";
import { app, world } from "./world";
import { createWorldObject } from "./createWorldObject";
import { createSprite } from "./createSprite";

export type Planet = {
  type: "planet";
  x: number;
  y: number;
  vel: Vec2;
  width: number;
  height: number;
  gravitation: number;
  radius: number;
  rotation: number;
  sprite: Sprite;
};

export type Vec2 = {
  x: number;
  y: number;
};

export const origo = () => {
  return { x: 0, y: 0 };
};

export const createPlanet = async (pos: Vec2) => {
  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    "/public/planet.png",
    pos,
    128,
    128,
    rotation
  );

  const planet: Planet = {
    type: "planet",
    x: pos.x,
    y: pos.y,
    vel: origo(),
    width: 256,
    height: 256,
    gravitation: 10,
    radius: 256,
    rotation: rotation,
    sprite: sprite,
  };

  createWorldObject(planet);
  world.planets.push(planet);
};
