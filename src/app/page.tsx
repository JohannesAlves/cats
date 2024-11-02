import apiCats from '@/api';
import { Card } from '@/components/Card';
import { ICat } from '@/interfaces/ICat';

export default async function Home() {
  const { data: cats } = await apiCats.get<ICat[]>('/images/search?limit=10&has_breeds=true');

  return (
    <main className="flex justify-center flex-col items-center">
      <h1 className="text-6xl font-bold mt-10">CATKNOW</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
        {cats.map((cat) => (
          <Card
            key={`cat-${cat.id}`}
            description={cat.breeds[0].origin}
            imageUrl={cat.url}
            title={cat.breeds[0].name}
          />
        ))}
      </section>
    </main>
  );
}
