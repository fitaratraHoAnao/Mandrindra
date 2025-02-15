require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const geminiRouter = require('./api/gemini');
const llamaRouter = require('./api/llama');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', geminiRouter);
app.use('/api', llamaRouter);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
