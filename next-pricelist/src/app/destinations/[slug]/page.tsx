import cmsClient from '../../../../utils/cmsClient';
import PackageCard from '../../../../components/PackageCard';

export default async function DestinationPage({ params }: { params: { slug: string } }) {
  const { data: packages } = await cmsClient.get(`/packages?destination=${params.slug}`);

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold">Packages for {params.slug}</h1>
      {packages.map((pkg: any) => (
        <PackageCard key={pkg.name} packageData={pkg} />
      ))}
    </main>
  );
}
