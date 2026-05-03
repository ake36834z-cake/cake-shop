'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cakes as initialCakes } from '@/data/cakes';
import { 
  Plus, Edit, Trash2, LayoutDashboard, Package, Settings, 
  Search, RefreshCw, X, Save, ExternalLink 
} from 'lucide-react';
import Image from 'next/image';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [cakes, setCakes] = useState(initialCakes);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [editingCake, setEditingCake] = useState<any>(null);

  // 取得商品資料
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        const updatedCakes = initialCakes.map(sc => {
          const liveData = data.products.find((p: any) => p.id === sc.id);
          return liveData ? { 
            ...sc, 
            price: liveData.price, 
            originalPrice: liveData.originalPrice,
            category: liveData.category || sc.category 
          } : sc;
        });
        setCakes(updatedCakes);
      }
    } catch (err) {
      console.error('Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  };

  // 檢查登入狀態
  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 密碼設定為 sunscake888
    if (password === 'sunscake888') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  // 取得訂單資料
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'orders') fetchOrders();
  }, [activeTab, isAuthenticated]);

  const handleUpdatePrice = async (id: string, newPrice: number, originalPrice?: number) => {
    try {
      const currentCake = cakes.find(c => c.id === id);
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          price: newPrice, 
          originalPrice,
          category: currentCake?.category 
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('價格與原價已成功更新至 Google Sheets！');
        fetchProducts();
        setEditingCake(null);
      } else {
        alert('更新失敗：' + data.error);
      }
    } catch (err) {
      alert('發生錯誤，請稍後再試');
    }
  };

// ... (在 return 的 Modal 裡修改點擊事件)
// 我會往下尋找 Modal 的儲存按鈕位置進行修改


  // 如果未驗證，顯示登入畫面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDF7F7] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-pink-50 animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-pink-500 rounded-3xl flex items-center justify-center text-white font-bold text-4xl italic mx-auto mb-6 shadow-xl shadow-pink-100">S</div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">管理員登入</h1>
            <p className="text-gray-400 font-medium">請輸入後台管理密碼</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                className={`w-full bg-gray-50 border-2 rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-4 focus:ring-pink-100 transition-all outline-none text-center tracking-widest ${
                  loginError ? 'border-red-200 animate-shake' : 'border-transparent focus:border-pink-500'
                }`}
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-sm font-bold mt-3 text-center">密碼錯誤，請再試一次</p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full bg-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-600 hover:scale-[0.98] active:scale-95 transition-all flex items-center justify-center"
            >
              進入後台
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-400 hover:text-pink-500 text-sm font-bold transition-colors">
              ← 返回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FDF7F7]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-pink-100 hidden md:block sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center space-x-2 text-pink-500 mb-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold italic">S</div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SUNS CAKE 🔒</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">安全管理系統 v2.1</p>
        </div>
        
        <nav className="mt-4 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center w-full px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'products' ? 'bg-pink-500 text-white shadow-lg shadow-pink-100' : 'text-gray-500 hover:bg-pink-50'
            }`}
          >
            <LayoutDashboard className="mr-3" size={20} />
            商品管理
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center w-full px-4 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'orders' ? 'bg-pink-500 text-white shadow-lg shadow-pink-100' : 'text-gray-500 hover:bg-pink-50'
            }`}
          >
            <Package className="mr-3" size={20} />
            訂單列表
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-400 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <RefreshCw className="mr-3 rotate-45" size={20} />
            登出系統
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        {activeTab === 'products' ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">商品管理</h1>
                <p className="text-gray-500 font-medium">管理您的 6 吋戚風與經典禮盒</p>
              </div>
              <button className="bg-pink-500 text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-2 hover:bg-pink-600 transition-all shadow-xl shadow-pink-100 hover:-translate-y-1">
                <Plus size={22} />
                <span>新增蛋糕</span>
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {cakes.map((cake) => (
                <div key={cake.id} className="bg-white p-6 rounded-3xl border border-pink-50 shadow-sm hover:shadow-md transition-all flex items-center gap-6 group">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-pink-50">
                    <Image src={cake.image} alt={cake.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-pink-400 px-2 py-0.5 bg-pink-50 rounded-md">{cake.category}</span>
                      <span className="text-xs font-bold text-gray-400 px-2 py-0.5 bg-gray-50 rounded-md">{cake.type}</span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-1">{cake.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-pink-500">NT$ {cake.price}</span>
                      {cake.originalPrice && (
                        <span className="text-sm text-gray-300 line-through">NT$ {cake.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => setEditingCake(cake)}
                      className="p-3 bg-gray-50 text-gray-400 hover:bg-pink-50 hover:text-pink-500 rounded-xl transition-all"
                    >
                      <Edit size={20} />
                    </button>
                    <button className="p-3 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">訂單列表</h1>
                <p className="text-gray-500 font-medium">查看來自 Google Sheets 的最新訂單</p>
              </div>
              <button 
                onClick={fetchOrders}
                disabled={loadingOrders}
                className="bg-white text-gray-600 px-6 py-4 rounded-2xl font-bold border border-pink-100 flex items-center space-x-2 hover:bg-pink-50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                <RefreshCw size={20} className={loadingOrders ? 'animate-spin' : ''} />
                <span>同步資料</span>
              </button>
            </div>

            <div className="bg-white rounded-[32px] border border-pink-50 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-pink-50/30 border-b border-pink-50">
                      <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">訂購人</th>
                      <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">訂購內容</th>
                      <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">金額</th>
                      <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">日期</th>
                      <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">備註</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50/50">
                    {loadingOrders ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">載入中...</td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-bold">目前尚無訂單資料</td>
                      </tr>
                    ) : (
                      orders.map((order, i) => (
                        <tr key={i} className="hover:bg-pink-50/20 transition-colors">
                          <td className="px-8 py-6 font-black text-gray-900">{order['訂購人'] || '匿名'}</td>
                          <td className="px-8 py-6 text-gray-600 font-medium leading-relaxed max-w-md">{order['訂購內容']}</td>
                          <td className="px-8 py-6 font-black text-pink-500">NT$ {order['小計'] || order['金額']}</td>
                          <td className="px-8 py-6 text-gray-400 text-sm font-bold">{order['下訂日期']}</td>
                          <td className="px-8 py-6 text-gray-400 text-sm italic">{order['備註']}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Edit Modal */}
      {editingCake && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setEditingCake(null)}
              className="absolute top-8 right-8 text-gray-300 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-black text-gray-900 mb-8">編輯商品</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 px-1">蛋糕名稱</label>
                <input 
                  type="text" 
                  defaultValue={editingCake.name}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-pink-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 px-1">當前價格</label>
                  <input 
                    type="number" 
                    id="edit-price"
                    defaultValue={editingCake.price}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-pink-500 focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 px-1">原價 (選填)</label>
                  <input 
                    type="number" 
                    id="edit-original-price"
                    defaultValue={editingCake.originalPrice}
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-400 focus:ring-2 focus:ring-pink-500 transition-all"
                  />
                </div>
              </div>
              <button 
                onClick={() => {
                  const p = (document.getElementById('edit-price') as HTMLInputElement).value;
                  const op = (document.getElementById('edit-original-price') as HTMLInputElement).value;
                  handleUpdatePrice(editingCake.id, parseInt(p), op ? parseInt(op) : undefined);
                }}
                className="w-full bg-pink-500 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-pink-100 hover:bg-pink-600 hover:scale-[0.98] active:scale-95 transition-all mt-4 flex items-center justify-center space-x-2"
              >
                <Save size={20} />
                <span>儲存變更</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
