export const createPopupMessage = (wellcomeMessage, message) => {
  // Create popup message element
  const popupMessage = document.createElement("div");
  popupMessage.className = "dori-popup-message";
  popupMessage.textContent =
    wellcomeMessage || message || "Hello! What are you looking for?";

  return popupMessage;
};
