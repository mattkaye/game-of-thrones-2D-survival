import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import ModalWindow from "./ModalWindow";
import { startingPosition } from "../customTypes";
import { usePositions } from "../PositionContext";

const Grid = ({ clock }: { clock: string }) => {
  const [gridCellWidth, setGridCellWidth] = useState(0);
  const { collision } = usePositions();
  let clockTime = useRef("");

  useEffect(() => {
    const domNode = document.querySelector(".grid-cell");
    if (domNode) {
      setGridCellWidth(domNode.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (collision) {
      console.log("gameOver", collision);
      clockTime.current = clock;
    }
  }, [collision]);
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
    <>
      {collision && <ModalWindow clockTime={clockTime.current} />}
      <div className="battle-grid grid grid-cols-9 grid-rows-9 mt-10 w-[50rem] mx-auto">
        {[...Array(81).keys()].map((index) => (
          <div className="grid-cell" key={index}>
            {/* <span className="absolute text-gray-400">
              ({Math.floor(index / 9)}, {index % 9})
            </span> */}

            {index === 4 && <>{makeAvatar("nightking")}</>}
            {index === 18 && <>{makeAvatar("cersei")}</>}
            {index === 26 && <>{makeAvatar("mountain")}</>}
            {index === 54 && <>{makeAvatar("joffery")}</>}
            {index === 62 && <>{makeAvatar("jamie")}</>}
            {index === 40 && <>{makeAvatar("snow", "hero")}</>}
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
