(async function() {
    // Add Sentry initialization at the start of the IIFE
    function initSentry() {
        const script = document.createElement('script');
        script.src = 'https://browser.sentry-cdn.com/7.69.0/bundle.tracing.min.js';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
            Sentry.init({
                dsn: "https://0a4a8f2e7d5218cbc7c850d400ad3cba@sentry.hamravesh.com/7582",
                integrations: [new Sentry.BrowserTracing()],
                tracesSampleRate: 1.0,
            });

            // Add global error handler
            window.onerror = function(message, source, lineno, colno, error) {
                Sentry.captureException(error, {
                    extra: {
                        message,
                        source,
                        lineno,
                        colno
                    }
                });
            };

            // Add unhandled promise rejection handler
            window.onunhandledrejection = function(event) {
                Sentry.captureException(event.reason, {
                    extra: {
                        type: 'unhandled_promise_rejection',
                        promise: event.promise
                    }
                });
            };
        };
        
        script.onerror = (error) => {
            console.error('Failed to load Sentry:', error);
        };
        
        document.head.appendChild(script);
    }
    // Initialize Sentry before other operations
    initSentry();

    // Add Google Analytics initialization function
    function loadGoogleAnalytics() {
        const measurementId = 'G-J5P2CETKPP';
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', measurementId);
        });
    }

    // Analytics tracking functions
    const analytics = {
        trackEvent: (eventName, params = {}) => {
            if (window.gtag) {
                // Add user ID to all events
                const userId = getUserId();
                window.gtag('event', eventName, {
                    ...params,
                    userId: userId
                });
            }
        },
        trackChat: (action, label = '') => {
            if (window.gtag) {
                const userId = getUserId();
                const botName = botData.data.bot_name || 'unknown';
                const enhancedSharingId = `${botName}-${botData.sharing_id}`;
                
                // Map common actions to unique event names
                const eventName = action === 'open' ? 'chat_opened' :
                                action === 'message_sent' ? 'message_sent' :
                                'chat_interaction';
                window.gtag('event', eventName, {
                    event_category: 'Chat',
                    event_action: action,
                    event_label: label,
                    sharing_id: enhancedSharingId,
                    userId: userId
                });
            }
        }
    };

    // Function to generate and manage user ID
    function getUserId() {
        const cookieName = 'dori_user_id';
        let userId = getCookie(cookieName);
        
        if (!userId) {
            userId = generateUUID();
            // Set cookie to expire in 2 years
            setCookie(cookieName, userId, 730);
        }
        
        return userId;
    }

    // Cookie utility functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
    }

    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // UUID generation function
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    try{    
        function initChatWidget(botData) {
            loadGoogleAnalytics().catch(error => {
                console.error('Failed to load Google Analytics:', error);
            });


            // Inject Styles
            const style = document.createElement('style');
            const customization = botData.customization || {
                appearance: 'bubble',
                theme: 'light',
                theme_color: '#1b5556',
                position: {
                    align: 'right',
                    side_spacing: 20,
                    bottom_spacing: 20
                }
            };

            
            style.textContent = `
                :root {
                    --dori-primary-color: ${customization.theme_color};
                    --dori-hover-color: ${customization.theme_color}dd;
                    --dori-creamy: ${customization.theme === 'light' ? '#F6EEEB' : '#1F2937'};
                    --dori-text-color: ${customization.theme === 'light' ? '#2D3748' : '#F9FAFB'};
                    --dori-input-bg: ${customization.theme === 'light' ? '#F6EEEB' : '#1F2937'};
                    --dori-input-text: ${customization.theme === 'light' ? '#2D3748' : '#F9FAFB'};
                    --dori-input-border: ${customization.theme === 'light' ? '#ced4da' : '#374151'};
                    --dori-message-bg-user: var(--dori-primary-color);
                    --dori-message-bg-bot: ${customization.theme === 'light' ? '#E4E6EA' : '#2D3748'};
                    --dori-message-text-bot: ${customization.theme === 'light' ? '#333' : '#F9FAFB'};
                    --dori-product-bg: ${customization.theme === 'light' ? '#F6EEEB' : '#1F2937'};
                    --dori-product-border: ${customization.theme === 'light' ? '#e9ecef' : '#374151'};
                    --dori-product-text: ${customization.theme === 'light' ? '#333' : '#F9FAFB'};
                    --dori-scrollbar-bg: ${customization.theme === 'light' ? '#f1f1f1' : '#1F2937'};
                    --dori-scrollbar-thumb: ${customization.theme === 'light' ? '#c1c1c1' : '#4B5563'};
                    --dori-scrollbar-hover: ${customization.theme === 'light' ? '#a8a8a8' : '#6B7280'};
                    --dori-powered-by-bg: ${customization.theme === 'light' ? '#eeeaeb' : '#1F2937'};
                    --dori-powered-by-text: ${customization.theme === 'light' ? '#666' : 'gray'};
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
                    width: 360px;
                    height: 65vh;
                    max-height: 600px;
                    min-height: 350px;
                    border-radius: 16px;
                    background-color: var(--dori-creamy);
                    color: var(--dori-text-color);
                    box-shadow: ${customization.theme === 'light' ? 
                        '0 6px 20px rgba(0,0,0,0.1)' : 
                        '0 8px 24px rgba(0,0,0,0.4)'};
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    position: fixed;
                    bottom: ${customization.position.bottom_spacing}px;
                }

                #dori-chat-box.show {
                    opacity: 1;
                    transform: translateY(0);
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
                    border-bottom: ${customization.theme === 'light' ? 'none' : '1px solid #374151'};
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
                    box-shadow: 0 0 0 3px ${customization.theme === 'light' ? 
                        `${customization.theme_color}1a` : 
                        `${customization.theme_color}33`};
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
                    box-shadow: ${customization.theme === 'light' ? 
                        'rgba(0, 0, 0, 0.05) 0px 2px 4px' : 
                        'rgba(0, 0, 0, 0.2) 0px 2px 4px'};
                }

                .dori-product-item:hover {
                    transform: translateY(-2px);
                    box-shadow: ${customization.theme === 'light' ? 
                        'rgba(0, 0, 0, 0.1) 0px 4px 8px' : 
                        'rgba(0, 0, 0, 0.3) 0px 4px 8px'};
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
                    background-color: ${customization.theme === 'light' ? 
                        '#f5f5f5' : 
                        '#2D3748'};
                    padding: 1px 4px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 13px;
                    color: ${customization.theme === 'light' ? 
                        '#333' : 
                        '#E2E8F0'};
                }

                .dori-message pre {
                    background-color: ${customization.theme === 'light' ? 
                        '#f5f5f5' : 
                        '#2D3748'};
                    padding: 8px;
                    border-radius: 4px;
                    overflow-x: auto;
                    margin: 0.4em 0;
                    color: ${customization.theme === 'light' ? 
                        '#333' : 
                        '#E2E8F0'};
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
                    border-top: ${customization.theme === 'light' ? 'none' : '1px solid #374151'};
                }

                /* Responsive Design */
                @media screen and (max-width: 480px) {
                    #dori-chat-box {
                        width: 90%;
                        height: 65vh;
                        max-height: 600px;
                        min-height: 350px;
                        border-radius: 16px;
                        margin: 0 auto;
                        left: 0;
                        right: 0;
                    }

                    #dori-chat-button {
                        width: 50px;
                        height: 50px;
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
            `;
            document.head.appendChild(style);
            // const isRTL = botData.isRTL;
            const uiText = botData.texts;
            const isRTL = botData.texts.isRTL ?? false; // Default to true if not specified

            // Load marked.js for Markdown parsing
            const markdownScript = document.createElement('script');
            markdownScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
            markdownScript.onload = () => {
                // console.log('Marked.js has been loaded.');
            };
            markdownScript.onerror = (error) => {
                Sentry.captureException(error, {
                    extra: {
                        context: 'Loading marked.js'
                    }
                });
            };
            document.head.appendChild(markdownScript);

            // Create Chat Widget Elements
            const container = document.createElement('div');
            container.id = 'dori-chat-widget-container';
            container.style.direction = isRTL ? 'rtl' : 'ltr';
            container.style.position = 'fixed';
            container.style.bottom = `${customization.position.bottom_spacing}px`;
            container.style[customization.position.align] = `${customization.position.side_spacing}px`;

            const chatButton = document.createElement('button');
            chatButton.id = 'dori-chat-button';
            chatButton.setAttribute('aria-label', 'Open chat');
            chatButton.style[customization.position.align] = `${customization.position.side_spacing}px`;
            chatButton.style.bottom = `${customization.position.bottom_spacing}px`;
            customization.appearance = "sidebar"
            if (customization.appearance === 'bar') {
                chatButton.style.borderRadius = '12px 12px 0 0';
                chatButton.style.width = 'auto';
                chatButton.style.height = '48px';
                chatButton.style.padding = '0 24px';
                chatButton.style.display = 'flex';
                chatButton.style.alignItems = 'center';
                chatButton.style.gap = '12px';
                chatButton.style.bottom = '0';
                chatButton.style.transform = 'none';
                chatButton.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img 
                            src="${botData.bot_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'}" 
                            style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;"
                        />
                        <span style="font-size: 14px; font-weight: 500;">${botData.bot_name || 'AI Assistant'}</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 15L12 9L6 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                `;
            } else if (customization.appearance === 'sidebar') {
                chatButton.className = 'BXKCcR r9BRio Md_Vex NN8L-8 heWLCX LyRfpJ VWL_Ot _13ipK_ _5Yd-hZ Uwsb06 Wy3rmK DikYjn uyF88V df4QKn kIgovE zfa-svg-animation-icon _6MANVh EmWJce EvwuKo';
                chatButton.setAttribute('type', 'button');
                chatButton.setAttribute('aria-label', 'Fashion Assistant');
                chatButton.setAttribute('aria-expanded', 'false');
                chatButton.setAttribute('tabindex', '0');
                chatButton.setAttribute('aria-haspopup', 'dialog');
                chatButton.setAttribute('aria-controls', ':rad:');
                chatButton.style.position = 'fixed';
                chatButton.style.right = '0px';
                chatButton.style.top = '50%';
                chatButton.style.transform = 'translateY(-50%)';
                // only left bottom and left top
                chatButton.style.borderRadius = '12px 0 0 12px';
                chatButton.style.bottom = 'auto';
                chatButton.style.zIndex = '5';
                
                // Add styles for popup message
                const popupStyles = document.createElement('style');
                popupStyles.textContent = `
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
                document.head.appendChild(popupStyles);

                // Create popup message element
                const popupMessage = document.createElement('div');
                popupMessage.className = 'dori-popup-message';
                popupMessage.textContent = uiText.popupMessage || 'Hello! What are you looking for?';
                document.body.appendChild(popupMessage);
                
                // Add the new SVG icon
                chatButton.innerHTML = `
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

                // Add initial load animation with delay
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        chatButton.classList.add('initial-load');
                        setTimeout(() => {
                            chatButton.classList.remove('initial-load');
                            // Show popup message after initial animation
                            setTimeout(() => {
                                if (!chatBox.classList.contains('show')) { // Only show if chat is not open
                                    popupMessage.classList.add('show');
                                    // // Hide popup after 5 seconds
                                    // setTimeout(() => {
                                    //     popupMessage.classList.remove('show');
                                    // }, 5000);
                                }
                            }, 5000); // Show popup 5 seconds after initial animation
                        }, 4000);
                    }, 3000);
                });

                // Hide popup when chat is opened
                chatButton.addEventListener('click', () => {
                    popupMessage.classList.remove('show');
                });
            } else {
                chatButton.style.borderRadius = '50%';
                chatButton.style.width = '60px';
                chatButton.style.height = '60px';
                // Use the same new SVG icon for bubble mode
                chatButton.innerHTML = `
                    <span class="olm6i5">
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
            }

            // Handle RTL text direction for messages
            const messageStyles = document.createElement('style');
            messageStyles.textContent = `
                ${isRTL ? `
                    .dori-user-message,
                    .dori-bot-message,
                    .dori-system-message {
                        text-align: right;
                        direction: rtl;
                    }
                ` : ''}
            `;
            document.head.appendChild(messageStyles);

            const chatBox = document.createElement('div');
            chatBox.id = 'dori-chat-box';
            chatBox.setAttribute('aria-hidden', 'true');
            chatBox.style.display = 'none'; // Initially hidden
            chatBox.style.backgroundColor = customization.theme === 'light' ? '#FFFFFF' : '#1A202C';
            chatBox.style.color = customization.theme === 'light' ? '#2D3748' : '#FFFFFF';
            chatBox.style[customization.position.align] = `${customization.position.side_spacing}px`;
            chatBox.style.bottom = `${customization.position.bottom_spacing}px`;

            const chatHeader = document.createElement('div');
            chatHeader.id = 'dori-chat-header';
            
            chatHeader.innerHTML = `<span>${uiText.chatWithUs}</span>`;

            const closeButton = document.createElement('button');
            closeButton.id = 'dori-close-chat';
            closeButton.setAttribute('aria-label', 'Close chat');
            closeButton.innerHTML = '&times;';
            chatHeader.appendChild(closeButton);

            const chatMessages = document.createElement('div');
            chatMessages.id = 'dori-chat-box-messages';

            const chatInputContainer = document.createElement('div');
            chatInputContainer.id = 'dori-chat-input-container';

            const chatInput = document.createElement('input');
            chatInput.id = 'dori-chat-input';
            chatInput.type = 'text';
            chatInput.placeholder = uiText.inputPlaceholder;
            chatInput.setAttribute('aria-label', 'Type your message');

            const sendButton = document.createElement('button');
            sendButton.id = 'dori-send-button';
            sendButton.textContent = uiText.buttonText;
            sendButton.setAttribute('aria-label', 'Send message');
            sendButton.style.margin = isRTL ? '0 10px 0 0' : '0 0 0 10px';

            chatInputContainer.appendChild(chatInput);
            chatInputContainer.appendChild(sendButton);

            chatBox.appendChild(chatHeader);
            chatBox.appendChild(chatMessages);
            // Add "Powered by Dori" footer
            const poweredBy = document.createElement('div');
            poweredBy.id = 'dori-powered-by';
            poweredBy.style.display = 'flex';
            poweredBy.style.justifyContent = 'center'; // Center horizontally
            poweredBy.style.alignItems = 'center'; // Center vertically
            const poweredByLink = document.createElement('a');
            poweredByLink.href = 'https://dori.tech';
            poweredByLink.target = '_blank';
            poweredByLink.style.textDecoration = 'none';
            poweredByLink.style.display = 'flex';
            poweredByLink.style.direction = 'ltr';
            poweredByLink.style.alignItems = 'center';
            poweredByLink.style.justifyContent = 'center';
            poweredByLink.innerHTML = `<span style="color: ${customization.theme === 'light' ? '#666' : '#9CA3AF'}">Powered by</span>&nbsp;&nbsp;<img src="https://dori.tech/assets/logo-BPyoLtnV.png" width="36" height="18" alt="Dori Logo">`;
            chatBox.appendChild(poweredBy);
            poweredBy.appendChild(poweredByLink);
            chatBox.appendChild(chatInputContainer);

            container.appendChild(chatBox);

            document.body.appendChild(container);
            document.body.appendChild(chatButton)

            // Chat Functionality
            const API_URL = botData.route + '/stream-chat-with-assistant/';
            const ASSISTANT_ID = botData.assistant_id;
            // let THREAD_ID = sessionStorage.getItem('thread_id') || null;
            let THREAD_ID = null;


            // Event Listeners
            chatButton.addEventListener('click', openChat);
            closeButton.addEventListener('click', closeChat);
            sendButton.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Open Chat Function
            function openChat() {
                chatBox.classList.add('show');
                chatBox.style.display = 'flex';
                chatBox.setAttribute('aria-hidden', 'false');
                chatButton.style.display = 'none';
                chatInput.focus();
                
                // Track chat open event
                analytics.trackChat('open');
                
                // Ensure chat box appears on the correct side
                chatBox.style[customization.position.align] = `${customization.position.side_spacing}px`;
                // Reset the opposite side position
                chatBox.style[customization.position.align === 'left' ? 'right' : 'left'] = 'auto';
                
                if (chatMessages.childElementCount === 0) {
                    appendMessage('bot', botData.wellcomeMessage);
                    displaySuggestedReply();
                }
            }
            function displaySuggestedReply() {
                if (botData.suggestedReply) {
                    try {
                        // Try to parse as JSON in case it's a stringified array
                        const replies = JSON.parse(botData.suggestedReply);
                        
                        // If it's an array, display multiple suggested replies
                        if (Array.isArray(replies)) {
                            replies.forEach(reply => {
                                createSuggestedReplyElement(reply);
                            });
                        }
                    } catch (e) {
                        // If parsing fails, treat it as a single reply string
                        createSuggestedReplyElement(botData.suggestedReply);
                    }
                    
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }

            function createSuggestedReplyElement(replyText) {
                const suggestedReplyElement = document.createElement('div');
                suggestedReplyElement.id = 'dori-suggested-reply';
                suggestedReplyElement.textContent = replyText;
                suggestedReplyElement.addEventListener('click', () => {
                    // Track suggested reply click
                    analytics.trackChat('suggested_reply_click', replyText);
                    analytics.trackChat('message_sent', replyText);
                    
                    appendMessage('user', replyText);
                    const allSuggestions = chatMessages.querySelectorAll('#dori-suggested-reply');
                    allSuggestions.forEach(suggestion => {
                        suggestion.style.display = 'none';
                    });
                    callApi(replyText);
                });
                chatMessages.appendChild(suggestedReplyElement);
            }


            // Close Chat Function
            function closeChat() {
                chatBox.classList.remove('show');
                chatBox.style.display = 'none';
                chatBox.setAttribute('aria-hidden', 'true');
                chatButton.style.display = 'flex';
                
                // Track chat close event
                analytics.trackChat('close');
            }

            // Send Message Function
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message) {
                    appendMessage('user', message);
                    chatInput.value = '';
                    
                    // Track message sent event
                    analytics.trackChat('message_sent', message.substring(0, 50));
                    
                    callApi(message);
                }
            }

            // Append Message to Chat   
            function appendMessage(sender, content) {
                try {
                    const messageWrapper = document.createElement('div');
                    messageWrapper.classList.add('dori-message-wrapper');

                    const messageElement = document.createElement('div');
                    messageElement.classList.add('dori-message');
                    
                    if (sender === 'user') {
                        messageWrapper.classList.add('dori-user-message-wrapper');
                        messageElement.classList.add('dori-user-message');
                    } else if (sender === 'bot') {
                        messageWrapper.classList.add('dori-bot-message-wrapper');
                        messageElement.classList.add('dori-bot-message');

                        // Create avatar image
                        const avatar = document.createElement('img');
                        avatar.classList.add('dori-avatar');
                        avatar.src = botData.bot_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
                        avatar.alt = 'Bot Avatar';

                        messageWrapper.appendChild(avatar);
                    } else if (sender === 'system') {
                        messageElement.classList.add('dori-system-message');
                    }

                    // Check if marked.js is loaded
                    if (typeof marked !== 'undefined') {
                        try {
                            const htmlContent = marked.parse(content);
                            messageElement.innerHTML = htmlContent;
                        } catch (error) {
                            Sentry.captureException(error, {
                                extra: {
                                    context: 'Markdown parsing',
                                    content
                                }
                            });
                            messageElement.textContent = content; // Fallback to plain text
                        }
                    }

                    messageWrapper.appendChild(messageElement);
                    chatMessages.appendChild(messageWrapper);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    return messageElement;
                } catch (error) {
                    Sentry.captureException(error, {
                        extra: {
                            context: 'appendMessage',
                            sender,
                            content
                        }
                    });
                }
            }

            // Append Products to Chat
            function appendProducts(products) {
                const productHTML = createProductHTML(products);
                const messageElement = document.createElement('div');
                messageElement.classList.add('dori-message', 'dori-bot-message');
                messageElement.innerHTML = productHTML;
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Create Product HTML with Carousel
            function createProductHTML(products) {
                try {
                    return `
                        <div style="position: relative;">
                            <button class="dori-carousel-button left" onclick="scrollCarousel(this.parentElement, -200)">&#9664;</button>
                            <div class="dori-product-carousel">
                                ${products.map(product => `
                                    <div class="dori-product-item">
                                        <a href="${product.url}" target="_blank" onclick="window.trackProductClick && window.trackProductClick('${product.name}', ${product.price})">
                                            <img src="${product.image}" alt="${product.name}" class="dori-product-image">
                                            <div class="dori-product-info">
                                                <div class="dori-product-name">${product.name}</div>
                                                <div class="dori-product-price">${Number(product.price).toLocaleString()} ${botData.currency}</div>
                                            </div>
                                        </a>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="dori-carousel-button right" onclick="scrollCarousel(this.parentElement, 200)">&#9654;</button>
                        </div>
                    `;
                } catch (error) {
                    Sentry.captureException(error, {
                        extra: {
                            context: 'createProductHTML',
                            products
                        }
                    });
                    return ''; // Return empty string on error
                }
            }

            // Scroll Carousel Function
            function scrollCarousel(container, distance) {
                const carousel = container.querySelector('.dori-product-carousel');
                carousel.scrollBy({ left: distance, behavior: 'smooth' });
            }
            function updateLastAssistantMessage(newContent) {
                const messages = chatMessages.querySelectorAll('.dori-bot-message');
                if (messages.length === 0) return;

                const lastMessage = messages[messages.length - 1];
                
                if (typeof marked !== 'undefined') {
                    const parsedContent = marked.parse(newContent);
                    lastMessage.innerHTML = parsedContent;
                } else {
                    lastMessage.textContent = newContent;
                }

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            // Expose scrollCarousel and trackProductClick globally
            window.scrollCarousel = scrollCarousel;
            window.trackProductClick = function(productName, productPrice) {
                analytics.trackEvent('product_click', {
                    event_category: 'Product',
                    event_action: 'click',
                    event_label: productName,
                    price: productPrice,
                    sharing_id: botData.sharing_id
                });
            };

            // Call API Function with Streaming
            async function callApi(message) {
                try {
                    sendButton.disabled = true;
                    appendMessage('system', uiText.typing);

                    // Track API call start
                    analytics.trackChat('api_call_start');

                    const requestBody = {
                        assistant_id: ASSISTANT_ID,
                        thread_id: THREAD_ID,
                        message: message,
                    };

                    // Remove undefined properties
                    Object.keys(requestBody).forEach(
                        (key) => requestBody[key] === undefined && delete requestBody[key]
                    );

                    const queryParams = new URLSearchParams({
                        assistant_id: ASSISTANT_ID,
                    }).toString();
                    const url = `${API_URL}?${queryParams}`;

                    const response = await fetch(url, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                    });

                    // Handle 429 error specifically
                    if (response.status === 429) {
                        removeLastSystemMessage();
                        appendMessage('system', `⚠️ ${uiText.rateLimitError || 'You have exceeded the rate limit. Please wait at least 24 hours before trying again.'}`);
                        return;
                    }

                    if (!response.body) {
                        throw new Error("ReadableStream not supported in this environment.");
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder("utf-8");
                    let doneReading = false;
                    let threadId = THREAD_ID;
                    let buffer = ""; // Buffer to accumulate incoming data
                    let currentBotMessage = null; // Reference to the current bot message
                    let fullMessage = ""; // Variable to store the full message

                    while (!doneReading) {
                        const { value, done } = await reader.read();
                        doneReading = done;
                        if (value) {
                            const decoded = decoder.decode(value, { stream: true });
                            buffer += decoded;

                            let boundary = buffer.indexOf('}{');
                            while (boundary !== -1) {
                                const jsonString = buffer.slice(0, boundary + 1); // Include the first '}'
                                buffer = buffer.slice(boundary + 1); // Remove parsed part

                                try {
                                    const parsed = JSON.parse(jsonString);
                                    if (parsed.thread_id) {
                                        threadId = parsed.thread_id;
                                        THREAD_ID = threadId;
                                        sessionStorage.setItem('thread_id', THREAD_ID);
                                    } else if (parsed.text) {
                                        fullMessage += parsed.text; // Accumulate the full message
                                        if (!currentBotMessage) {
                                            currentBotMessage = appendMessage('bot', fullMessage);
                                        } else {
                                            updateLastAssistantMessage(fullMessage);
                                        }
                                    } else if (parsed.products) {
                                        appendProducts(parsed.products);
                                    }
                                } catch (err) {
                                    console.error("Failed to parse JSON:", err);
                                }

                                boundary = buffer.indexOf('}{');
                            }

                            // Attempt to parse the remaining buffer if it ends with '}'
                            if (buffer.endsWith('}')) {
                                try {
                                    const parsed = JSON.parse(buffer);
                                    if (parsed.thread_id) {
                                        threadId = parsed.thread_id;
                                        THREAD_ID = threadId;
                                        sessionStorage.setItem('thread_id', THREAD_ID);
                                    } else if (parsed.text) {
                                        fullMessage += parsed.text; // Accumulate the full message
                                        if (!currentBotMessage) {
                                            currentBotMessage = appendMessage('bot', fullMessage);
                                        } else {
                                            updateLastAssistantMessage(fullMessage);
                                        }
                                    } else if (parsed.products) {
                                        appendProducts(parsed.products);
                                    }
                                    buffer = "";
                                } catch (err) {
                                    console.error("Failed to parse JSON:", err);
                                    // Keep the buffer for the next read if parsing fails
                                }
                            }
                        }
                    }

                    // Remove the 'typing' message after completion
                    removeLastSystemMessage();
                    currentBotMessage = null; // Reset for the next message

                    // Track API call success
                    analytics.trackChat('api_call_success');

                } catch (error) {
                    console.error('Error:', error);
                    // Capture error in Sentry
                    Sentry.captureException(error, {
                        extra: {
                            message,
                            threadId: THREAD_ID,
                            assistantId: ASSISTANT_ID
                        }
                    });
                    sessionStorage.removeItem('thread_id');
                    removeLastSystemMessage();
                    appendMessage('system', uiText.error);
                    
                    // Track API call error
                    analytics.trackChat('api_call_error', error.message);
                    
                } finally {
                    sendButton.disabled = false;
                }
            }

            // Remove Last System Message
            function removeLastSystemMessage() {
                const messages = chatMessages.querySelectorAll('.dori-system-message');
                if (messages.length > 0) {
                    const lastMessage = messages[messages.length - 1];
                    if (lastMessage.parentNode === chatMessages) {
                        chatMessages.removeChild(lastMessage);
                    } else {
                        lastMessage.remove();
                    }
                }
            }

            // Update chat box positioning for bar mode
            if (customization.appearance === 'bar') {
                chatBox.style.bottom = '48px';
            }
        }

        async function fetchBotDataBySharingID(sharingID) {
            const url = 'https://demoapi.dori.tech/bot-sharing-data/' + sharingID;
            const response = await fetch(url);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();  // assuming the server returns JSON
            return data;

        }
        botData = await fetchBotDataBySharingID(SHARING_ID);
        botData.sharing_id = SHARING_ID;
        if (botData.error) {
            errorMessage.innerHTML = botData.error;
        } else if (botData.data) {
            initChatWidget(botData.data);
        }else{
            errorMessage.innerHTML = "No data found";
        }
    } catch (error) {
        console.error('Error fetching bot data:', error);
        Sentry.captureException(error);
    }
})();