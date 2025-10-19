import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "./world";
import { app } from "./app";
import { createWorldObject } from "./createWorldObject";
import { createSprite } from "./createSprite";
import { findElement } from "./findElement";

export type Planet = {
  type: "planet";
  x: number;
  y: number;
  vel: Vec2;
  width: number;
  height: number;
  gravitation: number;
  mass: number;
  radius: number;
  rotation: number;
  sprite: Sprite;
};

export type Vec2 = {
  x: number;
  y: number;
};

export const origo = (): Vec2 => {
  return { x: 0, y: 0 };
};

export const createPlanet = async (
  pos: Vec2,
  size: number,
  spriteName: string,
  vel: Vec2 = origo()
) => {
  const sprites = [
    ["sun", "/sun.png"],
    ["earth", "/planet.png"],
  ];

  // console.log(spriteName);

  // console.log(findElement(sprites, spriteName), "return");

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    findElement(sprites, spriteName)[1],
    pos,
    size,
    size,
    rotation
  );

  let mass = size * size;
  // if (spriteName === "sun") [(mass = 5000)];

  const planet: Planet = {
    type: "planet",
    x: pos.x,
    y: pos.y,
    vel: vel,
    width: size,
    height: size,
    gravitation: size,
    mass: mass,
    radius: size / 2,
    rotation: rotation,
    sprite: sprite,
  };

  createWorldObject(planet);
  world.planets.push(planet);
};
