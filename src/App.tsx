import "./App.css";
import { Button, ChakraProvider, Flex, Text, VStack } from "@chakra-ui/react";
import CustomButtonGroup from "./components/CustomButtonGroup";
import { useState } from "react";
import { getOrCreateUserId } from "./assets/services/userId";
import sendToSheets from "./assets/services/sendToSheets";

function App() {
  const [contactSource, setContactSource] = useState<string | null>(null);
  const [contactType, setContactType] = useState<string | null>(null);
  const [dealerType, setDealerType] = useState<string | null>(null);
  const [contactHowType, setContactHowType] = useState<string | null>(null);
  const [contactDetail, setContactDetail] = useState<string | null>(null);

  const handleContactSourceClick = (name: string | null) => {
    setContactSource(name);
  };

  const handleContactTypeClick = (name: string | null) => {
    setContactType(name);
    if (name !== "Dealer") {
      setDealerType(null);
    }
  };

  const handleDealerTypeClick = (name: string | null) => {
    setDealerType(name);
  };

  const handleContactHowClick = (name: string | null) => {
    setContactHowType(name);
  };

  const handleContactDetailClick = (name: string | null) => {
    setContactDetail(name);
  };

  const handleSubmit = async () => {
    const userId = getOrCreateUserId();
    const data = {
      contactDate: new Date().toString(),
      contactSource,
      contactType,
      dealerType,
      contactHowType,
      contactDetail,
      userId,
    };

    try {
      const responseData = await sendToSheets(data);

      console.log(responseData);
      if (responseData && responseData.ok) {
        //send alert that says submission successful
        alert("Submission successful");
      } else {
        //send alert that submission was NOT successful
        alert("Submission was NOT successful");
      }
    } catch (error) {
      console.error("Error;", error);
      alert("Submission failed due to an error");
    }
  };

  const allSelectionsMade =
    contactSource &&
    contactType &&
    (contactType !== "Dealer" || dealerType) &&
    contactHowType &&
    contactDetail;

  return (
    <ChakraProvider>
      <Flex justify="center" minHeight="100vh" marginTop={20}>
        <VStack spacing={10}>
          <Text fontSize="5xl">Contact Source</Text>
          <CustomButtonGroup
            buttonNames={["New", "Quiz Lead", "Existing"]}
            activeButton={contactSource || undefined}
            onButtonClick={handleContactSourceClick}
          />
          <Text fontSize="5xl">Contact Type</Text>
          <CustomButtonGroup
            buttonNames={["Dealer", "End User"]}
            activeButton={contactType || undefined}
            onButtonClick={handleContactTypeClick}
          />
          {contactType === "Dealer" && (
            <CustomButtonGroup
              buttonNames={["Retail", "Retail & Rental", "Rental"]}
              activeButton={dealerType || undefined}
              onButtonClick={handleDealerTypeClick}
            />
          )}
          <Text fontSize="5xl">How did you contact</Text>
          <CustomButtonGroup
            buttonNames={[
              "Phone (Voice)",
              "Phone (Text)",
              "Email",
              "In Person",
            ]}
            activeButton={contactHowType || undefined}
            onButtonClick={handleContactHowClick}
          />
          {contactHowType && (
            <CustomButtonGroup
              buttonNames={[
                "Reply to customer contact",
                "New attempt to contact",
                "Recurring contact",
              ]}
              activeButton={contactDetail || undefined}
              onButtonClick={handleContactDetailClick}
            />
          )}

          {allSelectionsMade && (
            <Button colorScheme="gray" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
