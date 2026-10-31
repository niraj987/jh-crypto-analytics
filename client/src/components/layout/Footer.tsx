'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldAlert, 
  ShieldCheck,
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
    <footer className="w-full bg-[#0a0f1d] dark:bg-[#050811] text-slate-300 mt-28 border-t border-slate-800/90 transition-colors duration-200">
      
      {/* 1. Real-Time Telemetry & Dual Market Clock Ribbon */}
      <div className="w-full border-b border-slate-800/80 bg-slate-950/90 px-6 sm:px-10 lg:px-14 py-3.5 font-mono text-xs sm:text-[13px]">
        <div className="max-w-[1536px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-white font-bold tracking-tight">Proprietary Analytics Feed Active</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Cryptographic Security Verified</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Multi-Asset Liquidity Matrix</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-amber-400 font-bold bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-800/60">Forex: $1 USD = ₹86.85</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-200 font-bold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-white tracking-wider">{currentTimeIST || '15:30:00 IST'}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="text-slate-400 tracking-wider">
              <span>{currentTimeUTC || '10:00:00 UTC'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Open, Freely Spaced Institutional Matrix with Upgraded Font Typography */}
      <div className="max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-14 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Firm Identity & Mission (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-700 p-1.5 flex items-center justify-center shadow-md shrink-0">
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
                <h3 className="font-black text-white text-lg sm:text-xl tracking-tight leading-none">
                  JH <span className="text-gradient-gold">CRYPTO ANALYTICS</span>
                </h3>
                <span className="text-xs font-mono text-cyan-400 block font-bold tracking-wider mt-1">
                  QUANTITATIVE TRADING DESK
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Our firm provides advanced algorithmic execution, disciplined capital risk boundaries, and predictive scenario forecasting across 48 liquid digital asset pairs.
            </p>

            <div className="text-xs font-mono space-y-1.5 text-slate-400 pt-4 border-t border-slate-800">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <span className="text-slate-200 font-bold">Operational Status: All Desks Live</span>
              </p>
              <p className="text-slate-400">48 Active Digital Asset Pairs</p>
            </div>
          </div>

          {/* Column 2: Terminal Workspaces (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-amber-400 font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Terminal Desks
            </h4>
            <ul className="space-y-3.5 font-mono text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">01. Market Overview</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-300 hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">02. Live Signals Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="text-slate-300 hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">03. AI RAG Scenario Forecast</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-all flex items-center justify-between group">
                  <span className="group-hover:translate-x-1 transition-transform font-bold">04. Quant Methodology</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quantitative Solutions (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-cyan-400 font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Quant Architecture
            </h4>
            <ul className="space-y-3.5 font-mono text-sm">
              <li>
                <Link href="/signals" className="text-slate-300 hover:text-white transition-colors block font-medium">
                  Capital Risk Allocation
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-300 hover:text-white transition-colors block font-medium">
                  Smart Order Router
                </Link>
              </li>
              <li>
                <Link href="/signals" className="text-slate-300 hover:text-white transition-colors block font-medium">
                  48-Asset Matrix
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="text-slate-300 hover:text-white transition-colors block font-medium">
                  Scenario Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quantitative Research Dispatch (3 Cols) */}
          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-2">
              <h4 className="text-white font-mono font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Quant Research Dispatch
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Receive weekly market intelligence, macro liquidity analysis, and quantitative signal reports directly from our desk.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to Research Digest.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="investor@firm.com"
                  className="w-full bg-slate-950/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Subscribe Dispatch</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 3. Regulatory Compliance & Disclosures (Clean Unboxed Strip) */}
        <div className="mt-14 pt-8 border-t border-slate-800/90 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Risk Disclosure &amp; Regulatory Transparency</span>
          </div>
          <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed max-w-5xl font-normal">
            Cryptocurrency assets and digital token derivatives involve significant market risk and price volatility. All quantitative models, consensus matrix signals, and predictive forecasting corridors provided by <strong>our firm</strong> are mathematical formulations intended for analytical risk management and market research purposes only, and do not constitute personal financial advice. Orders routed through connected exchange gateways execute under authenticated cryptographic verification. Capital management protocols and strict risk boundaries are continuously applied.
          </p>
        </div>

        {/* 4. Bottom Legal & Back to Top Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} JH Crypto Analytics. Proprietary Quantitative Trading Desk. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-5">
              <Link href="/about" className="hover:text-white transition-colors">Methodology</Link>
              <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/signals" className="hover:text-white transition-colors">API Gateway</Link>
            </div>

            {/* Smooth Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
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
