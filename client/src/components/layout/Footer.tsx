'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/90 text-slate-600 text-xs py-16 px-6 sm:px-8 lg:px-12 mt-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-slate-200">
          
          {/* Column 1: Company Logo & Identity with Glassball Accent */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500/80 via-teal-400/50 to-sky-400/80 border border-white/80 p-1 flex items-center justify-center shadow-md overflow-hidden">
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
              <span className="font-black text-slate-900 text-base tracking-tight">
                JH <span className="text-emerald-600">CRYPTO ANALYTICS</span>
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              <strong>JH Crypto Analytics</strong> is an institutional quantitative intelligence firm delivering real-time crypto signal calculations, algorithmic execution models, and predictive market analysis.
            </p>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono mb-4">
              Website Navigation
            </h4>
            <ul className="space-y-3 font-mono font-medium">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>Real-Time Signals Desk</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>AI Predictive Forecasting</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>About Us &amp; Methodology</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Tools & Solutions */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono mb-4">
              Trading Solutions
            </h4>
            <ul className="space-y-3 font-mono font-medium">
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>48-Token Asset Index</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>Kelly Position Sizing</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>TWAP / VWAP Order Router</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>Quantitative Copilot Agent</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Risk Disclosure */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-2 text-amber-700">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Risk Disclosure
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm">
              Cryptocurrency trading carries substantial financial risk. Quantitative indicators, algorithmic consensus, and predictive forecasts represent mathematical models for institutional risk management, not financial advice. Capital management protocols are advised.
            </p>
          </div>

        </div>

        {/* Clean Professional Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 JH Crypto Analytics. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-600 font-medium">
            <Link href="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/" className="hover:text-slate-900 transition-colors">Security</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
