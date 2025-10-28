import { Sprite } from "pixi.js";
import { origo, Vec2 } from "./objects/createPlanet";
import { createSprite } from "../createSprite";
import { screenSize } from "../world";
import { divVar } from "../math/vec";
import { SolarSystem } from "./createSolarSystem";
import { createWorldObject } from "./createWorldObject";

export type Player = {
  type: "player";
  x: number;
  y: number;
  vel: Vec2;
  thrust: number;
  radius: number;
  rotation: number;
  mass: number;
  solarSystem: SolarSystem | undefined;

  sprite: Sprite;
};

export const createPlayer = async (pos: Vec2) => {
  //   const sprite = ;

  // const playerPos = divVar(getScreenSize(), 2);
  const rotation = 0;
  const sprite = await createSprite("/rocket.png", pos, 32, 64, rotation);

  const player: Player = {
    type: "player",
    x: pos.x,
    y: pos.y,
    vel: origo(),
    thrust: 0.1,
    radius: 50,
    rotation: rotation,
    mass: 1,
    solarSystem: undefined,

    sprite: sprite,
  };

  createWorldObject(player);

  return player;
};

export const player = await createPlayer(divVar(screenSize, 2));

// console.log(divVar(screenSize, 2));
