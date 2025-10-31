import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "../../world";
import { app } from "../../app";
import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { ProtoPlanet, SolarSystem } from "../createSolarSystem";
import { createWorldObject } from "../createWorldObject";
import { origo, Vec2 } from "./createPlanet";
import { Galaxy } from "../generateGalaxy";

export type Blackhole = {
  type: "blackhole";
  name: string;
  x: number;
  y: number;
  radius: number;
  mass: number;
  rotation: number;
  vel: Vec2;

  galaxy: Galaxy;
  sprite: Sprite;
};

export type ProtoBlackhole = {
  type: "blackhole";
  name: string;
  x: number;
  y: number;
  radius: number;
  mass: number;
  vel: Vec2;
  galaxy: Galaxy;
};

export const createBlackhole = async (blackholePrototype: ProtoBlackhole) => {
  // const sprites = [["blackhole", "/blackhole.png"]];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    "/blackhole.png",
    { x: blackholePrototype.x, y: blackholePrototype.y },
    blackholePrototype.radius,
    blackholePrototype.radius,
    rotation
  );

  const blackhole: Blackhole = {
    ...blackholePrototype,
    rotation: Math.random() * Math.PI * 2,
    sprite: sprite,
  };

  blackhole.galaxy.blackhole = blackhole;
  createWorldObject(blackhole);
  world.planets.push(blackhole);
};
