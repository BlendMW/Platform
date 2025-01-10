import { useState, useEffect } from 'react';
import cmsClient from '../utils/cmsClient';

export default function CurrencySelector({ onCurrencyChange }: { onCurrencyChange: (rate: number) => void }) {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    cmsClient.get('/currencies').then((res) => setCurrencies(res.data));
  }, []);

  return (
    <select onChange={(e) => onCurrencyChange(Number(e.target.value))}>
      {currencies.map((currency: any) => (
        <option key={currency.currencyCode} value={currency.exchangeRate}>
          {currency.currencyName}
        </option>
      ))}
    </select>
  );
}
