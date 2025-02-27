import { closeChat } from "../utils/chatUtils.js";

export const createCloseButton = (customization, elements) => {
  const { chatBox, chatButton, container } = elements;
  const closeButton = document.createElement("button");
  closeButton.id = "dori-close-chat";
  closeButton.setAttribute("aria-label", "Close chat");
  closeButton.innerHTML = "&times;";
  closeButton.style.color = window.innerWidth > 768 ? "#666" : "white";

  closeButton.addEventListener("click", () =>
    closeChat(customization, { chatBox, chatButton, container })
  );

  return closeButton;
};
