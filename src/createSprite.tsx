import { Assets, Container, Sprite, Texture } from "pixi.js";
import { Vec2 } from "./createPlanet";
import { app } from "./world";

export const createSprite = async (
  img: string,
  pos: Vec2,
  width: number,
  height: number,
  rotation: number = 0
): Promise<Sprite> => {
  const container = new Container();
  app.stage.addChild(container);

  const texture: Texture = await Assets.load(img);
  const sprite: Sprite = new Sprite(texture);

  sprite.x = pos.x;
  sprite.y = pos.y;
  sprite.width = width;
  sprite.height = height;
  sprite.pivot.x = sprite.width / 2;
  sprite.pivot.y = sprite.height / 2;
  sprite.rotation = rotation;

  container.addChild(sprite);
  return sprite;
};
