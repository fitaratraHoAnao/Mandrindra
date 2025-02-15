const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const tmp = require('tmp-promise');
const fs = require('fs').promises;

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    modelName: "gemini-1.5-flash",
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    }
});

router.post('/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;
        const chat = model.startChat({ history: [{ role: 'user', parts: [{ text: prompt }] }] });
        const result = await chat.sendMessage(prompt);
        res.json({ response: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne' });
    }
});

module.exports = router;
