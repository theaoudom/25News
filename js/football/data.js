export const footballPageData = {
    hero: {
        id: 'football-hero-1',
        category: 'Match of the Week',
        title: 'Down to the Wire: A Derby for the Ages',
        summary: 'In a match filled with passion, drama, and incredible skill, the city\'s two biggest rivals battled to a stunning draw, leaving fans breathless.',
        imageUrl: 'https://editorial.uefa.com/resources/029a-1dee25206da0-86734201fad9-1000/format/wide1/poresp.jpeg?imwidth=2048',
        link: '../../html/sport/sport-detail.html',
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
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 15, 2025', 
            homeTeam: 'Al Ahly FC', 
            awayTeam: 'Inter Miami CF', 
            time: '07:00 AM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Al_Ahly_SC_logo.svg/640px-Al_Ahly_SC_logo.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Inter_Miami_CF_logo.svg/1200px-Inter_Miami_CF_logo.svg.png', 
            isKickoff: true,
            homeResult: '0',
            awayResult: '0'
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 15, 2025', 
            homeTeam: 'FC Bayern Munich', 
            awayTeam: 'Auckland City FC', 
            time: '11:00 PM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/New_Auckland_City_FC_logo_%28updated_2022%29.png', 
            isKickoff: true, 
            homeResult: '10', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 16, 2025', 
            homeTeam: 'PSG', 
            awayTeam: 'Atlético de Madrid', 
            time: '11:00 PM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Paris_Saint-Germain_F.C..svg/1200px-Paris_Saint-Germain_F.C..svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Atletico_Madrid_Logo_2024.svg/1200px-Atletico_Madrid_Logo_2024.svg.png', 
            isKickoff: true, 
            homeResult: '4', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 16, 2025', 
            homeTeam: 'Palmeiras', 
            awayTeam: 'FC Porto', 
            time: '11:00 PM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/FC_Porto.svg/1200px-FC_Porto.svg.png', 
            isKickoff: true, 
            homeResult: '0', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 16, 2025', 
            homeTeam: 'Botafogo', 
            awayTeam: 'Seattle Sounders FC', 
            time: '11:00 PM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Seattle_Sounders_logo.svg/1200px-Seattle_Sounders_logo.svg.png', 
            isKickoff: true, 
            homeResult: '2', 
            awayResult: '1' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 17, 2025', 
            homeTeam: 'Chelsea F.C.', 
            awayTeam: 'LA FC', 
            time: '02:00 AM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Los_Angeles_Football_Club.svg/1200px-Los_Angeles_Football_Club.svg.png', 
            isKickoff: false, 
            homeResult: '0', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 17, 2025', 
            homeTeam: 'Boca Juniors', 
            awayTeam: 'S.L. Benfica', 
            time: '05:00 AM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Boca_Juniors_logo18.svg/1200px-Boca_Juniors_logo18.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/SL_Benfica_logo.svg/1200px-SL_Benfica_logo.svg.png', 
            isKickoff: false, 
            homeResult: '0', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 17, 2025', 
            homeTeam: 'Flamengo', 
            awayTeam: 'ES Tunis', 
            time: '08:00 AM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flamengo_braz_logo.svg/1200px-Flamengo_braz_logo.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/6b/EST_New_Logo_2012.png/1200px-EST_New_Logo_2012.png', 
            isKickoff: false, 
            homeResult: '0', 
            awayResult: '0' 
        },
        { 
            eventName: 'FIFA Club World Cup',
            date: 'June 17, 2025', 
            homeTeam: 'Fluminense FC', 
            awayTeam: 'Borussia Dortmund', 
            time: '11:00 PM', 
            homeLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/FFC_crest.svg/1200px-FFC_crest.svg.png', 
            awayLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png', 
            isKickoff: false, 
            homeResult: '0', 
            awayResult: '0' 
        }
        
    ],
    articles: [
        {
            id: 'sport-article-3',
            sport: 'football',
            category: 'Football',
            title: 'Manchester United announce signing of Matheus Cunha from Wolves on five-year deal',
            summary: 'Manchester United completed the signing of Matheus Cunha from Wolverhampton Wanderers...',
            imageUrl: 'https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/2cc95d71-365f-4df4-9f8b-456b58def0e6.avif',
            link: '../../html/sport/sport-detail.html', 
            body: `
                <h2>Manchester United Complete Signing of Matheus Cunha</h2>
                <p>Manchester United completed the signing of Matheus Cunha from Wolverhampton Wanderers, United announced on Thursday, with the Brazil forward joining on a five-year contract.</p>
                <p>United triggered Cunha's release clause, which was worth around 62.5 million pounds, according to a source at the club. The Old Trafford side also have the option of extending his contract by a year.</p>
                <h2>Matheus Cunha Shares His Dream Come True</h2>
                <p>"It's hard to put into words my feelings about becoming a Manchester United player," Cunha said.</p>
                <p>"Ever since I was a child in Brazil watching Premier League games on TV at my grandmother's house, United was my favourite English team, and I dreamed of wearing the red shirt.</p>
                <p>"I can't wait for the start of pre-season to get to know my teammates and prepare for the season ahead. All my focus is now on working hard to become a valuable part of the team, and helping get this club back to the top."</p>

            `
        },
        {
            id: 'sport-hero-article-1',
            sport: 'football',
            category: 'Football',
            title: 'Giants Clinch Playoff Spot in Dramatic Overtime Win!',
            summary: 'A last-minute field goal seals the deal as the Giants overcome the Eagles in a nail-biter...',
            imageUrl: 'https://via.placeholder.com/800x500/FFA500/000000?text=Football+Action',
            link: '../../html/sport/sport-detail.html'
        },
        {
            id: 'home-article-3',
            sport: 'football',
            category: 'SOCCER',
            title: 'Transfer Market Buzz: Who is on the Move?',
            summary: 'Insiders suggest a record-breaking fee is on the table for the star striker.',
            imageUrl: 'https://via.placeholder.com/400x250/FF8C00/FFFFFF?text=Soccer+Transfer',
            link: '../../html/sport/sport-detail.html'
        }
    ]
}; 