'use client';

import React from 'react';
import { RAGDocument } from '@/lib/types';
import { Database, Sparkles, BookOpen } from 'lucide-react';

interface RagDocumentsViewerProps {
  documents: RAGDocument[];
  macroSummary?: string;
}

export default function RagDocumentsViewer({ documents, macroSummary }: RagDocumentsViewerProps) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#0c1222] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center shadow-sm">
            <Database className="w-6 h-6 text-purple-700 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
              <span>Retrieved RAG Knowledge &amp; Historical Analogs</span>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-extrabold">
                VECTOR EMBEDDINGS (KB-7)
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Semantic retrieval from historical crypto halving cycles, ETF liquidity absorption, and macro regimes
            </p>
          </div>
        </div>
      </div>

      {/* Macro Regime Synthesis */}
      {macroSummary && (
        <div className="mb-8 p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs sm:text-sm font-mono text-purple-950 dark:text-purple-200 leading-relaxed shadow-sm">
          <span className="text-purple-800 dark:text-purple-300 font-black mb-1.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Macro Semantic Synthesis:
          </span>
          <p className="leading-relaxed font-medium">{macroSummary}</p>
        </div>
      )}

      {/* Retrieved Documents Grid with Tile Pop-Up Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, idx) => {
          const similarityPct = Math.round((doc.similarityScore || 0.8) * 100);

          // Give each card a distinct colorful aura based on index or category
          const colorVariants = [
            {
              border: 'border-amber-300 dark:border-amber-800/80',
              bg: 'bg-gradient-to-br from-amber-50/70 via-orange-50/20 to-white dark:from-[#1b1307] dark:to-slate-900',
              badge: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700',
              score: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
            },
            {
              border: 'border-cyan-300 dark:border-cyan-800/80',
              bg: 'bg-gradient-to-br from-cyan-50/70 via-sky-50/20 to-white dark:from-[#081822] dark:to-slate-900',
              badge: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-900 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700',
              score: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800',
            },
            {
              border: 'border-fuchsia-300 dark:border-fuchsia-800/80',
              bg: 'bg-gradient-to-br from-fuchsia-50/70 via-pink-50/20 to-white dark:from-[#1f091d] dark:to-slate-900',
              badge: 'bg-fuchsia-100 dark:bg-fuchsia-950/80 text-fuchsia-900 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-700',
              score: 'text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/60 border-fuchsia-300 dark:border-fuchsia-800',
            },
            {
              border: 'border-lime-300 dark:border-lime-800/80',
              bg: 'bg-gradient-to-br from-lime-50/70 via-emerald-50/20 to-white dark:from-[#0d1c0e] dark:to-slate-900',
              badge: 'bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border-lime-300 dark:border-lime-700',
              score: 'text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/60 border-lime-300 dark:border-lime-800',
            },
            {
              border: 'border-rose-300 dark:border-rose-800/80',
              bg: 'bg-gradient-to-br from-rose-50/70 via-orange-50/20 to-white dark:from-[#21090f] dark:to-slate-900',
              badge: 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-700',
              score: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800',
            },
            {
              border: 'border-indigo-300 dark:border-indigo-800/80',
              bg: 'bg-gradient-to-br from-indigo-50/70 via-purple-50/20 to-white dark:from-[#100d23] dark:to-slate-900',
              badge: 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
              score: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800',
            },
          ];

          const variant = colorVariants[idx % colorVariants.length];

          return (
            <div
              key={doc.id}
              className={`p-6 rounded-3xl ${variant.bg} border ${variant.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md uppercase font-bold shadow-sm border ${variant.badge}`}>
                    {doc.category.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${variant.score}`}>
                    {similarityPct}% match
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-2 leading-snug tracking-tight">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed line-clamp-4">
                  {doc.content}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-1.5">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
