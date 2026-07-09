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
    authorId: 'newsroom',
    publishedAt: '2025-07-03T08:00:00Z',
    isTrending: true,
    tags: ['Football', 'Liverpool', 'Premier League'],
    imageUrl: '/images/placeholders/football.svg',
    imageAlt: 'Football illustration in tribute to Diogo Jota',
    summary:
      'Liverpool and Portugal forward Diogo Jota has died following a car accident in northwestern Spain. He was 28.',
    body: `
      <p>Liverpool and Portugal forward Diogo Jota has died following a car accident in the early hours of Thursday near Zamora, in northwestern Spain. He was 28. His brother, André Silva, also died in the crash. The football world has reacted with shock and grief to the loss of a player admired as much for his character as for his goals.</p>
      <h2>What Happened</h2>
      <p>According to Spanish authorities, the vehicle the brothers were travelling in left the A-52 road near Palacios de Sanabria. Early reports indicated that a tyre may have failed while the car was overtaking. Both men were pronounced dead at the scene; no other vehicles were involved, and an official investigation into the cause is ongoing. Out of respect for the families, 26News is reporting only details confirmed by the authorities.</p>
      <h2>A Career of Quiet Excellence</h2>
      <p>Jota built his reputation as one of the Premier League's most intelligent and reliable forwards. After impressing at Wolverhampton Wanderers, he joined Liverpool in 2020 and quickly became a key figure under Jürgen Klopp, known for his sharp movement, two-footed finishing and a knack for decisive goals in big moments. He won major honours at Anfield and was a regular for the Portugal national team, contributing to their Nations League success and featuring at major international tournaments.</p>
      <h2>Tributes</h2>
      <p>Clubs, team-mates and supporters across the game paid tribute to a player widely described as humble and hard-working — a family man whose warmth off the pitch was as notable as his quality on it. The tragedy came only days after Jota had married his long-time partner, Rute Cardoso, with whom he had three children, deepening the sense of loss felt by those who knew him.</p>
      <h2>Remembering Diogo Jota</h2>
      <p>Beyond the statistics, Jota will be remembered for the joy he brought to the game and the respect he earned throughout it. Our thoughts are with his family, friends, team-mates and supporters at Liverpool, Wolves and the Portugal national team.</p>`,
  },
  {
    id: 'home-article-1',
    title: "Liverpool finalising deal for Leverkusen's Wirtz",
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
    publishedAt: '2025-06-11T09:00:00Z',
    isTrending: true,
    tags: ['Football', 'Transfers', 'Premier League', 'Liverpool'],
    imageUrl: '/images/wirt_join_liverpool.png',
    body: `
<p>Liverpool have completed the signing of Bayer Leverkusen playmaker Florian Wirtz in a deal that ranks among the most expensive in British football history. The Germany international arrives at Anfield as the centrepiece of the club's rebuild, having chosen the Premier League champions ahead of interest from several of Europe's biggest sides.</p>
<h2>A Club-Record Move</h2>
<p>The transfer is structured around a guaranteed fee of around £100m, with a further package of add-ons that could take the total towards £116m depending on performance and team success. Either way, it comfortably surpasses Liverpool's previous record outlay — the £75m spent on captain Virgil van Dijk in 2018 — and cements Wirtz's status among the most valuable players in the world.</p>
<p>For Liverpool, the size of the commitment reflects both the player's rare talent and the competitive market for elite attacking midfielders, a position where genuine world-class options are scarce and fiercely contested.</p>
<h2>Why Liverpool Pushed So Hard</h2>
<p>Wirtz had made it clear that his preference was a move to Anfield, even with rival clubs circling. Liverpool submitted a series of formal bids before agreement was reached, with the final negotiations focused on the structure of the deal and the value and achievability of the add-ons. Leverkusen, who had developed Wirtz into one of the continent's most coveted young players, drove a hard bargain for a footballer they were reluctant to lose.</p>
<h2>What He Brings</h2>
<p>Still in his early twenties, Wirtz is regarded as one of the finest creative midfielders of his generation. He made his Leverkusen debut as a teenager and went on to score and create goals prolifically, playing a leading role in the club's domestic success. A left-footed attacking midfielder blessed with close control, vision and an eye for goal, he operates in the spaces between midfield and attack — precisely the kind of creator who can unlock deep-lying defences.</p>
<p>At Liverpool he is expected to add a new dimension to the attack, linking play and providing both goals and assists in a system that thrives on quick, incisive forward movement.</p>
<h2>Joining Football's £100m Club</h2>
<p>The move makes Wirtz one of only a handful of players ever transferred for a fee in the £100m bracket, an exclusive group that underlines how the market for the very best talent has escalated. For a player of his age and ceiling, Liverpool clearly view the outlay as a long-term investment rather than a short-term gamble.</p>
<h2>Frequently Asked Questions</h2>
<h3>How much did Liverpool pay for Florian Wirtz?</h3>
<p>The deal is built around a guaranteed fee of roughly £100m, with add-ons that could push the total towards £116m — a club record for Liverpool.</p>
<h3>Where did Wirtz play before Liverpool?</h3>
<p>He came through and starred for Bayer Leverkusen in Germany, making his debut as a teenager and developing into one of Europe's best young playmakers.</p>
<h3>What position does Wirtz play?</h3>
<p>He is an attacking midfielder, typically operating in the creative spaces behind the forwards.</p>
<h2>Key Takeaways</h2>
<ul>
<li>Liverpool signed Florian Wirtz from Bayer Leverkusen in a deal worth up to around £116m.</li>
<li>The fee smashes the club's previous record, the £75m paid for Virgil van Dijk in 2018.</li>
<li>Wirtz chose Anfield ahead of other elite suitors and becomes one of few players moved for a nine-figure fee.</li>
<li>The creative midfielder is seen as a long-term centrepiece of Liverpool's attack.</li>
</ul>
      `,
  },
  {
    id: 'football-cunha',
    title: 'Manchester United announce signing of Matheus Cunha from Wolves on five-year deal',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
    publishedAt: '2025-06-05T10:00:00Z',
    tags: ['Football', 'Transfers', 'Manchester United'],
    imageUrl:
      'https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/2cc95d71-365f-4df4-9f8b-456b58def0e6.avif',
    body: `
<p>Manchester United have completed the signing of Matheus Cunha from Wolverhampton Wanderers, with the Brazil forward joining on a five-year contract. The deal, triggered via a release clause worth around £62.5m, marks an early and clear statement of intent as United look to rebuild an attack that has too often fallen short in recent seasons.</p>
<h2>The Details of the Deal</h2>
<p>United moved decisively to activate the release clause in Cunha's Wolves contract, with the Old Trafford club also holding the option to extend his deal by a further year. Securing the transfer early in the window allowed United to get ahead of rival interest and give their new signing a full pre-season to integrate into the side.</p>
<h2>Who Is Matheus Cunha?</h2>
<p>Cunha is a versatile Brazilian forward who can operate as a central striker, a second striker or off either flank. After developing in Europe with spells in Switzerland, Germany and Spain, he joined Wolves and established himself as one of the Premier League's more creative and combatative attackers — a player who combines flair and skill with genuine work rate and a willingness to press from the front.</p>
<p>At Wolves he became the focal point of the attack, chipping in with goals and assists while carrying much of the creative burden for his side. That blend of end product and industry is exactly what United have been seeking.</p>
<h2>A Dream Move</h2>
<p>For Cunha, the transfer represents the fulfilment of a childhood ambition. Reflecting on the move, he made clear how much joining the club meant to him:</p>
<blockquote>"It's hard to put into words my feelings about becoming a Manchester United player. Ever since I was a child in Brazil watching Premier League games on TV at my grandmother's house, United was my favourite English team, and I dreamed of wearing the red shirt." — Matheus Cunha</blockquote>
<p>He added that his focus was now on pre-season and on helping the club climb back towards the top: "All my focus is now on working hard to become a valuable part of the team, and helping get this club back to the top."</p>
<h2>How He Fits at Old Trafford</h2>
<p>Cunha's flexibility should give United's manager several options. He can lead the line, drop into pockets to link play, or drift wide to combine with team-mates — profiles that suit a modern, fluid front line. His energy without the ball also fits the aggressive pressing that top sides increasingly demand. If he can translate his Wolves form to a bigger stage, he offers both goals and the kind of unpredictability United's attack has lacked.</p>
<h2>Frequently Asked Questions</h2>
<h3>How much did Manchester United pay for Matheus Cunha?</h3>
<p>United activated a release clause worth around £62.5m, and also secured the option to extend his contract by an additional year.</p>
<h3>What nationality is Matheus Cunha?</h3>
<p>He is Brazilian, and joined United from Premier League rivals Wolverhampton Wanderers.</p>
<h3>What position does Cunha play?</h3>
<p>He is a versatile forward who can play as a central striker, a second striker or from wide areas.</p>
<h2>Key Takeaways</h2>
<ul>
<li>Manchester United signed Matheus Cunha from Wolves on a five-year deal via a release clause of around £62.5m.</li>
<li>The versatile Brazil forward can play across the front line and is known for his flair and work rate.</li>
<li>Cunha described joining United as a childhood dream fulfilled.</li>
<li>His flexibility and pressing give United fresh attacking options as they rebuild.</li>
</ul>
      `,
  },
  {
    id: 'sport-article-3-ffp',
    title: 'Transfer Window Revolution: New Financial Fair Play Rules Reshape Market',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
    publishedAt: '2025-06-12T09:00:00Z',
    tags: ['Football', 'Transfers', 'UEFA', 'Finance'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Crowd_wembley_FAT_08.jpg',
    imageAlt: 'Football fans fill a stadium',
    imageCredit: 'Photo via Wikimedia Commons (public domain)',
    body: `
<p>Not long ago, the transfer market ran on a simple principle: the club with the deepest pockets usually got its target. That world has not disappeared, but it now operates inside a thickening web of financial regulation. Rules with dry names such as Financial Fair Play, squad-cost ratios and Profitability and Sustainability have reshaped how clubs sign, sell and value players. Understanding them has become essential for anyone trying to make sense of a modern transfer window, where accountants and lawyers increasingly sit alongside sporting directors in the decisions that define a season.</p>

<h2>Where It All Began: UEFA Financial Fair Play</h2>
<p>UEFA introduced Financial Fair Play (FFP) more than a decade ago in response to a wave of clubs running up alarming debts and, in some cases, sliding towards insolvency. The core idea was disarmingly simple: clubs should not spend far more than they earn. This was captured in the so-called <strong>break-even requirement</strong>, which measured a club's football-related income against its football-related costs over a rolling period and allowed only a limited, permitted loss.</p>
<p>The aim was never to stop clubs spending money. It was to stop them spending money they did not have, or that depended entirely on an owner writing cheques indefinitely. If a club wanted to buy more, the logic went, it needed to grow its revenue through matchday income, broadcasting deals and commercial partnerships rather than simply borrowing against the future.</p>

<h2>The New Framework: The Squad-Cost Ratio</h2>
<p>FFP proved difficult to police and was widely seen as too blunt for a fast-changing industry. UEFA has since moved towards a more targeted model built around a <strong>squad-cost ratio</strong>. Rather than judging overall break-even, this approach limits what a club can spend specifically on its squad, capping the combined cost of player and coaching wages, transfer fees and agent fees at a set percentage of the club's football revenue.</p>
<p>The reasoning is that squad costs are where clubs typically overreach. By tying them directly to income, UEFA hopes to keep ambition proportionate to means. The permitted share was designed to tighten over a transition period, giving clubs time to adjust their wage bills and recruitment plans. In general terms, it means a club earning modest revenue simply cannot commit the same slice to players as a continental heavyweight, however generous its owner might wish to be.</p>

<h2>England's Own System: Profitability and Sustainability Rules</h2>
<p>UEFA's rules only apply to clubs in European competition. Domestically, the Premier League runs its own separate regime, the <strong>Profitability and Sustainability Rules</strong> (PSR). These allow clubs to lose only up to a permitted amount across a three-year assessment period, with certain investments, such as spending on infrastructure, youth development and women's football, excluded from the calculation.</p>
<p>PSR has become one of the most talked-about phrases in English football, not least because breaches now carry real sporting consequences. The existence of two overlapping systems, one European and one domestic, means the biggest clubs must satisfy more than one rulebook at once, and the two do not always pull in the same direction.</p>

<h2>Why the Rules Exist</h2>
<p>Supporters sometimes see these regulations as an obstacle to their club's ambition, but the stated goals are broadly consistent across every framework. The rules are meant to:</p>
<ul>
<li><strong>Protect financial stability</strong>, so that clubs are not one bad season away from collapse.</li>
<li><strong>Preserve competitive balance</strong>, preventing a handful of the wealthiest owners from simply buying every advantage.</li>
<li><strong>Discourage reckless overspending</strong>, particularly wage inflation that ripples through the entire market.</li>
</ul>
<p>Football's history is littered with clubs that chased success too hard and paid for it with administration, relegation or years of rebuilding. Regulation is, in principle, an attempt to make the game more sustainable for everyone.</p>

<h2>How Clubs Respond and Adapt</h2>
<p>Where there are rules, there is creative compliance. Clubs have developed several well-established techniques to work within the limits while still competing hard in the market.</p>
<ul>
<li><strong>Amortisation over long contracts</strong>: a transfer fee is spread across the length of a player's deal for accounting purposes, so a large fee on a lengthy contract counts as a smaller annual cost.</li>
<li><strong>Selling academy players</strong>: a homegrown player has no fee to write down on the books, so any sale is registered as near-pure profit, making young talent especially valuable in the accounts.</li>
<li><strong>Deadline trading</strong>: clubs balance the books before assessment dates by selling as well as buying, sometimes leading to a flurry of end-of-window deals designed as much for the balance sheet as for the pitch.</li>
</ul>

<h2>Criticism and Debate</h2>
<p>The rules remain fiercely contested. Critics argue that tying spending to revenue risks <em>entrenching the established elite</em>, because the clubs that already earn the most are permitted to spend the most, making it harder for ambitious challengers to break through. Others counter that unlimited owner spending would be even worse for competitive balance.</p>
<p>Enforcement has become a battleground of its own. Points deductions, once almost unthinkable, have been handed down for breaches, and clubs have not hesitated to challenge decisions through appeals and legal argument. The debates over what counts as fair revenue, related-party sponsorship and the true value of academy sales are unlikely to be settled soon.</p>

<h2>Frequently Asked Questions</h2>
<h3>Do these rules stop rich owners from investing?</h3>
<p>Not entirely. Owners can still fund infrastructure, academies and long-term growth, and much of that spending sits outside the core calculations. What the rules restrain is the ability to pour money straight into wages and transfer fees far beyond what the club itself generates.</p>

<h3>What is amortisation, in plain terms?</h3>
<p>It is simply spreading a transfer fee across the years of a contract. A large fee signed on a long deal is counted in smaller annual chunks, which softens its immediate impact on a club's regulatory position.</p>

<h3>Are UEFA's rules and the Premier League's rules the same thing?</h3>
<p>No. They are separate systems with different thresholds and methods. UEFA's framework governs clubs in European competition, while the Premier League's PSR applies domestically, and a club competing in Europe must comply with both.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Modern regulation has shifted from FFP's broad break-even test towards a squad-cost ratio that caps spending on wages, fees and agents as a share of revenue.</li>
<li>The Premier League's PSR is a distinct domestic system, so the biggest clubs must satisfy more than one rulebook at once.</li>
<li>Clubs adapt through amortisation, profitable academy sales and deadline-day trading to stay within the limits.</li>
<li>Debate continues over whether the rules protect the game's health or simply lock in the advantages of the wealthiest clubs.</li>
</ul>
      `,
  },

  // ───────────────────────── WORLD CUP ─────────────────────────
  {
    id: 'home-hero-main',
    title: 'Carlo Ancelotti Showers Praise on Cristiano Ronaldo After UEFA Nations League Win',
    category: 'football',
    categoryLabel: 'International Football',
    authorId: 'newsroom',
    publishedAt: '2025-06-11T18:00:00Z',
    isTrending: true,
    tags: ['Football', 'Portugal', 'Cristiano Ronaldo', 'Nations League'],
    imageUrl: '/images/ronaldo_win_nation_lauge.webp',
    summary: 'Carlo Ancelotti praises Cristiano Ronaldo after Portugal lifts the UEFA Nations League trophy.',
    body: `
<p>At 40, an age when almost every footballer has long since retired, Cristiano Ronaldo added another major honour to his career by helping Portugal win the UEFA Nations League. It was the second time he had lifted the trophy, and it prompted warm praise from one of the most decorated managers in the game, Carlo Ancelotti — a man who knows Ronaldo's qualities better than most.</p>
<h2>A Second Nations League Title</h2>
<p>Portugal sealed the crown by beating Spain in the final, a tight contest that finished 2-2 after extra time before Portugal held their nerve to win 5-3 on penalties. Ronaldo was central to the campaign, leading the line and contributing goals on the way to the title. For a player who first became a senior international more than two decades ago, the win was further proof that his hunger for silverware has not dimmed.</p>
<p>It also underlined a wider truth about the modern Portugal side: while a new generation of talent has emerged around him, Ronaldo remains a focal point and a leader, still capable of decisive contributions on the biggest nights.</p>
<h2>Ancelotti's Verdict</h2>
<p>Ancelotti, who managed Ronaldo during a hugely successful spell at Real Madrid and now leads Brazil, was asked about the forward ahead of a World Cup qualifier. His answer was unequivocal:</p>
<blockquote>"I'm very happy for him. Cristiano is a football legend and remains one at his age, thanks to his seriousness and professionalism. He's still performing at the highest level." — Carlo Ancelotti</blockquote>
<p>Coming from a coach who has worked with a long list of the game's greatest players across Italy, England, France, Germany and Spain, the compliment carried real weight. Ancelotti singled out the professionalism and discipline that have allowed Ronaldo to extend his career far beyond the norm.</p>
<h2>The Secret to His Longevity</h2>
<p>Ronaldo's durability is no accident. Throughout his career he has been renowned for meticulous attention to fitness, diet, recovery and preparation — the very traits Ancelotti highlighted. As his explosive pace has gradually faded, he has reinvented himself as a penalty-box finisher, relying on positioning, timing and a relentless goalscoring instinct rather than the flying wing play of his youth.</p>
<p>That capacity to adapt has kept him relevant at the elite level long after most of his contemporaries stepped away, and it is a major reason he remains a talismanic figure for his country.</p>
<h2>Eyes on 2026</h2>
<p>The praise inevitably turns attention to the 2026 World Cup. It is the one major prize still missing from Ronaldo's collection, and by the time the tournament arrives he will be in his forties — an age at which even legends rarely compete at the very top. Whether he features, and in what role, is one of the sport's compelling subplots. What is certain is that his professionalism, the quality Ancelotti praised, has given him a chance few would have thought possible.</p>
<h2>Frequently Asked Questions</h2>
<h3>How many times has Ronaldo won the Nations League?</h3>
<p>Twice with Portugal, adding to a trophy haul that already included the European Championship in 2016.</p>
<h3>What did Carlo Ancelotti say about Ronaldo?</h3>
<p>He called Ronaldo a football legend who continues to perform at the highest level thanks to his seriousness and professionalism.</p>
<h3>Did Ronaldo and Ancelotti work together?</h3>
<p>Yes. Ancelotti managed Ronaldo at Real Madrid during a highly successful period for the club.</p>
<h2>Key Takeaways</h2>
<ul>
<li>Ronaldo, at 40, helped Portugal win a second UEFA Nations League title, beating Spain on penalties in the final.</li>
<li>Carlo Ancelotti praised his professionalism and enduring quality at the highest level.</li>
<li>His longevity stems from meticulous fitness and a reinvention as a penalty-box finisher.</li>
<li>The 2026 World Cup looms as the one major honour still missing from his career.</li>
</ul>
      `,
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
    authorId: 'newsroom',
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
      <p>The expanded 2026 World Cup introduces a knockout round that has never existed before — the round of 32 — fundamentally changing how teams approach the group stage. It is the biggest structural overhaul of the tournament since the field grew to 32 teams in 1998, and it rewards a different kind of group-stage strategy. Here is exactly how qualification from the groups works, why the format changed, and what it means on the pitch.</p>

      <h2>Twelve Groups of Four</h2>
      <p>The 48 teams are split into 12 groups of four. Each side plays the other three in its group once, meaning every team is guaranteed at least three matches before any potential exit. That guarantee matters: it was one of FIFA's main arguments for expansion, ensuring smaller nations making their World Cup debut get a meaningful run of fixtures rather than a fleeting cameo.</p>

      <h2>Why FIFA Scrapped Its First Plan</h2>
      <p>The 12-groups-of-four structure was not the original blueprint. FIFA initially proposed 16 groups of three teams, but that idea drew heavy criticism: three-team groups risk a decisive final match where two sides could engineer a result that eliminates the third — the very kind of collusion the simultaneous final-round kick-offs are designed to prevent. After the drama of the 2022 group stage, FIFA reverted to four-team groups, accepting a longer tournament (104 matches instead of a planned 80) in exchange for fairer, more competitive groups.</p>

      <h2>Who Advances</h2>
      <ul>
        <li>The <strong>top two</strong> in each group qualify automatically — 24 teams.</li>
        <li>The <strong>eight best third-placed teams</strong> across all 12 groups also go through.</li>
        <li>Together that produces a 32-team knockout bracket.</li>
      </ul>
      <p>In other words, 32 of the 48 teams — two-thirds of the field — survive the group stage. Only 16 go home after three games.</p>

      <h2>How the Best Third-Placed Teams Are Ranked</h2>
      <p>When comparing third-placed teams from different groups, the ranking is decided by points first, then goal difference, then goals scored, and finally fair-play (disciplinary) record and drawing of lots if teams are still level. This makes goal difference and discipline genuinely important from the very first match — a late consolation goal in a heavy defeat, or avoiding a needless second yellow card, could be the difference between a place in the round of 32 and an early flight home. The "best third-placed" mechanism is not new in itself: it was used successfully at the 24-team Euro 2016 and Euro 2024, and 2026 simply scales it up.</p>

      <h2>Why the Round of 32 Matters</h2>
      <p>In the old 32-team format, eight groups sent 16 teams straight to the round of 16. The new system adds an extra knockout round before it, lengthening the tournament and giving more nations a meaningful path deep into the competition. For a debutant or a smaller footballing country, reaching a World Cup knockout stage — once a near-impossible dream — is now a realistic target, which changes how those teams set up and how their fans approach the tournament.</p>

      <h2>Strategic Implications</h2>
      <p>Because a strong third-place finish can be enough to advance, coaches face a genuine dilemma. Win your group and you may earn a theoretically easier knockout path and more rest; play it too safe and you risk slipping to third and a tougher draw — or missing out altogether if other groups produce stronger third-placed sides. There are fewer true "dead rubbers", and final-round group matches carry heightened drama as teams scramble for one of the eight wildcard places, often without knowing the exact points total they need until other groups finish. Expect more managers chasing goals late in group games than in any previous World Cup.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>How many teams qualify from each group?</h3>
      <p>The top two automatically, with eight more of the best third-placed teams advancing overall — 32 of 48 teams in total.</p>
      <h3>What is the round of 32?</h3>
      <p>A brand-new opening knockout round created by the 48-team format, played before the round of 16.</p>
      <h3>How is a third-placed team's ranking decided?</h3>
      <p>By points, then goal difference, then goals scored, then disciplinary record, and finally drawing of lots.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>12 groups of four; the top two plus the eight best third-placed teams reach the round of 32.</li>
        <li>FIFA chose four-team groups over its original three-team plan to keep groups fair and competitive.</li>
        <li>Goal difference, goals scored and discipline can decide the eight wildcard places — making every minute count.</li>
        <li>The format means more meaningful matches, fewer dead rubbers, and a realistic knockout path for smaller nations.</li>
      </ul>
    `,
  },
  {
    id: 'wc-2026-contenders',
    title: 'Title Contenders for World Cup 2026: The Favourites and the Dark Horses',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
    publishedAt: '2026-06-08T11:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Analysis', 'Brazil', 'France', 'Argentina'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Argentina_national_football_team_-_1_-_2022.jpg/1280px-Argentina_national_football_team_-_1_-_2022.jpg',
    imageAlt: 'The Argentina national football team, reigning world champions',
    imageCredit: 'Photo: Argentina.gob.ar / CC BY 4.0 via Wikimedia Commons',
    summary:
      'Defending champions Argentina, France and Brazil headline the favourites — but several dark horses could spring a surprise.',
    body: `
      <p>As the 2026 World Cup gets under way, the usual heavyweights once again lead the betting — but the expanded format and gruelling North American summer could level the playing field more than at any tournament in memory. Here is a clear-eyed look at the favourites, the genuine dark horses, and the structural factors that could decide where the trophy ends up.</p>

      <h2>The Favourites</h2>
      <p><strong>Argentina</strong> arrive as defending champions, blending the experience of their 2022 winners with a steady stream of emerging talent — though the open question is how their oldest stars hold up over a longer, hotter tournament. <strong>France</strong> remain the benchmark for depth: they can lose first-choice players and barely weaken, and they have reached two of the last three finals. <strong>Brazil</strong> never lack attacking riches and arrive under pressure to end a wait for a sixth star that stretches back to 2002. <strong>Spain</strong>, European champions and built on a relentless possession game, and <strong>England</strong>, with one of the deepest attacking pools in the world, both carry the "best squad never to convert it" tag. <strong>Germany</strong>, traditionally slow starters who peak in knockouts, can never be discounted.</p>

      <h2>The Dark Horses</h2>
      <p><strong>Morocco</strong> are the obvious one. Their run to the 2022 semi-finals — beating Spain and Portugal along the way — was no fluke, and they have continued to develop a golden generation. The <strong>USA</strong>, as co-hosts with an athletic, youthful core, have the crowds, the familiarity with the venues and the motivation to go beyond their usual ceiling. <strong>Portugal</strong> still possess elite individual quality and will want a major trophy for their veteran talisman before he bows out. The <strong>Netherlands</strong> are perennial deep-runners, and a side like <strong>Croatia</strong> has shown twice in recent cycles that tournament know-how can outweigh raw talent.</p>

      <h2>History's Warning to the Favourites</h2>
      <p>One pattern is worth keeping in mind: no European team has ever won a World Cup staged in the Americas. Every edition held in North, Central or South America has been won by a South American nation. Whether 2026 finally breaks that streak — with European sides better prepared for travel and heat than their predecessors — is one of the tournament's most intriguing sub-plots, and a reason to take South American contenders especially seriously.</p>

      <h2>The X-Factor: Conditions and Format</h2>
      <p>Summer heat, humidity, altitude in Mexico City and long travel distances between host cities will test squad depth like never before. With the winners playing up to eight matches and several fixtures in air-conditioned indoor stadiums, the physical management of a squad becomes a tactical weapon in itself. The expanded field also means an extra knockout round, so the eventual champions must navigate more potential banana skins than ever. Teams that rotate intelligently and recover well may hold a decisive edge over those who rely too heavily on a small core.</p>

      <h2>Key Players to Watch</h2>
      <p>France's Kylian Mbappé enters his prime as perhaps the tournament's defining talent, but World Cups have a habit of crowning new icons. Watch for the next generation of attackers across Brazil, England and Spain, and for the breakout star from an unfancied nation — almost every recent tournament has produced one. Individual brilliance in a single knockout tie can still bend an entire World Cup, however deep the favourites' squads may be.</p>

      <h2>Our Read</h2>
      <p>The smart money still sits with the established powers — Argentina, France and Brazil — but the combination of an extra round, brutal conditions and a host nation with home advantage makes 2026 unusually open. If a surprise package reaches the latter stages, few should be shocked.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Who are the favourites for the 2026 World Cup?</h3>
      <p>Defending champions Argentina, along with France, Brazil, Spain, England and Germany.</p>
      <h3>Could a host nation win?</h3>
      <p>The USA are the most likely host to make a deep run, with home advantage a genuine factor, though winning the whole tournament would be a major surprise.</p>
      <h3>Has a European team ever won a World Cup in the Americas?</h3>
      <p>No — every World Cup held in the Americas has been won by a South American nation, a streak the 2026 favourites will try to break.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Argentina, France and Brazil head a familiar list of favourites; Spain and England are the strongest "nearly" sides.</li>
        <li>Morocco, the USA, Portugal and the Netherlands lead a credible group of dark horses.</li>
        <li>No European team has ever won a World Cup in the Americas — a historical edge for South American contenders.</li>
        <li>Heat, travel, altitude and rotation over up to eight games could decide the destiny of the trophy.</li>
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
      <p>Two stadiums carry special significance. The <strong>Estadio Azteca</strong> in Mexico City hosts the opening match, extending a World Cup legacy that already includes the 1970 and 1986 finals — making it the first venue to feature at three separate tournaments. The <strong>final</strong> itself will be played at <strong>MetLife Stadium</strong> in the New York/New Jersey area on 19 July 2026, a venue chosen partly for its enormous capacity and its position in the largest media market in the United States.</p>

      <h2>Three Regional Clusters</h2>
      <p>To make sense of the sprawl, it helps to think of the venues in three broad regions. The <strong>Western cluster</strong> — Los Angeles, the Bay Area, Seattle, Vancouver, Guadalajara — pairs Pacific-coast cities with northern Mexico. The <strong>Central cluster</strong> — Dallas, Houston, Kansas City, Atlanta, Mexico City, Monterrey — sits in the warmer interior. The <strong>Eastern cluster</strong> — New York/New Jersey, Philadelphia, Boston, Miami, Toronto — runs up the Atlantic seaboard. Organisers have leaned on this geography to keep group-stage travel manageable, with teams generally based in and around one region before the knockout rounds scatter them more widely.</p>

      <h2>Heat, Altitude and Indoor Roofs</h2>
      <p>Climate is the single biggest variable. June and July can bring fierce heat and humidity to southern venues like Dallas, Houston, Atlanta and Miami, while Mexico City adds the challenge of high altitude. This is why the roofed, air-conditioned stadiums — Atlanta's Mercedes-Benz Stadium, Dallas's AT&amp;T Stadium, Houston's NRG Stadium and Los Angeles's SoFi Stadium — are so valuable: they offer controlled conditions for the hottest afternoon kick-offs, and several are strong candidates for high-profile knockout fixtures as a result. Northern venues such as Vancouver, Seattle and Toronto, by contrast, should offer cooler, more temperate conditions.</p>

      <h2>A Logistical Challenge Unlike Any Before</h2>
      <p>With venues separated by thousands of kilometres and multiple time zones, the 2026 World Cup asks more of squads logistically than any in history. A deep run can mean repeated long-haul flights, shifting climates and disrupted recovery. Travel planning, acclimatisation and squad rotation move from background concerns to genuine competitive factors — and the nations that manage them best may gain an edge as meaningful as any tactical tweak.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>How many host cities are there in 2026?</h3>
      <p>16 — eleven in the USA, three in Mexico and two in Canada.</p>
      <h3>Which stadium hosts the 2026 World Cup final?</h3>
      <p>MetLife Stadium in the New York/New Jersey area, on 19 July 2026.</p>
      <h3>Where is the opening match?</h3>
      <p>The Estadio Azteca in Mexico City, which becomes the first stadium to host matches at three different World Cups.</p>
      <h3>Which stadiums have roofs or air conditioning?</h3>
      <p>Venues including Atlanta, Dallas, Houston and Los Angeles offer enclosed or climate-controlled environments, valuable for the hottest fixtures.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>16 cities across three nations — the largest World Cup footprint ever staged.</li>
        <li>Estadio Azteca opens the tournament; MetLife Stadium hosts the final.</li>
        <li>Venues split into western, central and eastern clusters to limit group-stage travel.</li>
        <li>Heat, altitude and continental distances make conditions and logistics decisive for every squad.</li>
      </ul>
    `,
  },
  {
    id: 'wc-2026-key-dates',
    title: 'World Cup 2026 Key Dates: Opening Match, Group Stage and the Final',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
    publishedAt: '2026-06-10T09:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Schedule', 'Fixtures', 'Dates'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Azteca_Stadium_-_panoramio.jpg/1280px-Azteca_Stadium_-_panoramio.jpg',
    imageAlt: 'Estadio Azteca, venue of the 2026 World Cup opening match',
    imageCredit: 'Photo: O. Ramirez D. / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'From the Estadio Azteca opener to the MetLife final, here are the dates that shape the 2026 World Cup calendar.',
    body: `
      <p>The 2026 World Cup is the longest and largest in the tournament's history: 48 teams, 104 matches and 39 days of football, running from 11 June to 19 July across the United States, Canada and Mexico. With so many more games than the 64 played in 2022, the calendar is denser and the rhythm different from any World Cup before it. Here is how the schedule breaks down — and what each phase actually means for the teams and for fans planning their viewing.</p>

      <h2>Opening Match — 11 June</h2>
      <p>The tournament kicks off at the iconic Estadio Azteca in Mexico City. The choice is deliberate and symbolic: the Azteca becomes the first stadium ever to host matches at three different World Cups, having staged the 1970 and 1986 finals — including Pelé's Brazil masterclass and Diego Maradona's "Hand of God" quarter-final. Opening at altitude in Mexico City, where the thin air notoriously saps stamina, also sets an early test of conditioning that recurs as a theme throughout this tournament.</p>

      <h2>Group Stage — 11 to 27 June</h2>
      <p>All 48 teams play their three group matches across the opening fortnight. The 12 groups of four feed into a new knockout round, with the top two from each group plus the eight best third-placed teams advancing to a 32-team bracket. Expect a relentless schedule in this window — multiple matches every day, often in overlapping time slots across three time zones — as organisers fit 72 group games into just over two weeks. For neutrals, the final round of group fixtures (kicked off simultaneously within each group to prevent collusion) is traditionally the most dramatic stretch of any World Cup.</p>

      <h2>The Knockout Rounds</h2>
      <p>From the round of 32 onwards, every match is single-elimination — win or go home, with extra time and penalties settling draws. The approximate timeline runs as follows:</p>
      <ul>
        <li><strong>Round of 32</strong> — late June into early July. A brand-new stage created by the 48-team format, and the first true knockout test.</li>
        <li><strong>Round of 16</strong> — early July, narrowing the field to the last eight.</li>
        <li><strong>Quarter-finals</strong> — around 9 to 11 July.</li>
        <li><strong>Semi-finals</strong> — around 14 and 15 July.</li>
        <li><strong>Third-place play-off</strong> — 18 July.</li>
        <li><strong>Final</strong> — 19 July at MetLife Stadium, New York / New Jersey.</li>
      </ul>
      <p>One subtlety worth noting: as the rounds progress, the gaps between matches lengthen, giving the surviving teams more recovery time but also longer to stew on the pressure. The deeper a team goes, the more rest it earns — a reward that can matter enormously in the summer heat.</p>

      <h2>Why This Calendar Is Different</h2>
      <p>The headline change is volume. A team that reaches the final will play <strong>up to eight matches</strong> — one more than the seven required in the 32-team era. Combined with long-haul travel between host cities spread across a continent and temperatures that can climb sharply in June and July, the physical demand on squads is unprecedented. This is why several venues with air-conditioned, roofed stadiums are likely to be favoured for the hottest afternoon kick-offs, and why squad depth and rotation may decide the tournament as much as raw quality.</p>

      <h2>A Note for Fans and Viewers</h2>
      <p>Because matches are spread across North American time zones — from Eastern Time on the US east coast to Pacific Time on the west and in Vancouver — kick-off times will vary widely depending on where each game is staged. International viewers should check the local time of the specific venue rather than assuming a single "World Cup time". The group stage offers the most football per day; the knockout rounds spread out into marquee single fixtures.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>When does the 2026 World Cup start and finish?</h3>
      <p>It runs from 11 June 2026 (opening match at the Estadio Azteca) to the final on 19 July 2026 at MetLife Stadium.</p>
      <h3>How many matches are there in total?</h3>
      <p>104 — up from 64 in 2022 — because of the expansion to 48 teams and the added round of 32.</p>
      <h3>How many games will the winners play?</h3>
      <p>Up to eight, one more than in the previous 32-team format.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>The tournament spans 39 days, 11 June to 19 July, with 104 matches — the biggest World Cup ever.</li>
        <li>The Estadio Azteca opens proceedings; MetLife Stadium hosts the final.</li>
        <li>An extra knockout round and continental travel make scheduling, rest and squad depth decisive.</li>
      </ul>`,
  },
  {
    id: 'wc-winners-history',
    title: 'Every World Cup Winner: A Complete History from 1930 to 2022',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
    publishedAt: '2026-06-07T09:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'History', 'Records', 'Brazil', 'Argentina'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg/1280px-FIFA_World_Cup_Trophy_%28Ank_Kumar%2C_Infosys_Limited%29_02.jpg',
    imageAlt: 'The FIFA World Cup trophy, football’s greatest prize',
    imageCredit: 'Photo: Ank Kumar / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Eight nations have lifted the trophy across 22 tournaments. Here is the full roll of World Cup champions and the records that define them.',
    body: `
      <p>Since the first tournament in Uruguay in 1930, only <strong>eight nations</strong> have lifted the FIFA World Cup across 22 editions. It is one of sport's most exclusive clubs — and a reminder of how hard the trophy is to win. As the 2026 edition begins, here is the complete history of the champions, the eras that shaped the competition, and the records that define it.</p>

      <h2>The Complete Roll of Champions</h2>
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

      <h2>The Early Years (1930–1950)</h2>
      <p>Uruguay won the inaugural 1930 tournament on home soil, fitting for the reigning Olympic champions of the era. Italy then dominated the 1930s with back-to-back titles in 1934 and 1938, becoming the first nation to retain the trophy. After a 12-year gap forced by the Second World War, Uruguay returned to win again in 1950 with the famous "Maracanazo" — silencing a packed Maracanã by beating host Brazil in the decisive match, still regarded as one of football's greatest upsets.</p>

      <h2>The Brazilian Golden Age (1958–1970)</h2>
      <p>Brazil's emergence defined the next era. Inspired by a teenage Pelé, they won in 1958 and 1962, then produced what many consider the greatest team ever to lift the trophy in 1970 — a side of Pelé, Jairzinho, Tostão and Carlos Alberto whose flowing football set the standard for generations. That 1970 triumph let Brazil keep the original Jules Rimet Trophy permanently.</p>

      <h2>European Powers and the Modern Game (1974–2002)</h2>
      <p>West Germany (1974, 1990) and Italy (1982) built dynasties of their own through tactical discipline and tournament savvy, while Argentina announced themselves with home glory in 1978 and Diego Maradona's near-single-handed 1986 triumph. Brazil rejoined the summit in 1994 and 2002, the latter powered by the original Ronaldo, taking them clear at the top of the all-time list with five stars.</p>

      <h2>The European Streak — and Argentina's Answer (2006–2022)</h2>
      <p>The 21st century opened with a remarkable run of four consecutive European champions: Italy (2006), Spain (2010), Germany (2014) and France (2018). Spain's win was historic — their first-ever title, built on the tiki-taka era of Barcelona and the national side. Then, in 2022, Argentina ended the European run by beating France on penalties after a 3–3 classic in Qatar, delivering Lionel Messi the one prize that had eluded him and arguably settling his place among the immortals.</p>

      <h2>Records to Know</h2>
      <ul>
        <li>Brazil are the only nation to appear at every World Cup finals tournament.</li>
        <li>Only eight different countries have ever won; just four of them have won more than twice.</li>
        <li>Every champion to date has come from either Europe or South America.</li>
        <li>No host nation has won since France in 1998 — and no European side has ever won in the Americas.</li>
      </ul>

      <h2>Can a Ninth Nation Break Through?</h2>
      <p>For decades the list barely changed, but the gap between the elite and the rest has narrowed. Croatia have reached two of the last three finals or semi-finals; Morocco became the first African and Arab nation to reach a semi-final in 2022. With 48 teams competing in 2026 and more nations gaining tournament experience, the prospect of a ninth name eventually joining this list feels more plausible than at any point in the competition's history.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>Who has won the most World Cups?</h3>
      <p>Brazil, with five titles (1958, 1962, 1970, 1994, 2002).</p>
      <h3>Who are the current World Cup holders?</h3>
      <p>Argentina, who won in 2022 — their third title.</p>
      <h3>How many different countries have won the World Cup?</h3>
      <p>Eight: Brazil, Germany, Italy, Argentina, France, Uruguay, England and Spain.</p>

      <h2>Key Takeaways</h2>
      <ul>
        <li>Just eight nations have ever won the World Cup; Brazil lead with five.</li>
        <li>Europe and South America have shared every title in history.</li>
        <li>No host has won since 1998, and no European team has triumphed in the Americas.</li>
        <li>With 48 teams in 2026, the door is increasingly open for a ninth name to join the list.</li>
      </ul>
    `,
  },

  // ───────────────────────── SPORTS ─────────────────────────
  {
    id: 'home-article-3-stroll',
    title: 'Aston Martin confirm Stroll to return to action for Canadian Grand Prix',
    category: 'sports',
    categoryLabel: 'Formula 1',
    authorId: 'newsroom',
    publishedAt: '2025-06-11T09:00:00Z',
    tags: ['Formula 1', 'Aston Martin'],
    imageUrl: '/images/aston_martin.png',
    body: `
<p>Aston Martin confirmed that Lance Stroll would return to the cockpit for the Canadian Grand Prix, following his withdrawal from the previous round in Spain. For the Canadian driver, a comeback at his home race in Montreal carried obvious emotional significance — and it drew a line under a difficult few weeks dealing with a recurring hand and wrist problem.</p>
<h2>Why Stroll Sat Out</h2>
<p>The Silverstone-based team announced that Stroll had missed the Spanish round after undergoing a medical procedure, having experienced pain in his hand and wrist. The discomfort was linked to an earlier procedure he underwent in 2023, when he suffered wrist and hand injuries in a cycling accident shortly before the start of that season and raced through significant pain in its opening rounds.</p>
<p>Rather than risk aggravating the issue, the team opted for caution, allowing Stroll time to recover properly before returning to competition.</p>
<h2>A Home Return in Montreal</h2>
<p>After the latest procedure, Stroll was cleared to drive the AMR25 again in front of his home crowd. The Canadian Grand Prix, held on the Circuit Gilles Villeneuve on the Île Notre-Dame in Montreal, is one of the most atmospheric events on the calendar and a special occasion for any Canadian driver.</p>
<p>Stroll made clear how much racing on home soil meant to him:</p>
<blockquote>"I am excited to get back behind the wheel with the team for my home Grand Prix this weekend. I was always going to fight hard to be ready to race in front of the Montreal crowd." — Lance Stroll</blockquote>
<h2>Aston Martin's Bigger Picture</h2>
<p>The return came during a transitional phase for Aston Martin. The team has been steadily building its infrastructure — a new factory and wind tunnel at Silverstone — as part of a long-term ambition to challenge at the front of the grid. With a high-profile technical recruitment drive and major regulation changes on the horizon, the project is geared towards the future as much as the present.</p>
<p>For Stroll, whose family has been central to Aston Martin's Formula 1 involvement, staying fit and in the car is an important part of that continuity as the team develops.</p>
<h2>The Challenge of Racing Injured</h2>
<p>Stroll's situation was a reminder of the physical demands of Formula 1. Drivers endure sustained high g-forces through corners and under braking, placing heavy strain on the neck, arms and hands over a race distance. Competing with a hand or wrist problem is especially punishing given how much load passes through the steering and the controls, which is why the team and driver prioritised a full recovery before his return.</p>
<h2>Frequently Asked Questions</h2>
<h3>Why did Lance Stroll miss the Spanish Grand Prix?</h3>
<p>He sat out after a medical procedure to address pain in his hand and wrist, an issue connected to an earlier 2023 procedure.</p>
<h3>Where is the Canadian Grand Prix held?</h3>
<p>At the Circuit Gilles Villeneuve in Montreal, Stroll's home race.</p>
<h3>What car does Stroll drive?</h3>
<p>He races the Aston Martin AMR25 for the Silverstone-based team.</p>
<h2>Key Takeaways</h2>
<ul>
<li>Lance Stroll returned for the Canadian Grand Prix after missing the previous race in Spain.</li>
<li>His absence followed a procedure for hand and wrist pain linked to a 2023 injury.</li>
<li>The comeback came at his home race in Montreal, a special occasion for the Canadian.</li>
<li>Aston Martin continue to build towards a longer-term challenge at the front of the grid.</li>
</ul>
      `,
    secondaryImageUrl: '/images/fomular_sub.png',
    secondaryBody: `
      <p>"I am excited to get back behind the wheel with the team for my home Grand Prix this weekend," Stroll said. "I was always going to fight hard to be ready to race in front of the Montreal crowd."</p>`,
  },

  // ───────────────────────── WORLD ─────────────────────────

  // ───────────────────────── ESPORTS ─────────────────────────
  {
    id: 'onic-id-champion',
    title: 'ONIC Wins MPL ID Season 15 After Epic 4–3 Showdown',
    category: 'esports',
    categoryLabel: 'MLBB',
    authorId: 'newsroom',
    publishedAt: '2025-06-15T22:58:00Z',
    isFeatured: true,
    isTrending: true,
    tags: ['Esports', 'MLBB', 'MPL'],
    imageUrl: '/images/onic-id-cham1.png',
    summary:
      'ONIC defeats RRQ in a dramatic Best of 7 final to claim the MPL ID S15 crown and head to MSC 2025.',
    body: `
<p>In one of the most intense grand finals in its history, <strong>ONIC Esports</strong> defeated <strong>RRQ Hoshi</strong> by a narrow <strong>4–3</strong> scoreline to be crowned champions of MPL Indonesia Season 15. The best-of-seven epic between the country's two biggest <em>Mobile Legends: Bang Bang</em> organisations delivered exactly the drama the occasion demanded, and ended with ONIC once again lifting the trophy.</p>
<h2>What Is the MPL?</h2>
<p>The Mobile Legends Professional League (MPL) is the top tier of competitive <em>Mobile Legends: Bang Bang</em>, one of the most popular mobile games in Southeast Asia. The Indonesian division, MPL ID, is widely regarded as the strongest and most fiercely contested region in the world, packing huge live crowds and a passionate online audience. Winning it is a landmark achievement in the mobile esports scene.</p>
<h2>A Grand Final for the Ages</h2>
<p>The series was a rollercoaster of momentum swings. Neither side could pull decisively clear, and the lead changed hands repeatedly as the best-of-seven format stretched all the way to a deciding seventh game. In that final map, ONIC executed a composed, disciplined strategy to close out the title, holding their nerve when it mattered most.</p>
<p>Star players Kairi and Butsss were pivotal throughout, combining individual brilliance with the kind of coordinated team play that has become ONIC's hallmark. Their performances in the clutch moments proved the difference in a final that could have gone either way.</p>
<h2>A Storied Rivalry</h2>
<p>ONIC against RRQ is the defining rivalry of Indonesian Mobile Legends — two heavyweight organisations with large, devoted fan bases who consistently meet at the business end of tournaments. A grand final between them guarantees a spectacle, and this Season 15 decider added another memorable chapter to a rivalry that helps drive the popularity of the entire league.</p>
<h2>MSC and the Esports World Cup Await</h2>
<p>With the title secured, ONIC turn their attention to international competition. As champions they head into the Mid-Season Cup (MSC) with momentum, and alongside runners-up RRQ Hoshi they will represent Indonesia on the global stage. The event forms part of the wider Esports World Cup in Riyadh, Saudi Arabia — the ambitious multi-title festival that has become one of the richest and most prestigious events in competitive gaming.</p>
<p>For ONIC, the challenge now is to translate domestic dominance into international silverware against the best teams from other regions — a step that would further cement their status as one of the premier organisations in the game.</p>
<h2>Frequently Asked Questions</h2>
<h3>Who won MPL Indonesia Season 15?</h3>
<p>ONIC Esports, who beat RRQ Hoshi 4–3 in the grand final.</p>
<h3>What game is the MPL played on?</h3>
<p>Mobile Legends: Bang Bang, a hugely popular mobile MOBA, especially across Southeast Asia.</p>
<h3>What comes next for ONIC?</h3>
<p>They advance to international competition at the Mid-Season Cup, held as part of the Esports World Cup in Riyadh.</p>
<h2>Key Takeaways</h2>
<ul>
<li>ONIC Esports beat RRQ Hoshi 4–3 in a seven-game thriller to win MPL ID Season 15.</li>
<li>MPL Indonesia is regarded as the strongest Mobile Legends region in the world.</li>
<li>Star players Kairi and Butsss led ONIC in the decisive moments.</li>
<li>ONIC and RRQ now represent Indonesia at the MSC, part of the Esports World Cup.</li>
</ul>
      `,
    secondaryImageUrl: '/images/onic-id-cham2.png',
    secondaryBody: `
      <h2>MSC 2025 Bound</h2>
      <p>With this victory, ONIC Esports heads into MSC 2025 in Riyadh with momentum. Alongside runner-up RRQ Hoshi, they will represent Indonesia at the prestigious global tournament as part of the Esports World Cup.</p>`,
  },

  // ───────────────────────── EVERGREEN FEATURES ─────────────────────────
  {
    id: 'feature-womens-football',
    title: 'The Rise of Women’s Football: Why the Women’s Game Is Booming',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
    publishedAt: '2026-06-06T09:00:00Z',
    isTrending: true,
    tags: ['Football', 'Women’s Football', 'Analysis'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Air_Force_Women%27s_Soccer_vs_Siena_%2848629694273%29.jpg/1280px-Air_Force_Women%27s_Soccer_vs_Siena_%2848629694273%29.jpg',
    imageAlt: 'A women’s football match in progress',
    imageCredit: 'Photo: U.S. Air Force (public domain)',
    summary:
      'Record crowds, soaring TV deals and packed stadiums — women’s football has moved from the margins to the mainstream. Here’s what’s driving the surge.',
    body: `
      <p>Women's football is enjoying the fastest growth of any team sport in the world. What was once a niche pursuit now fills major stadiums, commands prime-time broadcast slots and attracts serious commercial investment. Several forces are powering that rise.</p>
      <h2>Record Attendances</h2>
      <p>Domestic and international fixtures have repeatedly broken attendance records in recent seasons, with showpiece matches drawing crowds that rival the men's game. Clubs increasingly stage women's fixtures in their main stadiums rather than smaller training grounds, signalling genuine confidence in demand — and creating the kind of atmosphere that draws new fans back.</p>
      <h2>Investment and Broadcasting</h2>
      <p>Broadcasters and sponsors have followed the audience. Standalone media-rights deals for women's competitions, dedicated streaming coverage and major brand partnerships have created sustainable revenue streams that simply did not exist a decade ago. That money is reinvested into clubs, wages and facilities.</p>
      <h2>Grassroots and Visibility</h2>
      <p>Greater visibility creates a virtuous cycle: more young players take up the game, federations invest in academies, and the talent pool deepens. Major tournaments now reach huge global audiences, inspiring the next generation in a way that was impossible when the women's game was rarely televised.</p>
      <h2>Stars and Role Models</h2>
      <p>Today's leading players have the platform and recognition long enjoyed by their male counterparts — household names with their own sponsorships, fan followings and influence on and off the pitch. Their visibility helps normalise the women's game as elite sport, not a novelty.</p>
      <h2>Challenges That Remain</h2>
      <p>The growth is real but uneven. Pay, facilities and professional contracts still lag in many leagues, and not every market has caught up with the leaders. Sustaining momentum means closing those gaps, not just celebrating record nights.</p>
      <h2>What Comes Next</h2>
      <p>The trajectory is unmistakable: bigger crowds, better pay and deeper talent pools. Women's football is no longer the future of the sport — it is firmly part of its present, and the smart money expects the rise to continue.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>Why is women's football growing so fast?</h3>
      <p>A combination of greater visibility, broadcasting and sponsorship investment, bigger crowds and deeper grassroots participation.</p>
      <h3>What still holds the women's game back?</h3>
      <p>Uneven pay, facilities and professional structures across different leagues and countries.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Record crowds and new media deals have transformed the women's game.</li>
        <li>Visibility drives a virtuous cycle of participation and talent.</li>
        <li>Closing pay and facility gaps is the next challenge.</li>
      </ul>
    `,
  },
  {
    id: 'guide-tennis-grand-slams',
    title: 'The Four Tennis Grand Slams Explained: A Beginner’s Guide',
    category: 'sports',
    categoryLabel: 'Tennis',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
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
      <p>AI-powered assistants now draft emails, summarise documents, translate languages in real time and answer complex questions conversationally. For many people, they have become a first stop for information and a genuine everyday productivity tool, built into phones, browsers and office software.</p>
      <h2>Healthcare</h2>
      <p>In medicine, AI helps clinicians analyse scans, flag early warning signs and accelerate drug discovery. Used as a support tool alongside professionals — not a replacement — it is improving both the speed and accuracy of diagnosis and freeing up clinicians' time.</p>
      <h2>Work and Creativity</h2>
      <p>From writing and design to coding and data analysis, AI is changing how people work — automating repetitive tasks and lowering the barrier to creative and technical projects that once required specialist skills. The result is faster workflows and new possibilities for small teams and individuals.</p>
      <h2>Education and Learning</h2>
      <p>AI tutors and study tools can explain concepts, generate practice questions and adapt to a learner's pace. Used carefully, they make personalised help available far more widely than before — though schools are still working out how to balance assistance with genuine learning.</p>
      <h2>The Open Questions</h2>
      <p>With the benefits come real concerns: data privacy, the reliability of AI-generated information, bias, the impact on jobs, and the need for sensible regulation. Recent events — including governments intervening over national-security concerns — show how quickly the rules around AI can change.</p>
      <h2>What Comes Next</h2>
      <p>Expect AI to become more capable and more deeply embedded, while debate intensifies over how to govern it. How societies answer the open questions will shape whether the technology's promise is realised fairly and safely.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How is AI used in everyday life?</h3>
      <p>In assistants, healthcare support, work and creative tools, and education, among many other areas.</p>
      <h3>What are the main risks of AI?</h3>
      <p>Privacy, unreliable or biased outputs, job impact, and the need for clear regulation.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>AI is already embedded in assistants, healthcare, work and learning.</li>
        <li>It boosts productivity but raises real privacy and reliability concerns.</li>
        <li>Sensible regulation will shape how its benefits are realised.</li>
      </ul>
    `,
  },
  {
    id: 'guide-champions-league-format',
    title: 'The Champions League’s New Format Explained: How the League Phase Works',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-05-31T09:00:00Z',
    tags: ['Esports', 'League of Legends', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/League_of_Legends_Main_Stage.jpg/1280px-League_of_Legends_Main_Stage.jpg',
    imageAlt: 'A League of Legends tournament stage',
    imageCredit: 'Photo: Hilary Murugu / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The biggest event in esports, explained — how teams qualify for League of Legends Worlds and how the tournament is won.',
    body: `
<p>The <strong>League of Legends World Championship</strong>, known universally as <em>Worlds</em>, is the crowning event of the competitive <em>League of Legends</em> calendar and one of the most-watched tournaments in all of esports. Staged each autumn by developer <strong>Riot Games</strong>, it gathers the best teams from every professional region to compete for the sport's most coveted prize. For players, organisations and fans alike, Worlds is the moment a full year of practice, roster changes and regional battles finally counts for something. This explainer breaks down what Worlds is, how teams reach it, how the tournament plays out and why it holds such an outsized place in the esports world.</p>

<h2>What Worlds Is and Why It Matters</h2>
<p>Worlds is an annual, invitation-by-merit championship that pits regional champions and top-performing teams against one another in a single global event. It functions much like a World Cup for <em>League of Legends</em>: the domestic seasons decide who qualifies, but the international stage is where legacies are made. A strong regular season or a domestic title is valuable, yet within the community a Worlds trophy is regarded as the ultimate validation of a team's era.</p>
<p>Its importance goes beyond the players. Worlds drives the narratives that define an entire competitive year, shapes the transfer market, and serves as the showcase Riot uses to demonstrate the health and reach of its game. For sponsors and broadcasters, it is the flagship product of a maturing industry.</p>

<h2>How Teams Qualify Through Regional Leagues</h2>
<p>Qualification runs through the professional leagues that operate across the globe. The most prominent include the <strong>LCK</strong> in Korea, the <strong>LPL</strong> in China, the <strong>LEC</strong> in Europe, and the top-tier league covering the Americas. Additional regions, covering areas such as the Asia-Pacific and other emerging scenes, also send representatives.</p>
<p>Not every region receives the same number of places. Riot allocates slots based on how each region has historically performed on the international stage, so the strongest leagues earn more berths. This is why the leading regions frequently send several teams while smaller regions may send only one.</p>
<ul>
<li>Teams typically qualify by winning or placing highly in their regional championship.</li>
<li>Stronger regions receive more slots, reflecting past international results.</li>
<li>Some places are decided through additional qualifying gauntlets or points systems within a region.</li>
</ul>

<h2>How the Tournament Is Structured</h2>
<p>The exact format has evolved over the years, but the broad shape has stayed consistent. Worlds generally opens with a <strong>play-in stage</strong>, where teams from smaller regions and lower regional seeds compete for the final spots in the main event. From there, the tournament moves into a <strong>group or Swiss stage</strong> that narrows the field, before culminating in a <strong>single-elimination knockout bracket</strong>.</p>
<p>The knockout rounds are played as <strong>best-of-five</strong> series, a demanding format that rewards adaptability, deep champion pools and strategic drafting across multiple games. A single off-day can end a team's run, which adds enormous tension to every quarter-final, semi-final and the grand final itself.</p>

<h2>The Summoner's Cup and the Spectacle</h2>
<p>Champions lift the <strong>Summoner's Cup</strong>, an imposing silver trophy that has become an icon of the sport. Winning it confers lasting prestige, and the players who hoist it are enshrined in the game's history.</p>
<p>The event is staged with the scale of a major sporting occasion. Matches are played in large arenas, often selling out venues across host cities, and the grand final in particular is treated as a cultural showpiece.</p>
<ul>
<li>Elaborate opening ceremonies, frequently blending live music with augmented-reality effects.</li>
<li>Multi-language broadcasts reaching a vast global audience online and in venues.</li>
<li>Production values comparable to traditional televised sport.</li>
</ul>

<h2>Rivalries, Dynasties and Competitive Stakes</h2>
<p>Much of Worlds' drama comes from <strong>regional rivalry</strong>. The Korean and Chinese leagues in particular have traded international dominance, and matches between their representatives carry the weight of national and regional pride. When a Western team topples an East Asian powerhouse, it becomes a landmark moment.</p>
<p>The tournament has also produced <strong>dynasties</strong>: organisations and rosters that string together sustained success and reshape how the game is played. These runs of dominance set the standards that every other team measures itself against, and dethroning a dynasty is treated as a defining achievement.</p>

<h2>Frequently Asked Questions</h2>
<h3>How often is Worlds held?</h3>
<p>Worlds takes place once a year, typically in the autumn, marking the climax of that season's competitive circuit before rosters and the metagame reset for the following year.</p>

<h3>Do all regions get the same number of teams?</h3>
<p>No. Slot allocation is weighted toward regions with stronger international track records, so the most successful leagues send more teams while smaller regions may qualify only a single representative.</p>

<h3>What format are the deciding matches played in?</h3>
<p>The knockout stage is contested in best-of-five series, meaning a team must win three games to advance. This longer format tests strategic depth and the ability to adjust between games.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Worlds is the annual global championship of <em>League of Legends</em>, run by Riot Games and regarded as the sport's ultimate prize.</li>
<li>Teams qualify through regional leagues such as the LCK, LPL, LEC and the Americas league, with stronger regions earning more slots.</li>
<li>The event moves from a play-in through a group or Swiss stage to a single-elimination, best-of-five knockout bracket.</li>
<li>Winners lift the Summoner's Cup amid arena-scale production, fierce regional rivalries and the making of competitive dynasties.</li>
</ul>
      `,
  },

  // ───────────────── EVERGREEN FEATURES WITH REAL IMAGES ─────────────────
  {
    id: 'history-of-football',
    title: 'A Brief History of Football: From Folk Game to Global Spectacle',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-05-28T09:00:00Z',
    tags: ['Basketball', 'Guide', 'NBA'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg/1280px-Tech-Cavaliers_Women%27s_Basketball_game_%282024-03-03%29.jpg',
    imageAlt: 'A college basketball game in progress',
    summary:
      'New to basketball? Here’s a clear guide to the rules, scoring and positions that make the game tick.',
    body: `
<p>Basketball is one of the world's most popular sports, played everywhere from Olympic arenas to school playgrounds and neighbourhood courts. Yet if you are new to the game, the flurry of dribbling, whistles and rapid scoring can look bewildering. This beginner's guide breaks down where basketball came from, how a match is structured, the rules that govern play and the terms you will hear commentators use. By the end you should be able to follow a game with confidence and understand why players do what they do.</p>

<h2>Where Basketball Came From</h2>
<p>Basketball was invented in 1891 by <strong>Dr James Naismith</strong>, a Canadian physical education instructor working in Springfield, Massachusetts. Tasked with devising an indoor activity to keep students active through the winter, he nailed a peach basket to a balcony and wrote down thirteen simple rules. The idea caught on quickly, spread through schools and colleges, and grew into the fast, athletic global sport we know today. The peach baskets are long gone, but the core aim has never changed.</p>

<h2>The Objective and the Teams</h2>
<p>The goal is simple: score more points than your opponent by putting the ball through the raised hoop, while stopping the other side from doing the same. Each team fields <strong>five players</strong> on the court at a time, with substitutes available from the bench. Teams move the ball by dribbling (bouncing it) or passing, and only a player in control of the ball may attempt to score. Because you cannot run while holding the ball, teamwork, movement and quick decision-making matter as much as individual skill.</p>

<h2>The Court and the Hoop</h2>
<p>A basketball court is a rectangular hard surface with a hoop mounted at each end. The rim sits <strong>10 feet (3.05 metres)</strong> above the floor, attached to a backboard. A few key markings shape how the game is played:</p>
<ul>
<li>The <strong>three-point arc</strong>, a curved line beyond which successful shots are worth more.</li>
<li>The <strong>free-throw line</strong>, where players shoot uncontested after certain fouls.</li>
<li>The <strong>key</strong> (also called the paint or lane), the painted rectangle beneath each hoop where special rules apply.</li>
</ul>

<h2>How Scoring Works</h2>
<p>Points are earned in three ways. A field goal made from inside the three-point arc is worth <strong>2 points</strong>. A shot made from beyond that arc counts for <strong>3 points</strong>. A <strong>free throw</strong>, taken from the free-throw line after certain fouls, is worth <strong>1 point</strong>. This scoring system rewards both accuracy from distance and the ability to attack the basket, which is why modern teams value long-range shooting so highly.</p>

<h2>Positions, Old and New</h2>
<p>Traditionally, the five roles are the point guard (the playmaker who directs the offence), the shooting guard (often a strong scorer), the small forward (a versatile all-rounder), the power forward and the centre (typically the tallest players, working near the basket). In the <em>modern</em> game these lines are increasingly blurred. Tall players are now expected to shoot from range, guards defend bigger opponents, and coaches favour flexible line-ups over rigid roles. You will often hear the term <strong>positionless basketball</strong> to describe this shift.</p>

<h2>Game Flow and Key Rules</h2>
<p>A match is split into timed <strong>periods</strong>. The number and length vary by competition: professional leagues and international basketball generally play four quarters, though the quarter length differs between the NBA and FIBA, and college games in the United States are often structured into two halves. The clock stops frequently for fouls, time-outs and the ball going out of play, so real time far exceeds the playing time. Teams take turns in possession, and a <strong>shot clock</strong> forces the attacking side to attempt a shot within a set number of seconds, keeping the game brisk.</p>
<p>Several common violations keep play fair. Learning these will help you understand the referee's whistle:</p>
<ul>
<li><strong>Travelling:</strong> moving your feet illegally without dribbling the ball.</li>
<li><strong>Double dribble:</strong> dribbling, stopping, then dribbling again, or bouncing the ball with both hands.</li>
<li><strong>Backcourt:</strong> taking the ball back over the halfway line once your team has advanced it.</li>
<li><strong>Three seconds:</strong> an attacking player lingering too long in the key.</li>
<li><strong>Shot-clock violation:</strong> failing to shoot before the shot clock expires.</li>
</ul>
<p>Physical contact is policed through <strong>fouls</strong>. A defender who makes illegal contact concedes a foul, which may hand the opponent free throws or possession. Crucially, a player who commits too many fouls is disqualified for the rest of the game, known as <strong>fouling out</strong>. The exact limit differs between leagues, so it is one of those numbers worth checking for the competition you are watching.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does a basketball game last?</h3>
<p>Playing time depends on the competition, but because the clock stops so often for fouls, time-outs and stoppages, a match usually takes well over an hour of real time to complete, and often closer to two hours with breaks.</p>

<h3>What is the difference between the NBA, FIBA and college basketball?</h3>
<p>The NBA is the leading professional league in the United States, FIBA governs international and Olympic competition worldwide, and college basketball is the amateur game played at American universities. They share the same fundamentals but differ in details such as period length, court markings and some rules.</p>

<h3>Why are some shots worth three points?</h3>
<p>Shots taken from beyond the three-point arc are harder because they are further from the basket, so they are rewarded with an extra point. This encourages accurate long-range shooting and has reshaped how modern teams attack.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Basketball was invented in 1891 by Dr James Naismith and is played by two teams of five aiming to score through a hoop set 10 feet (3.05 m) high.</li>
<li>Shots are worth 2 points inside the arc, 3 beyond it and 1 per free throw.</li>
<li>Violations such as travelling, double dribble and shot-clock breaches keep the game flowing fairly, while too many fouls sees a player fouled out.</li>
<li>Core rules are shared across the NBA, FIBA and college basketball, but details like period length and foul limits differ by league.</li>
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
<p>Solar power has moved from the fringes of the energy system to its mainstream, with panels now appearing on suburban rooftops, factory sheds and vast desert arrays alike. Yet for all its visibility, the technology that turns sunlight into usable electricity remains a mystery to many. At its heart lies a remarkable piece of physics that allows a slab of specially treated silicon to generate an electrical current the moment daylight strikes it, with no moving parts and no fuel. This explainer walks through how that process works, how a solar system connects to your home and the wider grid, and why solar has become one of the fastest-growing sources of power in the world.</p>

<h2>The Photovoltaic Effect: Turning Light into Electricity</h2>
<p>The core of a solar panel is the <strong>photovoltaic cell</strong>, usually made from silicon. The word photovoltaic simply combines <em>photo</em> (light) and <em>voltaic</em> (electricity). Each cell contains two thin layers of silicon that have been deliberately treated, or doped, with tiny amounts of other elements so that one layer carries a slight negative charge and the other a slight positive charge. This creates an electric field at the junction between them.</p>
<p>When sunlight hits the cell, packets of light energy called photons knock electrons loose from the silicon atoms. The built-in electric field pushes these freed electrons in one direction, and if the cell is connected to a circuit, they flow as an electric current. This is the photovoltaic effect: light in, electricity out. Crucially, a single cell produces only a small voltage, which is why they are combined in large numbers.</p>

<h2>From Cells to Panels to Systems</h2>
<p>Understanding the terminology helps make sense of how systems are sized and sold. The components build up in stages:</p>
<ul>
<li>A <strong>cell</strong> is the individual silicon unit that generates a small amount of direct current.</li>
<li>A <strong>panel</strong> or <strong>module</strong> is dozens of cells wired together and sealed behind protective glass in a weatherproof frame.</li>
<li>An <strong>array</strong> is a group of panels connected together, sized to match a household or a power station.</li>
</ul>
<p>The electricity produced at this stage is <strong>direct current</strong> (DC), the same steady, one-directional flow supplied by a battery. That is not yet the form of electricity your appliances or the grid can use.</p>

<h2>The Inverter and the Connection to Home and Grid</h2>
<p>Homes, businesses and the electricity network all run on <strong>alternating current</strong> (AC), in which the flow rapidly reverses direction many times each second. The job of converting the panels' DC output into grid-compatible AC falls to the <strong>inverter</strong>, arguably the most important electronic component in any solar installation. The inverter also manages the system, tracking the point at which the panels generate most efficiently and shutting down safely during a power cut.</p>
<p>Once converted, the AC electricity is fed into the property's main fuse board and used directly by whatever is switched on at the time. If the panels are producing more than the building needs, the surplus flows outward to the grid. This is where <strong>net metering</strong> comes in: many regions allow households to export excess power and receive credit or payment for it, effectively using the grid as a giant shared reservoir and offsetting the electricity they draw at night.</p>

<h2>Storing Sunshine: Batteries and Intermittency</h2>
<p>Solar power's obvious limitation is that it only works when the sun shines. Output falls on cloudy days and stops altogether at night, a problem known as <strong>intermittency</strong>. Increasingly, this is addressed with <strong>battery storage</strong>, which captures surplus daytime generation and releases it in the evening when demand peaks. At the scale of the whole grid, operators balance the variability of solar by combining it with other sources, improving demand forecasting, and building interconnections that move power between regions. As battery costs have fallen, home and grid-scale storage have become central to making solar a reliable, round-the-clock contributor.</p>

<h2>Photovoltaic Versus Solar Thermal, and Why Costs Have Fallen</h2>
<p>It is worth distinguishing the photovoltaic panels described here from <strong>solar thermal</strong> technology, which does not generate electricity directly. Solar thermal systems use the sun's heat, either to warm water for domestic use or, in large concentrated plants, to produce steam that drives a turbine. The vast majority of rooftop and utility solar today is photovoltaic.</p>
<p>The extraordinary rise of solar rests largely on cost. Decades of manufacturing improvements, larger factories and better cell efficiency have driven prices down dramatically over the past decade, making solar one of the cheapest ways to generate new electricity in many parts of the world. Falling prices, supportive policies and growing climate concern have together fuelled rapid adoption.</p>

<h2>Environmental Benefits and Limitations</h2>
<p>Once installed, solar panels generate electricity without burning fuel, producing no direct emissions or air pollution and using no water in operation. Over their lifetime, typically measured in decades, they repay the energy used to manufacture them many times over. The limitations are real but manageable: manufacturing has an environmental footprint, panels require land or roof space, and end-of-life recycling is still maturing. On balance, solar remains one of the cleanest large-scale sources of power available.</p>

<h2>Frequently Asked Questions</h2>
<h3>Do solar panels work on cloudy days?</h3>
<p>Yes, though at reduced output. Panels respond to daylight rather than direct sunshine, so they still generate on overcast days, just less than they would under a clear sky. They produce nothing at night.</p>

<h3>What happens to the electricity I do not use?</h3>
<p>Any surplus is either stored in a battery for later or exported to the grid. Under net metering arrangements, exported power typically earns a credit or payment that offsets the electricity you buy at other times.</p>

<h3>How long do solar panels last?</h3>
<p>Most panels are built to operate for decades, with performance declining only gradually over time. The inverter usually has a shorter working life and may need replacing at least once during the system's lifetime.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Photovoltaic cells use the photovoltaic effect to convert sunlight directly into direct current electricity, with no moving parts or fuel.</li>
<li>An inverter converts that DC into AC so it can power a building and feed surplus into the grid, often rewarded through net metering.</li>
<li>Batteries and smarter grid management overcome solar's intermittency, allowing daytime sunshine to be used after dark.</li>
<li>Sharply falling costs have made solar one of the cheapest and cleanest sources of new electricity worldwide.</li>
</ul>
      `,
  },
  {
    id: 'first-marathon-guide',
    title: 'Training for Your First Marathon: A Beginner’s Guide',
    category: 'sports',
    categoryLabel: 'Athletics',
    authorId: 'newsroom',
    publishedAt: '2026-05-26T09:00:00Z',
    tags: ['Athletics', 'Running', 'Health', 'Guide'],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Paris_marathon_2008_16.jpg/1280px-Paris_marathon_2008_16.jpg',
    imageAlt: 'Runners competing in a city marathon',
    summary:
      'Running 42.195 km is a huge but achievable goal. Here’s how beginners can train safely for their first marathon.',
    body: `
<p>Completing a marathon is one of the most rewarding challenges an amateur athlete can set themselves. Covering the full <strong>42.195 km</strong> distance demands months of patient preparation, but the good news is that most healthy adults can reach the start line with a sensible, gradual plan. This beginner's guide explains the core principles of marathon training, from building an initial running base to pacing yourself on race day. Before you begin any new training programme, it is wise to <strong>consult your doctor</strong>, particularly if you have an existing health condition or have not exercised for some time.</p>

<h2>Build a Running Base First</h2>
<p>The single biggest mistake new runners make is jumping straight into a marathon plan without an established habit of regular running. Before you start a structured schedule, aim to run comfortably for around 30 minutes, three or four times a week, for at least a few weeks. This foundation prepares your muscles, tendons and cardiovascular system for the heavier work to come and dramatically reduces your risk of injury.</p>
<p>If you can already jog for half an hour without stopping, you are in a good position to begin. If not, a run-walk approach, alternating gentle jogging with walking breaks, is a proven and safe way to build up. There is no shame in starting slowly; every experienced marathoner began exactly here.</p>

<h2>Choose and Follow a Structured Plan</h2>
<p>Most beginner marathon plans run for <strong>16 to 20 weeks</strong>. A longer plan gives your body more time to adapt and leaves a buffer for the inevitable missed sessions caused by illness, work or life. A typical week includes three to five sessions: a weekly long run, one or two easy runs, and often a strength or cross-training day.</p>
<p>The guiding principle is <em>gradual progression</em>. A widely used rule of thumb is to increase your total weekly distance by no more than roughly ten per cent, giving your body time to strengthen. Resist the urge to do more than the plan asks, even on days you feel strong; consistency over many weeks matters far more than any single heroic session.</p>

<h2>The Long Run and the Value of Easy Pace</h2>
<p>The weekly <strong>long run</strong> is the cornerstone of marathon training. It gradually lengthens week by week, teaching your body to keep moving for extended periods and building the endurance you will rely on come race day. Most plans peak with a longest run of around 30 to 32 km a few weeks before the marathon, rather than the full distance, because the taper and race-day adrenaline carry you the rest of the way.</p>
<p>Crucially, the majority of your running, including the long run, should be done at an <em>easy, conversational pace</em>. You should be able to hold a conversation without gasping. Running too hard, too often is the classic error that leads to burnout and injury. Slow, comfortable mileage builds aerobic fitness far more effectively than constant hard efforts.</p>

<h2>Strength, Cross-Training and Recovery</h2>
<p>Running alone does not make a resilient runner. Regular <strong>strength work</strong>, focusing on the legs, hips and core, helps stabilise your stride and protects vulnerable joints. Simple bodyweight exercises such as squats, lunges, bridges and planks, done once or twice a week, make a real difference.</p>
<p>Cross-training activities such as cycling, swimming or using a cross-trainer build fitness while sparing your legs the repeated impact of running. Equally important is genuine <strong>rest</strong>. Muscles adapt and grow stronger during recovery, not during the workout itself. Prioritise good sleep, take your scheduled rest days seriously, and remember that recovery is part of the training, not a break from it.</p>

<h2>Injury Prevention, Fuelling and Hydration</h2>
<p>Injuries usually stem from doing too much too soon. Listen to your body, distinguish ordinary muscle soreness from sharp or persistent pain, and never run through a genuine injury. Building gradually, wearing suitable running shoes and warming up properly all help keep you healthy through the training block.</p>
<p>On runs lasting longer than about 90 minutes, your body benefits from taking on some carbohydrate to top up its energy stores, alongside sensible hydration. Practise your fuelling and drinking strategy during training long runs so nothing is new on race day. Consider the following during longer efforts:</p>
<ul>
<li>Take small amounts of easily digestible carbohydrate at regular intervals rather than a large amount all at once.</li>
<li>Drink to thirst, avoiding both dehydration and excessive fluid intake.</li>
<li>Test different foods and drinks in training to learn what your stomach tolerates.</li>
</ul>

<h2>Tapering and Race-Day Strategy</h2>
<p>In the final two to three weeks, you <strong>taper</strong>: you reduce your total mileage while keeping some intensity, allowing your body to absorb the training and arrive at the start line fresh. It is normal to feel restless or sluggish during the taper, but trust the process; the hard work is already done.</p>
<p>On race day, the golden rule is to <em>start slowly</em>. The excitement of the crowd tempts almost everyone to set off too fast, only to fade badly in the closing miles. Aim for an even, controlled pace you have rehearsed, break the distance into manageable segments, and keep some energy in reserve for the final stretch. Finishing strong and steady is a far better goal than a fast first half.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does it take to train for a first marathon?</h3>
<p>Most beginners follow a plan of 16 to 20 weeks, but that assumes you can already run comfortably for around 30 minutes. If you are starting from scratch, allow several extra weeks, or even a few months, to build that initial base safely before the formal plan begins.</p>

<h3>Do I need to run the full 42 km in training?</h3>
<p>No. Most beginner plans peak at a longest run of roughly 30 to 32 km. Running the full distance in training offers little extra benefit and greatly increases injury and fatigue risk. The taper and the atmosphere of race day help carry you through the remaining kilometres.</p>

<h3>How many days a week should I run?</h3>
<p>Three to five days is typical for beginners. Three or four running days, supplemented with strength work and cross-training, is plenty to prepare safely while leaving enough recovery time. More is not automatically better, especially in your first training cycle.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Build a comfortable running base before starting a 16 to 20 week marathon plan, and consult your doctor first.</li>
<li>Keep most of your running easy and conversational, and increase mileage gradually to avoid injury.</li>
<li>Support your running with strength work, cross-training, good sleep and genuine rest days.</li>
<li>Practise fuelling and hydration in training, taper before the race, and start the marathon slowly to finish strong.</li>
</ul>
      `,
  },

  // ───────────────────────── BREAKING TECH NEWS ─────────────────────────
  {
    id: 'var-explained',
    title: 'VAR Explained: How the Video Assistant Referee Works in Football',
    category: 'football',
    categoryLabel: 'Football',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-06-11T09:00:00Z',
    tags: ['Tennis', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2013_US_Open_%28Tennis%29_%289651194814%29.jpg/1280px-2013_US_Open_%28Tennis%29_%289651194814%29.jpg',
    imageAlt: 'A professional tennis match',
    imageCredit: 'Photo: Steven Pisano / CC BY 2.0 via Wikimedia Commons',
    summary:
      'Tennis has one of the quirkiest scoring systems in sport. Here’s how points, games, sets and tie-breaks actually work.',
    body: `
<p>Tennis has one of the most charming and confusing scoring systems in all of sport. Newcomers watching their first match often wonder why the score jumps from 15 to 30 to 40, why zero is called <strong>love</strong>, and what on earth the umpire means by <strong>deuce</strong>. Once you understand the logic, though, the whole structure clicks into place. Here is a clear, jargon-free guide to how tennis scoring actually works, from the smallest point right up to match point.</p>

<h2>Points Within a Game</h2>
<p>The smallest unit of tennis scoring is the point, and points build up to win a game. Rather than counting one, two, three, tennis uses its own peculiar sequence. The progression runs like this:</p>
<ul>
<li><strong>0 points</strong> — called <em>love</em></li>
<li><strong>1 point</strong> — called <em>15</em></li>
<li><strong>2 points</strong> — called <em>30</em></li>
<li><strong>3 points</strong> — called <em>40</em></li>
<li><strong>4 points</strong> — wins the game, provided you are two points clear</li>
</ul>
<p>The server's score is always announced first. So if the server has won two points and the receiver one, the umpire calls "30-15". If both players have won the same number of points, the umpire adds "all", as in "15-all" or "30-all".</p>

<h2>Deuce and Advantage</h2>
<p>Here is where many beginners get lost. A game cannot be won by a single point once both players reach 40. When the score is tied at 40-40, it is called <strong>deuce</strong>, and from that moment a player must win two points in a row to take the game.</p>
<p>Win the first point from deuce and you have the <strong>advantage</strong>. Win the next point too and the game is yours. But if you lose the point after gaining advantage, the score slides back to deuce, and the tug-of-war begins again. A single game can therefore swing back and forth through deuce many times before someone finally edges two points clear.</p>

<h2>Games and Sets</h2>
<p>Games in turn build up to win a set. To take a set, a player must win at least <strong>six games</strong> and be ahead by a margin of two. So 6-4 and 6-3 are winning scorelines, but 6-5 is not enough — you would need to press on to 7-5. If the set reaches 6-6, a tie-break is usually played to decide it.</p>
<p>Matches are then decided by winning a majority of sets. There are two common formats:</p>
<ul>
<li><strong>Best-of-three sets</strong> — the first player to win two sets takes the match. This is standard for most professional matches, including all women's singles.</li>
<li><strong>Best-of-five sets</strong> — the first to win three sets wins. This longer format is used for men's singles at the four Grand Slam tournaments, producing some famously marathon encounters.</li>
</ul>

<h2>The Tie-Break</h2>
<p>The tie-break was introduced to stop sets dragging on endlessly when neither player could pull two games clear. When a set reaches 6-6, players contest a tie-break instead of continuing game by game. In a standard tie-break, points are counted in plain numbers — one, two, three — and the first to reach <strong>seven points</strong> with a margin of at least two wins the set, which is then recorded as 7-6.</p>
<p>Players change ends during the tie-break, and the serve rotates between them in a set pattern rather than staying with one player. If the tie-break itself reaches 6-6, it simply continues until someone leads by two, so a tie-break can stretch well beyond seven points.</p>

<h2>Final-Set Formats</h2>
<p>For years the deciding set caused headaches, because some tournaments refused to use a tie-break in the final set. That meant the last set had to be won by two clear games, occasionally leading to enormous scorelines and matches lasting many hours. To bring consistency and protect players, the Grand Slams agreed on a shared solution.</p>
<p>Today, when the final set reaches 6-6, the major championships use a <strong>ten-point tie-break</strong> — sometimes called a match tie-break — where the first player to reach ten points, again by a margin of two, wins the whole match. This keeps thrilling finishes intact while preventing the never-ending deciders of the past.</p>

<h2>Why Do We Say Love and Deuce?</h2>
<p>The quirky vocabulary has roots stretching back centuries. The most popular explanation for <em>love</em> is that it derives from the French word <em>l'oeuf</em>, meaning "the egg", because a zero on the scoreboard resembles an egg — much like calling a score of nought a "duck's egg" in other games. Another theory suggests it comes from playing "for love", meaning for nothing rather than for money.</p>
<p><em>Deuce</em> is thought to come from the French phrase <em>a deux</em> or <em>deux du jeu</em>, signalling that two consecutive points are still needed to settle the game. The origins of the 15-30-40 sequence are murkier, but a common theory links them to a clock face, with points marked at the quarter-hours; 45 was likely shortened to 40 over time for ease of calling.</p>

<h2>Frequently Asked Questions</h2>
<h3>Why is zero called love in tennis?</h3>
<p>The widely accepted explanation is that love comes from the French <em>l'oeuf</em>, "the egg", because the shape of a zero looks like an egg. An alternative theory holds that playing "for love" meant playing for no stakes, and the term simply stuck to describe a score of nothing.</p>

<h3>What is the difference between a game, a set and a match?</h3>
<p>A game is won by taking four points with a two-point margin. A set is won by taking at least six games with a two-point margin, usually settled by a tie-break at 6-6. A match is won by taking the majority of sets — two in a best-of-three, or three in a best-of-five.</p>

<h3>What happens if a tie-break reaches 6-6?</h3>
<p>Play simply continues. A standard tie-break is won at seven points, but only if a player is two points ahead. At 6-6 in the tie-break, players keep going until one of them leads by two, so the tie-break can extend well past seven.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Points run love, 15, 30, 40, and a game needs four points won by a two-point margin.</li>
<li>At 40-40 the game reaches deuce, and a player must win two points in a row to close it out.</li>
<li>Sets require six games won by two, with a tie-break usually deciding matters at 6-6.</li>
<li>Matches are best-of-three or best-of-five, with the majors now using a ten-point tie-break to settle the final set.</li>
</ul>
      `,
  },
  {
    id: 'dota-the-international',
    title: 'The International: How Dota 2’s Biggest Tournament Works',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-06-08T09:00:00Z',
    tags: ['Football', 'Rules', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Crowd_at_Dora_Stadium.jpg/1280px-Crowd_at_Dora_Stadium.jpg',
    imageAlt: 'A football crowd at a stadium',
    imageCredit: 'Photo: TrickyH / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Offside is football’s most argued-about rule. Here’s the simple version of what it actually means.',
    body: `
<p>Few laws in football provoke as much passion, confusion and pub-table debate as the offside rule. It has been rewritten, reinterpreted and dissected more than almost any other part of the game, yet supporters, pundits and even players still argue over what it actually means. At its heart the rule is simple: it exists to stop attackers from loitering next to the goal and waiting for an easy tap-in. Putting that principle into practice, however, is where things become gloriously complicated. Here is a clear, up-to-date guide to how offside really works.</p>

<h2>What Counts as an Offside Position</h2>
<p>A player is in an <strong>offside position</strong> if they are in the opponents' half and nearer to the opponents' goal line than both the ball and the second-to-last defender. In most situations the last defender is the goalkeeper, so the rule effectively means being beyond the last outfield defender. It is worth stressing that any part of the body a player can legally score with counts when judging the line, so the arms and hands are ignored but the head, torso and feet are all measured.</p>
<p>Crucially, simply standing in an offside position is <em>not</em> an offence. The laws are careful to distinguish position from punishment, and that distinction is the source of much of the confusion around the modern game.</p>

<h2>Position Versus Offence: Active Play</h2>
<p>A player is only penalised if, at the moment a teammate plays or touches the ball, they are in an offside position <em>and</em> become involved in active play. The laws define three ways this can happen:</p>
<ul>
<li><strong>Interfering with play</strong> — touching or playing the ball passed or touched by a teammate.</li>
<li><strong>Interfering with an opponent</strong> — preventing an opponent from playing the ball, for example by blocking their line of vision or challenging them for it.</li>
<li><strong>Gaining an advantage</strong> — playing a ball that has rebounded off the goalpost, crossbar, an opponent or a match official while in an offside position.</li>
</ul>
<p>This is why you often see an attacker standing in an offside position with play waved on. If they never touch the ball and never affect an opponent, no offence has occurred.</p>

<h2>Situations Where You Cannot Be Offside</h2>
<p>Several circumstances make offside impossible, and knowing them clears up a great deal of misunderstanding:</p>
<ul>
<li>A player in their <strong>own half</strong> of the pitch when the ball is played cannot be offside.</li>
<li>A player <strong>level</strong> with the second-to-last defender, or level with the last two defenders, is onside.</li>
<li>A player who receives the ball directly from a <strong>throw-in, corner kick or goal kick</strong> cannot be offside, regardless of position.</li>
</ul>
<p>That last point surprises many fans. A striker can stand behind the entire defence at a corner and still score legally, because offside does not apply to those set pieces.</p>

<h2>How the Offside Line Is Judged</h2>
<p>The decisive moment is when the ball is played by the attacking teammate, not when it is received. Assistant referees must effectively freeze that instant in their minds while tracking both the passer and the runner. Given that top players sprint at high speed, judging a marginal call with the naked eye is extraordinarily difficult, and honest human error is inevitable. This is precisely the gap that technology was introduced to close.</p>

<h2>VAR and Semi-Automated Offside Technology</h2>
<p>The Video Assistant Referee (VAR) system allows offside calls in the build-up to a goal to be reviewed. Officials identify the frame where the ball is played and draw lines to compare the attacker and the defender. Early implementations were slow and relied on manually placed lines, which fed accusations that goals were being ruled out by mere millimetres.</p>
<p><strong>Semi-automated offside technology</strong> was developed to speed this up and improve consistency. Using multiple tracking cameras and, in some competitions, a sensor inside the ball, the system pinpoints the exact moment of the pass and the players' body positions, then generates an alert and a clear graphic for the officials. It still requires a human to confirm the decision, hence "semi-automated", but it has dramatically reduced the time taken to reach a verdict.</p>

<h2>Why the Rule Remains Controversial</h2>
<p>Even with cameras and sensors, offside divides opinion. Many argue that ruling out goals for a shoulder or toe being fractionally ahead punishes attacking football and ignores the rule's original spirit. Others counter that a line is a line, and consistency matters more than sentiment. Proposals to reward the attacker in tight calls, or to require "daylight" between players, continue to be debated by lawmakers. As long as the margins are measured in centimetres, the arguments will endure.</p>

<h2>Frequently Asked Questions</h2>
<h3>Can you be offside in your own half?</h3>
<p>No. A player level with or behind the halfway line at the moment the ball is played cannot be offside, however far forward the defence has pushed.</p>

<h3>Is a player offside straight from a corner?</h3>
<p>No. A player cannot be penalised for offside if they receive the ball directly from a corner kick, throw-in or goal kick.</p>

<h3>Does the attacker's arm count for offside?</h3>
<p>No. Only parts of the body with which a player can legally score are considered, so the arms and hands are excluded when the offside line is drawn.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Being in an offside position is not an offence unless the player becomes involved in active play.</li>
<li>You cannot be offside in your own half, when level with the second-to-last defender, or directly from a throw-in, corner or goal kick.</li>
<li>The decisive moment is when the ball is played, not when it is received.</li>
<li>VAR and semi-automated technology have improved accuracy and speed, but tight margins keep the rule fiercely debated.</li>
</ul>
      `,
  },
  {
    id: 'nba-vs-fiba',
    title: 'NBA vs FIBA: How Basketball Rules Differ Around the World',
    category: 'sports',
    categoryLabel: 'Basketball',
    authorId: 'newsroom',
    publishedAt: '2026-06-07T09:00:00Z',
    tags: ['Basketball', 'NBA', 'FIBA', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg/1280px-Minnesota_Lynx_teammates_huddle_on_the_court_in_the_Lynx_vs_Sun_game_at_Target_Center.jpg',
    imageAlt: 'Basketball players on the court',
    imageCredit: 'Photo: Lorie Shaull / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'The NBA and the international FIBA game look similar but play differently. Here are the key rule differences.',
    body: `
      <p>Watch an NBA game and then an Olympic or World Cup basketball match and you will notice the international (FIBA) game feels different. The fundamentals are the same, but several rules are not — and those differences can catch even the world's best players out.</p>
      <h2>Game Length</h2>
      <p>The NBA plays four 12-minute quarters (48 minutes); FIBA plays four 10-minute quarters (40 minutes). NBA games are simply longer, which affects pacing, fatigue and scoring totals.</p>
      <h2>The Court and Three-Point Line</h2>
      <p>The NBA court is slightly larger and its three-point line is farther from the basket than FIBA's. The same shot can therefore be worth different things depending on the competition, and shooters must adjust their range when switching between the two.</p>
      <h2>The Ball and the Paint</h2>
      <p>There are subtle differences in ball specifications and the shape of the key (the painted area), which influence spacing and post play. Players moving between the leagues often need time to recalibrate.</p>
      <h2>Fouls and Defence</h2>
      <ul>
        <li><strong>Fouling out:</strong> players are disqualified after 6 personal fouls in the NBA, but only 5 in FIBA.</li>
        <li><strong>Goaltending:</strong> FIBA allows players to legally play the ball off the rim in situations where the NBA would call goaltending.</li>
        <li><strong>Defensive rules</strong> around three seconds and contact differ subtly, changing how teams set up.</li>
      </ul>
      <h2>Style of Play</h2>
      <p>Shorter games and a closer arc often make FIBA basketball feel more compact, tactical and physical, with a premium on team structure. The NBA's length and spacing tend to reward individual shot-making and pace.</p>
      <h2>Why It Matters</h2>
      <p>NBA stars switching to international duty have to adapt quickly to these rules — which is part of what makes global tournaments such a fascinating test, and why NBA dominance does not always translate to easy international success.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>How long is an NBA game vs a FIBA game?</h3>
      <p>NBA games are 48 minutes (4x12); FIBA games are 40 minutes (4x10).</p>
      <h3>How many fouls before you foul out?</h3>
      <p>Six in the NBA, five under FIBA rules.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>NBA games are longer with a deeper three-point line.</li>
        <li>FIBA uses 5 fouls to foul out and different goaltending rules.</li>
        <li>The rule gaps make global tournaments a genuine test for NBA stars.</li>
      </ul>
    `,
  },
  {
    id: 'battle-royale-explained',
    title: 'What Is a Battle Royale? The Genre Behind PUBG and Fortnite',
    category: 'esports',
    categoryLabel: 'Esports',
    authorId: 'newsroom',
    publishedAt: '2026-06-06T09:00:00Z',
    tags: ['Esports', 'Gaming', 'Battle Royale', 'Guide'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg/1280px-2019_SEA_Games_Esports_Tekken_7_MAS_vs_INA.jpg',
    imageAlt: 'Players competing at an esports event',
    imageCredit: 'Photo: Hariboneagle927 / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'Battle royale became one of gaming’s biggest genres in just a few years. Here’s what defines it and how it took over.',
    body: `
      <p>The battle royale genre exploded in the late 2010s and reshaped gaming. If you have heard of PUBG, Fortnite, Apex Legends or Warzone, you have heard of battle royale — but what actually defines it, and how did it take over the world?</p>
      <h2>The Core Idea</h2>
      <p>Dozens of players — often up to 100 — drop onto a large map with nothing and scavenge for weapons, armour and gear. A <strong>shrinking play zone</strong> forces everyone closer together over time, and the <strong>last player or team standing wins</strong>. Every match starts equal and ends in a single survivor.</p>
      <h2>How It Took Over</h2>
      <p>The format grew out of game mods inspired by survival fiction, was popularised by <em>PlayerUnknown's Battlegrounds</em> (PUBG) in 2017, and then exploded into the mainstream when <em>Fortnite</em> made it free-to-play, colourful and cross-platform. Suddenly the genre was everywhere, from living rooms to phones.</p>
      <h2>The Big Names</h2>
      <ul>
        <li><strong>PUBG:</strong> the realistic title that defined the modern formula.</li>
        <li><strong>Fortnite:</strong> the free, building-based phenomenon that crossed into pop culture.</li>
        <li><strong>Apex Legends:</strong> hero-based, squad-focused and fast-paced.</li>
        <li><strong>Call of Duty: Warzone:</strong> a blockbuster shooter's take on the genre.</li>
      </ul>
      <h2>Why It Works</h2>
      <p>Every match is different, the tension ramps up as the zone closes, and a single great game can come down to one final firefight. The "anyone can win" promise and short, repayable matches make it perfect for both casual play and high-stakes competition.</p>
      <h2>Battle Royale as Esports</h2>
      <p>The genre has produced major esports circuits with large prize pools, though the format poses unique broadcasting challenges — following dozens of players at once is harder than a traditional five-versus-five. Organisers have developed scoring systems that reward both placement and kills to keep competition fair.</p>
      <h2>Frequently Asked Questions</h2>
      <h3>What does "battle royale" mean in gaming?</h3>
      <p>A last-one-standing format where many players fight on a shrinking map until one player or team remains.</p>
      <h3>What was the first big battle royale game?</h3>
      <p>PUBG popularised the modern formula in 2017, before Fortnite took it mainstream.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>Many players, one shrinking map, last one standing wins.</li>
        <li>PUBG defined it; Fortnite made it a global phenomenon.</li>
        <li>Its unpredictability fuels both casual play and esports.</li>
      </ul>
    `,
  },

  // ───────────────── WORLD CUP STARS & LEGENDS ─────────────────
  {
    id: 'messi-world-cup-journey',
    title: 'Lionel Messi: The World Cup Journey to Glory in 2022',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-06-07T10:00:00Z',
    isTrending: true,
    tags: ['Football', 'Lionel Messi', 'Cristiano Ronaldo', 'Feature'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg/1280px-Argentine_-_Portugal_-_Cristiano_Ronaldo.jpg',
    imageAlt: 'Cristiano Ronaldo in action',
    imageCredit: 'Photo: Ludovic Péron / CC BY-SA 3.0 via Wikimedia Commons',
    summary:
      'For more than 15 years Lionel Messi and Cristiano Ronaldo shared the same summit — and pushed each other higher. A clear-eyed look at how their rivalry worked, what set them apart, and why the “who was better” debate misses the point.',
    body: `
      <p>No two athletes in any team sport have spent as long, or as evenly, at the very top as Lionel Messi and Cristiano Ronaldo. From roughly 2008 to 2018 they did not merely lead world football — they monopolised it, sharing all but one Ballon d'Or across a decade and turning every individual award, every Champions League night and every El Clásico into a referendum on which of them was the greater player. This is not another attempt to crown a winner. It is an attempt to explain <em>why</em> the rivalry was so unusually compelling, and what it actually tells us about two completely different ways of being great.</p>

      <h2>Two players who needed each other</h2>
      <p>The first thing to understand is that the rivalry was, in large part, manufactured by circumstance — and then sustained by genuine competitive obsession. Ronaldo's move from Manchester United to Real Madrid in 2009 placed him in the same league as a Barcelona side built around Messi. Suddenly the two best players alive met twice a season, often more, in the most-watched club fixture on earth. The proximity mattered. Each had a permanent, visible benchmark playing 600 kilometres up the motorway, and both have since admitted the other's numbers shaped their own standards.</p>
      <p>That feedback loop is the engine of the whole story. Ronaldo's goal tallies in Madrid — repeatedly clearing 50 in a season — were not normal even by elite standards, and it is hard to separate them from the fact that Messi was simultaneously rewriting Barcelona's record books. They dragged each other into statistical territory football had never seen, and may not see again.</p>

      <h2>Contrasting blueprints for greatness</h2>
      <p>What made the comparison endlessly arguable was that the two men were good at the game in almost opposite ways. Reducing them to a side-by-side helps:</p>
      <ul>
        <li><strong>Messi</strong> — low centre of gravity, impossibly tight close control, and a passing brain that turns him into a playmaker as much as a finisher. His genius is improvisational: he sees and executes things in real time that look pre-planned only in replay.</li>
        <li><strong>Ronaldo</strong> — taller, explosively athletic, two-footed and dominant in the air. His genius is engineered: a relentlessly trained, endlessly adapted goal machine who has reinvented his game — from flying winger to penalty-box predator — to keep scoring as his body changed.</li>
      </ul>
      <p>This is why the debate never resolves. They are not better and worse versions of the same thing; they are the two best examples of two different things. Asking who is better is a little like asking whether a chess grandmaster is better than a sprinter. The honest answer depends entirely on what you value.</p>

      <h2>The trophy ledger — and why it isn't a verdict</h2>
      <p>On silverware, the broad strokes are well known. Messi has won a record eight Ballons d'Or, four Champions Leagues with Barcelona, multiple league titles, the 2021 Copa América and — the trophy that reframed his entire career — the 2022 World Cup. Ronaldo has won five Ballons d'Or, five Champions Leagues across England, Spain and Italy, league titles in three different countries, Euro 2016 with Portugal, and stands as the all-time leading scorer in men's international football.</p>
      <p>People reach for these lists as if they settle the argument. They don't, for a simple reason: the two players' achievements are strong in different categories. Messi's case leans on creative dominance and the World Cup; Ronaldo's leans on goalscoring volume, versatility across leagues and international longevity. A ledger only "proves" a winner if you have already decided which column counts most — and that decision is the actual disagreement.</p>

      <h2>What separated them under pressure</h2>
      <p>One genuinely useful lens is how each man bent the biggest matches to his will. Ronaldo built a reputation as a knockout-stage specialist for Real Madrid, scoring in clusters during their run of Champions League titles and consistently delivering in single-leg, high-stakes games. Messi's defining big-game moments came later and more emotionally — carrying an Argentina side through the 2021 and 2022 international summers after years of falling agonisingly short. The shapes of their careers even rhyme here: Ronaldo front-loaded his trophies, Messi saved his most important one for nearly last.</p>

      <h2>The post-Europe chapter</h2>
      <p>The European phase closed within a year of itself. Ronaldo joined Saudi Arabia's Al-Nassr in early 2023; Messi moved to Inter Miami in Major League Soccer later that year. Plenty of observers read these moves as the end of the story. In practice they extended it — into a debate about legacy, commercial reach and how two players have reshaped leagues far from football's traditional centre. Even geographically separated, they remain the sport's default unit of comparison.</p>

      <h2>The verdict that actually matters</h2>
      <p>Here is the uncomfortable, freeing truth: there is no objective answer, and the search for one has always been the least interesting part of the rivalry. What made Messi and Ronaldo special was not that one of them "won" — it was that two athletes of historic ability spent fifteen years refusing to let the other rest. The rivalry was the prize. Anyone who watched it live witnessed something football had never produced before: not one generational talent, but two, peaking simultaneously and pulling each other beyond every previous ceiling. That, far more than any medal count, is the part worth remembering.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>How many Ballon d'Or awards do Messi and Ronaldo have?</h3>
      <p>Messi has won a record eight; Ronaldo has won five. Between them they dominated the award for well over a decade.</p>
      <h3>Did Messi and Ronaldo ever play together?</h3>
      <p>No. They were rivals throughout their European careers, most famously meeting in El Clásico while at Barcelona and Real Madrid.</p>
      <h3>Who has scored more career goals?</h3>
      <p>Ronaldo leads on total senior career goals, helped by his longevity and international scoring; Messi's tally is bolstered by his creative output and assists. Exact figures shift with every match they play.</p>
      <h2>Key Takeaways</h2>
      <ul>
        <li>The rivalry was sustained by proximity — same league, twice-a-season meetings — and by genuine mutual obsession.</li>
        <li>Messi and Ronaldo represent two opposite models of greatness, which is precisely why no single metric crowns a winner.</li>
        <li>Their trophy hauls are strong in <em>different</em> categories, so the ledger reflects your priorities rather than settling the debate.</li>
        <li>The lasting value of the era was the competition itself — two historic talents peaking at once and dragging each other higher.</li>
      </ul>
    `,
  },
  {
    id: 'greatest-world-cup-goalscorers',
    title: 'The Greatest World Cup Goalscorers of All Time',
    category: 'football',
    categoryLabel: 'World Cup',
    authorId: 'newsroom',
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
    authorId: 'newsroom',
    publishedAt: '2026-06-05T10:00:00Z',
    isWorldCup: true,
    tags: ['World Cup', 'Lionel Messi', 'Cristiano Ronaldo', 'Analysis'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg/1280px-FWC_2018_-_Group_D_-_ARG_v_ISL_-_Messi_penalty_kick.jpg',
    imageAlt: 'Lionel Messi taking a penalty for Argentina',
    imageCredit: 'Photo: Voltmetro / CC BY-SA 4.0 via Wikimedia Commons',
    summary:
      'Both icons are in the twilight of their careers. The 2026 World Cup could be the final tournament for two of the greatest players ever.',
    body: `
<p>The 2026 World Cup arrives at a poignant moment for football. It may be the last time supporters see Lionel Messi and Cristiano Ronaldo — the two players who defined a generation — grace the game's biggest stage. For more than fifteen years they set the standards by which everyone else was measured. Now, in the twilight of their careers, a final tournament together would feel like the closing of an era.</p>
<h2>The Age Factor</h2>
<p>Time is the one opponent neither man can beat indefinitely. By the time the tournament kicks off, Ronaldo will be 41 and Messi will be well into his late thirties. Sustaining elite international form at that age is extraordinarily rare; the physical demands of a summer World Cup, played in the heat of North America across long distances, would test even players half their age. That difficulty is exactly what lends every possible appearance a heightened sense of occasion.</p>
<p>Both have already defied the usual career arc. Where most greats fade quietly in their early thirties, Messi and Ronaldo have continued to influence matches years later — a testament to their professionalism, adaptability and sheer will.</p>
<h2>Two Different Stories, Two Different Stakes</h2>
<p>What makes the prospect so compelling is that the two men arrive with opposite motivations. Messi comes as a world champion, having finally lifted the trophy in 2022 to complete his collection. He has nothing left to prove and can play with the freedom of a man who has already written his ending.</p>
<p>Ronaldo's story is unfinished. The World Cup is the one major honour that has eluded him throughout a glittering career, and 2026 may represent his final chance to chase it. Those contrasting stakes — one seeking a fairytale farewell, the other a last shot at the only prize missing — make their respective campaigns fascinating for very different reasons.</p>
<h2>Life After Europe</h2>
<p>The pair's club journeys have already taken them beyond football's traditional centres. Ronaldo moved to Saudi Arabian football, while Messi joined Major League Soccer in the United States. Far from ending their stories, these moves extended them, keeping both players competitive and visible while reshaping the leagues they joined. That continued exposure means both could still arrive at a World Cup sharp and match-fit, rather than winding down.</p>
<h2>A Farewell to an Era</h2>
<p>Whatever unfolds on the pitch, 2026 feels like the final chapter of the Messi–Ronaldo age. For a generation of fans who grew up watching them trade Ballon d'Or awards, Champions League nights and records, it is a tournament to savour. Football rarely produces one generational talent at a time, let alone two who peaked simultaneously and pushed each other higher for well over a decade.</p>
<p>Even if their roles are reduced and their minutes limited, the mere presence of both at the same World Cup would be a fitting send-off — a chance for supporters everywhere to appreciate what may not come again for a very long time.</p>
<h2>Frequently Asked Questions</h2>
<h3>How old will Messi and Ronaldo be at the 2026 World Cup?</h3>
<p>Ronaldo will be 41, and Messi will be in his late thirties — ages at which competing at the top of international football is exceptionally rare.</p>
<h3>Has Messi won the World Cup?</h3>
<p>Yes. He captained Argentina to victory in 2022, completing his set of major honours. Ronaldo has never won the tournament.</p>
<h3>Where do Messi and Ronaldo play their club football now?</h3>
<p>Messi plays in Major League Soccer in the United States, while Ronaldo plays in Saudi Arabia.</p>
<h2>Key Takeaways</h2>
<ul>
<li>2026 could be the final World Cup for both Lionel Messi and Cristiano Ronaldo.</li>
<li>Their ages make sustained elite form a genuine challenge, adding to the sense of occasion.</li>
<li>Messi arrives as a world champion with nothing to prove; Ronaldo still chases his one missing prize.</li>
<li>For a generation of fans, the tournament marks the closing of a defining football era.</li>
</ul>
<p><em>This article is analysis and opinion.</em></p>
      `,
  },
];

export const LOCAL_ARTICLES: Article[] = RAW.map(build);
