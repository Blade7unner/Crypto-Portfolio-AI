import axios from 'axios';

const fetchCryptoData = async (symbol) => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/v2/histoday', {
      params: {
        fsym: symbol,
        tsym: 'USD',
        limit: 365,
      },
    });
    const dataToReturn = response.data.Data.Data

    // const restructuredData = dataToReturn.reduce((acc, curr) => {
    //     // Add the current time and high value to the accumulator object
    //     acc[curr.time] = curr.high;
    //     return acc;
    //   }, {});

    const restructuredData = dataToReturn.map(item => {
        // Convert Unix timestamp to milliseconds
        const date = new Date(item.time * 1000);
        // Format date as 'MM/DD/YY'
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
        // Create object with date and open values
        return { date: formattedDate, open: item.open };
    })

    const highestPrice = Math.max(...restructuredData.map(data => data.open));
    console.log(highestPrice)
    const latestPrice = restructuredData[restructuredData.length - 1].open;
    const thresholdBuy = 0.5 * highestPrice;
    const thresholdHold = 0.25 * highestPrice;
    let move = ""
    if (latestPrice < thresholdBuy) {
        move = "Buy"
    } 
    else if (latestPrice < thresholdHold && latestPrice > thresholdBuy) {
        move = "Hold"
    }
    else {
        move = "Sell"
    }
    //console.log({restructuredData,move})

    return {restructuredData,move};
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return null;
  }
};

export default fetchCryptoData;