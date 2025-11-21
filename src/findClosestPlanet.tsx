import { origo, Planet, Vec2 } from "./worldGeneration/objects/createPlanet";
import { Player } from "./worldGeneration/createPlayer";
import { getDistance } from "./math/getDistance";

export const findClosestPlanet = (seeker: Player | Planet): Planet => {
  let closest: Planet = {};
  let shortestDist = Infinity;

  // console.log(seeker.);

  const solarSystem = seeker.homesystem;

  solarSystem.planets.forEach((planet) => {
    console.log(solarSystem.planets);

    if (planet === seeker) {
      return;
    }
    const dist = getDistance(seeker, planet);
    if (dist < shortestDist) {
      shortestDist = dist;
      closest = planet;
    }
  });

  console.log(solarSystem);

  if (shortestDist > solarSystem.planets[0].radius * 5) {
    closest = solarSystem.sun;
  }

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
