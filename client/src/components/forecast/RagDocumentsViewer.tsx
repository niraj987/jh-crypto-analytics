'use client';

import React from 'react';
import { RAGDocument } from '@/lib/types';
import { Database, Sparkles } from 'lucide-react';

interface RagDocumentsViewerProps {
  documents: RAGDocument[];
  macroSummary?: string;
}

export default function RagDocumentsViewer({ documents, macroSummary }: RagDocumentsViewerProps) {
  return (
    <div className="py-6">
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Retrieved Knowledge &amp; Historical Analogs
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-relaxed">
          Our quantitative research framework contextualizes current price regimes against historical halving cycle dynamics, ETF net liquidity absorption, and macroeconomic liquidity flows.
        </p>
      </div>

      {/* Macro Regime Synthesis - Open Narrative */}
      {macroSummary && (
        <div className="mb-10 pl-6 border-l-4 border-indigo-500 py-2">
          <span className="text-xs uppercase tracking-widest font-black text-indigo-600 dark:text-indigo-400 block mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" /> Macro Regime Synthesis &amp; Market Dynamics
          </span>
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
            {macroSummary}
          </p>
        </div>
      )}

      {/* Narrative List of Historical Analogs without Box Grid */}
      <div className="space-y-10">
        {documents.map((doc, idx) => {
          const similarityPct = Math.round((doc.similarityScore || 0.8) * 100);

          const accents = [
            { text: 'text-amber-600 dark:text-amber-400' },
            { text: 'text-cyan-600 dark:text-cyan-400' },
            { text: 'text-fuchsia-600 dark:text-fuchsia-400' },
            { text: 'text-emerald-600 dark:text-emerald-400' },
            { text: 'text-rose-600 dark:text-rose-400' },
          ];
          const accent = accents[idx % accents.length];

          return (
            <div key={doc.id} className="pt-8 first:pt-0 border-b border-slate-100 dark:border-slate-800/60 pb-8 last:border-b-0">
              <div className="flex flex-wrap items-center gap-3 text-xs mb-2">
                <span className={`font-black uppercase tracking-wider ${accent.text}`}>
                  {doc.category.replace('_', ' ')}
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span className="font-semibold text-slate-500 dark:text-slate-400">
                  {similarityPct}% Statistical Correlation
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {doc.title}
              </h4>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-5xl mb-4 font-normal">
                {doc.content}
              </p>

              {doc.tags && doc.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-400 dark:text-slate-500">Key Analogs:</span>
                  {doc.tags.map((tag) => (
                    <span key={tag} className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
