'use client';
import { useEffect, useState } from 'react';
import apiCats from '@/api';
import { Card } from '@/components/Card';
import { ICat } from '@/interfaces/ICat';

const INITIAL_LIMIT = 10;

export default function Home() {
  const [cats, setCats] = useState<ICat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const fetchCats = async (limit: number, offset: number) => {
    setLoading(true);
    const { data } = await apiCats.get<ICat[]>(
      `/images/search?limit=${limit}&offset=${offset}&has_breeds=true`
    );
    setCats((prevCats) => [...prevCats, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCats(INITIAL_LIMIT, offset);
  }, [offset]);

  const handleScroll = () => {
    if (loading) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prevOffset) => prevOffset + INITIAL_LIMIT);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

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

      {loading && <p>Loading more cats...</p>}
    </main>
  );
}
