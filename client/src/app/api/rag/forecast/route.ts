import { NextRequest, NextResponse } from 'next/server';
import { getFallbackForecast } from '@/lib/offlineFallback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = (searchParams.get('symbol') || 'BTC').toUpperCase();
    const result = getFallbackForecast(symbol);

    return NextResponse.json({
      success: true,
      symbol,
      ...result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'RAG forecast computation failed' },
      { status: 500 }
    );
  }
}

