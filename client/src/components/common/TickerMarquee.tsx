'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CryptoAsset } from '@/lib/types';
import { formatINR } from '@/lib/currency';

interface TickerMarqueeProps {
  assets: CryptoAsset[];
}

export default function TickerMarquee({ assets }: TickerMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!marqueeRef.current || assets.length === 0) return;

    const ctx = gsap.context(() => {
      const el = marqueeRef.current!;
      const totalWidth = el.scrollWidth / 2;

      tweenRef.current = gsap.to(el, {
        x: `-=${totalWidth}`,
        duration: 220, // Reduced speed for comfortable, calm reading
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, [assets]);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.resume();

  // Duplicate list to achieve seamless infinite loop
  const displayItems = [...assets, ...assets, ...assets];

  return (
    <div 
      className="w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/90 overflow-hidden py-2.5 font-mono text-xs select-none shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={marqueeRef} className="flex gap-4 whitespace-nowrap will-change-transform items-center">
        {displayItems.map((asset, idx) => {
          const isUp = asset.change24h >= 0;
          return (
            <div
              key={`${asset.symbol}-${idx}`}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span className="font-black text-slate-900 text-xs tracking-wider">{asset.symbol}</span>
              <span className="text-slate-950 font-bold">
                {formatINR(asset.currentPrice)}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-md ${
                  isUp 
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                    : 'text-rose-700 bg-rose-50 border border-rose-200'
                }`}
              >
                {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {isUp ? '+' : ''}{asset.change24h}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
