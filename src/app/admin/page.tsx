'use client';

import { cakes } from '@/data/cakes';
import { Plus, Edit, Trash2, LayoutDashboard, Package, Settings } from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">商家後台</h2>
        </div>
        <nav className="mt-4 px-4 space-y-2">
          <button className="flex items-center w-full px-4 py-3 text-pink-500 bg-pink-50 rounded-xl font-medium">
            <LayoutDashboard className="mr-3" size={20} />
            商品管理
          </button>
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Package className="mr-3" size={20} />
            訂單列表
          </button>
          <button className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Settings className="mr-3" size={20} />
            商店設定
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
            <p className="text-gray-500">管理您商店中的所有蛋糕商品</p>
          </div>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-pink-600 transition-colors shadow-lg shadow-pink-200">
            <Plus size={20} />
            <span>新增商品</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">商品</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">分類</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">價格</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cakes.map((cake) => (
                <tr key={cake.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image src={cake.image} alt={cake.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-900">{cake.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {cake.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    NT$ {cake.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
