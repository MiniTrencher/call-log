import { Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const CustomButton = () => {
  const [name, setName] = useState("Button Not Clicked");
  const [color, setColor] = useState("gray");
  const isInitialRender = useRef(true);

  const handleClick = () => {
    if (color === "gray") {
      setName("Button Clicked");
      setColor("blue");
    } else {
      setName("Button Not Clicked");
      setColor("gray");
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      console.log(name);
    }
  }, [name]);

  return (
    <div>
      <Button colorScheme={color} onClick={handleClick}>
        {name}
      </Button>
    </div>
  );
};

export default CustomButton;
