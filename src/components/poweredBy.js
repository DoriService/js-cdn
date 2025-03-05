export const createPoweredBy = (customization, botData) => {
  // Add "Powered by Dori" footer
  const poweredBy = document.createElement("div");
  poweredBy.id = "dori-powered-by";
  poweredBy.style.display = "flex";
  poweredBy.style.justifyContent = "center"; // Center horizontally
  poweredBy.style.alignItems = "center"; // Center vertically

  const poweredByLink = document.createElement("a");
  poweredByLink.href = botData.logo_address_url;
  poweredByLink.target = "_blank";
  poweredByLink.style.textDecoration = "none";
  poweredByLink.style.display = "flex";
  poweredByLink.style.direction = "ltr";
  poweredByLink.style.alignItems = "center";
  poweredByLink.style.justifyContent = "center";
  poweredByLink.innerHTML = `<span style="color: ${
    customization.theme === "light" ? "#666" : "#9CA3AF"
  }">Powered by</span>&nbsp;&nbsp;<img src=${botData.logo_url} width="${
    botData.country === "iran" ? 60 : 36
  }" height="18" alt="${botData.logo_alt}">`;

  poweredBy.appendChild(poweredByLink);

  return poweredBy;
};
