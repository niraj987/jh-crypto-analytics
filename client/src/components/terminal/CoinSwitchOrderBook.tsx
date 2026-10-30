'use client';

import React, { useState, useEffect } from 'react';
import { formatINR } from '@/lib/currency';
import { ArrowUpRight, ArrowDownRight, Layers, Activity } from 'lucide-react';

interface OrderBookProps {
  currentPrice: number;
  symbol: string;
}

interface OrderBookEntry {
  price: number;
  qty: number;
  total: number;
  depthPercent: number;
}

interface TradeTapeEntry {
  id: string;
  price: number;
  qty: number;
  time: string;
  side: 'buy' | 'sell';
}

export default function CoinSwitchOrderBook({ currentPrice, symbol }: OrderBookProps) {
  const [tab, setTab] = useState<'book' | 'trades'>('book');
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [trades, setTrades] = useState<TradeTapeEntry[]>([]);
  const [spreadPercent, setSpreadPercent] = useState<number>(0.58);
  const [bidsRatio, setBidsRatio] = useState<number>(88);

  // Generate and tick order book entries
  useEffect(() => {
    function generateBook() {
      const askList: OrderBookEntry[] = [];
      const bidList: OrderBookEntry[] = [];
      let cumAsk = 0;
      let cumBid = 0;

      // 7 Asks (ascending above currentPrice)
      for (let i = 7; i >= 1; i--) {
        const p = currentPrice * (1 + (i * 0.0018) + (Math.random() * 0.0004));
        const q = Number(((Math.random() * 0.02) + 0.001).toFixed(6));
        cumAsk += q;
        askList.push({
          price: Math.round(p),
          qty: q,
          total: cumAsk,
          depthPercent: Math.min(100, Math.round((cumAsk / 0.12) * 100)),
        });
      }

      // 7 Bids (descending below currentPrice)
      for (let i = 1; i <= 7; i++) {
        const p = currentPrice * (1 - (i * 0.0015) - (Math.random() * 0.0003));
        const q = Number(((Math.random() * 0.02) + 0.001).toFixed(6));
        cumBid += q;
        bidList.push({
          price: Math.round(p),
          qty: q,
          total: cumBid,
          depthPercent: Math.min(100, Math.round((cumBid / 0.12) * 100)),
        });
      }

      setAsks(askList);
      setBids(bidList);
      setSpreadPercent(Number(((Math.random() * 0.2) + 0.45).toFixed(2)));
      setBidsRatio(Math.round(80 + Math.random() * 12));
    }

    generateBook();
    const interval = setInterval(generateBook, 2800);
    return () => clearInterval(interval);
  }, [currentPrice]);

  // Live Trade Tape updates
  useEffect(() => {
    function tickTrade() {
      const side: 'buy' | 'sell' = Math.random() > 0.4 ? 'buy' : 'sell';
      const drift = (Math.random() - 0.48) * 0.002;
      const p = Math.round(currentPrice * (1 + drift));
      const q = Number(((Math.random() * 0.015) + 0.0005).toFixed(6));
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setTrades((prev) => [
        { id: Math.random().toString(), price: p, qty: q, time, side },
        ...prev.slice(0, 14),
      ]);
    }

    tickTrade();
    const interval = setInterval(tickTrade, 1900);
    return () => clearInterval(interval);
  }, [currentPrice]);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#121721] border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between font-mono text-xs">
      
      {/* Top Tabs: ORDER BOOK & LAST TRADES */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('book')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              tab === 'book'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            ORDER BOOK
          </button>
          <button
            onClick={() => setTab('trades')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              tab === 'trades'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            LAST TRADES
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>L2 Depth</span>
        </div>
      </div>

      {tab === 'book' ? (
        <div className="space-y-1">
          {/* Column Headers */}
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-2 pb-1">
            <span>Price (INR)</span>
            <span>Quantity ({symbol})</span>
          </div>

          {/* ASKS (Red / Sell Orders) */}
          <div className="space-y-0.5">
            {asks.map((ask, idx) => (
              <div
                key={idx}
                className="relative flex justify-between items-center px-2 py-1 rounded text-[11px] hover:bg-rose-500/5 transition-colors overflow-hidden"
              >
                {/* Visual Depth Fill Bar */}
                <div
                  className="absolute right-0 top-0 bottom-0 bg-rose-500/10 dark:bg-rose-500/15 pointer-events-none transition-all duration-300"
                  style={{ width: `${ask.depthPercent}%` }}
                />
                <span className="font-bold text-rose-600 dark:text-rose-400 relative z-10">
                  {formatINR(ask.price, false)}
                </span>
                <span className="text-slate-600 dark:text-slate-400 relative z-10">
                  {ask.qty.toFixed(6)}
                </span>
              </div>
            ))}
          </div>

          {/* Mid Spread Price Indicator (CoinSwitch PRO Style) */}
          <div className="my-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {formatINR(currentPrice, false)}
              </span>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Spread {spreadPercent}%
            </span>
          </div>

          {/* BIDS (Green / Buy Orders) */}
          <div className="space-y-0.5">
            {bids.map((bid, idx) => (
              <div
                key={idx}
                className="relative flex justify-between items-center px-2 py-1 rounded text-[11px] hover:bg-emerald-500/5 transition-colors overflow-hidden"
              >
                {/* Visual Depth Fill Bar */}
                <div
                  className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 dark:bg-emerald-500/15 pointer-events-none transition-all duration-300"
                  style={{ width: `${bid.depthPercent}%` }}
                />
                <span className="font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
                  {formatINR(bid.price, false)}
                </span>
                <span className="text-slate-600 dark:text-slate-400 relative z-10">
                  {bid.qty.toFixed(6)}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Depth Ratio Bar (CoinSwitch PRO 88% Bids / 12% Asks) */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2 space-y-1.5">
            <div className="h-2 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${bidsRatio}%` }}
                title={`${bidsRatio}% Bids`}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{ width: `${100 - bidsRatio}%` }}
                title={`${100 - bidsRatio}% Asks`}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span className="text-emerald-600 dark:text-emerald-400">{bidsRatio}% Bids</span>
              <span className="text-rose-600 dark:text-rose-400">{100 - bidsRatio}% Asks</span>
            </div>
          </div>
        </div>
      ) : (
        /* LAST TRADES TAPE */
        <div className="space-y-1 py-1">
          <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 px-2 pb-1">
            <span>Price (INR)</span>
            <span>Amount</span>
            <span>Time</span>
          </div>
          <div className="space-y-1 max-h-[340px] overflow-y-auto">
            {trades.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center px-2 py-1 rounded text-[11px] hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <span className={`font-bold ${t.side === 'buy' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {formatINR(t.price, false)}
                </span>
                <span className="text-slate-600 dark:text-slate-400">{t.qty.toFixed(6)}</span>
                <span className="text-slate-400 text-[10px]">{t.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

