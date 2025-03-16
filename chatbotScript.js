
        const time = new Date();
        let t = time.getHours();
        if (t<=4) {
            document.getElementById('empty-chat').innerHTML = `
                Happy Late Night, user.
            `;
        } else if (t<=11) {
            document.getElementById('empty-chat').innerHTML = `
                Good Morning, user.
            `;
        } else if (t<=16) {
            document.getElementById('empty-chat').innerHTML = `
                Good Afternoon, user.
            `;
        } else {
            document.getElementById('empty-chat').innerHTML = `
                Good Evening, user.
            `;
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const chatbotIcon = document.getElementById('chatbot-icon');
            const chatbotContainer = document.getElementById('chatbot-container');
            const closeBtn = document.getElementById('close-btn');
            const chatMessages = document.getElementById('chat-messages');
            const messageInput = document.getElementById('message-input');
            const sendBtn = document.getElementById('send-btn');
            
            let isLoading = false;
            
            // Toggle chatbot visibility with smooth transition
            function toggleChatbot() {
                const isVisible = chatbotContainer.classList.contains('active');
                
                if (isVisible) {
                    // Hide the chat window
                    chatbotContainer.classList.remove('active');
                    
                    // Show the icon with a slight delay
                    setTimeout(() => {
                        chatbotIcon.style.display = 'flex';
                        // Add a small animation to the icon
                        chatbotIcon.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            chatbotIcon.style.transform = 'scale(1)';
                        }, 150);
                    }, 300); // Delay matches the transition duration
                } else {
                    // Hide the icon
                    chatbotIcon.style.display = 'none';
                    
                    // Show the chat window
                    chatbotContainer.classList.add('active');
                    
                    // Focus on input
                    setTimeout(() => {
                        messageInput.focus();
                    }, 300); // Wait for animation to complete
                    
                    // Remove empty message if there are other messages
                    const emptyMessage = chatMessages.querySelector('.empty-chat-message');
                    if (emptyMessage && chatMessages.children.length > 1) {
                        emptyMessage.remove();
                    }
                }
            }
            
            // Add a message to the chat
            function addMessage(text, sender) {
                // Remove empty message if it exists
                const emptyMessage = chatMessages.querySelector('.empty-chat-message');
                if (emptyMessage) {
                    emptyMessage.remove();
                }
                
                const messageElement = document.createElement('div');
                messageElement.className = `message ${sender}-message`;
                messageElement.textContent = text;
                
                chatMessages.appendChild(messageElement);
                
                // Scroll to the bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Show loading indicator
            function showLoadingIndicator() {
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.id = 'loading-indicator';
                
                for (let i = 0; i < 3; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'loading-dot';
                    loadingIndicator.appendChild(dot);
                }
                
                chatMessages.appendChild(loadingIndicator);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Hide loading indicator
            function hideLoadingIndicator() {
                const loadingIndicator = document.getElementById('loading-indicator');
                if (loadingIndicator) {
                    loadingIndicator.remove();
                }
            }
            
            // Send message
            async function sendMessage() {
                const message = messageInput.value.trim();
                if (message === '' || isLoading) return;
                
                // Add user message
                addMessage(message, 'user');
                
                // Clear input
                messageInput.value = '';
                
                // Show loading
                isLoading = true;
                showLoadingIndicator();
                sendBtn.disabled = true;
                
                try {
                    // Call the Gemini API
                    const response = await fetchGeminiResponse(message);
                    
                    // Hide loading
                    hideLoadingIndicator();
                    
                    // Add bot response
                    addMessage(response, 'bot');
                } catch (error) {
                    // Hide loading
                    hideLoadingIndicator();
                    
                    // Add error message
                    addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
                    console.error('Error:', error);
                } finally {
                    isLoading = false;
                    sendBtn.disabled = false;
                    messageInput.focus();
                }
            }
            
            // Fetch response from Gemini API
            async function fetchGeminiResponse(text) {
                const API_KEY = 'AIzaSyCtYUgTP0059i6otyEcQMp2sUjA3HOYb3M';
                const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
               
                // Check if the text is travel-related
                const travelKeywords = ["travel", "trip", "tour", "vacation", "holiday", "flight", "hotel", "destination", "sightseeing", "adventure", "transport", "journey", "explore"];
                const isTravelQuery = travelKeywords.some(keyword => text.toLowerCase().includes(keyword));
            
                if (!isTravelQuery) {
                    return "I'm here to assist with travel-related queries. Please ask something about travel.";
                }
            
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: text
                                    }
                                ]
                            }
                        ]
                    })
                });
            
                if (!response.ok) {
                    throw new Error('Failed to fetch response');
                }
            
                const data = await response.json();
                return data.candidates[0].content.parts[0].text;
            }
            
            // Event Listeners
            chatbotIcon.addEventListener('click', toggleChatbot);
            closeBtn.addEventListener('click', toggleChatbot);
            
            sendBtn.addEventListener('click', sendMessage);
            
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Update send button state based on input
            messageInput.addEventListener('input', function() {
                sendBtn.disabled = messageInput.value.trim() === '' || isLoading;
            });
        });
    