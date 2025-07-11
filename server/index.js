import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './models/database.js';
import rulesRoutes from './routes/rules.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/rules', rulesRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Maracuja RP API Server 🏝️', 
    status: 'online',
    endpoints: {
      health: '/api/health',
      rules: '/api/rules/sections',
      admin: '/api/admin/stats'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server Maracuja RP attivo! 🏝️' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server avviato su porta ${PORT}`);
});