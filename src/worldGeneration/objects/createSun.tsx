import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "../../world";
import { app } from "../../app";

import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { SolarSystem } from "../createSolarSystem";
import { createWorldObject } from "../createWorldObject";
import { origo, Vec2 } from "./createPlanet";
import { Galaxy } from "../generateGalaxy";

export type Sun = {
  type: "sun";
  name: string;
  x: number;
  y: number;
  vel: Vec2;
  // width: number;
  // height: number;
  mass: number;
  radius: number;
  rotation: number;
  galaxy: Galaxy;

  sprite: Sprite;
};

export const createSun = async (
  pos: Vec2,
  size: number,
  spriteName: string,
  galaxy: Galaxy,
  vel: Vec2 = origo()
) => {
  const sprites = [["sun", "/sun.png"]];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    findElement(sprites, spriteName)[1],
    pos,
    size,
    size,
    rotation
  );

  const sun: Sun = {
    type: "sun",
    x: pos.x,
    y: pos.y,
    vel: vel,
    // width: size,
    // height: size,
    mass: size * size,
    radius: size / 2,
    rotation: rotation,
    galaxy: galaxy,

    sprite: sprite,
  };

  // galaxy.solarSystems.push(sun);

  createWorldObject(sun);
  world.planets.push(sun);
};
