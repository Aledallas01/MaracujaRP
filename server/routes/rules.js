import express from 'express';
import RuleSection from '../models/RuleSection.js';
import Rule from '../models/Rule.js';

const router = express.Router();

// Get all sections with rules
router.get('/sections', async (req, res) => {
  try {
    const sections = await RuleSection.find().sort({ orderIndex: 1 });
    const rules = await Rule.find().sort({ orderIndex: 1 });

    const sectionsWithRules = sections.map(section => ({
      id: section.id,
      title: section.title,
      description: section.description,
      icon: section.icon,
      orderIndex: section.orderIndex,
      rules: rules
        .filter(rule => rule.sectionId.toString() === section._id.toString())
        .map(rule => ({
          id: rule.id,
          title: rule.title,
          content: rule.content,
          orderIndex: rule.orderIndex,
          createdBy: rule.createdBy,
          createdAt: rule.createdAt,
          updatedAt: rule.updatedAt
        }))
    }));

    res.json(sectionsWithRules);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Errore nel recupero delle sezioni' });
  }
});

// Create rule
router.post('/rules', async (req, res) => {
  try {
    const { sectionId, title, content, orderIndex } = req.body;

    const rule = new Rule({
      sectionId,
      title,
      content,
      orderIndex: orderIndex || 0
    });

    await rule.save();

    res.status(201).json({
      message: 'Regola creata con successo',
      rule: {
        id: rule.id,
        title: rule.title,
        content: rule.content,
        orderIndex: rule.orderIndex,
        createdBy: rule.createdBy,
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt
      }
    });
  } catch (error) {
    console.error('Error creating rule:', error);
    res.status(500).json({ error: 'Errore nella creazione della regola' });
  }
});

// Update rule
router.put('/rules/:id', async (req, res) => {
  try {
    const { title, content, orderIndex, sectionId } = req.body;
    
    const updateData = { title, content, orderIndex };
    if (sectionId) {
      updateData.sectionId = sectionId;
    }
    
    const rule = await Rule.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!rule) {
      return res.status(404).json({ error: 'Regola non trovata' });
    }

    res.json({
      message: 'Regola aggiornata con successo',
      rule: {
        id: rule.id,
        title: rule.title,
        content: rule.content,
        orderIndex: rule.orderIndex,
        createdBy: rule.createdBy,
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating rule:', error);
    res.status(500).json({ error: 'Errore nell\'aggiornamento della regola' });
  }
});

// Delete rule
router.delete('/rules/:id', async (req, res) => {
  try {
    const rule = await Rule.findByIdAndDelete(req.params.id);
    
    if (!rule) {
      return res.status(404).json({ error: 'Regola non trovata' });
    }

    res.json({ message: 'Regola eliminata con successo' });
  } catch (error) {
    console.error('Error deleting rule:', error);
    res.status(500).json({ error: 'Errore nell\'eliminazione della regola' });
  }
});

export default router;