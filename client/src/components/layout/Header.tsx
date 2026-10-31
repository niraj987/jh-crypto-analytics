'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { 
  Cpu, 
  Activity, 
  TrendingUp, 
  Compass, 
  User, 
  Sparkles, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Institutional Investment Firm Navigation Links
  const navLinks = [
    { 
      code: '01',
      name: 'Overview', 
      href: '/', 
      icon: Cpu,
      sub: 'Market Matrix'
    },
    { 
      code: '02',
      name: 'Signals Desk', 
      href: '/signals', 
      icon: Activity,
      sub: 'Real-Time Consensus'
    },
    { 
      code: '03',
      name: 'RAG Forecast', 
      href: '/forecast', 
      icon: TrendingUp,
      sub: 'Scenario Models'
    },
    { 
      code: '04',
      name: 'Methodology', 
      href: '/about', 
      icon: Compass,
      sub: 'Quant Architecture'
    },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/95 dark:bg-[#070b16]/95 border-b border-slate-200/90 dark:border-slate-800/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] transition-colors duration-200"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-22 flex items-center justify-between">
        
        {/* Brand Identity: Crystal-Clear JH Logo (No Glare, Ultra High Contrast) */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200/90 dark:border-slate-800 p-1.5 flex items-center justify-center shadow-sm shrink-0 group-hover:border-amber-500/60 transition-colors">
            <Image
              src="/jh-logo.png"
              alt="JH Crypto Analytics"
              width={36}
              height={36}
              className="object-contain"
              priority
              unoptimized
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-base sm:text-lg lg:text-xl text-slate-900 dark:text-white transition-colors">
                JH <span className="text-gradient-gold">CRYPTO ANALYTICS</span>
              </span>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                OUR FIRM
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium tracking-tight hidden xs:block">
              Quantitative Alpha &amp; Predictive Forecasting Desk &bull; INR (&#8377;)
            </p>
          </div>
        </Link>

        {/* Institutional Investment Firm Navigation Dock (Desktop lg+) */}
        <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2.5 transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 dark:text-white bg-white dark:bg-slate-800 shadow-sm border border-slate-200/90 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/50'
                }`}
              >
                <span className={`text-[10px] font-extrabold ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`}>
                  {link.code}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Institutional Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Live Desk Telemetry Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 font-bold">DESK LIVE</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">12ms</span>
          </div>

          {/* Theme Switcher Button with Ripple Effect */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="relative p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-all hover:scale-105 active:scale-95 group overflow-hidden"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* Institutional Launch Terminal CTA Button (Structured Color Scheme) */}
          <Link
            href="/signals"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-bold text-xs shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Launch Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>

          {/* Institutional Operator Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 text-xs font-mono font-bold transition-all"
            >
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-bold text-slate-900 dark:text-white">OUR DESK</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-slate-900 dark:text-white text-sm">
                    JH
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">Our Quant Desk</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Proprietary Quantitative Firm</p>
                  </div>
                </div>
                <div className="py-3.5 text-xs space-y-2.5 font-mono text-slate-600 dark:text-slate-400">
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Theme:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold capitalize">{theme} Mode</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Gateway:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Ed25519 Active</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-400 dark:text-slate-500">Denomination:</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">INR (₹)</span>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => setProfileOpen(false)}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold font-mono text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    Close Session Panel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-all active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-amber-500" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#070b16]/98 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    isActive
                      ? 'text-slate-950 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black">{link.code}</span>
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{link.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <Link
              href="/signals"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
              <span>Launch Live Signals Desk</span>
            </Link>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">Desk Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                24/7 Live INR (₹)
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
