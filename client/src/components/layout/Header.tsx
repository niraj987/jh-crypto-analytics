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
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';

export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Navigation Links (Without numbers)
  const navLinks = [
    {
      name: 'Overview',
      href: '/',
      icon: Cpu,
    },
    {
      name: 'Signals Desk',
      href: '/signals',
      icon: Activity,
    },
    {
      name: 'RAG Forecast',
      href: '/forecast',
      icon: TrendingUp,
    },
    {
      name: 'Methodology',
      href: '/about',
      icon: Compass,
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
      className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/70 dark:bg-[#070b16]/75 border-b border-white/60 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative"
    >
      {/* Specular Top Glass Reflection Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/20 to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-22 flex items-center justify-between">

        {/* Brand Identity: Crystal-Clear JH Logo */}
        <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/80 dark:bg-[#0c1322]/80 backdrop-blur-md border border-white/80 dark:border-slate-800 p-1.5 flex items-center justify-center shadow-sm shrink-0 group-hover:border-amber-500/60 transition-colors">
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
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium tracking-tight hidden xs:block">
              Quantitative Alpha &amp; Predictive Forecasting Desk
            </p>
          </div>
        </Link>

        {/* Realistic Frosted Glass Navigation Dock (Desktop lg+) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2.5 transition-all duration-200 ${
                  isActive
                    ? 'text-slate-950 dark:text-white bg-white/95 dark:bg-slate-800/90 shadow-sm border border-white dark:border-slate-700/70 backdrop-blur-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.name}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Theme Switcher Button with Glass Background */}
          <button
            onClick={(e) => toggleTheme(e)}
            className="relative p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 border border-white/80 dark:border-white/10 shadow-sm text-slate-800 dark:text-slate-200 transition-all hover:scale-105 active:scale-95 group overflow-hidden"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>

          {/* Launch Terminal CTA Button */}
          <Link
            href="/signals"
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-mono font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
            <span>Launch Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Link>

          {/* Mobile & Tablet Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 border border-white/80 dark:border-white/10 shadow-sm text-slate-800 dark:text-slate-200 transition-all active:scale-95"
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

      {/* Mobile Drawer with Glass Blur */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/60 dark:border-white/10 bg-white/90 dark:bg-[#070b16]/90 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
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
                      ? 'text-slate-950 dark:text-white bg-white/90 dark:bg-slate-800/90 border border-white dark:border-slate-700 shadow-sm backdrop-blur-md'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
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

          <div className="pt-4 border-t border-white/60 dark:border-white/10">
            <Link
              href="/signals"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
              <span>Launch Live Signals Desk</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
