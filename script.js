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
                margin-left: 10px;
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
        chatBox.style.display = 'none'; // Initially hidden
        chatBox.setAttribute('aria-hidden', 'true');

        const chatHeader = document.createElement('div');
        chatHeader.id = 'chat-header';
        chatHeader.innerHTML = `<span>Chat with us</span>`;

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
        chatInput.placeholder = "Type your message...";
        chatInput.setAttribute('aria-label', 'Type your message');
        const sendButton = document.createElement('button');
        sendButton.id = 'send-button';
        sendButton.textContent = 'Send';
        sendButton.setAttribute('aria-label', 'Send message');

        chatInputContainer.appendChild(chatInput);
        chatInputContainer.appendChild(sendButton);

        chatBox.appendChild(chatHeader);
        chatBox.appendChild(chatMessages);
        // Add "Powered by Dori" footer
        const poweredBy = document.createElement('div');
        poweredBy.id = 'powered-by-dori';
        poweredBy.style.display = 'flex';
        poweredBy.style.justifyContent = 'center'; // Center horizontally
        poweredBy.style.alignItems = 'center'; // Center vertically
        const poweredByLink = document.createElement('a');
        poweredByLink.href = 'https://dori.tech';
        poweredByLink.target = '_blank';
        poweredByLink.style.textDecoration = 'none';
        poweredByLink.style.display = 'flex';
        poweredByLink.style.alignItems = 'center';
        poweredByLink.style.justifyContent = 'center';
        poweredByLink.innerHTML = `<img src="https://dori.tech/assets/logo-BPyoLtnV.png" width="36" height="18" alt="Dori Logo">&nbsp;&nbsp;<span style="color: #666;">Powered by</span>`;
        poweredBy.appendChild(poweredByLink);
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
                let suggestions;
                
                // Try to parse if it's a stringified array
                try {
                    suggestions = JSON.parse(botData.suggestedReply);
                    // If it's not an array, wrap it in an array
                    if (!Array.isArray(suggestions)) {
                        suggestions = [suggestions];
                    }
                } catch (e) {
                    // If parsing fails, treat it as a single string
                    suggestions = [botData.suggestedReply];
                }

                // Create and append each suggestion
                suggestions.forEach(suggestion => {
                    const suggestedReplyElement = document.createElement('div');
                    suggestedReplyElement.id = 'suggested-reply';
                    suggestedReplyElement.textContent = suggestion;
                    suggestedReplyElement.addEventListener('click', () => {
                        appendMessage('user', suggestion);
                        // Hide all suggested replies
                        document.querySelectorAll('#suggested-reply').forEach(el => {
                            el.style.display = 'none';
                        });
                        callApi(suggestion);
                    });
                    chatMessages.appendChild(suggestedReplyElement);
                });

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }


        // Close Chat Function
        function closeChat() {
            chatBox.classList.remove('show');
            chatBox.setAttribute('aria-hidden', 'true');
            chatBox.style.display = 'none'; // Hide the chat box completely
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
                                        <div class="product-price">${Number(product.price).toLocaleString()} ${product.currency}</div>
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

        // Expose scrollCarousel globally
        window.scrollCarousel = scrollCarousel;

        // Call API Function
        async function callApi(message) {
            try {
                sendButton.disabled = true;
                appendMessage('system', 'Typing...');
                
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        assistant_id: ASSISTANT_ID,
                        thread_id: THREAD_ID,
                        message: message
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                // Remove the 'typing' message
                removeLastSystemMessage();

                processResponse(data);
            } catch (error) {
                console.error('Error:', error);
                appendMessage('system', 'Sorry, an error occurred. Please try again.');
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

        // Process API Response
        function processResponse(data) {
            if (data.thread_id) {
                THREAD_ID = data.thread_id;
                sessionStorage.setItem('thread_id', THREAD_ID);
            }

            if (data.response) {
                // console.log(data.response.response);
                if (Array.isArray(data.response.response)) {
                    data.response.response.forEach(item => {
                        if (item.text) {
                            appendMessage('bot', item.text);
                        }
                        if (item.images && Array.isArray(item.images)) {
                            appendProducts(item.images);
                        }
                    });
                } else if (typeof data.response.response === 'string') {
                    appendMessage('bot', data.response.response);
                } else {
                    appendMessage('bot', 'Sorry, no response was received.');
                }
            } else {
                appendMessage('bot', 'Sorry, no response was received.');
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
            const url = 'https://demoapi.dori.style/bot-sharing-data/' + sharingID;
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
        console.log(botData.error);
        errorMessage.innerHTML = botData.error;
    } else if (botData.data) {
        initChatWidget(botData.data);
    }else{
        console.log("No data found");
        errorMessage.innerHTML = "No data found";
    }
})();