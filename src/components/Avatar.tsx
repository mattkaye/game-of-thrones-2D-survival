import { useEffect, useId, useRef, useState } from "react";
import {
  setNewPositionValues,
  avatarHasCollision,
  getRandomIncrement,
  debounce,
} from "../gamePlay";
import { Direction } from "../customTypes";
import { usePositions } from "../PositionContext";

const Avatar = ({
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
  const avatarSpeed = useRef(getRandomIncrement(300, 600, 100));
  const [avatarGridCell, setAvatarGridCell] = useState(startPosition);
  const { positions, updatePosition, setCollision } = usePositions() as {
    positions: { [x: string]: number[] };
    updatePosition: (type: string, newPosition: number[]) => void;
    setCollision: (collision: boolean) => void;
  };
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

  const debounceHeroAvatarMovement = debounce((e?: KeyboardEvent) =>
    moveAvatar(e)
  );

  useEffect(() => {
    const hasCollision = avatarHasCollision(positions);
    if (avatarHasCollision(positions)) {
      setCollision(hasCollision);
    }
    if (type === "foe") {
      setTimeout(() => {
        moveAvatar();
      }, avatarSpeed.current);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys: string[] = Object.values(Direction);
      if (validKeys.includes(e.key) === false) {
        return;
      }
      e.preventDefault();
      debounceHeroAvatarMovement(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [avatarGridCell]);

  return (
    <div className={`avatar ${type} z-10`} ref={avatarWrapper}>
      <img className='rounded-full' src={`/${avatarName}.jpg`} />
    </div>
  );
};

export default Avatar;
