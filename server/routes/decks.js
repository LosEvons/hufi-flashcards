const express = require('express');
const router = express.Router();
const { all, get, run } = require('../db');

// List decks with card counts
router.get('/', (req, res) => {
  try {
    const rows = all(
      `SELECT d.id, d.name, d.created_at,
        (SELECT COUNT(*) FROM Card c WHERE c.deck_id = d.id) AS cardCount
       FROM Deck d
       ORDER BY d.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create deck
router.post('/', (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'name is required' });
  
  try {
    const info = run('INSERT INTO Deck (name) VALUES (?)', [name]);
    const deck = get('SELECT id, name FROM Deck WHERE id = ?', [info.lastInsertRowid]);
    res.status(201).json(deck);
  } catch (err) {
    console.error(err);
    if (err?.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Constraint error', details: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete deck (and cascade cards via FK)
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  
  try {
    run('DELETE FROM Deck WHERE id = ?', [id]);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
