import { initChatWidget } from "./ChatWidget.js";
import { initSentry } from "./utils/sentry.js";
import { fetchBotDataBySharingID } from "./utils/apiUtils.js";

export const script = async (sharingId, sentrySrc, markdownSrc, avatarSrc) => {
  // Initialize Sentry before other operations
  await initSentry(sentrySrc);

  try {
    const botData = await fetchBotDataBySharingID(sharingId);
    botData.data.sharing_id = sharingId;
    if (botData.error) {
      errorMessage.innerHTML = botData.error;
    } else if (botData.data) {
      await initChatWidget(botData.data, markdownSrc, avatarSrc);
    } else {
      errorMessage.innerHTML = "No data found";
    }
  } catch (error) {
    console.error("Error fetching bot data:", error);
    Sentry.captureException(error);
  }
};
