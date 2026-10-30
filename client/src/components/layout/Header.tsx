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
        
        {/* User's Company Brand with 3D Glassball Orb Effect */}
        <Link href="/" className="flex items-center gap-4 group">
          {/* Luminous 3D Glassball Sphere */}
          <div className="relative flex items-center justify-center">
            {/* Ambient Aura Ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-indigo-500 opacity-50 blur-md group-hover:opacity-85 transition-opacity duration-300 animate-pulse" />
            
            {/* Spherical Glass Orb with Inner Reflections & Specular Arc */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-emerald-500/80 via-teal-400/50 to-sky-400/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_24px_rgba(16,185,129,0.3),inset_0_4px_10px_rgba(255,255,255,0.9),inset_0_-6px_12px_rgba(2,132,199,0.4)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              {/* Refractive Specular Glare Arc */}
              <div className="absolute top-1 left-2 w-6 h-3 rounded-full bg-white/70 blur-[0.8px] -rotate-12 pointer-events-none" />
              {/* Secondary Lower Bounce Caustic */}
              <div className="absolute bottom-1 right-2.5 w-3.5 h-2 rounded-full bg-sky-200/50 blur-[1px] pointer-events-none" />
              
              <Image
                src="/jh-logo.png"
                alt="JH Crypto Analytics Logo"
                width={36}
                height={36}
                className="object-contain relative z-10 drop-shadow-sm"
                priority
                unoptimized
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">
                JH <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">CRYPTO ANALYTICS</span>
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-500 font-semibold tracking-tight">
              Quantitative Intelligence &amp; Execution Terminal
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

        {/* Clean, Innovative Right Controls: Launch CTA & Operator Dropdown */}
        <div className="flex items-center gap-3">
          <Link
            href="/signals"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Desk</span>
          </Link>

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
                    <span className="text-slate-400">CoinSwitch API:</span>
                    <span className="text-emerald-700 font-bold">df55...1779 (Connected)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-slate-900 font-bold">Active Stream</span>
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
