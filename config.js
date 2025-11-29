// ============================================
// CONFIG.JS - API Key Configuration Management
// ============================================

const CONFIG = {
    API_KEY_STORAGE_KEY: 'gemini_api_key',
    
    // Get API key from localStorage
    getApiKey() {
        return localStorage.getItem(this.API_KEY_STORAGE_KEY);
    },
    
    // Save API key to localStorage
    setApiKey(key) {
        localStorage.setItem(this.API_KEY_STORAGE_KEY, key);
    },
    
    // Check if API key exists
    hasApiKey() {
        return !!this.getApiKey();
    },
    
    // Clear API key
    clearApiKey() {
        localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    }
};

// Modal Management
class ConfigModal {
    constructor() {
        this.modal = document.getElementById('configModal');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.saveBtn = document.getElementById('saveApiKey');
        this.settingsBtn = document.getElementById('settingsBtn');
        
        this.init();
    }
    
    init() {
        // Show modal if no API key exists
        if (!CONFIG.hasApiKey()) {
            this.show();
        }
        
        // Event listeners
        this.saveBtn.addEventListener('click', () => this.saveApiKey());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        });
        
        this.settingsBtn.addEventListener('click', () => this.show());
    }
    
    show() {
        this.modal.classList.add('active');
        this.apiKeyInput.value = CONFIG.getApiKey() || '';
        this.apiKeyInput.focus();
    }
    
    hide() {
        this.modal.classList.remove('active');
    }
    
    saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        
        if (!apiKey) {
            alert('Please enter a valid API key');
            return;
        }
        
        CONFIG.setApiKey(apiKey);
        this.hide();
        
        // Reload page if this is first time setup
        if (window.chatApp) {
            window.chatApp.showNotification('API key saved successfully!');
        }
    }
}

// Initialize modal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.configModal = new ConfigModal();
    });
} else {
    window.configModal = new ConfigModal();
}
