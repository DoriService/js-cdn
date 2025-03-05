import { createProductCarouselInHTML } from "./components/productCarousel.js";
import { removeLastSystemMessage, appendMessage } from "./utils/chatUtils.js";
import { urls } from "./utils/urls.js";

// Send Message Function
export function sendMessage(
  chatInput,
  botData,
  chatMessages,
  sendButton,
  uiText
) {
  const message = chatInput.value.trim();
  if (message) {
    appendMessage("user", message, chatMessages, botData.bot_image);
    chatInput.value = "";

    callStreamingApi(message, botData, chatMessages, sendButton, uiText);
  }
}

// Call API Function with Streaming
export async function callStreamingApi(
  message,
  botData,
  chatMessages,
  sendButton,
  uiText
) {
  // Chat Functionality
  const API_URL = botData.route + urls.streamChat;
  const ASSISTANT_ID = botData.assistant_id;
  // let THREAD_ID = sessionStorage.getItem('thread_id') || null;
  let THREAD_ID = null;

  try {
    sendButton.disabled = true;
    const loadingMessage = appendMessage(
      "bot",
      '<div class="dori-loading-dots"><span></span><span></span><span></span></div>',
      chatMessages,
      botData.bot_image
    );

    const requestBody = {
      assistant_id: ASSISTANT_ID,
      thread_id: THREAD_ID,
      message: message,
    };

    // Remove undefined properties
    Object.keys(requestBody).forEach(
      (key) => requestBody[key] === undefined && delete requestBody[key]
    );

    const queryParams = new URLSearchParams({
      assistant_id: ASSISTANT_ID,
    }).toString();
    const url = `${API_URL}?${queryParams}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Handle 429 error specifically
    if (response.status === 429) {
      removeLastSystemMessage(chatMessages);
      appendMessage(
        "system",
        `⚠️ ${
          uiText.rateLimitError ||
          "You have exceeded the rate limit. Please wait at least 24 hours before trying again."
        }`,
        chatMessages,
        botData.bot_image
      );
      return;
    }

    if (!response.body) {
      throw new Error("ReadableStream not supported in this environment.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let doneReading = false;
    let threadId = THREAD_ID;
    let buffer = ""; // Buffer to accumulate incoming data
    let currentBotMessage = null; // Reference to the current bot message
    let fullMessage = ""; // Variable to store the full message

    while (!doneReading) {
      const { value, done } = await reader.read();
      doneReading = done;
      if (value) {
        const decoded = decoder.decode(value, { stream: true });
        buffer += decoded;

        let boundary = buffer.indexOf("}{");
        while (boundary !== -1) {
          const jsonString = buffer.slice(0, boundary + 1); // Include the first '}'
          buffer = buffer.slice(boundary + 1); // Remove parsed part

          try {
            const parsed = JSON.parse(jsonString);
            if (parsed.thread_id) {
              threadId = parsed.thread_id;
              THREAD_ID = threadId;
              sessionStorage.setItem("thread_id", THREAD_ID);
            } else if (parsed.text) {
              fullMessage += parsed.text; // Accumulate the full message
              if (!currentBotMessage) {
                // Update the loading message instead of creating a new one
                const loadingElement =
                  loadingMessage.querySelector(".dori-loading-dots");
                if (loadingElement) {
                  loadingElement.remove();
                }
                loadingMessage.innerHTML = fullMessage;
                currentBotMessage = loadingMessage;
              } else {
                updateLastAssistantMessage(fullMessage, chatMessages);
              }
            } else if (parsed.products) {
              appendProducts(parsed.products, chatMessages, botData);
            }
          } catch (err) {
            console.error("Failed to parse JSON:", err);
          }

          boundary = buffer.indexOf("}{");
        }

        // Attempt to parse the remaining buffer if it ends with '}'
        if (buffer.endsWith("}")) {
          try {
            const parsed = JSON.parse(buffer);
            if (parsed.thread_id) {
              threadId = parsed.thread_id;
              THREAD_ID = threadId;
              sessionStorage.setItem("thread_id", THREAD_ID);
            } else if (parsed.text) {
              fullMessage += parsed.text; // Accumulate the full message
              if (!currentBotMessage) {
                // Update the loading message instead of creating a new one
                const loadingElement =
                  loadingMessage.querySelector(".dori-loading-dots");
                if (loadingElement) {
                  loadingElement.remove();
                }
                loadingMessage.innerHTML = fullMessage;
                currentBotMessage = loadingMessage;
              } else {
                updateLastAssistantMessage(fullMessage, chatMessages);
              }
            } else if (parsed.products) {
              appendProducts(parsed.products, chatMessages, botData);
            }
            buffer = "";
          } catch (err) {
            console.error("Failed to parse JSON:", err);
            // Keep the buffer for the next read if parsing fails
          }
        }
      }
    }

    // Don't remove the loading message anymore since we reused it
    currentBotMessage = null; // Reset for the next message
  } catch (error) {
    console.error("Error:", error);
    // Capture error in Sentry
    Sentry.captureException(error, {
      extra: {
        message,
        threadId: THREAD_ID,
        assistantId: ASSISTANT_ID,
      },
    });
    sessionStorage.removeItem("thread_id");
    const loadingMessageElement =
      chatMessages.querySelector(".dori-loading-dots");
    if (loadingMessageElement) {
      loadingMessageElement.closest(".dori-message-wrapper").remove();
    }
    appendMessage("system", uiText.error, chatMessages, botData.bot_image);
  } finally {
    sendButton.disabled = false;
  }
}

// Append Products to Chat
function appendProducts(products, chatMessages, botData) {
  const productHTML = createProductCarouselInHTML(products, botData);
  const productContainer = document.createElement("div");
  productContainer.style.width = "100%";
  productContainer.style.margin = "12px 0";
  productContainer.innerHTML = productHTML;
  chatMessages.appendChild(productContainer);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateLastAssistantMessage(newContent, chatMessages) {
  const messages = chatMessages.querySelectorAll(".dori-bot-message");
  if (messages.length === 0) return;

  const lastMessage = messages[messages.length - 1];

  if (typeof marked !== "undefined") {
    const parsedContent = marked.parse(newContent);
    lastMessage.innerHTML = parsedContent;
  } else {
    lastMessage.textContent = newContent;
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
