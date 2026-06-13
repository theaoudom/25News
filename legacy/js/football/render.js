import { footballPageData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('football-page');

    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    // Check if data is valid
    if (!footballPageData || !footballPageData.hero || !footballPageData.leagues || !footballPageData.articles || footballPageData.articles.length === 0) {
        mainContainer.innerHTML = `
            <section class="no-content-section">
                <h2>No Articles Available</h2>
                <p>We're sorry, but there are currently no articles to display in this section. Please check back later for updates.</p>
                <a href="/" class="read-more-btn">Return to Homepage</a>
            </section>
        `;
        return; // Stop further execution
    }

    // --- API & Caching Configuration ---
    const API_KEY = '1f6c0166ad8ee1e50a116dd8ec8fdc1a'; // <-- REPLACE WITH YOUR KEY
    const API_BASE_URL = 'https://v3.football.api-sports.io';
    // NOTE: The full API_ENDPOINT is now constructed dynamically in the fetch function.

    const CACHE_KEY_FIXTURES = 'footballFixturesCache';
    const CACHE_KEY_TIMESTAMP = 'footballFixturesTimestamp';
    const CACHE_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

    // Destructure static data
    const { hero, leagues, topScorers, articles, upcomingFixtures: staticFixtures } = footballPageData;
    const leagueKeys = Object.keys(leagues);

    // --- Helper Functions ---
    const getColorClass = (a, b) =>
        a > b ? "green-color" : a < b ? "red-color" : "gray-color";
    
    function getRelativeDay(dateString) {
        const inputDate = new Date(dateString);
        const today = new Date();
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInDays = (inputDate - today) / (1000 * 60 * 60 * 24);

        if (diffInDays === 0) return "Today";
        if (diffInDays === -1) return "Yesterday";
        if (diffInDays === 1) return "Tomorrow";
        
        const options = { month: 'long', day: 'numeric' };
        return inputDate.toLocaleDateString('en-US', options);
    }
    
    // --- Initial Page Render (Excluding Fixtures) ---
    mainContainer.innerHTML = `
        <section class="hero-section football-hero" data-id="${hero.id}">
            <div class="hero-image">
                <img src="${hero.imageUrl}" alt="${hero.title}">
            </div>
            <div class="hero-content">
                <span class="hero-category">${hero.category}</span>
                <h2>${hero.title}</h2>
                <p>${hero.summary}</p>
                <a href="../../html/sport/sport-detail.html?id=${hero.id}" class="read-more-btn article-link">Read More →</a>
            </div>
        </section>

        <section class="league-standings-section">
            <div class="tabs-container">
                ${leagueKeys.map((key, index) => `
                    <button class="tab-button ${index === 0 ? 'active' : ''}" data-league="${key}">${leagues[key].name}</button>
                `).join('')}
            </div>
            <div class="tables-container">
                ${leagueKeys.map((key, index) => `
                    <div id="table-${key}" class="standings-table-container ${index === 0 ? 'active' : ''}">
                        <table class="standings-table">
                            <thead>
                                <tr>
                                    <th class="rank-col">#</th>
                                    <th class="team-col">Club</th>
                                    <th class="played-col">MP</th>
                                    <th class="points-col">Pts</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${leagues[key].standings.map(team => `
                                    <tr>
                                        <td class="rank-col">${team.rank}</td>
                                        <td class="team-col team-name">
                                            <img src="${team.logo}" alt="${team.team} logo" class="team-logo-small">
                                            ${team.team}
                                        </td>
                                        <td class="played-col">${team.played}</td>
                                        <td class="points-col"><strong>${team.points}</strong></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="news-grid">
            <h2>More Football News</h2>
            <div class="articles-container">
                 ${articles.map(article => `
                    <article class="news-card" data-sport="football" data-id="${article.id}">
                        <img src="${article.imageUrl}" alt="${article.title}">
                        <div class="card-content">
                            <span class="category">${article.category}</span>
                            <h3>${article.title}</h3>
                            <p>${article.summary}</p>
                            <a href="../../html/sport/sport-detail.html?id=${article.id}" class="read-more-link article-link">Full Story</a>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>

        <section class="top-scorers-section-full">
            <h2>Top Scorers</h2>
            <div class="scorers-grid">
                ${topScorers.map(player => `
                    <div class="scorer-card">
                        <img src="${player.avatar}" alt="${player.name}" class="player-avatar-large">
                        <span class="player-rank">${player.rank}</span>
                        <h3 class="player-name-large">${player.name}</h3>
                        <span class="player-team">${player.team}</span>
                        <span class="player-event">${player.event || ''}</span>
                        <div class="player-goals">${player.goals} Goals</div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="upcoming-fixtures-section-full">
            <h2>Upcoming Fixtures</h2>
            <div class="fixtures-list-full">
                <p>Loading fixtures...</p> 
            </div>
        </section>
    `;

    // --- Dynamic Fixture Loading and Rendering ---

    /**
     * Renders the list of fixtures into the DOM.
     * @param {Array} fixturesData - The array of fixture objects to render.
     */
    function renderFixtures(fixturesData) {
        const fixturesContainer = document.querySelector('.fixtures-list-full');
        if (!fixturesContainer) return;

        // Sort fixtures by date ascending before rendering
        const sortedFixtures = fixturesData.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (!sortedFixtures || sortedFixtures.length === 0) {
            fixturesContainer.innerHTML = '<p>No upcoming fixtures found in the next 10 days.</p>';
            return;
        }

        fixturesContainer.innerHTML = sortedFixtures.map(fixture => `
            <div class="fixture-card">
                <div class="fixture-card-header">
                    <span>${fixture.eventName} : ${getRelativeDay(fixture.date)} - ${fixture.time}</span>
                </div>
                <div class="fixture-card-body">
                    <div class="fixture-team">
                        <img src="${fixture.homeLogo}" alt="${fixture.homeTeam}" class="team-logo-large">
                        <span class="team-name-fixture">${fixture.homeTeam}</span>
                    </div>
                    <div class="fixture-vs">
                        ${!fixture.isKickoff ?
                            '<span class="vs-circle">VS</span>' :
                            `
                                <span class="vs-circle ${getColorClass(fixture.homeResult,fixture.awayResult)}">${fixture.homeResult}</span>
                                <span class="result-split"> : </span>
                                <span class="vs-circle ${getColorClass(fixture.awayResult,fixture.homeResult)}">${fixture.awayResult}</span>
                            `
                        }
                    </div>
                    <div class="fixture-team">
                        <img src="${fixture.awayLogo}" alt="${fixture.awayTeam}" class="team-logo-large">
                        <span class="team-name-fixture">${fixture.awayTeam}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Fetches fixture data from cache or API, then renders it.
     * This is the only function that has been significantly modified.
     */
    async function loadAndRenderFixtures() {
        // 1. Try to get from cache first
        const cachedFixtures = localStorage.getItem(CACHE_KEY_FIXTURES);
        const cacheTimestamp = localStorage.getItem(CACHE_KEY_TIMESTAMP);

        if (cachedFixtures && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION_MS)) {
            console.log("Loading fixtures from cache.");
            renderFixtures(JSON.parse(cachedFixtures));
            return;
        }
        
        // --- NEW: Date Range Logic ---
        // Helper to format date to YYYY-MM-DD
        const formatDate = (date) => date.toISOString().split('T')[0];

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const dayBeforeYesterday = new Date();
        dayBeforeYesterday.setDate(today.getDate() - 2);
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        const datesToFetch = [today, yesterday, dayBeforeYesterday, tomorrow].map(formatDate);

        // You can change the league ID here. 39=Premier League, 140=La Liga, 135=Serie A, 78=Bundesliga etc.
        // We'll fetch for each date and combine results

        try {
            console.log(`Fetching fixtures for dates: ${datesToFetch.join(', ')}...`);
            const fetchPromises = datesToFetch.map(dateStr => {
                const API_ENDPOINT = `${API_BASE_URL}/fixtures?date=${dateStr}`;
                return fetch(API_ENDPOINT, {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': API_KEY
                    }
                })
                .then(response => {
                    if (!response.ok) return response.json().then(errorBody => { throw new Error(`API request failed: ${JSON.stringify(errorBody.errors) || response.statusText}`); });
                    return response.json();
                })
                .then(data => {
                    if (data.errors && Object.keys(data.errors).length > 0) {
                        throw new Error(`API returned an error: ${JSON.stringify(data.errors)}`);
                    }
                    return data.response;
                })
                .catch(error => {
                    console.error(`Failed to fetch fixtures for ${dateStr}:`, error);
                    return [];
                });
            });

            const allResponses = await Promise.all(fetchPromises);
            // Flatten and transform all fixtures
            const allFixturesRaw = allResponses.flat();
            const transformedFixtures = allFixturesRaw
                .filter(item => [15].includes(item.league.id)) // Filter first
                .map(item => {
                    const fixtureDate = new Date(item.fixture.date);
                    return {
                        id: item.fixture.id,
                        eventName: item.league.name,
                        date: item.fixture.date.split('T')[0],
                        time: fixtureDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }), // Use 12-hour format with AM/PM
                        homeTeam: item.teams.home.name,
                        homeLogo: item.teams.home.logo,
                        awayTeam: item.teams.away.name,
                        awayLogo: item.teams.away.logo,
                        isKickoff: item.fixture.status.short === 'FT', 
                        homeResult: item.goals.home,
                        awayResult: item.goals.away
                    };
                });
            // 4. Render and cache the new data
            renderFixtures(transformedFixtures);
            localStorage.setItem(CACHE_KEY_FIXTURES, JSON.stringify(transformedFixtures));
            localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now());

        } catch (error) {
            // 5. If fetch fails, use static data as fallback
            console.error("Failed to fetch fixtures from API. Using static fallback data.", error);
            renderFixtures(staticFixtures);
        }
    }

    // --- Event Listeners and Initial Calls ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tableContainers = document.querySelectorAll('.standings-table-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tableContainers.forEach(container => container.classList.remove('active'));

            button.classList.add('active');
            const tableToShow = document.getElementById(`table-${button.dataset.league}`);
            if (tableToShow) {
                tableToShow.classList.add('active');
            }
        });
    });

    // Load fixtures when the page is ready
    loadAndRenderFixtures();
});