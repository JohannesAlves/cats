'use client';

import { useHomeModel } from '@/templates/Home/model';
import { HomeView } from '@/templates/Home/view';

export default function HomePage() {
  const { activeCategory, cats, handleCategoryChange, loading, categories } = useHomeModel();

  return (
    <HomeView
      categories={categories}
      activeCategory={activeCategory}
      cats={cats}
      handleCategoryChange={handleCategoryChange}
      loading={loading}
    />
  );
}
