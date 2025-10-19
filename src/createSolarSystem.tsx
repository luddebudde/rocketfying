import { createPlanet, origo, Vec2 } from "./createPlanet";
import { add } from "./math/vec";

type ProtoPlanet = {
  size: number;
  mass: number;
  x: number;
  y: number;
  vel: Vec2;
};

export const createSolarSystem = (centerPos: Vec2) => {
  const sunScale = 20;
  const planetCount = Math.ceil(Math.random() * 0 + 1);
  const sun: ProtoPlanet = {
    size: 500,
    mass: 628 * 100,
    x: centerPos.x,
    y: centerPos.y,
    vel: origo(),
  };
  //   const planetCount = 1;
  //   const sunSize = 628;

  let distanceMeter = sun.size * 1;

  //   F=m\omega^2r

  createPlanet(centerPos, sun.size * 2, "sun");
  for (let i = 0; i < planetCount; i++) {
    const distanceOut = sun.size * 1.4;
    //  distanceMeter;
    // distanceMeter += distanceOut;
    const angle = Math.random() * 2 * Math.PI;
    const planetSize = 100 * (sunScale / 20);
    const pos = {
      x: Math.cos(angle) * distanceOut,
      y: Math.sin(angle) * distanceOut,
    };

    const planet: ProtoPlanet = {
      size: planetSize,
      mass: planetSize,
      x: pos.x,
      y: pos.y,
      vel: origo(),
    };

    // const gForce = calculateGravity(GForce, planet, sun);
    // F = mw^2r
    // gForce = (mv^2) / r
    // Math.sqrt(Fr / m) = v

    //  = (mv^2) / r

    // const centriFugalForce = divVar(
    //   multVar(mult(gForce, gForce), planet.mass),
    //   distanceOut
    // );
    // const centripetalForce = sqrtVec(
    //   divVar(multVar(centriFugalForce, distanceOut), planet.mass)
    // );

    createPlanet(add(centerPos, pos), planet.size, "earth", planet.vel);
  }
};
