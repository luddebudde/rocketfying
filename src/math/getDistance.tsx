import { Vec2 } from "../createPlanet";

export const getDistance = (obj1: any, obj2: any) => {
  const xDiff: number = obj1.x - obj2.x;
  const yDiff: number = obj1.y - obj2.y;

  const dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  return dist;
};

export const getDirection = (obj1: Vec2, obj2: Vec2): Vec2 => {
  const xDiff = obj2.x - obj1.x;
  const yDiff = obj2.y - obj1.y;

  const distance = Math.hypot(xDiff, yDiff);

  if (distance === 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: xDiff / distance,
    y: yDiff / distance,
  };
};