import Instructions from "./components/instructions";
import SafeCode from "./components/safe-code";

function App() {
  return (
    <div className="min-h-screen ">
      <div className="p-2 w-full max-w-[800px] mx-auto pt-[10vh] space-y-8">
        <SafeCode />
        <Instructions />
      </div>
    </div>
  );
}

export default App;
