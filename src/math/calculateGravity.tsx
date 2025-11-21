import { Player } from "../worldGeneration/createPlayer";
import { origo, Planet, Vec2 } from "../worldGeneration/objects/createPlanet";
import { getDirection, getDistance } from "./getDistance";
import { multVar } from "./vec";

const gravityLaws = {
  player: [],
  planet: ["blackhole"],
  sun: ["planet", "player"],
  blackhole: ["sun", "blackhole"],
};

export const calculateGravity = (
  GForce: number,
  planet1: Pick<Planet | Player, "x" | "y" | "mass" | "type">,
  planet2: Pick<Planet | Player, "x" | "y" | "mass" | "type">
): Vec2 => {
  // if (planet1.type === "planet" && planet2.type === "sun") {
  //   return origo();
  // }
  // gravityLaws;
  // const blockedInteraction = gravityLaws[planet1.type];

  // if (blockedInteraction && blockedInteraction.includes(planet2.type)) {
  //   return origo();
  // }
  const dist = Math.max(getDistance(planet1, planet2), 1);
  const direction: Vec2 = getDirection(planet1, planet2);

  // console.log(planet1.type, blockedInteraction);
  // if (planet1.type === "planet" && planet2.type === "blackhole") {
  //   console.log(planet1.type, planet2.type);
  // }

  if (dist === 0) {
    return { x: 0, y: 0 };
  }

  // const maxForce = 25000;
  const force: number =
    GForce * ((planet1.mass * planet2.mass) / (dist * dist));

  // force = force ?? 0;
  // console.log(planet1, planet2);

  return multVar(direction, force);
};
