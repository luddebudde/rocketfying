import { Assets, Container, Sprite, Texture } from "pixi.js";
import { world } from "../../world";
import { app } from "../../app";
import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { SolarSystem } from "../createSolarSystem";
import { createWorldObject } from "../createWorldObject";
import { origo, Vec2 } from "./createPlanet";

export type Blackhole = {
  type: "blackhole";
  name: string;
  x: number;
  y: number;
  radius: number;
  mass: number;
  rotation: number;
  vel: Vec2;
  sprite: Sprite;
};

export const createBlackhole = async (blackholePrototype: Blackhole) => {
  // const sprites = [["blackhole", "/blackhole.png"]];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    "/blackhole.png",
    pos,
    size,
    size,
    rotation
  );

  const blackhole: Blackhole = blackholePrototype;

  createWorldObject(blackhole);
  world.planets.push(blackhole);
};
