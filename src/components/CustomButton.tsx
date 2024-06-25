import { Button } from "@chakra-ui/react";

interface Props {
  name: string;
  isActive: boolean;
  onButtonClick: (name: string) => void;
}

const CustomButton = ({ name, isActive, onButtonClick }: Props) => {
  const color = isActive ? "blue" : "gray";

  const handleClick = () => {
    onButtonClick(name);
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
