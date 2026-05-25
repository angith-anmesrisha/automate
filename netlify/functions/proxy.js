exports.handler = async function(event, context) {
    const targetUrl = event.queryStringParameters.url;
    
    if (!targetUrl) {
        return { statusCode: 400, body: "No URL provided" };
    }

    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (!response.ok) {
            return { statusCode: response.status, body: "Upstream error" };
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        // Netlify requires binary data to be Base64 encoded before sending
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=2592000',
                'Content-Type': contentType
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true
        };

    } catch (error) {
        return { 
            statusCode: 500, 
            body: "Proxy Error: " + error.message 
        };
    }
};
