export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-pink-500 mb-4">SUNSCAKE 蛋糕桑</h3>
            <p className="text-gray-500 max-w-xs">
              秉持日式職人精神，選用在地食材，為您打造最清爽濕潤的手工戚風蛋糕。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">訂購管道</h4>
            <ul className="space-y-2">
              <li><a href="https://lin.ee/4QXT46O" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-sm">官方 LINE 訂購</a></li>
              <li><a href="https://myship.7-11.com.tw/general/detail/GM2409133264995" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 text-sm">7-11 賣貨便</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 text-sm">黑貓全台宅配</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">聯絡我們</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>新竹縣竹東鎮工作室 (預約自取)</li>
              <li>關注我們獲取最新出攤資訊</li>
              <li>hello@sunscake.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-xs">
            &copy; 2026 SUNSCAKE 蛋糕桑. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a 
              href="https://www.facebook.com/share/1CWYn2PsMd/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-600 cursor-pointer text-sm"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com/tw_chiffon_2022?igsh=MWF2ZjQ3cHhndW11OA%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-pink-500 cursor-pointer text-sm"
            >
              Instagram
            </a>
            <a 
              href="https://lin.ee/4QXT46O" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-pink-500 cursor-pointer text-sm"
            >
              LINE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
