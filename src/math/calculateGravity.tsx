import { Planet, Vec2 } from "../createPlanet";
import { getDirection, getDistance } from "./getDistance";
import { multVar } from "./vec";

export const calculateGravity = (
  GForce: number,
  planet1: Planet,
  planet2: Planet
) => {
  const dist = getDistance(planet1, planet2);

  const force: number =
    GForce * ((planet1.mass * planet2.mass) / Math.max(dist, 1));
  const direction: Vec2 = getDirection(planet1, planet2);

  // console.log(GForce, planet1.mass, "force");

  return multVar(direction, force / planet1.mass);
};
