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
  imageCredit?: string;
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
    imageCredit: raw.imageCredit,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Crowd_wembley_FAT_08.jpg',
    imageAlt: 'Football fans fill a stadium',
    imageCredit: 'Photo via Wikimedia Commons (public domain)',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/City_of_Manchester_Stadium_Crowd_Against_Hull.jpg/1280px-City_of_Manchester_Stadium_Crowd_Against_Hull.jpg',
    imageAlt: 'A packed football stadium',
    imageCredit: 'Photo: AGilhooley / CC BY-SA 3.0 via Wikimedia Commons',
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
    isBreaking: true,
    tags: ['World Cup', 'FIFA', 'USA', 'Canada', 'Mexico'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_01.jpg/1280px-FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_01.jpg',
    imageAlt: 'The FIFA World Cup trophy',
    imageCredit: 'Photo: Ank Kumar / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The 2026 FIFA World Cup is the biggest in history — 48 teams, three host nations and 104 matches across North America.',
    body: `
      <p>The 2026 FIFA World Cup is set to be the biggest and most ambitious tournament in the competition's history. For the first time, it will be co-hosted by three nations — the United States, Canada and Mexico — and expanded to <strong>48 teams</strong> playing <strong>104 matches</strong> across <strong>16 host cities</strong>. Here is everything you need to know before a ball is kicked.</p>
      <h2>A Tournament of Firsts</h2>
      <p>2026 breaks new ground in several ways. It is the first World Cup hosted by three countries, the first with 48 teams (up from 32), and the first to feature a brand-new knockout round — the round of 32. Mexico's Estadio Azteca also becomes the first stadium ever to host matches at three different World Cups, having previously staged the 1970 and 1986 finals.</p>
      <h2>How the New 48-Team Format Works</h2>
      <p>The 48 qualified nations are drawn into <strong>12 groups of four</strong>. Each team plays the other three in its group once. From there:</p>
      <ul>
        <li>The <strong>top two from each group</strong> advance automatically — that is 24 teams.</li>
        <li>The <strong>eight best third-placed teams</strong> across all 12 groups also progress.</li>
        <li>That fills a 32-team knockout bracket: round of 32, round of 16, quarter-finals, semi-finals and the final.</li>
      </ul>
      <p>The expansion means more nations than ever get a shot at the global stage, and a strong third-place finish can still be enough to survive — raising the stakes in every final group match.</p>
      <h2>The Three Hosts and 16 Cities</h2>
      <p>Matches are spread across North America: <strong>11 cities in the USA</strong> (including New York/New Jersey, Los Angeles, Dallas, Atlanta, Miami, Seattle, Philadelphia, Houston, Kansas City, Boston and the San Francisco Bay Area), <strong>three in Mexico</strong> (Mexico City, Guadalajara, Monterrey) and <strong>two in Canada</strong> (Toronto and Vancouver).</p>
      <h2>Key Dates</h2>
      <p>The tournament runs from <strong>11 June to 19 July 2026</strong>. The opening match is at the Estadio Azteca in Mexico City, and the final will be played at MetLife Stadium in New Jersey. The group stage occupies the first fortnight, with the knockout rounds filling the back half.</p>
      <h2>The Favourites</h2>
      <p>Reigning champions Argentina, alongside perennial powers France, Brazil, Spain, England and Germany, head the betting. But the expanded field and gruelling North American summer — long travel and high heat — could level the playing field and open the door for dark horses such as Morocco, Portugal and a home-advantaged USA.</p>
      <h2>What Makes 2026 Different</h2>
      <p>Beyond the format, the logistics are unprecedented. With venues stretching from Vancouver to Miami, squads face long flights and a mix of climates, including several climate-controlled indoor stadiums. Squad depth and clever rotation may matter more than ever before.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many teams are in the 2026 World Cup?</h3>
      <p>48 — up from 32 at previous tournaments.</p>
      <h3>How many matches will be played?</h3>
      <p>104 in total, compared with 64 in 2022.</p>
      <h3>Where is the 2026 World Cup final?</h3>
      <p>At MetLife Stadium in New Jersey, USA, on 19 July 2026.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>First 48-team, three-nation World Cup — bigger than any before it.</li>
        <li>12 groups of four feed a new 32-team knockout round.</li>
        <li>Runs 11 June–19 July 2026 across 16 cities in the USA, Canada and Mexico.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/2015_FIFA_Women%27s_World_Cup_Final_at_BC_Place_2015-07-05_%2819495660835%29.jpg/1280px-2015_FIFA_Women%27s_World_Cup_Final_at_BC_Place_2015-07-05_%2819495660835%29.jpg',
    imageAlt: 'A packed World Cup match in a full stadium',
    imageCredit: 'Photo: apasciuto / CC BY 2.0 via Wikimedia Commons',
    summary:
      'The expanded 48-team format introduces a round of 32 for the first time. Here is how qualification from the groups works.',
    body: `
      <p>The expanded 2026 World Cup introduces a knockout round that has never existed before — the round of 32 — fundamentally changing how teams approach the group stage. Here is exactly how qualification from the groups works.</p>
      <h2>Twelve Groups of Four</h2>
      <p>The 48 teams are split into 12 groups of four. Each side plays the other three in its group once, meaning every team is guaranteed at least three matches before any potential exit.</p>
      <h2>Who Advances</h2>
      <ul>
        <li>The <strong>top two</strong> in each group qualify automatically — 24 teams.</li>
        <li>The <strong>eight best third-placed teams</strong> across all 12 groups also go through.</li>
        <li>Together that produces a 32-team knockout bracket.</li>
      </ul>
      <h2>How the Best Third-Placed Teams Are Ranked</h2>
      <p>When comparing third-placed teams from different groups, the ranking is decided by points first, then goal difference, then goals scored, and finally fair-play and drawing-of-lots criteria if still level. This makes goal difference and discipline genuinely important from the very first match.</p>
      <h2>Why the Round of 32 Matters</h2>
      <p>In the old 32-team format, eight groups sent 16 teams straight to the round of 16. The new system adds an extra knockout round, lengthening the tournament and giving more nations a meaningful path deep into the competition.</p>
      <h2>Strategic Implications</h2>
      <p>Because a strong third-place finish can be enough to advance, coaches must balance squad rotation with the need to bank points and goals. There are fewer true "dead rubbers", and final-round group matches carry heightened drama as teams scramble for one of the eight wildcard places.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many teams qualify from each group?</h3>
      <p>The top two automatically, with eight more of the best third-placed teams advancing overall.</p>
      <h3>What is the round of 32?</h3>
      <p>A brand-new opening knockout round created by the 48-team format, played before the round of 16.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>12 groups of four; top two plus eight best thirds reach the round of 32.</li>
        <li>Goal difference and goals scored can decide the wildcard places.</li>
        <li>The format means more meaningful matches and fewer dead rubbers.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Argentina_national_football_team_-_1_-_2022.jpg/1280px-Argentina_national_football_team_-_1_-_2022.jpg',
    imageAlt: 'The Argentina national football team, reigning world champions',
    imageCredit: 'Photo: Argentina.gob.ar / CC BY 4.0 via Wikimedia Commons',
    summary:
      'Defending champions Argentina, France and Brazil headline the favourites — but several dark horses could spring a surprise.',
    body: `
      <p>As the 2026 World Cup gets under way, the usual heavyweights once again lead the betting — but the expanded format and gruelling North American summer could level the playing field. Here is a look at the favourites, the dark horses, and the factors that could decide it all.</p>
      <h2>The Favourites</h2>
      <p><strong>Argentina</strong> arrive as defending champions, blending experience with emerging talent. <strong>France</strong> boast extraordinary squad depth and a settled core. <strong>Brazil</strong> never lack attacking riches and remain perennial contenders. <strong>Spain</strong> and <strong>England</strong> bring deep, technically gifted squads, while <strong>Germany</strong> are always dangerous at a major tournament.</p>
      <h2>The Dark Horses</h2>
      <p><strong>Morocco</strong>, semi-finalists in 2022, proved they can beat anyone on their day. The <strong>USA</strong>, buoyed by home advantage and an athletic young side, could go further than expected. <strong>Portugal</strong> remain determined to deliver on the international stage, and the <strong>Netherlands</strong> are always capable of a deep run.</p>
      <h2>The X-Factor: Conditions</h2>
      <p>Summer heat, humidity and long travel distances between host cities will test squad depth like never before. Several matches in air-conditioned indoor stadiums add another variable. The teams that manage rotation and recovery best may hold a decisive edge over a long tournament.</p>
      <h2>Key Players to Watch</h2>
      <p>From France's Kylian Mbappé to the next generation of attacking stars across Brazil, England and Spain, individual brilliance often decides World Cups. Expect the tournament to launch new global icons just as previous editions have.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Who are the favourites for the 2026 World Cup?</h3>
      <p>Defending champions Argentina, along with France, Brazil, Spain, England and Germany.</p>
      <h3>Could a host nation win?</h3>
      <p>The USA are the most likely host to make a deep run, with home advantage a genuine factor.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Argentina, France and Brazil head a familiar list of favourites.</li>
        <li>Morocco, the USA and Portugal lead the dark horses.</li>
        <li>Heat, travel and rotation could decide the destiny of the trophy.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Estadio_Azteca1706_Intp1.jpg/1280px-Estadio_Azteca1706_Intp1.jpg',
    imageAlt: 'Estadio Azteca in Mexico City, a 2026 World Cup host venue',
    imageCredit: 'Photo: Carlos Valenzuela / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The 2026 World Cup is spread across 16 host cities in three countries — 11 in the USA, three in Mexico and two in Canada. Here is the full list.',
    body: `
      <p>The 2026 FIFA World Cup will be played across <strong>16 host cities</strong> in three countries — the United States, Mexico and Canada — making it the most geographically sprawling World Cup ever staged. From Vancouver in the north-west to Miami in the south-east, here is the complete guide to where the action happens.</p>
      <h2>United States (11 Cities)</h2>
      <ul>
        <li><strong>New York / New Jersey</strong> — MetLife Stadium, which hosts the final on 19 July 2026.</li>
        <li><strong>Los Angeles</strong> — SoFi Stadium, Inglewood, one of the most advanced venues in world sport.</li>
        <li><strong>Dallas</strong> — AT&amp;T Stadium, Arlington, expected to host a large share of knockout games.</li>
        <li><strong>San Francisco Bay Area</strong> — Levi's Stadium, Santa Clara.</li>
        <li><strong>Miami</strong> — Hard Rock Stadium.</li>
        <li><strong>Atlanta</strong> — Mercedes-Benz Stadium, a climate-controlled indoor arena.</li>
        <li><strong>Seattle</strong> — Lumen Field.</li>
        <li><strong>Philadelphia</strong> — Lincoln Financial Field.</li>
        <li><strong>Houston</strong> — NRG Stadium.</li>
        <li><strong>Kansas City</strong> — Arrowhead Stadium, famed for its atmosphere.</li>
        <li><strong>Boston</strong> — Gillette Stadium, Foxborough.</li>
      </ul>
      <h2>Mexico (3 Cities)</h2>
      <ul>
        <li><strong>Mexico City</strong> — Estadio Azteca, which stages the opening match and becomes the first stadium to host games at three different World Cups (1970, 1986, 2026).</li>
        <li><strong>Guadalajara</strong> — Estadio Akron.</li>
        <li><strong>Monterrey</strong> — Estadio BBVA.</li>
      </ul>
      <h2>Canada (2 Cities)</h2>
      <ul>
        <li><strong>Toronto</strong> — BMO Field.</li>
        <li><strong>Vancouver</strong> — BC Place.</li>
      </ul>
      <h2>The Showpiece Venues</h2>
      <p>Two stadiums carry special significance. The <strong>Estadio Azteca</strong> in Mexico City hosts the opening match, extending a World Cup legacy that already includes two finals. The <strong>final</strong> itself will be played at <strong>MetLife Stadium</strong> in the New York/New Jersey area on 19 July 2026.</p>
      <h2>A Logistical Challenge</h2>
      <p>With venues thousands of kilometres apart and climates ranging from the humid south to cooler northern cities — plus several indoor, air-conditioned stadiums — travel and conditions will test teams enormously. Organisers have grouped fixtures regionally where possible to limit travel, but squad depth and recovery will be decisive.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many host cities are there in 2026?</h3>
      <p>16 — eleven in the USA, three in Mexico and two in Canada.</p>
      <h3>Which stadium hosts the 2026 World Cup final?</h3>
      <p>MetLife Stadium in New Jersey, USA.</p>
      <h3>Where is the opening match?</h3>
      <p>The Estadio Azteca in Mexico City.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>16 cities across three nations — the largest World Cup footprint ever.</li>
        <li>Estadio Azteca opens the tournament; MetLife Stadium hosts the final.</li>
        <li>Travel and climate variety will be a major factor for every squad.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Azteca_Stadium_-_panoramio.jpg/1280px-Azteca_Stadium_-_panoramio.jpg',
    imageAlt: 'Estadio Azteca, venue of the 2026 World Cup opening match',
    imageCredit: 'Photo: O. Ramirez D. / CC BY-SA 3.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg/1280px-FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg',
    imageAlt: 'The FIFA World Cup trophy, football’s greatest prize',
    imageCredit: 'Photo: Ank Kumar / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Eight nations have lifted the trophy across 22 tournaments. Here is the full roll of World Cup champions and the records that define them.',
    body: `
      <p>Since the first tournament in Uruguay in 1930, only <strong>eight nations</strong> have lifted the FIFA World Cup. As the 2026 edition begins, here is the complete history of the champions — and the records that define the competition.</p>
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
      <h2>The Early Years</h2>
      <p>Uruguay won the inaugural 1930 tournament on home soil and added a second title in 1950 with the famous "Maracanazo" victory over Brazil. Italy dominated the 1930s with back-to-back wins, before the post-war era ushered in new powers.</p>
      <h2>The Brazil and Europe Eras</h2>
      <p>Brazil's golden generations made them the most successful nation, powered by legends from Pelé to Ronaldo. Germany and Italy built dynasties of their own, while the 21st century saw a remarkable run of four straight European champions — Italy (2006), Spain (2010), Germany (2014) and France (2018).</p>
      <h2>Recent Champions</h2>
      <p>Argentina ended that European streak in 2022, beating France on penalties in a classic final — Lionel Messi's crowning moment. France lifted the trophy in 2018, with Germany (2014) and Spain (2010) the champions before them.</p>
      <h2>Records to Know</h2>
      <ul>
        <li>Brazil are the only nation to appear at every World Cup finals.</li>
        <li>Only eight different countries have ever won the tournament.</li>
        <li>European and South American nations have won every edition to date.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <h3>Who has won the most World Cups?</h3>
      <p>Brazil, with five titles.</p>
      <h3>Who are the current World Cup holders?</h3>
      <p>Argentina, who won in 2022.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Just eight nations have ever won the World Cup; Brazil lead with five.</li>
        <li>Europe and South America have shared every title in history.</li>
        <li>With 48 teams in 2026, the door is open for a ninth name to one day join the list.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg/1280px-Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg',
    imageAlt: 'Basketball players huddle on the court',
    imageCredit: 'Photo: Lorie Shaull / CC BY-SA 4.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2013_US_Open_%28Tennis%29_%289651194814%29.jpg/1280px-2013_US_Open_%28Tennis%29_%289651194814%29.jpg',
    imageAlt: 'A professional tennis match',
    imageCredit: 'Photo: Steven Pisano / CC BY 2.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg/1280px-Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg',
    imageAlt: 'A basketball game in progress',
    imageCredit: 'Photo via Wikimedia Commons (public domain)',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2013_US_Open_%28Tennis%29_%289651194814%29.jpg/1280px-2013_US_Open_%28Tennis%29_%289651194814%29.jpg',
    imageAlt: 'Modern professional tennis',
    imageCredit: 'Photo: Steven Pisano / CC BY 2.0 via Wikimedia Commons',
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
    isFeatured: true,
    tags: ['Climate', 'Politics', 'Economy'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bonn_climate_change_conference_may_2012_01.jpg/1280px-Bonn_climate_change_conference_may_2012_01.jpg',
    imageAlt: 'Delegates at a United Nations climate change conference',
    imageCredit: 'Photo via Wikimedia Commons (CC0)',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/IBM_Q_at_CES_%2839660636671%29.jpg/1280px-IBM_Q_at_CES_%2839660636671%29.jpg',
    imageAlt: 'An IBM Q quantum computer on display',
    imageCredit: 'Photo: Lars Plougmann / CC BY-SA 2.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/New_York_Stock_Exchange_trading_floor_on_Wall_Street%2C_New_York%2C_New_York_LCCN2011634218.tif/lossy-page1-1280px-New_York_Stock_Exchange_trading_floor_on_Wall_Street%2C_New_York%2C_New_York_LCCN2011634218.tif.jpg',
    imageAlt: 'The trading floor of the New York Stock Exchange',
    imageCredit: 'Photo: Library of Congress (public domain)',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/CSIRO_ScienceImage_3488_Patient_undergoing_MRI_scan_in_Westmead_Hospital_Sydney.jpg/1280px-CSIRO_ScienceImage_3488_Patient_undergoing_MRI_scan_in_Westmead_Hospital_Sydney.jpg',
    imageAlt: 'A patient undergoing an MRI brain scan',
    imageCredit: 'Photo: CSIRO / CC BY 3.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/G7_Family_group_photo_of_2016_Ise-Shima_Summit.jpg/1280px-G7_Family_group_photo_of_2016_Ise-Shima_Summit.jpg',
    imageAlt: 'World leaders pose for a group photo at a summit',
    imageCredit: 'Photo: U.S. government (public domain)',
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
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2019_SEA_Games_Esports_Tekken_7_THA_vs_PHI.jpg/1280px-2019_SEA_Games_Esports_Tekken_7_THA_vs_PHI.jpg',
    imageAlt: 'Competitors at an esports tournament',
    imageCredit: 'Photo: Hariboneagle927 / CC BY-SA 3.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg/1280px-2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg',
    imageAlt: 'Players compete at an esports event',
    imageCredit: 'Photo: Hariboneagle927 / CC BY-SA 3.0 via Wikimedia Commons',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Air_Force_Women%27s_Soccer_vs_Siena_%2848629694273%29.jpg/1280px-Air_Force_Women%27s_Soccer_vs_Siena_%2848629694273%29.jpg',
    imageAlt: 'A women’s football match in progress',
    imageCredit: 'Photo: U.S. Air Force (public domain)',
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2013_US_Open_%28Tennis%29_%289651194814%29.jpg/1280px-2013_US_Open_%28Tennis%29_%289651194814%29.jpg',
    imageAlt: 'A Grand Slam tennis match',
    imageCredit: 'Photo: Steven Pisano / CC BY 2.0 via Wikimedia Commons',
    summary:
      'Australian Open, Roland-Garros, Wimbledon and the US Open — what makes each of tennis’s four majors unique, and why they matter most.',
    body: `
      <p>The four Grand Slams are the biggest tournaments in tennis — the events every player dreams of winning. Held across three continents and four very different surfaces, they define careers and crown the sport's legends. Here is the complete guide.</p>
      <h2>Australian Open (January)</h2>
      <p>The season-opener in Melbourne, played on hard courts in the southern-hemisphere summer. Known for extreme heat, a lively atmosphere and a reputation as the "Happy Slam", it sets the tone for the tennis year.</p>
      <h2>Roland-Garros / French Open (May–June)</h2>
      <p>The only major played on clay, in Paris. The slow, high-bouncing red courts reward stamina, patience and sliding footwork, producing long, physical rallies. It is widely considered the most demanding Slam to win.</p>
      <h2>Wimbledon (June–July)</h2>
      <p>The oldest and most prestigious tournament, played on grass in London. Famous for its traditions — the all-white dress code, strawberries and cream, and a fast surface that rewards powerful serving and quick points.</p>
      <h2>US Open (August–September)</h2>
      <p>The loud, electric finale to the Slam season in New York, on hard courts. Night sessions under the lights and raucous crowds make it the most spectacle-driven of the four majors.</p>
      <h2>Why the Slams Matter Most</h2>
      <p>Grand Slam titles are the primary measure of greatness in tennis. They award the most ranking points, the largest prize money and feature the deepest fields — which is why a player's major count is the number history remembers.</p>
      <h2>The Calendar and Career Grand Slam</h2>
      <p>Winning all four in a single year is the <strong>Calendar Grand Slam</strong> — an extraordinarily rare feat. Winning all four at some point in a career is the <strong>Career Grand Slam</strong>, achieved by only a handful of the greatest players. Because the surfaces are so different, mastering all four is the ultimate test of versatility.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What are the four tennis Grand Slams?</h3>
      <p>The Australian Open, French Open (Roland-Garros), Wimbledon and the US Open.</p>
      <h3>Which Grand Slam is on clay?</h3>
      <p>The French Open is the only Slam played on clay.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Four majors, four surfaces, across the tennis calendar.</li>
        <li>Slam titles are the truest measure of a player's greatness.</li>
        <li>Winning all four (career or calendar) is tennis's ultimate achievement.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/League-of-Legends-Wild-Rift_Final_Four_opening_at_eSports_Stage_20210130a.jpg/1280px-League-of-Legends-Wild-Rift_Final_Four_opening_at_eSports_Stage_20210130a.jpg',
    imageAlt: 'An esports tournament on the main stage',
    imageCredit: 'Photo: Solomon203 / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The Esports World Cup has become the biggest event on the competitive gaming calendar. Here’s how it works, which games feature and what’s at stake.',
    body: `
      <p>The Esports World Cup (EWC) has quickly established itself as the most ambitious event in competitive gaming — a multi-week, multi-title festival held in Riyadh, Saudi Arabia, with one of the largest prize pools the industry has ever seen.</p>
      <h2>A Multi-Title Festival</h2>
      <p>Unlike most tournaments, which focus on a single game, the EWC spans many titles at once — from MOBAs like Mobile Legends and League of Legends to shooters such as Counter-Strike 2 and battle royales like PUBG and Fortnite. Dozens of the world's top organisations compete across these disciplines over several weeks.</p>
      <h2>The Club Championship</h2>
      <p>A defining feature is the Club Championship, where organisations earn points based on results across every title they enter. It rewards depth and all-round excellence, not just a single standout team — and crowns an overall champion club at the end of the event.</p>
      <h2>Prize Money</h2>
      <p>The combined prize pool runs into the tens of millions of dollars across all titles, making it one of the richest events in esports history and a major payday for the teams and players involved.</p>
      <h2>Mainstream Crossover</h2>
      <p>The EWC reflects esports' continued march into the mainstream: traditional sports stars serve as ambassadors, broadcast production rivals major sports leagues, and the scale signals long-term investment in competitive gaming as global entertainment.</p>
      <h2>Why It Matters</h2>
      <p>By bringing many games under one banner with a unifying club competition, the EWC has created a season-defining event — a place where the best organisations in the world prove their all-round strength on one giant stage.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Where is the Esports World Cup held?</h3>
      <p>In Riyadh, Saudi Arabia.</p>
      <h3>What makes it different from other tournaments?</h3>
      <p>It spans many games at once and crowns an overall champion club via a cross-title points system.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>A multi-game festival with a huge combined prize pool.</li>
        <li>The Club Championship rewards all-round organisational strength.</li>
        <li>A sign of esports' growing mainstream scale and investment.</li>
      </ul>
    `,
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
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ameca_Generation_1.jpg/1280px-Ameca_Generation_1.jpg',
    imageAlt: 'Ameca, an advanced humanoid AI robot',
    imageCredit: 'Photo: Willy Jackson / CC BY-SA 4.0 via Wikimedia Commons',
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
  {
    id: 'guide-champions-league-format',
    title: 'The Champions League’s New Format Explained: How the League Phase Works',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'tom-frank',
    publishedAt: '2026-06-02T09:00:00Z',
    tags: ['Football', 'Champions League', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Crowd_at_Dora_Stadium.jpg/1280px-Crowd_at_Dora_Stadium.jpg',
    imageAlt: 'A football crowd at a stadium',
    imageCredit: 'Photo: TrickyH / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'UEFA scrapped the old group stage for a single 36-team league table. Here’s how the revamped Champions League format actually works.',
    body: `
      <p>The UEFA Champions League underwent its biggest overhaul in decades, replacing the familiar eight groups of four with a single, expanded league phase. If you are catching up, here is how the new format works.</p>
      <h2>36 Teams, One Table</h2>
      <p>The competition expanded from 32 to <strong>36 teams</strong>, all placed in one combined standings table rather than separate groups. Every result now affects a single shared league, right up to the final matchday.</p>
      <h2>Eight Matches Each</h2>
      <p>Instead of playing the same three opponents home and away, every club plays <strong>eight different opponents</strong> — four at home and four away — drawn from four seeding pots. That means more variety and more marquee match-ups in the opening phase.</p>
      <h2>Who Qualifies</h2>
      <ul>
        <li>The <strong>top eight</strong> in the table advance straight to the round of 16.</li>
        <li>Teams ranked <strong>9th to 24th</strong> enter a two-legged knockout play-off for the remaining eight round-of-16 places.</li>
        <li>Teams ranked <strong>25th to 36th</strong> are eliminated from European competition entirely — with no drop into the Europa League.</li>
      </ul>
      <h2>The Knockout Phase</h2>
      <p>From the round of 16 onwards the competition follows the traditional two-legged knockout path through the quarter-finals and semi-finals to a single-match final at a neutral venue.</p>
      <h2>Why UEFA Changed It</h2>
      <p>The aim was more competitive, higher-stakes matches throughout the league phase — fewer dead rubbers and more jeopardy, with bigger clubs facing each other earlier and every point mattering in one combined table.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many teams are in the new Champions League?</h3>
      <p>36, up from 32, all in a single league phase.</p>
      <h3>How many games does each team play in the league phase?</h3>
      <p>Eight — against eight different opponents.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>One 36-team league replaced the old group stage.</li>
        <li>Top 8 qualify directly; 9–24 enter a play-off; 25–36 are out.</li>
        <li>The format means more big matches and fewer meaningless games.</li>
      </ul>
    `,
  },
  {
    id: 'guide-f1-points-system',
    title: 'Formula 1 Explained: How the Championship and Points System Work',
    category: 'sports',
    categoryLabel: 'Formula 1',
    authorId: 'ben-carter',
    publishedAt: '2026-06-01T09:00:00Z',
    tags: ['Formula 1', 'Motorsport', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/EurobrunER189_RaceHistoryOnTrack_HH2011.jpg/1280px-EurobrunER189_RaceHistoryOnTrack_HH2011.jpg',
    imageAlt: 'A Formula One car on track',
    imageCredit: 'Photo: DoomWarrior / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'Two championships, 10 points-scoring positions and sprint races — a clear beginner’s guide to how Formula 1 is scored.',
    body: `
      <p>Formula 1 can look complex from the outside, but the scoring is straightforward once you know the basics. Here is how a season is decided.</p>
      <h2>Two Championships</h2>
      <p>Every season crowns two champions: the <strong>Drivers' Championship</strong> (the individual with the most points) and the <strong>Constructors' Championship</strong> (the team whose two cars score the most points combined). Prize money and prestige flow from both, and teams prize the constructors' title as a measure of overall strength.</p>
      <h2>How Race Points Work</h2>
      <p>Points are awarded to the top 10 finishers in each Grand Prix:</p>
      <ul>
        <li>1st: 25 · 2nd: 18 · 3rd: 15 · 4th: 12 · 5th: 10</li>
        <li>6th: 8 · 7th: 6 · 8th: 4 · 9th: 2 · 10th: 1</li>
      </ul>
      <h2>Sprint Races</h2>
      <p>At selected events, a shorter <strong>Sprint</strong> race awards extra points to its top finishers, giving drivers another opportunity to score over a weekend and adding strategic variety to the calendar.</p>
      <h2>How the Title Is Decided</h2>
      <p>Points accumulate across every round of the calendar. Whoever has the most at the end of the final Grand Prix wins the championship. Consistency over a long season usually matters as much as outright race wins — finishing in the points every week can beat a mix of wins and retirements.</p>
      <h2>Teams, Cars and Strategy</h2>
      <p>Ten teams field two drivers each. Beyond raw speed, races are shaped by tyre strategy, pit-stop timing, reliability and team orders — which is why F1 is as much a strategic contest as a test of driving.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many points do you get for winning an F1 race?</h3>
      <p>25 points for first place, down to 1 point for tenth.</p>
      <h3>What is the difference between the two championships?</h3>
      <p>The Drivers' title goes to an individual; the Constructors' title goes to the team with the most combined points.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Two titles each year: Drivers' and Constructors'.</li>
        <li>Points go to the top 10, with sprint races offering extra.</li>
        <li>Consistency over a long calendar often decides the championship.</li>
      </ul>
    `,
  },
  {
    id: 'explainer-lol-worlds',
    title: 'League of Legends Worlds: How the World Championship Works',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'emily-white',
    publishedAt: '2026-05-31T09:00:00Z',
    tags: ['Esports', 'League of Legends', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/League_of_Legends_Main_Stage.jpg/1280px-League_of_Legends_Main_Stage.jpg',
    imageAlt: 'A League of Legends tournament stage',
    imageCredit: 'Photo: Hilary Murugu / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The biggest event in esports, explained — how teams qualify for League of Legends Worlds and how the tournament is won.',
    body: `
      <p>The League of Legends World Championship — "Worlds" — is the pinnacle of the sport and one of the most-watched events in all of esports. Here is how it works.</p>
      <h2>Qualifying Through Regional Leagues</h2>
      <p>Teams earn their place by performing in their regional leagues across the year — among them the LCK (Korea), LPL (China), LEC (Europe) and the Americas league. The strongest regions receive more qualification spots, reflecting their depth of competition.</p>
      <h2>The Tournament Stages</h2>
      <p>Worlds typically runs through multiple stages: a play-in for lower-seeded teams, a Swiss-style or group stage to narrow the field, and a single-elimination knockout bracket. Knockout matches are best-of-five — a true test of adaptation, drafting and nerve over a long series.</p>
      <h2>The Summoner's Cup</h2>
      <p>The winners lift the Summoner's Cup in front of a packed arena, often with millions watching online and an elaborate opening ceremony. Lifting it cements a roster among the greats of the game.</p>
      <h2>Global Scale</h2>
      <p>Worlds combines elite competition with massive production — live music, augmented-reality stage shows and global broadcasts in many languages. Peak viewership regularly places it among the biggest esports events on earth.</p>
      <h2>Why It Matters</h2>
      <p>For players and regions, Worlds is the ultimate proving ground. Dynasties are built and legacies defined here, and a single championship run can turn a roster into household names within the gaming world.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is the League of Legends Worlds trophy called?</h3>
      <p>The Summoner's Cup.</p>
      <h3>How do teams qualify for Worlds?</h3>
      <p>By performing in their regional leagues; stronger regions get more spots.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Worlds is League of Legends' annual world championship.</li>
        <li>Teams qualify via regional leagues, then play group and knockout stages.</li>
        <li>Winners lift the Summoner's Cup before a global audience.</li>
      </ul>
    `,
  },

  // ───────────────── EVERGREEN FEATURES WITH REAL IMAGES ─────────────────
  {
    id: 'history-of-football',
    title: 'A Brief History of Football: From Folk Game to Global Spectacle',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'tom-frank',
    publishedAt: '2026-05-29T09:00:00Z',
    isTrending: true,
    tags: ['Football', 'History', 'Feature'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Galatasaray-Fenerbah%C3%A7e_match_%281923%29.jpg',
    imageAlt: 'A historic football match between Galatasaray and Fenerbahçe in 1923',
    summary:
      'From chaotic medieval village games to a sport watched by billions — how football became the world’s game.',
    body: `
      <p>Football is the most popular sport on the planet, played and watched by billions. But the modern game we know today is the result of centuries of evolution from far rougher and more chaotic origins.</p>
      <h2>Ancient and Folk Origins</h2>
      <p>Ball games involving kicking date back to the ancient world, from China's "cuju" to games played in Greece and Rome. In medieval Europe, "folk football" took hold — vast, rule-light contests between villages that could involve hundreds of players and few boundaries beyond the landscape itself.</p>
      <h2>The Laws of the Game</h2>
      <p>The decisive moment came in 1863, when representatives of English clubs met in London to form the Football Association and agree a single set of rules. Standardising the laws — including banning the carrying of the ball — split football (soccer) from rugby and gave the sport a common framework for the first time.</p>
      <h2>Going Global</h2>
      <p>From Britain the game spread rapidly through trade, education and empire, taking root across Europe and South America. FIFA was founded in 1904 to govern the international game, and the first FIFA World Cup was staged in Uruguay in 1930 — giving football its global showpiece.</p>
      <h2>Professionalism and Competition</h2>
      <p>Domestic leagues and cup competitions professionalised the sport through the 20th century. European club competition, launched in the 1950s, eventually grew into the Champions League, while national leagues across the world developed passionate followings of their own.</p>
      <h2>The Modern Era</h2>
      <p>Television, sponsorship and global stars turned football into a multi-billion-dollar industry. Players became worldwide icons, transfer fees soared, and the World Cup grew into one of the most-watched events on Earth. Technology such as VAR and goal-line systems has since reshaped how the game is officiated.</p>
      <h2>Why It Endures</h2>
      <p>For all the money and modernisation, football's appeal remains rooted in the same simplicity that made those village games so popular: a ball, two goals, and the fact that anyone, anywhere, can play.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>When were the rules of football created?</h3>
      <p>In 1863, when the Football Association was formed in England.</p>
      <h3>When was the first World Cup?</h3>
      <p>In 1930, hosted and won by Uruguay.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Football evolved from chaotic medieval folk games into a codified sport in 1863.</li>
        <li>FIFA (1904) and the first World Cup (1930) globalised the game.</li>
        <li>Its enduring appeal lies in its fundamental simplicity.</li>
      </ul>
    `,
  },
  {
    id: 'basketball-101',
    title: 'Basketball 101: The Rules and How the Game Works',
    category: 'sports',
    categoryLabel: 'Basketball',
    authorId: 'mike-johnson',
    publishedAt: '2026-05-28T09:00:00Z',
    tags: ['Basketball', 'Guide', 'NBA'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg/1280px-Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg',
    imageAlt: 'A college basketball game in progress',
    summary:
      'New to basketball? Here’s a clear guide to the rules, scoring and positions that make the game tick.',
    body: `
      <p>Basketball was invented in 1891 by Dr. James Naismith, who nailed a peach basket to a gymnasium wall to keep his students active indoors. Today it is one of the world's most popular sports. Here is how it works.</p>
      <h2>The Objective</h2>
      <p>Two teams of five players each try to score by shooting the ball through the opposing team's hoop, which sits 10 feet (3.05 m) above the floor. The team with the most points when time runs out wins.</p>
      <h2>Scoring</h2>
      <ul>
        <li><strong>2 points</strong> for a basket made inside the three-point arc.</li>
        <li><strong>3 points</strong> for a basket made from beyond the arc.</li>
        <li><strong>1 point</strong> for each successful free throw, awarded after certain fouls.</li>
      </ul>
      <h2>The Positions</h2>
      <p>Teams traditionally field a point guard, shooting guard, small forward, power forward and centre — though the modern game increasingly blurs these roles, prizing versatile players who can shoot, pass and defend anywhere on the court.</p>
      <h2>Game Flow</h2>
      <p>Games are split into timed periods (quarters in the NBA). Teams must advance the ball by dribbling or passing, and attempt a shot within the shot-clock limit, keeping the pace high and discouraging stalling.</p>
      <h2>Key Rules to Know</h2>
      <ul>
        <li><strong>Traveling:</strong> you cannot move with the ball without dribbling.</li>
        <li><strong>Double dribble:</strong> you cannot dribble, stop, then dribble again.</li>
        <li><strong>Fouls:</strong> illegal contact sends opponents to the free-throw line and, in bulk, can foul a player out.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <h3>How many players are on a basketball team?</h3>
      <p>Five per side on the court at any time.</p>
      <h3>How high is a basketball hoop?</h3>
      <p>10 feet (3.05 metres).</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Five-a-side; score by shooting through the hoop.</li>
        <li>Baskets are worth 2 or 3 points; free throws 1.</li>
        <li>Dribbling rules and fouls shape the flow of every game.</li>
      </ul>
    `,
  },
  {
    id: 'how-solar-power-works',
    title: 'Renewable Energy Explained: How Solar Power Works',
    category: 'world',
    categoryLabel: 'Energy',
    authorId: 'newsroom',
    publishedAt: '2026-05-27T09:00:00Z',
    isTrending: true,
    tags: ['Energy', 'Renewables', 'Technology', 'Climate'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Wall-mounted_solar_panels_on_building.jpg/1280px-Wall-mounted_solar_panels_on_building.jpg',
    imageAlt: 'Solar panels mounted on the side of a building',
    summary:
      'Solar is the fastest-growing source of new electricity in the world. Here’s how a solar panel actually turns sunlight into power.',
    body: `
      <p>Solar power has become one of the cheapest and fastest-growing sources of electricity on Earth. But how does a panel on a roof actually turn sunshine into usable energy?</p>
      <h2>The Photovoltaic Effect</h2>
      <p>Solar panels are made of photovoltaic (PV) cells, usually silicon. When sunlight hits a cell, it knocks electrons loose, and the cell’s design forces those electrons to flow in one direction — creating a direct electric current (DC).</p>
      <h2>From Panel to Plug</h2>
      <p>The DC electricity then passes through an <strong>inverter</strong>, which converts it into the alternating current (AC) used by homes and the grid. Surplus power can be stored in batteries or fed back into the grid for credit.</p>
      <h2>Why It’s Booming</h2>
      <p>The cost of solar panels has fallen dramatically over the past decade, making solar competitive with — and often cheaper than — fossil fuels. It produces no emissions while operating and can scale from a single rooftop to vast utility farms.</p>
      <h2>The Challenges</h2>
      <p>Solar only generates power when the sun shines, so storage and grid management are key to making it reliable around the clock. Advances in battery technology are steadily closing that gap.</p>`,
  },
  {
    id: 'first-marathon-guide',
    title: 'Training for Your First Marathon: A Beginner’s Guide',
    category: 'sports',
    categoryLabel: 'Athletics',
    authorId: 'evelyn-reed',
    publishedAt: '2026-05-26T09:00:00Z',
    tags: ['Athletics', 'Running', 'Health', 'Guide'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Paris_marathon_2008_16.jpg/1280px-Paris_marathon_2008_16.jpg',
    imageAlt: 'Runners competing in a city marathon',
    summary:
      'Running 42.195 km is a huge but achievable goal. Here’s how beginners can train safely for their first marathon.',
    body: `
      <p>A marathon — 42.195 km (26.2 miles) — is one of the most rewarding challenges in endurance sport. With months of smart preparation, it’s within reach of most healthy adults. Here’s how to approach your first.</p>
      <h2>Build a Base First</h2>
      <p>Before starting a marathon plan, you should be comfortably running several times a week. Most beginners benefit from a few months of consistent, easy-paced running to build fitness and reduce injury risk.</p>
      <h2>Follow a Plan</h2>
      <p>Typical first-marathon plans run 16–20 weeks. They gradually increase weekly mileage and feature one weekly <strong>long run</strong> that builds toward roughly 30–35 km a few weeks before race day.</p>
      <h2>Don’t Skip Recovery</h2>
      <p>Rest days, easy runs and sleep are when your body actually adapts. Increasing mileage too quickly is the most common cause of injury — the widely cited guideline is to build gradually rather than in big jumps.</p>
      <h2>Fuel and Race Day</h2>
      <p>Practise eating and drinking during long runs so race day holds no surprises. Then trust your training: start slower than feels natural, settle into a steady rhythm, and save something for the final miles.</p>`,
  },

  // ───────────────────────── BREAKING TECH NEWS ─────────────────────────
  {
    id: 'us-orders-anthropic-disable-fable-mythos',
    title: 'US Orders Anthropic to Disable AI Models Fable 5 and Mythos 5 Worldwide',
    category: 'world',
    categoryLabel: 'Technology',
    authorId: 'newsroom',
    publishedAt: '2026-06-13T12:00:00Z',
    isBreaking: true,
    isTrending: true,
    tags: ['Technology', 'AI', 'Anthropic', 'Regulation'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/BalticServers_data_center.jpg/1280px-BalticServers_data_center.jpg',
    imageAlt: 'Rows of servers in a data center',
    imageCredit: 'Photo: BalticServers.com / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'The US government has directed Anthropic to suspend access to its newest AI models for all foreign nationals over security concerns — prompting the company to switch them off for every user.',
    body: `
      <p>Anthropic has disabled access to its newest artificial intelligence models, <strong>Fable 5</strong> and <strong>Mythos 5</strong>, after the US government issued a directive ordering the company to block all foreign nationals from using them on national-security grounds.</p>
      <h2>What Happened</h2>
      <p>According to multiple reports, Anthropic received the order on Friday afternoon, instructing it to suspend access to the two models "by any foreign national." With no reliable way to screen foreign nationals out of its global user base in real time, the company chose to switch the models off for <em>everyone</em> rather than attempt a partial block.</p>
      <h2>The Government's Concern</h2>
      <p>Officials are understood to have believed they had identified a method of bypassing — or "jailbreaking" — Fable 5. The action has been framed as an export-control-style measure, restricting access to advanced AI capabilities on security grounds.</p>
      <h2>Anthropic's Response</h2>
      <p>In a public statement, Anthropic said it had reviewed a demonstration of the specific technique and concluded it identified only a small number of previously known, minor vulnerabilities. The company said it disagreed that a narrow potential jailbreak should be cause for recalling a commercial model already deployed to hundreds of millions of people, but that it had complied with the directive while seeking clarity.</p>
      <h2>Why It Matters</h2>
      <p>The move is an unusual instance of a government compelling an AI developer to pull flagship products from the market worldwide. It raises pressing questions about how national-security rules will apply to widely used AI services, the balance between security and access, and what recourse companies and users have when a model is switched off overnight.</p>
      <p><em>This is a developing story.</em></p>`,
  },
  {
    id: 'fable5-ban-explainer',
    title: 'What the Fable 5 and Mythos 5 Ban Means for AI Users',
    category: 'world',
    categoryLabel: 'Technology',
    authorId: 'newsroom',
    publishedAt: '2026-06-14T08:00:00Z',
    isTrending: true,
    tags: ['Technology', 'AI', 'Anthropic', 'Analysis'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ameca_Generation_1.jpg/1280px-Ameca_Generation_1.jpg',
    imageAlt: 'A humanoid AI robot',
    imageCredit: 'Photo: Willy Jackson / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'After the US directive forced Anthropic to switch off Fable 5 and Mythos 5, here’s what it means for everyday users — and what your options are now.',
    body: `
      <p>The US government’s order requiring Anthropic to block foreign-national access to its newest AI models — which led the company to disable Fable 5 and Mythos 5 for everyone — has left millions of users suddenly without tools they relied on. Here’s a plain-English look at the impact.</p>
      <h2>Who Is Affected</h2>
      <p>Because Anthropic could not reliably verify users’ nationality in real time, it switched the two models off for all customers rather than attempt a partial block. In practice that means anyone who built workflows, apps or daily habits around Fable 5 or Mythos 5 lost access at once.</p>
      <h2>What Still Works</h2>
      <p>Only the two newest models were affected. Earlier models and other providers’ tools remain available, so most users can fall back to a previous generation or an alternative service while the situation is resolved.</p>
      <h2>The Bigger Picture</h2>
      <p>The episode is a preview of how national-security rules may increasingly intersect with consumer AI. For users and businesses, it’s a reminder not to depend on a single model or vendor — keeping a fallback option reduces the disruption when access changes overnight.</p>
      <h2>What Happens Next</h2>
      <p>Anthropic has said it disagrees that a narrow potential vulnerability justified pulling a widely used product, and is seeking clarity. Whether the models return — and on what terms — will be closely watched across the industry.</p>`,
  },
  {
    id: 'var-explained',
    title: 'VAR Explained: How the Video Assistant Referee Works in Football',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'tom-frank',
    publishedAt: '2026-06-12T09:00:00Z',
    tags: ['Football', 'VAR', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/City_of_Manchester_Stadium_Crowd_Against_Hull.jpg/1280px-City_of_Manchester_Stadium_Crowd_Against_Hull.jpg',
    imageAlt: 'A packed football stadium',
    imageCredit: 'Photo: AGilhooley / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'Few innovations have changed football like VAR. Here’s what it reviews, how a decision is made, and why it still sparks debate.',
    body: `
      <p>The Video Assistant Referee (VAR) is now a fixture of top-level football, including at the World Cup. It uses video replays to help the on-field referee correct clear and obvious errors — but only in four specific situations.</p>
      <h2>What VAR Can Review</h2>
      <ul>
        <li><strong>Goals</strong> — and any infringement in the build-up (offside, handball, fouls).</li>
        <li><strong>Penalty decisions</strong> — whether a penalty should or should not have been given.</li>
        <li><strong>Direct red cards</strong> — not second yellow cards.</li>
        <li><strong>Mistaken identity</strong> — when the referee books the wrong player.</li>
      </ul>
      <h2>How a Decision Is Made</h2>
      <p>A VAR team reviews footage and recommends a check only for "clear and obvious" errors. The referee can then watch the replay pitch-side at the Referee Review Area before making the final call — the on-field official always has the last word.</p>
      <h2>The "Clear and Obvious" Threshold</h2>
      <p>VAR is not meant to re-referee every decision. It intervenes only when the original call is clearly wrong, which is why many subjective calls are left to the referee's on-field judgement even after a check.</p>
      <h2>Why It Is Still Debated</h2>
      <p>Supporters say VAR gets more big calls right; critics point to long delays, the breaking of momentum, tight offside lines decided by millimetres, and the loss of spontaneous goal celebrations while fans wait for a check.</p>
      <h2>VAR at the World Cup</h2>
      <p>Since its introduction at the 2018 World Cup, VAR has become standard at the tournament, and technologies such as semi-automated offside detection have been added to speed up and sharpen decisions.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What four things can VAR review?</h3>
      <p>Goals, penalties, direct red cards and mistaken identity.</p>
      <h3>Does VAR make the final decision?</h3>
      <p>No — it advises, but the on-field referee always makes the final call.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>VAR reviews only four match-changing situations.</li>
        <li>It intervenes for "clear and obvious" errors; the referee decides.</li>
        <li>It improves accuracy but remains a source of debate.</li>
      </ul>
    `,
  },
  {
    id: 'tennis-scoring-explained',
    title: 'Tennis Scoring Explained: Love, Deuce and Tie-Breaks',
    category: 'sports',
    categoryLabel: 'Tennis',
    authorId: 'sarah-jenkins',
    publishedAt: '2026-06-11T09:00:00Z',
    tags: ['Tennis', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2013_US_Open_%28Tennis%29_%289651194814%29.jpg/1280px-2013_US_Open_%28Tennis%29_%289651194814%29.jpg',
    imageAlt: 'A professional tennis match',
    imageCredit: 'Photo: Steven Pisano / CC BY 2.0 via Wikimedia Commons',
    summary:
      'Tennis has one of the quirkiest scoring systems in sport. Here’s how points, games, sets and tie-breaks actually work.',
    body: `
      <p>Tennis scoring can baffle newcomers — "love," "deuce" and 15-30-40 aren’t exactly intuitive. Here’s the system broken down.</p>
      <h2>Points Within a Game</h2>
      <p>Points run <strong>0 (love) → 15 → 30 → 40</strong>. Win a point at 40 and you take the game — unless it’s 40-40, called <strong>deuce</strong>. From deuce a player must win two points in a row: the first is <strong>advantage</strong>, the second wins the game.</p>
      <h2>Games and Sets</h2>
      <p>Win six games (by at least two) to take a <strong>set</strong>. Matches are best-of-three or best-of-five sets. If a set reaches <strong>6-6</strong>, it’s usually settled by a <strong>tie-break</strong>, first to seven points (by two).</p>
      <h2>Why "Love"?</h2>
      <p>The origin of "love" for zero is debated — often linked to the French <em>l’œuf</em> ("the egg," for the shape of a zero). Whatever its roots, it’s now part of tennis’s charm.</p>`,
  },
  {
    id: 'dota-the-international',
    title: 'The International: How Dota 2’s Biggest Tournament Works',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'emily-white',
    publishedAt: '2026-06-10T09:00:00Z',
    tags: ['Esports', 'Dota 2', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg/1280px-2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg',
    imageAlt: 'Players competing at an esports tournament',
    imageCredit: 'Photo: Hariboneagle927 / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'The International is Dota 2’s world championship — famous for record prize pools funded by the community itself. Here’s how it works.',
    body: `
      <p>The International (TI) is the annual world championship of Valve's Dota 2, and for years it boasted the largest prize pools in all of esports. Here are the essentials.</p>
      <h2>Community-Funded Prize Pools</h2>
      <p>What made TI famous is that fans help fund the prize pool: a portion of in-game Battle Pass and event sales is added to the pot, which historically pushed it past <strong>$30–40 million</strong> in peak years — far beyond a typical esports event and a record for the industry.</p>
      <h2>The Format</h2>
      <p>The world's top teams qualify through regional circuits and direct invites, then compete in a group stage followed by a double-elimination main-event bracket. Matches are best-of-three, with a best-of-five grand final that can stretch deep into a single dramatic night.</p>
      <h2>The Aegis of Champions</h2>
      <p>Winners lift the <strong>Aegis of Champions</strong>, one of the most prestigious trophies in gaming. Victory cements a roster's place in Dota history — and often delivers a life-changing payday split among the players.</p>
      <h2>A Global Spectacle</h2>
      <p>Held in major arenas around the world, TI combines elite play with elaborate production and a passionate live crowd. Its mix of enormous stakes and unpredictable, high-skill gameplay has produced some of esports' most memorable moments.</p>
      <h2>Why It Matters</h2>
      <p>For the Dota 2 community, TI is the event that defines the competitive year. The double-elimination format rewards resilience, and the community-funded prize pool gives fans a direct stake in the spectacle.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is the Dota 2 world championship called?</h3>
      <p>The International, or "TI".</p>
      <h3>Why are the prize pools so large?</h3>
      <p>Because fans crowdfund them through in-game purchases that add to the pot.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>TI is Dota 2's annual world championship, run by Valve.</li>
        <li>Fan-funded prize pools made it the richest in esports history.</li>
        <li>Champions lift the Aegis of Champions after a double-elimination bracket.</li>
      </ul>
    `,
  },
  {
    id: 'how-cryptocurrency-works',
    title: 'How Cryptocurrency Works: A Beginner’s Guide to Bitcoin and Blockchain',
    category: 'world',
    categoryLabel: 'Technology',
    authorId: 'newsroom',
    publishedAt: '2026-06-09T09:00:00Z',
    tags: ['Technology', 'Cryptocurrency', 'Finance', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/New_York_Stock_Exchange_trading_floor_on_Wall_Street%2C_New_York%2C_New_York_LCCN2011634218.tif/lossy-page1-1280px-New_York_Stock_Exchange_trading_floor_on_Wall_Street%2C_New_York%2C_New_York_LCCN2011634218.tif.jpg',
    imageAlt: 'A financial trading floor',
    imageCredit: 'Photo: Library of Congress (public domain)',
    summary:
      'Bitcoin, blockchain, mining, wallets — the jargon can be overwhelming. Here’s a plain-English explainer of how cryptocurrency actually works.',
    body: `
      <p>Cryptocurrency is digital money that runs without a central bank. Since Bitcoin launched in 2009, the idea has grown into a global market worth trillions — but the core concepts are simpler than the jargon suggests. Here is a plain-English guide.</p>
      <h2>The Blockchain</h2>
      <p>A blockchain is a shared digital ledger that records every transaction across thousands of computers at once. Because no single party controls it and entries are extremely difficult to alter once confirmed, the network can agree on who owns what without needing a bank or middleman.</p>
      <h2>Mining and Consensus</h2>
      <p>Transactions are grouped into "blocks" and verified by the network. In systems like Bitcoin, "miners" compete to validate blocks and are rewarded with new coins — a process called <strong>proof-of-work</strong>, which is secure but energy-intensive. Many newer networks use <strong>proof-of-stake</strong>, which is far more energy-efficient and relies on participants locking up coins to help secure the network.</p>
      <h2>Wallets and Keys</h2>
      <p>You hold crypto in a digital wallet secured by a <strong>private key</strong> — essentially a long, secret password. Whoever holds the key controls the funds, which is why safeguarding it is critical. Lose the key and the funds are usually gone for good; share it and they can be stolen.</p>
      <h2>How People Use It</h2>
      <p>Beyond buying and selling as an investment, cryptocurrencies are used for transfers, payments, and as the foundation for "decentralised finance" applications and digital collectables. Some see long-term potential; others remain sceptical.</p>
      <h2>The Risks</h2>
      <p>Crypto can be highly volatile, with prices swinging dramatically. It is largely unregulated in many places, transactions are usually irreversible, and the space attracts scams. Anyone considering it should understand they could lose money and never invest more than they can afford to lose.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What is the difference between Bitcoin and blockchain?</h3>
      <p>Blockchain is the underlying technology — a shared ledger. Bitcoin is one cryptocurrency that runs on its own blockchain.</p>
      <h3>Is cryptocurrency safe?</h3>
      <p>The technology is robust, but prices are volatile, scams exist and lost keys are unrecoverable — so caution is essential.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Blockchain is a decentralised ledger; crypto is money that runs on it.</li>
        <li>Networks secure transactions via proof-of-work or proof-of-stake.</li>
        <li>Volatility, scams and irreversible transactions make caution essential.</li>
      </ul>
    `,
  },
  {
    id: 'offside-rule-explained',
    title: 'The Offside Rule Explained: Football’s Most Debated Law',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'tom-frank',
    publishedAt: '2026-06-08T09:00:00Z',
    tags: ['Football', 'Rules', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Crowd_at_Dora_Stadium.jpg/1280px-Crowd_at_Dora_Stadium.jpg',
    imageAlt: 'A football crowd at a stadium',
    imageCredit: 'Photo: TrickyH / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Offside is football’s most argued-about rule. Here’s the simple version of what it actually means.',
    body: `
      <p>The offside rule keeps attackers from simply camping by the opponent’s goal. It’s simple in principle but produces some of football’s fiercest debates.</p>
      <h2>The Basic Rule</h2>
      <p>A player is in an offside position if they are nearer to the opponent’s goal line than <strong>both the ball and the second-to-last defender</strong> at the moment a teammate plays the ball to them. (The goalkeeper is usually the last defender.)</p>
      <h2>Being Offside vs Being Penalised</h2>
      <p>Being in an offside position isn’t an offence by itself — it’s only penalised if the player becomes <em>involved in active play</em>: touching the ball, interfering with an opponent, or gaining an advantage.</p>
      <h2>When You Can’t Be Offside</h2>
      <ul>
        <li>In your own half of the pitch.</li>
        <li>Directly from a throw-in, corner kick or goal kick.</li>
        <li>If you’re level with the second-to-last defender.</li>
      </ul>
      <h2>Why It’s Controversial</h2>
      <p>Split-second timing and millimetre VAR lines mean tight offside calls regularly decide big matches — which is exactly why fans never stop arguing about them.</p>`,
  },
  {
    id: 'nba-vs-fiba',
    title: 'NBA vs FIBA: How Basketball Rules Differ Around the World',
    category: 'sports',
    categoryLabel: 'Basketball',
    authorId: 'mike-johnson',
    publishedAt: '2026-06-07T09:00:00Z',
    tags: ['Basketball', 'NBA', 'FIBA', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg/1280px-Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg',
    imageAlt: 'Basketball players on the court',
    imageCredit: 'Photo: Lorie Shaull / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The NBA and the international FIBA game look similar but play differently. Here are the key rule differences.',
    body: `
      <p>Watch an NBA game and then an Olympic or World Cup basketball match and you’ll notice the international (FIBA) game feels different. The fundamentals are the same, but several rules aren’t.</p>
      <h2>Game Length</h2>
      <p>The NBA plays four 12-minute quarters (48 minutes); FIBA plays four 10-minute quarters (40 minutes). NBA games are simply longer.</p>
      <h2>The Court and Three-Point Line</h2>
      <p>The NBA court is slightly larger and its three-point line is farther from the basket than FIBA’s, so the same shot can be worth different things depending on the competition.</p>
      <h2>Other Key Differences</h2>
      <ul>
        <li><strong>Fouls:</strong> players foul out after 6 in the NBA, but 5 in FIBA.</li>
        <li><strong>Defence:</strong> defensive rules and goaltending differ subtly between the two.</li>
        <li><strong>Style:</strong> shorter games and a closer arc often make FIBA play feel more compact and physical.</li>
      </ul>
      <h2>Why It Matters</h2>
      <p>NBA stars switching to international duty have to adapt quickly — which is part of what makes global tournaments such a fascinating test.</p>`,
  },
  {
    id: 'battle-royale-explained',
    title: 'What Is a Battle Royale? The Genre Behind PUBG and Fortnite',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'leo-chen',
    publishedAt: '2026-06-06T09:00:00Z',
    tags: ['Esports', 'Gaming', 'Battle Royale', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg/1280px-2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg',
    imageAlt: 'Players competing at an esports event',
    imageCredit: 'Photo: Hariboneagle927 / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'Battle royale became one of gaming’s biggest genres in just a few years. Here’s what defines it and how it took over.',
    body: `
      <p>The battle royale genre exploded in the late 2010s and reshaped gaming. If you’ve heard of PUBG, Fortnite, Apex Legends or Warzone, you’ve heard of battle royale.</p>
      <h2>The Core Idea</h2>
      <p>Dozens of players — often up to 100 — drop onto a large map with nothing and scavenge for weapons and gear. A <strong>shrinking play zone</strong> forces everyone closer together over time, and the <strong>last player or team standing wins</strong>.</p>
      <h2>How It Took Over</h2>
      <p>The format was popularised by mods and then by PlayerUnknown’s Battlegrounds (PUBG) in 2017, before Fortnite turned it into a global, free-to-play phenomenon that crossed over into mainstream culture.</p>
      <h2>Why It Works</h2>
      <p>Every match is different, the tension ramps up as the zone closes, and a single great game can come down to one final firefight — a perfect recipe for both casual play and high-stakes esports.</p>`,
  },

  // ───────────────── WORLD CUP STARS & LEGENDS ─────────────────
  {
    id: 'messi-world-cup-journey',
    title: 'Lionel Messi: The World Cup Journey to Glory in 2022',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'carlos-rodriguez',
    publishedAt: '2026-06-09T10:00:00Z',
    isWorldCup: true,
    isTrending: true,
    tags: ['World Cup', 'Lionel Messi', 'Argentina', 'Feature'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Lionel_Messi_WC2022.jpg',
    imageAlt: 'Lionel Messi playing for Argentina at the 2022 World Cup',
    imageCredit: 'Photo: Hossein Zohrevand / CC BY 4.0 via Wikimedia Commons',
    summary:
      'For Lionel Messi, the one prize that eluded him for years finally came in Qatar 2022. Here’s the story of his long road to World Cup glory.',
    body: `
      <p>For most of his career, Lionel Messi — widely regarded as one of the greatest footballers ever — carried one unanswered question: could he win the World Cup? In December 2022, in Qatar, he finally answered it. This is the story of a journey defined by heartbreak, persistence and ultimate redemption.</p>
      <h2>Early Tournaments and Near Misses</h2>
      <p>Messi burst onto the World Cup scene as a teenager in 2006, scoring on his tournament debut. In 2010 Argentina reached the quarter-finals before a heavy defeat to Germany, and in 2014 the pain deepened: Messi dragged an unfancied side all the way to the final, won the tournament's Golden Ball, but lost the showpiece to Germany after extra time. So close, yet without the prize.</p>
      <h2>The 2018 Setback</h2>
      <p>Four years later in Russia, Argentina laboured. They scraped out of the group and were knocked out in the round of 16 by eventual champions France in a seven-goal classic. For many, it looked like Messi's World Cup chance had gone for good.</p>
      <h2>Redemption in Qatar 2022</h2>
      <p>The 2022 campaign began in disaster — a shock 2-1 defeat to Saudi Arabia. But Argentina regrouped, beating Mexico and Poland to top the group, then edging Australia, the Netherlands (on penalties) and Croatia in the knockouts. Messi was magnificent throughout, scoring and creating in equal measure.</p>
      <p>The final against France is regarded as one of the greatest ever played. Argentina led 2-0, were pegged back to 2-2, went ahead in extra time, were caught again at 3-3 by a Kylian Mbappé hat-trick, and finally won 4-2 on penalties. Messi scored twice in the final and was named the tournament's best player.</p>
      <h2>What It Meant for His Legacy</h2>
      <p>The title completed the set. Added to his club honours and record number of Ballon d'Or awards, the World Cup silenced the last argument against him and, for many, settled the "greatest of all time" debate in his favour.</p>
      <h2>Messi's World Cup, by the Numbers</h2>
      <ul>
        <li>5 World Cups contested (2006–2022).</li>
        <li>13 World Cup goals — among the highest in history.</li>
        <li>2 Golden Ball awards (best player) — in 2014 and 2022.</li>
        <li>1 World Cup title, plus a runners-up medal in 2014.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <h3>When did Messi win the World Cup?</h3>
      <p>In 2022, captaining Argentina to victory over France in the final.</p>
      <h3>How many World Cup goals does Messi have?</h3>
      <p>13, scored across five tournaments.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Messi endured years of near-misses, most painfully the 2014 final.</li>
        <li>His 2022 triumph capped one of football's great individual stories.</li>
        <li>The trophy cemented his place among the sport's all-time greats.</li>
      </ul>
    `,
  },
  {
    id: 'ronaldo-world-cup-records',
    title: 'Cristiano Ronaldo at the World Cup: Records and the 2026 Question',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'jane-doe',
    publishedAt: '2026-06-08T10:00:00Z',
    isWorldCup: true,
    isTrending: true,
    tags: ['World Cup', 'Cristiano Ronaldo', 'Portugal', 'Feature'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cristiano-ronaldo-2491446_960_720.jpg/1280px-Cristiano-ronaldo-2491446_960_720.jpg',
    imageAlt: 'Cristiano Ronaldo',
    imageCredit: 'Photo via Wikimedia Commons (CC0)',
    summary:
      'One of the game’s greatest goalscorers, Cristiano Ronaldo has a long World Cup history — and 2026 could write its final chapter.',
    body: `
      <p>Cristiano Ronaldo is one of the most prolific and enduring footballers in history — a serial winner at club level and the all-time leading scorer in men's international football. Yet across a glittering career, the World Cup itself has remained tantalisingly out of reach. As 2026 approaches, his World Cup story takes on extra meaning.</p>
      <h2>A Long World Cup History</h2>
      <p>Ronaldo first appeared at a World Cup in 2006 as a rising star, and has represented Portugal at every edition since. Along the way he set a notable record: scoring at five different World Cups (2006, 2010, 2014, 2018 and 2022) — a feat no other male player had achieved. His memorable 2018 hat-trick against Spain, capped by a stoppage-time free-kick, ranks among the tournament's iconic individual performances.</p>
      <h2>The Trophy That Got Away</h2>
      <p>For all his individual brilliance, the World Cup is the one prize missing from Ronaldo's collection. He has won the European Championship with Portugal (Euro 2016) and a UEFA Nations League title, but his best World Cup run ended at the semi-final stage in 2006. In 2022, Portugal reached the quarter-finals before falling to Morocco — with Ronaldo controversially starting on the bench in the knockout games.</p>
      <h2>Records and Achievements</h2>
      <ul>
        <li>All-time leading scorer in men's international football.</li>
        <li>Five Ballon d'Or awards and five UEFA Champions League titles.</li>
        <li>One of the very few players to score in five separate World Cups.</li>
        <li>Euro 2016 and UEFA Nations League winner with Portugal.</li>
      </ul>
      <h2>The 2026 Question</h2>
      <p>By 2026 Ronaldo will be 41 — an age at which even legends rarely compete at the very top. Whether he features, and in what role, is one of the tournament's compelling subplots. Win or lose, his sheer longevity at the elite level — still scoring regularly years after most peers retired — is itself one of sport's remarkable stories.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Has Cristiano Ronaldo ever won the World Cup?</h3>
      <p>No. It is the one major trophy missing from his career, despite winning Euro 2016 and the Nations League with Portugal.</p>
      <h3>How many World Cups has Ronaldo played in?</h3>
      <p>Five (2006–2022), scoring in each — 2026 could be his sixth.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Ronaldo holds the rare record of scoring at five different World Cups.</li>
        <li>The World Cup remains the one major honour to elude him.</li>
        <li>2026, at age 41, may be his final shot at the trophy.</li>
      </ul>
    `,
  },
  {
    id: 'messi-vs-ronaldo-rivalry',
    title: 'Messi vs Ronaldo: Inside Football’s Greatest Rivalry',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'carlos-rodriguez',
    publishedAt: '2026-06-07T10:00:00Z',
    isTrending: true,
    tags: ['Football', 'Lionel Messi', 'Cristiano Ronaldo', 'Feature'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg/1280px-Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg',
    imageAlt: 'Cristiano Ronaldo in action',
    imageCredit: 'Photo: Ludovic Péron / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'For over 15 years, Lionel Messi and Cristiano Ronaldo pushed each other to greatness. Here’s why their rivalry defined an era.',
    body: `
      <p>For more than 15 years, two players stood above everyone else in world football: Lionel Messi and Cristiano Ronaldo. Their rivalry did not just dominate the sport — it defined an entire era, pushing both to heights football may never see matched again.</p>
      <h2>The Origins</h2>
      <p>Both emerged in the mid-2000s — Messi at Barcelona, Ronaldo at Manchester United before his move to Real Madrid in 2009. Once Ronaldo arrived in Spain, the rivalry ignited: two of the planet's best players, in the same league, meeting twice a season in the fiercely contested El Clásico.</p>
      <h2>Two Contrasting Geniuses</h2>
      <p>Part of the fascination was how different they were. Messi: small, low-centred, a close-control magician who drifts past defenders and threads impossible passes. Ronaldo: tall, explosive, supremely athletic, a relentless goalscorer who reinvented himself repeatedly to keep scoring. Two completely different blueprints for greatness — and fans split into camps that still argue today.</p>
      <h2>Trading Records and Trophies</h2>
      <p>Through the 2010s they traded the Ballon d'Or almost exclusively, combining for well over a dozen between them — Messi finishing with a record eight, Ronaldo with five. They shattered scoring records season after season, each seemingly raising his level in direct response to the other.</p>
      <ul>
        <li><strong>Messi:</strong> record Ballon d'Or wins, multiple Champions Leagues, and the 2022 World Cup.</li>
        <li><strong>Ronaldo:</strong> five Champions Leagues across England, Spain and Italy, and the all-time international scoring record.</li>
      </ul>
      <h2>The Move Away From Europe</h2>
      <p>The European chapter eventually closed: Ronaldo moved to Saudi Arabia's Al-Nassr in early 2023, while Messi joined Inter Miami in MLS later that year. Even apart, their careers remained a constant point of comparison.</p>
      <h2>Who Was Better?</h2>
      <p>It is the debate that never ends — and that is the point. Messi's supporters cite his natural genius, creativity and the World Cup; Ronaldo's point to his goal records, longevity and success across multiple leagues. The truth most fans accept: we were lucky to watch both at once.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How many Ballon d'Or awards do they have?</h3>
      <p>Messi has won a record eight; Ronaldo has won five.</p>
      <h3>Did they ever play together?</h3>
      <p>No — they were rivals throughout, most famously in the El Clásico years in Spain.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Messi and Ronaldo defined football for over 15 years.</li>
        <li>Their contrasting styles made the rivalry endlessly compelling.</li>
        <li>Their competition pushed both to historic, era-defining excellence.</li>
      </ul>
    `,
  },
  {
    id: 'greatest-world-cup-goalscorers',
    title: 'The Greatest World Cup Goalscorers of All Time',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'tom-frank',
    publishedAt: '2026-06-06T10:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Records', 'History'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/FIFA_WC-qualification_2014_-_Austria_vs._Germany_2012-09-11_-_Miroslav_Klose_01.JPG/1280px-FIFA_WC-qualification_2014_-_Austria_vs._Germany_2012-09-11_-_Miroslav_Klose_01.JPG',
    imageAlt: 'Miroslav Klose playing for Germany',
    imageCredit: 'Photo: Michael Kranewitter / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'Who has scored the most goals in World Cup history? From Klose to Ronaldo and Müller, here are the tournament’s deadliest finishers.',
    body: `
      <p>Scoring at a World Cup writes a player into football folklore. Doing it repeatedly, across multiple tournaments, is what separates the legends from the rest. Here are the deadliest finishers in the history of the competition — and the man best placed to challenge the record.</p>
      <h2>The All-Time Leader: Miroslav Klose (16)</h2>
      <p>Germany's Miroslav Klose holds the record with <strong>16 goals</strong>, scored across four tournaments from 2002 to 2014. Remarkably consistent rather than explosive, Klose finished his World Cup career as a world champion in Brazil, overtaking the previous record holder along the way.</p>
      <h2>The Chasing Pack</h2>
      <ul>
        <li><strong>Ronaldo (Brazil) — 15:</strong> the original "R9", a two-time World Cup winner who held the record before Klose.</li>
        <li><strong>Gerd Müller (Germany) — 14:</strong> a ruthless poacher who set the bar at the 1970 and 1974 tournaments.</li>
        <li><strong>Just Fontaine (France) — 13:</strong> astonishingly, all in a single tournament (1958) — a single-edition record that still stands.</li>
        <li><strong>Lionel Messi (Argentina) — 13:</strong> still active, having moved up the list with his 2022 title run.</li>
        <li><strong>Pelé (Brazil) — 12:</strong> a three-time champion whose tally came largely as a teenager and young man.</li>
      </ul>
      <h2>Golden Boot vs All-Time Tally</h2>
      <p>It is worth distinguishing two things: the <strong>Golden Boot</strong> goes to the top scorer at a single tournament, while the all-time list rewards sustained excellence across many. Fontaine's 13-in-one-tournament is the ultimate single-edition feat; Klose's 16 is the ultimate career achievement.</p>
      <h2>Can Anyone Break the Record?</h2>
      <p>The man most likely to chase Klose is France's <strong>Kylian Mbappé</strong>, who already has 12 World Cup goals — including a hat-trick in the 2022 final — while still in his twenties. If he stays fit and France keep qualifying deep, the all-time record could realistically fall within the next decade.</p>
      <h2>Why the Record Endures</h2>
      <p>Reaching the summit requires more than finishing ability. It demands the longevity to appear at three or four World Cups and the form to score in each. That combination is rare — which is why Klose's 16 may stand for a very long time.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Who has scored the most World Cup goals ever?</h3>
      <p>Miroslav Klose of Germany, with 16 goals.</p>
      <h3>Who scored the most goals in a single World Cup?</h3>
      <p>Just Fontaine of France, with 13 at the 1958 tournament.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Klose (16) leads the all-time list; Fontaine holds the single-tournament record (13).</li>
        <li>Messi (13) remains an active member of the chasing pack.</li>
        <li>Mbappé is the most likely active player to one day break the record.</li>
      </ul>
    `,
  },
  {
    id: 'messi-ronaldo-last-world-cup',
    title: 'Could 2026 Be the Last World Cup for Messi and Ronaldo?',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'carlos-rodriguez',
    publishedAt: '2026-06-05T10:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Lionel Messi', 'Cristiano Ronaldo', 'Analysis'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg/1280px-FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg',
    imageAlt: 'Lionel Messi taking a penalty for Argentina',
    imageCredit: 'Photo: Voltmetro / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Both icons are in the twilight of their careers. The 2026 World Cup could be the final tournament for two of the greatest players ever.',
    body: `
      <p>The 2026 World Cup arrives at a poignant moment for football fans: it may be the last time we see Lionel Messi and Cristiano Ronaldo grace the game’s biggest stage.</p>
      <h2>The Age Factor</h2>
      <p>Both players are now in the latter stages of remarkable careers. Sustaining elite international form into one’s late 30s and beyond is extraordinarily rare, which lends every appearance a sense of occasion.</p>
      <h2>Different Motivations</h2>
      <p>Messi arrives as a world champion with nothing left to prove, while Ronaldo still chases the one trophy missing from his collection. Those contrasting stakes make their 2026 campaigns compelling for very different reasons.</p>
      <h2>A Farewell to an Era</h2>
      <p>Whatever unfolds, 2026 feels like the closing chapter of the Messi-Ronaldo age. For a generation that grew up watching them, it’s a tournament to savour — because football may not see two such talents dominate for so long again.</p>
      <p><em>This article is analysis and opinion.</em></p>`,
  },
];

export const LOCAL_ARTICLES: Article[] = RAW.map(build);
