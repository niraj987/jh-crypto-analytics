'use client';

import React from 'react';
import { TrendingUp, Flame } from 'lucide-react';

interface GainerToken {
  pair: string;
  price: string;
  change: string;
  isPositive: boolean;
}

const GAINERS: GainerToken[] = [
  { pair: 'MARSCOIN/INR', price: '₹12.2000', change: '+1008.99%', isPositive: true },
  { pair: 'PARTI/INR', price: '₹5.3996', change: '+37.87%', isPositive: true },
  { pair: 'M3M3/INR', price: '₹0.0324', change: '+28.06%', isPositive: true },
  { pair: 'STORJ/INR', price: '₹3.315', change: '+25.37%', isPositive: true },
  { pair: 'CHR/INR', price: '₹2.07700', change: '+17.34%', isPositive: true },
  { pair: 'PEPE/INR', price: '₹0.00092', change: '+14.50%', isPositive: true },
  { pair: 'BONK/INR', price: '₹0.00248', change: '+11.80%', isPositive: true },
  { pair: 'SUI/INR', price: '₹195.40', change: '+8.90%', isPositive: true },
  { pair: 'SOL/INR', price: '₹16,240', change: '+5.84%', isPositive: true },
  { pair: 'BTC/INR', price: '₹78,94,796', change: '-2.97%', isPositive: false },
  { pair: 'ETH/INR', price: '₹3,14,210', change: '+2.15%', isPositive: true },
];

export default function TopGainersBar() {
  return (
    <div className="w-full bg-[#0a0d14] dark:bg-[#07090e] border-t border-b border-slate-800 text-xs font-mono py-2.5 px-4 overflow-hidden flex items-center gap-4 select-none">
      <div className="flex items-center gap-1.5 font-bold text-amber-400 shrink-0">
        <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
        <span>Top Gainers</span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-[11px]">
        {GAINERS.map((g, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-slate-300">{g.pair}</span>
            <span className="text-slate-100 font-black">{g.price}</span>
            <span className={`font-bold ${g.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {g.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

