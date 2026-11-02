import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      isConfigured: true,
      apiKeyMasked: 'df55...1779',
      provider: 'CoinSwitch PRO API v2',
      clockDriftMs: 120,
      isSynchronized: true,
    },
  });
}
