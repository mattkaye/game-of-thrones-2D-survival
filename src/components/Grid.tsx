import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import PositionProvider from "../PositionContext";
import { Foes, startingPosition } from "../customTypes";

const Grid = () => {
  const [gridCellWidth, setGridCellWidth] = useState(0);

  useEffect(() => {
    const domNode = document.querySelector(".grid-cell");
    if (domNode) {
      setGridCellWidth(domNode.getBoundingClientRect().width);
    }
  }, []);

  const makeFoes = () => {
    return [...Object.keys(Foes)].map((foeName: string) => {
      return (
        <Avatar
          avatarName={foeName}
          key={foeName}
          type="foe"
          gridCellWidth={gridCellWidth}
          startPosition={startingPosition[foeName].startAt}
        />
      );
    });
  };
  const makeFoe = (foeName: string) => {
    return (
      <Avatar
        avatarName={foeName}
        key={foeName}
        type="foe"
        gridCellWidth={gridCellWidth}
        startPosition={startingPosition[foeName].startAt}
      />
    );
  };

  makeFoe("nightking");

  return (
    <PositionProvider>
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-20 w-[50rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            <span className="absolute text-gray-400">
              ({Math.floor(index / 9)}, {index % 9})
            </span>

            {index === 4 && <>{makeFoe("nightking")}</>}
            {index === 18 && <>{makeFoe("cersei")}</>}
            {index === 26 && <>{makeFoe("mountain")}</>}
            {index === 36 && <>{makeFoe("joffery")}</>}
            {index === 44 && <>{makeFoe("jamie")}</>}

            {/* Hero at bottom / center */}
            {index === 76 && (
              <Avatar
                avatarName="jon-snow"
                type="hero"
                gridCellWidth={gridCellWidth}
                startPosition={startingPosition.hero.startAt}
              />
            )}
          </div>
        ))}
      </div>
    </PositionProvider>
  );
};

export default Grid;
