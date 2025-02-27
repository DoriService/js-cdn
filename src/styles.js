export const messageStyles = (isRTL) => `
${
  isRTL
    ? `
    .dori-user-message,
    .dori-bot-message,
    .dori-system-message {
        text-align: right;
        direction: rtl;
    }
`
    : ""
}
`;
export const popupStyles = `
            .dori-popup-message {
                position: fixed;
                background-color: white;
                color: #333;
                padding: 12px 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                font-size: 14px;
                max-width: 200px;
                z-index: 4;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                font-family: 'Poppins', sans-serif;
                right: 20px;
                top: calc(50% - 40px);
                transform: translateY(-100%);
            }

            .dori-popup-message::after {
                content: '';
                position: absolute;
                bottom: -6px;
                right: 20px;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid white;
            }

            .dori-popup-message.show {
                opacity: 1;
            }
        `;

export const buttonStyles = `
#dori-chat-button.chat-mode:hover .chat-icon svg {
    animation: buttonRotate 1.2s ease;
}

#dori-chat-button.chat-mode:hover .chat-icon path:last-child {
    animation: starScale 1.2s ease 1.2s;
}

#dori-chat-button.chat-mode.initial-load .chat-icon svg {
    animation: initialLoad 2s ease;
}

#dori-chat-button.chat-mode.initial-load .chat-icon path:last-child {
    animation: starScale 2s ease 2s;
}

.arrow-icon svg {
    animation: none !important;
}

.arrow-icon path {
    animation: none !important;
}
`;

export const customizedStyle = (customization) => `
        :root {
            --dori-primary-color: ${customization.theme_color};
            --dori-hover-color: ${customization.theme_color}dd;
            --dori-creamy: ${
              customization.theme === "light" ? "#F6EEEB" : "#1F2937"
            };
            --dori-text-color: ${
              customization.theme === "light" ? "#2D3748" : "#F9FAFB"
            };
            --dori-input-bg: ${
              customization.theme === "light" ? "#F6EEEB" : "#1F2937"
            };
            --dori-input-text: ${
              customization.theme === "light" ? "#2D3748" : "#F9FAFB"
            };
            --dori-input-border: ${
              customization.theme === "light" ? "#ced4da" : "#374151"
            };
            --dori-message-bg-user: var(--dori-primary-color);
            --dori-message-bg-bot: ${
              customization.theme === "light" ? "#E4E6EA" : "#2D3748"
            };
            --dori-message-text-bot: ${
              customization.theme === "light" ? "#333" : "#F9FAFB"
            };
            --dori-product-bg: ${
              customization.theme === "light" ? "#F6EEEB" : "#1F2937"
            };
            --dori-product-border: ${
              customization.theme === "light" ? "#e9ecef" : "#374151"
            };
            --dori-product-text: ${
              customization.theme === "light" ? "#333" : "#F9FAFB"
            };
            --dori-scrollbar-bg: ${
              customization.theme === "light" ? "#f1f1f1" : "#1F2937"
            };
            --dori-scrollbar-thumb: ${
              customization.theme === "light" ? "#c1c1c1" : "#4B5563"
            };
            --dori-scrollbar-hover: ${
              customization.theme === "light" ? "#a8a8a8" : "#6B7280"
            };
            --dori-powered-by-bg: ${
              customization.theme === "light" ? "#eeeaeb" : "#1F2937"
            };
            --dori-powered-by-text: ${
              customization.theme === "light" ? "#666" : "gray"
            };
        }

        /* Sidebar Button Styles */
        .BXKCcR {
            background-color: var(--dori-primary-color);
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            transition: background-color 0.3s ease;
        }

        .BXKCcR svg {
            transform-origin: 100% 75%;
        }

        @keyframes buttonRotate {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(20deg); }
            100% { transform: rotate(0deg); }
        }

        @keyframes starScale {
            0% { transform: scale(1); }
            50% { transform: scale(0.7); }
            100% { transform: scale(1); }
        }

        @keyframes initialLoad {
            0% { transform: rotate(20deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }

        .BXKCcR:hover {
            background-color: var(--dori-hover-color);
        }

        .BXKCcR:hover svg {
            animation: buttonRotate 1.2s ease;
        }

        .BXKCcR:hover path:last-child {
            animation: starScale 1.2s ease 1.2s;  /* Start after button rotation completes */
        }

        .BXKCcR.initial-load svg {
            animation: initialLoad 2s ease;
        }

        .BXKCcR.initial-load path:last-child {
            animation: starScale 2s ease 2s;  /* Start after initial rotation completes */
        }

        .olm6i5 {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

        /* Chat Widget Container */
        #dori-chat-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-family: 'Poppins', sans-serif;
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        /* Chat Button */
        #dori-chat-button {
            background-color: var(--dori-primary-color);
            z-index: 2147483647;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            position: fixed;
            bottom:20px;
            right:20px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: background-color 0.3s, transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: auto;
        }

        #dori-chat-button:hover {
            background-color: var(--dori-hover-color);
            transform: scale(1.05);
        }

        /* Chat Box Styles */
        #dori-chat-box {
            width: ${
              customization.appearance === "sidebar" ? "400px" : "360px"
            };
            height: ${
              customization.appearance === "sidebar" ? "100dvh" : "65vh"
            };
            max-height: ${
              customization.appearance === "sidebar" ? "100dvh" : "600px"
            };
            min-height: ${
              customization.appearance === "sidebar" ? "100dvh" : "350px"
            };
            border-radius: ${
              customization.appearance === "sidebar" ? "0" : "16px"
            };
            background-color: var(--dori-creamy);
            color: var(--dori-text-color);
            box-shadow: ${
              customization.theme === "light"
                ? "rgba(0,0,0,0.1) 0 6px 20px"
                : "rgba(0,0,0,0.4) 0 8px 24px"
            };
            display: none; /* Initially hidden */
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: ${
              customization.appearance === "sidebar"
                ? "translateX(100%)"
                : "translateY(20px)"
            };
            transition: opacity 0.3s ease, transform 0.3s ease;
            position: fixed;
            top: ${customization.appearance === "sidebar" ? "0" : "auto"};
            bottom: ${
              customization.appearance === "sidebar"
                ? "0"
                : `${customization.position.bottom_spacing}px`
            };
            right: ${customization.appearance === "sidebar" ? "0" : "auto"};
            margin: 0;
            padding: 0;
            z-index: 2147483646;
            pointer-events: none; /* Initially no pointer events */
        }

        #dori-chat-box.show {
            opacity: 1;
            transform: ${
              customization.appearance === "sidebar"
                ? "translateX(0)"
                : "translateY(0)"
            };
            pointer-events: all; /* Enable pointer events when shown */
        }

        #dori-chat-header {
            background-color: var(--dori-primary-color); 
            color: white;
            padding: 20px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 1.1em;
            border-bottom: ${
              customization.theme === "light" ? "none" : "1px solid #374151"
            };
        }

        #dori-close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 1px;
            transition: transform 0.2s ease;
        }

        #dori-close-chat:hover {
            transform: scale(1.2);
        }

        #dori-chat-box-messages {
            direction: ltr;
            flex: 1;
            padding: 24px;
            background-color: var(--dori-creamy);
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            height: ${
              customization.appearance === "sidebar"
                ? "calc(100dvh - 130px)"
                : "auto"
            };
        }

        .dori-message {
            max-width: 85%;
            padding: 12px 14px;
            border-radius: 18px;
            animation: doriMessageFadeIn 0.3s ease;
            line-height: 1.4;
            word-wrap: break-word;
            font-size: 14px;
        }

        @keyframes doriMessageFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .dori-user-message {
            background-color: var(--dori-primary-color);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .dori-bot-message {
            background-color: var(--dori-message-bg-bot);
            color: var(--dori-message-text-bot);
            align-self: flex-start;
            border-top-left-radius: 4px;
        }

        .dori-system-message {
            color: var(--dori-message-text-bot);
            align-self: center;
            border-radius: 12px;
            font-style: italic;
            padding: 8px 12px;
        }

        #dori-chat-input-container {
            display: flex;
            padding: 5px 13px;
            background-color: var(--dori-input-bg);
            border-top: 1px solid var(--dori-input-border);
            position: ${
              customization.appearance === "sidebar" ? "sticky" : "relative"
            };
            bottom: 0;
            width: 100%;
            box-sizing: border-box;
        }

        #dori-chat-input {
            flex: 1;
            padding: 12px 18px;
            border: 1px solid var(--dori-input-border);
            border-radius: 25px;
            font-size: 15px;
            background-color: var(--dori-input-bg);
            color: var(--dori-input-text);
            transition: border-color 0.2s, box-shadow 0.2s;
        }

        #dori-chat-input:focus {
            outline: none;
            border-color: var(--dori-primary-color);
            box-shadow: 0 0 0 3px ${
              customization.theme === "light"
                ? `${customization.theme_color}1a`
                : `${customization.theme_color}33`
            };
        }

        #dori-send-button {
            background-color: var(--dori-primary-color);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.2s;
            font-weight: 500;
            font-size: 15px;
        }

        #dori-send-button:hover {
            background-color: var(--dori-hover-color);
        }

        #dori-send-button:active {
            transform: translateY(0);
        }

        /* Product Carousel Improvements */
        .dori-product-carousel {
            display: flex;
            overflow-x: auto;
            scroll-behavior: smooth;
            gap: 12px;
            padding: 12px 4px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            position: relative;
        }

        .dori-product-item {
            min-width: 200px;
            max-width: 200px;
            border: 1px solid var(--dori-product-border);
            border-radius: 12px;
            padding: 12px;
            background-color: var(--dori-product-bg);
            transition: transform 0.2s, box-shadow 0.2s;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: ${
              customization.theme === "light"
                ? "rgba(0, 0, 0, 0.05) 0px 2px 4px"
                : "rgba(0, 0, 0, 0.2) 0px 2px 4px"
            };
        }

        .dori-product-item:hover {
            transform: translateY(-2px);
          
        }

        .dori-product-image {
            width: 100%;
            height: 140px;
            border-radius: 8px;
            object-fit: cover;
            margin-bottom: 8px;
        }

        .dori-product-info {
            width: 100%;
            padding: 8px 0;
        }

        .dori-product-name {
            font-weight: 600;
            margin: 4px 0;
            color: var(--dori-product-text);
            font-size: 14px;
            line-height: 1.4;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }

        .dori-product-price {
            font-weight: 600;
            color: var(--dori-primary-color);
            font-size: 15px;
            margin-top: 4px;
        }

        .dori-carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 32px;
            height: 32px;
            background-color: var(--dori-primary-color);
            border: none;
            color: white;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: background-color 0.3s, opacity 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            font-size: 14px;
        }

        .dori-carousel-button:hover {
            background-color: var(--dori-hover-color);
            opacity: 1;
        }

        .dori-carousel-button.left {
            left: 4px;
        }

        .dori-carousel-button.right {
            right: 4px;
        }

        /* Scrollbar Styling */
        #dori-chat-box-messages::-webkit-scrollbar {
            width: 8px;
        }

        #dori-chat-box-messages::-webkit-scrollbar-track {
            background: var(--dori-scrollbar-bg);
            border-radius: 4px;
        }

        #dori-chat-box-messages::-webkit-scrollbar-thumb {
            background: var(--dori-scrollbar-thumb);
            border-radius: 4px;
        }

        #dori-chat-box-messages::-webkit-scrollbar-thumb:hover {
            background: var(--dori-scrollbar-hover);
        }

        /* Markdown Styling */
        .dori-message h1,
        .dori-message h2,
        .dori-message h3,
        .dori-message h4,
        .dori-message h5,
        .dori-message h6 {
            margin: 0.3em 0;
            line-height: 1.3;
        }

        .dori-message p {
            margin: 0.3em 0;
            line-height: 1.4;
        }

        .dori-message ul,
        .dori-message ol {
            padding-left: 1.2em;
            margin: 0.3em 0;
        }

        .dori-message li {
            margin: 0.2em 0;
            line-height: 1.4;
        }

        .dori-message strong {
            font-weight: 600;
        }

        .dori-message em {
            font-style: italic;
        }

        .dori-message a {
            color: #4a90e2;
            text-decoration: none;
        }

        .dori-message a:hover {
            text-decoration: underline;
        }

        .dori-message blockquote {
            border-left: 3px solid #ccc;
            padding-left: 0.8em;
            margin: 0.4em 0;
            color: #666;
        }

        .dori-message code {
            background-color: ${
              customization.theme === "light" ? "#f5f5f5" : "#2D3748"
            };
            padding: 1px 4px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 13px;
            color: ${customization.theme === "light" ? "#333" : "#E2E8F0"};
        }

        .dori-message pre {
            background-color: ${
              customization.theme === "light" ? "#f5f5f5" : "#2D3748"
            };
            padding: 8px;
            border-radius: 4px;
            overflow-x: auto;
            margin: 0.4em 0;
            color: ${customization.theme === "light" ? "#333" : "#E2E8F0"};
        }

        .dori-message pre code {
            padding: 0;
            background: none;
            font-size: 13px;
            line-height: 1.4;
        }

        /* Message Wrapper */
        .dori-message-wrapper {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10px;
        }

        /* User Message Wrapper */
        .dori-user-message-wrapper {
            flex-direction: row-reverse;
        }

        .dori-user-message-wrapper .dori-message {
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 18px;
        }

        .dori-user-message-wrapper .dori-avatar {
            margin-left: 8px;
        }

        /* Bot Message Wrapper */
        .dori-bot-message-wrapper {
            flex-direction: row;
        }

        .dori-bot-message-wrapper .dori-message {
            border-radius: 18px;
            border-top-left-radius: 4px;
        }

        .dori-bot-message-wrapper .dori-avatar {
            margin-right: 8px;
        }

        /* Avatar */
        .dori-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }

        /* Suggested Reply */
        #dori-suggested-reply {
            background-color: #f0f0f0;
            color: #555;
            padding: 10px 15px;
            margin-top: 6px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            border-radius: 25px;
            display: inline-block;
            cursor: pointer;
            align-self: center;
            transition: background-color 0.3s, box-shadow 0.3s;
            max-width: 80%;
            text-align: center;
        }

        #dori-suggested-reply:hover {
            background-color: #e0e0e0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        /* "Powered by Dori" Styles */
        #dori-powered-by {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 20px;
            font-size: 12px;
            color: var(--dori-powered-by-text);
            text-align: center;
            background-color: var(--dori-powered-by-bg);
            border-top: ${
              customization.theme === "light" ? "none" : "1px solid #374151"
            };
        }

        /* Responsive Design */
        @media screen and (max-width: 480px) {
            #dori-chat-box {
                width: 100% !important;
                height: 100% !important;
                max-height: 100% !important;
                min-height: 100% !important;
                border-radius: 0 !important;
                margin: 0 !important;
                left: 0 !important;
                right: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                position: fixed !important;
                
                /* Add flex layout to ensure proper content positioning */
                display: flex !important;
                flex-direction: column !important;
            }

            #dori-chat-box-messages {
                /* Allow messages container to scroll independently */
                flex: 1 1 auto !important;
                height: 0 !important; /* Force proper scrolling behavior */
            }

            #dori-chat-input-container {
                /* Ensure input stays at bottom and above keyboard */
                position: sticky !important;
                bottom: 0 !important;
                background-color: var(--dori-input-bg);
                padding: 10px !important;
                /* Add safe area padding for newer iOS devices */
                padding-bottom: calc(10px + env(safe-area-inset-bottom)) !important;
            }

            #dori-powered-by {
                /* Ensure powered by stays above input */
                position: sticky !important;
                bottom: 0 !important;
                z-index: 1;
            }

            #dori-chat-button {
                width: 50px;
                height: 50px;
                /* Ensure button respects safe area */
                bottom: calc(20px + env(safe-area-inset-bottom)) !important;
            }

            #dori-chat-widget-container {
                width: 100% !important;
                height: 100% !important;
                right: 0 !important;
                left: 0 !important;
                top: 0 !important;
                bottom: 0 !important;
                margin: 0 !important;
            }
        }

        /* Styles for popup message */
        .dori-popup-message {
            position: fixed;
            background-color: white;
            color: #333;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
            max-width: 200px;
            z-index: 4;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            font-family: 'Poppins', sans-serif;
            right: 60px;
            top: calc(50% - 60px);
            transform: translateY(-100%);
        }

        .dori-popup-message::after {
            content: '';
            position: absolute;
            bottom: -6px;
            right: 20px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid white;
        }

        .dori-popup-message.show {
            opacity: 1;
        }

        /* Loading Animation Styles */
        .dori-loading-dots {
            display: inline-flex;
            gap: 4px;
            align-items: center;
            height: 24px;
        }

        .dori-loading-dots span {
            width: 6px;
            height: 6px;
            background-color: ${
              customization.theme === "light" ? "#666" : "#fff"
            };
            border-radius: 50%;
            animation: loadingDots 1.4s infinite;
            opacity: 0.4;
        }

        .dori-loading-dots span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .dori-loading-dots span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes loadingDots {
            0%, 100% {
                opacity: 0.4;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.1);
            }
        }
    `;
