'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Cake } from '@/data/cakes';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  cake: Cake;
}

export default function ProductCard({ cake }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <Link href={`/products/${cake.id}`} className="block relative h-40 sm:h-64 overflow-hidden">
        <Image
          src={cake.image}
          alt={cake.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          style={{ 
            objectPosition: 
              cake.id === 'suns-6-original' ? 'center 65%' : 
              cake.id === 'combo-nine' ? 'center 55%' : 'center' 
          }}
        />
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm flex flex-col items-end">
          {cake.originalPrice && (
            <p className="text-gray-400 line-through text-[8px] sm:text-[10px]">NT$ {cake.originalPrice}</p>
          )}
          <p className="text-pink-600 font-bold text-xs sm:text-sm">NT$ {cake.price}</p>
        </div>
      </Link>
      
      <div className="p-3 sm:p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <Link href={`/products/${cake.id}`}>
            <h3 className="text-sm sm:text-lg font-bold text-gray-800 hover:text-pink-500 transition-colors leading-tight line-clamp-1 sm:line-clamp-none">{cake.name}</h3>
          </Link>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          <span className="text-[8px] sm:text-[10px] bg-pink-50 text-pink-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
            {cake.category}
          </span>
        </div>
        
        <p className="hidden sm:block text-gray-500 text-sm line-clamp-2 mb-6 h-10">
          {cake.description}
        </p>
        
        <div className="mt-auto pt-2">
          <button
            onClick={() => addToCart(cake)}
            className="w-full bg-gray-900 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-pink-500 transition-colors duration-300"
          >
            <Plus size={16} className="sm:size-[18px]" />
            <span className="text-xs sm:text-base">加入購物車</span>
          </button>
        </div>
      </div>
    </div>
  );
}
