import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import CustomButton from "./components/CustomButton";

function App() {
  return (
    <ChakraProvider>
      <div>
        <CustomButton />
      </div>
    </ChakraProvider>
  );
}

export default App;
