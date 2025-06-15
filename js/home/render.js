import { homePageData } from './data.js';
import { timeAgo } from '../utils/time.js';

document.addEventListener('DOMContentLoaded', async () => {
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    // Show loading state
    window.loadingManager.show();

    try {
        // Simulate data loading (remove this in production and use actual data fetching)
        await new Promise(resolve => setTimeout(resolve, 500));

        mainContainer.innerHTML = `
            <!-- Hero Section -->
            <section class="hero-section" data-id="${homePageData.hero.id}">
                <div class="hero-content">
                    <span class="hero-category">${homePageData.hero.category}</span>
                    <h2>${homePageData.hero.title}</h2>
                    <p>${homePageData.hero.summary}</p>
                    <a href="${homePageData.hero.link}" class="read-more-btn article-link">Read More →</a>
                </div>
                <div class="hero-image">
                    <img src="${homePageData.hero.imageUrl}" alt="${homePageData.hero.title}">
                </div>
            </section>

            <!-- Top Picks Section -->
            <section class="top-picks-section">
                <h2>Top Picks For You</h2>
                <div class="articles-container">
                    ${homePageData.topPicks.slice(0, 6).map(article => `
                        <article class="news-card" data-sport="${article.sport}" data-id="${article.id}">
                            <img src="${article.imageUrl}" alt="${article.title}">
                            <div class="card-content">
                                <span class="category">${article.category}</span>
                                <h3>${article.title}</h3>
                                <a href="${article.link}" class="read-more-link article-link">Full Story</a>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>

            <!-- Latest News Section -->
            <section class="latest-news-section">
                <h2>Latest Updates</h2>
                <div class="latest-news-list">
                    ${homePageData.latestNews
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
                        .map(article => `
                        <article class="latest-news-item" data-sport="${article.sport}" data-id="${article.id}">
                            <div class="news-item-content">
                                <h3>${article.title}</h3>
                                <p>${article.summary}</p>
                                <span class="timestamp" data-timestamp="${article.timestamp}">${timeAgo(article.timestamp)}</span>
                            </div>
                            <a href="${article.link}" class="read-more-link article-link">→</a>
                        </article>
                    `).join('')}
                </div>
            </section>

            <!-- Spotlight Section -->
            <section class="spotlight-section">
                <h2>In the Spotlight</h2>
                <div class="spotlight-container">
                    ${homePageData.spotlight.map(player => `
                        <div class="spotlight-card" data-id="${player.id}">
                            <img src="${player.imageUrl}" alt="${player.name}">
                            <div class="spotlight-info">
                                <h3>${player.name}</h3>
                                <span>${player.sport}</span>
                                <p>${player.summary}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;

        function updateTimestamps() {
            const timestampElements = document.querySelectorAll('.timestamp[data-timestamp]');
            timestampElements.forEach(span => {
                const dateString = span.dataset.timestamp;
                if (dateString) {
                    span.textContent = timeAgo(dateString);
                }
            });
        }

        setInterval(updateTimestamps, 60000);
    } catch (error) {
        console.error('Error loading page data:', error);
        mainContainer.innerHTML = '<div class="error-message">Failed to load content. Please try again later.</div>';
    } finally {
        // Hide loading state
        window.loadingManager.hide();
    }
}); 