export const getGPTResponse = (prompt) => {
    return fetch('/api/openai', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }),
    });
    const data = response.json();
    return data;
};

useEffect(() => {
    fetchBitcoinPrice();
}, []);

const fetchBitcoinPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin',
                vs_currencies: 'usd',
            },
        });
        setBitcoinPrice(response.data.bitcoin.usd);
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
    }
};

//Tell me the price of bitcoin in dollers. Respond in JSON format with a field price. Your answer should be a single number led by a dollar sign.