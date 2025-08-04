// World News Page Render Script
import { worldPageData } from './data.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    // Show loading state
    if (window.loadingManager) {
        window.loadingManager.show();
    }

    try {
        // Simulate data loading (remove this in production and use actual data fetching)
        await new Promise(resolve => setTimeout(resolve, 300));

        // Add dynamic content if needed
        addDynamicContent();
        
        // Initialize interactive features
        initializeInteractions();

    } catch (error) {
        console.error('Error loading world news data:', error);
        if (mainContainer) {
            mainContainer.innerHTML += '<div class="error-message">Failed to load additional content. Please try again later.</div>';
        }
    } finally {
        // Hide loading state
        if (window.loadingManager) {
            window.loadingManager.hide();
        }
    }
});

function addDynamicContent() {
    // Add real-time updates section
    const realTimeSection = document.createElement('section');
    realTimeSection.className = 'real-time-updates';
    realTimeSection.innerHTML = `
        <h2>Real-Time Updates</h2>
        <div class="updates-container">
            <div class="update-item">
                <span class="update-time">2 minutes ago</span>
                <p>UN Security Council convenes emergency meeting on climate crisis</p>
            </div>
            <div class="update-item">
                <span class="update-time">15 minutes ago</span>
                <p>Major tech companies announce joint initiative for digital privacy standards</p>
            </div>
            <div class="update-item">
                <span class="update-time">1 hour ago</span>
                <p>Global markets respond positively to new trade agreement</p>
            </div>
        </div>
    `;

    // Insert after the world-regions section
    const regionsSection = document.querySelector('.world-regions');
    if (regionsSection) {
        regionsSection.parentNode.insertBefore(realTimeSection, regionsSection.nextSibling);
    }

    // Add CSS for real-time updates
    const style = document.createElement('style');
    style.textContent = `
        .real-time-updates {
            margin-bottom: 50px;
        }
        
        .real-time-updates h2 {
            font-family: 'Oswald', sans-serif;
            font-size: 2.5rem;
            margin-bottom: 30px;
            color: #2c3e50;
            text-align: center;
        }
        
        .updates-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .update-item {
            padding: 20px;
            border-bottom: 1px solid #eee;
            transition: background-color 0.3s ease;
        }
        
        .update-item:last-child {
            border-bottom: none;
        }
        
        .update-item:hover {
            background-color: #f8f9fa;
        }
        
        .update-time {
            display: block;
            font-size: 0.8rem;
            color: #667eea;
            font-weight: 500;
            margin-bottom: 8px;
        }
        
        .update-item p {
            margin: 0;
            color: #555;
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .real-time-updates h2 {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
}

function initializeInteractions() {
    // Add click handlers for news cards
    const newsCards = document.querySelectorAll('.world-news-card');
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // In a real application, this would navigate to a detail page
            console.log('News card clicked:', this.querySelector('h3').textContent);
        });
    });

    // Add hover effects for region cards
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'white';
        });
    });

    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Export functions for potential use in other modules
export { addDynamicContent, initializeInteractions };