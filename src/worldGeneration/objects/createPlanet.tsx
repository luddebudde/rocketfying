import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "../../world";
import { app } from "../../app";

import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { ProtoPlanet, SolarSystem } from "../createSolarSystem";
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
  homeSystem: SolarSystem;

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
  protoPlanet: ProtoPlanet,
  spriteName: string
) => {
  const sprites = [
    ["earth", "/planet.png"],
    ["sun", "/sun.png"],
    ["blackhole", "/blackhole.png"],
  ];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    findElement(sprites, spriteName)[1],
    { x: protoPlanet.y, y: protoPlanet.y },
    protoPlanet.radius * 2,
    protoPlanet.radius * 2,
    rotation
  );

  const planet: Planet = {
    ...protoPlanet,
    name: "hello",
    type: "planet",

    rotation: rotation,
    homeSystem: protoPlanet.homeSystem,

    sprite: sprite,
  };

  // console.log(planet);

  protoPlanet.homeSystem.planets.push(planet);

  createWorldObject(planet);
  world.planets.push(planet);

  console.log(protoPlanet.homeSystem);
};
