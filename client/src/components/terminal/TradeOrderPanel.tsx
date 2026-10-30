'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { ConsensusVerdict } from '@/lib/types';
import { formatINR, toINR } from '@/lib/currency';

interface TradeOrderPanelProps {
  symbol: string;
  currentPrice: number;
  verdict?: ConsensusVerdict | null;
}

export default function TradeOrderPanel({ symbol, currentPrice, verdict }: TradeOrderPanelProps) {
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'STOP'>('MARKET');
  
  // Real-time INR conversions
  const priceINR = toINR(currentPrice);
  const defaultTPINR = verdict?.takeProfit1 ? toINR(verdict.takeProfit1) : Number((priceINR * 1.08).toFixed(2));
  const defaultSLINR = verdict?.stopLoss ? toINR(verdict.stopLoss) : Number((priceINR * 0.94).toFixed(2));

  const [amountInr, setAmountInr] = useState<number>(100000); // ₹1 Lakh
  const [leverage, setLeverage] = useState<number>(5);
  const [tpPriceINR, setTpPriceINR] = useState<number>(defaultTPINR);
  const [slPriceINR, setSlPriceINR] = useState<number>(defaultSLINR);
  const [orderPlaced, setOrderPlaced] = useState<string | null>(null);

  // Position Calculations
  const tokenQuantity = amountInr / (priceINR || 1);
  const totalExposureINR = amountInr * leverage;
  const estLiquidationINR = orderSide === 'BUY'
    ? Number((priceINR * (1 - 1 / leverage * 0.85)).toFixed(2))
    : Number((priceINR * (1 + 1 / leverage * 0.85)).toFixed(2));

  const handleQuickAmount = (val: number) => {
    setAmountInr(val);
  };

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = `JH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderPlaced(`Simulated ${orderSide} filled for ${tokenQuantity.toFixed(4)} ${symbol} at ${formatINR(priceINR, true)} (${leverage}x, Order #${orderId})`);
    setTimeout(() => {
      setOrderPlaced(null);
    }, 5000);
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 p-7 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)] flex flex-col justify-between space-y-5 h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Institutional Order Sizing Desk</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-300">
              INR (₹) EXECUTION
            </span>
          </h3>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Automated algorithmic order router with risk sizing & dynamic stop loss</p>
        </div>
      </div>

      {/* Buy / Sell Toggle Buttons with Calm Green & Red Tones */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80">
        <button
          type="button"
          onClick={() => setOrderSide('BUY')}
          className={`py-3 rounded-xl font-mono text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
            orderSide === 'BUY'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>BUY / LONG {symbol}</span>
        </button>

        <button
          type="button"
          onClick={() => setOrderSide('SELL')}
          className={`py-3 rounded-xl font-mono text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 ${
            orderSide === 'SELL'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-[1.01]'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <ArrowDownRight className="w-4 h-4" />
          <span>SELL / SHORT {symbol}</span>
        </button>
      </div>

      {/* Order Type Tabs */}
      <div className="grid grid-cols-3 gap-2 font-mono text-xs">
        {(['MARKET', 'LIMIT', 'STOP'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setOrderType(type)}
            className={`py-2 px-3 rounded-xl border text-center transition-all ${
              orderType === type
                ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white'
            }`}
          >
            {type} ORDER
          </button>
        ))}
      </div>

      <form onSubmit={handleExecuteTrade} className="space-y-4">
        {/* Position Size Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 font-bold uppercase">Order Capital (INR ₹):</span>
            <span className="text-slate-900 font-black text-sm">{formatINR(amountInr, true)}</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amountInr}
              onChange={(e) => setAmountInr(Math.max(500, Number(e.target.value)))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-8 pr-4 text-sm text-slate-900 font-mono font-bold focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
            />
            <span className="font-bold text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">₹</span>
          </div>

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {[25000, 50000, 100000, 250000, 500000].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleQuickAmount(chip)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  amountInr === chip
                    ? 'bg-slate-900 text-white font-bold border-slate-900'
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                }`}
              >
                ₹{(chip / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Leverage Slider */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600 font-bold uppercase">Leverage Multiplier:</span>
            <span className="text-emerald-700 font-black text-sm px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-lg">
              {leverage}x ({leverage > 10 ? 'High Risk' : 'Conservative'})
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full accent-slate-900 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-600">
            <span>1x Spot</span>
            <span>5x Swing</span>
            <span>10x Momentum</span>
            <span>20x Scalp</span>
          </div>
        </div>

        {/* Take Profit & Stop Loss Grid in INR */}
        <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="text-emerald-800 font-bold block text-[10px] uppercase">Take Profit (INR)</span>
            <input
              type="number"
              step="any"
              value={tpPriceINR}
              onChange={(e) => setTpPriceINR(Number(e.target.value))}
              className="w-full bg-white border border-emerald-300 rounded-lg p-1.5 mt-1 font-bold text-slate-900 focus:outline-none"
            />
            <span className="text-[10px] text-emerald-700 mt-1 block">
              +{(Math.abs(tpPriceINR - priceINR) / (priceINR || 1) * 100).toFixed(1)}% gain target
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-200/80">
            <span className="text-rose-800 font-bold block text-[10px] uppercase">Stop Loss (INR)</span>
            <input
              type="number"
              step="any"
              value={slPriceINR}
              onChange={(e) => setSlPriceINR(Number(e.target.value))}
              className="w-full bg-white border border-rose-300 rounded-lg p-1.5 mt-1 font-bold text-slate-900 focus:outline-none"
            />
            <span className="text-[10px] text-rose-700 mt-1 block">
              -{(Math.abs(priceINR - slPriceINR) / (priceINR || 1) * 100).toFixed(1)}% max risk
            </span>
          </div>
        </div>

        {/* Trade Telemetry Summary Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 font-mono text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Token Units:</span>
            <span className="text-slate-900 font-bold">{tokenQuantity.toFixed(4)} {symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Notional Exposure:</span>
            <span className="text-slate-900 font-bold">{formatINR(totalExposureINR, true)}</span>
          </div>
          <div className="flex justify-between">
            <span>Est. Liquidation Floor:</span>
            <span className="text-rose-700 font-bold">{formatINR(estLiquidationINR, true)}</span>
          </div>
        </div>

        {/* Execute Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-2xl font-mono text-sm font-black text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
            orderSide === 'BUY'
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
              : 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
          }`}
        >
          EXECUTE {orderSide} ORDER // {formatINR(amountInr, true)}
        </button>
      </form>

      {/* Confirmation Notification */}
      {orderPlaced && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-emerald-900 flex items-center gap-2.5 shadow-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{orderPlaced}</span>
        </div>
      )}
    </div>
  );
}
