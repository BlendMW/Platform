/**
 * Converts a price from USD to the selected currency.
 * @param priceInUSD - The price in USD.
 * @param exchangeRate - The exchange rate for the selected currency.
 * @returns The price converted to the selected currency.
 */
export const convertPrice = (priceInUSD: number, exchangeRate: number): string => {
    if (!exchangeRate || exchangeRate <= 0) {
      console.warn('Invalid exchange rate provided. Defaulting to USD price.');
      return priceInUSD.toFixed(2);
    }
  
    const convertedPrice = priceInUSD * exchangeRate;
    return convertedPrice.toFixed(2); // Format price to 2 decimal places
  };
  
export async function getExchangeRate(): Promise<number> {
  // Implement your logic to fetch the exchange rate
  // For example, you might call an API to get the current exchange rate
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Example API
  const data = await response.json();
  return data.rates.EUR; // Return the exchange rate for EUR
}
  