-- Suggested schema for hufi-flashcards
-- Improvements included: primary keys, NOT NULL constraints, foreign key with cascade,
-- unique deck name, created_at timestamps and an index on deck_id.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Deck" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Card" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  finnish TEXT NOT NULL,
  hungarian TEXT NOT NULL,
  deck_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (deck_id) REFERENCES "Deck"(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_card_deck_id ON "Card"(deck_id);
