import { useEffect, useRef } from "react";

const Grid = () => {
  let moveByPixels = 0;
  const ourHero = useRef(null);

  const getGridCellWidth = () => {
    const cellDimensions = document
      .querySelector(".grid-cell")
      ?.getBoundingClientRect();

    // Aspect ratio is 1/1 [perfect square]. So just grab the width
    return cellDimensions ? Math.floor(cellDimensions.width) : 0;
  };

  useEffect(() => {
    moveByPixels = getGridCellWidth();
    let additionalTranslateY = 0;
    let additionalTranslateX = 0;

    document.addEventListener("keydown", (e) => {
      const style = window.getComputedStyle(ourHero.current!);
      const matrix = new WebKitCSSMatrix(style.transform);
      let currentTranslateX = matrix.m41;
      let currentTranslateY = matrix.m42;
      let newTranslateX = 0;
      let newTranslateY = 0;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();

          additionalTranslateY = -Math.abs(moveByPixels);
          newTranslateY = Math.floor(currentTranslateY + additionalTranslateY);

          ourHero.current.style.transform = `translate(${currentTranslateX}px, ${newTranslateY}px)`;
          break;

        case "ArrowDown":
          e.preventDefault();

          additionalTranslateY = Math.abs(moveByPixels);
          newTranslateY = Math.floor(currentTranslateY + additionalTranslateY);

          // Apply the new transform value
          if (ourHero.current) {
            ourHero.current.style.transform = `translate(${currentTranslateX}px, ${newTranslateY}px)`;
          }
          break;

        case "ArrowLeft":
          e.preventDefault();
          additionalTranslateX = -Math.abs(moveByPixels);
          newTranslateX = Math.floor(currentTranslateX + additionalTranslateX);

          ourHero.current.style.transform = `translate(${newTranslateX}px, ${currentTranslateY}px)`;
          break;

        case "ArrowRight":
          e.preventDefault();
          additionalTranslateX = Math.abs(moveByPixels);
          newTranslateX = Math.floor(currentTranslateX + additionalTranslateX);

          ourHero.current.style.transform = `translate(${newTranslateX}px, ${currentTranslateY}px)`;
          break;

        default:
          // Ignore all other keys
          break;
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
