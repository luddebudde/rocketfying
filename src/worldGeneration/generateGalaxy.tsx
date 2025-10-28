import { worldScale } from "../world";
import { createPlanet, origo, Planet, Vec2 } from "./objects/createPlanet";
import { createSolarSystem } from "./createSolarSystem";
import { Blackhole } from "./objects/createBlackhole";
import { Sun } from "./objects/createSun";

export type Galaxy = {
  blackhole: Blackhole;
  solarSystems: Sun[];
  planets: Planet[];
};

export const generateGalaxy = () => {
  const galaxy = {
    blackhole: {},
    solarSystems: [],
    planets: [],
  };

  //   const randomSolarSystemCount = Math.random() * 5 + 2;

  const randomSolarSystemCount = 1;
  const blackHoleSize = 25000 * worldScale;

  const blackhole = {
    x: 0,
    y: 0,
    radius: blackHoleSize,
    mass: blackHoleSize * 5,
  };

  // 500000, 500000 <= Mass and size
  createPlanet(origo(), blackhole.radius, "blackhole");

  for (let i = 0; i < randomSolarSystemCount; i++) {
    const distanceOut = 50000 + blackHoleSize;
    const angle = Math.random() * 2 * Math.PI;
    const relPos: Vec2 = {
      x: Math.cos(angle) * distanceOut * worldScale,
      y: Math.sin(angle) * distanceOut * worldScale,
    };
    createSolarSystem(relPos, blackhole);
  }
};
