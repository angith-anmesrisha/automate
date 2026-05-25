export default async function handler(req, res) {
    const targetUrl = req.query.url;
    
    if (!targetUrl) return res.status(400).send("No URL provided");

    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (!response.ok) return res.status(response.status).send("Upstream error");

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=2592000'); 
        res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');

        const arrayBuffer = await response.arrayBuffer();
        res.status(200).send(Buffer.from(arrayBuffer));

    } catch (error) {
        res.status(500).send("Proxy Error");
    }
}