export const newsSections = [
  {
    header: "Top Stories",
    items: [
      {
        id: "top-1",
        imageText: "Breaking News",
        title: "Major Global Event Unfolds",
        description: "An unexpected event has captured the world's attention, with implications still developing. Experts are weighing in on the potential consequences.",
        detail: "<p>This is the full article for Major Global Event Unfolds. Here you can add more paragraphs, images, or any HTML content you want to show in the detail view.</p><p>More details about the event, background, and expert opinions can be included here.</p>",
        link: "#"
      },
      {
        id: "top-2",
        imageText: "Tech Innovation",
        title: "New Technology Promises Revolution",
        description: "A groundbreaking technology has been unveiled, promising to change various industries. Early demonstrations show significant potential.",
        detail: "<p>This is the full article for New Technology Promises Revolution. Here you can describe the technology, its inventors, and its potential impact in detail.</p>",
        link: "#"
      },
      {
        id: "top-3",
        imageText: "Economic Update",
        title: "Market Reacts to Economic News",
        description: "Recent economic indicators have caused a stir in the financial markets. Analysts predict a period of volatility and adjustment.",
        detail: "<p>This is the full article for Market Reacts to Economic News. You can provide charts, expert analysis, and more in this section.</p>",
        link: "#"
      },
      {
        id: "top-4",
        imageText: "Cultural Festival",
        title: "International Cultural Exchange Event",
        description: "A vibrant festival celebrating diverse cultures from around the globe is underway, fostering understanding and artistic expression.",
        detail: "<p>This is the full article for International Cultural Exchange Event. Include stories, interviews, and festival highlights here.</p>",
        link: "#"
      },
      {
        id: "top-5",
        imageText: "Cultural Festival",
        title: "International Cultural Exchange Event",
        description: "A vibrant festival celebrating diverse cultures from around the globe is underway, fostering understanding and artistic expression.",
        detail: "<p>This is the full article for International Cultural Exchange Event. Include stories, interviews, and festival highlights here.</p>",
        link: "#"
      }
    ]
  },
  {
    header: "World News",
    items: [
      {
        id: "world-1",
        imageText: "Global Summit",
        title: "Leaders Gather for International Summit",
        description: "World leaders are convening to discuss pressing global issues, including climate change, economic cooperation, and security.",
        detail: "<p>This is the full article for Leaders Gather for International Summit. Add summit agenda, leader quotes, and outcomes here.</p>",
        link: "#"
      },
      {
        id: "world-2",
        imageText: "Cultural Festival",
        title: "International Cultural Exchange Event",
        description: "A vibrant festival celebrating diverse cultures from around the globe is underway, fostering understanding and artistic expression.",
        detail: "<p>This is the full article for International Cultural Exchange Event. Include stories, interviews, and festival highlights here.</p>",
        link: "#"
      }
    ]
  }
  // ...add more sections as needed
];

export const authors = {
    "jane-doe": {
        name: "Jane Doe",
        avatar: "https://via.placeholder.com/100/FFC0CB/000000?text=JD",
        bio: "Jane is a leading voice in sports technology, with a focus on AI and sustainability."
    },
    "mike-johnson": {
        name: "Mike Johnson",
        avatar: "https://via.placeholder.com/100/87CEEB/000000?text=MJ",
        bio: "Mike has been covering the NBA for over a decade, known for his sharp analysis of rookie talent."
    },
    "carlos-rodriguez": {
        name: "Carlos Rodriguez",
        avatar: "https://via.placeholder.com/100/FFA07A/000000?text=CR",
        bio: "Carlos is an insider in the world of European football, with a network of sources in top clubs."
    },
    "emily-white": {
        name: "Emily White",
        avatar: "https://via.placeholder.com/100/DDA0DD/000000?text=EW",
        bio: "Emily is a former professional gamer and now a premier analyst in the e-sports community."
    },
    "sarah-jenkins": {
        name: "Sarah Jenkins",
        avatar: "https://via.placeholder.com/100/98FB98/000000?text=SJ",
        bio: "Sarah covers the international tennis circuit, with a keen eye for emerging stars."
    },
    "david-foster": {
        name: "David Foster",
        avatar: "https://via.placeholder.com/100/B0C4DE/000000?text=DF",
        bio: "David has a long history of breaking stories about sports legends and their careers."
    },
    "ben-carter": {
        name: "Ben Carter",
        avatar: "https://via.placeholder.com/100/F0E68C/000000?text=BC",
        bio: "Ben specializes in the business side of sports, including coaching contracts and team management."
    },
    "evelyn-reed": {
        name: "Dr. Evelyn Reed",
        avatar: "https://via.placeholder.com/100/E6E6FA/000000?text=ER",
        bio: "Dr. Reed is a sports scientist who writes about the intersection of technology and athletic performance."
    },
    "tom-frank": {
        name: "Tom Frank",
        avatar: "https://via.placeholder.com/100/FFDAB9/000000?text=TF",
        bio: "Tom is a seasoned football analyst known for his dramatic game commentary."
    },
    "leo-chen": {
        name: "Leo Chen",
        avatar: "https://via.placeholder.com/100/ADD8E6/000000?text=LC",
        bio: "Leo covers the explosive growth of the e-sports industry and its financial impact."
    }
};

export const homePageData = {
    hero: {
        id: 'home-hero-main',
        category: 'Featured Story',
        title: 'Carlo Ancelotti Showers Praise on Cristiano Ronaldo After UEFA Nations League Win',
        summary: 'Carlo Ancelotti praises Cristiano Ronaldo after UEFA Nations League win.',
        imageUrl: '../../images/ronaldo_win_nation_lauge.webp',
        link: '../../html/sport/sport-detail.html',
        authorId: 'jane-doe',
        date: 'June 11, 2025',
        readTime: '8 min read',
        body: `
            <p>Cristiano Ronaldo, 40, continues to prove the doubters wrong, having recently lifted the UEFA Nations League trophy with Portugal. He has now won the tournament twice, making it three trophies for his country (also Euro 2016).</p>
            <p>Ronaldo was pivotal to Portugal's winning campaign, scoring eight goals in nine appearances. He scored the winner against Germany in the semi-final and the equalizer against Spain in the final.</p>
            <p>Portugal won 5-3 on penalties after the final ended 2-2 in extra time. Alvaro Morata saw his effort saved by Diogo Costa. Ronaldo has now received high praise from former Real Madrid manager Carlo Ancelotti. The new Brazil boss said in a press conference ahead of the World Cup qualifier against Paraguay:</p>
            <h2>I'm very happy for him. Cristiano is a football legend and remains one at his age, thanks to his seriousness and professionalism. He's still performing at the highest level.</h2>
            <h3 id="said-by">- Carlo Ancelotti</h3>
        `,
        tags: ['Technology', 'AI', 'Sustainability', 'Future of Sport']
    },
    topPicks: [
        {
            id: 'home-article-1',
            sport: 'football',
            category: 'FOOTBALL',
            title: 'Liverpool finalising deal for Leverkusen\'s Wirtz',
            imageUrl: '../../images/wirt_join_liverpool.png',
            link: 'html/sport/sport-detail.html',
            authorId: 'mike-johnson',
            date: 'June 11, 2025',
            readTime: '4 min read',
            body: `
                <p>Liverpool's move for Bayer Leverkusen playmaker Florian Wirtz is at an advanced stage, with the clubs in discussions over the structure of a transfer that could be worth £114m.</p>
                <p>The Reds submitted a third formal bid for the Germany playmaker last week, worth £100m guaranteed and a further £14m of add-ons. If completed, it would smash the club's £75m record signing of captain Virgil van Dijk in 2018.</p>
                <p>Sources have told BBC Sport that talks are now focused on the structure of the final details of the transfer, including the value of the add-ons and how achievable they are. Leverkusen had valued the midfielder at around £126m.</p>
                <p>Wirtz, 22, has made it clear that his preference is to move to Anfield following interest from Manchester City and Bayern Munich.</p>
                <p>He made his debut for Leverkusen at the age of 17 and has scored 57 goals in 197 games for the club.</p>
                <p>He helped them win the Bundesliga for the first time in 2024 and has scored seven goals in 31 appearances for Germany since making his national debut in 2021.</p>
                <p>Liverpool have already signed one player from the German club this summer, with full-back Jeremie Frimpong arriving in a £34m deal.</p>
                
                <h2 id="sub-title-bold">Wirtz to join £100m club</h2>
                <p>Wirtz will become the 10th player ever to go for a fee of £100m or more.</p>
                <p>The British record for an initial fee remains Chelsea's £107m recruit of Benfica midfielder Enzo Fernandez in 2023.</p>
                <p>Months later the Blues signed Brighton midfielder Moises Caicedo for an initial £100m fee - that could rise to a British club record of £115m.</p>
                <p>Wirtz's fee would be only half that of the world record, which remains the £200m PSG paid for Neymar in 2017.</p>

            `,
            tags: ['Basketball', 'Rookie', 'Player Spotlight']
        },
        {
            id: 'home-article-3',
            sport: 'sport',
            category: 'Formula1',
            title: 'Aston Martin confirm Stroll to return to action for Canadian Grand Prix',
            imageUrl: '../../images/aston_martin.png',
            link: 'html/sport/sport-detail.html',
            authorId: 'carlos-rodriguez',
            date: 'June 11, 2025',
            readTime: '6 min read',
            body: `
                <p>Aston Martin have confirmed that Lance Stroll will be back behind the wheel at the upcoming Canadian Grand Prix weekend, following his withdrawal from the previous race in Spain.</p>
                <p>The Silverstone-based squad announced a few hours after Qualifying at the Circuit de Barcelona-Catalunya that Stroll would be sitting out Sunday's Grand Prix with the 26-year-old set to undergo a medical procedure after experiencing pain in his hand and wrist.</p>
                <p>The team went on to say that Stroll's medical consultant believed the pain the driver was experiencing was "in relation to the procedure he underwent in 2023". Stroll sustained fractures and a broken toe after a cycling accident during the 2023 pre-season, which led to him undergoing surgery followed by a process of rehabilitation.</p>
                <p>However, after his latest procedure, Stroll will be back driving the AMR25 in front of his home crowd in Montreal less than a fortnight on from that weekend in Spain.</p>
            `,
            subimage1: '../../images/fomular_sub.png',
            body2: `
                <p>"I am excited to get back behind the wheel with the team for my home Grand Prix this weekend," Stroll said. "I was always going to fight hard to be ready to race in front of the Montreal crowd.</p>
                <p>"I'm feeling good after my procedure and put some laps in at Paul Ricard this week to prepare. Thanks for all the support, see you guys this weekend!"</p>
            `,
            tags: ['Football', 'Soccer', 'Transfers', 'Europe']
        },
        {
            id: 'home-article-4',
            sport: 'esports',
            category: 'E-SPORTS',
            title: 'Korean footballer Son Heung-Min to join the Fortnite Icon Series',
            imageUrl: '../../images/son_esport.png',
            link: 'html/sport/sport-detail.html',
            authorId: 'emily-white',
            date: 'June 11, 2025',
            readTime: '7 min read',
            body: `
                </p>Epic Games Korea has announced that Tottenham footballer Son Heung-Min is coming to Fortnite's Icon Series. Here's what we know!</p>
                </p>An unlikely story developed overnight by Epic Games Korea, who confirmed that Tottenham footballer Son Heung-Min will be the next Fortnite Icon Series member. This collaboration arrives on the heels of Hotspur's 2025 UEFA Europa League Championship victory over Manchester United.</p>
                </pWhen the Son Heung-Min skin launches on June 21, he will become the fifth footballer to grace the game's Icon Series collection, joining Harry Kane, Marco Reus, Neymar, and Lionel Messi. Here's everything we know about the situation.</p>   
     
                `,
            tags: ['E-Sports', 'Gaming', 'Champion', 'Interview']
        },
        {
            id: 'home-article-6',
            sport: 'tennis',
            category: 'TENNIS',
            title: 'Wimbledon\'s Rising Star',
            imageUrl: 'https://via.placeholder.com/400x250/228B22/FFFFFF?text=Tennis+Upset',
            link: 'html/sport/sport-detail.html',
            authorId: 'sarah-jenkins',
            date: 'October 23, 2023',
            readTime: '5 min read',
            body: '<p>A surprising upset at the All England Club has sent shockwaves through the tennis world. The young underdog, previously unranked, has showcased a level of talent and composure that has everyone asking: are we looking at a future legend?</p>',
            tags: ['Tennis', 'Wimbledon', 'Upset', 'Rising Star']
        }
    ],
    latestNews: [
        {
            id: 'home-article-2',
            sport: 'tennis',
            title: 'Tennis Legend Hints at One More Season',
            summary: 'Could the all-time great be returning for a final farewell tour? Sources close to the star say it\'s likely...',
            timestamp: '2025-06-07T18:30:00',
            link: 'html/sport/sport-detail.html',
            authorId: 'david-foster',
            date: 'October 27, 2023',
            readTime: '3 min read',
            body: '<p>Just when we thought the book was closed on a legendary career, whispers from the star\'s inner circle suggest there may be one more chapter. Fans are eagerly awaiting an official announcement.</p>',
            tags: ['Tennis', 'Legend', 'Retirement', 'Comeback']
        },
        {
            id: 'home-article-5',
            sport: 'basketball',
            title: 'Coaching Carousel: Who Lands the Top Jobs?',
            summary: 'Several high-profile coaching positions are open, and the rumor mill is spinning. We break down the top candidates.',
            timestamp: '2023-10-27T15:00:00',
            link: 'html/sport/sport-detail.html',
            authorId: 'ben-carter',
            date: 'October 27, 2023',
            readTime: '5 min read',
            body: '<p>With several teams looking for new leadership, the coaching carousel is in full swing. We analyze the contenders, the long shots, and the potential blockbuster hires that could change the league\'s landscape.</p>',
            tags: ['Coaching', 'NBA', 'Management', 'Basketball']
        },
        {
            id: 'home-article-7',
            sport: 'tennis',
            title: 'The Tech That\'s Changing the Game of Tennis',
            summary: 'New racquet technology and advanced player tracking are giving players an edge like never before.',
            timestamp: '2023-10-26T11:00:00',
            link: 'html/sport/sport-detail.html',
            authorId: 'evelyn-reed',
            date: 'October 26, 2023',
            readTime: '9 min read',
            body: '<p>It\'s not just about strings and tension anymore. Modern tennis racquets are marvels of engineering, incorporating materials and designs that maximize power and control. Coupled with on-court tracking systems, players have more data at their fingertips than ever before.</p>',
            tags: ['Tennis', 'Technology', 'Gear', 'Analytics']
        },
        {
            id: 'home-hero-article-1',
            sport: 'football',
            title: 'Dramatic Overtime Win for the Giants',
            summary: 'A last-minute field goal sealed the deal as the Giants overcame the Eagles in a nail-biter of a match.',
            timestamp: '2023-10-25T08:45:00',
            link: 'html/sport/sport-detail.html',
            authorId: 'tom-frank',
            date: 'October 25, 2023',
            readTime: '4 min read',
            body: '<p>In a game that will be talked about for years, it all came down to a single kick. The pressure was immense, but the home team delivered, securing their spot in the postseason in the most dramatic fashion possible.</p>',
            tags: ['Football', 'NFL', 'Clutch', 'Playoffs']
        },
        {
            id: 'home-article-x1',
            sport: 'esports',
            title: 'Competitive Gaming Reaches New Heights',
            summary: 'With prize pools rivaling traditional sports, the world of e-sports is attracting more talent and viewers than ever.',
            timestamp: '2023-10-24T21:15:00',
            link: 'html/sport/sport-detail.html',
            authorId: 'leo-chen',
            date: 'October 24, 2023',
            readTime: '6 min read',
            body: '<p>The global stage for e-sports has never been bigger. Recent championships have shattered viewership records, with millions tuning in to watch the best players in the world compete for massive prize pools. The era of competitive gaming is here to stay.</p>',
            tags: ['E-Sports', 'Championship', 'Gaming', 'Finance']
        }
    ],
    spotlight: [
        {
            id: 'player-1',
            name: 'Alex "The Comet" Johnson',
            sport: 'Basketball',
            summary: 'Known for his explosive dunks and clutch plays, Alex is redefining the point guard position.',
            imageUrl: 'https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Alex+Johnson'
        },
        {
            id: 'player-2',
            name: 'Maria "Velocity" Velez',
            sport: 'Tennis',
            summary: 'With a serve that clocks in at over 120 mph, Maria is a force to be reckoned with on the court.',
            imageUrl: 'https://via.placeholder.com/300x300/32CD32/FFFFFF?text=Maria+Velez'
        },
        {
            id: 'player-3',
            name: 'Kenji "Katana" Tanaka',
            sport: 'E-Sports',
            summary: 'The undisputed champion of "Blade Fury 7," Kenji\'s strategic genius is legendary in the e-sports community.',
            imageUrl: 'https://via.placeholder.com/300x300/FF4500/FFFFFF?text=Kenji+Tanaka'
        }
    ]
}; 