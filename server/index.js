const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

const geminiApiKey = process.env.GEMINI_API_KEY;

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors());

app.get('/api/crypto', async (req, res) => {
    try {
        const response = await axios.get('https://api.gemini.com/v1/pricefeed', {
            headers: {
                'X-GEMINI-APIKEY': geminiApiKey,
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
