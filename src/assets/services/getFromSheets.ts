import axios from "axios";

const getFromSheets = async (range: string): Promise<string | null> => {
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

export default getFromSheets;
