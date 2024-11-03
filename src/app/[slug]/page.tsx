import { getCatDetails } from '@/pages/DetailedCat/model';
import { DetailedCatView } from '@/pages/DetailedCat/view';

export default async function DetailedCatPage({ params }: { params: { slug: string } }) {
  const data = await getCatDetails(params.slug);

  return <DetailedCatView data={data} />;
}
