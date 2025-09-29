import { Assets, Container, Sprite, Texture } from "pixi.js";
import { app, game } from "./gameObject";

export type Planet = {
  x: number;
  y: number;
};

type Vec2 = {
  x: number;
  y: number;
};

export const createPlanet = async (pos: Vec2) => {
  const container = new Container();
  app.stage.addChild(container);

  //   const sprite = Assets.load("/public/planet.png");
  //   const sprite = Assets.load("https://pixijs.com/assets/bunny.png");
  //   const texture: Texture = await Assets.load(
  //     "https://pixijs.com/assets/bunny.png"
  //   );

  const sprite = Assets.load("/public/planet.png")
    .then((texture) => {
      const sprite = new Sprite(texture);

      sprite.x = pos.x;
      sprite.y = pos.y;
      sprite.width = 256;
      sprite.height = 256;
      sprite.pivot.x = sprite.width / 2;
      sprite.pivot.y = sprite.height / 2;
      sprite.rotation = Math.random() * Math.PI * 2;

      console.log(sprite.height);

      container.addChild(sprite);
      game.planets.push(sprite);
    })
    .catch((err) => {
      console.error("Kunde inte ladda planet-textur:", err);
    });
};
