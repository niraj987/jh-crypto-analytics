'use client';

import React, { useEffect, useState, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ApiClient } from '@/lib/api';
import { CryptoAsset, TechnicalIndicators, ConsensusVerdict, AgentInsight } from '@/lib/types';
import { formatINR, formatINRLarge, toINR } from '@/lib/currency';
import AssetSelector from '@/components/terminal/AssetSelector';
import CandlestickChart from '@/components/terminal/CandlestickChart';
import IndicatorsGrid from '@/components/terminal/IndicatorsGrid';
import ConsensusCard from '@/components/terminal/ConsensusCard';
import TradeOrderPanel from '@/components/terminal/TradeOrderPanel';
import TradingFirmWorkflow from '@/components/terminal/TradingFirmWorkflow';
import AgentThinking from '@/components/common/AgentThinking';
import { Activity, RefreshCw, Zap, TrendingUp, DollarSign } from 'lucide-react';

function SignalsTerminal() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get('symbol') || 'BTC';

  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [catalog, setCatalog] = useState<CryptoAsset[]>([]);
  const [currentAsset, setCurrentAsset] = useState<CryptoAsset | null>(null);
  const [indicators, setIndicators] = useState<TechnicalIndicators | null>(null);
  const [verdict, setVerdict] = useState<ConsensusVerdict | null>(null);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch complete asset & multi-agent consensus
  const fetchTerminalData = useCallback(async (symbol: string) => {
    setIsLoading(true);
    try {
      // 1. Fetch Ticker & Indicators
      const tickerData = await ApiClient.getTicker(symbol);
      setCurrentAsset(tickerData.asset);
      setIndicators(tickerData.indicators);

      // 2. Fetch Multi-Agent Consensus
      const consensusData = await ApiClient.getConsensus(symbol);
      setVerdict(consensusData.verdict);
      setAgentLogs(consensusData.logs);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to fetch terminal data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    ApiClient.getCatalog().then(setCatalog);
    fetchTerminalData(selectedSymbol);
  }, [selectedSymbol, fetchTerminalData]);

  // Real-time tick calculation loop (every 4 seconds if Live mode is enabled)
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(async () => {
      try {
        const tick = await ApiClient.getRealtimeTick(selectedSymbol);
        setCurrentAsset((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            currentPrice: tick.currentPrice,
            change24h: tick.change24h,
          };
        });
        setIndicators(tick.indicators);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.warn('Realtime tick warning:', err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedSymbol, isLiveActive]);

  const handleAssetSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  const handleCustomSearch = (query: string) => {
    setSelectedSymbol(query);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-8">
      
      {/* Top Terminal Status Header */}
      <div className="flex flex-col gap-6 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-sm">
              <Image
                src="/jh-logo.png"
                alt="JH Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentAsset ? `${currentAsset.name} (${currentAsset.symbol})` : selectedSymbol}
                </h1>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold shadow-sm">
                  INR (₹) LIVE STREAM
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono mt-1 font-medium">
                Live Price:{' '}
                <strong className="text-slate-950 font-black text-base">
                  {currentAsset ? formatINR(currentAsset.currentPrice) : '...'}
                </strong>
                {' '} | 24h Momentum:{' '}
                <span className={`font-black text-sm ${currentAsset && currentAsset.change24h >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {currentAsset && currentAsset.change24h >= 0 ? '+' : ''}{currentAsset?.change24h}%
                </span>
                {' '} | Recalculated: <span className="text-slate-900 font-bold">{lastUpdated || 'Sub-second'}</span>
              </p>
            </div>
          </div>

          {/* Live Calculation Controls with Tactile Bevel */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 border transition-all duration-200 ${
                isLiveActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-300'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveActive ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isLiveActive ? 'Live Recalc: ACTIVE (4s)' : 'Live Recalc: PAUSED'}</span>
            </button>

            <button
              onClick={() => fetchTerminalData(selectedSymbol)}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono font-black text-xs flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Re-Run Quant Consensus</span>
            </button>
          </div>
        </div>

        {/* Real-Time Indian Rupee Quick Metrics Strip */}
        {currentAsset && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h High (INR)</span>
              <span className="text-slate-950 font-black text-sm mt-0.5 block">{formatINR(currentAsset.high24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h Low (INR)</span>
              <span className="text-slate-950 font-black text-sm mt-0.5 block">{formatINR(currentAsset.low24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h Volume (INR)</span>
              <span className="text-emerald-700 font-black text-sm mt-0.5 block">{formatINRLarge(currentAsset.volume24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">Market Cap (INR)</span>
              <span className="text-sky-700 font-black text-sm mt-0.5 block">{formatINRLarge(currentAsset.marketCap)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Workspace Bento Grid with Best-Fit Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: 48-Asset Comprehensive Catalog */}
        <div className="lg:col-span-4 sticky top-28">
          <AssetSelector
            assets={catalog}
            selectedSymbol={selectedSymbol}
            onSelect={handleAssetSelect}
            onCustomSearch={handleCustomSearch}
          />
        </div>

        {/* Right Columns: Analysis Workspace + Trade Execution Desk */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Row: Real-time Quantitative Indicators Board (Equal Height Balanced Tiles) */}
          {indicators && currentAsset && (
            <IndicatorsGrid indicators={indicators} currentPrice={currentAsset.currentPrice} />
          )}

          {/* Candlestick Price Chart with Multi-Timeframe Toggles */}
          {currentAsset && currentAsset.history && (
            <CandlestickChart
              candles={currentAsset.history}
              symbol={currentAsset.symbol}
              sma50Val={indicators?.sma50}
              sma200Val={indicators?.sma200}
            />
          )}

          {/* AI Buy/Sell Consensus Card & Trade Order Execution Desk - Aligned Equal Height Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
            {verdict && (
              <div className="h-full">
                <ConsensusCard
                  verdict={verdict}
                  onRefresh={() => fetchTerminalData(selectedSymbol)}
                  isLoading={isLoading}
                />
              </div>
            )}

            {currentAsset && (
              <div className="h-full">
                <TradeOrderPanel
                  symbol={currentAsset.symbol}
                  currentPrice={currentAsset.currentPrice}
                  verdict={verdict}
                />
              </div>
            )}
          </div>

          {/* Multi-Agent Quant Deliberation Stream */}
          {verdict && (
            <AgentThinking
              insights={verdict.agentInsights}
              logs={agentLogs}
            />
          )}

          {/* Institutional Trading Firm Workflow: Kelly Sizing, TWAP, and Delta Hedging */}
          {currentAsset && (
            <TradingFirmWorkflow
              currentSymbol={currentAsset.symbol}
              currentPriceINR={toINR(currentAsset.currentPrice)}
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default function SignalsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center text-slate-800 font-mono text-sm font-bold">
        Initializing JH Crypto Analytics Terminal...
      </div>
    }>
      <SignalsTerminal />
    </Suspense>
  );
}
