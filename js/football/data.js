export const footballPageData = {
    hero: {
        id: 'football-hero-1',
        category: 'Match of the Week',
        title: 'Down to the Wire: A Derby for the Ages',
        summary: 'In a match filled with passion, drama, and incredible skill, the city\'s two biggest rivals battled to a stunning draw, leaving fans breathless.',
        imageUrl: 'https://editorial.uefa.com/resources/029a-1dee25206da0-86734201fad9-1000/format/wide1/poresp.jpeg?imwidth=2048',
        link: 'sport-detail.html',
        author: 'John Tesh',
        date: 'November 4, 2023',
        readTime: '8 min read',
        body: '<p>The city derby lived up to its reputation as one of the most exciting fixtures of the season. From the opening whistle, both teams played with an intensity that electrified the stadium. The final moments, with a last-gasp equalizer, will be replayed for years to come.</p>'
    },
    leagues: {
        "premier-league": {
            name: "Premier League",
            standings: [
                { rank: 1, team: 'Northern United', played: 15, points: 38, logo: 'https://via.placeholder.com/50x50/FF0000/FFFFFF?text=NU' },
                { rank: 2, team: 'Bay City FC', played: 15, points: 35, logo: 'https://via.placeholder.com/50x50/0000FF/FFFFFF?text=BC' },
                { rank: 3, team: 'Riverdale Rovers', played: 15, points: 32, logo: 'https://via.placeholder.com/50x50/008000/FFFFFF?text=RR' },
                { rank: 4, team: 'Summit Strikers', played: 15, points: 28, logo: 'https://via.placeholder.com/50x50/FFA500/000000?text=SS' }
            ]
        },
        "la-liga": {
            name: "La Liga",
            standings: [
                { rank: 1, team: 'Real Madrid', played: 15, points: 40, logo: 'https://via.placeholder.com/50x50/FFFFFF/000000?text=RM' },
                { rank: 2, team: 'Barcelona', played: 15, points: 37, logo: 'https://via.placeholder.com/50x50/A50044/FFFFFF?text=FCB' },
                { rank: 3, team: 'Atletico Madrid', played: 15, points: 33, logo: 'https://via.placeholder.com/50x50/CB3524/FFFFFF?text=AM' }
            ]
        },
        "serie-a": {
            name: "Serie A",
            standings: [
                { rank: 1, team: 'Juventus', played: 15, points: 39, logo: 'https://via.placeholder.com/50x50/000000/FFFFFF?text=JU' },
                { rank: 2, team: 'AC Milan', played: 15, points: 36, logo: 'https://via.placeholder.com/50x50/FB090B/FFFFFF?text=ACM' },
                { rank: 3, team: 'Inter Milan', played: 15, points: 34, logo: 'https://via.placeholder.com/50x50/010E80/FFFFFF?text=IM' }
            ]
        },
        "bundesliga": {
            name: "Bundesliga",
            standings: [
                { rank: 1, team: 'Bayern Munich', played: 15, points: 41, logo: 'https://via.placeholder.com/50x50/DC052D/FFFFFF?text=BM' },
                { rank: 2, team: 'Borussia Dortmund', played: 15, points: 38, logo: 'https://via.placeholder.com/50x50/FDE100/000000?text=BVB' }
            ]
        }
        
    },
    topScorers: [
        { rank: 1, name: 'Leo Messi', team: 'Bay City FC', goals: 14, avatar: 'https://via.placeholder.com/50x50/0000FF/FFFFFF?text=LM' },
        { rank: 2, name: 'Alex Morgan', team: 'Northern United', goals: 12, avatar: 'https://via.placeholder.com/50x50/FF0000/FFFFFF?text=AM' },
        { rank: 3, name: 'Sam Kerr', team: 'Riverdale Rovers', goals: 11, avatar: 'https://via.placeholder.com/50x50/008000/FFFFFF?text=SK' }
    ],
    upcomingFixtures: [
        { date: 'Nov 10, 2023', homeTeam: 'Northern United', awayTeam: 'Bay City FC', time: '19:00', homeLogo: 'https://via.placeholder.com/50x50/FF0000/FFFFFF?text=NU', awayLogo: 'https://via.placeholder.com/50x50/0000FF/FFFFFF?text=BC' },
        { date: 'Nov 12, 2023', homeTeam: 'Summit Strikers', awayTeam: 'Riverdale Rovers', time: '15:00', homeLogo: 'https://via.placeholder.com/50x50/FFA500/000000?text=SS', awayLogo: 'https://via.placeholder.com/50x50/008000/FFFFFF?text=RR' }
    ],
    articles: [
        {
            id: 'sport-article-3',
            sport: 'football',
            category: 'Football',
            title: 'Transfer Window Heats Up: Major Signings Expected',
            summary: 'Clubs across Europe are scrambling to bolster their squads before the deadline...',
            imageUrl: 'https://via.placeholder.com/400x250/FF8C00/FFFFFF?text=Soccer+Goal',
            link: 'sport-detail.html'
        },
        {
            id: 'sport-hero-article-1',
            sport: 'football',
            category: 'Football',
            title: 'Giants Clinch Playoff Spot in Dramatic Overtime Win!',
            summary: 'A last-minute field goal seals the deal as the Giants overcome the Eagles in a nail-biter...',
            imageUrl: 'https://via.placeholder.com/800x500/FFA500/000000?text=Football+Action',
            link: 'sport-detail.html'
        },
        {
            id: 'home-article-3',
            sport: 'football',
            category: 'SOCCER',
            title: 'Transfer Market Buzz: Who is on the Move?',
            summary: 'Insiders suggest a record-breaking fee is on the table for the star striker.',
            imageUrl: 'https://via.placeholder.com/400x250/FF8C00/FFFFFF?text=Soccer+Transfer',
            link: 'sport-detail.html'
        }
    ]
}; 