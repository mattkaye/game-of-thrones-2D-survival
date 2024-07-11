import { useEffect, useRef, useState } from "react";
import { moveAvatar } from "../gamePlay";
import { Direction } from "../customTypes";

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys: string[] = Object.values(Direction);
      if (validKeys.includes(e.key) === false) {
        return;
      }

      const style = window.getComputedStyle(avatarWrapper.current!);
      const matrix = new WebKitCSSMatrix(style.transform);
      const [currentTranslateX, currentTranslateY] = [matrix.m41, matrix.m42];
      const newPosition = moveAvatar(
        [currentTranslateX, currentTranslateY],
        avatarGridCell,
        gridCellWidth,
        e
      );

      if (avatarWrapper.current) {
        avatarWrapper.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px) scale(.75)`;
        setAvatarGridCell(newPosition.newGridCell);
      }
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
