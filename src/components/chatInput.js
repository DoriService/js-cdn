export const createChatInput = (inputPlaceholder) => {
  const chatInput = document.createElement("input");
  chatInput.id = "dori-chat-input";
  chatInput.type = "text";
  chatInput.placeholder = inputPlaceholder;
  chatInput.setAttribute("aria-label", "Type your message");
  return chatInput;
};
