// ============================================
// API.JS - Gemini API Integration
// ============================================

const GEMINI_API = {
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/',
    MODEL: 'gemini-2.0-flash',

    // Convert image file to base64
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // Get MIME type from file
    getMimeType(file) {
        return file.type || 'image/jpeg';
    },

    // Prepare message content for API
    async prepareContent(text, imageFile = null) {
        const parts = [];

        // Add text if provided
        if (text && text.trim()) {
            parts.push({ text: text.trim() });
        }

        // Add image if provided
        if (imageFile) {
            const base64Data = await this.fileToBase64(imageFile);
            parts.push({
                inline_data: {
                    mime_type: this.getMimeType(imageFile),
                    data: base64Data
                }
            });
        }

        return { parts };
    },

    // Send message to Gemini API
    async sendMessage(conversationHistory, text, imageFile = null) {
        const apiKey = CONFIG.getApiKey();

        if (!apiKey) {
            throw new Error('API key not configured. Please add your Gemini API key in settings.');
        }

        try {
            // Prepare the current message content
            const currentContent = await this.prepareContent(text, imageFile);

            // Build conversation history for context
            const contents = [
                ...conversationHistory.map(msg => ({
                    role: msg.role,
                    parts: msg.parts
                })),
                {
                    role: 'user',
                    parts: currentContent.parts
                }
            ];

            // API endpoint
            const endpoint = `${this.BASE_URL}${this.MODEL}:generateContent?key=${apiKey}`;

            // Make API request
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: contents,
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    },
                    safetySettings: [
                        {
                            category: 'HARM_CATEGORY_HARASSMENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_HATE_SPEECH',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        },
                        {
                            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
            }

            const data = await response.json();

            // Extract response text
            if (data.candidates && data.candidates.length > 0) {
                const candidate = data.candidates[0];
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    return candidate.content.parts[0].text;
                }
            }

            throw new Error('No response generated from the API');

        } catch (error) {
            console.error('Gemini API Error:', error);

            // Provide user-friendly error messages
            if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
                throw new Error('Invalid API key. Please check your API key in settings.');
            } else if (error.message.includes('quota')) {
                throw new Error('API quota exceeded. Please try again later or check your API limits.');
            } else if (error.message.includes('network') || error.name === 'TypeError') {
                throw new Error('Network error. Please check your internet connection and try again.');
            } else {
                throw new Error(error.message || 'Failed to get response from AI. Please try again.');
            }
        }
    },

    // Validate API key format
    validateApiKey(apiKey) {
        // Basic validation - Gemini API keys typically start with "AIza"
        return apiKey && apiKey.length > 20 && apiKey.startsWith('AIza');
    }
};

// Export for use in app.js
window.GEMINI_API = GEMINI_API;
