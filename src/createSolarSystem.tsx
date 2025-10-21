import { createPlanet, origo, Planet, Vec2 } from "./createPlanet";
import { add, lengthVec, multVar, rotateVec90 } from "./math/vec";
import { calculateGravity } from "./math/calculateGravity";
import { GForce, world } from "./world";
import { getDirection, getDistance } from "./math/getDistance";
import { calculateOrbitSpeed } from "./math/calculateOrbitSpeed";

export type ProtoPlanet = {
  size: number;
  mass: number;
  x: number;
  y: number;
  vel: Vec2;
};

export type SolarSystem = {
  name: string;
  sun: Planet | ProtoPlanet;
  planets: Planet[];
  x: number;
  y: number;
  radius: number;
};

export const createSolarSystem = (centerPos: Vec2) => {
  const solarSystem: SolarSystem = {
    name: "",
    sun: {},
    planets: [],
    x: centerPos.x,
    y: centerPos.y,
    radius: 0,
  };

  const planetCount = Math.ceil(Math.random() * 8 + 3);
  const sunSize = 10000;
  const sun: ProtoPlanet = {
    size: sunSize,
    mass: sunSize * sunSize,
    x: centerPos.x,
    y: centerPos.y,
    vel: origo(),
  };

  let distanceFromSurface = 100;
  const averageDistStep = sunSize * 1.2;

  createPlanet(centerPos, sun.mass, sun.size, "sun", solarSystem);
  for (let i = 0; i < planetCount; i++) {
    const planetSize = 0.1 * sun.size;
    // TODO random distance from sun's surface

    const minDist = sun.size / 2 + planetSize / 2;
    const additionalDist =
      averageDistStep * i - (Math.random() + 0.5) * planetSize * 3;
    const distanceOut = Math.max(
      minDist + additionalDist,
      minDist + planetSize * 1.2
    );
    solarSystem.radius = distanceOut * 1.5;
    // distanceFromSurface = randomDist;
    // const angle = -Math.PI / 2;
    //   TODO add back random angle
    const angle = Math.random() * 2 * Math.PI;
    const relPos: Vec2 = {
      x: Math.cos(angle) * distanceOut,
      y: Math.sin(angle) * distanceOut,
    };
    const pos = add(relPos, centerPos);

    const planet: ProtoPlanet = {
      size: planetSize,
      mass: planetSize * planetSize,
      x: pos.x,
      y: pos.y,
      vel: origo(),
    };

    planet.vel = calculateOrbitSpeed(GForce, planet, sun);

    createPlanet(
      pos,
      planet.mass,
      planet.size,
      "earth",
      solarSystem,
      planet.vel
    );
  }

  console.log(solarSystem);

  world.solarSystems.push(solarSystem);
};
