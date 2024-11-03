'use client';

import { useHomeModel } from '@/pages/Home/model';
import { HomeView } from '@/pages/Home/view';

export default function HomePage() {
  const { activeCategory, cats, handleCategoryChange, loading } = useHomeModel();

  return (
    <HomeView
      activeCategory={activeCategory}
      cats={cats}
      handleCategoryChange={handleCategoryChange}
      loading={loading}
    />
  );
}
