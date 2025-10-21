import { origo, Planet, Vec2 } from "./createPlanet";
import { Player } from "./createPlayer";
import { getDistance } from "./math/getDistance";

export const findClosestPlanet = (seeker: Player | Planet): Planet => {
  let closest: Planet = {};
  let shortestDist = Infinity;

  seeker.solarSystem?.planets.forEach((planet) => {
    if (planet === seeker) {
      return;
    }
    const dist = getDistance(seeker, planet);
    if (dist < shortestDist) {
      shortestDist = dist;
      closest = planet;
    }
  });

  //   for (const planet of world) {
  //     if (planet === seeker) continue; // hoppa över om samma objekt
  //     const dist = getDistance(seeker, planet);
  //     if (dist < shortestDist) {
  //       shortestDist = dist;
  //       closest = planet;
  //     }
  //   }

  return closest;
};
