import { convertPrice } from '../utils/currencyConverter';

export default function PackageCard({ packageData }: { packageData: any }) {
  const { name, hotels } = packageData;

  return (
    <div className="border p-4">
      <h3 className="font-bold">{name}</h3>
      <ul>
        {hotels.map((hotel: any) => (
          <li key={hotel.name}>
            {hotel.name} - ${convertPrice(hotel.priceDetails.ppDBL, 1)} (per double room)
          </li>
        ))}
      </ul>
    </div>
  );
}
