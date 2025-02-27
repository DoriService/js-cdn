export const createChatHeader = (chatWithUs) => {
  const chatHeader = document.createElement("div");
  chatHeader.id = "dori-chat-header";
  chatHeader.style.backgroundColor =
    window.innerWidth > 768
      ? "var(--dori-creamy)"
      : "var(--dori-primary-color)";
  chatHeader.style.color = window.innerWidth > 768 ? "#666" : "white";
  chatHeader.innerHTML = `<span>${chatWithUs}</span>`;
  return chatHeader;
};
