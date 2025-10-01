import { Sprite } from "pixi.js";
import { origo, Vec2 } from "./createPlanet";
import { createSprite } from "./createSprite";
import { createWorldObject } from "./createWorldObject";
import { screenSize } from "./world";
import { divVar } from "./math";

export type Player = {
  type: "player";
  x: number;
  y: number;
  vel: Vec2;
  thrust: number;
  radius: number;
  rotation: number;
  sprite: Sprite;
};

export const createPlayer = async (pos: Vec2) => {
  //   const sprite = ;

  const rotation = 0;
  const sprite = await createSprite(
    "/public/rocket.png",
    pos,
    32,
    64,
    rotation
  );

  const player: Player = {
    type: "player",
    x: pos.x,
    y: pos.y,
    vel: origo(),
    thrust: 0.1,
    radius: 50,
    rotation: rotation,
    sprite: sprite,
  };

  createWorldObject(player);

  return player;
};

export const player = await createPlayer(divVar(screenSize, 2));

// console.log(divVar(screenSize, 2));
