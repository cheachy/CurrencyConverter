export default async function handler(req, res) {
    const { from, to } = req.query;

    const apiKey = process.env.CURRENCY_API_KEY; // get api key from .env file

    try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
        res.status(200).json(data);
        } else {
        res.status(400).json({ error: "Failed to fetch rate", details: data });
        }
        } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}