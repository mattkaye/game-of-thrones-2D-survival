import { useEffect, useRef, useState } from "react";
import { moveAvatar } from "../gamePlay";
import heroAvatar from "../assets/images/avatars/hero-jon-snow.jpg";
import cersei from "../assets/images/avatars/cersei.jpg";

const Grid = () => {
  // Hero starts at bottom / center
  const [heroGridCell, setHeroGridCell] = useState([8, 4]);
  const ourHeroWrapper = useRef<HTMLDivElement>(null);
  const cerseiWrapper = useRef<HTMLDivElement>(null);

  // TODO: This shouldn't be recalculated with each render
  const getGridCellWidth = () => {
    const cellDimensions = document
      .querySelector(".grid-cell")
      ?.getBoundingClientRect();

    // Aspect ratio is 1/1 [perfect square]. So just grab the width
    return cellDimensions ? cellDimensions.width : 0;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      const style = window.getComputedStyle(ourHeroWrapper.current!);

      if (validKeys.includes(e.key) === false) {
        return;
      }

      const matrix = new WebKitCSSMatrix(style.transform);
      const [currentTranslateX, currentTranslateY] = [matrix.m41, matrix.m42];

      const newPosition = moveAvatar(
        [currentTranslateX, currentTranslateY],
        heroGridCell,
        getGridCellWidth(),
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
              <div className="avatar foe z-10" ref={cerseiWrapper}>
                <img className="rounded-full" src={cersei} />
              </div>
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
