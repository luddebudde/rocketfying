import { Vec2 } from "./createPlanet";

export const add = (num1: Vec2, num2: Vec2) => {
  return { x: num1.x + num2.x, y: num1.y + num2.y };
};
