import { Assets, Container, Sprite, Texture } from "pixi.js";
import { GForce, world } from "../../world";
import { app } from "../../app";

import { createSprite } from "../../createSprite";
import { findElement } from "../../findElement";
import { ProtoPlanet, SolarSystem } from "../createSolarSystem";
import { createWorldObject } from "../createWorldObject";
import { origo, Vec2 } from "./createPlanet";
import { Galaxy } from "../generateGalaxy";
import { calculateOrbitSpeed } from "../../math/calculateOrbitSpeed";
import { player } from "../createPlayer";
import { add } from "../../math/vec";

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
  homeSystem: SolarSystem;
  galaxy: Galaxy;

  sprite: Sprite;
};

export const createSun = async (
  protoSun: ProtoPlanet,
  // pos: Vec2,
  // size: number,
  spriteName: string,
  galaxy: Galaxy,
  solarSystem: SolarSystem
  // vel: Vec2 = origo()
) => {
  const sprites = [["sun", "/sun.png"]];

  const rotation = Math.random() * Math.PI * 2;
  const sprite: Sprite = await createSprite(
    findElement(sprites, spriteName)[1],
    { x: protoSun.x, y: protoSun.y },
    protoSun.radius * 2,
    protoSun.radius * 2,
    rotation
  );

  const vel = calculateOrbitSpeed(GForce, protoSun, galaxy.blackhole);

  const sun: Sun = {
    ...protoSun,
    type: "sun",
    name: "the SUN",
    rotation: rotation,
    vel: vel,
    galaxy: galaxy,
    homeSystem: solarSystem,

    sprite: sprite,
  };

  player.vel = calculateOrbitSpeed(GForce, player, sun);
  player.vel = add(player.vel, sun.vel);
  solarSystem.sun = sun;

  // galaxy.solarSystems.push(sun);

  // sun.homeSystem.sun = sun;

  createWorldObject(sun);
  world.planets.push(sun);

  return sun;

  // return sun;
};
