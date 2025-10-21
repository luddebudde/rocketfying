import { Planet } from "../createPlanet";
import { ProtoPlanet } from "../createSolarSystem";
import { calculateGravity } from "./calculateGravity";
import { getDirection, getDistance } from "./getDistance";
import { lengthVec, multVar, rotateVec90 } from "./vec";

export const calculateOrbitSpeed = (
  GForce: number,
  planet: Planet | ProtoPlanet,
  sun: Planet | ProtoPlanet
) => {
  const gravityForce = calculateGravity(GForce, planet, sun);
  // When the orbit is circular, the centripetal force is equal to the gravitational force.
  // gForce is a vector, but only the magnitude is needed here
  const centripetalForce = lengthVec(gravityForce);
  // console.log("centripetalForce", centripetalForce);

  // From the formula for centripetal force, we can derive the orbital speed:
  // F = mv^2 / r
  const distanceAway = getDistance(planet, sun);
  const speed = Math.sqrt((sun.mass * GForce) / distanceAway);
  const dirToSun = getDirection(planet, sun);
  const tangentDir = rotateVec90(dirToSun);
  const orbitalVel = multVar(tangentDir, speed);

  return orbitalVel;
};
