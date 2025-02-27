import { callStreamingApi } from "../api.js";
// Append Message to Chat
export function appendMessage(sender, content, chatMessages, bot_image) {
  try {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("dori-message-wrapper");

    const messageElement = document.createElement("div");
    messageElement.classList.add("dori-message");
    if (sender === "user") {
      messageWrapper.classList.add("dori-user-message-wrapper");
      messageElement.classList.add("dori-user-message");
    } else if (sender === "bot") {
      messageWrapper.classList.add("dori-bot-message-wrapper");
      messageElement.classList.add("dori-bot-message");

      // Create avatar image
      const avatar = document.createElement("img");
      avatar.classList.add("dori-avatar");
      avatar.src =
        bot_image ||
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
      avatar.alt = "Bot Avatar";

      messageWrapper.appendChild(avatar);
    } else if (sender === "system") {
      messageElement.classList.add("dori-system-message");
    }
    // Check if marked.js is loaded
    if (typeof marked !== "undefined") {
      try {
        const htmlContent = marked.parse(content);
        messageElement.innerHTML = htmlContent;
      } catch (error) {
        Sentry.captureException(error, {
          extra: {
            context: "Markdown parsing",
            content,
          },
        });
        messageElement.textContent = content; // Fallback to plain text
      }
    }
    messageWrapper.appendChild(messageElement);
    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageElement;
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        context: "appendMessage",
        sender,
        content,
      },
    });
  }
}

// Remove Last System Message
export function removeLastSystemMessage(chatMessages) {
  const messages = chatMessages.querySelectorAll(".dori-system-message");
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.parentNode === chatMessages) {
      chatMessages.removeChild(lastMessage);
    } else {
      lastMessage.remove();
    }
  }
}

// Close Chat Function
export function closeChat(customization, elements) {
  const { chatBox, chatButton, container } = elements;
  chatBox.classList.remove("show");
  if (customization.appearance === "sidebar") {
    chatButton.style.right = "0";
    chatButton.innerHTML = chatButton.dataset.chatIcon;
    chatButton.classList.add("chat-mode");
    chatButton.setAttribute("aria-label", "Open chat");
  }
  setTimeout(() => {
    chatBox.style.display = "none";
    chatBox.style.pointerEvents = "none";
    container.style.pointerEvents = "none";
    if (customization.appearance === "sidebar") {
      document.body.style.overflow = "";
    }
  }, 300);
  chatBox.setAttribute("aria-hidden", "true");
}

// Open Chat Function
export function openChat(
  customization,
  chatMessages,
  botData,
  elements,
  uiText
) {
  const { chatBox, chatButton, container, sendButton } = elements;
  container.style.pointerEvents = "auto";
  chatBox.style.pointerEvents = "auto";
  chatBox.style.display = "flex";
  requestAnimationFrame(() => {
    chatBox.classList.add("show");
    if (customization.appearance === "sidebar") {
      chatButton.style.right = "400px";
      chatButton.innerHTML = chatButton.dataset.arrowIcon;
      chatButton.classList.remove("chat-mode");
      chatButton.setAttribute("aria-label", "Close chat");
    }
  });
  chatBox.setAttribute("aria-hidden", "false");

  // Handle positioning based on appearance mode
  document.body.style.overflow = "hidden"; // Prevent body scroll when sidebar is open
  if (chatMessages.childElementCount === 0) {
    appendMessage("bot", botData.wellcomeMessage, chatMessages, botData.bot_image);
    if (botData.suggestedReply) {
      try {
        // Try to parse as JSON in case it's a stringified array
        const replies = JSON.parse(botData.suggestedReply);

        // If it's an array, display multiple suggested replies
        if (Array.isArray(replies)) {
          replies.forEach((reply) => {
            createSuggestedReplyElement(
              reply,
              chatMessages,
              botData,
              sendButton,
              uiText
            );
          });
        }
      } catch (e) {
        // If parsing fails, treat it as a single reply string
        createSuggestedReplyElement(
          botData.suggestedReply,
          chatMessages,
          botData,
          sendButton,
          uiText
        );
      }

      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
}

function createSuggestedReplyElement(
  replyText,
  chatMessages,
  botData,
  sendButton,
  uiText
) {
  const suggestedReplyElement = document.createElement("div");
  suggestedReplyElement.id = "dori-suggested-reply";
  suggestedReplyElement.textContent = replyText;
  suggestedReplyElement.addEventListener("click", () => {
    appendMessage("user", replyText, chatMessages,botData.bot_image);
    const allSuggestions = chatMessages.querySelectorAll(
      "#dori-suggested-reply"
    );
    allSuggestions.forEach((suggestion) => {
      suggestion.style.display = "none";
    });
    callStreamingApi(replyText, botData, chatMessages, sendButton, uiText);
  });
  chatMessages.appendChild(suggestedReplyElement);
}
