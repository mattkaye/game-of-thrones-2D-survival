import { useEffect, useRef } from "react";
import { moveAvatar } from "../gamePlay";
import heroAvatar from "../assets/images/avatars/hero-jon-snow.png";

const Grid = () => {
  let moveByPixels = 0;
  const ourHero = useRef<HTMLImageElement>(null);

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
        ourHero.current.style.transform = `translate(${newPosition.translateX}px, ${newPosition.translateY}px) scale(.75)`;
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
