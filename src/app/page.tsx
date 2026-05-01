import Image from "next/image";
import { cakes } from "@/data/cakes";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/flavors/pandan/hero-pandan.jpg"
            alt="SUNSCAKE 蛋糕桑 職人手作戚風蛋糕"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            SUNSCAKE<span className="text-pink-400"> 蛋糕桑</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto font-medium drop-shadow-md">
            職人手作，溫暖入心。選用在地新鮮食材，打造比雲朵更輕盈的純粹滋味。
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
            立即選購
          </button>
        </div>
      </section>

      {/* Shipping Notice Banner */}
      <div className="bg-gray-900 text-white py-3 text-center text-sm font-medium tracking-wide">
        🎁 揪團最划算！新竹縣市滿 <span className="text-pink-400 font-bold text-base">10</span> 顆享 <span className="text-pink-400 font-bold text-base">全台免運費</span> 優惠 ❤️
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">人氣蛋糕</h2>
            <p className="text-gray-500">探索我們最受歡迎的精選甜點</p>
          </div>
          <div className="hidden md:flex space-x-4">
            {['全部', '6吋整顆', '綜合禮盒', '切片系列', '生日蛋糕'].map((cat) => (
              <button key={cat} className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-pink-500 hover:text-pink-500 transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cakes.map((cake) => (
            <ProductCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-pink-50 mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold mb-3">職人精神</h3>
              <p className="text-gray-500">遵循日式工法，打造比雲朵更濕潤清爽的極致戚風口感。</p>
            </div>
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="text-2xl">🍎</span>
              </div>
              <h3 className="text-xl font-bold mb-3">在地食材</h3>
              <p className="text-gray-500">選用台灣在地新鮮水果與優質蛋奶，支持在地農業並確保品質。</p>
            </div>
            <div>
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="text-2xl">🍰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">多樣選購</h3>
              <p className="text-gray-500">從 6 吋整顆到出攤限定切片，甚至是生日蛋糕，滿足各種時刻。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
