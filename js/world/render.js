import { worldNewsSection } from './data.js';
import { renderMenuBar } from '../menu.js';

function renderWorldNewsSection(section) {
  return `
    <section>
      <h1 class="section-header">${section.header}</h1>
      <div class="news-grid">
        ${section.items.map(item => `
          <div class="article-card">
            <div class="article-image" style="background:#e2e8f0;display:flex;align-items:center;justify-content:center;height:200px;font-size:2rem;font-weight:bold;color:#4a5568;">
              ${item.imageText}
            </div>
            <div class="p-6">
              <h2 class="article-title">${item.title}</h2>
              <p class="article-desc">${item.description}</p>
              <a href="../html/detail.html?id=${item.id}" class="read-more">Read More &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menu-root').innerHTML = renderMenuBar('world');
  document.getElementById('world-news-root').innerHTML = renderWorldNewsSection(worldNewsSection);
}); 