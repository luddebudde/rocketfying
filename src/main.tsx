import { Assets, Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { createPlanet, Vec2 } from "./createPlanet";
import { app, GForce, world } from "./world";
import { createPlayer, player } from "./createPlayer";
import { keys, setupKeyboardListeners } from "./keyListner";
import { add, divVar, multVar, revDivVar } from "./math/vec";
import { changeWorldObject, changeWorldObjectVec } from "./changeWorldObject";
import { worldContainer } from "./createSprite";
import { createSolarSystem } from "./createSolarSystem";
import { getDirection, getDistance } from "./math/getDistance";
import { calculateGravity } from "./math/calculateGravity";
// await app.init({
//   resizeTo: window,
//   preference: "webgl",
//   background: "#000000",
//   antialias: true,
//   // forceCanvas: true, // detta fungerar här
// });

// await app.init({
//   resizeTo: window,
//   preference: "webgl",
//   background: "#000000",
//   antialias: true,
//   // forceCanvas: true, // detta fungerar här
// });

// await app.init({ resizeTo: window, preference: "webgl" });

(async () => {
  // await app.init({
  //   resizeTo: window,
  //   preference: "webgl",
  //   background: "#000000",
  //   antialias: true,
  // // });
  // document.body.appendChild(app.canvas);

  // const worldContainer = new Container();
  // app.stage.addChild(worldContainer);

  const bgTexture: Texture = await Assets.load("/background.png");
  const bgSprite: TilingSprite = new TilingSprite({
    texture: bgTexture,
    width: app.screen.width,
    height: app.screen.height,
  });
  console.log("lol");

  console.log("bgTexture:", bgTexture);
  console.log("bgTexture size:", bgTexture.width, bgTexture.height);
  console.log("app.screen:", app.screen.width, app.screen.height);
  bgSprite.tileScale.set(1.2, 1.2);

  app.stage.addChild(bgSprite);

  // for (let i = 0; i < 5; i++) {
  //   createPlanet(
  //     {
  //       x: Math.random() * app.screen.width,
  //       y: Math.random() * app.screen.height,
  //     },
  //     200,
  //     "earth"
  //   );
  // }

  createSolarSystem({ x: 1000, y: 1000 });

  setupKeyboardListeners();

  player.sprite.x = app.screen.width / 2;
  player.sprite.y = app.screen.height / 2;
  worldContainer.addChild(player.sprite);

  console.log(worldContainer, "worldcointaner");

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
      player.vel.x *= 0.99;
      player.vel.y *= 0.99;
    }

    // console.log("loop");

    worldContainer.x -= player.vel.x;
    worldContainer.y -= player.vel.y;

    bgSprite.tilePosition.x -= player.vel.x / 10;
    bgSprite.tilePosition.y -= player.vel.y / 10;

    world.planets.forEach((planet) => {
      world.planets.forEach((secondPlanet) => {
        if (planet === secondPlanet) {
          return;
        }

        const force = calculateGravity(GForce, planet, secondPlanet);

        changeWorldObjectVec(planet, "vel", divVar(force, time.deltaTime));
      });
      // console.log(planet);

      planet.sprite.rotation -= (0.05 * time.deltaTime) / (planet.mass * 0.05);
    });

    world.worldObjects.forEach((worldObject) => {
      changeWorldObject(worldObject, "x", worldObject.vel.x);
      changeWorldObject(worldObject, "y", worldObject.vel.y);
    });
  });
})();
