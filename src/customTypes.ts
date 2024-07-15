export enum Direction {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
}

export enum Foes {
  cersei = "cersei",
  joffery = "joffery",
  jamie = "jamie",
  nightking = "nightking",
  mountain = "mountain",
}

export const startingPosition = {
  nightking: { startAt: [0, 4] },
  cersei: { startAt: [2, 0] },
  joffery: { startAt: [4, 0] },
  mountain: { startAt: [2, 8] },
  jamie: { startAt: [4, 8] },
  hero: { startAt: [8, 4] },
};
