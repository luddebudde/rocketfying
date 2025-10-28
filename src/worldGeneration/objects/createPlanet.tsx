import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "../../world";
import { app } from "../../app";

import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { SolarSystem } from "../createSolarSystem";
import { createWorldObject } from "../createWorldObject";

export type Planet = {
  type: "planet";
  name: string;
  x: number;
  y: number;
  vel: Vec2;
  // width: number;
  // height: number;
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
  size: number,
  spriteName: string,
  homeSystem: SolarSystem,
  vel: Vec2
) => {
  const sprites = [
    ["earth", "/planet.png"],
    ["sun", "/sun.png"],
    ["blackhole", "/blackhole.png"],
  ];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    findElement(sprites, spriteName)[1],
    pos,
    size,
    size,
    rotation
  );

  const planet: Planet = {
    type: "planet",
    x: pos.x,
    y: pos.y,
    vel: vel,
    // width: size,
    // height: size,
    mass: size * size,
    radius: size / 2,
    rotation: rotation,
    solarSystem: homeSystem,

    sprite: sprite,
  };

  homeSystem.planets.push(planet);

  createWorldObject(planet);
  world.planets.push(planet);
};
