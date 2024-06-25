import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import ToggleButton from "./components/ToggleButton";

function App() {
  return (
    <ChakraProvider>
      <ToggleButton />
    </ChakraProvider>
  );
}

export default App;
