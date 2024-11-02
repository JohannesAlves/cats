'use client';
import { useEffect, useState } from 'react';
import apiCats from '@/api';
import { Card } from '@/components/Card';
import { ICat } from '@/interfaces/ICat';
import { useScroll } from '@/hooks/useScroll';
import { CategorieButtons } from '@/components/Categorie';

const INITIAL_LIMIT = 10;

export default function Home() {
  const [cats, setCats] = useState<ICat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const fetchCats = async (limit: number, offset: number, categoryId?: number) => {
    setLoading(true);
    try {
      const { data } = await apiCats.get<ICat[]>(`/images/search`, {
        params: {
          limit,
          offset,
          category_id: categoryId,
          has_breeds: true,
        },
      });
      setCats((prevCats) => (offset === 0 ? data : [...prevCats, ...data]));
    } catch (error) {
      console.error('Error fetching cats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!activeCategory) {
      fetchCats(INITIAL_LIMIT, offset);
    }
  }, [offset]);

  useEffect(() => {
    if (activeCategory) {
      fetchCats(INITIAL_LIMIT, offset, activeCategory);
    }
  }, [offset, activeCategory]);

  useScroll(loading, () => {
    setOffset((prevOffset) => prevOffset + INITIAL_LIMIT);
  });

  const handleCategoryChange = (categoryId: number | null) => {
    setActiveCategory(categoryId);
    setCats([]);
    setOffset(0);
  };

  return (
    <main className="flex justify-center flex-col items-center">
      <h1 className="text-6xl font-bold mt-10">CATKNOW</h1>

      <section className="flex flex-col gap-4 p-10">
        <div>
          <CategorieButtons
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {cats.map((cat) => (
            <Card
              key={`cat-${cat.id}`}
              description={cat.breeds[0]?.origin}
              imageUrl={cat.url}
              title={cat.breeds[0]?.name}
            />
          ))}
        </div>
      </section>

      {loading && <p>Loading more cats...</p>}
    </main>
  );
}
