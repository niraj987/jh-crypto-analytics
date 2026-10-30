'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { Cpu, Activity, TrendingUp, Compass, User, Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/95 dark:bg-[#070b16]/95 border-b border-slate-200/90 dark:border-slate-800/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] transition-colors duration-200"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-24 flex items-center justify-between">
        
        {/* User's Company Brand with 3D Glassball Orb Effect */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          {/* Luminous 3D Glassball Sphere */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* Ambient Aura Ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-emerald-400 via-sky-400 to-indigo-500 opacity-50 blur-md group-hover:opacity-85 transition-opacity duration-300 animate-pulse" />
            
            {/* Spherical Glass Orb with Inner Reflections & Specular Arc */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-emerald-500/80 via-teal-400/50 to-sky-400/80 backdrop-blur-xl border border-white/90 dark:border-slate-700 shadow-[0_8px_24px_rgba(16,185,129,0.3),inset_0_4px_10px_rgba(255,255,255,0.9),inset_0_-6px_12px_rgba(2,132,199,0.4)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              {/* Refractive Specular Glare Arc */}
              <div className="absolute top-1 left-1.5 w-5 h-2.5 rounded-full bg-white/70 blur-[0.8px] -rotate-12 pointer-events-none" />
              {/* Secondary Lower Bounce Caustic */}
              <div className="absolute bottom-1 right-2 w-3 h-1.5 rounded-full bg-sky-200/50 blur-[1px] pointer-events-none" />
              
              <Image
                src="/jh-logo.png"
                alt="JH Crypto Analytics Logo"
                width={32}
                height={32}
                className="object-contain relative z-10 drop-shadow-sm"
                priority
                unoptimized
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black tracking-tight text-base sm:text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                JH <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">CRYPTO ANALYTICS</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold tracking-tight hidden xs:block">
              Quantitative Intelligence &amp; Execution Terminal
            </p>
          </div>
        </Link>

        {/* Spacious Header Navigation for Laptop / Desktop (lg+) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 xl:px-5 py-2.5 rounded-xl font-mono text-xs xl:text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 dark:text-white bg-white dark:bg-slate-800 shadow-sm border border-slate-200/90 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Clean, Innovative Right Controls: Theme Switcher, Launch CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle Button (Sunshine / Sunrise Ripple Switcher) */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-all hover:scale-105 active:scale-95 group overflow-hidden"
            title={theme === 'dark' ? 'Sunrise: Switch to Light Theme' : 'Twilight: Switch to Dark Theme'}
            aria-label="Toggle Dark/Light Mode with Sunrise Effect"
          >
            {/* Ambient Button Flare */}
            <span className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-amber-300/20 to-transparent dark:from-amber-400/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            
            {theme === 'dark' ? (
              <div className="relative flex items-center justify-center">
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-500 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]" />
              </div>
            )}
          </button>

          {/* Desktop Launch Desk Button */}
          <Link
            href="/signals"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-mono font-black text-xs shadow-md shadow-emerald-600/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Desk</span>
          </Link>

          {/* Institutional Operator Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-all hover:scale-105"
            >
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>JH-DESK</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-black text-emerald-700 dark:text-emerald-400 text-base shadow-sm">
                    JH
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">JH Crypto Analytics</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Institutional Trading Desk</p>
                  </div>
                </div>
                <div className="py-3.5 text-xs space-y-2.5 font-mono text-slate-600 dark:text-slate-400">
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Theme:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold capitalize">{theme} Mode</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">CoinSwitch API:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">df55...1779 (Connected)</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Exchange:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">CoinSwitchX L2</span>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setProfileOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold font-mono text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    Close Session Panel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Navigation Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-all active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Full-Screen Sliding Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl font-mono text-sm font-bold transition-all ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <Link
              href="/signals"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white font-mono font-black text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Live Signals Desk</span>
            </Link>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Desk Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                CoinSwitchX Online (₹)
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
