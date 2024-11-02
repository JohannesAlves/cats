import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

export const Card: React.FC<IProps> = ({ id, imageUrl, title, description }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      target="_blank"
      href={`/${id}`}
      className="relative max-w-sm min-h-96 max-h-96 rounded-2xl overflow-hidden shadow-lg border-neutral-950 border-2 group"
    >
      <div className="relative min-w-60 min-h-72 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
            <div className="loader"></div>
          </div>
        )}

        <Image
          src={imageUrl}
          alt={title}
          fill
          objectFit="cover"
          onLoadingComplete={() => setIsLoading(false)}
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-lg font-bold">See Details</span>
      </div>
    </Link>
  );
};
