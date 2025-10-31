import { createPlanet, origo, Planet, Vec2 } from "./objects/createPlanet";
import { add, lengthVec, multVar, rotateVec90 } from "../math/vec";
import { calculateGravity } from "../math/calculateGravity";
import { GForce, world, worldScale } from "../world";
import { getDirection, getDistance } from "../math/getDistance";
import { calculateOrbitSpeed } from "../math/calculateOrbitSpeed";
import { createSun, Sun } from "./objects/createSun";
import { Galaxy } from "./generateGalaxy";

export type ProtoPlanet = {
  mass: number;
  x: number;
  y: number;
  radius: number;
  vel: Vec2;
  homeSystem: SolarSystem;
};

export type SolarSystem = {
  name: string;
  sun: Sun;
  planets: Planet[];
  x: number;
  y: number;
  radius: number;
};

export const createSolarSystem = (centerPos: Vec2, galaxy: Galaxy) => {
  const planetCount = Math.ceil(Math.random() * 8 + 3);
  // const planetCount = 1;

  const solarSystem: SolarSystem = {
    name: "",
    sun: {} as Sun,
    planets: [],
    x: centerPos.x,
    y: centerPos.y,
    radius: 0,
  };

  const sunSize = 5000 * worldScale;
  const sun: ProtoPlanet = {
    x: centerPos.x,
    y: centerPos.y,
    radius: sunSize,
    mass: sunSize * sunSize,
    vel: origo(),
    homeSystem: solarSystem,
    // galaxy: galaxy,
  };

  // sun.vel = calculateOrbitSpeed(GForce, sun, galaxy.blackhole);

  // sun.vel = calculateOrbitSpeed(GForce, sun, blackhole);

  let distanceFromSurface = 100;
  const averageDistStep = 14500;

  // createPlanet(sun, "sun");
  createSun(sun, "sun", galaxy);
  for (let i = 0; i < planetCount; i++) {
    const planetSize = 0.05 * sun.radius;
    // TODO random distance from sun's surface
    const minDist = (sun.radius * 2 + planetSize / 2) * 1.2;
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
      radius: planetSize,
      mass: planetSize * planetSize,
      x: pos.x,
      y: pos.y,
      vel: origo(),
      homeSystem: solarSystem,
    };

    planet.vel = calculateOrbitSpeed(GForce, planet, sun);

    createPlanet(planet, "earth");
  }

  // console.log(solarSystem);

  world.solarSystems.push(solarSystem);
};
