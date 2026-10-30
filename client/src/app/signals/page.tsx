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
import TradeOrderPanel from '@/components/terminal/TradeOrderPanel';
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
    const el = document.getElementById('trade-order-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 space-y-8">
      
      {/* Top Terminal Status Header */}
      <div className="relative overflow-hidden flex flex-col gap-6 p-7 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.05)]">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden rounded-3xl opacity-[0.035] mix-blend-multiply">
          <img
            src="/photos/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg"
            alt="Trading Atmosphere"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex items-center justify-center shadow-sm">
              <Image
                src="/jh-logo.png"
                alt="JH Logo"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {currentAsset ? `${currentAsset.symbol}/INR` : `${selectedSymbol}/INR`}
                </h1>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-extrabold shadow-sm">
                  CoinSwitchX L2
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono mt-1 font-medium text-slate-600 dark:text-slate-400">
                <span className="text-slate-950 dark:text-white font-black text-lg">
                  {currentAsset ? formatINR(currentAsset.currentPrice) : '...'}
                </span>
                <span className={`font-black text-sm px-2 py-0.5 rounded ${currentAsset && currentAsset.change24h >= 0 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                  {currentAsset && currentAsset.change24h >= 0 ? '+' : ''}{currentAsset?.change24h}%
                </span>
                <span className="text-slate-400">|</span>
                <span>24H High: <strong className="text-slate-900 dark:text-slate-200">{currentAsset ? formatINR(currentAsset.high24h) : '...'}</strong></span>
                <span className="text-slate-400">|</span>
                <span>24H Low: <strong className="text-slate-900 dark:text-slate-200">{currentAsset ? formatINR(currentAsset.low24h) : '...'}</strong></span>
                <span className="text-slate-400">|</span>
                <span>24H Vol (INR): <strong className="text-emerald-600 dark:text-emerald-400">{currentAsset ? formatINRLarge(currentAsset.volume24h) : '...'}</strong></span>
              </div>
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

        {/* Real-Time Price Metrics Strip */}
        {currentAsset && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h High (₹)</span>
              <span className="text-slate-950 font-black text-sm mt-0.5 block">{formatINR(currentAsset.high24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h Low (₹)</span>
              <span className="text-slate-950 font-black text-sm mt-0.5 block">{formatINR(currentAsset.low24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">24h Volume</span>
              <span className="text-emerald-700 font-black text-sm mt-0.5 block">{formatINRLarge(currentAsset.volume24h)}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 text-[10px] block font-bold uppercase">Market Cap</span>
              <span className="text-sky-700 font-black text-sm mt-0.5 block">{formatINRLarge(currentAsset.marketCap)}</span>
            </div>
          </div>
        )}

        {/* Live CoinSwitch PRO Connected Account Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-sm">CoinSwitch PRO Account Connected</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 font-bold">LIVE API</span>
              </div>
              <p className="text-[11px] text-slate-400">Authenticated via Ed25519 Private Key • Direct coinswitchx INR Order Routing</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-slate-400 block text-[10px]">INR Cash Balance:</span>
              <span className="text-emerald-400 font-black text-sm">₹{csPortfolio?.balances.find((b: any) => b.currency === 'INR')?.main_balance || '0.30'}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
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
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
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

          {/* AI Buy/Sell Consensus Card & Trade Order Execution Desk - Aligned Equal Height Grid */}
          <div id="trade-order-desk" className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch scroll-mt-28">
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
