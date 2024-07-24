import { useEffect, useState } from "react";
import PositionProvider from "./PositionContext";

import GOTLogo from "../src/assets/images/got-logo.svg?inline";
import Grid from "./components/Grid";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [clockValue, setClockValue] = useState("");

  let seconds = 0;
  const updateClock = () => {
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    const formattedTime = `${minutes}:${String(displaySeconds).padStart(
      2,
      "0"
    )}`;
    seconds++;
    setClockValue(formattedTime);
  };

  const battleButton = () => {
    return (
      <button
        onClick={() => {
          setStartGame(true);
        }}
        className="start-battle fun-font"
      >
        ⚔️ Ready For Battle?
      </button>
    );
  };

  useEffect(() => {
    const clock = setInterval(updateClock, 1000);
    return () => clearInterval(clock);
  }, [startGame]);

  return (
    <PositionProvider>
      <main className="my-12 container mx-auto">
        <div className="flex w-full flex-col items-center gap-6">
          <img src={GOTLogo} alt="Game of Thrones Logo" />
          <h1 className="text-6xl text-orange-500 fun-font">
            Grid Survival Game!
          </h1>
          <p className="max-w-xl text-white text-center text-xl">
            How long can you survive the Lannister's and their allies? Play as
            Jon Snow and use your wits to out maneuver your opponents for as
            long as possible using your arrow keys. (&uarr; &darr; &larr;
            &rarr;)
          </p>
          {battleButton()}
        </div>
        <h1 className="text-center text-4xl text-orange-500 font-bold pt-6">
          {startGame && clockValue}
        </h1>
        <section>{startGame && <Grid clock={clockValue} />}</section>
      </main>
    </PositionProvider>
  );
}

export default App;
