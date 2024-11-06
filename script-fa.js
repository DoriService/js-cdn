(async function() {
    function initChatWidget(botData) {
        // Inject Styles
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-green: #1b5556;
                --hover-green: rgb(37, 150, 190);
                --creamy: #f7eeeb;
            }
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

            /* Chat Widget Container */
            #chat-widget-container {
                direction: rtl;
                position: fixed;
                bottom: 20px;
                right: 20px;
                font-family: 'Poppins', sans-serif;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }

            /* Chat Button */
            #chat-button {
                background-color: var(--primary-green);
                z-index:10000000;
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
                margin-top: auto; /* Push button to bottom */
            }

            /* Hover Effect for Chat Button */
            #chat-button:hover {
                background-color: var(--hover-green);
                transform: scale(1.05) rotate(5deg);
            }

            /* Chat Box Styles */
            #chat-box {
                width: 350px;
                height: 500px;
                border: none;
                border-radius: 16px;
                background-color: var(--creamy);
                box-shadow: 0 6px 20px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }

            #chat-box.show {
                opacity: 1;
                transform: translateY(0);
            }

            #chat-header {
                background-color: var(--primary-green); 
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 600;
            }

            #close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: transform 0.2s ease;
            }

            #close-chat:hover {
                transform: scale(1.2);
            }

            #chat-box-messages {
                direction: ltr;
                flex: 1;
                padding: 20px;
                background-color: var(--creamy);
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .message {
                max-width: 80%;
                direction: rtl;
                padding: 12px 16px;
                border-radius: 18px;
                animation: fadeIn 0.3s ease;
                line-height: 1.4;
                word-wrap: break-word;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .user-message {
                background-color: var(--primary-green);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
            }

            .bot-message {
                background-color: #e4e6eb;
                color: #333;
                align-self: flex-start;
                border-top-left-radius: 4px;
            }

            .system-message {
                background-color: #ffeeba;
                color: #856404;
                align-self: center;
                border-radius: 12px;
                font-style: italic;
                padding: 8px 12px;
            }

            #chat-input-container {
                display: flex;
                padding: 7px 20px;
                background-color: var(--creamy);
                border-top: 1px solid #e6e6e6;
            }

            #chat-input {
                flex: 1;
                padding: 10px 15px;
                border: 1px solid #ced4da;
                border-radius: 25px;
                font-size: 14px;
                transition: border-color 0.2s, box-shadow 0.2s;
            }

            #chat-input:focus {
                outline: none;
                border-color: #4a90e2;
                box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
            }

            #send-button {
                background-color: var(--primary-green);
                color: white;
                border: none;
                padding: 10px 20px;
                margin-right: 10px;
                border-radius: 25px;
                cursor: pointer;
                transition: background-color 0.2s, transform 0.2s;
                font-weight: 500;
            }

            #send-button:hover {
                background-color: var(--hover-green);
            }

            #send-button:active {
                transform: translateY(0);
            }

            /* Carousel Container */
            .product-carousel {
                display: flex;
                overflow-x: auto;
                scroll-behavior: smooth;
                gap: 10px;
                padding: 10px 0;
            }

            /* Hide scrollbar */
            .product-carousel::-webkit-scrollbar {
                display: none;
            }
            .product-carousel {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }

            /* Carousel Navigation Buttons */
            .carousel-button {
                position: absolute;
                top: 50%;
                width: 40px;
                transform: translateY(-50%);
                background-color: var(--primary-green);
                border: none;
                color: white;
                padding: 8px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                transition: background-color 0.3s;
            }

            .carousel-button:hover {
                background-color: var(--hover-green);
            }

            .carousel-button.left {
                left: 0;
            }

            .carousel-button.right {
                right: 0;
            }

            /* Adjust Product Item for Carousel */
            .product-item {
                min-width: 200px; /* Adjust based on desired item width */
                flex-shrink: 0;
            }

            .product-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .product-item {
                border: 1px solid #e9ecef;
                border-radius: 12px;
                padding: 10px;
                width: calc(50% - 10px);
                background-color: var(--creamy);
                transition: box-shadow 0.2s, transform 0.2s;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
                text-align: center;
            }

            .product-image {
                width: 100%;
                height: 150px;
                border-radius: 8px;
                object-fit: cover;
                margin-bottom: 10px;
            }

            .product-info {
                width: 100%;
            }

            .product-name {
                font-weight: 600;
                margin: 8px 0;
                color: #333;
                font-size: 16px;
            }

            .product-details {
                font-size: 0.85em;
                color: #666;
                margin-bottom: 8px;
            }

            .product-price {
                font-weight: 600;
                color: var(--primary-green);
                font-size: 14px;
            }

            /* Scrollbar Styling */
            #chat-box-messages::-webkit-scrollbar {
                width: 8px;
            }

            #chat-box-messages::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }

            #chat-box-messages::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 4px;
            }

            #chat-box-messages::-webkit-scrollbar-thumb:hover {
                background: #a8a8a8;
            }

            /* Markdown Styling */
            .message h1,
            .message h2,
            .message h3,
            .message h4,
            .message h5,
            .message h6 {
                margin: 0.5em 0;
            }

            .message p {
                margin: 0.5em 0;
            }

            .message ul,
            .message ol {
                padding-left: 1.5em;
                margin: 0.5em 0;
            }

            .message strong {
                font-weight: bold;
            }

            .message em {
                font-style: italic;
            }

            .message a {
                color: #4a90e2;
                text-decoration: none;
            }

            .message a:hover {
                text-decoration: underline;
            }

            .message blockquote {
                border-left: 4px solid #ccc;
                padding-left: 1em;
                color: #666;
                margin: 0.5em 0;
            }

            .message code {
                background-color: #f5f5f5;
                padding: 2px 4px;
                border-radius: 4px;
                font-family: monospace;
            }

            .message pre {
                background-color: #f5f5f5;
                padding: 10px;
                border-radius: 4px;
                overflow-x: auto;
            }
                /* Message Wrapper */
            .message-wrapper {
                display: flex;
                align-items: flex-start;
                margin-bottom: 10px;
            }

            /* User Message Wrapper */
            .user-message-wrapper {
                flex-direction: row-reverse;
            }

            .user-message-wrapper .message {
                border-bottom-right-radius: 4px;
                border-bottom-left-radius: 18px;
            }

            .user-message-wrapper .avatar {
                margin-left: 8px;
            }

            /* Bot Message Wrapper */
            .bot-message-wrapper {
                flex-direction: row;
            }

            .bot-message-wrapper .message {
                border-radius: 18px;
                border-top-left-radius: 4px;
            }

            .bot-message-wrapper .avatar {
                margin-right: 8px;
            }

            /* Avatar */
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
            }
            /* Suggested Reply */
            #suggested-reply {
                background-color: #f0f0f0;
                color: #555;
                padding: 10px 15px;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                border-radius: 25px;
                display: inline-block;
                margin: 10px 0;
                cursor: pointer;
                align-self: center;
                transition: background-color 0.3s, box-shadow 0.3s;
                max-width: 80%;
                text-align: center;
            }

            #suggested-reply:hover {
                background-color: #e0e0e0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            /* Align text appropriately */
            .user-message,
            .bot-message,
            .system-message {
                text-align: right;
            }

            /* "Powered by Dori" Styles */
            #powered-by-dori {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2px 20px;
                font-size: 12px;
                color: #666;
                text-align: center;
                background-color: #eeeaeb;
            }
        `;
        document.head.appendChild(style);

        // Load marked.js for Markdown parsing
        const markdownScript = document.createElement('script');
        markdownScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
        markdownScript.onload = () => {
            // console.log('Marked.js has been loaded.');
        };
        document.head.appendChild(markdownScript);

        // Create Chat Widget Elements
        const container = document.createElement('div');
        container.id = 'chat-widget-container';

        const chatButton = document.createElement('button');
        chatButton.id = 'chat-button';
        chatButton.setAttribute('aria-label', 'Open chat');
        chatButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 
                         15.3C19.3944 16.7118 18.3098 17.8992 16.9674 
                         18.7293C15.6251 19.5594 14.0782 19.9994 
                         12.5 20C11.1801 20.0035 9.87812 19.6951 
                         8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 
                         3.99656 12.8199 4 11.5C4.00061 9.92179 
                         4.44061 8.37488 5.27072 7.03258C6.10083 
                         5.69028 7.28825 4.6056 8.7 3.90003C9.87812 
                         3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 
                         3.11502 17.053 3.99479 18.5291 
                         5.47089C20.0052 6.94699 20.885 
                         8.91568 21 11V11.5Z" 
                      stroke="white" stroke-width="2" 
                      stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const chatBox = document.createElement('div');
        chatBox.id = 'chat-box';
        chatBox.setAttribute('aria-hidden', 'true');
        chatBox.style.display = 'none'; // Initially hidden

        const chatHeader = document.createElement('div');
        chatHeader.id = 'chat-header';
        chatHeader.innerHTML = `<span>چت با ما</span>`;

        const closeButton = document.createElement('button');
        closeButton.id = 'close-chat';
        closeButton.setAttribute('aria-label', 'Close chat');
        closeButton.innerHTML = '&times;';
        chatHeader.appendChild(closeButton);

        const chatMessages = document.createElement('div');
        chatMessages.id = 'chat-box-messages';

        const chatInputContainer = document.createElement('div');
        chatInputContainer.id = 'chat-input-container';

        const chatInput = document.createElement('input');
        chatInput.id = 'chat-input';
        chatInput.type = 'text';
        chatInput.placeholder = "پیام خود را بنویسید...";
        chatInput.setAttribute('aria-label', 'Type your message');

        const sendButton = document.createElement('button');
        sendButton.id = 'send-button';
        sendButton.textContent = 'ارسال';
        sendButton.setAttribute('aria-label', 'Send message');

        chatInputContainer.appendChild(chatInput);
        chatInputContainer.appendChild(sendButton);

        chatBox.appendChild(chatHeader);
        chatBox.appendChild(chatMessages);
        // Add "Powered by Dori" footer
        const poweredBy = document.createElement('div');
        poweredBy.id = 'powered-by-dori';
        let logo = `<svg width="55" height="21" viewBox="0 0 72 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M71.006 17.9865C71.2346 18.3748 71.4236 18.9408 71.5742 19.5226C71.939 20.9315 72.0566 22.4062 71.9756 23.8677C71.8082 26.8772 70.3826 27.1947 68.717 27.1947H66.4394C65.888 27.1947 65.576 26.9183 65.741 26.5503L65.7434 26.5458C65.8124 26.3871 67.163 23.2163 66.5156 20.4895C66.5078 20.4522 66.5 20.4149 66.4892 20.382C66.4784 20.3352 66.4652 20.2884 66.452 20.2416C66.4466 20.2277 66.4442 20.2087 66.4388 20.1948C66.3332 19.821 66.1958 19.4802 66.0476 19.1583C65.984 19.0179 65.921 18.8826 65.8544 18.7473L65.7566 18.5322C65.6588 18.3545 65.5796 18.187 65.5184 18.0276C65.3018 17.4717 65.516 17.2106 66.047 17.0986L68.9 16.914C69.5948 16.8691 70.2926 17.1252 70.7756 17.6741C70.862 17.7721 70.9412 17.8758 71.006 17.9865ZM70.9016 11.2699C70.91 11.1485 70.9016 11.0182 70.889 10.8836C70.8122 10.2727 70.6502 9.70605 70.322 9.20331C70.2752 9.13121 70.2284 9.05975 70.1726 8.99209C69.9722 8.73597 69.7508 8.50262 69.512 8.29141C68.8556 7.70708 68.0792 7.2758 67.2608 7.0064C66.2546 6.67819 65.21 6.60167 64.1611 6.62887C62.1019 6.68705 60.1405 7.25809 58.2013 7.94992C56.2399 8.6506 54.3091 9.45057 52.3518 10.1652C52.2114 10.2189 52.1214 10.255 51.9936 10.3087C51.87 10.358 51.7506 10.4118 51.6438 10.5022C51.5016 10.6382 51.3774 10.7805 51.4332 10.9986C51.4704 11.1428 51.5634 11.2624 51.6522 11.3793C52.1442 12.0313 52.5504 12.7548 52.8558 13.5231C53.6581 15.5373 53.7679 17.7829 53.5171 19.9298C53.3005 21.784 52.779 23.6179 51.9252 25.2589C51.8526 25.3981 51.7848 25.5283 51.7416 25.6232C51.597 25.9331 51.4092 26.4276 51.4392 26.7286C51.4608 27.0296 51.5586 27.1959 51.8358 27.1959H60.2899C60.6223 27.1959 60.8269 26.8184 60.6607 26.5218C60.4177 26.0949 60.1915 25.6188 60.1915 25.6188C59.2405 23.6596 58.7581 21.2876 58.6099 19.1077C58.4833 17.2428 58.7821 15.3735 59.4757 13.6528L59.4913 13.6136C60.4807 11.1751 63.4141 10.3669 65.4566 11.9169C66.5018 12.7099 67.4222 13.7236 67.8914 14.2744C68.1104 14.5311 68.4542 14.645 68.7644 14.5337C70.0118 14.0853 70.91 12.8364 70.91 11.3667C70.91 11.3351 70.91 11.3041 70.9016 11.2725V11.2699ZM49.2078 15.3121C49.1994 15.2805 49.191 15.2445 49.182 15.2135C48.0012 10.6211 43.827 7.61981 39.3377 8.11371C35.2793 8.56333 31.7405 11.9017 31.0666 16.1975C31.0582 16.238 31.054 16.2829 31.0498 16.3233C31.033 16.4359 31.0156 16.5434 31.0072 16.656C30.5554 20.5698 32.1287 24.8966 35.4623 26.8785C38.0459 28.4107 41.3837 28.3026 44.0274 26.9815C48.1332 24.937 50.3502 19.945 49.2078 15.3121ZM36.5885 20.965C36.5885 14.638 42.9918 9.47523 44.3178 14.0632C46.236 20.6912 36.5885 26.874 36.5885 20.965ZM44.1474 26.917L44.1642 26.9259C44.2236 26.8943 44.2794 26.8633 44.3346 26.8317C44.2704 26.8589 44.2074 26.8898 44.1474 26.917ZM27.7972 8.47796C27.2686 7.87593 26.71 7.35484 26.113 6.89636C24.4504 5.6025 22.579 4.86072 20.6728 4.47433C15.0663 3.18047 8.75244 4.65835 5.11161 7.39532C3.67939 8.47353 2.05878 10.3068 2.06358 12.2799L2.05938 12.3026C2.06358 12.6757 2.12778 13.0533 2.25978 13.4352C2.54958 14.2662 3.41539 15.4076 4.3316 15.462C4.5704 15.4753 4.8344 15.426 5.04801 15.309C5.37621 15.1338 5.57241 14.7158 5.76021 14.4059C5.98642 14.024 6.22522 13.6509 6.47242 13.2828C7.06943 12.4019 7.70903 11.5526 8.45484 10.8115C8.80884 10.4655 9.17965 10.1418 9.56785 9.84518C11.1963 8.59622 13.1193 7.7425 15.0933 7.3422C15.4767 7.26568 15.8607 7.21193 16.2441 7.16703C11.8443 9.17548 8.88564 15.3495 10.5951 21.636C8.28024 21.8023 5.94802 21.7751 3.63319 21.6044C3.04939 21.5639 2.45238 21.5102 1.84278 21.4469C0.781367 21.3343 0.184362 22.085 0.000760161 23.1322C-0.0334402 25.0913 1.08797 27.5855 3.04459 27.7916C4.8734 27.9801 6.97942 28.0345 9.19225 27.8903C9.95965 27.8365 10.4241 27.7821 10.4241 27.7821C18.7461 26.9689 28.0186 23.2979 29.1442 13.7672C29.1658 13.6414 29.1784 13.5111 29.191 13.3853C29.3746 11.4261 28.8376 9.79901 27.7972 8.47796ZM25.6018 13.6496C25.3204 15.3166 24.4168 16.6604 23.1976 17.7209C23.1376 17.7702 23.0824 17.8196 23.023 17.8689C21.5818 19.0552 18.4101 20.9018 16.8153 19.0913C16.3377 18.5519 16.1205 17.8063 16.0821 17.0695C15.9795 15.254 16.5255 13.3176 17.3865 11.7581C17.4591 11.6234 17.5359 11.4932 17.6127 11.3673C18.4569 10.064 19.5693 8.64428 21.0832 8.2307C22.264 7.90249 23.4448 8.31164 24.3232 9.17864C25.4872 10.3245 25.879 12.0275 25.6018 13.6496Z" fill="url(#paint0_linear_5585_194)"/>
                <defs>
                <linearGradient id="paint0_linear_5585_194" x1="72" y1="16" x2="0" y2="16" gradientUnits="userSpaceOnUse">
                <stop stop-color="#5D6CB6"/>
                <stop offset="1" stop-color="#71B6DE"/>
                </linearGradient>
                </defs>
                </svg>
        `;
        poweredBy.innerHTML = `${logo} Powered by `;
        chatBox.appendChild(poweredBy);
        chatBox.appendChild(chatInputContainer);
        

        container.appendChild(chatBox);

        document.body.appendChild(container);
        document.body.appendChild(chatButton)

        // Chat Functionality
        const API_URL = botData.route + '/stream-chat-with-assistant/';
        const ASSISTANT_ID = botData.assistant_id;
        let THREAD_ID = sessionStorage.getItem('thread_id') || null;


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
            chatBox.style.display = 'flex'; // Show the chat box
            chatBox.setAttribute('aria-hidden', 'false');
            chatButton.style.display = 'none';
            chatInput.focus();
            if (chatMessages.childElementCount === 0) {
                appendMessage('bot', botData.wellcomeMessage);
                displaySuggestedReply();
            }
        }

        function displaySuggestedReply() {
            if (botData.suggestedReply) {
                const suggestedReplyElement = document.createElement('div');
                suggestedReplyElement.id = 'suggested-reply';
                suggestedReplyElement.textContent = botData.suggestedReply;
                suggestedReplyElement.addEventListener('click', () => {
                    // Send the suggested reply as user's message
                    appendMessage('user', botData.suggestedReply);
                    // Hide the suggested reply
                    suggestedReplyElement.style.display = 'none';
                    // Call API with the suggested reply
                    callApi(botData.suggestedReply);
                });
                chatMessages.appendChild(suggestedReplyElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }


        // Close Chat Function
        function closeChat() {
            chatBox.classList.remove('show');
            chatBox.style.display = 'none'; // Hide the chat box completely
            chatBox.setAttribute('aria-hidden', 'true');
            chatButton.style.display = 'flex';
        }

        // Send Message Function
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                appendMessage('user', message);
                chatInput.value = '';
                callApi(message);
            }
        }

        // Append Message to Chat   
        function appendMessage(sender, content) {
            const messageWrapper = document.createElement('div');
            messageWrapper.classList.add('message-wrapper');

            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            
            if (sender === 'user') {
        messageWrapper.classList.add('user-message-wrapper');
        messageElement.classList.add('user-message');
    } else if (sender === 'bot') {
        messageWrapper.classList.add('bot-message-wrapper');
        messageElement.classList.add('bot-message');

        // Create avatar image
        const avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = botData.bot_image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
        avatar.alt = 'Bot Avatar';

        messageWrapper.appendChild(avatar);
    } else if (sender === 'system') {
        messageElement.classList.add('system-message');
    }

    // Check if marked.js is loaded
    if (typeof marked !== 'undefined') {
        // Parse Markdown content to HTML
        const htmlContent = marked.parse(content);
        messageElement.innerHTML = htmlContent;
    } else {
        // Fallback to plain text if marked.js isn't loaded
        messageElement.textContent = content;
    }

    messageWrapper.appendChild(messageElement);
    chatMessages.appendChild(messageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Return the message element for future updates
            return messageElement;
        }

        // Append Products to Chat
        function appendProducts(products) {
            const productHTML = createProductHTML(products);
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'bot-message');
            messageElement.innerHTML = productHTML;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Create Product HTML with Carousel
        function createProductHTML(products) {
            return `
                <div style="position: relative;">
                    <button class="carousel-button left" onclick="scrollCarousel(this.parentElement, -200)">&#9664;</button>
                    <div class="product-carousel">
                        ${products.map(product => `
                            <div class="product-item">
                                <a href="${product.url}" target="_blank">
                                    <img src="${product.image}" alt="${product.name}" class="product-image">
                                    <div class="product-info">
                                        <div class="product-price">${Number(product.price).toLocaleString()} تومان</div>
                                    </div>
                                </a>
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-button right" onclick="scrollCarousel(this.parentElement, 200)">&#9654;</button>
                </div>
            `;
        }

        // Scroll Carousel Function
        function scrollCarousel(container, distance) {
            const carousel = container.querySelector('.product-carousel');
            carousel.scrollBy({ left: distance, behavior: 'smooth' });
        }
        function updateLastAssistantMessage(newContent) {
            const messages = chatMessages.querySelectorAll('.bot-message');
            if (messages.length === 0) return;

            const lastMessage = messages[messages.length - 1];
            
            if (typeof marked !== 'undefined') {
                // Parse the new content as Markdown
                const parsedContent = marked.parse(newContent);
                // Set the entire content of the message
                lastMessage.innerHTML = parsedContent;
            } else {
                // If marked.js is not available, set the text content directly
                lastMessage.textContent = newContent;
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Expose scrollCarousel globally
        window.scrollCarousel = scrollCarousel;

        // Call API Function with Streaming
        async function callApi(message) {
            try {
                sendButton.disabled = true;
                appendMessage('system', 'در حال تایپ...');

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

            } catch (error) {
                console.error('Error:', error);
                appendMessage('system', 'متأسفیم، خطایی رخ داد. لطفاً دوباره تلاش کنید.');
            } finally {
                sendButton.disabled = false;
            }
        }

        // Remove Last System Message
        function removeLastSystemMessage() {
            const messages = chatMessages.querySelectorAll('.system-message');
            if (messages.length > 0) {
                const lastMessage = messages[messages.length - 1];
                if (lastMessage.parentNode === chatMessages) {
                    chatMessages.removeChild(lastMessage);
                } else {
                    lastMessage.remove();
                }
            }
        }

        // fetch history of messages
        async function fetchHistory() {
            // request without message with only thread id
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assistant_id: ASSISTANT_ID,
                    thread_id: THREAD_ID
                })
            });
            const data = await response.json();
            return data;
        }

        // Initialize Chat Widget
        async function initChat() {
            // get history of messages
            const history = await fetchHistory();
            // console.log(history);
            // // // append history to chat
            // // history.response.response.forEach(message => {
            // //     appendMessage(message.sender, message.text);
            // // });
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initChat);
        } else {
            initChat();
        }
    }
    async function fetchBotDataBySharingID(sharingID) {
        try {
            const url = 'https://demoapi.dori.tech/bot-sharing-data/' + sharingID;
            const response = await fetch(url);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();  // assuming the server returns JSON
            return data;

        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
    botData = await fetchBotDataBySharingID(SHARING_ID);
    if (botData.error) {
        
        errorMessage.innerHTML = botData.error;
    } else if (botData.data) {
        initChatWidget(botData.data);
    }else{
        
        errorMessage.innerHTML = "No data found";
    }
})();

