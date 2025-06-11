class LoadingManager {
    constructor() {
        this.loadingContainer = document.getElementById('loading-container');
        this.loadingText = this.loadingContainer?.querySelector('.loading-text');
        this.loadingContent = this.loadingContainer?.querySelector('.loading-content');
        
        this.loadingMessages = [
            'Loading your news...',
            'Preparing your personalized feed...',
            'Fetching latest updates...',
            'Almost there...',
            'Getting everything ready...'
        ];
        
        this.currentMessageIndex = 0;
        this.messageInterval = null;
        this.animationDuration = 400; // Match CSS transition duration
    }

    show(message = null) {
        if (!this.loadingContainer) return;

        // Clear any existing message interval
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
        }

        // Set initial message
        if (this.loadingText) {
            this.loadingText.textContent = message || this.getNextMessage();
        }

        // Show loading container
        this.loadingContainer.style.display = 'flex';
        
        // Force reflow
        this.loadingContainer.offsetHeight;
        
        // Add active class for animation
        this.loadingContainer.classList.add('active');

        // Start rotating messages
        this.startMessageRotation();
    }

    hide() {
        if (!this.loadingContainer) return;

        // Stop message rotation
        if (this.messageInterval) {
            clearInterval(this.messageInterval);
            this.messageInterval = null;
        }

        // Remove active class for fade out
        this.loadingContainer.classList.remove('active');

        // Wait for animation to complete before hiding
        setTimeout(() => {
            if (this.loadingContainer) {
                this.loadingContainer.style.display = 'none';
            }
        }, this.animationDuration);
    }

    startMessageRotation() {
        this.messageInterval = setInterval(() => {
            if (this.loadingText) {
                this.loadingText.textContent = this.getNextMessage();
            }
        }, 3000); // Change message every 3 seconds
    }

    getNextMessage() {
        const message = this.loadingMessages[this.currentMessageIndex];
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loadingMessages.length;
        return message;
    }

    setMessage(message) {
        if (this.loadingText) {
            this.loadingText.textContent = message;
        }
    }
}

// Create a global instance
window.loadingManager = new LoadingManager();

// Test the loading component
document.addEventListener('DOMContentLoaded', () => {
    window.loadingManager.show();
    // Hide after 3 seconds for testing
    setTimeout(() => {
        window.loadingManager.hide();
    }, 3000);
}); 