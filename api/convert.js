export default async function handler(req, res) {
    const { from, to } = req.query;

    const apiKey = process.env.CURRENCY_API_KEY; // get api key from .env file

    try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`; // construct the API URL
        const response = await fetch(url);
        const data = await response.json();

        res.status(200).json(data);     // Successfully return the data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch currency data' });
    }
}