class LoadingManager {
    constructor() {
        this.loadingContainer = document.getElementById('loading-container');
        this.loadingText = this.loadingContainer?.querySelector('.loading-text');
        this.loadingContent = this.loadingContainer?.querySelector('.loading-content');
        this.animationDuration = 400; // Match CSS transition duration
    }

    show(message = null) {
        if (!this.loadingContainer) return;

        // Set initial message
        if (this.loadingText && message) {
            this.loadingText.textContent = message;
        }

        // Show loading container
        this.loadingContainer.style.display = 'flex';
        
        // Force reflow
        this.loadingContainer.offsetHeight;
        
        // Add active class for animation
        this.loadingContainer.classList.add('active');
    }

    hide() {
        if (!this.loadingContainer) return;

        // Remove active class for fade out
        this.loadingContainer.classList.remove('active');

        // Wait for animation to complete before hiding
        setTimeout(() => {
            if (this.loadingContainer) {
                this.loadingContainer.style.display = 'none';
            }
        }, this.animationDuration);
    }

    setMessage(message) {
        if (this.loadingText) {
            this.loadingText.textContent = message;
        }
    }
}

// Create a global instance
window.loadingManager = new LoadingManager();