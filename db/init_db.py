"""Apply schema and insert example data into db/test.sqlite"""
import sqlite3
import pathlib

DB_PATH = pathlib.Path('db/test.sqlite')
SCHEMA_PATH = pathlib.Path('db/schema.sql')

if not DB_PATH.exists():
    print('Database file not found:', DB_PATH)
    raise SystemExit(1)

sql = SCHEMA_PATH.read_text()

conn = sqlite3.connect(DB_PATH)
conn.executescript(sql)
cur = conn.cursor()

# Insert example deck and cards (idempotent by name)
cur.execute("INSERT OR IGNORE INTO \"Deck\"(name) VALUES (?)", ('Basic',))
conn.commit()

cur.execute("SELECT id FROM \"Deck\" WHERE name = ?", ('Basic',))
deck_id = cur.fetchone()[0]

examples = [
    ('kissa', 'macska', deck_id),
    ('koira', 'kutya', deck_id)
]

cur.executemany("INSERT INTO \"Card\"(finnish, hungarian, deck_id) VALUES (?, ?, ?)", examples)
conn.commit()

# Show created tables and sample rows
cur.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
print('Tables:')
for row in cur.fetchall():
    print('-', row[0])

print('\nDecks:')
for row in cur.execute('SELECT id, name, created_at FROM "Deck"'):
    print(row)

print('\nCards:')
for row in cur.execute('SELECT id, finnish, hungarian, deck_id FROM "Card"'):
    print(row)

conn.close()
