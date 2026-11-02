'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, TrendingDown, Flame, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ApiClient } from '@/lib/api';
import { FALLBACK_CATALOG } from '@/lib/offlineFallback';
import { USD_TO_INR } from '@/lib/currency';

interface TickerToken {
  pair: string;
  price: number;
  change: number;
  decimals: number;
}

function catalogToTokens(catalog: any[]): TickerToken[] {
  const usdInr: TickerToken = { pair: 'USD/INR', price: USD_TO_INR, change: 0.08, decimals: 2 };
  const mapped = catalog.map((asset) => {
    const inrPrice = asset.currentPrice * USD_TO_INR;
    const decimals = inrPrice < 0.01 ? 6 : inrPrice < 1 ? 4 : 2;
    return {
      pair: `${asset.symbol}/INR`,
      price: Number(inrPrice.toFixed(decimals)),
      change: asset.change24h,
      decimals,
    };
  });
  return [usdInr, ...mapped];
}

const INITIAL_TOKENS: TickerToken[] = catalogToTokens(FALLBACK_CATALOG);

export default function TopGainersBar() {
  const [tokens, setTokens] = useState<TickerToken[]>(INITIAL_TOKENS);
  const [filterMode, setFilterMode] = useState<'all' | 'gainers' | 'losers'>('all');
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Fetch real-time CoinMarketCap live data and update catalog tokens
  useEffect(() => {
    let mounted = true;
    async function fetchLive() {
      try {
        const liveCatalog = await ApiClient.getCatalog();
        if (mounted && Array.isArray(liveCatalog) && liveCatalog.length > 0) {
          setTokens(catalogToTokens(liveCatalog));
        }
      } catch {
        // preserve current state
      }
    }
    fetchLive();
    const interval = setInterval(fetchLive, 9000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter items
  const filteredTokens = tokens.filter((t) => {
    if (filterMode === 'gainers') return t.change >= 0;
    if (filterMode === 'losers') return t.change < 0;
    return true;
  });

  // Seamless GSAP continuous marquee translation animation
  useEffect(() => {
    if (!marqueeRef.current || filteredTokens.length === 0) return;

    const ctx = gsap.context(() => {
      const el = marqueeRef.current!;
      const totalWidth = el.scrollWidth / 2;

      tweenRef.current = gsap.to(el, {
        x: `-=${totalWidth}`,
        duration: 180, // Slower, calm scrolling speed
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, [filteredTokens.length, filterMode]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  // Duplicate items for continuous seamless loop
  const displayItems = [...filteredTokens, ...filteredTokens, ...filteredTokens];

  return (
    <div
      className="w-full bg-[#0a0d14] dark:bg-[#07090e] border-t border-b border-slate-800 text-xs font-mono py-2.5 px-4 overflow-hidden flex items-center gap-4 select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Category Filter Badge on Left */}
      <div className="flex items-center gap-2 shrink-0 z-10 bg-[#0a0d14] dark:bg-[#07090e] pr-2 border-r border-slate-800">
        <button
          onClick={() => setFilterMode('all')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-black transition-colors ${
            filterMode === 'all'
              ? 'text-amber-400 bg-amber-400/10'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
          <span>Top Movers (Live)</span>
        </button>

        <button
          onClick={() => setFilterMode('gainers')}
          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
            filterMode === 'gainers' ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-500 hover:text-emerald-400'
          }`}
        >
          Gainers
        </button>

        <button
          onClick={() => setFilterMode('losers')}
          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
            filterMode === 'losers' ? 'text-rose-400 bg-rose-400/10' : 'text-slate-500 hover:text-rose-400'
          }`}
        >
          Losers
        </button>
      </div>

      {/* Continuously Moving Ticker Tape */}
      <div className="flex-1 overflow-hidden">
        <div ref={marqueeRef} className="flex gap-6 whitespace-nowrap will-change-transform items-center text-[11px]">
          {displayItems.map((g, i) => {
            const isUp = g.change >= 0;
            return (
              <div
                key={i}
                className="flex items-center gap-2 shrink-0 px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 transition-colors cursor-pointer"
              >
                <span className="font-bold text-slate-300">{g.pair}</span>
                <span className="text-white font-mono font-black">
                  ₹{g.price.toLocaleString('en-IN', { minimumFractionDigits: Math.min(2, g.decimals) })}
                </span>
                <span
                  className={`font-mono font-bold flex items-center gap-0.5 ${
                    isUp ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {isUp ? '+' : ''}{g.change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
