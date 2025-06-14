export const worldNewsSection = {
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
};

export const worldNewsData = {
    heroArticle: {
        id: 'wn-hero-01',
        category: "Global Events",
        title: "Paris 2024: The World Gathers for a Spectacle of Unity and Competition",
        summary: "With the opening ceremony just weeks away, Paris is putting the final touches on what promises to be an unforgettable Olympic Games. New venues, sustainability initiatives, and a focus on inclusivity are set to redefine the global sporting event.",
        imageUrl: "../images/stock/world/olympics-paris.jpg",
        link: "html/article-detail.html?id=wn-hero-01"
    },
    latestNews: [
        {
            id: 'wn-latest-01',
            category: "Formula 1",
            title: "Tension in the Paddock: F1's Top Teams Battle for Mid-Season Dominance",
            summary: "As the Formula 1 season heats up, the rivalry between Red Bull, Ferrari, and Mercedes intensifies. A look at the key moments and what to expect next.",
            imageUrl: "../images/stock/world/f1-race.jpg",
            link: "html/article-detail.html?id=wn-latest-01"
        },
        {
            id: 'wn-latest-02',
            category: "Tennis",
            title: "A New Era on the Court: Young Stars Challenge the Tennis Elite",
            summary: "The landscape of professional tennis is shifting as a new generation of talent rises through the ranks, challenging long-standing champions at major tournaments.",
            imageUrl: "../images/stock/world/tennis-action.jpg",
            link: "html/article-detail.html?id=wn-latest-02"
        },
        {
            id: 'wn-latest-03',
            category: "Cricket",
            title: "India and Australia to Clash in World Test Championship Final",
            summary: "The stage is set for a monumental clash as cricket giants India and Australia compete for the coveted World Test Championship mace.",
            imageUrl: "../images/stock/world/cricket-match.jpg",
            link: "html/article-detail.html?id=wn-latest-03"
        },
        {
            id: 'wn-latest-04',
            category: "Rugby",
            title: "South Africa and New Zealand Prepare for Rugby Championship Showdown",
            summary: "The historic rivalry between the Springboks and the All Blacks is reignited as they prepare for a critical match in the Rugby Championship.",
            imageUrl: "../images/stock/world/rugby-game.jpg",
            link: "html/article-detail.html?id=wn-latest-04"
        }
    ],
    majorEvents: [
        {
            name: "FIFA World Cup 2026",
            host: "USA, Canada, Mexico",
            date: "June 11 – July 19, 2026",
            icon: "fas fa-futbol" // Font Awesome icon class
        },
        {
            name: "Winter Olympics 2026",
            host: "Milan-Cortina, Italy",
            date: "February 6–22, 2026",
            icon: "fas fa-snowflake"
        },
        {
            name: "Rugby World Cup 2027",
            host: "Australia",
            date: "October 1 – November 13, 2027",
            icon: "fas fa-football-ball"
        }
    ],
    athleteSpotlight: [
        {
            name: "Simone Biles",
            sport: "Gymnastics",
            country: "USA",
            achievement: "Redefining the sport with unparalleled skill and advocacy for mental health.",
            imageUrl: "https://hips.hearstapps.com/hmg-prod/images/simone-biles-celebrates-after-placing-first-in-the-floor-news-photo-1693236365.jpg?crop=0.949xw:0.633xh;0.0170xw,0.0465xh&resize=640:*"
        },
        {
            name: "Kylian Mbappé",
            sport: "Football",
            country: "France",
            achievement: "Leading a new generation of football superstars with breathtaking speed and goal-scoring prowess.",
            imageUrl: "https://b.fssta.com/uploads/application/soccer/headshots/40670.vresize.350.350.medium.72.png"
        },
        {
            name: "Max Verstappen",
            sport: "Formula 1",
            country: "Netherlands",
            achievement: "Dominating the F1 circuits with aggressive driving and multiple world championships.",
            imageUrl: "https://cdn-9.motorsport.com/images/mgl/6D1XbeV0/s800/max-verstappen-red-bull-racing.jpg"
        }
    ],
    regionalNews: {
        europe: [
            { id: 'wn-eu-01', title: "Champions League Final Delivers Unforgettable Drama", link: "html/article-detail.html?id=wn-eu-01" },
            { id: 'wn-eu-02', title: "Wimbledon Sees a Surprise Champion Crowned", link: "html/article-detail.html?id=wn-eu-02" },
        ],
        americas: [
            { id: 'wn-am-01', title: "Super Bowl Champions Begin Their Title Defense", link: "html/article-detail.html?id=wn-am-01" },
            { id: 'wn-am-02', title: "Copa América: Brazil and Argentina Favorites Once Again", link: "html/article-detail.html?id=wn-am-02" },
        ],
        asia: [
            { id: 'wn-as-01', title: "Japan's Pro Baseball League Reaches Exciting Climax", link: "html/article-detail.html?id=wn-as-01" },
            { id: 'wn-as-02', title: "Indian Premier League Breaks Viewership Records", link: "html/article-detail.html?id=wn-as-02" },
        ],
        africa: [
             { id: 'wn-af-01', title: "Africa Cup of Nations Qualifiers Heat Up", link: "html/article-detail.html?id=wn-af-01" },
             { id: 'wn-af-02', title: "Kenyan Marathon Runners Dominate Boston Marathon", link: "html/article-detail.html?id=wn-af-02" },
        ]
    }
}; 