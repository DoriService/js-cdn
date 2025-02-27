// Add viewport meta function before initChatWidget
export function addViewportMeta() {
  // Check if viewport meta tag already exists
  let viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    // Create and add viewport meta tag if it doesn't exist
    viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewport);
  }
}

export function injectStyles(styles) {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);
}
