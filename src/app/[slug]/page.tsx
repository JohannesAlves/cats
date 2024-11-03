import { getCatDetails } from '@/templates/DetailedCat/model';
import { DetailedCatView } from '@/templates/DetailedCat/view';

export default async function DetailedCatPage({ params }: { params: { slug: string } }) {
  const data = await getCatDetails(params.slug);

  return <DetailedCatView data={data} />;
}
