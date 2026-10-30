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
    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shadow-sm">
            <Database className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
              <span>Retrieved RAG Knowledge & Historical Analogs</span>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-extrabold">
                VECTOR EMBEDDINGS (KB-7)
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Semantic retrieval from historical crypto halving cycles, ETF liquidity absorption, and macro regimes
            </p>
          </div>
        </div>
      </div>

      {/* Macro Regime Synthesis */}
      {macroSummary && (
        <div className="mb-8 p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs font-mono text-purple-950 leading-relaxed shadow-sm">
          <span className="text-purple-800 font-black mb-1.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Macro Semantic Synthesis:
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
              className="p-6 rounded-3xl bg-slate-50/60 border border-slate-200 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white text-slate-600 border border-slate-200 uppercase font-bold shadow-sm">
                    {doc.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-700 px-2.5 py-0.5 rounded-lg bg-purple-50 border border-purple-200">
                    {similarityPct}% match
                  </span>
                </div>

                <h4 className="text-sm font-black text-slate-900 mb-2 leading-snug tracking-wide">{doc.title}</h4>
                <p className="text-xs text-slate-600 font-mono leading-relaxed line-clamp-4">
                  {doc.content}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white text-slate-500 border border-slate-200"
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
