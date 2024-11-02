import apiCats from '@/api';
import { Card } from '@/components/Card';
import { ICat } from '@/interfaces/ICat';

export default async function Home() {
  const { data: cats } = await apiCats.get<ICat[]>('/images/search?limit=10&has_breeds=true');

  return (
    <main className="flex justify-center flex-col items-center">
      <h1 className="text-6xl font-bold mt-10">CATKNOW</h1>

      <section>
        <Card />
      </section>
    </main>
  );
}
