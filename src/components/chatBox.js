export const createChatBox = (customization) => {
  const chatBox = document.createElement("div");
  chatBox.id = "dori-chat-box";
  chatBox.setAttribute("aria-hidden", "true");
  chatBox.style.display = "none"; // Initially hidden
  chatBox.style.backgroundColor =
    customization.theme === "light" ? "#FFFFFF" : "#1A202C";
  chatBox.style.color = customization.theme === "light" ? "#2D3748" : "#FFFFFF";

  chatBox.style.bottom = `${customization.position.bottom_spacing}px`;
  chatBox.style.pointerEvents = "none";

  return chatBox;
};
