'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-pink-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">購物車目前是空的</h1>
        <p className="text-gray-500 mb-8">快去逛逛找點甜頭吧！</p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors"
        >
          <span>瀏覽蛋糕</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">您的購物車 ({totalItems})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-6">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 text-gray-500"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 text-gray-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-bold text-gray-900">NT$ {item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">訂單摘要</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>小計</span>
                <span>NT$ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>運費</span>
                <span className="text-pink-500 font-medium">免運費</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                <span>總計</span>
                <span>NT$ {totalPrice}</span>
              </div>
            </div>
            
            <Link
              href="/checkout"
              className="block w-full bg-pink-500 text-white text-center py-4 rounded-xl font-bold hover:bg-pink-600 transition-all transform active:scale-[0.98]"
            >
              前往結帳
            </Link>
            
            <p className="text-center text-xs text-gray-400 mt-4">
              結帳流程目前為模擬功能，不會產生實際費用。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
