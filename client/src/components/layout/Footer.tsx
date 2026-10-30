'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-[#080b10] border-t border-slate-200/90 dark:border-slate-800/90 text-slate-600 dark:text-slate-400 text-xs py-16 px-6 sm:px-8 lg:px-12 mt-28 transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-slate-200 dark:border-slate-800">
          
          {/* Column 1: Company Logo & Identity with Glassball Accent */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 border border-white/80 dark:border-slate-700 p-1 flex items-center justify-center shadow-md overflow-hidden">
                <div className="absolute top-0.5 left-1.5 w-5 h-2.5 rounded-full bg-white/70 blur-[0.8px] -rotate-12 pointer-events-none" />
                <Image
                  src="/jh-logo.png"
                  alt="JH Logo"
                  width={28}
                  height={28}
                  className="object-contain relative z-10"
                  unoptimized
                />
              </div>
              <span className="font-black text-slate-900 dark:text-white text-base tracking-tight">
                JH <span className="text-gradient-rainbow">CRYPTO ANALYTICS</span>
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
              <strong className="text-slate-900 dark:text-slate-200">JH Crypto Analytics</strong> is an institutional quantitative intelligence firm delivering real-time crypto signal calculations, algorithmic execution models, and predictive market analysis denominated in Indian Rupee (₹).
            </p>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="text-amber-600 dark:text-amber-400 font-bold text-xs tracking-wider uppercase font-mono mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Website Navigation
            </h4>
            <ul className="space-y-3 font-mono font-medium">
              <li>
                <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Home</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Real-Time Signals Desk</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">AI Predictive Forecasting</span>
                  <ArrowUpRight className="w-3 h-3 text-fuchsia-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">About Us &amp; Methodology</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-500/70" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Tools & Solutions */}
          <div>
            <h4 className="text-cyan-600 dark:text-cyan-400 font-bold text-xs tracking-wider uppercase font-mono mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Trading Solutions
            </h4>
            <ul className="space-y-3 font-mono font-medium">
              <li>
                <Link href="/signals" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">48-Token Asset Index</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-lime-600 dark:hover:text-lime-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Kelly Position Sizing</span>
                  <ArrowUpRight className="w-3 h-3 text-lime-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">TWAP / VWAP Order Router</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-500/70" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors flex items-center gap-1.5 group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Quantitative Copilot Agent</span>
                  <ArrowUpRight className="w-3 h-3 text-fuchsia-500/70" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Risk Disclosure */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Risk Disclosure
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl shadow-sm">
              Cryptocurrency trading carries substantial financial risk. Quantitative indicators, algorithmic consensus, and predictive forecasts represent mathematical models for institutional risk management, not financial advice. Capital management protocols are advised.
            </p>
          </div>

        </div>

        {/* Clean Professional Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 JH Crypto Analytics. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400 font-medium">
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About Us</Link>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
