import cmsClient from '../../../../utils/cmsClient';
import HotelDetails from '../../../../components/HotelDetails';
import { getExchangeRate } from '../../../../utils/currencyConverter';

export default async function HotelPage({ params }: { params: { slug: string } }) {
  const { data: hotel } = await cmsClient.get(`/hotels/${params.slug}`);

  const exchangeRate = await getExchangeRate();

  return (
    <main className="p-8">
      <HotelDetails hotelData={hotel} exchangeRate={exchangeRate} />
    </main>
  );
}
