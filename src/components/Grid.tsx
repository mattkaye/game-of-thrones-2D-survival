import { useCallback, useEffect, useRef, useState } from "react";
import { moveAvatar } from "../gamePlay";
import heroAvatar from "../assets/images/avatars/hero-jon-snow.png";

const Grid = () => {
  let moveByPixels = 0;
  // Hero starts at bottom / center
  const [heroGridCell, setHeroGridCell] = useState([8, 4]);
  const ourHero = useRef<HTMLDivElement>(null);

  const getGridCellWidth = () => {
    const cellDimensions = document
      .querySelector(".grid-cell")
      ?.getBoundingClientRect();

    // Aspect ratio is 1/1 [perfect square]. So just grab the width
    return cellDimensions ? Math.floor(cellDimensions.width) : 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      moveByPixels = getGridCellWidth();
      const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      const style = window.getComputedStyle(ourHero.current!);

      if (validKeys.includes(e.key) === false) {
        return;
      }

      const matrix = new WebKitCSSMatrix(style.transform);
      const [currentTranslateX, currentTranslateY] = [matrix.m41, matrix.m42];

      const newPosition = moveAvatar(
        [currentTranslateX, currentTranslateY],
        heroGridCell,
        moveByPixels,
        e
      );

      if (ourHero.current) {
        ourHero.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px) scale(.75)`;
        setHeroGridCell(newPosition.newGridCell);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [heroGridCell]);

  return (
    <>
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-20 w-[60rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            <span className="absolute">
              ({Math.floor(index / 9)}, {index % 9})
            </span>
            {/* Hero starts at bottom / center */}
            {index === 76 && (
              <div className="avatar hero" ref={ourHero}>
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
