import { createChatBox } from "./components/chatBox.js";
import { createChatButton } from "./components/chatButton.js";
import { createChatHeader } from "./components/chatHeader.js";
import { createChatInput } from "./components/chatInput.js";
import { createChatInputContainer } from "./components/chatInputConatiner.js";
import { createChatMessages } from "./components/chatMessages.js";
import { createCloseButton } from "./components/closeButton.js";
import { createContainer } from "./components/container.js";
import { createPopupMessage } from "./components/popupMessage.js";
import { createPoweredBy } from "./components/poweredBy.js";
import { createSendButton } from "./components/sendButton.js";

import {
  buttonStyles,
  customizedStyle,
  messageStyles,
  popupStyles,
} from "./styles.js";
import { addViewportMeta, injectStyles } from "./utils/domUtils.js";
import { markDownParser } from "./utils/markDownParser.js";

import { sendMessage } from "./api.js";

export async function initChatWidget(botData) {
  addViewportMeta();

  // Load marked.js for Markdown parsing
  await markDownParser();

  const customization = botData.customization || {
    appearance: "sidebar",
    theme: "light",
    theme_color: "#1b5556",
    position: {
      align: "right",
      side_spacing: 20,
      bottom_spacing: 20,
    },
  };

  const uiText = botData.texts;
  const isRTL = botData.texts.isRTL ?? false; // Default to true if not specified

  // Inject Styles
  injectStyles(customizedStyle(customization));

  // Add styles for different button states
  injectStyles(buttonStyles);

  // Add styles for popup message
  injectStyles(popupStyles);

  // Handle RTL text direction for messages
  injectStyles(messageStyles(isRTL));

  // Create popup message element
  const popupMessage = createPopupMessage(
    botData.wellcomeMessage,
    uiText.popupMessage
  );

  const chatBox = createChatBox(customization);

  // Create Chat Widget Elements
  const container = createContainer(isRTL, customization);

  const chatMessages = createChatMessages();
  const sendButton = createSendButton(isRTL, uiText.buttonText);

  // chat button
  const chatButton = createChatButton(
    customization,
    botData,
    {
      popupMessage,
      chatBox,
      container,
      chatMessages,
      sendButton
    },
    uiText
  );

  // Add "Powered by Dori" footer
  const poweredBy = createPoweredBy(customization);

  const chatInputContainer = createChatInputContainer();
  const chatInput = createChatInput(uiText.inputPlaceholder);


  chatInputContainer.appendChild(chatInput);
  chatInputContainer.appendChild(sendButton);

  const chatHeader = createChatHeader(uiText.chatWithUs);

  const closeButton = createCloseButton(customization, {
    chatBox,
    chatButton,
    container,
  });
  chatHeader.appendChild(closeButton);

  chatBox.appendChild(chatHeader);
  chatBox.appendChild(chatMessages);
  chatBox.appendChild(poweredBy);
  chatBox.appendChild(chatInputContainer);

  container.appendChild(chatBox);

  document.body.appendChild(container);
  document.body.appendChild(chatButton);
  document.body.appendChild(popupMessage);

  // Add initial load animation with delay
  requestAnimationFrame(() => {
    setTimeout(() => {
      chatButton.classList.add("initial-load");
      setTimeout(() => {
        chatButton.classList.remove("initial-load");
        // Show popup message after initial animation only if chat hasn't been opened yet
        setTimeout(() => {
          if (
            !chatBox.classList.contains("show") &&
            !sessionStorage.getItem("chatInteracted")
          ) {
            popupMessage.classList.add("show");
          }
        }, 5000); // Show popup 5 seconds after initial animation
      }, 4000);
    }, 3000);
  });

  // Event Listeners

  sendButton.addEventListener("click", () =>
    sendMessage(chatInput, botData, chatMessages, sendButton, uiText)
  );
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage(chatInput, botData, chatMessages, sendButton, uiText);
    }
  });

  // Expose scrollCarousel and trackProductClick globally
  window.scrollCarousel = function (container, distance) {
    const carousel = container.querySelector(".dori-product-carousel");
    carousel.scrollBy({ left: distance, behavior: "smooth" });
  };

  window.trackProductClick = function (productName, productPrice) {
    try {
      if (!botData || !botData.sharing_id) {
        console.warn("botData not properly initialized");
        return;
      }
      console.log("Product click tracked successfully");
    } catch (error) {
      console.error("Error tracking product click:", error);
      Sentry.captureException(error, {
        extra: {
          context: "trackProductClick",
          productName,
          productPrice,
        },
      });
    }
  };

  // Add touch event handlers to prevent page scroll when scrolling chat
  chatMessages.addEventListener(
    "touchmove",
    function (e) {
      e.stopPropagation();
    },
    { passive: true }
  );

  // Prevent body scroll when chat is open on mobile
  function toggleBodyScroll(disable) {
    if (disable) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }

  // Handle resize events
  window.addEventListener("resize", function () {
    if (window.innerWidth > 480) {
      toggleBodyScroll(false);
    } else if (chatBox.classList.contains("show")) {
      toggleBodyScroll(true);
    }
  });
}
