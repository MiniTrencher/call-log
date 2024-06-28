import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import CustomButtonGroup from "./CustomButtonGroup";
import { useEffect, useState, useCallback } from "react";
import { getFromSheets, filterSheets } from "../assets/services/getFromSheets";

interface Props {
  refreshKey: number;
}

const GoogleSheetCharts = ({ refreshKey }: Props) => {
  //URLs of the published chart images
  const chartUrls = [
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5jThTpcOLp2pV_L4m-FWG2d69BcZhaUIaDDM_qV-Evuio49938TBA0Q0Z2JkvRsRhNVCWNkiZNMEr/pubchart?oid=2126095813&format=image",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5jThTpcOLp2pV_L4m-FWG2d69BcZhaUIaDDM_qV-Evuio49938TBA0Q0Z2JkvRsRhNVCWNkiZNMEr/pubchart?oid=988787829&format=image",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5jThTpcOLp2pV_L4m-FWG2d69BcZhaUIaDDM_qV-Evuio49938TBA0Q0Z2JkvRsRhNVCWNkiZNMEr/pubchart?oid=2110485331&format=image",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5jThTpcOLp2pV_L4m-FWG2d69BcZhaUIaDDM_qV-Evuio49938TBA0Q0Z2JkvRsRhNVCWNkiZNMEr/pubchart?oid=344276306&format=image",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5jThTpcOLp2pV_L4m-FWG2d69BcZhaUIaDDM_qV-Evuio49938TBA0Q0Z2JkvRsRhNVCWNkiZNMEr/pubchart?oid=1059747853&format=image",
  ];

  const [calendar, setCalendar] = useState<string>("This Week");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [totalContacts, setTotalContacts] = useState<number>(0);

  const fetchTotalContacts = useCallback(async () => {
    const data = await getFromSheets("Sheet2!C1");
    if (data) {
      setTotalContacts(Number(data));
    }
  }, []);

  const FilterData = useCallback((dateRange: string | null) => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    switch (dateRange) {
      case "This Week": {
        // code for this week
        const weekdayNumber = ((currentDate.getDay() + 6) % 7) + 1;
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - (weekdayNumber - 1));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 4);

        setStartDate(startOfWeek.toLocaleDateString(undefined, options));
        setEndDate(endOfWeek.toLocaleDateString(undefined, options));
        break;
      }
      case "This Month": {
        // code for this month
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );

        setStartDate(startOfMonth.toLocaleString(undefined, options));
        setEndDate(endOfMonth.toLocaleString(undefined, options));
        break;
      }
      case "This Year": {
        // code for this year
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const endOfYear = new Date(currentDate.getFullYear(), 11, 31);

        setStartDate(startOfYear.toLocaleString(undefined, options));
        setEndDate(endOfYear.toLocaleString(undefined, options));
        break;
      }
      case "Last Week": {
        // code for last week
        const lastWeekdayNumber = ((currentDate.getDay() + 6) % 7) + 1;
        const lastWeekStartDate = new Date(currentDate);
        lastWeekStartDate.setDate(
          currentDate.getDate() - lastWeekdayNumber - 6
        );
        const lastWeekEndDate = new Date(lastWeekStartDate);
        lastWeekEndDate.setDate(lastWeekStartDate.getDate() + 4);

        setStartDate(lastWeekStartDate.toLocaleDateString(undefined, options));
        setEndDate(lastWeekEndDate.toLocaleDateString(undefined, options));

        break;
      }
      case "Last Month": {
        // code for last month
        let startOfLastMonth;

        if (currentDate.getMonth() === 1) {
          startOfLastMonth = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth() - 1,
            1
          );
        } else {
          startOfLastMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          );
        }

        const endOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );

        setStartDate(startOfLastMonth.toLocaleString(undefined, options));
        setEndDate(endOfLastMonth.toLocaleString(undefined, options));
        break;
      }
      case "Last Year": {
        // code for last year
        const startOfYear = new Date(currentDate.getFullYear() - 1, 0, 1);
        const endOfYear = new Date(currentDate.getFullYear() - 1, 11, 31);

        setStartDate(startOfYear.toLocaleString(undefined, options));
        setEndDate(endOfYear.toLocaleString(undefined, options));
        break;
      }
      default: {
        // code for this week
        const weekdayNumber = ((currentDate.getDay() + 6) % 7) + 1;
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - (weekdayNumber - 1));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 4);

        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        };
        const formattedStartDate = startDate.toLocaleDateString(
          undefined,
          options
        );
        const formattedEndDate = endDate.toLocaleDateString(undefined, options);

        console.log(`Start Date: ${formattedStartDate}`);
        console.log(`End Date: ${formattedEndDate}`);
      }
    }
  }, []);

  useEffect(() => {
    FilterData("This Week");
    fetchTotalContacts();
  }, [FilterData, fetchTotalContacts]);

  useEffect(() => {
    if (startDate !== null && endDate !== null) {
      filterSheets(startDate, endDate);
    }
  }, [startDate, endDate]);

  const handleCalendarClick = (name: string | null) => {
    if (name) {
      setCalendar(name);
    }
  };

  useEffect(() => {
    if (calendar) {
      FilterData(calendar);
    }
  }, [calendar, FilterData]);

  return (
    <Grid
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gridGap={10}
      rowGap={50}
    >
      <Box>
        <Flex
          alignItems="center"
          justify="space-between"
          marginTop={5}
          marginBottom={5}
          marginLeft={10}
          marginRight={10}
        >
          <Text fontSize="3xl">{`Total Contacts:`}</Text>
          <Text fontSize="3xl">{totalContacts}</Text>
        </Flex>
        <Flex alignItems="center" justify="center">
          <CustomButtonGroup
            buttonNames={["This Week", "This Month", "This Year"]}
            activeButton={calendar || undefined}
            onButtonClick={handleCalendarClick}
          />
        </Flex>
        <Flex alignItems="center" justify="center" margin={3}>
          <CustomButtonGroup
            buttonNames={["Last Week", "Last Month", "Last Year"]}
            activeButton={calendar || undefined}
            onButtonClick={handleCalendarClick}
          />
        </Flex>
        <Flex alignItems="center" justify="center" marginTop={5}>
          <Text fontSize="3xl">{`Date Range`}</Text>
        </Flex>
        <Flex alignItems="center" justify="center">
          <Text fontSize="2xl">{`${startDate} - ${endDate}`}</Text>
        </Flex>
      </Box>
      <Box border="1px" borderColor="gray.300">
        <img
          src={`${chartUrls[0]}&refresh=${refreshKey}`}
          alt="Chart 1"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box border="1px" borderColor="gray.300">
        <img
          src={`${chartUrls[1]}&refresh=${refreshKey}`}
          alt="Chart 2"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box border="1px" borderColor="gray.300">
        <img
          src={`${chartUrls[2]}&refresh=${refreshKey}`}
          alt="Chart 3"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box border="1px" borderColor="gray.300">
        <img
          src={`${chartUrls[3]}&refresh=${refreshKey}`}
          alt="Chart 4"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box border="1px" borderColor="gray.300">
        <img
          src={`${chartUrls[4]}&refresh=${refreshKey}`}
          alt="Chart 5"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Grid>
  );
};

export default GoogleSheetCharts;
