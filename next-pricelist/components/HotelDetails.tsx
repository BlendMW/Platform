import { convertPrice } from '../utils/currencyConverter';
import { useTranslation } from 'next-i18next';

interface PriceDetails {
  ppDBL: number;
  ppSGL: number;
  chd2_6: number;
  chd6_11: number;
  inf0_2: number;
}

interface HotelDetailsProps {
  hotelData: {
    name: string;
    rating: number;
    priceDetails: PriceDetails;
  };
  exchangeRate: number;
}

export default function HotelDetails({ hotelData, exchangeRate }: HotelDetailsProps) {
  const { name, rating, priceDetails } = hotelData;
  const { t } = useTranslation();

  return (
    <div className="p-4 border">
      <h2 className="text-2xl font-bold">{t('hotel_details')}</h2>
      <p className="text-lg">{name}</p>
      <p>
        {t('rating')}: {rating}⭐
      </p>
      <ul>
        <li>
          {t('pp_dbl')}: {convertPrice(priceDetails.ppDBL, exchangeRate)}
        </li>
        <li>
          {t('pp_sgl')}: {convertPrice(priceDetails.ppSGL, exchangeRate)}
        </li>
        <li>
          {t('chd_2_6')}: {convertPrice(priceDetails.chd2_6, exchangeRate)}
        </li>
        <li>
          {t('chd_6_11')}: {convertPrice(priceDetails.chd6_11, exchangeRate)}
        </li>
        <li>
          {t('inf_0_2')}: {convertPrice(priceDetails.inf0_2, exchangeRate)}
        </li>
      </ul>
    </div>
  );
}
