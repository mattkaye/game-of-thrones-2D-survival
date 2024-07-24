import { useEffect, useRef, useState } from "react";
import ModalWindow from "./ModalWindow";
import Avatar from "./Avatar";
import { startingPosition, Avatars } from "../customTypes";
import { usePositions } from "../PositionContext";

const Grid = ({ clock }: { clock: string }) => {
  const [gridCellWidth, setGridCellWidth] = useState(0);
  const { collision } = usePositions() as { collision: boolean };
  let clockTime = useRef("");

  const playTheme = () => {
    const audio = new Audio("/got-music.mp3");
    audio.addEventListener("canplaythrough", () => {
      /* the audio is now playable; play it if permissions allow */
      audio.play();
    });
  };

  useEffect(() => {
    const domNode = document.querySelector(".grid-cell");
    if (domNode) {
      setGridCellWidth(domNode.getBoundingClientRect().width);
      playTheme();
    }
  }, []);

  useEffect(() => {
    if (collision) {
      clockTime.current = clock;
    }
  }, [collision]);
  const makeAvatar = (name: Avatars, type: string = "foe") => {
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
