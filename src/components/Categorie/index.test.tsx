import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategorieButtons } from './index';
import apiCats from '@/api';
import { ICategory } from '@/interfaces/ICat';

jest.mock('@/api');

const mockCategories: ICategory[] = [
  { id: 1, name: 'category1' },
  { id: 2, name: 'category2' },
];

describe('CategorieButtons', () => {
  beforeEach(() => {
    (apiCats.get as jest.Mock).mockResolvedValue({ data: mockCategories });
  });

  it('renders category buttons', async () => {
    const setActiveCategory = jest.fn();
    render(<CategorieButtons activeCategory={null} setActiveCategory={setActiveCategory} />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons).toHaveLength(mockCategories.length);

    mockCategories.forEach((category) => {
      expect(
        screen.getByText(category.name.charAt(0).toUpperCase() + category.name.slice(1))
      ).toBeInTheDocument();
    });
  });

  it('calls setActiveCategory with the correct id when a button is clicked', async () => {
    const setActiveCategory = jest.fn();
    render(<CategorieButtons activeCategory={null} setActiveCategory={setActiveCategory} />);

    const button = await screen.findByText('Category1');
    fireEvent.click(button);

    expect(setActiveCategory).toHaveBeenCalledWith(1);
  });

  it('applies active styles to the active category button', async () => {
    const setActiveCategory = jest.fn();
    render(<CategorieButtons activeCategory={1} setActiveCategory={setActiveCategory} />);

    const activeButton = await screen.findByText('Category1');
    expect(activeButton).toHaveClass('bg-black text-white');
  });
});
