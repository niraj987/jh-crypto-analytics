'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldAlert, 
  ArrowUpRight, 
  Clock, 
  Activity, 
  Lock, 
  ArrowUp, 
  CheckCircle2, 
  Send,
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';

export default function Footer() {
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');
  const [currentTimeUTC, setCurrentTimeUTC] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

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
    <footer className="w-full bg-slate-900 dark:bg-[#070b14] text-slate-400 text-xs mt-24 border-t border-slate-800 transition-colors duration-200">
      
      {/* 1. Real-Time Telemetry & Dual Market Clock Ribbon */}
      <div className="w-full border-b border-slate-800/80 bg-slate-950/80 px-4 sm:px-8 lg:px-12 py-3 font-mono text-[11px]">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">DESK ENGINE v2.4</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Ed25519 Cryptographic Routing</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kelly Bound: &le; 3.5% Equity</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Monte Carlo: 10,000 Iterations</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">{currentTimeIST || '15:30:00 IST'}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-slate-400">
              <span>{currentTimeUTC || '10:00:00 UTC'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Innovative Architectural Bento Matrix */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Bento Card 1: Firm Identity & Verification (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* Crystal-Clear JH Logo Badge */}
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#0c1322] border border-slate-700 p-1 flex items-center justify-center shadow-sm shrink-0">
                  <Image
                    src="/jh-logo.png"
                    alt="JH Crypto Analytics"
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-black text-white text-base tracking-tight">
                    JH <span className="text-amber-400">CRYPTO ANALYTICS</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                    QUANTITATIVE TRADING DESK
                  </span>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-xs">
                Our firm provides advanced algorithmic execution and predictive crypto intelligence denominated in Indian Rupee (&#8377;). Engineered with rigorous mathematical risk boundaries, Level 2 orderbook microstructure inspection, and stochastic forecasting models.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/90 text-[11px] font-mono space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Consensus Nodes:</span>
                <span className="text-emerald-400 font-bold">12 Clusters Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Execution Protocol:</span>
                <span className="text-white font-bold">Ed25519 Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Base Currency:</span>
                <span className="text-amber-400 font-bold">INR (₹) Real-Time</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Terminal Workspaces (2.5 Cols) */}
          <div className="lg:col-span-3 p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h4 className="text-amber-400 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Terminal Workspaces
            </h4>
            <ul className="space-y-3 font-mono font-medium text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">01. Market Overview</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">02. Real-Time Signals</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">03. AI RAG Forecast</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">04. Quant Methodology</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Bento Card 3: Quantitative Solutions (2.5 Cols) */}
          <div className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4">
            <h4 className="text-cyan-400 font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              Quant Engines
            </h4>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <Link href="/signals" className="hover:text-white transition-colors block">
                  Kelly Capital Sizing
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-white transition-colors block">
                  TWAP / VWAP Router
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-white transition-colors block">
                  48-Token Asset Matrix
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-white transition-colors block">
                  Monte Carlo Corridors
                </Link>
              </li>
            </ul>
          </div>

          {/* Bento Card 4: Quantitative Research Dispatch (3 Cols) */}
          <div className="lg:col-span-3 p-6 sm:p-7 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Quant Research Dispatch
              </h4>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Receive weekly market intelligence from our firm, macro liquidity analysis, and quantitative signal reports.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to Research Digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="investor@fund.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Subscribe Dispatch</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 3. Regulatory Compliance & Disclosures Card */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-slate-800/70 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono">
            <ShieldAlert className="w-4 h-4" />
            <span>Risk Disclosure &amp; Regulatory Transparency</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Cryptocurrency assets and digital token derivatives involve significant market risk and high volatility. All quantitative models, consensus matrix signals, and predictive forecasting corridors provided by <strong>our firm</strong> are mathematical formulations intended for analytical risk management and market research purposes only, and do not constitute personal financial or investment advice. Orders routed through connected exchange gateways (CoinSwitch PRO) execute under authenticated Ed25519 signing. Desk capital management protocols and fractional sizing bounds are strictly recommended.
          </p>
        </div>

        {/* 4. Bottom Legal & Back to Top Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} JH Crypto Analytics. Proprietary Quantitative Trading Desk. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/about" className="hover:text-white transition-colors">Methodology</Link>
              <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/signals" className="hover:text-white transition-colors">API Gateway</Link>
            </div>

            {/* Smooth Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
              title="Return to Top of Desk"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}
