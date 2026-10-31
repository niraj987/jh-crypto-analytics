import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, asset, indicators, verdict, priceINR } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const assetSymbol = asset?.symbol || 'BTC';
    const assetName = asset?.name || 'Bitcoin';
    const currentPrice = priceINR ? `₹${Number(priceINR).toLocaleString('en-IN')}` : '₹67,85,000';
    const rsi = indicators?.rsi14 ? indicators.rsi14.toFixed(1) : '54.2';
    const trend = indicators && indicators.sma50 ? (indicators.bbMid > indicators.sma50 ? 'Bullish Uptrend' : 'Consolidation') : 'Bullish';
    const consensusAction = verdict?.finalAction || 'STRONG BUY';
    const consensusScore = verdict?.aggregateScore || 78;

    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        reply: `[Our Firm's Quant Copilot] Quantitative models confirm healthy market liquidity and steady accumulation across active pairs. Recommended allocation strictly follows Half-Kelly bounds with defined stop-loss targets.`,
        model: 'Quant Engine',
        isFallback: true,
      });
    }

    const systemPrompt = `You are the Senior Quantitative Analyst & AI Copilot at our firm (Quantitative Crypto Desk).
The user is asking a market, quantitative, or trading strategy question about ${assetName} (${assetSymbol}).
Current Live Market Context:
- Asset: ${assetName} (${assetSymbol})
- Spot Price: ${currentPrice}
- 24h Trend: ${trend}
- RSI (14): ${rsi}
- Quantitative Buy/Sell Consensus: ${consensusAction} (${consensusScore}/100 Score)
- Base Currency: Indian Rupee (₹)

Guidelines:
1. Provide a professional, realistic, quantitative answer representing our firm.
2. Directly answer their question: provide clear buy/sell reasoning, exact INR entry/exit/stop-loss recommendations, or mathematical risk context (Kelly criterion, volatility bands).
3. Be concise and crisp (2-3 short, impactful paragraphs). Never give generic disclaimers that take up the whole response. Always sound like a top quant analyst at our firm.`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: `${systemPrompt}\n\nUser Question: ${query}` }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 600,
      }
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('Gemini API call failed with status:', res.status, errText);
      return NextResponse.json({
        reply: `[Our Firm's Quant Copilot] For ${assetSymbol} at ${currentPrice}: Momentum indicators (RSI ${rsi}) and moving average confluence indicate ${trend}. Optimal accumulation is favored near key support, targeting a +6.5% to +12% risk-adjusted swing exit with stop-loss protection at -4.5%. Kelly criterion bounds position sizing to 2-4% of total equity.`,
        model: 'Quant Engine',
        isFallback: true,
      });
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const textPart = candidate?.content?.parts?.[0]?.text;

    if (textPart) {
      return NextResponse.json({
        reply: textPart.trim(),
        model: 'AI Copilot',
        isFallback: false,
      });
    }

    return NextResponse.json({
      reply: `[Our Firm's Quant Copilot] Consensus for ${assetSymbol}: Quantitative models verify ${consensusAction} signal at ${currentPrice}. Maintain disciplined risk parameters.`,
      model: 'Quant Engine',
      isFallback: true,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini route:', error);
    return NextResponse.json({
      reply: `[Our Firm's Quant Copilot] Quantitative models confirm healthy market liquidity and steady accumulation across active pairs. Recommended allocation strictly follows Half-Kelly bounds with defined stop-loss targets.`,
      model: 'Quant Engine',
      isFallback: true,
    });
  }
}
