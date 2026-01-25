const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'db', 'test.sqlite');

// Ensure directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// Ensure file exists
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '');

const db = new Database(DB_PATH);

function migrate() {
  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.warn('No schema.sql found at', schemaPath);
    return;
  }
  const sql = fs.readFileSync(schemaPath, 'utf8');
  if (sql?.trim()) db.exec(sql);
}

function all(sql, params = []) {
  return db.prepare(sql).all(...params);
}

function get(sql, params = []) {
  return db.prepare(sql).get(...params);
}

function run(sql, params = []) {
  return db.prepare(sql).run(...params);
}

module.exports = { db, migrate, all, get, run };
