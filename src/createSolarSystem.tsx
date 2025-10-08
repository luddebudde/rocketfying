import { createPlanet, origo, Vec2 } from "./createPlanet";
import { calculateGravity } from "./math/calculateGravity";
import { getDistance } from "./math/getDistance";
import { add, divVar, multVar, sqrtVec } from "./math/vec";
import { GForce } from "./world";

export const createSolarSystem = (centerPos: Vec2) => {
  const planetCount = Math.ceil(Math.random() * 3 + 2);
  const sun = {
    size: 628,
    mass: 628,
    x: centerPos.x,
    y: centerPos.y,
  };
  //   const planetCount = 1;
  //   const sunSize = 628;

  let distanceMeter = sun.size * 1;

  //   F=m\omega^2r

  createPlanet(centerPos, sun.size * 2, "sun");
  for (let i = 0; i < planetCount; i++) {
    const distanceOut = sun.size * 1.2 + distanceMeter;
    // distanceMeter += distance;
    const angle = Math.random() * 2 * Math.PI;
    const planetSize = Math.random() * 128 + 32;
    const pos = {
      x: Math.cos(angle) * distanceOut,
      y: Math.sin(angle) * distanceOut,
    };

    const planet = {
      size: planetSize,
      mass: planetSize,
      x: pos.x,
      y: pos.y,
      veL: origo(),
    };

    // const distanceTo = getDistance(centerPos, pos);
    const gForce = calculateGravity(GForce, sun, planet);
    const vel = sqrtVec(divVar(multVar(gForce, distanceOut), planet.mass));

    console.log(
      "solarsystem",
      sqrtVec(divVar(multVar(gForce, distanceOut), planet.mass)),
      planet
    );

    planet.veL = vel;

    createPlanet(add(centerPos, pos), 100, "earth", vel);
  }
};
