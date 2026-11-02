'use client';

import React from 'react';
import { RAGDocument } from '@/lib/types';
import { Database, Sparkles, Activity, Layers, Compass, ArrowUpRight } from 'lucide-react';

interface RagDocumentsViewerProps {
  documents: RAGDocument[];
  macroSummary?: string;
}

export default function RagDocumentsViewer({ documents, macroSummary }: RagDocumentsViewerProps) {
  const getCategoryTheme = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('microstructure') || cat.includes('orderbook')) {
      return {
        text: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50 dark:bg-sky-950/50',
        border: 'border-sky-200 dark:border-sky-800/80',
        bar: 'bg-sky-500',
        dot: 'bg-sky-500 shadow-[0_0_8px_#0284c7]',
      };
    }
    if (cat.includes('chain') || cat.includes('whale') || cat.includes('forensics')) {
      return {
        text: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/50',
        border: 'border-emerald-200 dark:border-emerald-800/80',
        bar: 'bg-emerald-500',
        dot: 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
      };
    }
    if (cat.includes('macro') || cat.includes('liquidity')) {
      return {
        text: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/50',
        border: 'border-indigo-200 dark:border-indigo-800/80',
        bar: 'bg-indigo-500',
        dot: 'bg-indigo-500 shadow-[0_0_8px_#6366f1]',
      };
    }
    return {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/50',
      border: 'border-amber-200 dark:border-amber-800/80',
      bar: 'bg-amber-500',
      dot: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
    };
  };

  return (
    <div className="py-8 space-y-10">
      
      {/* Section Header with Elite Institutional Typography */}
      <div className="pb-6 border-b border-slate-200/80 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
            Semantic Vector Retrieval &amp; Historical Knowledge
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Retrieved Knowledge &amp; Historical Analogs
        </h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-relaxed pt-1">
          Our quantitative research framework contextualizes current price regimes against historical halving cycle dynamics, ETF net liquidity absorption, and macroeconomic liquidity flows.
        </p>
      </div>

      {/* Macro Regime Synthesis - Executive Briefing Card */}
      {macroSummary && (
        <div className="rounded-2xl p-6 sm:p-7 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent border-l-4 border-indigo-600 dark:border-indigo-400 border-t border-r border-b border-indigo-100/60 dark:border-indigo-950/60 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Macro Regime Synthesis &amp; Market Dynamics</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {macroSummary}
          </p>
        </div>
      )}

      {/* Structured Aligned RAG Documents */}
      <div className="space-y-6">
        {documents.map((doc, idx) => {
          const similarityPct = Math.round((doc.similarityScore || 0.8) * 100);
          const theme = getCategoryTheme(doc.category);

          return (
            <div
              key={doc.id}
              className="group p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-[#0c1220]/70 hover:bg-white dark:hover:bg-[#0e1626] border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 shadow-xs hover:shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Category Badge & Correlation Meter */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                    <span className={`text-xs font-mono font-black uppercase tracking-wider ${theme.text}`}>
                      {doc.category.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Statistical Correlation Gauge */}
                  <div className="space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-bold">
                      <span>Statistical Correlation:</span>
                      <span className={`text-sm font-black ${theme.text}`}>{similarityPct}%</span>
                    </div>
                    <div className="w-full bg-slate-200/70 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${theme.bar} rounded-full transition-all duration-700`}
                        style={{ width: `${similarityPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Analysis Narrative & Analogs */}
                <div className="lg:col-span-8 space-y-3">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {doc.title}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {doc.content}
                  </p>

                  {/* Clean Aligned Analogs Pills */}
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
                      <span className="font-bold text-slate-400 dark:text-slate-500">Key Analogs:</span>
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 font-medium hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
