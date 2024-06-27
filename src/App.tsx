import "./App.css";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomButtonGroup from "./components/CustomButtonGroup";
import { useEffect, useState } from "react";
import { getOrCreateUserId } from "./assets/services/userId";
import sendToSheets from "./assets/services/sendToSheets";
import CustomAlert from "./components/CustomAlert/CustomAlert";
import GoogleSheetCharts from "./components/GoogleSheetCharts";

function App() {
  const [contactSource, setContactSource] = useState<string | null>(null);
  const [contactType, setContactType] = useState<string | null>(null);
  const [dealerType, setDealerType] = useState<string | null>(null);
  const [contactHowType, setContactHowType] = useState<string | null>(null);
  const [contactDetail, setContactDetail] = useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState<number>(0);

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

    console.log("Sending to Google Sheets...");
    try {
      const responseData = await sendToSheets(data);

      if (responseData) {
        //send alert that says submission successful
        setIsError(false);
        setAlertTitle("Success");
        setAlertText("Data submitted successfully.");
        setRefreshKey((prev) => prev + 1);
      } else {
        //send alert that submission was NOT successful
        setIsError(true);
        setAlertTitle("Failure");
        setAlertText("Data submission failed.");
      }
    } catch (error) {
      setIsError(true);
      setAlertTitle("Error");
      if (error instanceof Error) {
        setAlertText(`Error: ${error.message}`);
      } else {
        setAlertText("An unknown error occurred.");
      }
    } finally {
      setIsAlertVisible(true);
    }
  };

  useEffect(() => {
    if (isAlertVisible) {
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  const allSelectionsMade =
    contactSource &&
    contactType &&
    (contactType !== "Dealer" || dealerType) &&
    contactHowType &&
    contactDetail;

  return (
    <ChakraProvider>
      <CustomAlert
        alertText={alertText}
        alertTitle={alertTitle}
        isError={isError}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
      <Flex justify="center" minHeight="100vh" marginTop={20}>
        <Flex
          width="40%"
          flexDirection="column"
          alignItems="center"
          marginTop={40}
        >
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
        <Flex width="50%" flexDirection="column" alignItems="center">
          <GoogleSheetCharts refreshKey={refreshKey} />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
