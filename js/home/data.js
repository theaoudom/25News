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
        title: 'The Future of Sports is Here: A Look at 2024\'s Biggest Trends',
        summary: 'From AI-driven analytics to sustainable stadiums, explore the innovations shaping the next generation of sports.',
        imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.VFgguQHmks2dpcmTWOrJ6QHaEK?r=0&rs=1&pid=ImgDetMain',
        link: 'html/sport/sport-detail.html',
        authorId: 'jane-doe',
        date: 'October 27, 2023',
        readTime: '8 min read',
        body: `
            <p>The world of sports is on the brink of a technological revolution. From the way athletes train to how fans experience the game, innovation is driving change at an unprecedented pace. This year, we're seeing a convergence of technologies that promise to reshape the sporting landscape entirely.</p>
            <p>One of the most significant trends is the rise of artificial intelligence in player analytics. Coaches and teams are now leveraging complex algorithms to break down performance metrics, identify hidden patterns, and gain a competitive edge. This data-driven approach is moving beyond simple stats, offering deep insights into player fitness, fatigue, and even potential injury risks.</p>
            <h3>Sustainable Arenas</h3>
            <p>Beyond the digital realm, the physical spaces of sport are also transforming. The concept of the "green stadium" is gaining momentum, with new venues being built with sustainability at their core. These arenas feature everything from solar panels and rainwater harvesting systems to locally sourced food and comprehensive recycling programs, minimizing their environmental impact while offering a world-class fan experience.</p>
        `,
        tags: ['Technology', 'AI', 'Sustainability', 'Future of Sport']
    },
    topPicks: [
        {
            id: 'home-article-1',
            sport: 'basketball',
            category: 'NBA',
            title: 'Rookie Sensation\'s Unbelievable Season',
            imageUrl: 'https://via.placeholder.com/400x250/4682B4/FFFFFF?text=Basketball+Star',
            link: 'html/sport/sport-detail.html',
            authorId: 'mike-johnson',
            date: 'October 26, 2023',
            readTime: '4 min read',
            body: '<p>The league is buzzing about the phenomenal performance of the latest rookie to take the court. Their stats are not just good for a first-year player; they are historic. We dive deep into the plays that are making everyone take notice.</p>',
            tags: ['Basketball', 'NBA', 'Rookie', 'Player Spotlight']
        },
        {
            id: 'home-article-3',
            sport: 'football',
            category: 'SOCCER',
            title: 'Transfer Market Buzz: Who is on the Move?',
            imageUrl: 'https://via.placeholder.com/400x250/FF8C00/FFFFFF?text=Soccer+Transfer',
            link: 'html/sport/sport-detail.html',
            authorId: 'carlos-rodriguez',
            date: 'October 25, 2023',
            readTime: '6 min read',
            body: '<p>The summer transfer window is heating up, with blockbuster deals being rumored across Europe\'s top leagues. Will the star striker make the jump to a rival club? Insiders suggest a record-breaking fee is on the table.</p>',
            tags: ['Football', 'Soccer', 'Transfers', 'Europe']
        },
        {
            id: 'home-article-4',
            sport: 'esports',
            category: 'E-SPORTS',
            title: 'Inside the Mind of a Champion Gamer',
            imageUrl: 'https://via.placeholder.com/400x250/8A2BE2/FFFFFF?text=Pro+Gamer',
            link: 'html/sport/sport-detail.html',
            authorId: 'emily-white',
            date: 'October 24, 2023',
            readTime: '7 min read',
            body: '<p>What does it take to compete at the highest level of e-sports? We sit down with a world champion to discuss the intense training, mental fortitude, and lightning-fast reflexes required to be the best in the world.</p>',
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