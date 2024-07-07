import { useEffect, useRef, useState } from "react";

const Grid = () => {
  const [heroPosition, setHeroPosition] = useState<Point>([8, 4]);
  const [cellSquareSize, setCellSquareSize] = useState(0); // Pixel size
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
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          // Get the current transform value
          const style = window.getComputedStyle(ourHero.current!);
          const matrix = new WebKitCSSMatrix(style.transform);
          console.log(matrix);

          // Extract the current translateY value
          // m41 = X | m42 = Y
          let currentTranslateY = matrix.m42; // m42 is the translateY value in the transformation matrix

          // Add your desired translateY value
          console.log("here: ", moveByPixels);
          const additionalTranslateY = -Math.abs(moveByPixels); // Replace with your desired translateY moving up ^ value
          const newTranslateY = currentTranslateY + additionalTranslateY;

          // Apply the new transform value
          if (ourHero.current) {
            ourHero.current.style.transform = `translate(${matrix.m41}px, ${newTranslateY}px)`;
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          console.log(e.key);
          break;

        case "ArrowLeft":
          e.preventDefault();
          console.log(e.key);
          break;

        case "ArrowRight":
          e.preventDefault();
          console.log(e.key);
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
                className="transition-transform"
                width="100%"
                height="100%"
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
