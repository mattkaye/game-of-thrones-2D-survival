import { Direction, startingPosition } from "./customTypes";

export const setNewPositionValues = (
  currentPosition: number[],
  currentGridCell: number[],
  moveByPixels: number,
  direction?: KeyboardEvent
) => {
  let additionalTranslate = 0;
  let [newGridX, newGridY] = [...currentGridCell];
  const [currentTranslateX, currentTranslateY] = [...currentPosition];
  let dir: string = "";
  const isFoe = !direction?.type;

  // If a keyboard event is not passed, we choose a random direction for the avatar to move.
  if (isFoe) {
    dir = chooseRandomDirection();
  } else {
    dir = direction.key;
    direction.preventDefault();
  }

  if ([Direction.Up, Direction.Left].includes(<Direction>dir)) {
    additionalTranslate = -Math.abs(moveByPixels);
    newGridX = dir === Direction.Up ? newGridX - 1 : newGridX;
    newGridY = dir === Direction.Left ? newGridY - 1 : newGridY;
  }

  if ([Direction.Down, Direction.Right].includes(<Direction>dir)) {
    additionalTranslate = Math.abs(moveByPixels);
    newGridX = dir === Direction.Down ? newGridX + 1 : newGridX;
    newGridY = dir === Direction.Right ? newGridY + 1 : newGridY;
  }

  if (moveByPixels === 0 || outOfBounds([newGridX, newGridY])) {
    return {
      translateX: currentTranslateX,
      translateY: currentTranslateY,
      newGridCell: [...currentGridCell],
    };
  }

  switch (dir) {
    case Direction.Up:
    case Direction.Down:
      return {
        translateX: currentTranslateX,
        translateY: currentTranslateY + additionalTranslate,
        newGridCell: [newGridX, newGridY],
      };

    case Direction.Left:
    case Direction.Right:
      return {
        translateX: currentTranslateX + additionalTranslate,
        translateY: currentTranslateY,
        newGridCell: [newGridX, newGridY],
      };

    default:
      return {
        translateX: 0,
        translateY: 0,
        newGridCell: startingPosition.snow.startAt,
      };
  }
};

export const avatarHasCollision = (positions: { [x: string]: number[] }) => {
  return Object.keys(positions).some((type) => {
    if (type !== "hero") {
      return JSON.stringify(positions[type]) === JSON.stringify(positions.hero);
    }
  });
};

const outOfBounds = (XandYCoordinates: number[]) => {
  const [x, y] = [...XandYCoordinates];
  return x < 0 || x > 8 || y < 0 || y > 8;
};

const chooseRandomDirection = () => {
  const directionValues = Object.values(Direction);
  return directionValues[Math.floor(Math.random() * directionValues.length)];
};

export const getRandomIncrement = (
  min: number,
  max: number,
  increment: number
) => {
  const range = (max - min) / increment;
  const randomIncrement = Math.floor(Math.random() * (range + 1));
  return min + randomIncrement * increment;
};

export const debounce = (func: { (e?: KeyboardEvent): void; apply?: any }) => {
  let timer: number;
  return (...args: KeyboardEvent[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 100);
  };
};
