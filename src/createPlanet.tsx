import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "./world";
import { app } from "./app";
import { createWorldObject } from "./createWorldObject";
import { createSprite } from "./createSprite";
import { findElement } from "./findElement";
import { SolarSystem } from "./createSolarSystem";

export type Planet = {
  type: string;
  x: number;
  y: number;
  vel: Vec2;
  width: number;
  height: number;
  gravitation: number;
  mass: number;
  radius: number;
  rotation: number;
  solarSystem: SolarSystem;

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
  mass: number,
  size: number,
  spriteName: string,
  solarSystem: SolarSystem,
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

  // if (spriteName === "sun") [(mass = 5000)];

  let planetType = "planet";
  if (spriteName === "sun") {
    planetType = "sun";
  }

  const planet: Planet = {
    type: planetType,
    x: pos.x,
    y: pos.y,
    vel: vel,
    width: size,
    height: size,
    gravitation: size,
    mass: mass,
    radius: size / 2,
    rotation: rotation,
    solarSystem: solarSystem,

    sprite: sprite,
  };

  if (spriteName === "sun") {
    solarSystem.sun = planet;
  } else {
    solarSystem.planets.push(planet);
  }

  createWorldObject(planet);
  world.planets.push(planet);
};
