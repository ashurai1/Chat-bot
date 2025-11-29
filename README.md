# Royal AI Chat - ChatGPT Clone

A premium, royal-themed AI chat application powered by Google's Gemini API. Features elegant glassmorphism design, smooth animations, and support for both text and image inputs.

![Royal AI Chat](https://img.shields.io/badge/Status-Ready-gold?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

### Core Functionality
- 🤖 **Gemini API Integration** - Powered by Google's latest Gemini 1.5 Flash model
- 💬 **Text Messaging** - Send and receive text messages with conversation context
- 🖼️ **Image Support** - Upload and send images with your messages
- 💾 **Session Memory** - Maintains conversation history during your session
- 🎯 **No Authentication** - Simple, instant access without sign-up

### Premium UI/UX
- 👑 **Royal Theme** - Deep purple, royal blue, and gold accents
- 🌓 **Dark/Light Mode** - Toggle between dark and light themes with smooth transitions
- ✨ **Glassmorphism** - Modern frosted glass effects with backdrop blur
- 🎭 **Smooth Animations** - Fade, slide, and expansion animations for all elements
- 🎨 **Micro-interactions** - Hover effects, ripples, and glows on all interactive elements
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🌊 **Animated Background** - Subtle pulsing gradient background

### Animations & Effects
- Page load fade-in animation
- Message bubble slide-in with stagger effect
- Typing indicator with bouncing dots
- Button hover scale and glow effects
- Press ripple animations
- Smooth transitions (200-350ms)
- Theme switching with color transitions

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A Gemini API key (free from Google AI Studio)

### Getting Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Installation & Setup

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd Chatbot
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server -p 8000
     ```
   - Then navigate to `http://localhost:8000`

3. **Configure your API key**
   - On first launch, you'll see a configuration modal
   - Paste your Gemini API key
   - Click "Save & Start Chatting"
   - Your key is stored securely in your browser's localStorage

4. **Start chatting!**
   - Type a message and press Enter or click the send button
   - Upload images using the image button
   - Enjoy the premium AI chat experience

## 📁 File Structure

```
Chatbot/
├── index.html          # Main HTML structure
├── styles.css          # Royal theme styling and animations
├── app.js              # Core application logic
├── api.js              # Gemini API integration
├── config.js           # API key configuration management
└── README.md           # This file
```

### File Descriptions

- **index.html** - Semantic HTML structure with chat interface, input area, and configuration modal
- **styles.css** - Complete styling with royal color palette, glassmorphism effects, and all animations
- **app.js** - Main application logic including message handling, UI updates, and state management
- **api.js** - Gemini API integration with support for text and image inputs
- **config.js** - API key storage and configuration modal management

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-primary: #2d1b4e;        /* Deep purple */
    --color-secondary: #1e3a8a;      /* Royal blue */
    --color-accent: #d4af37;         /* Gold */
    --color-background: #0a0015;     /* Deep black */
}
```

### Adjusting Animations

Modify animation durations in `styles.css`:

```css
:root {
    --transition-fast: 200ms ease;
    --transition-medium: 300ms ease;
    --transition-slow: 500ms ease;
}
```

### Changing AI Model

Edit the model in `api.js`:

```javascript
const GEMINI_API = {
    MODEL: 'gemini-1.5-flash',  // Change to 'gemini-1.5-pro' for better quality
    // ...
};
```

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with custom properties, animations, and glassmorphism
- **Vanilla JavaScript** - No frameworks, pure ES6+ JavaScript
- **Gemini API** - Google's generative AI API

### Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### API Features Used
- Multi-modal inputs (text + images)
- Conversation history for context
- Safety settings
- Temperature and token controls

## 🎯 Usage Tips

1. **Conversation Context** - The app maintains conversation history, so the AI remembers previous messages in your session
2. **Image Quality** - For best results, use clear, well-lit images under 4MB
3. **API Limits** - Free tier has rate limits; if you hit them, wait a few minutes
4. **Privacy** - All data is stored locally in your browser; nothing is saved on any server
5. **Theme Toggle** - Click the sun/moon icon (top right) to switch between dark and light modes
6. **Settings** - Click the settings icon (top right) to change your API key

## 🐛 Troubleshooting

### "Invalid API key" error
- Verify your API key is correct
- Ensure it starts with "AIza"
- Check that it's enabled in Google AI Studio

### "API quota exceeded" error
- You've hit the free tier rate limit
- Wait a few minutes and try again
- Consider upgrading your API plan

### Images not sending
- Check image size (must be under 4MB)
- Ensure file is a valid image format (JPEG, PNG, GIF, WebP)
- Try a different image

### Messages not appearing
- Check browser console for errors (F12)
- Verify your internet connection
- Try refreshing the page

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for powering the AI responses
- Google Fonts for Playfair Display and Inter fonts
- Inspired by modern AI chat interfaces

## 👨‍💻 Developer

Created with ❤️ by **Ashwani**

© 2025 Royal AI Chat. All rights reserved.

## 📧 Support

For issues or questions, please open an issue on GitHub or contact the developer.

---

**Enjoy your premium AI chat experience! 👑✨**
