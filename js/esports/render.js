import { esportsPageData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('esports-page');

    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    const { hero, topTeams, articles, upcomingEvents, gallery } = esportsPageData;

    mainContainer.innerHTML = `
        <section class="hero-section esports-hero">
            <div class="hero-content" data-id="${hero.id}">
                <span class="hero-category">${hero.category}</span>
                <h2>${hero.title}</h2>
                <p>${hero.summary}</p>
                <a href="${hero.link}?id=${hero.id}" class="read-more-btn article-link">Read More →</a>
            </div>
            <div class="hero-image">
                <img src="${hero.imageUrl}" alt="${hero.title}">
            </div>
        </section>

        <section class="top-teams-section">
            <h2>Top Teams</h2>
            <div class="teams-container">
                ${topTeams.map(team => `
                    <div class="team-card">
                        <img src="${team.logoUrl}" alt="${team.name} Logo" class="team-logo">
                        <div class="team-info">
                            <h3>${team.name}</h3>
                            <p>${team.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="news-grid">
            <h2>Latest E-Sports News</h2>
            <div class="articles-container">
                ${articles.map(article => `
                    <article class="news-card" data-sport="${article.sport}" data-id="${article.id}">
                        <img src="${article.imageUrl}" alt="${article.title}">
                        <div class="card-content">
                            <span class="category">${article.category}</span>
                            <h3>${article.title}</h3>
                            <p>${article.summary}</p>
                            <a href="${article.link}?id=${article.id}" class="read-more-link article-link">Full Story</a>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>

        <section class="upcoming-events-section">
            <h2>Upcoming Events</h2>
            <div class="events-container">
                ${upcomingEvents.map(event => `
                    <div class="event-item">
                        <div class="event-date">
                            <span>${event.date}</span>
                        </div>
                        <div class="event-details">
                            <h3>${event.tournament}</h3>
                            <p>${event.game}</p>
                        </div>
                        <div class="event-prize">
                            <span>Prize Pool</span>
                            <strong>${event.prize}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="gallery-section">
            <h2>Top Plays Gallery</h2>
            <div class="gallery-grid">
                ${gallery.map(item => `
                    <div class="gallery-item">
                        <img src="${item.imageUrl}" alt="${item.title}">
                        <div class="gallery-overlay">
                            <h3>${item.title}</h3>
                            <p>${item.game}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}); 