import { Button } from "@chakra-ui/react";
import { useState } from "react";

const ToggleButton = () => {
  const [name, setName] = useState("Button Not Clicked");
  const [color, setColor] = useState("gray");

  const handleClick = () => {
    if (color === "gray") {
      setName("Button Clicked");
      setColor("blue");
    } else {
      setName("Button Not Clicked");
      setColor("gray");
    }
  };

  return (
    <div>
      <Button colorScheme={color} onClick={handleClick}>
        {name}
      </Button>
    </div>
  );
};

export default CustomButton;
