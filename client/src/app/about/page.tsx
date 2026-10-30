'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Network, 
  Cpu, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Zap, 
  SlidersHorizontal,
  Activity,
  CheckCircle2,
  Sparkles,
  BarChart2,
  Compass
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      id: 'pillar-1',
      step: '01 // SUGGEST (ALPHA)',
      title: 'How Top Firms Suggest (Alpha Generation)',
      subtitle: 'Statistical Significance & Multi-Factor Scoring',
      image: '/photos/behnam-norouzi-hScr17JG74Q-unsplash.jpg',
      badge: 'Information Ratio > 1.5',
      badgeColor: 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800',
      cardBg: 'bg-gradient-to-br from-sky-50/90 via-white to-slate-50 dark:from-[#0d1627] dark:via-[#09101f] dark:to-[#070b16] border-sky-200/90 dark:border-slate-800',
      icon: Zap,
      iconColor: 'text-sky-500',
      formula: 'f(α) = Σ (w_i · Score_i) ∈ [-100, +100]',
      description:
        'Firms do not speculate on gut feeling. Hundreds of mathematical factors (RSI divergence, MACD volume momentum, Bollinger squeeze, on-chain reserve drain) are computed tick-by-tick. When composite alpha exceeds +35 with high statistical significance, the supervisor publishes an automated BUY recommendation with verified targets.',
    },
    {
      id: 'pillar-2',
      step: '02 // RISK (KELLY SIZING)',
      title: 'How Top Firms Manage Risk (Capital Sizing)',
      subtitle: 'Quarter-Kelly Staking & Parametric VaR Limits',
      image: '/photos/gettyimages-2270333130-612x612.jpg',
      badge: 'Quarter-Kelly (0.25x)',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      cardBg: 'bg-gradient-to-br from-emerald-50/90 via-white to-slate-50 dark:from-[#091b1a] dark:via-[#071314] dark:to-[#050e0f] border-emerald-200/90 dark:border-slate-800',
      icon: ShieldCheck,
      iconColor: 'text-emerald-500',
      formula: 'f* = 0.25 × (p · b - q) / b',
      description:
        'Capital preservation always takes precedence over returns. Trading desks downscale the raw Kelly Criterion to Quarter-Kelly (0.25x) to eliminate ruin risk during fat-tailed drawdowns. 14-period ATR envelopes set dynamic stop-losses, and single-desk Value-at-Risk (VaR) is capped strictly at 2% of equity.',
    },
    {
      id: 'pillar-3',
      step: '03 // BUY/SELL (SMART ROUTING)',
      title: 'How Top Firms Buy & Sell (Execution)',
      subtitle: 'TWAP, VWAP Slicing & Anti-MEV Icebergs',
      image: '/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg',
      badge: 'Zero Slippage Routing',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      cardBg: 'bg-gradient-to-br from-amber-50/90 via-white to-slate-50 dark:from-[#1b1509] dark:via-[#140f06] dark:to-[#0d0a04] border-amber-200/90 dark:border-slate-800',
      icon: SlidersHorizontal,
      iconColor: 'text-amber-500',
      formula: 'VWAP = Σ (P_i · V_i) / Σ V_i',
      description:
        'Large institutional block orders (₹10,00,000+) are never sent as market orders. Smart order routers decompose orders into micro child slices over 30 to 60-minute windows using TWAP and VWAP algorithms. Iceberg orders mask cumulative sizes to prevent predatory front-running and MEV sandwich bots.',
    },
    {
      id: 'pillar-4',
      step: '04 // MANAGE (DELTA-NEUTRAL)',
      title: 'How Top Firms Manage Portfolios (Hedging)',
      subtitle: 'Beta Hedging & Cross-Asset Market Neutrality',
      image: '/photos/gettyimages-2112329817-612x612.jpg',
      badge: 'Market Beta ≈ 0.00',
      badgeColor: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800',
      cardBg: 'bg-gradient-to-br from-purple-50/90 via-white to-slate-50 dark:from-[#180d26] dark:via-[#11091b] dark:to-[#0b0512] border-purple-200/90 dark:border-slate-800',
      icon: Layers,
      iconColor: 'text-purple-500',
      formula: 'Hedge = - Σ (w_i · β_i) × Futures_BTC',
      description:
        'Firms neutralize broader directional volatility by maintaining a zero-beta portfolio. They hold high-conviction long positions in strong crypto assets while simultaneously shorting equivalent beta exposure on BTC/ETH perpetuals, unlocking uncorrelated returns regardless of market direction.',
    },
  ];

  const agents = [
    {
      id: 'agent-1',
      title: 'Technical Indicator & Trend Specialist',
      role: 'Multi-Timeframe Confluence & Volatility Envelopes',
      image: '/photos/pexels-thales13-39589930.jpg',
      icon: Zap,
      accentText: 'text-sky-600 dark:text-sky-400',
      accentBg: 'bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-800',
      cardBorder: 'border-sky-300/80 dark:border-sky-800/80',
      tag: '50/200 SMA · RSI(14) · ATR',
      description:
        'Computes dynamic 50/200 SMA golden and death crosses, 20 EMA trailing support, RSI(14) divergence regimes, MACD signal line crossovers, Bollinger Band squeeze breakout states, and 14-period Average True Range (ATR) volatility envelopes in real time.',
    },
    {
      id: 'agent-2',
      title: 'On-Chain & Liquidity Microstructure Specialist',
      role: 'Order Book Depth, Whale Inflows & Exchange Reserves',
      image: '/photos/kanchanara-7cmA9ZL5dDk-unsplash.jpg',
      icon: Database,
      accentText: 'text-emerald-600 dark:text-emerald-400',
      accentBg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
      cardBorder: 'border-emerald-300/80 dark:border-emerald-800/80',
      tag: 'CEX Reserves · Net Inflows · Book Depth',
      description:
        'Monitors centralized exchange net deposit/withdrawal flows, 24-hour volume-to-market-cap velocity, perpetual funding rate overheating, open interest (OI) leverage clusters, and order book bid-ask liquidity absorption.',
    },
    {
      id: 'agent-3',
      title: 'Macro Narrative & RAG Analogs Specialist',
      role: 'Vector Embeddings, Halving Cycles & Fed Liquidity',
      image: '/photos/behnam-norouzi-RDXcFY5g5O4-unsplash.jpg',
      icon: Network,
      accentText: 'text-purple-600 dark:text-purple-400',
      accentBg: 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800',
      cardBorder: 'border-purple-300/80 dark:border-purple-800/80',
      tag: 'Semantic RAG · Halving Supply · M2 Global',
      description:
        'Queries an in-memory semantic vector store containing deep domain knowledge: 2016, 2020, and 2024 post-halving structural supply constriction, Global M2 expansion correlation, Fed interest rate easing cycles, and spot ETF liquidity absorption.',
    },
    {
      id: 'agent-4',
      title: 'Predictive Horizon & Risk Boundary Specialist',
      role: 'Monte Carlo Scenarios & Exact INR Target Invalidation',
      image: '/photos/kanchanara-GnWfl_nnZro-unsplash.jpg',
      icon: TrendingUp,
      accentText: 'text-amber-600 dark:text-amber-400',
      accentBg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
      cardBorder: 'border-amber-300/80 dark:border-amber-800/80',
      tag: 'Bull/Base/Bear · 24h/7d/30d · ₹ Targets',
      description:
        'Synthesizes multi-horizon price envelopes for 24 hours, 7 days, and 30 days. Generates dynamic Bull, Base, and Bear scenarios with explicit probabilities, optimal entry targets, and structural invalidation stop-loss levels in INR.',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-16">
      
      {/* Full Webpage Breadth Header: Exactly 1 to 2 Lines with Multi-Color Mix */}
      <div className="w-full space-y-6 pt-2">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-slate-100 dark:border-slate-800">
            <Image
              src="/jh-logo.png"
              alt="JH Logo"
              width={32}
              height={32}
              className="object-contain"
              unoptimized
            />
          </div>
          <span className="text-xs font-mono font-black text-slate-900 dark:text-white">
            JH CRYPTO ANALYTICS // INSTITUTIONAL METHODOLOGY
          </span>
        </div>

        {/* 1 or 2 lines full width headline with vibrant multi-color gradient */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.18] w-full">
          <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
            How Top Trading Firms Operate
          </span>{' '}
          <span className="text-amber-500 dark:text-amber-400 font-light mx-1">
            &amp;
          </span>{' '}
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 dark:from-teal-300 dark:via-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">
            How Our Engine Executes
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl lg:text-2xl leading-relaxed font-normal w-full max-w-none">
          <strong className="text-slate-900 dark:text-white font-black">JH Crypto Analytics</strong> delivers institutional hedge-fund capabilities to cryptocurrency traders: algorithmic multi-agent consensus, Half-Kelly risk sizing, zero-impact TWAP/VWAP order execution, and semantic RAG forecasting in <strong className="text-emerald-600 dark:text-emerald-400 font-black">Indian Rupee (₹)</strong>.
        </p>
      </div>

      {/* ----------------------------------------------------
          THE 4 PILLARS OF A QUANTITATIVE TRADING FIRM
          (Visible Real Photos + 3D Realistic Card Tiles)
         ---------------------------------------------------- */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                Institutional Prop-Trading Blueprint
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mt-2 tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 dark:from-white dark:via-sky-200 dark:to-emerald-300 bg-clip-text text-transparent">
                  The 4 Pillars of a Quantitative Trading Firm
                </span>
              </h2>
              <p className="text-sm sm:text-base font-mono text-slate-500 dark:text-slate-400 mt-2 font-medium">
                How elite funds discover alpha, control ruin risk, execute block orders without slippage, and maintain delta neutrality
              </p>
            </div>

            <Link
              href="/signals"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-lg transition-all"
            >
              <span>Launch Live Signals Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Realistic 3D Card Tiles with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className={`p-7 sm:p-8 rounded-3xl border ${p.cardBg} shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 group`}
              >
                {/* Header & Badges */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-mono font-black text-slate-500 dark:text-slate-400 uppercase">
                      {p.step}
                    </span>
                    <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full border shadow-sm ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <Icon className={`w-5 h-5 ${p.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {p.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visible Real Institutional Photograph */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-md bg-slate-950 aspect-[16/9] group-hover:border-slate-400 dark:group-hover:border-slate-700 transition-colors">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
                    <span className="font-semibold text-slate-300">{p.subtitle}</span>
                    <span className="text-emerald-400 font-bold">{p.badge}</span>
                  </div>
                </div>

                {/* Mathematical Formula Box */}
                <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 font-mono text-xs flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">Quantitative Proof:</span>
                  <span className="text-slate-900 dark:text-white font-black tracking-wider">{p.formula}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------------------------------------------
          INSTITUTIONAL TRADING FLOOR & STOCHASTIC LAB
         ---------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Trading Floor Desk */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-sky-50/40 dark:from-[#0b1322] dark:via-[#090f1b] dark:to-[#070b14] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 uppercase">Live Operations</span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">Latency: 18ms</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Multi-Screen Trading Floor &amp; Microstructure Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Proprietary execution specialists monitor sub-second order book depth, cross-exchange liquidity imbalances, and tick-by-tick order fills across centralized and decentralized venues.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-950 aspect-[16/10] group">
            <img
              src="/photos/gettyimages-2240153407-612x612.jpg"
              alt="Trading Floor in Action"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
              <span>High-Frequency Order Router</span>
              <span className="text-emerald-400 font-bold">Ed25519 Verified</span>
            </div>
          </div>
        </div>

        {/* Stochastic Research Lab */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-amber-50/40 dark:from-[#171108] dark:via-[#110c05] dark:to-[#0a0703] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">Mathematical Verification</span>
              <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">GBM &amp; Jump Diffusion</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Stochastic Calculus &amp; Risk Research Lab
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every buy/sell suggestion is bounded by verified mathematical mechanics: geometric Brownian motion for volatility corridors, Kelly optimal fractions for trade sizes, and conditional Value-at-Risk limits.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-950 aspect-[16/10] group">
            <img
              src="/photos/pexels-thales13-39398847.jpg"
              alt="Stochastic Equations and Math Lab"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/95 backdrop-blur-md rounded-xl text-white text-[11px] font-mono flex items-center justify-between border border-slate-800">
              <span>Risk Calibration Models</span>
              <span className="text-amber-300 font-bold">Sharpe Ratio &gt; 2.4</span>
            </div>
          </div>
        </div>

      </section>

      {/* ----------------------------------------------------
          THE 4 SPECIALIST QUANTITATIVE AGENTS
         ---------------------------------------------------- */}
      <section className="space-y-8">
        <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black flex items-center gap-3">
            <Cpu className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 dark:from-sky-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
              The 4 Specialist Quantitative Deliberation Agents
            </span>
          </h2>
          <p className="text-sm sm:text-base font-mono text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Independent agents deliberate concurrently and publish verified quantitative insights to the state matrix
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((ag) => {
            const Icon = ag.icon;
            return (
              <div
                key={ag.id}
                className={`p-7 rounded-3xl bg-white dark:bg-[#0c1324] border ${ag.cardBorder} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-5`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${ag.accentBg}`}>
                        <Icon className={`w-5 h-5 ${ag.accentText}`} />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                          {ag.title}
                        </h4>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium">
                          {ag.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Visual Image Preview */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[16/8] mb-4 bg-slate-950">
                    <img
                      src={ag.image}
                      alt={ag.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono font-bold text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800">
                      {ag.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {ag.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-700 dark:text-emerald-400 font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Live Consensus Contributor
                  </span>
                  <span className="text-slate-500 font-bold">Sub-Second Refresh</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to Live Trading Desk */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Analyze Real-Time Crypto Prices in Indian Rupee (₹)?
          </h3>
          <p className="text-emerald-100 text-sm max-w-xl font-normal">
            Step onto the institutional execution desk with live ticking L2 order book, AI consensus matrix, and direct order tickets.
          </p>
        </div>
        <Link
          href="/signals"
          className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-mono font-black text-sm flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap"
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Launch Trading Signals Desk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
