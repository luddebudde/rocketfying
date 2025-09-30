import { Assets, Container, Sprite } from "pixi.js";
import { createPlanet } from "./createPlanet";
import { app, world } from "./world";
import { createPlayer, player } from "./createPlayer";
import { keys, setupKeyboardListeners } from "./keyListner";
import { add } from "./math";

(async () => {
  await app.init({
    resizeTo: window,
    preference: "webgl",
    background: "#000000",
    antialias: true,
  });

  document.body.appendChild(app.canvas);

  const backgroundTexture = await Assets.load("/public/background.png");
  const bgContainer = new Container();
  app.stage.addChildAt(bgContainer, 0);

  const spriteWidth = backgroundTexture.width;
  const spriteHeight = backgroundTexture.height;

  for (let y = 0; y < app.screen.height * 1.2; y += spriteHeight + 1) {
    for (let x = 0; x < app.screen.width * 1.2; x += spriteWidth) {
      const sprite = new Sprite(backgroundTexture);
      sprite.y = y;
      sprite.x = x;
      bgContainer.addChild(sprite);
    }
  }

  for (let i = 0; i < 5; i++) {
    createPlanet({
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
    });
  }

  setupKeyboardListeners();

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

    world.planets.forEach((planet) => {
      // planet.sprite.pivot.x = planet.width / 2;
      // planet.sprite.pivot.y = planet.height / 2;
      planet.sprite.rotation -= 0.05 * time.deltaTime;

      bgContainer.children.forEach((child) => {
        // const sprite = child as Sprite;
        // sprite.x += 0.5;
        // sprite.y += 0.5;
        // if (sprite.y >= app.screen.height) {
        //   sprite.y = -sprite.height;
        // }
        // if (sprite.x >= app.screen.width) {
        //   sprite.x = -sprite.width;
        // }
      });
    });

    world.worldObjects.forEach((worldObject) => {
      // worldObject.sprite.pivot.x = worldObject.radius / 2;
      // worldObject.sprite.pivot.y = worldObject.radius / 2;
      // worldObject.sprite.width = worldObject.radius;
      // worldObject.sprite.height = worldObject.radius;
      // worldObject.sprite.pivot.set(
      //   worldObject.sprite.width / 2,
      //   worldObject.sprite.height / 2
      // );

      worldObject.sprite.anchor.set(0.5);

      worldObject.x = worldObject.x + worldObject.vel.x;
      worldObject.y = worldObject.y + worldObject.vel.y;

      worldObject.sprite.x = worldObject.x;
      worldObject.sprite.y = worldObject.y;

      // worldObject.sprite.rotation = worldObject.rotation;
    });
  });
})();
