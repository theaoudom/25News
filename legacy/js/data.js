import { homePageData, authors } from './home/data.js';
import { sportPageData } from './sport/data.js';
import { esportsPageData } from './esports/data.js';
import { footballPageData } from './football/data.js';
import { worldPageData } from './world/data.js';

// Combine all articles from different data sources into one map for easy lookup.
const allArticles = new Map();

// Helper function to add articles to the map
const addArticlesToMap = (articles) => {
    if (articles) {
        articles.forEach(article => {
            const authorInfo = authors[article.authorId] || {};
            const enrichedArticle = {
                ...article,
                author: authorInfo.name || article.author || 'Unknown Author',
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
            author: authorInfo.name || heroArticle.author || 'Unknown Author',
            authorAvatar: authorInfo.avatar,
            authorBio: authorInfo.bio
        };
        allArticles.set(heroArticle.id, enrichedArticle);
    }
};

// Add articles from home page
addArticlesToMap(homePageData.topPicks);
addArticlesToMap(homePageData.latestNews);
enrichAndAddHero(homePageData.hero);

// Add articles from sport page
addArticlesToMap(sportPageData.articles);
enrichAndAddHero(sportPageData.hero);

// Add articles from esports page
addArticlesToMap(esportsPageData.articles);
enrichAndAddHero(esportsPageData.hero);

// Add articles from football page
addArticlesToMap(footballPageData.articles);
enrichAndAddHero(footballPageData.hero);

// Add articles from football page
addArticlesToMap(worldPageData.latestNews);
enrichAndAddHero(worldPageData.heroArticle);

// Export a function to get an article by ID
export function getArticleById(id) {
    return allArticles.get(id);
}

// Export all articles for finding related content
export const allArticlesList = Array.from(allArticles.values()); 