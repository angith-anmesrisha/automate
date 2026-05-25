export default async (req) => {
    const url = new URL(req.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) return new Response("No URL provided", { status: 400 });

    try {
        const response = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        if (!response.ok) return new Response("Upstream error", { status: response.status });

        const arrayBuffer = await response.arrayBuffer();
        const contentType = response.headers.get('content-type') || 'image/jpeg';

        return new Response(arrayBuffer, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=2592000',
                'Content-Type': contentType
            }
        });
    } catch (error) {
        return new Response("Proxy Error", { status: 500 });
    }
};
