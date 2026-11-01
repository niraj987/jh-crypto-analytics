'use client';

import React, { useState, useMemo } from 'react';
import { CryptoAsset } from '@/lib/types';
import { formatINR } from '@/lib/currency';
import { Search, Flame, Crown, Globe, Sparkles, Cpu, ArrowUpDown } from 'lucide-react';

interface AssetSelectorProps {
  assets: CryptoAsset[];
  selectedSymbol: string;
  onSelect: (symbol: string) => void;
  onCustomSearch: (query: string) => void;
}

export default function AssetSelector({ assets, selectedSymbol, onSelect, onCustomSearch }: AssetSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Major' | 'Meme' | 'DeFi' | 'AI'>('All');
  const [searchVal, setSearchVal] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'gainers' | 'losers' | 'name'>('volume');

  const categories = [
    { id: 'All', label: 'All (48)', icon: Sparkles },
    { id: 'Major', label: 'Majors & L1', icon: Crown },
    { id: 'Meme', label: 'Memes', icon: Flame },
    { id: 'DeFi', label: 'DeFi & Web3', icon: Globe },
    { id: 'AI', label: 'AI & Data', icon: Cpu },
  ] as const;

  const filteredAssets = useMemo(() => {
    let result = assets.filter((asset) => {
      const matchesCat = activeCategory === 'All' || asset.category === activeCategory;
      const matchesSearch = asset.symbol.toLowerCase().includes(searchVal.toLowerCase()) || 
        asset.name.toLowerCase().includes(searchVal.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (sortBy === 'volume') {
      result = [...result].sort((a, b) => b.volume24h - a.volume24h);
    } else if (sortBy === 'gainers') {
      result = [...result].sort((a, b) => b.change24h - a.change24h);
    } else if (sortBy === 'losers') {
      result = [...result].sort((a, b) => a.change24h - b.change24h);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.symbol.localeCompare(b.symbol));
    }

    return result;
  }, [assets, activeCategory, searchVal, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onCustomSearch(searchVal.trim().toUpperCase());
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#121721] border border-slate-200 dark:border-slate-800 p-6 shadow-sm h-full flex flex-col transition-colors duration-200">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Comprehensive Asset Matrix
          </h3>
          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {filteredAssets.length} of {assets.length} Tokens
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative mb-3">
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Filter by Ticker or Name (e.g. SUI, TAO, AAVE)..."
          className="w-full bg-slate-50 dark:bg-[#0c1017] border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono font-bold focus:outline-none focus:border-emerald-600 transition-all"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </form>

      {/* Category Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-mono transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white font-black shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 mb-0.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span className="truncate">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sort Options Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3 px-1">
        <span className="flex items-center gap-1"><ArrowUpDown className="w-3 h-3 text-slate-400" /> Sort by:</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSortBy('volume')}
            className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'volume' ? 'bg-slate-900 dark:bg-slate-700 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            Volume
          </button>
          <button
            onClick={() => setSortBy('gainers')}
            className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'gainers' ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            Gainers
          </button>
          <button
            onClick={() => setSortBy('losers')}
            className={`px-2 py-0.5 rounded transition-colors ${sortBy === 'losers' ? 'bg-rose-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            Losers
          </button>
        </div>
      </div>

      {/* Spacious Asset List with Pop-up Hover Effect */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[580px] scrollbar-thin">
        {filteredAssets.map((asset) => {
          const isSelected = selectedSymbol === asset.symbol;
          const isUp = asset.change24h >= 0;

          return (
            <div
              key={asset.symbol}
              onClick={() => onSelect(asset.symbol)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                isSelected
                  ? 'bg-slate-900 dark:bg-slate-800 text-white border-emerald-500 shadow-lg translate-x-1 ring-2 ring-emerald-500/30'
                  : 'bg-slate-50/70 dark:bg-[#0c1017] hover:bg-white dark:hover:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:translate-x-1 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs font-mono shadow-sm ${
                  isSelected 
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                }`}>
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold tracking-wide ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {asset.symbol}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isSelected 
                        ? 'bg-slate-800 dark:bg-slate-900 text-slate-300' 
                        : asset.category === 'Major' 
                          ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                          : asset.category === 'Meme'
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : asset.category === 'DeFi'
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}>
                      {asset.category}
                    </span>
                  </div>
                  <p className={`text-[11px] truncate max-w-[110px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>
                    {asset.name}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className={`text-xs font-black block ${isSelected ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                  {formatINR(asset.currentPrice)}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                    isUp 
                      ? (isSelected ? 'text-emerald-300 bg-emerald-950/80' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800')
                      : (isSelected ? 'text-rose-300 bg-rose-950/80' : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800')
                  }`}
                >
                  {isUp ? '+' : ''}{asset.change24h}%
                </span>
              </div>
            </div>
          );
        })}

        {filteredAssets.length === 0 && (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-mono">No matching token for &quot;{searchVal}&quot;</p>
            <button
              onClick={() => onCustomSearch(searchVal.toUpperCase())}
              className="mt-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 underline"
            >
              Analyze Custom Ticker {searchVal.toUpperCase()} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
