export const createContainer = (isRTL, customization) => {
  const container = document.createElement("div");
  container.id = "dori-chat-widget-container";
  container.style.direction = isRTL ? "rtl" : "ltr";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style[customization.position.align] = "0";
  container.style.zIndex = "2147483647";
  container.style.width = "400px";
  container.style.height = "100%";
  container.style.right = "0";
  container.style.top = "0";
  container.style.margin = "0";
  container.style.padding = "0";
  container.style.pointerEvents = "none";
  return container;
};
