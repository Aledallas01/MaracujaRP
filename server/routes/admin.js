import express from 'express';
import RuleSection from '../models/RuleSection.js';
import Rule from '../models/Rule.js';

const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalRules = await Rule.countDocuments();
    const totalSections = await RuleSection.countDocuments();

    res.json({
      stats: {
        totalRules,
        totalSections,
        totalUsers: 127, // Mock data
        activeUsers: 89   // Mock data
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Errore nel recupero delle statistiche' });
  }
});

export default router;