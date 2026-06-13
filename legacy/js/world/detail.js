import { worldPageData } from './data.js';

function getWorldArticleById(id) {
  // Search hero and latest/analysis for matching id
  if (worldPageData.heroArticle && worldPageData.heroArticle.id === id) {
    return {
      title: worldPageData.heroArticle.title,
      date: worldPageData.heroArticle.date,
      imageUrl: worldPageData.heroArticle.imageUrl,
      body: `<p>${worldPageData.heroArticle.summary}</p>`
    };
  }

  const pools = [
    ...(worldPageData.latestNews || []),
    ...(worldPageData.analysisArticles || [])
  ];
  const found = pools.find(a => a.id === id);
  if (found) {
    return {
      title: found.title,
      date: found.date,
      imageUrl: found.imageUrl,
      body: `<p>${found.summary}</p>`
    };
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const notFound = document.getElementById('article-not-found');
  const titleEl = document.getElementById('detail-title');
  const metaEl = document.getElementById('detail-meta');
  const imgWrap = document.getElementById('detail-image');
  const bodyEl = document.getElementById('detail-body');

  if (!id) {
    notFound.style.display = 'block';
    return;
  }

  const article = getWorldArticleById(id);
  if (!article) {
    notFound.style.display = 'block';
    return;
  }

  titleEl.textContent = article.title;
  metaEl.textContent = article.date || '';
  if (article.imageUrl) {
    const img = document.createElement('img');
    img.src = article.imageUrl;
    img.alt = article.title;
    img.style.width = '100%';
    img.style.objectFit = 'cover';
    imgWrap.appendChild(img);
  }
  bodyEl.innerHTML = article.body;
});


