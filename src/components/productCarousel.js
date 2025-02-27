import { addUTMToChatWidgetUrl } from "../utils/utm.js";
// Create Product HTML with Carousel
export function createProductCarouselInHTML(products) {
  try {
    return `
                <div style="width: -webkit-fill-available ;margin: 0 -23px; background: var(--dori-message-bg-bot); border-top: 1px solid var(--dori-product-border); border-bottom: 1px solid var(--dori-product-border);">
                    <div style="overflow-x: auto; scrollbar-width: thin; scrollbar-color: var(--dori-scrollbar-thumb) var(--dori-scrollbar-bg);">
                        <div style="display: flex; gap: 8px; padding: 16px;">
                            ${products
                              .map(
                                (product) => `
                                <a href="${addUTMToChatWidgetUrl(product.url)}" 
                                   target="_blank"
                                   rel="noopener noreferrer" 
                                   onclick="try { window.trackProductClick('${product.name.replace(
                                     /'/g,
                                     "\\'"
                                   )}', ${
                                  product.price
                                }); } catch(e) { console.error('Error in onclick:', e); }"
                                   style="
                                       min-width: 140px;
                                       max-width: 140px;
                                       flex-shrink: 0;
                                       border-radius: 8px;
                                       overflow: hidden;
                                       border: 1px solid var(--dori-product-border);
                                       background: var(--dori-product-bg);
                                       box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
                                       transition: all 0.2s;
                                       display: flex;
                                       flex-direction: column;
                                       text-decoration: none;
                                   "
                                   onmouseover="this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)';this.style.transform='translateY(-2px)';"
                                   onmouseout="this.style.boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px';this.style.transform='none';this.style.background='var(--dori-product-bg)'">
                                    <img src="${product.image}" 
                                         alt="${product.name}" 
                                         style="object-fit: cover; height: 100px; width: 100%;">
                                    <div style="padding: 8px; flex: 1; display: flex; flex-direction: column;">
                                        <div style="font-size: 12px; font-weight: 600; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; color: var(--dori-text-color); direction: ${
                                          botData.texts.isRTL ? "rtl" : "ltr"
                                        }">
                                            ${product.name}
                                        </div>
                                        <div style="font-size: 12px; color: #3182CE; margin-top: auto; direction: ${
                                          botData.texts.isRTL ? "rtl" : "ltr"
                                        }">
                                            ${
                                              botData.texts.isRTL
                                                ? `${Number(product.price)
                                                    .toFixed(0)
                                                    .replace(
                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                      ","
                                                    )} ${botData.currency}`
                                                : `${botData.currency} ${Number(
                                                    product.price
                                                  )
                                                    .toFixed(0)
                                                    .replace(
                                                      /\B(?=(\d{3})+(?!\d))/g,
                                                      ","
                                                    )}`
                                            }
                                        </div>
                                    </div>
                                </a>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `;
  } catch (error) {
    Sentry.captureException(error, {
      extra: {
        context: "createProductHTML",
        products,
      },
    });
    return ""; // Return empty string on error
  }
}
