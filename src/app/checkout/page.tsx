'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle, CreditCard, Truck, MapPin, ArrowLeft, MessageCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, totalPrice } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('ship-self');

  // Check if there are any pickup-only items in cart
  const hasPickupOnlyItem = cart.some(item => item.id === 'birthday-cream');

  // Force self-pickup if pickup-only item is present
  useEffect(() => {
    if (hasPickupOnlyItem) {
      setShippingMethod('ship-self');
    }
  }, [hasPickupOnlyItem]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finalShippingFee = shippingMethod === 'ship-711' ? 129 : shippingMethod === 'ship-cat' ? 165 : 0;
  const finalTotal = totalPrice + finalShippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: cart,
          total: finalTotal,
          shipping: shippingMethod === 'ship-711' ? '7-11冷凍' : shippingMethod === 'ship-cat' ? '黑貓冷凍' : '自取',
          pickupDate: formData.address, // 自取時此欄位為時間
        }),
      });

      if (response.ok) {
        setIsOrdered(true);
        // 不立即清空購物車，讓 Line 訊息可以使用資料，或者在渲染成功畫面時使用狀態
      } else {
        alert('下單失敗，請稍後再試或直接私訊 Line');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('網路錯誤，請檢查連線');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOrdered) {
    const itemsText = cart.map(item => `${item.name} x ${item.quantity}`).join('\n');
    const rawMsg = `訂單確認：${formData.name}\n電話：${formData.phone}\n項目：\n${itemsText}\n總金額：${finalTotal}\n配送：${shippingMethod === 'ship-711' ? '7-11冷凍' : shippingMethod === 'ship-cat' ? '黑貓冷凍' : '自取'}\n備註：${formData.note || '無'}`;
    
    // 使用 encodeURIComponent 確保所有字元（含換行）都能被正確解析
    const encodedMsg = encodeURIComponent(rawMsg);
    // 使用 LINE 官方帳號對話框導向格式 (ID: @412lnhsh)
    const lineUrl = `https://line.me/R/oaMessage/@412lnhsh/?${encodedMsg}`;

    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle size={60} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">訂單已成功送出！</h1>
        <p className="text-gray-600 mb-6 text-lg">
          感謝您的訂購。資料已記錄至系統。
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-8 mb-10 text-left border border-gray-100 max-w-md mx-auto">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="mr-2 text-[#06C755]" size={20} />
            最後一步：通知老闆
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              請點擊下方按鈕，將訂單明細傳送至官方 LINE，我們將儘快為您確認訂單！
            </p>
            <a 
              href={lineUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-[#06C755] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#05a647] transition-all transform hover:scale-[1.02]"
              onClick={() => clearCart()}
            >
              <MessageCircle size={24} className="mr-2" />
              點我傳送 Line 訂單
            </a>
          </div>
        </div>

        <Link
          href="/"
          className="text-gray-500 hover:text-pink-500 font-medium transition-colors"
        >
          回到首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/cart" className="flex items-center text-gray-500 hover:text-pink-500 mb-8 transition-colors group">
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>返回購物車</span>
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">結帳資訊</h1>

      {hasPickupOnlyItem && (
        <div className="mb-10 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-start text-amber-800 dark:text-amber-200">
          <AlertCircle className="mr-3 mt-0.5 flex-shrink-0" size={20} />
          <p className="text-sm font-medium">
            您的購物車中包含「生日奶油蛋糕」，該商品因含鮮奶油較嬌貴，<span className="font-bold underline">僅限竹東工作室自取</span>，系統已為您鎖定配送方式。
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Shipping Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-6 text-pink-500">
              <MapPin size={24} className="mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">收件人資訊</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">姓名</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">電話</label>
                <input 
                  required 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {shippingMethod === 'ship-self' ? '預期自取時間' : '收件地址'}
                </label>
                <input 
                  required 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                  placeholder={shippingMethod === 'ship-self' ? '例如：4/30 下午 2 點自取' : '請填寫完整收件地址'} 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">備註 (選填)</label>
                <textarea 
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white" 
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-6 text-pink-500">
              <Truck size={24} className="mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">配送方式與運費</h2>
            </div>
            <div className="space-y-4">
              <div className={`p-4 border rounded-xl transition-all ${shippingMethod === 'ship-cat' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-100 dark:border-gray-800'} ${hasPickupOnlyItem ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className="flex items-center mb-2">
                  <input 
                    type="radio" 
                    name="shipping" 
                    id="ship-cat" 
                    checked={shippingMethod === 'ship-cat'}
                    onChange={() => !hasPickupOnlyItem && setShippingMethod('ship-cat')}
                    disabled={hasPickupOnlyItem}
                    className="text-pink-500 focus:ring-pink-500 h-4 w-4" 
                  />
                  <label htmlFor="ship-cat" className="ml-3 font-bold text-gray-900 dark:text-white">黑貓冷凍宅配 ($165~$290)</label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-7">隔天到貨，1顆165$/2-4顆$225/5-20顆290元。</p>
              </div>

              <div className={`p-4 border rounded-xl transition-all ${shippingMethod === 'ship-self' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' : 'border-gray-100 dark:border-gray-800'} cursor-pointer`}>
                <div className="flex items-center mb-2">
                  <input 
                    type="radio" 
                    name="shipping" 
                    id="ship-self" 
                    checked={shippingMethod === 'ship-self'}
                    onChange={() => setShippingMethod('ship-self')}
                    className="text-pink-500 focus:ring-pink-500 h-4 w-4" 
                  />
                  <label htmlFor="ship-self" className="ml-3 font-bold text-gray-900 dark:text-white">竹東工作室自取 ($0)</label>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 ml-7">請於備註填寫取貨時間，需要修正時間請於 LINE 預約自取時間。新竹縣市滿10顆可免費配送。</p>
              </div>

              <a 
                href="https://myship.7-11.com.tw/general/detail/GM2409133264995"
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 border rounded-xl transition-all hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 border-gray-100 dark:border-gray-800 cursor-pointer ${hasPickupOnlyItem ? 'opacity-50 grayscale pointer-events-none' : ''}`}
              >
                <div className="flex items-center mb-2">
                  <div className="bg-pink-500 text-white text-[10px] px-2 py-0.5 rounded-full mr-2 font-bold italic">LINK</div>
                  <span className="font-bold text-gray-900 dark:text-white">7-11 冷凍賣貨便 ($129)</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">約 3-5 天到店，最多可裝四顆，直接至賣貨便網頁下單。</p>
              </a>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-6 text-pink-500">
              <CreditCard size={24} className="mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">付款方式</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="space-y-4">
                <label className="flex items-center">
                  <input type="radio" name="payment" defaultChecked className="text-pink-500 focus:ring-pink-500 h-4 w-4" />
                  <span className="ml-3 font-medium text-gray-900 dark:text-white">貨到付款 / 自取面交</span>
                </label>
                <label className="flex items-center opacity-50 cursor-not-allowed">
                  <input disabled type="radio" name="payment" className="text-gray-300 h-4 w-4" />
                  <span className="ml-3 font-medium text-gray-500 dark:text-gray-400">線上信用卡支付 (維護中)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">結帳金額</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-200">
                <span>商品小計</span>
                <span>NT$ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-200">
                <span>運費</span>
                <span>NT$ {finalShippingFee}</span>
              </div>
              <div className="border-t border-gray-700 pt-4 flex justify-between text-2xl font-bold">
                <span>總金額</span>
                <span className="text-pink-400">NT$ {finalTotal}</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '處理中...' : '確認下單'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
