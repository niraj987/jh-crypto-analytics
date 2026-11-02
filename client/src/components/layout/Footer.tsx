'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldAlert, 
  ArrowUpRight, 
  Clock, 
  Lock, 
  ArrowUp, 
  CheckCircle2, 
  Send,
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { FALLBACK_CATALOG } from '@/lib/offlineFallback';
import { formatINR } from '@/lib/currency';
import { CryptoAsset } from '@/lib/types';

export default function Footer() {
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');
  const [currentTimeUTC, setCurrentTimeUTC] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [catalog, setCatalog] = useState<CryptoAsset[]>(FALLBACK_CATALOG);

  // Live clocks for Indian Standard Time (IST) & UTC
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setCurrentTimeIST(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
      setCurrentTimeUTC(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Real-time catalog polling for dynamic live prices
  useEffect(() => {
    let active = true;
    async function loadCatalog() {
      try {
        const data = await ApiClient.getCatalog();
        if (active && Array.isArray(data) && data.length > 0) {
          setCatalog(data);
        }
      } catch {
        // preserve current catalog state
      }
    }
    loadCatalog();
    const interval = setInterval(loadCatalog, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#eaf2fb] via-[#e2ecf8] to-[#d6e5f6] dark:bg-gradient-to-b dark:from-[#081226] dark:via-[#060e1d] dark:to-[#040813] text-slate-700 dark:text-slate-300 mt-28 border-t border-sky-200/90 dark:border-sky-950/80 transition-colors duration-200">
      
      {/* 1. Real-Time Dual Market Clock Ribbon */}
      <div className="w-full border-b border-sky-200/80 dark:border-sky-900/60 bg-white/70 dark:bg-[#070e1b]/95 backdrop-blur-md px-6 sm:px-10 lg:px-14 py-2.5 font-mono text-xs sm:text-[13px]">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">MARKET OPERATIONS DESK</span>
          </div>
          <div className="flex items-center gap-4 text-slate-800 dark:text-slate-200 font-bold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-slate-900 dark:text-white tracking-wider">{currentTimeIST || '15:30:00 IST'}</span>
            </div>
            <span className="text-slate-400 dark:text-slate-700">|</span>
            <div className="text-slate-600 dark:text-slate-400 tracking-wider">
              <span>{currentTimeUTC || '10:00:00 UTC'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1B. Calm, Readable Real-Time Market Rail: Dynamic Top Gainers, Losers & Benchmarks */}
      <div className="w-full overflow-hidden border-b border-sky-200/60 dark:border-sky-900/40 bg-sky-50/50 dark:bg-[#060c18] py-2.5 text-xs font-mono">
        <div className="flex items-center whitespace-nowrap animate-marquee-slow hover:[animation-play-state:paused]">
          {(() => {
            const topGainers = [...catalog].sort((a, b) => b.change24h - a.change24h).slice(0, 5);
            const topLosers = [...catalog].sort((a, b) => a.change24h - b.change24h).slice(0, 4);
            const benchmarks = catalog.filter((c) => ['BTC', 'ETH', 'SOL', 'BNB'].includes(c.symbol));

            const railItems = [
              ...topGainers.map((c) => ({
                label: 'TOP GAINER',
                pair: `${c.symbol}/INR`,
                price: formatINR(c.currentPrice),
                change: `${c.change24h >= 0 ? '+' : ''}${c.change24h}%`,
                isGain: c.change24h >= 0,
              })),
              ...benchmarks.map((c) => ({
                label: 'BENCHMARK',
                pair: `${c.symbol}/INR`,
                price: formatINR(c.currentPrice),
                change: `${c.change24h >= 0 ? '+' : ''}${c.change24h}%`,
                isGain: c.change24h >= 0,
              })),
              ...topLosers.map((c) => ({
                label: 'TOP LOSER',
                pair: `${c.symbol}/INR`,
                price: formatINR(c.currentPrice),
                change: `${c.change24h >= 0 ? '+' : ''}${c.change24h}%`,
                isGain: c.change24h >= 0,
              })),
            ];

            const repeated = [...railItems, ...railItems];

            return repeated.map((item, idx) => (
              <div key={idx} className="inline-flex items-center gap-2 px-5 py-0.5 border-r border-slate-300/60 dark:border-slate-800">
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.isGain
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {item.label}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{item.pair}</span>
                <span className="text-slate-600 dark:text-slate-400 font-semibold">{item.price}</span>
                <span className={`font-black ${item.isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {item.change}
                </span>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* 2. Open, Freely Spaced Institutional Matrix with Upgraded Font Typography */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Firm Identity & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0c1322] border border-sky-300/80 dark:border-slate-700 p-1.5 flex items-center justify-center shadow-md shrink-0">
                <Image
                  src="/jh-logo.png"
                  alt="JH Crypto Analytics"
                  width={36}
                  height={36}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg sm:text-xl tracking-tight leading-none">
                  JH <span className="text-gradient-gold">CRYPTO ANALYTICS</span>
                </h3>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-400 block font-bold tracking-wider mt-1">
                  QUANTITATIVE TRADING DESK
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Our firm delivers algorithmic execution, disciplined capital risk boundaries, and predictive scenario forecasting across global digital asset markets.
            </p>
          </div>

          {/* Column 2: Terminal Workspaces (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-amber-700 dark:text-amber-400 font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Terminal Desks
            </h4>
            <ul className="space-y-3.5 font-mono text-sm">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">01. Market Overview</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">02. Live Signals Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">03. AI RAG Scenario Forecast</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">04. Quant Methodology</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-purple-500 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quantitative Solutions (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-cyan-700 dark:text-cyan-400 font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Quant Architecture
            </h4>
            <ul className="space-y-3.5 font-mono text-sm">
              <li>
                <Link href="/signals" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors block font-medium">
                  Capital Risk Allocation
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors block font-medium">
                  Smart Order Router
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors block font-medium">
                  48-Asset Matrix
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors block font-medium">
                  Scenario Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quantitative Research Dispatch (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2">
              <h4 className="text-slate-900 dark:text-white font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Quant Research Dispatch
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Receive weekly market intelligence, macro liquidity analysis, and quantitative signal reports directly from our desk.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Subscribed to Research Digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="investor@firm.com"
                  className="w-full bg-white dark:bg-[#070e1b]/90 border border-sky-300/80 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 font-mono focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Dispatch</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 3. Regulatory Compliance & Disclosures (Clean Unboxed Strip) */}
        <div className="mt-14 pt-8 border-t border-sky-200/90 dark:border-slate-800/90 space-y-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Risk Disclosure &amp; Regulatory Transparency</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-5xl font-normal">
            Cryptocurrency assets and digital token derivatives involve significant market risk and price volatility. All quantitative models, consensus matrix signals, and predictive forecasting corridors provided by <strong>our firm</strong> are mathematical formulations intended for analytical risk management and market research purposes only, and do not constitute personal financial advice. Orders routed through connected exchange gateways execute under authenticated cryptographic verification. Capital management protocols and strict risk boundaries are continuously applied.
          </p>
        </div>

        {/* 4. Bottom Legal & Back to Top Strip */}
        <div className="mt-10 pt-6 border-t border-sky-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} JH Crypto Analytics. Proprietary Quantitative Trading Desk. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5">
              <Link href="/about" className="hover:text-slate-950 dark:hover:text-white transition-colors">Methodology</Link>
              <Link href="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-slate-950 dark:hover:text-white transition-colors">Terms</Link>
              <Link href="/signals" className="hover:text-slate-950 dark:hover:text-white transition-colors">API Gateway</Link>
            </div>

            {/* Smooth Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-sky-300/80 dark:border-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              title="Return to Top of Desk"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}
