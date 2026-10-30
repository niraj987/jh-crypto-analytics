import { Annotation } from '@langchain/langgraph';
import { CryptoAsset, TechnicalIndicators, AgentInsight, ConsensusVerdict, RAGDocument, RAGForecastResult } from '../types/index.js';

export const AgentStateAnnotation = Annotation.Root({
  symbol: Annotation<string>(),
  asset: Annotation<CryptoAsset>(),
  indicators: Annotation<TechnicalIndicators>(),
  technicalInsight: Annotation<AgentInsight | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  onchainInsight: Annotation<AgentInsight | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  sentimentInsight: Annotation<AgentInsight | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  forecastInsight: Annotation<AgentInsight | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  ragDocuments: Annotation<RAGDocument[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
  forecastResult: Annotation<RAGForecastResult | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  verdict: Annotation<ConsensusVerdict | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  logs: Annotation<string[]>({
    reducer: (curr, next) => curr.concat(next),
    default: () => [],
  }),
});

export type AgentState = typeof AgentStateAnnotation.State;

