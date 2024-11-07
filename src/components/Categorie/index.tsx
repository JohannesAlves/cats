import { ICategory } from '@/interfaces/ICat';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import React from 'react';

interface IProps {
  activeCategory: number | null;
  setActiveCategory: (category: number) => void;
  categories: ICategory[];
}

export const CategorieButtons: React.FC<IProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
}) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
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
