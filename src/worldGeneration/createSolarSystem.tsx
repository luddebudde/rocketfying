import { createPlanet, origo, Planet, Vec2 } from "./objects/createPlanet";
import { add, lengthVec, multVar, rotateVec90 } from "../math/vec";
import { calculateGravity } from "../math/calculateGravity";
import { GForce, world, worldScale } from "../world";
import { getDirection, getDistance } from "../math/getDistance";
import { calculateOrbitSpeed } from "../math/calculateOrbitSpeed";
import { createSun } from "./objects/createSun";

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
  const sunSize = 10000 * worldScale;
  const sun: ProtoPlanet = {
    size: sunSize,
    mass: sunSize,
    x: centerPos.x,
    y: centerPos.y,
    vel: origo(),
  };

  // sun.vel = calculateOrbitSpeed(GForce, sun, blackhole);

  let distanceFromSurface = 100;
  const averageDistStep = 4500;

  createPlanet(centerPos, sun.size, "sun", solarSystem, origo());
  for (let i = 0; i < planetCount; i++) {
    const planetSize = 0.1 * sun.size;
    // TODO random distance from sun's surface
    const minDist = (sun.size / 2 + planetSize / 2) * 1.2;
    const additionalDist =
      averageDistStep * i - (Math.random() + 0.5) * planetSize * 3;
    const distanceOut = Math.max(
      minDist + additionalDist,
      minDist + planetSize * 1.2
    );
    solarSystem.radius = distanceOut * 1.5;

    //   TODO add back random angle
    const angle = Math.random() * 2 * Math.PI;
    const relPos: Vec2 = {
      x: Math.cos(angle) * distanceOut * worldScale,
      y: Math.sin(angle) * distanceOut * worldScale,
    };
    const pos = add(relPos, centerPos);

    const planet: ProtoPlanet = {
      size: planetSize,
      mass: planetSize,
      x: pos.x,
      y: pos.y,
      vel: origo(),
    };

    planet.vel = calculateOrbitSpeed(GForce, planet, sun);

    createPlanet(pos, planet.size, "earth", solarSystem, planet.vel);
  }

  // console.log(solarSystem);

  world.solarSystems.push(solarSystem);
};
