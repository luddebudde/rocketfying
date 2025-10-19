import { Planet, Vec2 } from "../createPlanet";
import { getDirection, getDistance } from "./getDistance";
import { multVar } from "./vec";

export const calculateGravity = (
  GForce: number,
  planet1: Planet,
  planet2: Planet
): Vec2 => {
  const dist = getDistance(planet1, planet2);
  const direction: Vec2 = getDirection(planet1, planet2);

  // console.log(dist);

  const force: number = Math.min(
    GForce * ((planet1.mass * planet2.mass) / Math.max(dist * dist, 1)),
    25000
  );
  // console.log(dist);

  // console.log(force);

  return multVar(direction, force / planet1.mass);
};
