const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'db', 'test.sqlite');

let SQL = null;
let db = null;

// Initialize the in-memory DB from disk (or create empty DB)
async function initDB() {
  if (db) return db;
  
  SQL = await initSqlJs({ locateFile: file => path.join(__dirname, 'node_modules', 'sql.js', 'dist', file) });
  
  // ensure directory exists
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  if (fs.existsSync(DB_PATH) && fs.statSync(DB_PATH).size > 0) {
    const data = fs.readFileSync(DB_PATH);
    db = new SQL.Database(new Uint8Array(data));
  } else {
    db = new SQL.Database();
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
  return db;
}

function ensureDb() {
  if (!db) throw new Error('Database not initialized. Call initDB() first.');
}

async function migrate() {
  ensureDb();
  const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.warn('No schema.sql found at', schemaPath);
    return;
  }
  const sql = fs.readFileSync(schemaPath, 'utf8');
  if (sql?.trim()) {
    db.exec(sql);
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
}

function all(sql, params = []) {
  ensureDb();
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function get(sql, params = []) {
  ensureDb();
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  let row = undefined;
  if (stmt.step()) row = stmt.getAsObject();
  stmt.free();
  return row;
}

function run(sql, params = []) {
  ensureDb();
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  stmt.step();
  stmt.free();
  
  // fetch SQLite metadata
  let lastInsertRowid;
  try {
    const last = db.exec('SELECT last_insert_rowid() AS id');
    if (last?.[0]?.values?.[0]) {
      lastInsertRowid = last[0].values[0][0];
    }
  } catch (e) {
    lastInsertRowid = undefined;
  }
  
  let changes;
  try {
    const ch = db.exec('SELECT changes() AS changes');
    if (ch?.[0]?.values?.[0]) {
      changes = ch[0].values[0][0];
    }
  } catch (e) {
    changes = undefined;
  }
  
  // persist
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  return { lastInsertRowid, changes };
}

module.exports = { initDB, migrate, all, get, run };
