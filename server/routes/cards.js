const express = require('express');
const router = express.Router();
const { all, get, run } = require('../db');

// List cards for a deck
router.get('/decks/:deckId/cards', async (req, res) => {
  const deckId = Number(req.params.deckId);
  if (!deckId) return res.status(400).json({ error: 'invalid deckId' });
  
  try {
    const deck = get('SELECT id, name FROM Deck WHERE id = ?', [deckId]);
    if (!deck) return res.status(404).json({ error: 'Deck not found' });
    
    const cards = all('SELECT id, finnish, hungarian, created_at FROM Card WHERE deck_id = ? ORDER BY created_at DESC', [deckId]);
    res.json({ deckId: deck.id, deckName: deck.name, cards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a card to a deck
router.post('/decks/:deckId/cards', async (req, res) => {
  const deckId = Number(req.params.deckId);
  const { finnish, hungarian } = req.body || {};
  if (!deckId || !finnish || !hungarian) {
    return res.status(400).json({ error: 'deckId, finnish and hungarian are required' });
  }
  
  try {
    const deck = get('SELECT id FROM Deck WHERE id = ?', [deckId]);
    if (!deck) return res.status(404).json({ error: 'Deck not found' });
    
    const info = run('INSERT INTO Card (finnish, hungarian, deck_id) VALUES (?, ?, ?)', [finnish, hungarian, deckId]);
    const card = get('SELECT id, finnish, hungarian, deck_id FROM Card WHERE id = ?', [info.lastInsertRowid]);
    res.status(201).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit a card
router.put('/cards/:cardId', async (req, res) => {
  const cardId = Number(req.params.cardId);
  const { finnish, hungarian } = req.body || {};
  if (!cardId) return res.status(400).json({ error: 'invalid cardId' });
  
  try {
    const card = get('SELECT id, finnish, hungarian, deck_id FROM Card WHERE id = ?', [cardId]);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    
    const newFinnish = finnish !== undefined ? finnish : card.finnish;
    const newHungarian = hungarian !== undefined ? hungarian : card.hungarian;
    run('UPDATE Card SET finnish = ?, hungarian = ? WHERE id = ?', [newFinnish, newHungarian, cardId]);
    
    const updated = get('SELECT id, finnish, hungarian, deck_id FROM Card WHERE id = ?', [cardId]);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a card
router.delete('/cards/:cardId', async (req, res) => {
  const cardId = Number(req.params.cardId);
  if (!cardId) return res.status(400).json({ error: 'invalid cardId' });
  
  try {
    run('DELETE FROM Card WHERE id = ?', [cardId]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
