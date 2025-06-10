import { worldNewsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content-area').querySelector('.container');
    if (!mainContent) return;

    // Clear the placeholder content
    mainContent.innerHTML = '';

    // Render all the new sections
    mainContent.appendChild(createHeroSection(worldNewsData.heroArticle));
    mainContent.appendChild(createLatestNewsSection(worldNewsData.latestNews));
    mainContent.appendChild(createMajorEventsSection(worldNewsData.majorEvents));
    mainContent.appendChild(createAthleteSpotlightSection(worldNewsData.athleteSpotlight));
    mainContent.appendChild(createRegionalNewsSection(worldNewsData.regionalNews));
    
    // Activate the first tab in the regional news section
    activateRegionalNewsTab();
});

function createHeroSection(article) {
  const heroSection = document.createElement('section');
  heroSection.className = 'hero-section world-hero';
  heroSection.innerHTML = `
    <div class="hero-image">
      <img src="${article.imageUrl}" alt="${article.title}">
    </div>
    <div class="hero-content">
      <span class="hero-category">${article.category}</span>
      <h2>${article.title}</h2>
      <p>${article.summary}</p>
      <a href="${article.link}" class="read-more-btn">Read Full Story <i class="fas fa-arrow-right"></i></a>
    </div>
  `;
  return heroSection;
}

function createLatestNewsSection(articles) {
  const newsSection = document.createElement('section');
  newsSection.className = 'news-grid';
  
  const articlesHtml = articles.map(article => `
    <div class="news-card">
      <img src="${article.imageUrl}" alt="${article.title}">
      <div class="card-content">
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <a href="${article.link}" class="read-more-link">Learn More</a>
      </div>
    </div>
  `).join('');

  newsSection.innerHTML = `
    <h2>Latest World News</h2>
    <div class="articles-container">
      ${articlesHtml}
    </div>
  `;
  return newsSection;
}

function createMajorEventsSection(events) {
  const eventsSection = document.createElement('section');
  eventsSection.className = 'major-events-section';

  const eventsHtml = events.map(event => `
    <div class="event-card">
      <div class="event-icon"><i class="${event.icon}"></i></div>
      <div class="event-info">
        <h3>${event.name}</h3>
        <p><strong>Host:</strong> ${event.host}</p>
        <p><strong>Date:</strong> ${event.date}</p>
      </div>
    </div>
  `).join('');

  eventsSection.innerHTML = `
    <h2>Upcoming Major Events</h2>
    <div class="events-container">
      ${eventsHtml}
    </div>
  `;
  return eventsSection;
}

function createAthleteSpotlightSection(athletes) {
  const spotlightSection = document.createElement('section');
  spotlightSection.className = 'athlete-spotlight-section';

  const athletesHtml = athletes.map(athlete => `
    <div class="athlete-card">
      <img src="${athlete.imageUrl}" alt="${athlete.name}" class="athlete-avatar">
      <div class="athlete-info">
        <h3>${athlete.name}</h3>
        <span>${athlete.sport} - ${athlete.country}</span>
        <p>${athlete.achievement}</p>
      </div>
    </div>
  `).join('');

  spotlightSection.innerHTML = `
    <h2>Athlete Spotlight</h2>
    <div class="spotlight-container">
      ${athletesHtml}
    </div>
  `;
  return spotlightSection;
}

function createRegionalNewsSection(regionalData) {
  const regionalSection = document.createElement('section');
  regionalSection.className = 'regional-news-section';

  const tabs = Object.keys(regionalData).map(region => `
    <button class="tab-button" data-region="${region}">${region.charAt(0).toUpperCase() + region.slice(1)}</button>
  `).join('');

  const tabContents = Object.entries(regionalData).map(([region, articles]) => {
    const articlesHtml = articles.map(article => `<li><a href="${article.link}">${article.title}</a></li>`).join('');
    return `
      <div class="tab-content" id="region-${region}">
        <ul>${articlesHtml}</ul>
      </div>
    `;
  }).join('');

  regionalSection.innerHTML = `
    <h2>News by Region</h2>
    <div class="tabs-container">${tabs}</div>
    <div class="tab-content-container">${tabContents}</div>
  `;

  return regionalSection;
}

function activateRegionalNewsTab() {
  const tabsContainer = document.querySelector('.regional-news-section .tabs-container');
  const contentContainer = document.querySelector('.regional-news-section .tab-content-container');
  if (!tabsContainer || !contentContainer) return;
  
  const tabs = tabsContainer.querySelectorAll('.tab-button');
  const contents = contentContainer.querySelectorAll('.tab-content');

  // Set default active tab
  if (tabs.length > 0) {
    tabs[0].classList.add('active');
  }
  if (contents.length > 0) {
    contents[0].classList.add('active');
  }

  tabsContainer.addEventListener('click', (e) => {
    if (e.target.matches('.tab-button')) {
      const region = e.target.dataset.region;

      tabs.forEach(tab => tab.classList.remove('active'));
      e.target.classList.add('active');

      contents.forEach(content => content.classList.remove('active'));
      const activeContent = document.getElementById(`region-${region}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    }
  });
} 