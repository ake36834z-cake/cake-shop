'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cakes } from '@/data/cakes';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingCart, ShieldCheck, Clock, X, Maximize2 } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const cake = cakes.find((c) => c.id === id);
  const [currentMainImage, setCurrentMainImage] = useState(cake?.image || '');

  if (!cake) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">找不到該蛋糕</h1>
        <Link href="/" className="text-pink-500 hover:underline">回到首頁</Link>
      </div>
    );
  }

  const allImages = cake.images || [cake.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-pink-400 transition-colors z-[110]"
          >
            <X size={40} />
          </button>
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image
              src={currentMainImage}
              alt={cake.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Link href="/" className="flex items-center text-gray-500 hover:text-pink-500 mb-8 transition-colors group">
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>返回商品列表</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div 
            className="relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-zoom-in"
            onClick={() => {
              if (!currentMainImage.endsWith('.mov')) {
                setIsLightboxOpen(true);
              }
            }}
          >
            {currentMainImage.endsWith('.mov') ? (
              <video 
                src={currentMainImage} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                muted 
                loop
              />
            ) : (
              <Image
                src={currentMainImage}
                alt={cake.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            )}
            {!currentMainImage.endsWith('.mov') && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" size={48} />
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {allImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentMainImage(img)}
                  className={`relative h-24 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    currentMainImage === img ? 'ring-4 ring-pink-500 scale-95' : 'hover:opacity-80'
                  }`}
                >
                  {img.endsWith('.mov') ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <video src={img} className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-pink-500 border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image src={img} alt={`${cake.name}-${idx}`} fill className="object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {cake.category}
              </span>
              {cake.tags?.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              {cake.name}
            </h1>
            <div className="flex items-baseline space-x-4">
              <p className="text-3xl font-black text-pink-600">
                {cake.id === 'birthday-cream' ? 'NT$ 780 起' : `NT$ ${cake.price}`}
              </p>
              {cake.originalPrice && (
                <p className="text-xl text-gray-400 line-through">NT$ {cake.originalPrice}</p>
              )}
            </div>
          </div>

          {cake.id === 'birthday-cream' && (
            <div className="mb-10 p-8 bg-pink-50/50 rounded-[2rem] border border-pink-100 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                  選擇蛋糕體 (4選1)
                </h3>
                <p className="text-gray-600 ml-8 text-sm leading-relaxed">原味輕乳酪 / 唐寧伯爵紅茶 / 巧克力 / 椰香斑蘭</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                  選擇內餡 (兩層)
                </h3>
                <div className="ml-8 space-y-2">
                  <p className="text-gray-600 text-sm"><span className="font-medium text-gray-900">第一層：</span>芋泥 / 當季水果</p>
                  <p className="text-gray-600 text-sm"><span className="font-medium text-gray-900">第二層：</span>金萱、芝麻、手工奶酪、焙茶、鐵觀音、蜜香紅茶 (奶凍系列)</p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-xs mr-2">3</span>
                  尺寸與價格對照
                </h3>
                <div className="ml-8 grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm text-center">
                    <div className="text-xs text-gray-400">4 吋</div>
                    <div className="font-bold text-pink-600">NT$ 780</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm text-center">
                    <div className="text-xs text-gray-400">5 吋</div>
                    <div className="font-bold text-pink-600">NT$ 980</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm text-center">
                    <div className="text-xs text-gray-400">6 吋</div>
                    <div className="font-bold text-pink-600">NT$ 1,380</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-pink-100 shadow-sm text-center">
                    <div className="text-xs text-gray-400">8 吋</div>
                    <div className="font-bold text-pink-600">NT$ 1,980</div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-pink-100 mt-4 ml-8">
                <p className="text-xs text-pink-700 leading-relaxed italic">
                  ⚠️ 小提醒：天然動物鮮奶油容易受熱融化，建議攜帶保冰袋。路程15分鐘以上需冷氣車運送，中途不停留。
                </p>
              </div>
            </div>
          )}

          <div className="prose prose-pink max-w-none mb-10">
            <p className="text-gray-600 text-lg leading-relaxed">
              {cake.description}
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-2xl">
              <ShieldCheck className="text-green-500 mr-4" size={24} />
              <span className="font-medium">選用頂級日本進口麵粉與法國鮮奶油</span>
            </div>
            <div className="flex items-center text-gray-700 bg-gray-50 p-4 rounded-2xl">
              <Clock className="text-blue-500 mr-4" size={24} />
              <span className="font-medium">需於 3 天前預訂，確保新鮮現作</span>
            </div>
          </div>

          <div className="mt-auto flex space-x-4">
            <button
              onClick={() => addToCart(cake)}
              className="flex-1 bg-gray-900 text-white py-5 rounded-[1.5rem] font-bold text-xl flex items-center justify-center space-x-3 hover:bg-pink-500 transition-all transform active:scale-[0.98] shadow-xl shadow-gray-200"
            >
              <ShoppingCart size={26} />
              <span>加入購物車</span>
            </button>
            <a 
              href="https://lin.ee/4QXT46O"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white p-5 rounded-[1.5rem] flex items-center justify-center hover:bg-[#05a647] transition-all transform hover:scale-105 shadow-xl shadow-green-100"
              title="LINE 諮詢訂購"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M21 10.32c0-4.587-4.038-8.32-9-8.32s-9 3.733-9 8.32c0 4.108 3.2 7.55 7.538 8.192.293.063.693.193.793.443.114.286.075.733-.037 1.05-.107.307-.487 1.25-.567 1.457-.2.514-.925 2.014.4 1.1 1.325-.914 7.15-4.114 9.775-7.036 1.838-1.95 1.098-4.108 1.098-5.193z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
