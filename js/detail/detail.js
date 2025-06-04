import { newsSections } from '../home/data.js';

function getArticleById(id) {
  for (const section of newsSections) {
    const found = section.items.find(item => item.id === id);
    if (found) return found;
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const article = getArticleById(id);

  if (article) {
    document.getElementById('detail-title').textContent = article.title;
    document.getElementById('detail-image').textContent = article.imageText;
    document.getElementById('detail-desc').textContent = article.description;
    document.getElementById('detail-body').innerHTML = article.detail;
  } else {
    document.getElementById('article-detail-content').classList.add('hidden');
    document.getElementById('article-not-found').classList.remove('hidden');
  }
}); 