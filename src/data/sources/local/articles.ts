import type { Article, CategorySlug } from '@/domain/entities/Article';
import { getAuthor } from './authors';
import { slugify, stripHtml, truncate, estimateReadTime } from '@/shared/utils/text';

/**
 * Raw authoring shape — compact so editorial content stays readable. The
 * `build()` mapper derives slug, read-time and updated date and resolves the
 * author, producing fully-formed domain `Article` objects.
 */
interface RawArticle {
  id: string;
  slug?: string;
  title: string;
  summary?: string;
  category: CategorySlug;
  categoryLabel: string;
  body: string;
  secondaryImageUrl?: string;
  secondaryBody?: string;
  imageUrl: string;
  imageAlt?: string;
  authorId: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  tags?: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isWorldCup?: boolean;
}

function build(raw: RawArticle): Article {
  const summary = raw.summary?.trim() || truncate(stripHtml(raw.body), 180);
  return {
    id: raw.id,
    slug: raw.slug || slugify(raw.title),
    title: raw.title,
    summary,
    category: raw.category,
    categoryLabel: raw.categoryLabel,
    body: raw.body,
    secondaryImageUrl: raw.secondaryImageUrl,
    secondaryBody: raw.secondaryBody,
    imageUrl: raw.imageUrl,
    imageAlt: raw.imageAlt || raw.title,
    author: getAuthor(raw.authorId),
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt || raw.publishedAt,
    readTimeMinutes: estimateReadTime(raw.body + (raw.secondaryBody || '')),
    tags: raw.tags || [],
    isBreaking: raw.isBreaking,
    isFeatured: raw.isFeatured,
    isTrending: raw.isTrending,
    isWorldCup: raw.isWorldCup,
  };
}

const RAW: RawArticle[] = [
  // ───────────────────────── FOOTBALL ─────────────────────────
  {
    id: 'home-article-1107',
    title: 'Liverpool football star Diogo Jota killed in car crash',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'mike-johnson',
    publishedAt: '2025-07-03T08:00:00Z',
    isBreaking: true,
    isTrending: true,
    tags: ['Football', 'Liverpool', 'Premier League'],
    imageUrl:
      'https://nilepost.co.ug/new_cms/wp-content/uploads/2025/07/e2dd1de0-0217-11ef-946e-d7e525632c0f.jpg',
    summary:
      'Liverpool forward Diogo Jota has tragically passed away following a car accident in northwestern Spain.',
    body: `
      <p>Liverpool forward Diogo Jota has tragically passed away following a car accident in the early hours of Thursday morning near Zamora, in northwestern Spain.</p>
      <h2>Accident Details</h2>
      <p>The 28-year-old Portuguese footballer was traveling with his brother, Andre, who also lost his life in the crash. The incident took place on the A-52 highway near Palacios de Sanabria, as they were heading toward Benavente.</p>
      <p>According to authorities, the Lamborghini they were in veered off the road at around 12:30 a.m. Early reports suggest a tire may have burst while the vehicle was overtaking, causing it to leave the road and ignite in flames.</p>
      <h2>Investigation Underway</h2>
      <p>Both victims were pronounced dead at the scene. Officials noted that no other vehicles were involved in the crash, and speeding is being investigated as a possible factor.</p>`,
    secondaryImageUrl:
      'https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltcd74acc1d0a99f3a/bltbcfde8c439a9992d/686648b7904fb967778da00c/jota-family.jpg',
    secondaryBody: `
      <h2>Scene Aftermath</h2>
      <p>Images from the aftermath showed charred wreckage and scattered debris along the roadside, painting a devastating picture of the collision.</p>
      <h2>Personal Tragedy</h2>
      <p>The tragedy comes just ten days after Jota married his longtime partner, Rute Cardoso, making the loss even more heartbreaking for his family and fans.</p>`,
  },
  {
    id: 'home-article-1',
    title: "Liverpool finalising deal for Leverkusen's Wirtz",
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'mike-johnson',
    publishedAt: '2025-06-11T09:00:00Z',
    isTrending: true,
    tags: ['Football', 'Transfers', 'Premier League', 'Liverpool'],
    imageUrl: '/images/wirt_join_liverpool.png',
    body: `
      <p>Liverpool's move for Bayer Leverkusen playmaker Florian Wirtz is at an advanced stage, with the clubs in discussions over the structure of a transfer that could be worth £114m.</p>
      <p>The Reds submitted a third formal bid for the Germany playmaker last week, worth £100m guaranteed and a further £14m of add-ons. If completed, it would smash the club's £75m record signing of captain Virgil van Dijk in 2018.</p>
      <p>Sources have told reporters that talks are now focused on the structure of the final details of the transfer, including the value of the add-ons and how achievable they are. Leverkusen had valued the midfielder at around £126m.</p>
      <p>Wirtz, 22, has made it clear that his preference is to move to Anfield following interest from Manchester City and Bayern Munich. He made his debut for Leverkusen at the age of 17 and has scored 57 goals in 197 games for the club.</p>
      <h2>Wirtz to join £100m club</h2>
      <p>Wirtz will become the 10th player ever to go for a fee of £100m or more. The British record for an initial fee remains Chelsea's £107m recruit of Benfica midfielder Enzo Fernandez in 2023.</p>`,
  },
  {
    id: 'football-cunha',
    title: 'Manchester United announce signing of Matheus Cunha from Wolves on five-year deal',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'carlos-rodriguez',
    publishedAt: '2025-06-05T10:00:00Z',
    tags: ['Football', 'Transfers', 'Manchester United'],
    imageUrl:
      'https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/2cc95d71-365f-4df4-9f8b-456b58def0e6.avif',
    body: `
      <h2>Manchester United Complete Signing of Matheus Cunha</h2>
      <p>Manchester United completed the signing of Matheus Cunha from Wolverhampton Wanderers, with the Brazil forward joining on a five-year contract.</p>
      <p>United triggered Cunha's release clause, worth around £62.5 million, according to a source at the club. The Old Trafford side also have the option of extending his contract by a year.</p>
      <h2>Matheus Cunha Shares His Dream Come True</h2>
      <p>"It's hard to put into words my feelings about becoming a Manchester United player," Cunha said. "Ever since I was a child in Brazil watching Premier League games on TV at my grandmother's house, United was my favourite English team, and I dreamed of wearing the red shirt.</p>
      <p>"I can't wait for the start of pre-season. All my focus is now on working hard to become a valuable part of the team, and helping get this club back to the top."</p>`,
  },
  {
    id: 'sport-article-3-ffp',
    title: 'Transfer Window Revolution: New Financial Fair Play Rules Reshape Market',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'carlos-rodriguez',
    publishedAt: '2025-06-12T09:00:00Z',
    tags: ['Football', 'Transfers', 'UEFA', 'Finance'],
    imageUrl: '/images/placeholders/football.svg',
    body: `
      <p>UEFA's new Financial Fair Play regulations, implemented at the start of the 2025 summer transfer window, are fundamentally changing how football clubs operate. The updated rules, which limit spending to 70% of club revenue, have created a more level playing field.</p>
      <h2>Market Impact</h2>
      <p>The new regulations have led to a 40% reduction in total transfer spending compared to the previous summer window. Clubs are now focusing on developing young talent and making strategic, value-based signings.</p>
      <h2>Long-term Implications</h2>
      <p>Analysts predict these changes will lead to more competitive leagues across Europe, as smaller clubs can now compete more effectively with traditional powerhouses.</p>`,
  },
  {
    id: 'home-article-4-son',
    title: 'Korean footballer Son Heung-Min to join the Fortnite Icon Series',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'emily-white',
    publishedAt: '2025-06-11T12:00:00Z',
    tags: ['Football', 'Gaming', 'Tottenham'],
    imageUrl: '/images/son_esport.png',
    body: `
      <p>Epic Games Korea has announced that Tottenham footballer Son Heung-Min is coming to Fortnite's Icon Series.</p>
      <p>This collaboration arrives on the heels of Tottenham Hotspur's 2025 UEFA Europa League Championship victory over Manchester United.</p>
      <p>When the Son Heung-Min skin launches on June 21, he will become the fifth footballer to grace the game's Icon Series collection, joining Harry Kane, Marco Reus, Neymar, and Lionel Messi.</p>`,
  },
  {
    id: 'sport-hero-quadruple',
    title: 'Manchester City Clinches Historic Quadruple in Dramatic Champions League Final',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'tom-frank',
    publishedAt: '2025-06-15T22:00:00Z',
    isFeatured: true,
    tags: ['Football', 'Champions League', 'Manchester City'],
    imageUrl: '/images/placeholders/football.svg',
    summary:
      "Pep Guardiola's side becomes the first English club to achieve the quadruple after a thrilling victory over Real Madrid.",
    body: `
      <p>In a historic night at Wembley Stadium, Manchester City achieved what no English club has ever accomplished before — the coveted quadruple. Pep Guardiola's side defeated Real Madrid 3-2 in a thrilling Champions League final.</p>
      <h2>The Road to Glory</h2>
      <p>City's journey began in August with the Community Shield, followed by a record-breaking Premier League title, an FA Cup penalty-shootout win over Manchester United, and a Carabao Cup victory over Liverpool.</p>
      <h2>The Final Showdown</h2>
      <p>Kevin De Bruyne opened the scoring with a stunning long-range effort, only for Vinícius Júnior to equalise. Erling Haaland restored the lead before Jude Bellingham levelled, and Phil Foden's 78th-minute strike secured the trophy.</p>
      <h2>Guardiola's Legacy</h2>
      <p>This victory cements Pep Guardiola's place among the greatest managers in football history.</p>`,
  },

  // ───────────────────────── WORLD CUP ─────────────────────────
  {
    id: 'home-hero-main',
    title: 'Carlo Ancelotti Showers Praise on Cristiano Ronaldo After UEFA Nations League Win',
    category: 'football',
    categoryLabel: 'International Football',
    authorId: 'jane-doe',
    publishedAt: '2025-06-11T18:00:00Z',
    isTrending: true,
    tags: ['Football', 'Portugal', 'Cristiano Ronaldo', 'Nations League'],
    imageUrl: '/images/ronaldo_win_nation_lauge.webp',
    summary: 'Carlo Ancelotti praises Cristiano Ronaldo after Portugal lifts the UEFA Nations League trophy.',
    body: `
      <p>Cristiano Ronaldo, 40, continues to prove the doubters wrong, having recently lifted the UEFA Nations League trophy with Portugal. He has now won the tournament twice.</p>
      <p>Ronaldo was pivotal to Portugal's winning campaign, scoring eight goals in nine appearances. Portugal won 5-3 on penalties after the final ended 2-2 in extra time.</p>
      <p>Ronaldo has now received high praise from former Real Madrid manager Carlo Ancelotti. The Brazil boss said ahead of a World Cup qualifier against Paraguay:</p>
      <blockquote>"I'm very happy for him. Cristiano is a football legend and remains one at his age, thanks to his seriousness and professionalism. He's still performing at the highest level." — Carlo Ancelotti</blockquote>`,
  },
  {
    id: 'wc-2026-guide',
    title: 'FIFA World Cup 2026: Everything You Need to Know About the 48-Team Tournament',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
    publishedAt: '2026-06-01T09:00:00Z',
    isWorldCup: true,
    isFeatured: true,
    isTrending: true,
    tags: ['World Cup', 'FIFA', 'USA', 'Canada', 'Mexico'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'The 2026 FIFA World Cup is the biggest in history — 48 teams, three host nations and 104 matches across North America.',
    body: `
      <p>The 2026 FIFA World Cup marks a historic milestone for the sport: for the first time, the tournament expands to <strong>48 teams</strong> and is co-hosted by three nations — the United States, Canada and Mexico. With 104 matches across 16 host cities, it is the largest World Cup ever staged.</p>
      <h2>A New Format</h2>
      <p>The 48 teams are split into 12 groups of four. The top two from each group, plus the eight best third-placed teams, advance to a new round of 32. From there the tournament follows a familiar knockout path through the round of 16, quarter-finals, semi-finals and the final.</p>
      <h2>Host Cities</h2>
      <p>Matches are spread across iconic venues including MetLife Stadium in New Jersey — which hosts the final — alongside stadiums in Los Angeles, Dallas, Atlanta, Mexico City, Toronto and Vancouver, among others.</p>
      <h2>What's at Stake</h2>
      <p>With more teams than ever, nations that have historically struggled to qualify now have a genuine path to the world stage, broadening the tournament's global appeal and unlocking new footballing stories.</p>`,
  },
  {
    id: 'wc-2026-groups',
    title: 'World Cup 2026 Group Stage Explained: How the New Round of 32 Works',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'tom-frank',
    publishedAt: '2026-06-05T10:00:00Z',
    isWorldCup: true,
    isTrending: true,
    tags: ['World Cup', 'Format', 'Group Stage'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'The expanded 48-team format introduces a round of 32 for the first time. Here is how qualification from the groups works.',
    body: `
      <p>The expanded 2026 World Cup introduces a knockout round that has never existed before — the round of 32 — fundamentally changing how teams approach the group stage.</p>
      <h2>Twelve Groups of Four</h2>
      <p>Each of the 12 groups contains four teams who play a single round-robin. The top two finishers in every group automatically progress. That accounts for 24 of the 32 knockout places.</p>
      <h2>The Best Third-Placed Teams</h2>
      <p>The remaining eight spots go to the best third-placed teams across all 12 groups, ranked by points, goal difference and goals scored. This means a strong third-place finish can still be enough to advance — raising the stakes in every final group match.</p>
      <h2>Why It Matters</h2>
      <p>For fans, it means more meaningful matches and fewer dead rubbers. For coaches, squad rotation and goal difference become strategic weapons from the very first whistle.</p>`,
  },
  {
    id: 'wc-2026-contenders',
    title: 'Title Contenders for World Cup 2026: The Favourites and the Dark Horses',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'carlos-rodriguez',
    publishedAt: '2026-06-08T11:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Analysis', 'Brazil', 'France', 'Argentina'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'Defending champions Argentina, France and Brazil headline the favourites — but several dark horses could spring a surprise.',
    body: `
      <p>As the 2026 World Cup gets under way, the usual heavyweights once again lead the betting — but the expanded format and gruelling North American summer could level the playing field.</p>
      <h2>The Favourites</h2>
      <p>Defending champions Argentina, with a blend of experience and emerging talent, remain a benchmark. France's depth and Brazil's attacking riches make them perennial threats, while Spain and England arrive with deep, technically gifted squads.</p>
      <h2>The Dark Horses</h2>
      <p>Watch for Morocco, semi-finalists in 2022, alongside an athletic USA side buoyed by home advantage and a Portugal team determined to deliver on the international stage.</p>
      <h2>The X-Factor: Conditions</h2>
      <p>Summer heat and long travel distances between host cities will test squad depth like never before. The teams that manage rotation best may have the decisive edge.</p>`,
  },
  {
    id: 'wc-2026-host-cities',
    title: 'World Cup 2026 Host Cities: All 16 Venues Across the USA, Canada and Mexico',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
    publishedAt: '2026-06-09T09:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Host Cities', 'Venues', 'USA', 'Canada', 'Mexico'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'The 2026 World Cup is spread across 16 host cities in three countries — 11 in the USA, three in Mexico and two in Canada. Here is the full list.',
    body: `
      <p>For the first time, the FIFA World Cup will be co-hosted by three nations, with 104 matches played across <strong>16 host cities</strong> in the United States, Mexico and Canada. The tournament runs from 11 June to 19 July 2026.</p>
      <h2>United States (11 cities)</h2>
      <ul>
        <li><strong>New York / New Jersey</strong> — MetLife Stadium, which hosts the final on 19 July.</li>
        <li><strong>Los Angeles</strong> — SoFi Stadium, Inglewood.</li>
        <li><strong>Dallas</strong> — AT&amp;T Stadium, Arlington.</li>
        <li><strong>San Francisco Bay Area</strong> — Levi's Stadium, Santa Clara.</li>
        <li><strong>Miami</strong> — Hard Rock Stadium.</li>
        <li><strong>Atlanta</strong> — Mercedes-Benz Stadium.</li>
        <li><strong>Seattle</strong> — Lumen Field.</li>
        <li><strong>Philadelphia</strong> — Lincoln Financial Field.</li>
        <li><strong>Houston</strong> — NRG Stadium.</li>
        <li><strong>Kansas City</strong> — Arrowhead Stadium.</li>
        <li><strong>Boston</strong> — Gillette Stadium, Foxborough.</li>
      </ul>
      <h2>Mexico (3 cities)</h2>
      <ul>
        <li><strong>Mexico City</strong> — Estadio Azteca, which stages the opening match and becomes the first stadium to host games at three different World Cups.</li>
        <li><strong>Guadalajara</strong> — Estadio Akron.</li>
        <li><strong>Monterrey</strong> — Estadio BBVA.</li>
      </ul>
      <h2>Canada (2 cities)</h2>
      <ul>
        <li><strong>Toronto</strong> — BMO Field.</li>
        <li><strong>Vancouver</strong> — BC Place.</li>
      </ul>
      <h2>A Logistical Challenge</h2>
      <p>With venues stretching from Vancouver to Miami, travel and climate vary enormously. Teams and fans face long flights and a mix of summer heat, humidity and several climate-controlled indoor stadiums — a planning test unlike any previous World Cup.</p>`,
  },
  {
    id: 'wc-2026-key-dates',
    title: 'World Cup 2026 Key Dates: Opening Match, Group Stage and the Final',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'tom-frank',
    publishedAt: '2026-06-10T09:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Schedule', 'Fixtures', 'Dates'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'From the Estadio Azteca opener to the MetLife final, here are the dates that shape the 2026 World Cup calendar.',
    body: `
      <p>The 2026 World Cup is the longest in history, running 39 days from 11 June to 19 July across the largest field the tournament has ever seen. Here is how the calendar breaks down.</p>
      <h2>Opening Match — 11 June</h2>
      <p>The tournament kicks off at the iconic Estadio Azteca in Mexico City, continuing the stadium's unique World Cup legacy after 1970 and 1986.</p>
      <h2>Group Stage — 11 to 27 June</h2>
      <p>All 48 teams play their three group matches across the opening fortnight. The 12 groups of four feed into a new knockout round, with the top two from each group plus the eight best third-placed teams advancing.</p>
      <h2>Knockout Rounds</h2>
      <ul>
        <li><strong>Round of 32</strong> — late June, a brand-new stage created by the 48-team format.</li>
        <li><strong>Round of 16</strong> — early July.</li>
        <li><strong>Quarter-finals</strong> — 9 to 11 July.</li>
        <li><strong>Semi-finals</strong> — 14 and 15 July.</li>
        <li><strong>Third-place play-off</strong> — 18 July.</li>
        <li><strong>Final</strong> — 19 July at MetLife Stadium, New York / New Jersey.</li>
      </ul>
      <h2>What It Means for Squads</h2>
      <p>Teams that go all the way will play up to eight matches — one more than in previous tournaments — making squad depth and recovery more important than ever in the North American summer.</p>`,
  },
  {
    id: 'wc-winners-history',
    title: 'Every World Cup Winner: A Complete History from 1930 to 2022',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'carlos-rodriguez',
    publishedAt: '2026-06-07T09:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'History', 'Records', 'Brazil', 'Argentina'],
    imageUrl: '/images/placeholders/worldcup.svg',
    summary:
      'Eight nations have lifted the trophy across 22 tournaments. Here is the full roll of World Cup champions and the records that define them.',
    body: `
      <p>Since the first tournament in Uruguay in 1930, only eight nations have been crowned world champions. As the 2026 edition begins, here is the complete history of who has lifted football's greatest prize.</p>
      <h2>Most Titles</h2>
      <ul>
        <li><strong>Brazil — 5</strong> (1958, 1962, 1970, 1994, 2002)</li>
        <li><strong>Germany — 4</strong> (1954, 1974, 1990, 2014)</li>
        <li><strong>Italy — 4</strong> (1934, 1938, 1982, 2006)</li>
        <li><strong>Argentina — 3</strong> (1978, 1986, 2022)</li>
        <li><strong>France — 2</strong> (1998, 2018)</li>
        <li><strong>Uruguay — 2</strong> (1930, 1950)</li>
        <li><strong>England — 1</strong> (1966)</li>
        <li><strong>Spain — 1</strong> (2010)</li>
      </ul>
      <h2>Recent Champions</h2>
      <p>Argentina are the reigning champions, having beaten France on penalties in a classic 2022 final in Qatar — Lionel Messi's crowning moment. France lifted the trophy in 2018 in Russia, with Germany (2014) and Spain (2010) the champions before them.</p>
      <h2>Records to Know</h2>
      <p>Brazil are the only nation to appear at every World Cup and hold the record for titles. Three players — Pelé, and more recently a select group of greats — have shaped the tournament's legend. As 2026 expands the field to 48 teams, the door is open for a ninth name to one day join this exclusive list.</p>`,
  },

  // ───────────────────────── SPORTS ─────────────────────────
  {
    id: 'home-article-3-stroll',
    title: 'Aston Martin confirm Stroll to return to action for Canadian Grand Prix',
    category: 'sports',
    categoryLabel: 'Formula 1',
    authorId: 'ben-carter',
    publishedAt: '2025-06-11T09:00:00Z',
    tags: ['Formula 1', 'Aston Martin'],
    imageUrl: '/images/aston_martin.png',
    body: `
      <p>Aston Martin have confirmed that Lance Stroll will be back behind the wheel at the upcoming Canadian Grand Prix weekend, following his withdrawal from the previous race in Spain.</p>
      <p>The Silverstone-based squad announced that Stroll would sit out following a medical procedure after experiencing pain in his hand and wrist, related to a procedure he underwent in 2023.</p>
      <p>However, after his latest procedure, Stroll will be back driving the AMR25 in front of his home crowd in Montreal.</p>`,
    secondaryImageUrl: '/images/fomular_sub.png',
    secondaryBody: `
      <p>"I am excited to get back behind the wheel with the team for my home Grand Prix this weekend," Stroll said. "I was always going to fight hard to be ready to race in front of the Montreal crowd."</p>`,
  },
  {
    id: 'sport-article-1-nba-ai',
    title: 'NBA Introduces Revolutionary AI-Powered Officiating System',
    category: 'sports',
    categoryLabel: 'Basketball',
    authorId: 'mike-johnson',
    publishedAt: '2025-06-14T09:00:00Z',
    isTrending: true,
    tags: ['Basketball', 'NBA', 'Technology'],
    imageUrl: '/images/placeholders/sports.svg',
    body: `
      <p>The NBA has announced a groundbreaking partnership to implement an AI-powered officiating system that will debut during the 2025-26 season, using advanced computer vision and machine learning to assist referees.</p>
      <h2>Technology Overview</h2>
      <p>The system combines high-definition cameras, real-time computer vision analysis, and machine learning algorithms trained on millions of plays, communicating with referees via earpieces.</p>
      <h2>Expected Benefits</h2>
      <p>The system is expected to reduce officiating errors by up to 85% while maintaining the human element of refereeing.</p>`,
  },
  {
    id: 'sport-article-2-wimbledon',
    title: 'Wimbledon Announces Historic Prize Money Increase',
    category: 'sports',
    categoryLabel: 'Tennis',
    authorId: 'sarah-jenkins',
    publishedAt: '2025-06-13T09:00:00Z',
    tags: ['Tennis', 'Wimbledon'],
    imageUrl: '/images/placeholders/sports.svg',
    body: `
      <p>Wimbledon has announced a historic increase in prize money for the 2025 tournament, with the total prize fund reaching £50 million. This represents a 15% increase and continues the tournament's commitment to equal pay.</p>
      <h2>Prize Money Breakdown</h2>
      <p>The men's and women's singles champions will each receive £2.5 million, while even first-round losers will receive £55,000.</p>
      <h2>Economic Impact</h2>
      <p>The increase reflects the growing commercial success of tennis and ensures players at all levels can make a sustainable living from the sport.</p>`,
  },
  {
    id: 'sport-article-5-nba-expansion',
    title: 'NBA Expands to Mexico City and Vancouver',
    category: 'sports',
    categoryLabel: 'Basketball',
    authorId: 'ben-carter',
    publishedAt: '2025-06-10T09:00:00Z',
    tags: ['Basketball', 'NBA', 'Expansion'],
    imageUrl: '/images/placeholders/sports.svg',
    body: `
      <p>The NBA has officially announced expansion to Mexico City and Vancouver, bringing the league to 32 teams. The expansion teams will begin play in the 2027-28 season.</p>
      <h2>Market Analysis</h2>
      <p>Mexico City offers access to the growing Latin American market, while Vancouver provides a gateway to the Canadian market.</p>
      <h2>Economic Impact</h2>
      <p>The expansion is expected to generate over $2 billion in economic activity, including arena construction, job creation and increased tourism.</p>`,
  },
  {
    id: 'home-article-7-tennis-tech',
    title: "The Tech That's Changing the Game of Tennis",
    category: 'sports',
    categoryLabel: 'Tennis',
    authorId: 'evelyn-reed',
    publishedAt: '2025-05-20T09:00:00Z',
    tags: ['Tennis', 'Technology', 'Analytics'],
    imageUrl: '/images/placeholders/sports.svg',
    body: `
      <p>It's not just about strings and tension anymore. Modern tennis racquets are marvels of engineering, incorporating materials and designs that maximise power and control.</p>
      <p>Coupled with on-court tracking systems, players have more data at their fingertips than ever before, reshaping how the game is coached and played.</p>`,
  },

  // ───────────────────────── WORLD ─────────────────────────
  {
    id: 'top-1-climate',
    title: 'Global Climate Summit Reaches Historic Agreement on Carbon Reduction',
    category: 'world',
    categoryLabel: 'Breaking News',
    authorId: 'newsroom',
    publishedAt: '2025-06-15T08:00:00Z',
    isBreaking: true,
    isFeatured: true,
    tags: ['Climate', 'Politics', 'Economy'],
    imageUrl: '/images/placeholders/world.svg',
    body: `
      <p>In a historic breakthrough at the COP29 climate summit, world leaders have agreed to the most ambitious climate targets ever set, committing to reduce greenhouse gas emissions by 60% below 2019 levels by 2035.</p>
      <h2>Key Provisions of the Agreement</h2>
      <ul>
        <li><strong>Carbon Pricing:</strong> A global minimum carbon price of $50 per ton by 2030.</li>
        <li><strong>Renewable Energy:</strong> 70% renewable energy generation by 2035.</li>
        <li><strong>Fossil Fuel Phase-out:</strong> Complete phase-out of coal power by 2040 in developed nations.</li>
        <li><strong>Climate Finance:</strong> A $100 billion annual fund for developing nations.</li>
      </ul>
      <h2>Economic Implications</h2>
      <p>Analysts predict the agreement will trigger the largest economic transformation since the Industrial Revolution, with the renewable energy sector expected to create over 20 million new jobs globally.</p>`,
  },
  {
    id: 'world-news-1-quantum',
    title: 'Revolutionary AI Breakthrough: Quantum Computing Achieves Commercial Viability',
    category: 'world',
    categoryLabel: 'Technology',
    authorId: 'newsroom',
    publishedAt: '2025-06-14T09:00:00Z',
    isTrending: true,
    tags: ['Technology', 'Quantum Computing', 'AI'],
    imageUrl: '/images/placeholders/world.svg',
    body: `
      <p>IBM and Google have simultaneously announced major breakthroughs in quantum computing technology, bringing commercial quantum applications within reach for the first time.</p>
      <h2>The Quantum Advantage</h2>
      <p>IBM's 1,000-qubit Condor processor and Google's error-corrected processor represent the first quantum computers capable of solving real-world problems classical computers cannot handle efficiently.</p>
      <h2>Immediate Applications</h2>
      <ul>
        <li><strong>Drug Discovery:</strong> Designing new drugs in days rather than years.</li>
        <li><strong>Financial Modeling:</strong> Portfolio optimisation and risk assessment.</li>
        <li><strong>Climate Modeling:</strong> More accurate weather and climate predictions.</li>
      </ul>`,
  },
  {
    id: 'world-news-2-banks',
    title: 'Central Banks Coordinate Historic Interest Rate Decision',
    category: 'world',
    categoryLabel: 'Economy',
    authorId: 'newsroom',
    publishedAt: '2025-06-13T09:00:00Z',
    tags: ['Economy', 'Finance', 'Markets'],
    imageUrl: '/images/placeholders/world.svg',
    body: `
      <p>In an unprecedented display of global monetary coordination, the Federal Reserve, European Central Bank, Bank of Japan and Bank of England have announced a synchronised approach to interest rate policy.</p>
      <h2>The Coordinated Approach</h2>
      <p>The central banks have agreed to maintain a unified stance, with gradual rate adjustments based on shared economic indicators — the closest coordination since the 2008 financial crisis.</p>
      <h2>Market Reaction</h2>
      <p>Financial markets responded positively, with major indices rising 2-3% globally as uncertainty over divergent policies eased.</p>`,
  },
  {
    id: 'world-news-3-alzheimers',
    title: "Breakthrough in Alzheimer's Treatment Shows Promising Results",
    category: 'world',
    categoryLabel: 'Health',
    authorId: 'evelyn-reed',
    publishedAt: '2025-06-12T09:00:00Z',
    tags: ['Health', 'Science', 'Medicine'],
    imageUrl: '/images/placeholders/world.svg',
    body: `
      <p>Clinical trials of a new drug therapy have shown unprecedented results in improving cognitive function for early-stage Alzheimer's patients, targeting the underlying mechanisms of the disease.</p>
      <h2>Clinical Trial Results</h2>
      <p>The Phase III trial involved 1,200 patients across 15 countries. Patients receiving the treatment experienced a 40% improvement in cognitive function compared to the control group.</p>
      <h2>Regulatory Pathway</h2>
      <p>The FDA has granted the treatment "Breakthrough Therapy" designation, which could see it available to patients within 18 months.</p>`,
  },
  {
    id: 'world-1-peace',
    title: 'Historic Peace Agreement Signed in Middle East',
    category: 'world',
    categoryLabel: 'Diplomacy',
    authorId: 'newsroom',
    publishedAt: '2025-06-09T09:00:00Z',
    tags: ['Diplomacy', 'Politics'],
    imageUrl: '/images/placeholders/world.svg',
    body: `
      <p>Leaders from across the Middle East signed a comprehensive peace agreement at the United Nations headquarters that could fundamentally transform the region's geopolitical landscape.</p>
      <h2>Key Provisions</h2>
      <ul>
        <li>A regional economic cooperation zone.</li>
        <li>Joint infrastructure projects including water and energy sharing.</li>
        <li>Cultural exchange and educational initiatives.</li>
        <li>Security cooperation mechanisms.</li>
      </ul>
      <h2>Economic Impact</h2>
      <p>Analysts predict the agreement could unlock $1 trillion in economic potential for the region.</p>`,
  },

  // ───────────────────────── ESPORTS ─────────────────────────
  {
    id: 'onic-id-champion',
    title: 'ONIC Wins MPL ID Season 15 After Epic 4–3 Showdown',
    category: 'esports',
    categoryLabel: 'MLBB',
    authorId: 'leo-chen',
    publishedAt: '2025-06-15T22:58:00Z',
    isFeatured: true,
    isTrending: true,
    tags: ['Esports', 'MLBB', 'MPL'],
    imageUrl: '/images/onic-id-cham1.png',
    summary:
      'ONIC defeats RRQ in a dramatic Best of 7 final to claim the MPL ID S15 crown and head to MSC 2025.',
    body: `
      <h2>ONIC Crowned MPL ID Season 15 Champions After Epic 4–3 Victory Over RRQ</h2>
      <p>In one of the most intense grand finals in MPL history, <strong>ONIC Esports</strong> defeated <strong>RRQ Hoshi</strong> with a narrow <strong>4–3</strong> scoreline to claim the championship title for MPL Indonesia Season 15.</p>
      <h2>A Grand Final for the Ages</h2>
      <p>The Best of 7 series was a rollercoaster of momentum swings. The series reached game 7, where ONIC executed a flawless strategy to lift the trophy once again, powered by star players Kairi and Butsss.</p>`,
    secondaryImageUrl: '/images/onic-id-cham2.png',
    secondaryBody: `
      <h2>MSC 2025 Bound</h2>
      <p>With this victory, ONIC Esports heads into MSC 2025 in Riyadh with momentum. Alongside runner-up RRQ Hoshi, they will represent Indonesia at the prestigious global tournament as part of the Esports World Cup.</p>`,
  },
  {
    id: 'home-article-6-rrq',
    title: 'RRQ and ONIC Esports Secure Spots at MSC 2025 in Riyadh',
    category: 'esports',
    categoryLabel: 'MLBB',
    authorId: 'elvis',
    publishedAt: '2025-06-14T09:00:00Z',
    tags: ['Esports', 'MLBB', 'MSC'],
    imageUrl: '/images/rrq_aualified_msc_25.png',
    body: `
      <p>Indonesia's finest Mobile Legends teams — <strong>RRQ Hoshi</strong> and <strong>ONIC Esports</strong> — have officially qualified for the prestigious <strong>MSC 2025</strong> in Riyadh, Saudi Arabia.</p>
      <h2>Indonesia Sends Its Best</h2>
      <p>Both teams earned direct slots in the MSC 2025 Group Stage, bypassing the wildcard rounds entirely.</p>
      <h2>MSC 2025: Bigger Than Ever</h2>
      <p>This year's Mid-Season Cup is part of the Esports World Cup and features a record-breaking prize pool of $3 million.</p>`,
    secondaryImageUrl: '/images/rrq_beat_geek.png',
    secondaryBody: `
      <h2>What to Expect</h2>
      <p>Fans can expect world-class gameplay and the return of iconic rivalries as RRQ and ONIC gear up for a legendary run.</p>`,
  },
  {
    id: 'esports-hero-2-liquid',
    title: 'Team Liquid PH Crowned MPL PH Season 15 Champions After Epic 7-Game Series',
    category: 'esports',
    categoryLabel: 'MLBB',
    authorId: 'leo-chen',
    publishedAt: '2025-06-01T12:00:00Z',
    tags: ['Esports', 'MLBB', 'MPL'],
    imageUrl: '/images/mplphs15_cham.png',
    body: `
      <p><strong>Manila, Philippines</strong> — After a thrilling showdown, <strong>Team Liquid PH</strong> has emerged as the champion of MPL Philippines Season 15, defeating ONIC Philippines in a best-of-seven grand final 4–3.</p>
      <h2>A Season to Remember</h2>
      <p>Team Liquid PH finished the regular season with a dominant 12–2 record before staging a powerful lower-bracket comeback to reach the grand final.</p>`,
    secondaryImageUrl: '/images/sanji_mvp.png',
    secondaryBody: `
      <h2>The Road to MSC 2025</h2>
      <p>With this victory, Team Liquid PH and runner-up ONIC PH will represent the Philippines in the Mid-Season Cup 2025.</p>`,
  },
  {
    id: 'esports-ronaldo-ambassador',
    title: 'Cristiano Ronaldo named Esports World Cup Global Ambassador',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'leo-chen',
    publishedAt: '2025-06-09T10:00:00Z',
    tags: ['Esports', 'Esports World Cup'],
    imageUrl:
      '/images/placeholders/esports.svg',
    body: `
      <p>Cristiano Ronaldo will spearhead the global campaign for the Esports World Cup (EWC), promoting its theme, <em>Rise Above</em>.</p>
      <p>"The passion, dedication, skill, and intensity I witness in esports athletes are just as real as what I've experienced on the football pitch," Ronaldo shared.</p>
      <h2>Bridging Generations</h2>
      <p>Ronaldo joins a growing trend of traditional sports athletes engaging with the esports industry, alongside figures like Lionel Messi.</p>`,
  },
  {
    id: 'home-article-4-msc',
    title: 'Mobile Legends MSC 2025 Set for Esports World Cup',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'elvis',
    publishedAt: '2025-05-30T10:00:00Z',
    tags: ['Esports', 'MLBB', 'MSC'],
    imageUrl: '/images/placeholders/esports.svg',
    body: `
      <p>The Mobile Legends: Bang Bang Mid-Season Cup (MSC) 2025 is set to electrify the Esports World Cup in Riyadh this July, with a prize pool of $3 million and 16 elite teams.</p>
      <h2>Format and Key Dates</h2>
      <p>The tournament kicks off with the Wildcard Stage (July 10–13), followed by the Group Stage (July 23–27) and the Knockout Stage (July 30 – August 2).</p>`,
  },

  // ───────────────────────── EVERGREEN FEATURES ─────────────────────────
  {
    id: 'feature-womens-football',
    title: 'The Rise of Women’s Football: Why the Women’s Game Is Booming',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'jane-doe',
    publishedAt: '2026-06-06T09:00:00Z',
    isTrending: true,
    tags: ['Football', 'Women’s Football', 'Analysis'],
    imageUrl: '/images/placeholders/football.svg',
    summary:
      'Record crowds, soaring TV deals and packed stadiums — women’s football has moved from the margins to the mainstream. Here’s what’s driving the surge.',
    body: `
      <p>Women’s football is enjoying the fastest growth of any team sport in the world. What was once a niche pursuit now fills major stadiums, commands prime-time broadcast slots and attracts serious commercial investment. Several forces are powering that rise.</p>
      <h2>Record Attendances</h2>
      <p>Domestic and international fixtures have repeatedly broken attendance records in recent seasons, with showpiece matches drawing crowds that rival the men’s game. Clubs increasingly stage women’s fixtures in their main stadiums rather than smaller training grounds, signalling genuine confidence in demand.</p>
      <h2>Investment and Broadcasting</h2>
      <p>Broadcasters and sponsors have followed the audience. Standalone media-rights deals for women’s competitions, dedicated streaming coverage and brand partnerships have created sustainable revenue streams that did not exist a decade ago.</p>
      <h2>Grassroots and Visibility</h2>
      <p>Greater visibility creates a virtuous cycle: more young players take up the game, federations invest in academies, and the talent pool deepens. Stars now have the platform and role-model status long enjoyed by their male counterparts.</p>
      <h2>What Comes Next</h2>
      <p>The challenge now is consolidation — equal facilities, professional contracts across more leagues, and continued growth in markets where the women’s game is still emerging. The trajectory, though, is unmistakable: women’s football is no longer the future of the sport, it is firmly part of its present.</p>`,
  },
  {
    id: 'guide-tennis-grand-slams',
    title: 'The Four Tennis Grand Slams Explained: A Beginner’s Guide',
    category: 'sports',
    categoryLabel: 'Tennis',
    authorId: 'sarah-jenkins',
    publishedAt: '2026-06-05T09:00:00Z',
    tags: ['Tennis', 'Grand Slam', 'Guide'],
    imageUrl: '/images/placeholders/sports.svg',
    summary:
      'Australian Open, Roland-Garros, Wimbledon and the US Open — what makes each of tennis’s four majors unique, and why they matter most.',
    body: `
      <p>The four Grand Slams are the biggest tournaments in tennis — the events every player dreams of winning. Held across three continents and four very different surfaces, they define careers and crown the sport’s legends. Here’s a quick guide.</p>
      <h2>Australian Open (January)</h2>
      <p>The season-opener in Melbourne, played on hard courts in the southern-hemisphere summer. Known for extreme heat and a lively, festival-like atmosphere.</p>
      <h2>Roland-Garros / French Open (May–June)</h2>
      <p>The only major played on clay, in Paris. Slow, high-bouncing courts reward stamina and patience, producing long, physical rallies and rewarding specialists who master the surface.</p>
      <h2>Wimbledon (June–July)</h2>
      <p>The oldest and most prestigious tournament, played on grass in London. Famous for its traditions — all-white dress code, strawberries and cream, and a fast surface that favours powerful serving.</p>
      <h2>US Open (August–September)</h2>
      <p>The loud, electric finale to the Grand Slam season in New York, on hard courts. Night sessions under the lights and raucous crowds make it the most spectacle-driven of the four.</p>
      <h2>Why the Slams Matter Most</h2>
      <p>Grand Slam titles are the primary measure of greatness in tennis. They carry the most ranking points, the largest prize money and the deepest fields — which is why a player’s major count is the number history remembers.</p>`,
  },
  {
    id: 'explainer-esports-world-cup',
    title: 'What Is the Esports World Cup? Format, Games and Prize Money Explained',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'leo-chen',
    publishedAt: '2026-06-04T09:00:00Z',
    isTrending: true,
    tags: ['Esports', 'Esports World Cup', 'Guide'],
    imageUrl: '/images/placeholders/esports.svg',
    summary:
      'The Esports World Cup has become the biggest event on the competitive gaming calendar. Here’s how it works, which games feature and what’s at stake.',
    body: `
      <p>The Esports World Cup (EWC) has quickly established itself as the most ambitious event in competitive gaming — a multi-week, multi-title festival held in Riyadh, Saudi Arabia, with one of the largest prize pools the industry has ever seen.</p>
      <h2>A Multi-Title Festival</h2>
      <p>Unlike most tournaments, which focus on a single game, the EWC spans many titles at once — from MOBAs like Mobile Legends and League of Legends to shooters such as Counter-Strike 2 and battle royales like PUBG and Fortnite. Dozens of the world’s top organisations compete across these disciplines.</p>
      <h2>The Club Championship</h2>
      <p>A defining feature is the Club Championship, where organisations earn points based on results across every title they enter. It rewards depth and all-round excellence, not just a single standout team — and crowns an overall champion club at the end.</p>
      <h2>Prize Money</h2>
      <p>The combined prize pool runs into the tens of millions of dollars across all titles, making it one of the richest events in esports history and a major payday for the teams and players involved.</p>
      <h2>Why It Matters</h2>
      <p>The EWC reflects esports’ continued march into the mainstream: traditional sports stars serve as ambassadors, broadcast production rivals major leagues, and the scale signals long-term investment in competitive gaming as global entertainment.</p>`,
  },
  {
    id: 'explainer-ai-daily-life',
    title: 'How Artificial Intelligence Is Reshaping Everyday Life in 2026',
    category: 'world',
    categoryLabel: 'Technology',
    authorId: 'newsroom',
    publishedAt: '2026-06-03T09:00:00Z',
    isTrending: true,
    tags: ['Technology', 'AI', 'Analysis'],
    imageUrl: '/images/placeholders/world.svg',
    summary:
      'From the apps on your phone to the way businesses operate, artificial intelligence has quietly become part of daily life. Here’s where it’s making the biggest difference.',
    body: `
      <p>Artificial intelligence is no longer a futuristic concept confined to research labs — it is woven into the tools millions of people use every day. In 2026, its impact is most visible in a handful of everyday areas.</p>
      <h2>Everyday Assistants</h2>
      <p>AI-powered assistants now draft emails, summarise documents, translate languages in real time and answer complex questions conversationally. For many, they have become a first stop for information and a genuine productivity tool.</p>
      <h2>Healthcare</h2>
      <p>In medicine, AI helps clinicians analyse scans, flag early warning signs and speed up drug discovery. Used as a support tool alongside professionals, it is improving both the speed and accuracy of diagnosis.</p>
      <h2>Work and Creativity</h2>
      <p>From writing and design to coding and data analysis, AI is changing how people work — automating repetitive tasks and lowering the barrier to creative and technical projects that once required specialist skills.</p>
      <h2>The Open Questions</h2>
      <p>With the benefits come real concerns: data privacy, the reliability of AI-generated information, the impact on jobs, and the need for sensible regulation. How societies answer these questions will shape whether the technology’s promise is fully and fairly realised.</p>`,
  },
];

export const LOCAL_ARTICLES: Article[] = RAW.map(build);
