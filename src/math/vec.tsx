import { Vec2 } from "../createPlanet";

export const add = (num1: Vec2, num2: Vec2): Vec2 => {
  return { x: num1.x + num2.x, y: num1.y + num2.y };
};

export const addVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x + num2, y: num1.y + num2 };
};

export const sub = (num1: Vec2, num2: Vec2): Vec2 => {
  return { x: num1.x - num2.x, y: num1.y - num2.y };
};

export const subVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x - num2, y: num1.y - num2 };
};

export const div = (num1: Vec2, num2: Vec2): Vec2 => {
  return { x: num1.x / num2.x, y: num1.y / num2.y };
};

export const divVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x / num2, y: num1.y / num2 };
};

export const revDivVar = (num1: number, num2: Vec2): Vec2 => {
  return { x: num1 / num2.x, y: num1 / num2.y };
};

export const mult = (num1: Vec2, num2: Vec2): Vec2 => {
  return { x: num1.x * num2.x, y: num1.y * num2.y };
};

export const multVar = (num1: Vec2, num2: number): Vec2 => {
  return { x: num1.x * num2, y: num1.y * num2 };
};

export const sqrtVec = (num1: Vec2) => ({
  x: Math.sqrt(Math.abs(num1.x)),
  y: Math.sqrt(Math.abs(num1.y)),
});

export const lengthVec = (vec: Vec2): number => {
  return Math.hypot(vec.x, vec.y);
};

export const rotateVec90 = (vec: Vec2): Vec2 => ({
  x: -vec.y,
  y: vec.x,
});

const normalized = (vec: Vec2): Vec2 => {
  const length = lengthVec(vec);
  if (length === 0) {
    return { x: 1, y: 0 };
  }
  return {
    x: vec.x / length,
    y: vec.y / length,
  };
};
