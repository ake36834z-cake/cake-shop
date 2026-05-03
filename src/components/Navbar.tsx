'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Instagram, ShoppingCart, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-pink-500 tracking-tight">
              SUNSCAKE<span className="text-gray-800 ml-1">蛋糕桑</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              所有蛋糕
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              關於我們
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors">
              管理後台
            </Link>
          </div>

          {/* Social and Cart Icons */}
          <div className="flex items-center space-x-5">
            <a 
              href="https://www.instagram.com/tw_chiffon_2022?igsh=MWF2ZjQ3cHhndW11OA%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform text-pink-400 hover:text-pink-600"
              title="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://lin.ee/4QXT46O" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center bg-[#06C755] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#05a647] transition-all transform hover:scale-105 shadow-sm"
            >
              <MessageCircle size={18} className="mr-2" />
              <span>LINE 訂購</span>
            </a>
            <Link href="/cart" className="text-gray-400 hover:text-pink-500 transition-colors relative" title="購物車">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-bounce font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
