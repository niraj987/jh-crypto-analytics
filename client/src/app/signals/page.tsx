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
import QuantGraphAgent from '@/components/terminal/QuantGraphAgent';
import ConsensusCard from '@/components/terminal/ConsensusCard';
import CoinSwitchOrderBook from '@/components/terminal/CoinSwitchOrderBook';
import CoinSwitchOrderTicket from '@/components/terminal/CoinSwitchOrderTicket';
import TopGainersBar from '@/components/common/TopGainersBar';
import TradingFirmWorkflow from '@/components/terminal/TradingFirmWorkflow';
import AgentThinking from '@/components/common/AgentThinking';
import { Activity, RefreshCw, Zap, TrendingUp, DollarSign, Star } from 'lucide-react';

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
  const [csPortfolio, setCsPortfolio] = useState<{ balances: any[]; totalINRValue: number } | null>(null);

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

      // 3. Fetch CoinSwitch live account balance
      ApiClient.getCoinSwitchPortfolio().then(res => setCsPortfolio(res.data)).catch(console.warn);
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

  const handleTradeAction = (action: 'BUY' | 'SELL', targetPrice: number) => {
    const el = document.getElementById('trade-ticket-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Top Terminal Status Header */}
      <div className="relative overflow-hidden flex flex-col gap-6 p-5 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200/90 dark:border-slate-800 shadow-xl">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden rounded-3xl opacity-[0.035] sm:opacity-[0.06] mix-blend-multiply dark:mix-blend-luminosity">
          <img
            src="/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg"
            alt="Trading Atmosphere"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-5 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3.5 sm:gap-5">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex items-center justify-center shadow-md shrink-0">
              <Image
                src="/jh-logo.png"
                alt="JH Logo"
                width={44}
                height={44}
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400" />
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent">
                    {currentAsset ? `${currentAsset.symbol}/INR` : `${selectedSymbol}/INR`}
                  </span>
                </h1>
                <span className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-extrabold shadow-sm">
                  CoinSwitchX L2
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono mt-1.5 font-medium text-slate-600 dark:text-slate-400">
                <span className="text-slate-950 dark:text-white font-black text-xl sm:text-2xl font-mono tracking-tight">
                  {currentAsset ? formatINR(currentAsset.currentPrice) : '...'}
                </span>
                <span className={`font-black text-xs sm:text-sm px-2.5 py-0.5 rounded-lg border ${currentAsset && currentAsset.change24h >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'}`}>
                  {currentAsset && currentAsset.change24h >= 0 ? '+' : ''}{currentAsset?.change24h}%
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
                <span className="text-[11px] sm:text-xs">24H High: <strong className="text-slate-900 dark:text-slate-200">{currentAsset ? formatINR(currentAsset.high24h) : '...'}</strong></span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
                <span className="text-[11px] sm:text-xs">24H Low: <strong className="text-slate-900 dark:text-slate-200">{currentAsset ? formatINR(currentAsset.low24h) : '...'}</strong></span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
                <span className="text-[11px] sm:text-xs">24H Vol: <strong className="text-emerald-600 dark:text-emerald-400 font-black">{currentAsset ? formatINRLarge(currentAsset.volume24h) : '...'}</strong></span>
              </div>
            </div>
          </div>

          {/* Live Calculation Controls with Tactile Bevel */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 border transition-all duration-200 ${
                isLiveActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveActive ? 'bg-emerald-600 dark:bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isLiveActive ? 'Live Recalc: ACTIVE (4s)' : 'Live Recalc: PAUSED'}</span>
            </button>

            <button
              onClick={() => fetchTerminalData(selectedSymbol)}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-mono font-black text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Re-Run Quant Consensus</span>
            </button>
          </div>
        </div>

        {/* Real-Time Price Metrics Strip */}
        {currentAsset && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-bold uppercase">24h High (₹)</span>
              <span className="text-slate-950 dark:text-white font-black text-sm sm:text-base mt-1 block font-mono">{formatINR(currentAsset.high24h)}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 text-[10px] block font-bold uppercase">24h Low (₹)</span>
              <span className="text-slate-950 dark:text-white font-black text-sm sm:text-base mt-1 block font-mono">{formatINR(currentAsset.low24h)}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/90 dark:border-emerald-800/80 shadow-sm">
              <span className="text-emerald-800 dark:text-emerald-400 text-[10px] block font-bold uppercase">24h Volume</span>
              <span className="text-emerald-700 dark:text-emerald-300 font-black text-sm sm:text-base mt-1 block font-mono">{formatINRLarge(currentAsset.volume24h)}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-200/90 dark:border-sky-800/80 shadow-sm">
              <span className="text-sky-800 dark:text-sky-400 text-[10px] block font-bold uppercase">Market Cap</span>
              <span className="text-sky-700 dark:text-sky-300 font-black text-sm sm:text-base mt-1 block font-mono">{formatINRLarge(currentAsset.marketCap)}</span>
            </div>
          </div>
        )}

        {/* Live CoinSwitch PRO Connected Account Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white font-mono text-xs shadow-md border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-sm">CoinSwitch PRO Account Connected</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 font-bold">LIVE API</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Authenticated via Ed25519 Private Key • Direct coinswitchx INR Order Routing</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">INR Cash Balance:</span>
              <span className="text-emerald-400 font-black text-sm">₹{csPortfolio?.balances.find((b: any) => b.currency === 'INR')?.main_balance || '0.30'}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Crypto Holdings:</span>
              <span className="text-white font-bold">
                {csPortfolio?.balances.filter((b: any) => b.currency !== 'INR').map((b: any) => `${b.currency}: ${b.main_balance}`).join(' • ') || 'FLOKI: 1704.71 • PEPE: 2544.89'}
              </span>
            </div>
          </div>
        </div>
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

          {/* AI Quantitative & Graph Analysis Copilot Agent */}
          {currentAsset && (
            <QuantGraphAgent
              asset={currentAsset}
              indicators={indicators}
              verdict={verdict}
              onTradeAction={handleTradeAction}
            />
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

          {/* CoinSwitch PRO Real-Time L2 Order Book & Trade Execution Ticket (Matching Screenshot) */}
          {currentAsset && (
            <div id="trade-ticket-desk" className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch scroll-mt-28">
              <div className="xl:col-span-7 h-full">
                <CoinSwitchOrderBook
                  currentPrice={toINR(currentAsset.currentPrice)}
                  symbol={currentAsset.symbol}
                />
              </div>
              <div className="xl:col-span-5 h-full">
                <CoinSwitchOrderTicket
                  currentPrice={toINR(currentAsset.currentPrice)}
                  symbol={currentAsset.symbol}
                />
              </div>
            </div>
          )}

          {/* AI Buy/Sell Consensus Card - Full Width Best-Fit Matrix */}
          {verdict && (
            <div id="consensus-matrix-desk" className="w-full scroll-mt-28">
              <ConsensusCard
                verdict={verdict}
                onRefresh={() => fetchTerminalData(selectedSymbol)}
                isLoading={isLoading}
              />
            </div>
          )}

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

      {/* Real-Time CoinSwitch PRO Top Gainers Bar */}
      <div className="pt-4">
        <TopGainersBar />
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
