async function sendToSheets(data: {
  contactDate: string;
  contactSource: string | null;
  contactType: string | null;
  dealerType: string | null;
  contactHowType: string | null;
  contactDetail: string | null;
  userId: string;
}) {
  let response;
  let responseData = null;

  try {
    response = await fetch(
      "https://vercel-backend-jharr35s-projects.vercel.app/api/send-to-sheets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      console.log("Data successfully sent to Google Sheets");
      responseData = await response.json();
    } else {
      console.error("Error sending data to Google Sheets");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  console.log("Send to sheets:", responseData);
  return responseData;
}

export default sendToSheets;
