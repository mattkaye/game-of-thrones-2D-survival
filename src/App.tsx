import { useEffect, useState } from "react";
import PositionProvider from "./PositionContext";

import GOTLogo from "../src/assets/images/got-logo.svg?inline";
import Grid from "./components/Grid";

function App() {
  const [gameNumber, setGameNumber] = useState(0);
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
    const message = gameNumber > 0 ? "Restart Battle" : "Ready For Battle?";
    return (
      <button
        onClick={() => {
          setGameNumber(gameNumber + 1);
        }}
        className="start-battle fun-font"
      >
        ⚔️ {message}
      </button>
    );
  };

  useEffect(() => {
    const clock = setInterval(updateClock, 1000);
    return () => clearInterval(clock);
  }, [gameNumber]);

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
          {gameNumber > 0 && clockValue}
        </h1>
        <section>{gameNumber > 0 && <Grid key={gameNumber} />}</section>
      </main>
    </PositionProvider>
  );
}

export default App;
