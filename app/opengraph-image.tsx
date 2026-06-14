import { ImageResponse } from 'next/og';

// Default social-share card (Open Graph + Twitter) for pages that don't supply
// their own image. Rendered as a real PNG at the edge.
export const runtime = 'edge';
export const alt = '26News — World, Sports, Football & Esports';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#c8102e',
          backgroundImage:
            'radial-gradient(circle at 75% 20%, rgba(255,255,255,0.15), transparent 45%), radial-gradient(circle at 15% 90%, rgba(0,0,0,0.25), transparent 40%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 150, fontWeight: 800, letterSpacing: -4 }}>
          <span style={{ color: '#FFD700' }}>26</span>
          <span>News</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 40, opacity: 0.92 }}>
          World · Sports · Football · Esports
        </div>
        <div style={{ marginTop: 36, fontSize: 26, opacity: 0.8 }}>26news.xyz</div>
      </div>
    ),
    { ...size },
  );
}
