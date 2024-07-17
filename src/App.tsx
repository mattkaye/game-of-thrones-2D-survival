import GOTLogo from "../src/assets/images/got-logo.svg?inline";
import Grid from "./components/Grid";

function App() {
  return (
    <main className="my-12 container mx-auto">
      <div className="flex w-full flex-col items-center gap-6">
        <img src={GOTLogo} alt="Game of Thrones Logo" />
        <h1 className="text-6xl text-orange-500 fun-font">
          Grid Survival Game!
        </h1>
        <p className="max-w-xl text-white text-center text-xl">
          How long can you survive the Lannister's and their allies? Play as Jon
          Snow and use your wits to out maneuver your opponents for as long as
          possible using your arrow keys. (&uarr; &darr; &larr; &rarr;)
        </p>
        <button className="start-battle">⚔️ Ready For Battle?</button>
      </div>
      <section>
        <Grid />
      </section>
    </main>
  );
}

export default App;
