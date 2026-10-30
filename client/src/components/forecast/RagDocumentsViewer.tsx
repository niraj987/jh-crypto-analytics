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
        {documents.map((doc) => {
          const similarityPct = Math.round((doc.similarityScore || 0.8) * 100);

          return (
            <div
              key={doc.id}
              className="p-6 rounded-3xl bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase font-bold shadow-sm">
                    {doc.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800">
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
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
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
