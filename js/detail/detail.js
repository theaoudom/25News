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
    
    const loadingIndicator = document.getElementById('loading-indicator');
    const articleContent = document.getElementById('article-detail-content');
    const notFoundMessage = document.getElementById('article-not-found');

    // Show loading indicator
    loadingIndicator.style.display = 'block';
    articleContent.style.display = 'none';
    notFoundMessage.classList.add('hidden');

    // Simulate a short delay for fetching data
    setTimeout(() => {
        const article = getArticleById(id);

        loadingIndicator.style.display = 'none';

        if (article) {
            document.getElementById('detail-title').textContent = article.title;
            
            const imageContainer = document.getElementById('detail-image');
            if (article.image) {
                const img = document.createElement('img');
                img.src = `../${article.image}`;
                img.alt = article.title;
                img.style.maxHeight = '400px';
                img.style.width = '100%';
                img.style.objectFit = 'cover';
                imageContainer.appendChild(img);
            } else {
                imageContainer.textContent = article.imageText || 'Image not available';
                imageContainer.style.background = '#e2e8f0';
                imageContainer.style.display = 'flex';
                imageContainer.style.alignItems = 'center';
                imageContainer.style.justifyContent = 'center';
                imageContainer.style.height = '200px';
                imageContainer.style.fontSize = '1.5rem';
                imageContainer.style.fontWeight = 'bold';
                imageContainer.style.color = '#4a5568';
            }

            const metaContainer = document.getElementById('detail-meta');
            metaContainer.innerHTML = `<span>By ${article.author || '25News Staff'}</span> | <span>${article.date || 'N/A'}</span>`;

            document.getElementById('detail-body').innerHTML = article.detail;
            articleContent.style.display = 'block';
        } else {
            notFoundMessage.classList.remove('hidden');
        }
    }, 500); // 0.5 second delay to simulate loading
}); 