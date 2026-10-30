'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { Cpu, Activity, TrendingUp, Compass, User, Sparkles } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', icon: Cpu },
    { name: 'Real-Time Signals', href: '/signals', icon: Activity },
    { name: 'AI RAG Forecasting', href: '/forecast', icon: TrendingUp },
    { name: 'About System', href: '/about', icon: Compass },
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/90 border-b border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.05),inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-all"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-24 flex items-center justify-between">
        
        {/* User's Company Logo & Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center p-1 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
            <Image
              src="/jh-logo.png"
              alt="JH Crypto Analytics Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-black tracking-tight text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">
                JH <span className="text-emerald-600">CRYPTO ANALYTICS</span>
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold uppercase shadow-sm">
                INR (₹) LIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 font-medium tracking-tight">
              Institutional Quantitative Intelligence Desk
            </p>
          </div>
        </Link>

        {/* 4 Spacious Header Navigation Options */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 bg-white shadow-sm border border-slate-200/90'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Status & Profile Controls */}
        <div className="flex items-center gap-3">
          {/* Real-time Indian Rupee Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-mono font-bold shadow-sm">
            <span className="text-slate-500">CURRENCY:</span>
            <span className="text-emerald-700 font-black">INR (₹) LIVE</span>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="tracking-wide">QUANT MESH: ACTIVE</span>
          </div>

          {/* Institutional Operator Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-800 text-xs font-mono font-bold transition-all hover:scale-105"
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>JH-DESK</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-white border border-slate-200 p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black text-emerald-700 text-base shadow-sm">
                    JH
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">JH Crypto Analytics</h4>
                    <p className="text-xs text-slate-500 font-mono">Institutional Trading Desk</p>
                  </div>
                </div>
                <div className="py-3.5 text-xs space-y-2.5 font-mono text-slate-600">
                  <p className="flex justify-between">
                    <span className="text-slate-400">Firm:</span>
                    <span className="text-slate-900 font-bold">JH Crypto Analytics</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Base Currency:</span>
                    <span className="text-emerald-700 font-bold">Indian Rupee (INR ₹)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-slate-900 font-bold">Real-Time Execution Active</span>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => setProfileOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold font-mono text-slate-800 transition-colors"
                  >
                    Close Session Panel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 py-2.5 px-3 bg-white">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-mono font-bold py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
