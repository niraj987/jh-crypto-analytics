import { RAGDocument } from '../types/index.js';

export const CRYPTO_KNOWLEDGE_BASE: RAGDocument[] = [
  {
    id: 'kb-halving-2024',
    title: 'Post-Halving Supply Shock & Institutional ETF Absorption Regime',
    category: 'HALVING_CYCLE',
    tags: ['BTC', 'Halving', 'ETFs', 'Supply Shock', 'Macro'],
    content: `Historical analysis of Bitcoin post-halving eras shows structural supply constriction. In the 2024 epoch, daily mined issuance dropped from 900 BTC to 450 BTC. Concurrently, US Spot Bitcoin ETFs absorbed an average of 3x to 5x daily production during net inflow regimes. Historically, market inflection occurs 150 to 180 days post-halving, transitioning from re-accumulation ranges into exponential parabolic price discovery. Key indicator: MVRV Z-Score staying above 1.8 indicates sustained structural bull trend.`
  },
  {
    id: 'kb-eth-layer1-rotation',
    title: 'Capital Flow Rotation: L1 Ecosystems & DeFi Value Accrual',
    category: 'MACRO_REGIME',
    tags: ['ETH', 'SOL', 'AVAX', 'Layer 1', 'Rotation', 'DeFi'],
    content: `Crypto market capital flows follow a deterministic 4-stage cascade: Stage 1: Bitcoin dominance surge as smart capital enters digital gold; Stage 2: Ethereum expansion as ETH/BTC forms a structural reversal floor; Stage 3: High-throughput Layer-1s (Solana, Avalanche, Cardano) experience velocity spikes as active decentralized addresses and DEX volumes surge; Stage 4: Widespread altcoin and meme frenzy. When Solana DEX volume overtakes Ethereum mainnet, SOL/ETH ratio trends upwards towards 0.08-0.12.`
  },
  {
    id: 'kb-rsi-macd-reversal',
    title: 'Quantitative Divergence & Trend Exhaustion Identification',
    category: 'TECHNICAL_PATTERN',
    tags: ['Technical', 'RSI', 'MACD', 'Divergence', 'Bollinger'],
    content: `High-probability technical reversal setups across crypto assets are defined by multi-timeframe indicator confluence: 1. Daily RSI falling below 32 followed by higher lows while price prints lower lows (Regular Bullish Divergence); 2. MACD histogram inflection from deep negative crimson to ascending pale red, preceding a zero-line signal line crossover; 3. Bollinger Band width (BBW) contracting to 6-month lows, signaling an impending volatility breakout (expansion phase). When price closes above the 50-day SMA following BB squeeze, win rate for 14-day upside exceeds 74%.`
  },
  {
    id: 'kb-meme-liquidity-velocity',
    title: 'Meme Token Speculative Velocity & Liquidity Cycles',
    category: 'SENTIMENT_CATALYST',
    tags: ['DOGE', 'SHIB', 'PEPE', 'WIF', 'BONK', 'FLOKI', 'Meme'],
    content: `Meme token market behavior differs fundamentally from utility tokens. Valuations are driven strictly by reflexivity, social mindshare velocity, and retail unit-bias. In peak risk-on environments, meme tokens trade at high beta (2.5x to 4x relative to BTC). Key warning signals: When RSI exceeds 85 on the daily chart and 24-hour turnover exceeds circulating market cap by >40%, top-exhaustion risk is critical (>80% probability of a 30-50% pullback). Conversely, prolonged accumulation above the 200 EMA with declining exchange balances triggers explosive short squeezes.`
  },
  {
    id: 'kb-onchain-funding-whale',
    title: 'Perpetual Futures Funding Overheat & Whale Net Outflow Signatures',
    category: 'ONCHAIN_METRICS',
    tags: ['On-Chain', 'Funding Rate', 'Whales', 'Open Interest', 'Liquidation'],
    content: `Derivatives microstructure governs short-term price pivots. When perpetual funding rates exceed +0.06% per 8-hour epoch alongside all-time highs in Open Interest (OI), the market becomes structurally overleveraged to the upside, creating extreme vulnerability to long-squeeze cascade liquidations. Conversely, negative funding rates (-0.01% to -0.05%) during spot exchange net outflows indicate aggressive whale spot absorption while late retail traders short, forming prime short squeeze conditions with upside targets at 1.618 Fibonacci extensions.`
  },
  {
    id: 'kb-solana-defi-scaling',
    title: 'Solana High-Velocity Ecosystem & Fee Capture Trajectory',
    category: 'ONCHAIN_METRICS',
    tags: ['SOL', 'DeFi', 'DEX', 'TPS', 'Infrastructure'],
    content: `Solana's high TPS and localized fee markets create hyper-efficient liquidity routing for DEX protocols like Raydium, Orca, and Jupiter. When daily active active wallets sustain above 2 million and priority fees surge, network staking yields increase, driving SOL lockups. In historical bull regimes, Solana achieves sustained price appreciation with 20-day EMA acting as dynamic trailing support.`
  },
  {
    id: 'kb-fed-rate-liquidity',
    title: 'Macro Global M2 Expansion & Central Bank Rate Easing Regimes',
    category: 'MACRO_REGIME',
    tags: ['Macro', 'Interest Rates', 'Fed', 'Global M2', 'Inflation'],
    content: `Cryptocurrencies trade as high-sensitivity liquidity sponges. Over a 10-year regression, Bitcoin and top-tier crypto assets exhibit a +0.82 correlation with Global M2 money supply growth with an average lead lag of 60 to 90 days. During Federal Reserve rate cut cycles paired with Treasury General Account (TGA) depletion, risk assets undergo aggressive multiple expansion. In this regime, pullbacks to the 200-day simple moving average (SMA) represent asymmetric risk/reward accumulation zones.`
  }
];

