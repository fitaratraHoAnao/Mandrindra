require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');

const router = express.Router();
const groq = new Groq({ apiKey: process.env.API_KEY });

router.get('/llama', async (req, res) => {
    const { question, uid } = req.query;
    if (!question || !uid) {
        return res.status(400).json({ error: "Paramètres requis: question, uid" });
    }

    try {
        const completion = await groq.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: [{ role: "user", content: question }],
            temperature: 1,
            max_tokens: 1024
        });

        res.json({ question, response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne' });
    }
});

module.exports = router;
