import { createPlanet, origo, Vec2 } from "./createPlanet";
import {add, lengthVec, multVar, rotateVec90} from "./math/vec";
import {calculateGravity} from "./math/calculateGravity";
import {GForce} from "./world";
import {getDirection, getDistance} from "./math/getDistance";

type ProtoPlanet = {
  size: number;
  mass: number;
  x: number;
  y: number;
  vel: Vec2;
};

export const createSolarSystem = (centerPos: Vec2) => {
  const planetCount = Math.ceil(Math.random() * 0 + 1);
  const sunSize = 1000
  const sun: ProtoPlanet = {
    size: 1000,
    mass: sunSize * sunSize,
    x: centerPos.x,
    y: centerPos.y,
    vel: origo(),
  };

  createPlanet(centerPos, sun.mass, sun.size, "sun");
  for (let i = 0; i < planetCount; i++) {
      const planetSize = 0.1 * sun.size;
      // TODO random distance from sun's surface
      const distanceFromSurface = 0
    const distanceOut = sun.size / 2 + planetSize / 2 + distanceFromSurface;
      const angle = -Math.PI / 2
      //   TODO add back random angle
    // const angle = Math.random() * 2 * Math.PI;
      const relPos: Vec2 = {
          x: Math.cos(angle) * distanceOut,
          y: Math.sin(angle) * distanceOut,
      }
    const pos = add(relPos, centerPos);

    const planet: ProtoPlanet = {
      size: planetSize,
      mass: planetSize * planetSize,
      x: pos.x,
      y: pos.y,
      vel: origo(),
    };

      const gravityForce = calculateGravity(GForce, planet, sun);
      // When the orbit is circular, the centripetal force is equal to the gravitational force.
      // gForce is a vector, but only the magnitude is needed here
      const centripetalForce = lengthVec(gravityForce);
      console.log('centripetalForce', centripetalForce);

      // From the formula for centripetal force, we can derive the orbital speed:
      // F = mv^2 / r
      const speed = Math.sqrt(centripetalForce * distanceOut / planet.mass)
      const velDir = rotateVec90(getDirection(planet, sun))
      const vel = multVar(velDir, speed)
      planet.vel = vel;

    createPlanet(pos, planet.mass, planet.size, "earth", planet.vel);
  }
};
