import { ButtonGroup, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  buttonNames: string[];
  activeButton?: string;
  onButtonClick?: (name: string) => void;
}

const CustomButtonGroup = ({
  buttonNames,
  activeButton,
  onButtonClick,
}: Props) => {
  const [localActiveButton, setLocalActiveButton] = useState<string | null>(
    null
  );

  useEffect(() => {
    setLocalActiveButton(activeButton || null);
  }, [activeButton]);

  const handleButtonClick = (name: string) => {
    const newActiveButton = localActiveButton === name ? null : name;
    setLocalActiveButton(newActiveButton);
    if (onButtonClick) {
      onButtonClick(newActiveButton);
    }
  };

  return (
    <ButtonGroup spacing={5}>
      {buttonNames.map((name) => (
        <Button
          key={name}
          colorScheme={localActiveButton === name ? "blue" : "gray"}
          onClick={() => handleButtonClick(name)}
        >
          {name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default CustomButtonGroup;
