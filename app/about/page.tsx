import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/seo/metadata';
import { StaticPage } from '@/presentation/components/StaticPage';
import { siteConfig } from '@/shared/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'About Us',
  description:
    'Who publishes 26News, how our football, World Cup and esports coverage is produced, where our match data comes from, and how to reach us with a correction.',
  path: '/about',
});

/**
 * Editorial transparency page.
 *
 * Everything stated here must be literally true of the site as it ships. An
 * earlier version claimed named per-article authors and a staff of
 * correspondents and sports scientists that do not exist — the kind of
 * unverifiable claim that undermines exactly the trust it is trying to build.
 * If a real named editor is added to `authors.ts`, update the Who Publishes
 * section to name them.
 */
export default function AboutPage() {
  return (
    <StaticPage
      title="About 26News"
      intro={`${siteConfig.name} is a small independent site covering football, the FIFA World Cup and competitive esports.`}
      path="/about"
    >
      <h2>What We Cover</h2>
      <p>
        26News focuses on three closely related areas rather than trying to cover everything:
        football — including transfers, competition formats and the laws of the game — the FIFA
        World Cup, and competitive esports. We also cover Formula 1, where the championship
        regulations and race-weekend decisions reward the same kind of explanation.
      </p>
      <p>
        Our aim is to explain things properly. A good deal of sports coverage assumes you already
        know how a competition works; we would rather write the piece that makes the rule, the
        format or the transfer actually make sense, and keep it accurate as things change.
      </p>

      <h2>Who Publishes 26News</h2>
      <p>
        26News is written and edited by <strong>Elvis</strong>, who founded the site. It is
        independently owned and operated — not a wire service, and not a newsroom of
        correspondents. Every article carries his byline because he writes and edits all of it,
        which is a plainer description of how the site works than a masthead would be.
      </p>
      <p>
        You can reach him directly at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> — corrections
        included.
      </p>

      <h2>How We Source Our Reporting</h2>
      <p>
        We do not conduct our own on-the-ground reporting or interviews. Where we cover a news event
        — a transfer, a result, an official announcement — we are working from primary records such
        as club and governing-body statements, and from reporting published by established outlets.
      </p>
      <p>
        Those sources are listed openly at the foot of each news article, with a link to the
        original, so you can check any claim for yourself and see whose reporting a story rests on.
        Our explanatory and analytical pieces are written by us; where they state a specific fact,
        figure or record, that is cited the same way.
      </p>

      <h2>Accuracy and Corrections</h2>
      <p>We hold ourselves to a short list of commitments:</p>
      <ul>
        <li>
          <strong>Verification:</strong> factual claims are checked against a primary source or
          credible published reporting before publication.
        </li>
        <li>
          <strong>Attribution:</strong> reporting we did not do ourselves is credited and linked,
          not passed off as our own.
        </li>
        <li>
          <strong>No invented detail:</strong> we do not publish placeholder scores, fabricated
          quotes or estimated figures presented as fact. Where something is unconfirmed we say so,
          and where data is unavailable we say that instead of guessing.
        </li>
        <li>
          <strong>Corrections:</strong> errors are corrected promptly, and articles carry a visible
          updated date when they change substantively.
        </li>
        <li>
          <strong>Independence:</strong> advertising has no influence on what we cover or what we
          conclude.
        </li>
      </ul>
      <p>
        If you spot an error, please tell us — corrections sent to the address below are read and
        acted on.
      </p>

      <h2>Where Our World Cup Data Comes From</h2>
      <p>
        The World Cup section is an archive of the 2026 tournament: final results, the twelve group
        tables and the full knockout bracket. Match data is pulled from open football data
        providers — principally the openfootball project, with TheSportsDB as a secondary source.
      </p>
      <p>
        If neither provider can be reached, those pages say that the data is unavailable. They will
        never show made-up fixtures or scores to fill the space.
      </p>

      <h2>How the Site Is Funded</h2>
      <p>
        26News is funded by display advertising. Advertising is labelled where it appears, kept out
        of the body of our articles, and has no bearing on editorial decisions. We do not publish
        sponsored posts presented as editorial, and we do not sell links.
      </p>

      <h2>Contact</h2>
      <p>
        We welcome feedback, corrections and story tips. Reach us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or through our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </StaticPage>
  );
}
