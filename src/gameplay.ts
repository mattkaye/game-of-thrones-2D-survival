export const outOfBounds = (
  points: Point,
  direction: "n" | "e" | "s" | "w"
): boolean => {
  const [x, y] = [...points];

  switch (direction) {
    case "n":
      break;

    case "e":
      break;

    case "s":
      break;

    case "w":
      break;

    default:
      throw Error("Direction of movement must be chosen.");
  }

  return false;
};
