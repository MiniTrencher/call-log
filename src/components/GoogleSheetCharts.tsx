import { Box, Grid } from "@chakra-ui/react";

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

  return (
    <Grid
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gridGap={10}
      rowGap={50}
    >
      <Box gridColumn="2">
        <img
          src={`${chartUrls[0]}&refresh=${refreshKey}`}
          alt="Chart 1"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box>
        <img
          src={`${chartUrls[1]}&refresh=${refreshKey}`}
          alt="Chart 2"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box>
        <img
          src={`${chartUrls[2]}&refresh=${refreshKey}`}
          alt="Chart 3"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box>
        <img
          src={`${chartUrls[3]}&refresh=${refreshKey}`}
          alt="Chart 4"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box>
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
