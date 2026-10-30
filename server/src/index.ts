import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agentRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import ragRoutes from './routes/ragRoutes.js';
import authRoutes from './routes/authRoutes.js';
import coinswitchRoutes from './routes/coinswitchRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/coinswitch', coinswitchRoutes);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    system: 'AetherQuant Multi-Agent Core',
    langgraph: 'active',
    ragStore: 'loaded',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 AetherQuant AI Express Server Running on Port ${PORT}`);
  console.log(`🧠 LangGraph Multi-Agent Consensus: http://localhost:${PORT}/api/agents/consensus`);
  console.log(`📈 Real-Time Indicator & Market Feed: http://localhost:${PORT}/api/market/catalog`);
  console.log(`🔮 RAG Scenario Forecasting: http://localhost:${PORT}/api/rag/forecast`);
  console.log(`====================================================`);
});

