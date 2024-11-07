import { Card } from '@/components/Card';
import { CategorieButtons } from '@/components/Categorie';
import { useHomeModel } from './model';

export const HomeView = ({
  activeCategory,
  cats,
  handleCategoryChange,
  loading,
  categories = [],
}: ReturnType<typeof useHomeModel>) => {
  return (
    <main className="flex justify-center flex-col items-center bg-gray-100 min-h-[100vh]">
      <h1 className="text-6xl font-bold mt-10">CATKNOW</h1>

      <section className="flex flex-col gap-4 p-10 min-h-[100vh]">
        <div>
          <CategorieButtons
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {cats.map((cat) => (
            <Card
              key={`cat-${cat.id}`}
              id={cat.id}
              description={cat.breeds && cat.breeds[0]?.origin}
              imageUrl={cat.url}
              title={cat.breeds && cat.breeds[0]?.name}
            />
          ))}
        </div>
      </section>

      {loading && <p>Loading more cats...</p>}
    </main>
  );
};
