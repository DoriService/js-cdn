import { initChatWidget } from "./ChatWidget.js";
import { initSentry } from "./utils/sentry.js";
import { fetchBotDataBySharingID } from "./utils/apiUtils.js";

(async function () {
  // Initialize Sentry before other operations
  await initSentry();

  try {
    const botData = await fetchBotDataBySharingID(SHARING_ID);
    botData.data.sharing_id = SHARING_ID;
    if (botData.error) {
      errorMessage.innerHTML = botData.error;
    } else if (botData.data) {
      await initChatWidget(botData.data);
    } else {
      errorMessage.innerHTML = "No data found";
    }
  } catch (error) {
    console.error("Error fetching bot data:", error);
    Sentry.captureException(error);
  }
})();
