import apiCats from '@/api';
import { ICat } from '@/interfaces/ICat';
import Image from 'next/image';

export default async function DetailedCat({ params }: { params: { slug: string } }) {
  const { data } = await apiCats.get<ICat>(`/images/${params.slug}`);

  return (
    <div className="flex justify-center gap-10 items-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md mb-6 rounded-xl border-2 border-black">
        <Image
          src={data.url}
          alt={data.breeds[0]?.name}
          width={500}
          height={500}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Name: {data.breeds[0]?.name}</h1>
        <p className="text-gray-600 mb-4">{data.breeds[0]?.description}</p>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Life Span:</strong> {data.breeds[0]?.life_span}
          </p>
          <p>
            <strong>Origin:</strong> {data.breeds[0]?.origin}
          </p>
        </div>
      </div>
    </div>
  );
}
