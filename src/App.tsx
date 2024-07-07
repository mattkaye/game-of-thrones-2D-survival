import GOTLogo from "../src/assets/images/got-logo.svg?inline";
import Grid from "./components/Grid";

function App() {
  return (
    <main className="my-12 container mx-auto">
      <div className="flex w-full flex-col items-center">
        <img src={GOTLogo} alt="Game of Thrones Logo" />
        <h1 className="text-6xl text-orange-500 mt-6">Grid Survival Game!</h1>
      </div>
      <section>
        <Grid />
      </section>
    </main>
  );
}

export default App;
