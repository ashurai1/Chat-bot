// ============================================
// APP.JS - Main Application Logic
// ============================================

class ChatApp {
    constructor() {
        // DOM Elements
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.imageUploadBtn = document.getElementById('imageUploadBtn');
        this.imageInput = document.getElementById('imageInput');
        this.imagePreviewContainer = document.getElementById('imagePreviewContainer');
        this.imagePreview = document.getElementById('imagePreview');
        this.removeImageBtn = document.getElementById('removeImageBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.themeToggle = document.getElementById('themeToggle');

        // State
        this.conversationHistory = [];
        this.currentImage = null;
        this.isProcessing = false;

        this.init();
    }

    init() {
        // Event listeners
        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.messageInput.addEventListener('input', () => this.handleInputChange());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        this.imageUploadBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleImageSelect(e));
        this.removeImageBtn.addEventListener('click', () => this.removeImage());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => this.autoResizeTextarea());

        // Load saved theme
        this.loadTheme();
    }

    // Theme management
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    }

    // Handle input change to enable/disable send button
    handleInputChange() {
        const hasText = this.messageInput.value.trim().length > 0;
        const hasImage = this.currentImage !== null;
        this.sendBtn.disabled = !hasText && !hasImage;
    }

    // Auto-resize textarea based on content
    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 150) + 'px';
    }

    // Handle image selection
    handleImageSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        // Validate file size (max 4MB)
        if (file.size > 4 * 1024 * 1024) {
            alert('Image size must be less than 4MB');
            return;
        }

        this.currentImage = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imagePreview.src = e.target.result;
            this.imagePreviewContainer.classList.add('active');
            this.handleInputChange();
        };
        reader.readAsDataURL(file);
    }

    // Remove selected image
    removeImage() {
        this.currentImage = null;
        this.imagePreview.src = '';
        this.imagePreviewContainer.classList.remove('active');
        this.imageInput.value = '';
        this.handleInputChange();
    }

    // Handle send message
    async handleSend() {
        if (this.isProcessing) return;

        const text = this.messageInput.value.trim();
        const image = this.currentImage;

        if (!text && !image) return;

        // Check API key
        if (!CONFIG.hasApiKey()) {
            window.configModal.show();
            return;
        }

        this.isProcessing = true;
        this.sendBtn.disabled = true;

        try {
            // Hide welcome message if present
            const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
            if (welcomeMsg) {
                welcomeMsg.style.display = 'none';
            }

            // Add user message to UI
            await this.addMessage('user', text, image);

            // Prepare conversation history for API
            const userContent = await GEMINI_API.prepareContent(text, image);

            // Clear input
            this.messageInput.value = '';
            this.removeImage();
            this.autoResizeTextarea();

            // Show typing indicator
            this.showTypingIndicator();

            // Get AI response
            const response = await GEMINI_API.sendMessage(
                this.conversationHistory,
                text,
                image
            );

            // Add to conversation history
            this.conversationHistory.push({
                role: 'user',
                parts: userContent.parts
            });

            this.conversationHistory.push({
                role: 'model',
                parts: [{ text: response }]
            });

            // Hide typing indicator
            this.hideTypingIndicator();

            // Add AI response to UI
            await this.addMessage('ai', response);

        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTypingIndicator();
            this.showError(error.message);
        } finally {
            this.isProcessing = false;
            this.handleInputChange();
        }
    }

    // Add message to UI
    async addMessage(sender, text, imageFile = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';

        // Add image if present
        if (imageFile) {
            const img = document.createElement('img');
            img.className = 'message-image';
            img.src = URL.createObjectURL(imageFile);
            bubbleDiv.appendChild(img);
        }

        // Add text if present
        if (text) {
            const textDiv = document.createElement('div');
            textDiv.className = 'message-text';
            textDiv.textContent = text;
            bubbleDiv.appendChild(textDiv);
        }

        messageDiv.appendChild(bubbleDiv);
        this.messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        this.scrollToBottom();

        // Trigger animation with slight delay for stagger effect
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Show typing indicator
    showTypingIndicator() {
        this.typingIndicator.classList.add('active');
        this.scrollToBottom();
    }

    // Hide typing indicator
    hideTypingIndicator() {
        this.typingIndicator.classList.remove('active');
    }

    // Scroll to bottom of messages
    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message ai';
        errorDiv.innerHTML = `
            <div class="message-bubble" style="background: rgba(220, 38, 38, 0.2); border-color: rgba(220, 38, 38, 0.5);">
                <div class="message-text">
                    ⚠️ Error: ${message}
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(errorDiv);
        this.scrollToBottom();
    }

    // Show notification
    showNotification(message) {
        // Simple notification - could be enhanced with a toast component
        console.log('Notification:', message);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.chatApp = new ChatApp();
    });
} else {
    window.chatApp = new ChatApp();
}
