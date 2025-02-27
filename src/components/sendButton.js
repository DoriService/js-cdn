export const createSendButton = (isRTL, buttonText) => {
  const sendButton = document.createElement("button");
  sendButton.id = "dori-send-button";
  sendButton.textContent = buttonText;
  sendButton.setAttribute("aria-label", "Send message");
  sendButton.style.margin = isRTL ? "0 10px 0 0" : "0 0 0 10px";
  return sendButton;
};
