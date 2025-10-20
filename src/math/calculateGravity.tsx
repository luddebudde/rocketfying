import { Planet, Vec2 } from "../createPlanet";
import { getDirection, getDistance } from "./getDistance";
import { multVar } from "./vec";

export const calculateGravity = (
  GForce: number,
  planet1: Pick<Planet, 'x' | 'y' | 'mass'>,
  planet2: Pick<Planet, 'x' | 'y' | 'mass'>
): Vec2 => {
  const dist = getDistance(planet1, planet2);
  const direction: Vec2 = getDirection(planet1, planet2);

  // console.log(dist);

    if(dist === 0){
        return {x: 0, y: 0};
    }

    const maxForce = 1000
  const force: number = Math.min(
      GForce * ((planet1.mass * planet2.mass) / (dist * dist)),
      maxForce
  )

  return multVar(direction, force);
};
