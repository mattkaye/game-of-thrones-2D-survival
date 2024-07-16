import { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import PositionProvider from "../PositionContext";
import { startingPosition } from "../customTypes";

const Grid = () => {
  const [gridCellWidth, setGridCellWidth] = useState(0);

  useEffect(() => {
    const domNode = document.querySelector(".grid-cell");
    if (domNode) {
      setGridCellWidth(domNode.getBoundingClientRect().width);
    }
  }, []);

  const makeAvatar = (name: string, type: string = "foe") => {
    return (
      <Avatar
        avatarName={name}
        key={name}
        type={type}
        gridCellWidth={gridCellWidth}
        startPosition={startingPosition[name].startAt}
      />
    );
  };

  return (
    <PositionProvider>
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-20 w-[50rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            <span className="absolute text-gray-400">
              ({Math.floor(index / 9)}, {index % 9})
            </span>

            {index === 4 && <>{makeAvatar("nightking")}</>}
            {index === 18 && <>{makeAvatar("cersei")}</>}
            {index === 26 && <>{makeAvatar("mountain")}</>}
            {index === 36 && <>{makeAvatar("joffery")}</>}
            {index === 44 && <>{makeAvatar("jamie")}</>}
            {index === 76 && <>{makeAvatar("snow", "hero")}</>}
          </div>
        ))}
      </div>
    </PositionProvider>
  );
};

export default Grid;
