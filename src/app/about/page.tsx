import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="pb-20 bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/about-hero-final.jpg" 
            alt="SUNSCAKE Story" 
            fill 
            className="object-cover brightness-75"
            style={{ objectPosition: 'center 32%' }}
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-xl">SUNSCAKE 蛋糕桑</h1>
          <p className="text-pink-300 text-xl font-medium tracking-widest uppercase drop-shadow-md">尋找最初的美味</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Origin Story */}
        <section className="mb-24">
          <div className="flex items-center space-x-2 mb-8 justify-center">
            <div className="h-px w-12 bg-pink-200"></div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-widest uppercase">品牌故事</h2>
            <div className="h-px w-12 bg-pink-200"></div>
          </div>
          
          <div className="prose prose-pink mx-auto text-lg leading-relaxed space-y-8">
            <p>
              一切的開始，要追溯到 43 年次的老老闆。在那個人家裡還開著傳統餅店的時代，市場上還沒有所謂的戚風蛋糕。
            </p>
            <div className="bg-pink-50 p-8 rounded-3xl italic border-l-4 border-pink-400">
              「有次一位親戚來拜訪，帶來一顆日式戚風蛋糕。當時感受驚為天人，口感是這麼的綿密濕潤、鬆軟又挺，壓下去還會彈回來！」
            </div>
            <p>
              這份記憶深植在老老闆心中，成為了他對甜點最純粹的嚮往。隨著時代變遷，雖然曾經營傳統西點，但老老闆始終念念不忘那份「最初的美味」。
            </p>
            <p>
              2009 年，<span className="font-bold text-pink-500">SUNSCAKE 蛋糕桑</span> 正式創立。老老闆重新研發，從器具到製程、從挺度到濕潤度，每一處細節都經過上千次的試驗。而這份對戚風蛋糕的熱忱與手藝，於 2022 年由二代老闆接手傳承，並於 2024 年帶著全新的包裝與初心，重新出發。
            </p>
          </div>
        </section>

        {/* Naming Meaning */}
        <section className="mb-24 bg-gray-50 rounded-[3rem] p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">為什麼叫「蛋糕桑」？</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  「桑」與英文 「SUN」 諧音，除了代表創辦人孫家的蛋糕外，日語中的「桑（さん）」也象徵著對每一位職人與顧客的親切與尊重。
                </p>
                <p>
                  我們取太陽 SUN 的意象，希望每一位品嚐到我們蛋糕的人，都能感受到如陽光般的溫暖幸福感。
                </p>
              </div>
            </div>
            <div className="flex justify-center text-6xl">
              ☀️
            </div>
          </div>
        </section>

        {/* Craftsmanship */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">我們的執著</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl">
                ❤️
              </div>
              <h3 className="font-bold text-lg mb-3">用心研發</h3>
              <p className="text-gray-500 text-sm">烤過上千顆蛋糕，只為尋找最完美的烤溫與時間比例。</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl">
                🏆
              </div>
              <h3 className="font-bold text-lg mb-3">頂級食材</h3>
              <p className="text-gray-500 text-sm">選用紅仁放牧雞蛋、日本低筋麵粉與日本進口模具。</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-2xl">
                ☀️
              </div>
              <h3 className="font-bold text-lg mb-3">堅持口感</h3>
              <p className="text-gray-500 text-sm">老闆相信只要「蛋糕體」好吃，無論怎麼搭配都是絕佳美味。</p>
            </div>
          </div>
        </section>

        {/* How to Buy Call to Action */}
        <div className="bg-gray-900 rounded-[2rem] p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">想品嚐這份溫暖嗎？</h2>
          <p className="text-gray-400 mb-8">位於美麗的新竹竹東鎮，歡迎預約自取或全台宅配。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://lin.ee/4QXT46O" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#06C755] hover:bg-[#05a647] px-8 py-3 rounded-full font-bold transition-colors flex items-center"
            >
              <span className="mr-2">💬</span>
              LINE 私訊訂購
            </a>
            <a 
              href="https://myship.7-11.com.tw/general/detail/GM2409133264995" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors flex items-center"
            >
              <span className="mr-2">🛍️</span>
              7-11 賣貨便
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
