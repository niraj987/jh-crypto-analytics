'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Network, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Zap, 
  SlidersHorizontal,
  Activity,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ctx = gsap.context(() => {
        const scrollElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal');
        scrollElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });

      return () => ctx.revert();
    }
  }, []);

  const pillars = [
    {
      id: 'pillar-1',
      title: 'Alpha Formulation & Signal Generation',
      titleGradient: 'text-gradient-sunset',
      subtitle: 'Multi-Factor Confluence & Statistical Significance',
      image: '/photos/behnam-norouzi-hScr17JG74Q-unsplash.jpg',
      icon: Zap,
      accentText: 'text-amber-500 dark:text-amber-400',
      description:
        'Our firm formulates high-conviction market signals by synthesizing multi-timeframe price action, order flow momentum, and structural liquidity boundaries. When statistical significance confirms an edge, our systems generate precision buy and sell guidance with calibrated target zones and defined risk horizons.',
    },
    {
      id: 'pillar-2',
      title: 'Capital Preservation & Risk Calibration',
      titleGradient: 'text-gradient-lime',
      subtitle: 'Dynamic Position Sizing & Ruin Boundaries',
      image: '/photos/gettyimages-2270333130-612x612.jpg',
      icon: ShieldCheck,
      accentText: 'text-lime-500 dark:text-lime-400',
      description:
        'Capital preservation is the foundation of our trading philosophy. Our models scale exposure conservatively using dynamic volatility envelopes to protect portfolio value across severe market shocks, maintaining strict allocation corridors on every active position.',
    },
    {
      id: 'pillar-3',
      title: 'Smart Order Routing & Execution',
      titleGradient: 'text-gradient-cyan',
      subtitle: 'Zero-Impact Slicing & Liquidity Protection',
      image: '/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg',
      icon: SlidersHorizontal,
      accentText: 'text-cyan-500 dark:text-cyan-400',
      description:
        'Large block transactions are executed with surgical care. Intelligent routing schedules slice orders dynamically over time to prevent adverse price drift, front-running, and market impact across major liquidity pools.',
    },
    {
      id: 'pillar-4',
      title: 'Portfolio Hedging & Market Neutrality',
      titleGradient: 'text-gradient-berry',
      subtitle: 'Cross-Asset Balance & Directional Protection',
      image: '/photos/gettyimages-2112329817-612x612.jpg',
      icon: Layers,
      accentText: 'text-fuchsia-500 dark:text-fuchsia-400',
      description:
        'Our strategies seek consistent returns regardless of overall market direction. By balancing directional exposure and maintaining cross-asset hedges, our firm preserves capital stability through both expansion regimes and market corrections.',
    },
  ];

  const agents = [
    {
      id: 'agent-1',
      title: 'Technical Indicator & Trend Specialist',
      titleGradient: 'text-gradient-cyan',
      role: 'Multi-Timeframe Confluence & Volatility Envelopes',
      image: '/photos/pexels-thales13-39589930.jpg',
      icon: Zap,
      accentText: 'text-cyan-600 dark:text-cyan-400',
      description:
        'Monitors dynamic trend structures, moving average confluence, momentum divergences, volatility expansion channels, and price envelope boundaries in real time.',
      points: [
        'Validates 20 EMA, 50 SMA, and 200 SMA trend ribbon envelopes across timeframes',
        'Calculates real-time RSI momentum divergences to detect early trend exhaustion',
        'Identifies volatility breakout channels using dynamic Average True Range corridors',
      ],
    },
    {
      id: 'agent-2',
      title: 'On-Chain & Liquidity Microstructure Specialist',
      titleGradient: 'text-gradient-lime',
      role: 'Order Book Depth & Exchange Liquidity Flows',
      image: '/photos/kanchanara-7cmA9ZL5dDk-unsplash.jpg',
      icon: Database,
      accentText: 'text-lime-600 dark:text-lime-400',
      description:
        'Analyzes centralized and decentralized liquidity depth, institutional volume velocity, perpetual market balances, and bid-ask order absorption across primary trading pairs.',
      points: [
        'Inspects real-time L2 order book bid-to-ask depth imbalance ratios tick-by-tick',
        'Tracks institutional whale wallet accumulation and exchange reserve outflows',
        'Monitors perpetual funding rate overheating and liquidation leverage clusters',
      ],
    },
    {
      id: 'agent-3',
      title: 'Macro Narrative & Semantic Analogs Specialist',
      titleGradient: 'text-gradient-berry',
      role: 'Historical Cycle Dynamics & Global Liquidity Shifts',
      image: '/photos/behnam-norouzi-RDXcFY5g5O4-unsplash.jpg',
      icon: Network,
      accentText: 'text-fuchsia-600 dark:text-fuchsia-400',
      description:
        'Contextualizes present market conditions against multi-cycle history, halving dynamics, institutional adoption trends, and macroeconomic liquidity flows.',
      points: [
        'Cross-references historical post-halving structural supply constriction cycles',
        'Correlates asset price regimes with Global M2 money supply and central bank liquidity',
        'Analyzes institutional ETF net liquidity absorption and sovereign capital flows',
      ],
    },
    {
      id: 'agent-4',
      title: 'Predictive Horizon & Risk Boundary Specialist',
      titleGradient: 'text-gradient-sunset',
      role: 'Multi-Horizon Scenarios & Structural Risk Envelopes',
      image: '/photos/kanchanara-GnWfl_nnZro-unsplash.jpg',
      icon: TrendingUp,
      accentText: 'text-amber-600 dark:text-amber-400',
      description:
        'Synthesizes forward-looking price projections across short and medium horizons, establishing clear probability corridors, entry invalidation points, and capital preservation thresholds.',
      points: [
        'Calculates forward-looking 24-hour, 7-day, and 30-day volatility corridors',
        'Projects dynamic probability corridors across Bull, Base, and Bear scenarios',
        'Establishes structural stop-loss and capital preservation invalidation limits',
      ],
    },
  ];

  return (
    <div className="w-full relative">
      {/* Dynamic Multi-Color Ambient Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] -left-[12%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-sky-500/10 to-indigo-500/0 blur-[140px]" />
        <div className="absolute top-[42%] -right-[12%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-500/10 to-teal-500/0 blur-[140px]" />
        <div className="absolute top-[75%] -left-[12%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-fuchsia-500/10 to-purple-500/0 blur-[150px]" />
      </div>

      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-20 space-y-28">
        
        {/* Full Webpage Breadth Header: Clean, Professional Alignment */}
        <div className="gsap-reveal w-full space-y-6 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>OUR MISSION &amp; CORE IDENTITY</span>
          </div>

          {/* Full width headline with structured multi-color gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.08] w-full">
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
              How Top Trading Firms Operate
            </span>{' '}
            <span className="text-amber-500 dark:text-amber-400 font-light mx-2">
              &amp;
            </span>{' '}
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-500 dark:from-teal-300 dark:via-emerald-400 dark:to-cyan-300 bg-clip-text text-transparent">
              How Our Engine Executes
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal w-full pt-2">
            Our firm delivers advanced quantitative capabilities to digital asset markets: algorithmic multi-agent consensus, disciplined risk calibration, zero-impact order execution, and semantic scenario forecasting across leading liquid cryptocurrencies.
          </p>
        </div>

        {/* ----------------------------------------------------
            THE 4 PILLARS OF A QUANTITATIVE TRADING FIRM
            (Completely Unboxed Expansive Layout - No Card Boxes)
           ---------------------------------------------------- */}
        <section className="gsap-reveal space-y-16">
          <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-end justify-between gap-6">
            <div className="space-y-3 max-w-4xl">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                The 4 Pillars of a Quantitative Trading Firm
              </h2>
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                How elite quantitative desks discover statistical alpha, control drawdown ruin, execute block orders without slippage, and maintain delta neutrality.
              </p>
            </div>

            <Link
              href="/signals"
              className="px-7 py-4 rounded-2xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-black text-xs sm:text-sm flex items-center gap-2.5 shadow-xl transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span>Launch Live Signals Desk</span>
              <ArrowRight className="w-4 h-4 text-amber-400 dark:text-amber-600" />
            </Link>
          </div>

          {/* 4 Unboxed Expansive Architectural Rows */}
          <div className="space-y-24">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={p.id}
                  className="gsap-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-slate-200/60 dark:border-slate-800/60 pb-20"
                >
                  {/* Text Column */}
                  <div className={`space-y-5 ${isEven ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                        <Icon className={`w-5 h-5 ${p.accentText}`} />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                        Pillar 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                      <span className={p.titleGradient}>{p.title}</span>
                    </h3>

                    <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {p.subtitle}
                    </p>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  {/* Image Column (No image overlays) */}
                  <div className={`${isEven ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ maxHeight: '380px', aspectRatio: '16 / 10' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ----------------------------------------------------
            INSTITUTIONAL TRADING FLOOR & STOCHASTIC LAB
            (Unboxed Full Webpage Breadth Presentation)
           ---------------------------------------------------- */}
        <section className="gsap-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-b border-slate-200/80 dark:border-slate-800/80 pb-24">
          
          {/* Trading Floor Desk */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest block">
                Live Operations
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Multi-Screen Trading Floor &amp; Microstructure Desk
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Proprietary execution specialists monitor sub-second order book depth, cross-exchange liquidity imbalances, and tick-by-tick order fills across centralized and decentralized venues.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img
                src="/photos/gettyimages-2240153407-612x612.jpg"
                alt="Trading Floor in Action"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ maxHeight: '360px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

          {/* Stochastic Research Lab */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                Mathematical Verification
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Stochastic Calculus &amp; Risk Research Lab
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Every buy/sell suggestion is bounded by verified mathematical mechanics: dynamic volatility corridors, optimal fractions for trade sizes, and conditional capital preservation limits.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
              <img
                src="/photos/pexels-thales13-39398847.jpg"
                alt="Stochastic Equations and Math Lab"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ maxHeight: '360px', aspectRatio: '16 / 10' }}
              />
            </div>
          </div>

        </section>

        {/* ----------------------------------------------------
            THE 4 SPECIALIST QUANTITATIVE AGENTS
            (Completely Unboxed Expansive Layout - No Card Boxes)
           ---------------------------------------------------- */}
        <section className="gsap-reveal space-y-16">
          <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800/80 space-y-3">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
              The 4 Specialist{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Quantitative Deliberation
              </span>{' '}
              Agents
            </h2>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-4xl">
              Independent analytical agents deliberate concurrently on every market tick and publish verified quantitative insights to the unified consensus state matrix.
            </p>
          </div>

          {/* 4 Unboxed Agent Presentation Rows with Image Animations & Defined Points */}
          <div className="space-y-20">
            {agents.map((ag, idx) => {
              const Icon = ag.icon;
              const isEven = idx % 2 === 1;

              return (
                <div
                  key={ag.id}
                  className="gsap-reveal group grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-slate-200/60 dark:border-slate-800/60 pb-16 transition-all duration-500 hover:translate-x-1"
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-4 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-950 group-hover:border-slate-400 dark:group-hover:border-slate-600 transition-all duration-500">
                      <img
                        src={ag.image}
                        alt={ag.title}
                        className="w-full h-auto object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                        style={{ maxHeight: '280px', aspectRatio: '16 / 10' }}
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`space-y-4 lg:col-span-8 ${isEven ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <Icon className={`w-5 h-5 ${ag.accentText}`} />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                          Agent 0{idx + 1}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black leading-tight">
                          <span className={ag.titleGradient}>{ag.title}</span>
                        </h4>
                      </div>
                    </div>

                    <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                      {ag.role}
                    </p>

                    <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {ag.description}
                    </p>

                    {/* Agent Points */}
                    <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {ag.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA to Live Trading Desk */}
        <div className="gsap-reveal p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-700 to-sky-700 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Launch the Live Trading Desk?
            </h3>
            <p className="text-emerald-100 text-base max-w-2xl font-normal leading-relaxed">
              Step onto our firm&apos;s execution floor with live ticking L2 order book, AI consensus matrix, and direct order tickets.
            </p>
          </div>
          <Link
            href="/signals"
            className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-mono font-black text-sm flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Launch Trading Signals Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
