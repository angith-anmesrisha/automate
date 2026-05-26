const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("No URL provided");

    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (!response.ok) throw new Error(`Upstream status: ${response.status}`);

        const buffer = await response.buffer();
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=2592000',
            'Content-Type': response.headers.get('content-type') || 'image/jpeg'
        });
        res.send(buffer);
    } catch (error) {
        res.status(500).send("Proxy Error");
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
