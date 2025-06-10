import { getArticleById, allArticlesList } from '../data.js';

function renderArticle() {
    const articleContentElement = document.getElementById('article-detail-content');
    
    if (!articleContentElement) {
        console.error('Fatal Error: Article container not found on the page.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        articleContentElement.innerHTML = '<p>No article ID provided.</p>';
        return;
    }

    const article = getArticleById(articleId);

    if (article) {
        document.title = `${article.title} - SportsFeed`;
        
        // Find related articles (same sport, different ID)
        const relatedArticles = allArticlesList
            .filter(a => a.sport === article.sport && a.id !== article.id)
            .slice(0, 3); // Get up to 3 related articles

        articleContentElement.innerHTML = `
            <a href="javascript:history.back()" class="back-link"><i class="fas fa-arrow-left"></i> Back to News</a>
            <header class="article-header-detailed">
                <span class="article-category-detailed">${article.category || ''}</span>
                <h1 id="article-title-detailed">${article.title}</h1>
                <div class="article-meta">
                    <span id="article-author-detailed">By ${article.author}</span> |
                    <span id="article-date-detailed">${article.date}</span> |
                    <span><i class="fas fa-clock"></i> <span id="article-read-time-detailed">${article.readTime}</span></span>
                </div>
            </header>
            <img id="article-image-detailed" src="${article.imageUrl}" alt="${article.title}" class="article-image-full">
            <div id="article-body-detailed" class="article-body">
                ${article.body}
            </div>

            ${article.tags && article.tags.length > 0 ? `
                <div class="tags-section">
                    <h4 class="tags-title">Topics</h4>
                    <div class="tags-list">
                        ${article.tags.map(tag => `<a href="#" class="tag-link">${tag}</a>`).join('')}
                    </div>
                </div>
            ` : ''}

            <footer class="article-footer-detailed">
                <div class="share-section">
                    <span class="share-text">Share this story:</span>
                    <div class="share-links">
                        <a href="https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on Facebook" class="share-link facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}" target="_blank" aria-label="Share on Twitter" class="share-link twitter"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on LinkedIn" class="share-link linkedin"><i class="fab fa-linkedin-in"></i></a>
                        <button class="share-link copy-link" aria-label="Copy link"><i class="fas fa-link"></i></button>
                    </div>
                </div>
            </footer>

            ${relatedArticles.length > 0 ? `
                <section class="related-articles-section">
                    <h2>Related Stories</h2>
                    <div class="articles-container">
                        ${relatedArticles.map(related => `
                            <article class="news-card" data-sport="${related.sport}" data-id="${related.id}">
                                <img src="${related.imageUrl}" alt="${related.title}">
                                <div class="card-content">
                                    <span class="category">${related.category}</span>
                                    <h3>${related.title}</h3>
                                    <a href="${related.link}?id=${related.id}" class="read-more-link article-link">Read More</a>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </section>
            ` : ''}
        `;

        // Add functionality for the copy link button
        const copyButton = articleContentElement.querySelector('.copy-link');
        if (copyButton) {
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy link: ', err);
                    alert('Failed to copy link.');
                });
            });
        }
    } else {
        console.error(`Article with ID "${articleId}" not found.`);
        articleContentElement.innerHTML = `<p>Sorry, the article you are looking for (ID: ${articleId}) could not be found.</p>`;
    }
}

function updateReadingProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    const content = document.getElementById('article-detail-content');
    if (!content) return;

    const scrollableHeight = content.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (scrollableHeight <= 0) {
        progressBar.style.width = '100%';
        return;
    }

    const progress = (scrolled / scrollableHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function handleReadNext() {
    const readNextContainer = document.getElementById('read-next-container');
    const articleContent = document.getElementById('article-detail-content');
    if (!readNextContainer || !articleContent) return;

    // Determine when to show the "Read Next" box (e.g., 75% scroll)
    const showAt = document.body.scrollHeight * 0.75;

    if (window.scrollY + window.innerHeight >= showAt) {
        if (readNextContainer.classList.contains('visible') || readNextContainer.innerHTML !== '') {
            return; // Already visible or populated, do nothing
        }

        // Find a related article to suggest
        const urlParams = new URLSearchParams(window.location.search);
        const currentArticleId = urlParams.get('id');
        const currentArticle = getArticleById(currentArticleId);

        const nextArticle = allArticlesList.find(a => a.sport === currentArticle.sport && a.id !== currentArticle.id);

        if (nextArticle) {
            readNextContainer.innerHTML = `
                <span class="read-next-header">Read Next</span>
                <h4 class="read-next-title">${nextArticle.title}</h4>
                <a href="${nextArticle.link}?id=${nextArticle.id}" class="read-next-link article-link">
                    Continue Reading <i class="fas fa-arrow-right"></i>
                </a>
            `;
            readNextContainer.classList.remove('hidden');
            setTimeout(() => readNextContainer.classList.add('visible'), 10); // Timeout for CSS transition
        }
    } else {
        // Hide it if user scrolls back up
        if (readNextContainer.classList.contains('visible')) {
            readNextContainer.classList.remove('visible');
        }
    }
}

document.addEventListener('DOMContentLoaded', renderArticle);
window.addEventListener('scroll', () => {
    updateReadingProgress();
    handleReadNext();
});
window.addEventListener('resize', updateReadingProgress);

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articlesContainer = document.querySelector('.articles-container'); // Target container
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('i');

    const mainContentArea = document.getElementById('main-content-area');
    const articleDetailView = document.getElementById('article-detail-view');
    const backToNewsButton = document.getElementById('back-to-news');

    // --- DUMMY ARTICLE DATA ---
    // In a real app, this would come from an API
    const allArticlesData = {
        "hero-article-1": {
            id: "hero-article-1",
            title: "Giants Clinch Playoff Spot in Dramatic Overtime Win!",
            category: "Football",
            author: "Jane Smith",
            date: "October 25, 2023",
            readTime: 7,
            imageSrc: "https://via.placeholder.com/1200x600/FFA500/000000?text=Football+Victory",
            tags: "Football, NFL, Playoffs, Giants",
            content: `
                <p>In a stunning display of resilience and skill, the New York Giants secured their spot in the upcoming playoffs with a breathtaking overtime victory against their fierce rivals, the Philadelphia Eagles. The game, a rollercoaster of emotions, culminated in a last-second field goal that sent the home crowd into a frenzy.</p>
                <h2>Key Moments</h2>
                <p>The first half was a tight contest, with both defenses playing exceptionally well. However, the Giants' offense found its rhythm in the third quarter, stringing together impressive drives. The Eagles, not to be outdone, responded with quick scores of their own, leading to a nail-biting fourth quarter.</p>
                <blockquote>"This is what we play for," said the Giants' quarterback after the game. "Moments like these, where everything is on the line, and the team comes together to make it happen."</blockquote>
                <p>The overtime period was tense, with both teams having opportunities. Ultimately, a crucial interception by the Giants' defense set up the game-winning field goal attempt. As the ball sailed through the uprights, the stadium erupted, marking a significant milestone for the team this season.</p>
                <p>Experts are now keenly watching the Giants as a potential dark horse in the playoffs, citing their recent form and ability to perform under pressure.</p>
            `
        },
        "article-1": {
            id: "article-1",
            title: "Warriors Announce New Arena Plans",
            category: "Basketball",
            author: "Mike Lee",
            date: "October 24, 2023",
            readTime: 4,
            imageSrc: "https://via.placeholder.com/1200x600/4682B4/FFFFFF?text=New+Arena+Concept",
            tags: "NBA, Warriors, Arena, Development",
            content: `
                <p>The Golden State Warriors today unveiled ambitious plans for a new state-of-the-art arena complex, promising an unparalleled fan experience and a hub for community engagement. The proposed design features cutting-edge technology and sustainable building practices.</p>
                <h3>Sustainability Focus</h3>
                <p>A key highlight of the announcement was the commitment to environmental sustainability. The arena is planned to be LEED certified, incorporating solar panels, rainwater harvesting, and extensive green spaces. This move aligns with the team's broader efforts to promote eco-consciousness.</p>
                <p>Team officials stated that the new venue would not only host basketball games but also concerts, cultural events, and community gatherings, making it a vibrant addition to the city's landscape. Construction is slated to begin next year, with an expected completion date in 2027.</p>
            `
        },
        "article-2": {
            id: "article-2",
            title: "Grand Slam Champion Announces Retirement",
            category: "Tennis",
            author: "Sarah Chen",
            date: "October 23, 2023",
            readTime: 5,
            imageSrc: "https://via.placeholder.com/1200x600/32CD32/FFFFFF?text=Tennis+Legend+Retires",
            tags: "Tennis, Retirement, Grand Slam, Legend",
            content: `
                <p>In a heartfelt press conference, tennis superstar [Champion's Name] announced their retirement from professional tennis after a career spanning over two decades. The decision comes after a series of injuries that have hampered their performance in recent seasons.</p>
                <p>"It's been an incredible journey," said [Champion's Name], visibly emotional. "I've given everything to this sport, and it has given me back so much more. Now, it's time for a new chapter."</p>
                <p>With [Number] Grand Slam titles and countless other accolades, [Champion's Name] leaves behind a legacy of sportsmanship, dedication, and incredible skill that will inspire generations of players to come. Fans and fellow athletes have taken to social media to pay tribute to the icon.</p>
            `
        },
        // Add more dummy data for article-3, article-4, article-5, article-6
        // For brevity, I'll skip adding full content for the rest, but you should!
        "article-3": {
            id: "article-3", title: "Transfer Window Heats Up", category: "Football", author: "Admin", date: "Oct 22, 2023", readTime: 3, imageSrc: "https://via.placeholder.com/1200x600/FF8C00/FFFFFF?text=Transfer+News", tags: "Football, Transfers", content: "<p>Details about the transfer window...</p>"
        },
        "article-4": {
            id: "article-4", title: "Team Liquid Wins Global Championship", category: "E-Sports", author: "GamerX", date: "Oct 21, 2023", readTime: 6, imageSrc: "https://via.placeholder.com/1200x600/8A2BE2/FFFFFF?text=E-Sports+Victory", tags: "Esports, Championship", content: "<p>Details about Team Liquid's win...</p>"
        },
        "article-5": {
            id: "article-5", title: "Rookie Sensation Leads Team to Victory", category: "Basketball", author: "HoopsFan", date: "Oct 20, 2023", readTime: 4, imageSrc: "https://via.placeholder.com/1200x600/4169E1/FFFFFF?text=Rookie+Star", tags: "NBA, Rookie", content: "<p>Details about the rookie's performance...</p>"
        },
        "article-6": {
            id: "article-6", title: "Upcoming Star Shines at Wimbledon", category: "Tennis", author: "AceReporter", date: "Oct 19, 2023", readTime: 5, imageSrc: "https://via.placeholder.com/1200x600/228B22/FFFFFF?text=Wimbledon+Upset", tags: "Tennis, Wimbledon", content: "<p>Details about the Wimbledon star...</p>"
        }
    };

    // --- Populate and Show Article Detail ---
    function showArticleDetail(articleId) {
        const articleData = allArticlesData[articleId];
        if (!articleData) {
            console.error("Article data not found for ID:", articleId);
            return;
        }

        document.getElementById('article-category-detailed').textContent = articleData.category;
        document.getElementById('article-title-detailed').textContent = articleData.title;
        document.getElementById('article-author-detailed').textContent = `By ${articleData.author}`;
        document.getElementById('article-date-detailed').textContent = articleData.date;
        document.getElementById('article-read-time-detailed').textContent = articleData.readTime;
        document.getElementById('article-image-detailed').src = articleData.imageSrc;
        document.getElementById('article-image-detailed').alt = articleData.title; // Good for SEO/Accessibility
        document.getElementById('article-body-detailed').innerHTML = articleData.content; // Use innerHTML for formatted content
        document.getElementById('article-tags-detailed').textContent = articleData.tags;

        mainContentArea.classList.add('hidden');
        articleDetailView.classList.remove('hidden');
        articleDetailView.classList.add('visible'); // For CSS transition
        window.scrollTo(0, 0); // Scroll to top of page
    }

    // --- Hide Article Detail and Show Main Content ---
    function hideArticleDetail() {
        articleDetailView.classList.remove('visible');
        articleDetailView.classList.add('hidden');
        mainContentArea.classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll to top of page
    }

    // --- Event Listeners for Article Links ---
    // Use event delegation on a static parent for dynamically added/filtered items
    document.body.addEventListener('click', function(event) {
        const clickedLink = event.target.closest('.article-link'); // Check if the click or its parent is an article link
        
        if (clickedLink) {
            event.preventDefault(); // Prevent default anchor behavior
            const articleElement = clickedLink.closest('[data-id]'); // Find parent with data-id
            if (articleElement) {
                const articleId = articleElement.getAttribute('data-id');
                showArticleDetail(articleId);
            }
        }
    });


    // Back button
    if (backToNewsButton) {
        backToNewsButton.addEventListener('click', hideArticleDetail);
    }


    // --- Article Filtering (existing code) ---
    const newsCards = document.querySelectorAll('.news-card'); // Re-select for filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');

            newsCards.forEach(card => { // Use newsCards variable
                const articleSport = card.getAttribute('data-sport');
                if (filterValue === 'all' || articleSport === filterValue) {
                    card.classList.remove('hidden');
                    card.style.display = 'flex';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Theme Toggle (existing code) ---
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('sportsFeedTheme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('sportsFeedTheme', 'light');
        }
    }
    
    const savedTheme = localStorage.getItem('sportsFeedTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    themeToggleButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
    if (body.classList.contains('dark-mode')) {
        if (!themeIcon.classList.contains('fa-sun')) {
             themeIcon.classList.remove('fa-moon');
             themeIcon.classList.add('fa-sun');
        }
    } else {
         if (!themeIcon.classList.contains('fa-moon')) {
             themeIcon.classList.remove('fa-sun');
             themeIcon.classList.add('fa-moon');
        }
    }


    // --- Live Pulse Animation (existing code, can be kept or removed) ---
    const pulseItemsContainer = document.querySelector('.live-pulse .pulse-items');
    if (pulseItemsContainer) {
        let currentPulseIndex = 0;
        const pulseItemElements = pulseItemsContainer.querySelectorAll('.pulse-item');
        if (pulseItemElements.length > 1) {
            setInterval(() => {
                pulseItemElements.forEach(item => item.style.opacity = '0.7');
                pulseItemElements[currentPulseIndex].style.opacity = '1';
                pulseItemElements[currentPulseIndex].style.fontWeight = 'bold';
                if(currentPulseIndex > 0) pulseItemElements[currentPulseIndex-1].style.fontWeight = 'normal';
                else if(pulseItemElements.length > 1) pulseItemElements[pulseItemElements.length-1].style.fontWeight = 'normal';
                currentPulseIndex = (currentPulseIndex + 1) % pulseItemElements.length;
            }, 3000);
        }
    }
});