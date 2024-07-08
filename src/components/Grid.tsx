import { useEffect, useRef } from "react";
import { moveAvatar } from "../gamePlay";

const Grid = () => {
  let moveByPixels = 0;
  const ourHero = useRef<SVGSVGElement>(null);

  const getGridCellWidth = () => {
    const cellDimensions = document
      .querySelector(".grid-cell")
      ?.getBoundingClientRect();

    // Aspect ratio is 1/1 [perfect square]. So just grab the width
    return cellDimensions ? Math.floor(cellDimensions.width) : 0;
  };

  useEffect(() => {
    moveByPixels = getGridCellWidth();
    const validKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    const style = window.getComputedStyle(ourHero.current!);

    document.addEventListener("keydown", (e) => {
      if (validKeys.includes(e.key) === false) {
        return;
      }
      const matrix = new WebKitCSSMatrix(style.transform);
      let currentTranslateX = matrix.m41;
      let currentTranslateY = matrix.m42;

      const newPosition = moveAvatar(
        [currentTranslateX, currentTranslateY],
        moveByPixels,
        e
      );

      if (ourHero.current) {
        ourHero.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px)`;
      }
    });
  }, []);

  return (
    <>
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-20 w-[60rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            <span className="absolute">
              ({Math.floor(index / 9)}, {index % 9})
            </span>
            {index === 76 && (
              <svg
                className="w-full h-full transition-transform duration-[50ms]"
                ref={ourHero}
              >
                <circle cx="50%" cy="50%" r="20" fill="blue" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
