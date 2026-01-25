require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB, migrate } = require('./db');
const decksRouter = require('./routes/decks');
const cardsRouter = require('./routes/cards');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/decks', decksRouter);
app.use('/api', cardsRouter);

const port = process.env.PORT || 4000;

(async () => {
  try {
    await initDB();
    await migrate();
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
