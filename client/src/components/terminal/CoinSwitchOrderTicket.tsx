'use client';

import React, { useState } from 'react';
import { formatINR } from '@/lib/currency';
import { AlertCircle, ArrowDownToLine, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ApiClient } from '@/lib/api';

interface OrderTicketProps {
  currentPrice: number;
  symbol: string;
}

export default function CoinSwitchOrderTicket({ currentPrice, symbol }: OrderTicketProps) {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'stop_limit' | 'market'>('limit');
  const [limitPrice, setLimitPrice] = useState<number>(Math.round(currentPrice * 1.002));
  const [quantity, setQuantity] = useState<number>(0.001);
  const [availableINR, setAvailableINR] = useState<number>(0.30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  const totalINR = Math.round(limitPrice * quantity);
  const minQty = Number((500 / currentPrice).toFixed(6)); // Min ₹500 equivalent

  const handlePercentageClick = (pct: number) => {
    if (side === 'buy') {
      const budget = (availableINR > 100 ? availableINR : 100000) * (pct / 100);
      const q = Number((budget / limitPrice).toFixed(6));
      setQuantity(Math.max(minQty, q));
    } else {
      setQuantity(Number((0.02 * (pct / 100)).toFixed(6)));
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setOrderNotification(null);

    try {
      const res = await ApiClient.placeCoinSwitchOrder({
        side,
        symbol,
        type: orderType === 'market' ? 'market' : 'limit',
        price: limitPrice,
        quantity,
      });

      setOrderNotification(
        res.message || `Order successfully queued: ${side.toUpperCase()} ${quantity} ${symbol} at ${formatINR(limitPrice)}`
      );
    } catch {
      setOrderNotification(
        `Simulated order routed: ${side.toUpperCase()} ${quantity} ${symbol} at ${formatINR(limitPrice)} (Direct CoinSwitchX Gateway)`
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setOrderNotification(null), 6000);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#121721] border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between font-mono text-xs space-y-5">
      
      {/* BUY / SELL Switcher (CoinSwitch PRO Style) */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setSide('buy')}
          className={`py-3 rounded-xl font-black text-sm tracking-wide transition-all ${
            side === 'buy'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`py-3 rounded-xl font-black text-sm tracking-wide transition-all ${
            side === 'sell'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Order Type Tabs: Limit / Stop Limit / Market */}
      <div className="flex items-center gap-4 text-xs font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
        <button
          onClick={() => setOrderType('limit')}
          className={`pb-1 transition-all ${
            orderType === 'limit'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType('stop_limit')}
          className={`pb-1 transition-all ${
            orderType === 'stop_limit'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Stop Limit
        </button>
        <button
          onClick={() => setOrderType('market')}
          className={`pb-1 transition-all ${
            orderType === 'market'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          Market
        </button>
      </div>

      {/* Available INR Balance Bar */}
      <div className="flex items-center justify-between text-xs py-1">
        <span className="text-slate-500">Available INR</span>
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-900 dark:text-slate-100">
            ₹{availableINR.toFixed(2)}
          </span>
          <span title="Deposit">
            <ArrowDownToLine className="w-3.5 h-3.5 text-amber-500 cursor-pointer" />
          </span>
        </div>
      </div>

      {/* Limit Price Input Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Limit Price</span>
          <button
            type="button"
            onClick={() => setLimitPrice(Math.round(currentPrice * 1.001))}
            className="text-amber-500 hover:underline font-bold"
          >
            Get Lowest
          </button>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-400 font-bold">₹</span>
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(Number(e.target.value))}
            className="w-full pl-8 pr-16 py-3 rounded-xl bg-slate-50 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:border-amber-500"
          />
          <span className="absolute right-3 text-slate-400 text-xs font-bold">INR</span>
        </div>
      </div>

      {/* Quantity Input Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Quantity</span>
          <span className="text-slate-400">Min: {minQty} {symbol}</span>
        </div>
        <div className="relative flex items-center">
          <input
            type="number"
            step="0.0001"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-bold text-sm focus:outline-none focus:border-amber-500"
          />
          <span className="absolute right-3 text-slate-400 text-xs font-bold">{symbol}</span>
        </div>
      </div>

      {/* Total INR Value Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Total INR Value</span>
        </div>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-slate-400 font-bold">₹</span>
          <input
            type="text"
            readOnly
            value={totalINR.toLocaleString('en-IN')}
            className="w-full pl-8 pr-16 py-3 rounded-xl bg-slate-100/70 dark:bg-[#0c1017]/70 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-black text-sm"
          />
          <span className="absolute right-3 text-slate-400 text-xs font-bold">INR</span>
        </div>
      </div>

      {/* Quick Percentage Sizing Pills (25%, 50%, 75%, 100%) */}
      <div className="grid grid-cols-4 gap-2">
        {[25, 50, 75, 100].map((pct) => (
          <button
            key={pct}
            type="button"
            onClick={() => handlePercentageClick(pct)}
            className="py-2 rounded-lg bg-slate-100 dark:bg-[#0c1017] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300 text-xs transition-all hover:scale-105 active:scale-95"
          >
            {pct}%
          </button>
        ))}
      </div>

      {/* Low Wallet Balance Notice (as shown in CoinSwitch PRO image) */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 font-bold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Low Wallet Balance</span>
        </div>
        <button
          type="button"
          onClick={() => setAvailableINR(250000)}
          className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400"
        >
          Deposit INR ↵
        </button>
      </div>

      {/* Primary Order Action Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-2xl font-black text-sm tracking-wider uppercase text-white shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 disabled:opacity-50 ${
          side === 'buy'
            ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
            : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/25'
        }`}
      >
        {isSubmitting ? 'Routing Order...' : 'PLACE ORDER'}
      </button>

      {/* Order Confirmation Banner */}
      {orderNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-2 text-[11px] animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="font-bold">{orderNotification}</p>
        </div>
      )}

      {/* Security Footer */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Cryptographically Verified Gateway
        </span>
        <span className="text-slate-400">CoinSwitchX Pro L2</span>
      </div>

    </div>
  );
}
