import { CRYPTO_KNOWLEDGE_BASE } from './knowledgeBase.js';
import { RAGDocument } from '../types/index.js';

export class CryptoVectorStore {
  private documents: RAGDocument[];

  constructor() {
    this.documents = CRYPTO_KNOWLEDGE_BASE;
  }

  // Tokenize and extract character/word shingles for similarity calculation
  private getTermVector(text: string): Map<string, number> {
    const tokens = text.toLowerCase().match(/\b[a-z0-9_-]{2,}\b/g) || [];
    const freq = new Map<string, number>();
    for (const token of tokens) {
      freq.set(token, (freq.get(token) || 0) + 1);
    }
    return freq;
  }

  private cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (const [, val] of vecA) {
      normA += val * val;
    }
    for (const [, val] of vecB) {
      normB += val * val;
    }

    if (normA === 0 || normB === 0) return 0;

    for (const [key, valA] of vecA) {
      if (vecB.has(key)) {
        dotProduct += valA * vecB.get(key)!;
      }
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  public search(query: string, category?: string, limit: number = 3): (RAGDocument & { similarityScore: number })[] {
    const queryVector = this.getTermVector(query);
    
    const results = this.documents
      .filter((doc) => !category || doc.category === category)
      .map((doc) => {
        const fullDocText = `${doc.title} ${doc.tags.join(' ')} ${doc.content}`;
        const docVector = this.getTermVector(fullDocText);
        
        let score = this.cosineSimilarity(queryVector, docVector);
        
        // Boost score if specific tags match the query
        const queryLower = query.toLowerCase();
        for (const tag of doc.tags) {
          if (queryLower.includes(tag.toLowerCase())) {
            score += 0.25;
          }
        }
        
        return {
          ...doc,
          similarityScore: Math.min(Math.round(score * 100) / 100, 0.99),
        };
      })
      .sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));

    return results.slice(0, limit);
  }

  public getAll(): RAGDocument[] {
    return this.documents;
  }
}

export const vectorStore = new CryptoVectorStore();

