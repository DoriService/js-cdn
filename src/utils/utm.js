export const addUTMToChatWidgetUrl = (url) => {
  const source = "dori";
  const medium = "dori_widget";
  const campaign = "dori_product_recommendation";

  // Check if the URL already contains a query string
  const separator = url.includes("?") ? "&" : "?";

  return `${url}${separator}utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
};
