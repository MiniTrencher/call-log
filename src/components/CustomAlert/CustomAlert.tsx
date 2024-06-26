import {
  Slide,
  Alert,
  Flex,
  AlertIcon,
  VStack,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

interface Props {
  isError: boolean;
  alertText: string;
  alertTitle: string;
  isVisible: boolean;
  onClose: () => void;
}

const CustomAlert = ({
  isError,
  alertText,
  alertTitle,
  isVisible,
  onClose,
}: Props) => {
  const stat = isError ? "error" : "success";

  return (
    <>
      <Slide direction="top" in={isVisible} style={{ zIndex: 9999 }}>
        <Box top={0} left={0} width="100%">
          <Alert status={stat} variant="top-accent">
            <Flex width="100%" align="center" justify="space-between">
              <AlertIcon />
              <VStack>
                <AlertTitle>{alertTitle}</AlertTitle>
                <AlertDescription>{alertText}</AlertDescription>
              </VStack>
              <CloseButton
                alignSelf="flex-end"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
              />
            </Flex>
          </Alert>
        </Box>
      </Slide>
    </>
  );
};

export default CustomAlert;
