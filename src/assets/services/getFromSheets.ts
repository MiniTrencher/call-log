import axios from "axios";

interface GoogleSheetRow {
  [key: string]: unknown;
}

export const getFromSheets = async (range: string): Promise<string | null> => {
  try {
    const response = await axios.get(
      "https://vercel-backend-jharr35s-projects.vercel.app/api/get-from-sheets",
      {
        params: { range },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return null;
  }
};

export const filterSheets = async (
  startDate: string,
  endDate: string
): Promise<GoogleSheetRow[] | null> => {
  try {
    const response = await axios.get(
      "https://vercel-backend-jharr35s-projects.vercel.app/api/get-filtered-data",
      {
        params: { startDate, endDate },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return null;
  }
};
