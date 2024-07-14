import { useEffect, useId, useRef, useState } from "react";
import { setNewPositionValues, avatarHasCollision } from "../gamePlay";
import { Direction } from "../customTypes";
import { usePositions } from "../PositionContext";

export const Avatar = ({
  avatarName,
  type,
  gridCellWidth,
  startPosition,
}: {
  avatarName: string;
  type: string;
  gridCellWidth: number;
  startPosition: number[];
}) => {
  const avatarWrapper = useRef<HTMLDivElement>(null);
  const [avatarGridCell, setAvatarGridCell] = useState(startPosition);
  const { positions, updatePosition, collision, setCollision } = usePositions();
  const foeAvatarID = useId();

  const moveAvatar = (e?: KeyboardEvent) => {
    const style = window.getComputedStyle(avatarWrapper.current!);
    const matrix = new WebKitCSSMatrix(style.transform);
    const [currentTranslateX, currentTranslateY] = [matrix.m41, matrix.m42];
    const newPosition = setNewPositionValues(
      [currentTranslateX, currentTranslateY],
      avatarGridCell,
      gridCellWidth,
      e
    );

    if (avatarWrapper.current) {
      avatarWrapper.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px) scale(.75)`;
      setAvatarGridCell(newPosition.newGridCell);
      updatePosition(
        type === "hero" ? "hero" : foeAvatarID,
        newPosition.newGridCell
      );
    }
  };
  useEffect(() => {
    if (collision === true) {
      console.count("end game");
    }
  }, [collision]);

  useEffect(() => {
    setCollision(avatarHasCollision(positions));
    if (type === "foe") {
      setTimeout(() => {
        moveAvatar();
      }, 2000);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys: string[] = Object.values(Direction);
      if (validKeys.includes(e.key) === false) {
        return;
      }
      moveAvatar(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [avatarGridCell]);

  return (
    <div className={`avatar ${type} z-10`} ref={avatarWrapper}>
      <img className="rounded-full" src={`/${avatarName}.jpg`} />
    </div>
  );
};
