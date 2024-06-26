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
      return true;
    } else {
      console.error("Error sending data to Google Sheets");
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return false;
}

export default sendToSheets;
