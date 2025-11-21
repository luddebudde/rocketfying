import { worldScale } from "../world";
import { createPlanet, origo, Planet, Vec2 } from "./objects/createPlanet";
import { createSolarSystem, ProtoPlanet } from "./createSolarSystem";
import {
  Blackhole,
  createBlackhole,
  ProtoBlackhole,
} from "./objects/createBlackhole";
import { Sun } from "./objects/createSun";
import { player } from "./createPlayer";

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

  const blackHoleSize = 1000000 * worldScale;
  // const blackHoleSize = 1 * worldScale;

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

  console.log(protoBlackhole.mass);

  // 500000, 500000 <= Mass and size

  createBlackhole(protoBlackhole);
  // galaxy.blackhole = createBlackhole(protoBlackhole);

  // const randomSolarSystemCount = 5;
  const randomSolarSystemCount = 1;
  for (let i = 0; i < randomSolarSystemCount; i++) {
    const distanceOut = blackHoleSize * 5;
    const angle = Math.random() * 2 * Math.PI;
    const relPos: Vec2 = {
      x: Math.cos(angle) * distanceOut * worldScale,
      y: Math.sin(angle) * distanceOut * worldScale,
    };
    createSolarSystem(relPos, galaxy);

    player.x = relPos.x + 8000;
    player.y = relPos.y + 8000;

    // player.vel =
  }
};
