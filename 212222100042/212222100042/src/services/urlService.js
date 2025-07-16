export function createShortUrl(longUrl, customShortcode, validity) {
    return {
        data: {
            longUrl,
            shortUrl: `https://short.url/${customShortcode || Math.random().toString(36).substring(2, 8)}`,
            expiryDate: new Date(Date.now() + (validity || 30) * 60000).toISOString()
        },
        error: null
    };
}

export function getAllUrls() {
    return [
        {
            shortcode: "abc123",
            shortUrl: "https://short.url/abc123",
            longUrl: "https://example.com",
            clicks: 5,
            creationDate: new Date(Date.now() - 3600000).toISOString(),
            expiryDate: new Date(Date.now() + 3600000).toISOString(),
            clickDetails: [
                { timestamp: Date.now() - 300000, source: "Chrome", location: "India" },
                { timestamp: Date.now() - 200000, source: "Firefox", location: "USA" }
            ]
        }
    ];
}

export function getUrlAndLogClick(shortcode) {
    if (shortcode === "abc123") {
        return {
            longUrl: "https://example.com"
        };
    }
    return null;
}
