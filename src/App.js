import Template from "./Template";

import { EnderProvider } from "./contexts/EnderContext";

function App() {
  return (
    <>
      <EnderProvider>
        <Template />
      </EnderProvider>
    </>
  );
}

export default App;
