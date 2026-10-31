'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, TrendingDown, Flame, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerToken {
  pair: string;
  price: number;
  change: number;
  decimals: number;
}

const INITIAL_TOKENS: TickerToken[] = [
  { pair: 'USD/INR', price: 86.85, change: 0.14, decimals: 2 },
  { pair: 'MARSCOIN/INR', price: 12.20, change: 1008.99, decimals: 4 },
  { pair: 'PARTI/INR', price: 5.3996, change: 37.87, decimals: 4 },
  { pair: 'M3M3/INR', price: 0.0324, change: 28.06, decimals: 4 },
  { pair: 'STORJ/INR', price: 3.315, change: 25.37, decimals: 3 },
  { pair: 'CHR/INR', price: 2.077, change: 17.34, decimals: 4 },
  { pair: 'PEPE/INR', price: 0.00092, change: 14.50, decimals: 5 },
  { pair: 'BONK/INR', price: 0.00248, change: 11.80, decimals: 5 },
  { pair: 'SUI/INR', price: 195.40, change: 8.90, decimals: 2 },
  { pair: 'SOL/INR', price: 16240.00, change: 5.84, decimals: 2 },
  { pair: 'ETH/INR', price: 314210.00, change: 2.15, decimals: 2 },
  { pair: 'BTC/INR', price: 7894796.00, change: -2.97, decimals: 2 },
  { pair: 'DOGE/INR', price: 14.28, change: -4.12, decimals: 2 },
  { pair: 'XRP/INR', price: 46.50, change: -6.40, decimals: 2 },
  { pair: 'SHIB/INR', price: 0.00185, change: -8.15, decimals: 5 },
];

export default function TopGainersBar() {
  const [tokens, setTokens] = useState<TickerToken[]>(INITIAL_TOKENS);
  const [filterMode, setFilterMode] = useState<'all' | 'gainers' | 'losers'>('all');
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Real-time micro price fluctuations every 2.4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens((prev) => {
        const next = [...prev];
        // Pick 2 random tokens to fluctuate
        const idx1 = Math.floor(Math.random() * next.length);
        const idx2 = Math.floor(Math.random() * next.length);

        [idx1, idx2].forEach((idx) => {
          const item = { ...next[idx] };
          const swingPct = (Math.random() - 0.48) * 0.4; // Small realistic micro-tick
          item.price = Number((item.price * (1 + swingPct / 100)).toFixed(item.decimals));
          item.change = Number((item.change + swingPct).toFixed(2));
          next[idx] = item;
        });

        return next;
      });
    }, 2400);

    return () => clearInterval(timer);
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
        duration: 90,
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
