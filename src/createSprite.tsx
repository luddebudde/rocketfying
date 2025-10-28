import { Assets, Container, Sprite, Texture } from "pixi.js";
import { Vec2 } from "./worldGeneration/objects/createPlanet";
import { app } from "./app";
import { multVar } from "./math/vec";

export const worldContainer = new Container();
// app.stage.addChild(worldContainer);
export const createSprite = async (
  img: string,
  pos: Vec2,
  width: number,
  height: number,
  rotation: number = 0
): Promise<Sprite> => {
  const texture: Texture = await Assets.load(img);
  const sprite: Sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  sprite.x = pos.x;
  sprite.y = pos.y;
  sprite.width = width;
  sprite.height = height;
  sprite.rotation = rotation;

  // console.log(img);

  // console.log(sprite, "sprite", app, "app");

  worldContainer.addChild(sprite);

  // console.log(sprite.scale);

  // sprite.scale = multVar(sprite.scale, cameraScale);

  // sprite.scale *= cameraScale;

  // app.stage.addChild(sprite);
  if (!app.stage.getChildByLabel(worldContainer)) {
    app.stage.addChild(worldContainer);
  }
  return sprite;
};
