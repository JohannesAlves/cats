import { useCallback, useEffect, useState } from 'react';
import apiCats from '@/api';
import { ICat, ICategory } from '@/interfaces/ICat';
import { useScroll } from '@/hooks/useScroll';

const INITIAL_LIMIT = 16;

export const useHomeModel = () => {
  const [cats, setCats] = useState<ICat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategoriesList = useCallback(async () => {
    try {
      const { data } = await apiCats.get<ICategory[]>(`/categories`);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

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
    fetchCategoriesList();
  }, [fetchCategoriesList]);

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

  return {
    categories,
    cats,
    loading,
    activeCategory,
    handleCategoryChange,
  };
};
