import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
  );
}

export default App;
