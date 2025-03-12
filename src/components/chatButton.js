import { closeChat, openChat } from "../utils/chatUtils.js";
import { arrowIcon } from "./arrowIcon.js";
import { chatIcon } from "./chatIcon.js";

const chatButtonHTML = `
            <span class="olm6i5 JT3_zV _0xLoFW u9KIT8 FCIprz uEg2FS _2Pvyxl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_990_39490)">
                        <path d="M13.4733 5H21V18.2102L16.14 22V18.2102H6V12.2941" stroke="currentColor" stroke-width="2.03704" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M10 5.00002C7.74328 5.00002 6.00049 3.25689 6.00049 1C6.00049 3.25689 4.25672 5.00021 2 5.00021C4.25672 5.00021 5.9997 6.74311 5.9997 9C5.9997 6.74311 7.74328 5.00002 10 5.00002Z" stroke="currentColor" stroke-width="2.03704" stroke-linejoin="round"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_990_39490">
                            <rect width="24" height="24"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </span>
        `;

export const createChatButton = (customization, botData, elements, uiText , avatarSrc) => {
  const { popupMessage, chatBox, container, chatMessages , sendButton } = elements;
  const chatButton = document.createElement("button");
  chatButton.id = "dori-chat-button";
  chatButton.setAttribute("aria-label", "Open chat");
  chatButton.style[
    customization.position.align
  ] = `${customization.position.side_spacing}px`;
  chatButton.style.bottom = `${customization.position.bottom_spacing}px`;
  chatButton.style.pointerEvents = "auto";
  chatButton.style.zIndex = "2147483647";

  chatButton.className =
    "BXKCcR r9BRio Md_Vex NN8L-8 heWLCX LyRfpJ VWL_Ot _13ipK_ _5Yd-hZ Uwsb06 Wy3rmK DikYjn uyF88V df4QKn kIgovE zfa-svg-animation-icon _6MANVh EmWJce EvwuKo";
  chatButton.setAttribute("type", "button");
  chatButton.setAttribute("aria-label", "Fashion Assistant");
  chatButton.setAttribute("aria-expanded", "false");
  chatButton.setAttribute("tabindex", "0");
  chatButton.setAttribute("aria-haspopup", "dialog");
  chatButton.setAttribute("aria-controls", ":rad:");
  chatButton.style.position = "fixed";
  chatButton.style.right = "0px";
  chatButton.style.top = "50%";
  chatButton.style.transform = "translateY(-50%)";
  chatButton.style.borderRadius = "12px 0 0 12px";
  chatButton.style.bottom = "auto";
  chatButton.style.zIndex = "2147483647";
  chatButton.style.backgroundColor = "var(--dori-primary-color)";
  chatButton.style.cursor = "pointer";
  chatButton.style.width = "48px";
  chatButton.style.height = "48px";
  chatButton.style.display = "flex";
  chatButton.style.alignItems = "center";
  chatButton.style.justifyContent = "center";
  chatButton.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
  chatButton.style.transition = "right 0.3s ease";

  // Set initial icon and class
  chatButton.innerHTML = chatIcon;
  chatButton.classList.add("chat-mode");

  // Store icons on the button element for easy access
  chatButton.dataset.chatIcon = chatIcon;
  chatButton.dataset.arrowIcon = arrowIcon;

  chatButton.innerHTML = chatButtonHTML;

  // Hide popup when chat is opened and mark as interacted
  chatButton.addEventListener("click", () => {
    popupMessage.classList.remove("show");
    sessionStorage.setItem("chatInteracted", "true");
  });

  chatButton.addEventListener("click", () => {
    // Toggle chat box
    if (chatBox.classList.contains("show")) {
      closeChat(customization, { chatBox, chatButton, container });
    } else {
      openChat(
        customization,
        chatMessages,
        botData,
        {
          chatBox,
          chatButton,
          container,
          sendButton
        },
        uiText,
        avatarSrc
      );
    }
  });

  return chatButton;
};
