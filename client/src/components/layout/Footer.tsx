'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, Cpu, Network, Database, Lock, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200/90 text-slate-600 text-xs py-16 px-6 sm:px-8 lg:px-12 mt-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-slate-200">
          
          {/* Column 1: Company Logo & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
                <Image
                  src="/jh-logo.png"
                  alt="JH Logo"
                  width={34}
                  height={34}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="font-black text-slate-900 text-base tracking-tight">
                JH <span className="text-emerald-600">CRYPTO ANALYTICS</span>
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              <strong>JH Crypto Analytics</strong> is an institutional quantitative intelligence firm delivering real-time crypto signal calculation, algorithmic execution models, and predictive market analysis denominated in Indian Rupee (INR ₹).
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Institutional Quant Streams Online</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono mb-4">
              Terminal Suite
            </h4>
            <ul className="space-y-3 font-mono font-medium">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>01 // Macro Overview</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/signals" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>02 // Real-Time AI Signals Desk</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/forecast" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>03 // AI RAG Forecasting</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                  <span>04 // Quant Methodology</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry & Stack */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono mb-4">
              System Telemetry
            </h4>
            <div className="space-y-2.5 font-mono text-[11px] text-slate-600">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                <span className="flex items-center gap-2"><Network className="w-3.5 h-3.5 text-emerald-600" /> Consensus Engine</span>
                <span className="text-slate-900 font-bold">Consensus Engine v2.4</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                <span className="flex items-center gap-2"><Database className="w-3.5 h-3.5 text-sky-600" /> Vector Memory</span>
                <span className="text-slate-900 font-bold">Semantic Historical Index</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                <span className="flex items-center gap-2"><Cpu className="w-3.5 h-3.5 text-rose-600" /> Recalc Frequency</span>
                <span className="text-slate-900 font-bold">Real-time Sub-second</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                <span className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-amber-600" /> Execution Protocol</span>
                <span className="text-slate-900 font-bold">Ed25519 Verified</span>
              </div>
            </div>
          </div>

          {/* Column 4: Compliance & Risk Warning */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-xs tracking-wider uppercase font-mono flex items-center gap-2 text-amber-700">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Risk Disclosure
            </h4>
            <p className="text-[11px] text-slate-600 leading-relaxed bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm">
              Cryptocurrency trading carries substantial financial risk. Quantitative indicators, algorithmic consensus, and predictive forecasts represent mathematical models for institutional risk management, not guaranteed financial advice. Disciplined position sizing is advised.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 JH Crypto Analytics. All proprietary quantitative models protected.</p>
          <div className="flex items-center gap-6">
            <span className="text-emerald-700 font-bold">STATUS: OPERATIONAL (99.98%)</span>
            <span className="text-slate-900 font-bold">BASE: INR (₹) REAL-TIME</span>
            <span className="text-slate-600 font-medium">BUILD: v2.4.0-PRO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
