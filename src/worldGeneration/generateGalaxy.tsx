import { worldScale } from "../world";
import { createPlanet, origo, Planet, Vec2 } from "./objects/createPlanet";
import { createSolarSystem, ProtoPlanet } from "./createSolarSystem";
import {
  Blackhole,
  createBlackhole,
  ProtoBlackhole,
} from "./objects/createBlackhole";
import { Sun } from "./objects/createSun";

export type Galaxy = {
  blackhole: Blackhole;
  solarSystems: Sun[];
  planets: Planet[];
};

export const generateGalaxy = () => {
  const galaxy: Galaxy = {
    blackhole: {} as Blackhole,
    solarSystems: [],
    planets: [],
  };

  const blackHoleSize = 25000 * worldScale;

  const protoBlackhole: ProtoBlackhole = {
    type: "blackhole",
    name: "0809-04Au",
    x: 25000,
    y: 25000,
    radius: blackHoleSize,
    mass: blackHoleSize * blackHoleSize,
    vel: origo(),

    galaxy: galaxy,
  };

  // 500000, 500000 <= Mass and size

  createBlackhole(protoBlackhole);

  const randomSolarSystemCount = 5;
  for (let i = 0; i < randomSolarSystemCount; i++) {
    const distanceOut = 250000 + blackHoleSize;
    const angle = Math.random() * 2 * Math.PI;
    const relPos: Vec2 = {
      x: Math.cos(angle) * distanceOut * worldScale,
      y: Math.sin(angle) * distanceOut * worldScale,
    };
    createSolarSystem(relPos, galaxy);
  }
};
