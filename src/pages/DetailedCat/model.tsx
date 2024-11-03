import apiCats from '@/api';
import { ICat } from '@/interfaces/ICat';

export const getCatDetails = async (slug: string): Promise<ICat> => {
  try {
    const { data } = await apiCats.get<ICat>(`/images/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching cat details:', error);
    throw new Error('Failed to fetch cat details');
  }
};
