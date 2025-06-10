import { sportPageData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    const { hero, livePulse, articles } = sportPageData;

    mainContainer.innerHTML = `
        <section class="hero-section">
            <div class="hero-content" data-id="${hero.id}">
                <span class="hero-category">${hero.category}</span>
                <h2>${hero.title}</h2>
                <p>${hero.summary}</p>
                <a href="${hero.link}" class="read-more-btn article-link">Read More →</a>
            </div>
            <div class="hero-image">
                <img src="${hero.imageUrl}" alt="${hero.title}">
            </div>
        </section>

        <section class="live-pulse">
            <h3><i class="fas fa-satellite-dish"></i> Live Pulse</h3>
            <div class="pulse-items">
                ${livePulse.map(item => `
                    <div class="pulse-item ${item.isBreaking ? 'breaking' : ''}">${item.content}</div>
                `).join('')}
            </div>
        </section>

        <section class="news-grid">
            <h2>Latest News</h2>
            <div class="articles-container">
                ${articles.map(article => `
                    <article class="news-card" data-sport="${article.sport}" data-id="${article.id}">
                        <img src="${article.imageUrl}" alt="${article.title}">
                        <div class="card-content">
                            <span class="category">${article.category}</span>
                            <h3>${article.title}</h3>
                            <p>${article.summary}</p>
                            <a href="${article.link}" class="read-more-link article-link">Full Story</a>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    `;
}); 