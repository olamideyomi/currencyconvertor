// Node.js Express server
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Assuming you have your API key saved in an environment variable
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

app.get('/api/exchangeRate', async (req, res) => {
  const fromCur = req.query.from;
  const toCur = req.query.to;
  
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCur}`);
    const result = await response.json();
    const exchangeRate = result.conversion_rates[toCur];
    res.json(exchangeRate);
  } catch (error) {
    res.json({ error: "Something went wrong..." });
  }
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
