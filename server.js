require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// POST route to send Telegram message
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await axios.post(telegramUrl, {
            chat_id: chatId,
            text: message
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Telegram API error:', error.response?.data || error.message);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

