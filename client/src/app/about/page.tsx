'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Network, Cpu, Database, TrendingUp, ShieldCheck, ArrowRight, Layers, Zap, SlidersHorizontal } from 'lucide-react';

export default function AboutPage() {
  const agents = [
    {
      id: 'agent-1',
      title: 'Quantitative Technical Specialist',
      role: 'Multi-Timeframe Trend & Indicator Confluence',
      icon: Zap,
      accentText: 'text-sky-700',
      accentBg: 'bg-sky-50 border-sky-200',
      description:
        'Calculates real-time 50/200 SMA golden and death crosses, 20 EMA dynamic trailing support, RSI(14) divergence regimes, MACD signal line crossovers, Bollinger Band squeeze breakout states, and 14-period Average True Range (ATR) volatility envelopes in Indian Rupee (INR ₹).',
    },
    {
      id: 'agent-2',
      title: 'On-Chain & Liquidity Microstructure Specialist',
      role: 'Order Flow, Exchange Reserves & Whale Balances',
      icon: Database,
      accentText: 'text-emerald-700',
      accentBg: 'bg-emerald-50 border-emerald-200',
      description:
        'Analyzes 24-hour volume-to-market-cap velocity, centralized exchange net inflows and outflows, derivatives funding rate overheating, perpetual open interest (OI) leverage clusters, and order book bid-ask liquidity absorption.',
    },
    {
      id: 'agent-3',
      title: 'Macro & RAG Narrative Intelligence Specialist',
      role: 'Historical Regime Analogs & Vector Retrieval',
      icon: Network,
      accentText: 'text-purple-700',
      accentBg: 'bg-purple-50 border-purple-200',
      description:
        'Leverages an in-memory semantic vector store containing deep domain knowledge: 2016, 2020, and 2024 post-halving structural supply constriction, Global M2 expansion correlation, Fed interest rate easing cycles, and spot ETF liquidity absorption.',
    },
    {
      id: 'agent-4',
      title: 'Predictive Horizon & Scenario Specialist',
      role: 'Monte Carlo Envelopes & Risk Boundaries',
      icon: TrendingUp,
      accentText: 'text-amber-700',
      accentBg: 'bg-amber-50 border-amber-200',
      description:
        'Synthesizes multi-horizon price envelopes for 24 hours, 7 days, and 30 days. Generates dynamic Bull, Base, and Bear scenarios with explicit probabilities, optimal entry targets, and structural invalidation stop-loss levels in INR.',
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 space-y-16">
      
      {/* Hero Intro with Company Logo */}
      <div className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center p-0.5 border border-slate-100">
            <Image
              src="/jh-logo.png"
              alt="JH Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xs font-mono font-black text-slate-900">
            JH CRYPTO ANALYTICS // INSTITUTIONAL METHODOLOGY
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
          How Top Trading Firms Operate &amp; How Our Engine Executes
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          <strong>JH Crypto Analytics</strong> bridges modern quantitative prop-trading mechanics with agentic artificial intelligence. Powered by verified mathematical formulas, smart order execution algorithms (TWAP/VWAP), and real-time Indian Rupee (INR ₹) calculations.
        </p>
      </div>

      {/* DETAILED SECTION: How Trading Firms Work */}
      <section className="p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-10">
        <div className="pb-4 border-b border-slate-100">
          <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            Institutional Prop-Trading Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            The 4 Pillars of a Quantitative Trading Firm
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1 font-medium">
            How institutions suggest trades, manage capital risk, execute orders without slippage, and maintain delta-neutral portfolios
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
          <Image
            src="/trading-firm-flow.svg"
            alt="Quantitative Trading Firm Pipeline"
            width={950}
            height={360}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          
          {/* Pillar 1: How Firms Suggest (Alpha Generation) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 font-black text-sm">
              <Zap className="w-5 h-5 text-sky-600" />
              <span>1. How Firms Suggest (Alpha Discovery)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-normal">
              Firms do not guess. They generate hundreds of mathematical features, test for statistical persistence (Information Ratio above 1.5), and aggregate them into a composite score [-100 to +100]. If the score exceeds +35, the supervisor triggers a BUY recommendation with calculated Entry, Take-Profit, and Stop-Loss.
            </p>
          </div>

          {/* Pillar 2: How Firms Manage Risk (Kelly Sizing) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 font-black text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>2. How Firms Manage Risk (Kelly Sizing)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-normal">
              Capital preservation is paramount. Firms use the Kelly Criterion scaled down to Quarter-Kelly (0.25x). They enforce 14-period ATR dynamic stop-losses and cap daily Value at Risk (VaR) at 2% of total capital.
            </p>
          </div>

          {/* Pillar 3: How Firms Buy & Sell (Smart Execution) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 font-black text-sm">
              <SlidersHorizontal className="w-5 h-5 text-amber-600" />
              <span>3. How Firms Buy &amp; Sell (TWAP &amp; Iceberg)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-normal">
              Block orders of ₹10,00,000 or more are never executed in a single transaction. Instead, smart order routers divide them into micro child orders over 30 to 60 minutes via Time-Weighted (TWAP) and Volume-Weighted (VWAP) algorithms, hiding order sizes via iceberg orders to stop MEV front-runners.
            </p>
          </div>

          {/* Pillar 4: How Firms Manage Portfolio (Delta-Neutral Hedging) */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 font-black text-sm">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>4. How Firms Manage All (Delta-Neutral Hedging)</span>
            </div>
            <p className="text-slate-600 leading-relaxed font-normal">
              Firms achieve market-neutrality (Beta = 0) by longing high-alpha tokens while shorting equivalent beta exposure in BTC/ETH perpetual futures. Even if the broader crypto market crashes 30%, the firm remains protected and captures pure idiosyncratic spread.
            </p>
          </div>

        </div>
      </section>

      {/* Visual Trading Floor & Mathematical Formulas Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Institutional Trading Floor &amp; Analyst Desks
            </h3>
            <p className="text-xs text-slate-600 font-mono">
              Dedicated desks for technical indicators, on-chain order flow, macro RAG vectors, and risk supervisors.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
            <Image
              src="/quant-people-trading.svg"
              alt="People Trading on Institutional Floor"
              width={700}
              height={420}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              Mathematical Risk &amp; Pricing Foundations
            </h3>
            <p className="text-xs text-slate-600 font-mono">
              Stochastic differential equations (GBM), Kelly fractional staking, and Parametric VaR equations.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-950">
            <Image
              src="/quant-math.svg"
              alt="Mathematical Equations"
              width={700}
              height={420}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* 4 Agent Nodes Breakdown */}
      <section className="space-y-8">
        <div className="pb-3 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Cpu className="w-7 h-7 text-emerald-600" />
            <span>The 4 Specialist Quantitative Agents</span>
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1 font-medium">
            Independent agents deliberate concurrently and publish structured state annotations to the state mesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((ag) => {
            const Icon = ag.icon;
            return (
              <div
                key={ag.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${ag.accentBg}`}>
                    <Icon className={`w-6 h-6 ${ag.accentText}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{ag.title}</h3>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{ag.role}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-mono leading-relaxed bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  {ag.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full Stack Tech Specifications */}
      <section className="space-y-8">
        <div className="pb-3 border-b border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
            <Layers className="w-7 h-7 text-emerald-600" />
            <span>Full-Stack Architecture &amp; Deployment</span>
          </h2>
          <p className="text-xs font-mono text-slate-500 mt-1 font-medium">
            Engineered with React, Next.js 14, Express.js, TypeScript, Three.js, and Google GSAP 3
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 font-mono text-xs">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-sky-800 uppercase tracking-wider">Frontend Architecture</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li>• Next.js 14 App Router</li>
              <li>• React 18 &amp; TypeScript</li>
              <li>• Interactive Three.js 3D Models</li>
              <li>• Indian Rupee (INR ₹) Formatting</li>
              <li>• Warm Luminous Glassmorphic Design</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-emerald-800 uppercase tracking-wider">Backend Service</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li>• Express.js REST API</li>
              <li>• TypeScript Strict Type System</li>
              <li>• Real-Time 48-Token Tick Engine</li>
              <li>• Mathematical Indicators Engine</li>
              <li>• Kelly Criterion &amp; TWAP Slicing</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-black text-purple-800 uppercase tracking-wider">Agentic AI &amp; RAG</h4>
            <ul className="space-y-2.5 text-slate-600 font-medium">
              <li>• LangGraph Consensus Engine</li>
              <li>• Multi-Agent Supervisor Nodes</li>
              <li>• Vector Embeddings &amp; Cosine Matching</li>
              <li>• Crypto Knowledge Base (KB-7)</li>
              <li>• Delta-Neutral Risk Modeling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-8">
        <Link
          href="/signals"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-black text-sm shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>Launch Real-Time Quantitative Signals Terminal (INR ₹)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
