import apiCats from '@/api';
import { ICategory } from '@/interfaces/ICat';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  activeCategory: number | null;
  setActiveCategory: (category: number) => void;
}

export const CategorieButtons: React.FC<IProps> = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategoriesList = useCallback(async () => {
    try {
      const { data } = await apiCats.get<ICategory[]>(`/categories`);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  return (
    <div className="flex flex-wrap space-x-2">
      {categories.map((category) => (
        <button
          onClick={() => setActiveCategory(category.id)}
          key={`category-${category.id}`}
          className={`px-8 rounded-3xl py-1  border-2 border-black  hover:bg-black hover:text-white ${
            activeCategory === category.id ? 'bg-black text-white' : 'text-black'
          }`}
        >
          {capitalizeFirstLetter(category.name)}
        </button>
      ))}
    </div>
  );
};
