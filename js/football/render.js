import { footballPageData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('football-page');

    const mainContainer = document.querySelector('main.container');
    if (!mainContainer) return;

    const { hero, leagues, topScorers, upcomingFixtures, articles } = footballPageData;
    const leagueKeys = Object.keys(leagues);

    const getColorClass = (a, b) =>
        a > b ? "green-color" : a < b ? "red-color" : "gray-color";

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
                        <div class="player-goals">${player.goals} Goals</div>
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="upcoming-fixtures-section-full">
            <h2>Upcoming Fixtures</h2>
            <div class="fixtures-list-full">
                ${upcomingFixtures.map(fixture => `
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
                                ${
                                    !fixture.isKickoff ?
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
                `).join('')}
            </div>
        </section>
    `;

    function getRelativeDay(dateString) {
        const inputDate = new Date(dateString);
        const today = new Date();

        // Reset time to compare only dates
        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInTime = inputDate.getTime() - today.getTime();
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

        if (diffInDays === 0) {
            return "Today";
        } else if (diffInDays === -1) {
            return "Yesterday";
        } else if (diffInDays === 1) {
            return "Tomorrow";
        } else {
            // If not yesterday, today, or tomorrow, return formatted date
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return inputDate.toLocaleDateString('en-US', options);
        }
    }

    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tableContainers = document.querySelectorAll('.standings-table-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and tables
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tableContainers.forEach(container => container.classList.remove('active'));

            // Activate the clicked button
            button.classList.add('active');

            // Activate the corresponding table
            const leagueId = button.dataset.league;
            const tableToShow = document.getElementById(`table-${leagueId}`);
            if (tableToShow) {
                tableToShow.classList.add('active');
            }
        });
    });
}); 