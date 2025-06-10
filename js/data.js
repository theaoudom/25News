import { homePageData, authors } from './home/data.js';
import { sportPageData } from './sport/data.js';

// Combine all articles from different data sources into one map for easy lookup.
const allArticles = new Map();

// Helper function to add articles to the map
const addArticlesToMap = (articles) => {
    if (articles) {
        articles.forEach(article => {
            const authorInfo = authors[article.authorId] || {};
            const enrichedArticle = {
                ...article,
                author: authorInfo.name || 'Unknown Author',
                authorAvatar: authorInfo.avatar,
                authorBio: authorInfo.bio
            };
            allArticles.set(article.id, enrichedArticle);
        });
    }
};

// Add hero articles (they are also articles)
const enrichAndAddHero = (heroArticle) => {
    if (heroArticle) {
        const authorInfo = authors[heroArticle.authorId] || {};
        const enrichedArticle = {
            ...heroArticle,
            author: authorInfo.name || 'Unknown Author',
            authorAvatar: authorInfo.avatar,
            authorBio: authorInfo.bio
        };
        allArticles.set(heroArticle.id, enrichedArticle);
    }
};

enrichAndAddHero(homePageData.hero);
enrichAndAddHero(sportPageData.hero);

// Add all other articles
addArticlesToMap(homePageData.topPicks);
addArticlesToMap(homePageData.latestNews);
addArticlesToMap(sportPageData.articles);


// Export a function to get an article by ID
export function getArticleById(id) {
    return allArticles.get(id);
}

// Export all articles for finding related content
export const allArticlesList = Array.from(allArticles.values()); 