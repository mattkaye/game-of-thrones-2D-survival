import { useEffect, useRef, useState } from "react";
import { moveAvatar } from "../gamePlay";
import heroAvatar from "../assets/images/avatars/hero-jon-snow.jpg";
import { Foe } from "./avatars/Foe";

const Grid = () => {
  // Hero starts at bottom / center
  const [heroGridCell, setHeroGridCell] = useState([8, 4]);
  const [gridCellWidth, setGridCellWidth] = useState(0);
  const ourHeroWrapper = useRef<HTMLDivElement>(null);

  // TODO: This shouldn't be recalculated with each render
  const getGridCellWidth = () => {
    const domNode = document.querySelector(".grid-cell");
    if (domNode) {
      setGridCellWidth(domNode.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    getGridCellWidth();
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

      if (validKeys.includes(e.key) === false) {
        return;
      }

      const style = window.getComputedStyle(ourHeroWrapper.current!);
      const matrix = new WebKitCSSMatrix(style.transform);
      const [currentTranslateX, currentTranslateY] = [matrix.m41, matrix.m42];
      const newPosition = moveAvatar(
        [currentTranslateX, currentTranslateY],
        heroGridCell,
        gridCellWidth,
        e
      );

      if (ourHeroWrapper.current) {
        ourHeroWrapper.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px) scale(.75)`;
        setHeroGridCell(newPosition.newGridCell);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [heroGridCell]);

  return (
    <>
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-20 w-[50rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            <span className="absolute text-gray-400">
              ({Math.floor(index / 9)}, {index % 9})
            </span>
            {index === 4 && (
              <Foe avatarName="cersei" gridCellWidth={gridCellWidth} />
            )}
            {/* Hero starts at bottom / center */}
            {index === 76 && (
              <div className="avatar hero" ref={ourHeroWrapper}>
                <img className="rounded-full" src={heroAvatar} />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
