export const moveAvatar = (
  currentPosition: number[],
  currentGridCell: number[],
  moveByPixels: number,
  direction: KeyboardEvent
) => {
  let additionalTranslate = 0;
  let [newGridX, newGridY] = [...currentGridCell];
  const [currentTranslateX, currentTranslateY] = [...currentPosition];

  if (["ArrowUp", "ArrowLeft"].includes(direction.key)) {
    additionalTranslate = -Math.abs(moveByPixels);
    newGridX = direction.key === "ArrowUp" ? newGridX - 1 : newGridX;
    newGridY = direction.key === "ArrowLeft" ? newGridY - 1 : newGridY;
  }

  if (["ArrowDown", "ArrowRight"].includes(direction.key)) {
    additionalTranslate = Math.abs(moveByPixels);
    newGridX = direction.key === "ArrowDown" ? newGridX + 1 : newGridX;
    newGridY = direction.key === "ArrowRight" ? newGridY + 1 : newGridY;
  }

  // Avatar cannot move outside of the grid, return the same position
  if (outOfBounds([newGridX, newGridY])) {
    return {
      translateX: currentTranslateX,
      translateY: currentTranslateY,
      newGridCell: [...currentGridCell],
    };
  }

  direction.preventDefault();

  switch (direction.key) {
    case "ArrowUp":
    case "ArrowDown":
      console.log([newGridX, newGridY]);
      return {
        translateX: currentTranslateX,
        translateY: currentTranslateY + additionalTranslate,
        newGridCell: [newGridX, newGridY],
      };

    case "ArrowLeft":
    case "ArrowRight":
      console.log([newGridX, newGridY]);
      return {
        translateX: currentTranslateX + additionalTranslate,
        translateY: currentTranslateY,
        newGridCell: [newGridX, newGridY],
      };

    default:
      return {
        translateX: 0,
        translateY: 0,
        newGridCell: [8, 4],
      };
  }
};

const outOfBounds = (XandYCoordinates: number[]) => {
  const [x, y] = [...XandYCoordinates];
  return x < 0 || x > 8 || y < 0 || y > 8;
};
