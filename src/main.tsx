import { Assets, Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { createPlanet } from "./createPlanet";
import { app, screenSize, world } from "./world";
import { createPlayer, player } from "./createPlayer";
import { keys, setupKeyboardListeners } from "./keyListner";
import { add } from "./math";
import { changeWorldObject } from "./changeWorldObject";
import { worldContainer } from "./createSprite";

(async () => {
  await app.init({
    resizeTo: window,
    preference: "webgl",
    background: "#000000",
    antialias: true,
    // forceCanvas: true, // detta fungerar här
  });

  document.body.appendChild(app.canvas);

  const bgTexture: Texture = await Assets.load("/public/background.png");
  const bgSprite: TilingSprite = new TilingSprite({
    texture: bgTexture,
    width: app.screen.width,
    height: app.screen.height,
  });
  console.log("lol");

  bgSprite.tileScale.set(1.2, 1.2);

  app.stage.addChild(bgSprite);

  for (let i = 0; i < 5; i++) {
    createPlanet({
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
    });
  }

  setupKeyboardListeners();

  player.sprite.x = app.screen.width / 2;
  player.sprite.y = app.screen.height / 2;
  worldContainer.addChild(player.sprite);

  app.ticker.add((time) => {
    if (keys["KeyW"]) {
      player.vel.x -=
        Math.cos(player.sprite.rotation + Math.PI / 2) * player.thrust;
      player.vel.y -=
        Math.sin(player.sprite.rotation + Math.PI / 2) * player.thrust;
    }
    if (keys["KeyS"]) {
      player.vel.y += player.thrust;
    }
    if (keys["KeyA"]) {
      player.sprite.rotation -= (Math.PI * 2) / 180;
    }
    if (keys["KeyD"]) {
      player.sprite.rotation += (Math.PI * 2) / 180;
    }
    if (keys["Space"]) {
      console.log("SPACE!");
    }

    worldContainer.x -= player.vel.x;
    worldContainer.y -= player.vel.y;

    bgSprite.tilePosition.x -= player.vel.x / 10;
    bgSprite.tilePosition.y -= player.vel.y / 10;

    world.planets.forEach((planet) => {
      planet.sprite.rotation -= 0.05 * time.deltaTime;
    });

    world.worldObjects.forEach((worldObject) => {
      changeWorldObject(worldObject, "x", worldObject.vel.x);
      changeWorldObject(worldObject, "y", worldObject.vel.y);
    });
  });
})();
