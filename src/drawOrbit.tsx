// // import { Graphics } from "pixi.js";
// // import { Blackhole } from "./worldGeneration/objects/createBlackhole";
// // import { Planet } from "./worldGeneration/objects/createPlanet";
// // import { Sun } from "./worldGeneration/objects/createSun";
// // import { worldContainer } from "./createSprite";
// // import { player } from "./worldGeneration/createPlayer";
// // import { app } from "./app";

import { Graphics } from "pixi.js";
import { calculateGravity } from "./math/calculateGravity";
import { World } from "./world";
import { Player } from "./worldGeneration/createPlayer";
import { origo, Planet, Vec2 } from "./worldGeneration/objects/createPlanet";
import { app } from "./app";
import * as PIXI from "pixi.js";
import { add, divVar, multVar, sub } from "./math/vec";
import { worldContainer } from "./createSprite";

// import { Graphics } from "pixi.js";
// import { app } from "./app";

// // export const drawOrbit = (planet: Planet) => {
// //   const g = new Graphics();

// //   g.stroke({
// //     width: 1220,
// //     color: 0xff0000,
// //   });

// //   const a = 30000;
// //   const b = 180;
// //   const rot = Math.PI / 6;

// //   const cx = planet.homeSystem.sun.x;
// //   const cy = planet.homeSystem.sun.y;

// //   const segments = 120;

// //   let t = 0;

// //   g.moveTo(
// //     cx + a * Math.cos(t) * Math.cos(rot) - b * Math.sin(t) * Math.sin(rot),
// //     cy + a * Math.cos(t) * Math.sin(rot) + b * Math.sin(t) * Math.cos(rot)
// //   );

// //   for (let i = 1; i <= segments; i++) {
// //     t = (i / segments) * Math.PI * 2;

// //     const x =
// //       cx + a * Math.cos(t) * Math.cos(rot) - b * Math.sin(t) * Math.sin(rot);
// //     const y =
// //       cy + a * Math.cos(t) * Math.sin(rot) + b * Math.sin(t) * Math.cos(rot);

// //     g.lineTo(x, y);
// //     // console.log(x, y);
// //   }

// //   g.closePath(); // krävs ofta i v8

// //   worldContainer.addChild(g);
// // };

// const trailGraphics = new Graphics();
// app.stage.addChild(trailGraphics);

// export function drawTrail(trail: OrbitalTrail) {
//   trailGraphics.clear();
//   trailGraphics.lineStyle(2, 0xffffff, 0.7); // vitt spår

//   if (trail.positions.length === 0) return;

//   trailGraphics.moveTo(trail.positions[0].x, trail.positions[0].y);
//   for (let i = 1; i < trail.positions.length; i++) {
//     trailGraphics.lineTo(trail.positions[i].x, trail.positions[i].y);
//   }
// }

interface OrbitalTrail {
  positions: Vec2[];
  maxLength: number;
}

const playerTrail: OrbitalTrail = { positions: [], maxLength: 200 };

function cloneObject(p: Planet | Player): Planet | Player {
  return {
    ...p,
    x: p.x,
    y: p.y,
    vel: { x: p.vel.x, y: p.vel.y },
  };
}

// let graphics = new Graphics()
// .moveTo(0, 0)
// .lineTo(100, 100)
// .stroke({ color: 0xff0000, pixelLine: true });

// Add it to the stage
// app.stage.addChild(graphics);

// Even if we scale the Graphics object, the line remains 1 pixel wide
// graphics.scale.set(2);
// const trailGraphics = new Graphics();
// trailGraphics.lineStyle(2, 0x00ff00, 0.8);
export const lineContainer = new PIXI.Container();
app.stage.addChild(lineContainer);
const futureTrailGraphics = new Graphics()
  .moveTo(0, 0)
  .lineTo(100, 100)
  .stroke({ color: 0xff0000, pixelLine: true });
// futureTrailGraphics.lineStyle(2, 0x00ff00, 0.8);
// worldContainer.addChild(trailGraphics);
// app.stage.addChild(futureTrailGraphics);
lineContainer.addChild(futureTrailGraphics);

export const drawOrbit = (
  GForce: number,
  time,
  world: World,
  player: Player
) => {
  const planets = world.planets.map(cloneObject);

  const futurePlayer = cloneObject(player);

  const futurePositions: Vec2[] = [];

  const timeStep = 5; // sekunder per steg
  const steps = 3000; // hur många punkter du vill rita

  playerTrail.positions.push({ x: player.x, y: player.y });

  // Begränsa antalet punkter för prestanda
  // if (playerTrail.positions.length > playerTrail.maxLength) {
  //   playerTrail.positions.shift();
  // }

  // if (planet.type === "player") {
  //   // console.log(player);

  //   return;
  // }

  // let previousPos: Vec2 = { x: player.x, y: player.y };
  // let previousVel: Vec2 = player.vel;
  for (let i = 0; i < steps; i++) {
    let totalGrav: Vec2 = origo();
    planets.forEach((planet) => {
      const gravityForce = calculateGravity(GForce, futurePlayer, planet);

      const acceleration = divVar(gravityForce, futurePlayer.mass);
      const deltaV = acceleration;
      futurePlayer.vel.x += deltaV.x;
      futurePlayer.vel.y += deltaV.y;
    });

    futurePlayer.x += futurePlayer.vel.x * timeStep;
    futurePlayer.y += futurePlayer.vel.y * timeStep;

    // previousPos.x = futurePlayer.x;
    // previousPos.y = futurePlayer.y;

    // previousVel = nextVel;
    // futurePlayer.vel = previousVel;
    // futurePlayer.vel.y += playerAcc.y * timeStep;
    // futurePlayer.x = previousPos.x + previousVel.x;
    // futurePlayer.y = previousPos.y + previousVel.y;

    // previousVel = player.vel;

    // previousPos = add(previousPos, futurePlayer.vel);

    // // Uppdatera positioner
    // futurePlanets.forEach((p) => {
    //   p.x += p.vel.x * timeStep;
    //   p.y += p.vel.y * timeStep;
    // });

    // Samla spelarens position
    // Antag att spelaren påverkas av alla planeter, inklusive solen
    // let playerAcc = origo();
    // futurePlanets.forEach((p) => {
    //   const force = calculateGravity(GForce, futurePlayer, p);
    //   playerAcc.x += force.x / futurePlayer.mass;
    //   playerAcc.y += force.y / futurePlayer.mass;
    // });
    // futurePlayer.vel.x += playerAcc.x * timeStep;
    // futurePlayer.vel.y += playerAcc.y * timeStep;
    // futurePlayer.x += futurePlayer.vel.x * timeStep;
    // futurePlayer.y += futurePlayer.vel.y * timeStep;

    // futurePlayer.x = 250 + 50 * i * worldContainer.scale.x;
    // futurePlayer.y = 250 + 50 * i * worldContainer.scale.y;
    // futurePlayer.x = 250;
    // futurePlayer.y = 250;

    // console.log(futurePlayer.x, futurePlayer.y);

    const screenCenter = {
      x: app.renderer.width / 2,
      y: app.renderer.height / 2,
    };
    futurePositions.unshift({
      x: screenCenter.x + (futurePlayer.x - player.x) * worldContainer.scale.x,
      y: screenCenter.y + (futurePlayer.y - player.y) * worldContainer.scale.y,
    });
  }

  // console.log(worldContainer.children);

  // console.log(worldContainer.scale);

  // console.log("drawing");
  futureTrailGraphics.clear();
  // futureTrailGraphics.setStrokeStyle({
  //   width: 200,
  //   color: 0xff0000,
  //   alpha: 1.0,
  // });

  // console.log(sub(futurePositions[0], player));

  // console.log(futurePositions[0]);

  // console.log(worldContainer.children);

  futurePositions.length;
  futureTrailGraphics.moveTo(futurePositions[0].x, futurePositions[0].y);
  for (let i = 1; i < futurePositions.length; i++) {
    // futurePositions[i];
    futureTrailGraphics.lineTo(futurePositions[i].x, futurePositions[i].y);
  }
  futureTrailGraphics.stroke({ width: 20, color: 0xff0000, alpha: 1 });
};

// const trailGraphics = new Graphics();

// function drawTrail(trail: OrbitalTrail) {
//   trailGraphics.clear();
//   trailGraphics.lineStyle(2, 0xffffff, 0.7); // vitt spår

//   if (trail.positions.length === 0) return;

//   trailGraphics.moveTo(trail.positions[0].x, trail.positions[0].y);
//   for (let i = 1; i < trail.positions.length; i++) {
//     trailGraphics.lineTo(trail.positions[i].x, trail.positions[i].y);
//   }
// }
