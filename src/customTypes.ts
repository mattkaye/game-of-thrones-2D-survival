export enum Direction {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}

export const startingPosition = {
  nightking: { startAt: [0, 4] },
  cersei: { startAt: [2, 0] },
  joffery: { startAt: [6, 0] },
  mountain: { startAt: [2, 8] },
  jamie: { startAt: [6, 8] },
  snow: { startAt: [4, 4] },
};

export type Avatars =
  | "nightking"
  | "cersei"
  | "joffery"
  | "mountain"
  | "jamie"
  | "snow";
