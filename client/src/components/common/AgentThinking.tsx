'use client';

import React, { useState } from 'react';
import { AgentInsight } from '@/lib/types';
import { Cpu, CheckCircle2, ChevronDown, ChevronUp, Bot, BrainCircuit, Activity, Database, TrendingUp, Sparkles } from 'lucide-react';

interface AgentThinkingProps {
  insights: AgentInsight[];
  logs?: string[];
}

export default function AgentThinking({ insights, logs = [] }: AgentThinkingProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [showLogs, setShowLogs] = useState(false);

  const getAgentTheme = (id: string) => {
    switch (id) {
      case 'agent-tech-quant':
        return {
          icon: Activity,
          accentText: 'text-sky-700',
          accentBg: 'bg-sky-50 border-sky-200',
          tileBg: 'bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-white border-sky-200/90',
          barGrad: 'from-sky-600 to-indigo-600',
        };
      case 'agent-onchain-flow':
        return {
          icon: Database,
          accentText: 'text-emerald-700',
          accentBg: 'bg-emerald-50 border-emerald-200',
          tileBg: 'bg-gradient-to-br from-emerald-50/80 via-teal-50/30 to-white border-emerald-200/90',
          barGrad: 'from-emerald-600 to-teal-600',
        };
      case 'agent-sentiment-rag':
        return {
          icon: BrainCircuit,
          accentText: 'text-purple-700',
          accentBg: 'bg-purple-50 border-purple-200',
          tileBg: 'bg-gradient-to-br from-purple-50/80 via-indigo-50/30 to-white border-purple-200/90',
          barGrad: 'from-purple-600 to-sky-600',
        };
      case 'agent-predictive-forecast':
        return {
          icon: TrendingUp,
          accentText: 'text-amber-700',
          accentBg: 'bg-amber-50 border-amber-200',
          tileBg: 'bg-gradient-to-br from-amber-50/80 via-orange-50/30 to-white border-amber-200/90',
          barGrad: 'from-amber-600 to-emerald-600',
        };
      default:
        return {
          icon: Bot,
          accentText: 'text-slate-700',
          accentBg: 'bg-slate-50 border-slate-200',
          tileBg: 'bg-gradient-to-br from-slate-50 via-white to-slate-50/60 border-slate-200',
          barGrad: 'from-slate-600 to-slate-400',
        };
    }
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes('BUY')) return 'text-emerald-800 bg-emerald-50 border-emerald-300 shadow-sm';
    if (action.includes('SELL')) return 'text-rose-800 bg-rose-50 border-rose-300 shadow-sm';
    return 'text-amber-800 bg-amber-50 border-amber-300';
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.06),inset_0_1px_0_0_rgba(255,255,255,0.9)]">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-sm">
            <Cpu className="w-6 h-6 text-emerald-700 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
              Institutional Quantitative Consensus Stream
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-extrabold">
                4 Specialized Nodes
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">Multi-model algorithmic deliberation synthesizing real-time quantitative conviction</p>
          </div>
        </div>

        <button
          onClick={() => setShowLogs(!showLogs)}
          className="text-xs font-mono font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-all duration-200 shadow-sm"
        >
          {showLogs ? 'Hide Execution Logs' : 'View Execution Logs'}
        </button>
      </div>

      {/* 4 Agent Nodes Grid with Pop-Up Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((agent) => {
          const theme = getAgentTheme(agent.agentId);
          const Icon = theme.icon;
          const isExpanded = expandedAgent === agent.agentId;

          return (
            <div
              key={agent.agentId}
              className={`rounded-2xl border transition-all duration-200 p-6 cursor-pointer shadow-sm ${theme.tileBg} ${
                isExpanded
                  ? 'border-slate-400 shadow-md -translate-y-1'
                  : 'hover:border-slate-400 hover:shadow-md hover:-translate-y-1'
              }`}
              onClick={() => setExpandedAgent(isExpanded ? null : agent.agentId)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${theme.accentBg}`}>
                    <Icon className={`w-6 h-6 ${theme.accentText}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">{agent.agentName}</h4>
                    <p className="text-[11px] font-mono text-slate-500 mt-1 font-medium">{agent.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-xl border ${getActionBadgeColor(agent.recommendation)}`}>
                    {agent.recommendation}
                  </span>
                  <div className="text-slate-400 hover:text-slate-800 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Progress & Conviction Meter */}
              <div className="mt-5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 font-bold uppercase">Agent Conviction:</span>
                <span className="text-slate-900 font-black">{agent.score}/100 <span className="text-slate-500 text-[11px]">({Math.round(agent.confidence * 100)}% conf)</span></span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden mt-2 p-[1px]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.barGrad} transition-all duration-700 shadow-sm`}
                  style={{ width: `${agent.score}%` }}
                />
              </div>

              {/* Expanded Reasoning Drawer */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in duration-200">
                  <p className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Deliberation Insights:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 font-mono">
                    {agent.reasoning.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accentText}`} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Metrics */}
                  <div className="mt-4 pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {Object.entries(agent.keyMetrics).map(([k, v]) => (
                      <div key={k} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">{k}:</span>
                        <span className={`font-black truncate block mt-0.5 ${theme.accentText}`}>{String(v)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Graph Trace Logs */}
      {showLogs && logs.length > 0 && (
        <div className="mt-8 p-5 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto shadow-inner">
          <p className="text-emerald-400 font-bold mb-2">// Quantitative State Transition Logs:</p>
          {logs.map((log, idx) => (
            <p key={idx} className="text-slate-400 leading-relaxed">
              <span className="text-emerald-400 font-bold mr-2">{`>`}</span>
              {log}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
