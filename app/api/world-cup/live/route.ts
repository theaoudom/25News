import { NextResponse } from 'next/server';
import { footballService } from '@/di/container';

// Server-side proxy so the football API key is never exposed to the client.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const fixtures = await footballService().getLiveScores();
    return NextResponse.json(
      { fixtures, fetchedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json({ fixtures: [], error: 'unavailable' }, { status: 200 });
  }
}
