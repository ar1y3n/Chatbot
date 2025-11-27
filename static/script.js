/*
document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');
    const resetBtn = document.getElementById('reset-btn');
    const newChatBtn = document.getElementById('new-chat-btn');
    const sentimentResult = document.getElementById('sentiment-result');
    const sentimentLabel = document.getElementById('sentiment-label');
    const sentimentScore = document.getElementById('sentiment-score');
    const sentimentSummary = document.getElementById('sentiment-summary');
    const historyList = document.getElementById('history-list');

    let currentConversationId = null;

    function appendMessage(sender, text, sentiment = null) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');

        // Add sentiment tag if available and sender is user
        if (sender === 'user' && sentiment) {
            const sentimentSpan = document.createElement('span');
            sentimentSpan.classList.add('sentiment-tag');
            if (sentiment === 'Positive') sentimentSpan.classList.add('sentiment-positive');
            else if (sentiment === 'Negative') sentimentSpan.classList.add('sentiment-negative');
            else sentimentSpan.classList.add('sentiment-neutral');
            sentimentSpan.textContent = sentiment;

            contentDiv.textContent = text;
            contentDiv.appendChild(sentimentSpan);
        } else {
            contentDiv.textContent = text;
        }

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Clear input
        userInput.value = '';

        // Add user message to UI (sentiment unknown yet)
        appendMessage('user', text);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    conversation_id: currentConversationId
                })
            });

            const data = await response.json();

            if (data.conversation_id && data.conversation_id !== currentConversationId) {
                currentConversationId = data.conversation_id;
                loadHistoryList(); // Refresh list to show new conversation
            }

            // Update the last user message with sentiment
            const userMessages = document.querySelectorAll('.user-message .message-content');
            if (userMessages.length > 0) {
                const lastUserMsg = userMessages[userMessages.length - 1];
                // Check if it already has a sentiment tag (it shouldn't)
                if (!lastUserMsg.querySelector('.sentiment-tag') && data.user_sentiment) {
                    const sentimentSpan = document.createElement('span');
                    sentimentSpan.classList.add('sentiment-tag');
                    if (data.user_sentiment === 'Positive') sentimentSpan.classList.add('sentiment-positive');
                    else if (data.user_sentiment === 'Negative') sentimentSpan.classList.add('sentiment-negative');
                    else sentimentSpan.classList.add('sentiment-neutral');
                    sentimentSpan.textContent = data.user_sentiment;
                    lastUserMsg.appendChild(sentimentSpan);
                }
            }

            // Add bot response to UI
            appendMessage('bot', data.response);

        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('bot', 'Sorry, something went wrong.');
        }
    }

    async function endConversation() {
        if (!currentConversationId) return;

        try {
            const response = await fetch(`/api/analyze?conversation_id=${currentConversationId}`);
            const data = await response.json();

            sentimentLabel.textContent = data.label;
            sentimentScore.textContent = data.score.toFixed(4);
            if (sentimentSummary) {
                sentimentSummary.textContent = data.summary || "No summary available.";
            }

            // Color code the result
            if (data.label === 'Positive') {
                sentimentLabel.style.color = '#10b981';
            } else if (data.label === 'Negative') {
                sentimentLabel.style.color = '#ef4444';
            } else {
                sentimentLabel.style.color = '#f59e0b';
            }

            sentimentResult.classList.remove('hidden');
            // Scroll to bottom to see result
            setTimeout(() => {
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 100);

        } catch (error) {
            console.error('Error analyzing sentiment:', error);
        }
    }

    async function resetConversation() {
        try {
            const response = await fetch('/api/reset', { method: 'POST' });
            const data = await response.json();

            currentConversationId = data.conversation_id;

            // Clear UI
            chatWindow.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">Hello! I'm ready to chat. I'll analyze our conversation sentiment when you're done.</div>
                </div>
            `;
            sentimentResult.classList.add('hidden');

            loadHistoryList();

        } catch (error) {
            console.error('Error resetting conversation:', error);
        }
    }

    async function loadHistoryList() {
        try {
            const response = await fetch('/api/history');
            const conversations = await response.json();

            historyList.innerHTML = '';

            conversations.forEach(conv => {
                const item = document.createElement('div');
                item.classList.add('history-item');
                if (conv.id === currentConversationId) {
                    item.classList.add('active');
                }

                const date = new Date(conv.created_at).toLocaleDateString();
                const preview = conv.last_message || 'New Conversation';

                item.innerHTML = `
                    <div class="history-date">${date}</div>
                    <div class="history-preview">${preview}</div>
                `;

                item.addEventListener('click', () => loadConversation(conv.id));
                historyList.appendChild(item);
            });

        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    async function loadConversation(id) {
        if (id === currentConversationId) return;

        try {
            const response = await fetch(`/api/history/${id}`);
            const messages = await response.json();

            currentConversationId = id;

            // Clear UI
            chatWindow.innerHTML = '';
            sentimentResult.classList.add('hidden');

            // Render messages
            messages.forEach(msg => {
                appendMessage(msg.sender, msg.text, msg.sentiment);
            });

            // Update active state in sidebar
            document.querySelectorAll('.history-item').forEach(item => {
                item.classList.remove('active');
            });
            loadHistoryList(); // Re-render to update active class

        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    endBtn.addEventListener('click', endConversation);
    resetBtn.addEventListener('click', resetConversation);
    newChatBtn.addEventListener('click', resetConversation);

    // Initial load
    loadHistoryList();
});
*/
document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const endBtn = document.getElementById('end-btn');
    const resetBtn = document.getElementById('reset-btn');
    const newChatBtn = document.getElementById('new-chat-btn');
    const sentimentResult = document.getElementById('sentiment-result');
    const sentimentLabel = document.getElementById('sentiment-label');
    const sentimentScore = document.getElementById('sentiment-score');
    const sentimentSummary = document.getElementById('sentiment-summary');
    const historyList = document.getElementById('history-list');

    let currentConversationId = null;

    // --- Helper Functions ---

    // Function to create a typing indicator message
    function createTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot-message', 'typing-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content', 'typing-indicator');
        contentDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        
        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    function appendMessage(sender, text, sentiment = null, isPlaceholder = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;
        
        if (sentiment) {
            // Apply sentiment tag logic
            const sentimentSpan = document.createElement('span');
            sentimentSpan.classList.add('sentiment-tag');
            if (sentiment === 'Positive') sentimentSpan.classList.add('sentiment-positive');
            else if (sentiment === 'Negative') sentimentSpan.classList.add('sentiment-negative');
            else sentimentSpan.classList.add('sentiment-neutral');
            sentimentSpan.textContent = sentiment;
            contentDiv.appendChild(sentimentSpan);
        }
        
        if (isPlaceholder) {
             messageDiv.classList.add('placeholder-message');
        }

        messageDiv.appendChild(contentDiv);
        chatWindow.appendChild(messageDiv);

        // Scroll to bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageDiv;
    }

    // --- Core Logic ---

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Disable input while sending
        userInput.disabled = true;
        sendBtn.disabled = true;

        // Clear input
        userInput.value = '';

        // 1. Add user message to UI as a placeholder (sentiment to be added later)
        const userMsgElement = appendMessage('user', text, null, true);
        
        // 2. Add typing indicator
        const typingIndicator = createTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: text,
                    conversation_id: currentConversationId
                })
            });

            const data = await response.json();

            // 3. Remove typing indicator
            typingIndicator.remove();
            
            // 4. Update Conversation ID and History if new chat started
            if (data.conversation_id && data.conversation_id !== currentConversationId) {
                currentConversationId = data.conversation_id;
                await loadHistoryList(); 
            }

            // 5. Replace the placeholder user message with the final message + sentiment tag
            userMsgElement.remove(); // Remove placeholder
            appendMessage('user', text, data.user_sentiment); // Append final message with sentiment

            // 6. Add bot response to UI
            appendMessage('bot', data.response);

        } catch (error) {
            console.error('Error sending message:', error);
            typingIndicator.remove();
            appendMessage('bot', '❌ Sorry, connection error. Please try again.');
        } finally {
            userInput.disabled = false;
            sendBtn.disabled = false;
            userInput.focus(); // Focus back on input
            loadHistoryList(); // Ensure history list updates with last message
        }
    }

    async function endConversation() {
        if (!currentConversationId) return;

        endBtn.disabled = true;
        endBtn.textContent = 'Analyzing...';
        
        try {
            const response = await fetch(`/api/analyze?conversation_id=${currentConversationId}`);
            const data = await response.json();

            sentimentLabel.textContent = data.label;
            sentimentScore.textContent = `Score: ${data.score.toFixed(4)}`;
            sentimentSummary.textContent = data.summary || "No summary available.";
            
            // Set label color based on analysis label
            sentimentLabel.classList.remove('sentiment-positive', 'sentiment-negative', 'sentiment-neutral');

            if (data.label === 'Positive') {
                sentimentLabel.classList.add('sentiment-positive');
            } else if (data.label === 'Negative') {
                sentimentLabel.classList.add('sentiment-negative');
            } else {
                sentimentLabel.classList.add('sentiment-neutral');
            }

            sentimentResult.classList.remove('hidden');
            
            // Scroll to bottom to see result
            chatWindow.scrollTop = chatWindow.scrollHeight;

        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            sentimentSummary.textContent = "Error running analysis.";
        } finally {
            endBtn.disabled = false;
            endBtn.textContent = 'End Conversation & Analyze Sentiment';
        }
    }

    async function resetConversation() {
        try {
            const response = await fetch('/api/reset', { method: 'POST' });
            const data = await response.json();

            currentConversationId = data.conversation_id;

            // Clear UI
            chatWindow.innerHTML = `
                <div class="message bot-message">
                    <div class="message-content">Hello! I'm ready to chat. I'll analyze our conversation sentiment when you're done.</div>
                </div>
            `;
            sentimentResult.classList.add('hidden');

            await loadHistoryList();

        } catch (error) {
            console.error('Error resetting conversation:', error);
        }
    }

    async function loadHistoryList() {
        try {
            const response = await fetch('/api/history');
            const conversations = await response.json();

            historyList.innerHTML = '';

            conversations.forEach(conv => {
                const item = document.createElement('div');
                item.classList.add('history-item');
                if (conv.id === currentConversationId) {
                    item.classList.add('active');
                }
                item.dataset.conversationId = conv.id;

                const date = new Date(conv.created_at).toLocaleDateString();
                // Improved preview: Use the last message text and truncate
                const preview = conv.last_message ? (conv.last_message.length > 30 ? conv.last_message.substring(0, 27) + '...' : conv.last_message) : 'New Conversation';

                item.innerHTML = `
                    <div class="history-date">${date}</div>
                    <div class="history-preview">${preview}</div>
                `;

                item.addEventListener('click', () => loadConversation(conv.id));
                historyList.appendChild(item);
            });

        } catch (error) {
            console.error('Error loading history:', error);
        }
    }

    async function loadConversation(id) {
        if (id === currentConversationId) return;
        
        try {
            const response = await fetch(`/api/history/${id}`);
            const messages = await response.json();

            currentConversationId = id;

            // Clear UI
            chatWindow.innerHTML = '';
            sentimentResult.classList.add('hidden');

            // Render messages
            messages.forEach(msg => {
                appendMessage(msg.sender, msg.text, msg.sentiment);
            });

            // Update active state in sidebar
            loadHistoryList(); 

        } catch (error) {
            console.error('Error loading conversation:', error);
        }
    }

    // --- Event Listeners ---
    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    endBtn.addEventListener('click', endConversation);
    resetBtn.addEventListener('click', resetConversation);
    newChatBtn.addEventListener('click', resetConversation);

    // Initial load - Start a new conversation if none is active
    (async function initialLoad() {
        await loadHistoryList();
        if (!currentConversationId) {
             await resetConversation();
        }
    })();
});