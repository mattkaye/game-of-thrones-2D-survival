export const moveAvatar = (
  currentPosition: Point,
  moveByPixels: number,
  direction: KeyboardEvent
) => {
  let additionalTranslate = 0;
  const [currentTranslateX, currentTranslateY] = [...currentPosition];

  direction.preventDefault();

  if (["ArrowUp", "ArrowLeft"].includes(direction.key)) {
    additionalTranslate = -Math.abs(moveByPixels);
  }

  if (["ArrowDown", "ArrowRight"].includes(direction.key)) {
    additionalTranslate = Math.abs(moveByPixels);
  }

  switch (direction.key) {
    case "ArrowUp":
    case "ArrowDown":
      return {
        translateX: currentTranslateX,
        translateY: currentTranslateY + additionalTranslate,
      };

    case "ArrowLeft":
    case "ArrowRight":
      return {
        translateX: currentTranslateX + additionalTranslate,
        translateY: currentTranslateY,
      };

    default:
      return {
        translateX: 0,
        translateY: 0,
      };
  }
};
