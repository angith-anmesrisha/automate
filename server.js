const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve the frontend HTML
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// The Proxy: Grabs the image as a solid buffer so Vercel doesn't block it
app.get('/proxy', async (req, res) => {
    const imageUrl = req.query.url;
    if (!imageUrl) return res.status(400).send('No URL provided');
    
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer' // Fixed: Vercel requires this instead of 'stream'
        });
        
        // Forward the image data to the browser
       
        res.send(Buffer.from(response.data));res.send(Buffer.from(response.data));

    } catch (error) {
        console.error(`Proxy failed for ${imageUrl}:`, error.message);
        res.status(500).send('Error fetching image');
    }
});

// Export for Vercel
module.exports = app;