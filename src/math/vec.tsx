import { Vec2 } from "../createPlanet";

export const add = (num1: Vec2, num2: Vec2): Vec2 => {
  return { x: num1.x + num2.x, y: num1.y + num2.y };
};

export const divVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x / num2, y: num1.y / num2 };
};

export const revDivVar = (num1: number, num2: Vec2): Vec2 => {
  return { x: num1 / num2.x, y: num1 / num2.y };
};

export const multVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x * num2, y: num1.y * num2 };
};

export const sqrtVec = (num1: Vec2) => ({
  x: Math.sqrt(Math.abs(num1.x)),
  y: Math.sqrt(Math.abs(num1.y)),
});
