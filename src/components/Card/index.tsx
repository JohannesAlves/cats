import React from 'react';
import Image from 'next/image';

interface IProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const Card: React.FC<IProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="max-w-sm min-h-96 max-h-96 rounded-2xl overflow-hidden shadow-lg border-neutral-950 border-2">
      <div className="relative w-60 h-72 overflow-hidden">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};
