export const moveAvatar = (
  currentPosition: number[],
  currentGridCell: number[],
  moveByPixels: number,
  direction: KeyboardEvent
) => {
  let additionalTranslate = 0;
  let [newGridX, newGridY] = [...currentGridCell];
  const [currentTranslateX, currentTranslateY] = [...currentPosition];

  direction.preventDefault();
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
