import { Assets, Container, Sprite, Texture, TilingSprite } from "pixi.js";
import {
  createPlanet,
  origo,
  Vec2,
} from "./worldGeneration/objects/createPlanet";
import { screenSize, simulationSpeed, world } from "./world";
import { app } from "./app";
import { GForce } from "./world";
import { createPlayer, player } from "./worldGeneration/createPlayer";
import { keys, setupKeyboardListeners } from "./keyListner";
import { add, addVar, divVar, multVar, sub, subVar } from "./math/vec";
import { changeWorldObject } from "./changeWorldObject";
import { worldContainer } from "./createSprite";
import { createSolarSystem } from "./worldGeneration/createSolarSystem";
import { calculateGravity } from "./math/calculateGravity";
import { calculateOrbitSpeed } from "./math/calculateOrbitSpeed";
import { findClosestPlanet } from "./findClosestPlanet";
import { getDistance } from "./math/getDistance";
import { generateGalaxy } from "./worldGeneration/generateGalaxy";

(async () => {
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

  // generateGalaxy();
  createSolarSystem({ x: 10000, y: 0 });

  setupKeyboardListeners();

  player.sprite.x = app.screen.width / 2;
  player.sprite.y = app.screen.height / 2;
  worldContainer.addChild(player.sprite);

  console.log(worldContainer, "worldcointaner");

  app.ticker.add((time) => {
    worldContainer.x = -player.x * worldContainer.scale.x + screenSize.x / 2;
    worldContainer.y = -player.y * worldContainer.scale.y + screenSize.y / 2;

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
    if (keys["KeyV"]) {
      // console.log(findClosestPlanet(player));

      const closestPlanet = findClosestPlanet(player);
      player.vel = add(
        calculateOrbitSpeed(GForce, player, closestPlanet),
        closestPlanet.vel
      );
    }
    if (keys["Space"]) {
      player.vel.x *= 0.9;
      player.vel.y *= 0.9;
    }

    // MUST FIX SO IT CAN HANDLE MULTIPLE SOLARSYSTEMS AT ONCE
    world.solarSystems.forEach((solarSystem) => {
      if (getDistance(player, solarSystem) < solarSystem.radius) {
        player.solarSystem = solarSystem;
      }
    });

    worldContainer.x -= player.vel.x * simulationSpeed;
    worldContainer.y -= player.vel.y * simulationSpeed;

    bgSprite.tilePosition.x -= (player.vel.x / 10) * simulationSpeed;
    bgSprite.tilePosition.y -= (player.vel.y / 10) * simulationSpeed;

    // From word.planets => world.worldObjects
    // "planets" are not suns/blackholes/entities
    // console.log(world.worldObjects);

    world.planets.forEach((planet) => {
      const gravityForce = calculateGravity(GForce, player, planet);

      const acceleration = divVar(gravityForce, player.mass);
      const deltaV = multVar(acceleration, time.deltaTime * simulationSpeed);
      player.vel.x += deltaV.x;
      player.vel.y += deltaV.y;

      world.planets.forEach((secondPlanet) => {
        if (planet === secondPlanet) {
          return;
        }

        const gravityForce = calculateGravity(GForce, planet, secondPlanet);

        // console.log(gravityForce);

        // console.log(planet, secondPlanet);

        const acceleration = divVar(gravityForce, planet.mass);
        const deltaV = multVar(acceleration, time.deltaTime * simulationSpeed);

        // console.log(deltaV);
        //
        // planet.vel = add(planet.vel, deltaV);
        planet.vel.x += deltaV.x;
        planet.vel.y += deltaV.y;
      });

      planet.sprite.rotation -= 0.0005;
      // planet.sprite.rotation -= (5 * time.deltaTime) / (planet.mass / 500);
    });

    world.worldObjects.forEach((worldObject) => {
      changeWorldObject(
        worldObject,
        "x",
        worldObject.vel.x * time.deltaTime * simulationSpeed
      );
      changeWorldObject(
        worldObject,
        "y",
        worldObject.vel.y * time.deltaTime * simulationSpeed
      );
    });
  });
})();

window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // worldContainer.
    // cameraZoom;
    worldContainer.scale = multVar(worldContainer.scale, 0.98);
    // console.log("Scrollar NER:", event.deltaY);
  } else {
    worldContainer.scale = multVar(worldContainer.scale, 1.02);
  }
});
