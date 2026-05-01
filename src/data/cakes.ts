export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  tags?: string[];
  type: 'six-inch' | 'combo' | 'slice';
  details?: any;
}

export const cakes: Cake[] = [
  // --- 6吋整顆系列 ---
  {
    id: 'suns-6-original',
    name: '經典原味輕乳酪 (6吋)',
    description: '創業以來第一款經典！嚴選新鮮放牧雞蛋，充滿濃郁蛋香與自然奶香，是小朋友的最愛。',
    price: 280,
    image: '/images/flavors/original/original-main.jpg',
    images: [
      '/images/flavors/original/original-main.jpg',
      '/images/flavors/original/IMG_8679.JPG',
      '/images/flavors/original/IMG_5398.JPG',
      '/images/flavors/original/IMG_5420.JPG',
      '/images/flavors/original/IMG_5455.JPG',
      '/images/flavors/original/IMG_8678.JPG',
      '/images/flavors/original/IMG_7945.jpg',
      '/images/flavors/original/IMG_7940.JPG',
      '/images/flavors/original/原味輕乳酪 切片圖.JPG'
    ],
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['五告讚', '放牧蛋', '減糖經典']
  },
  {
    id: 'suns-6-earlgrey',
    name: '唐寧伯爵紅茶 (6吋)',
    description: '選用唐寧伯爵紅茶，加入微量橙酒提升香氣層次，不甜膩的減糖配方。',
    price: 280,
    originalPrice: 350,
    image: '/images/flavors/earlgrey/main.jpg',
    images: [
      '/images/flavors/earlgrey/main.jpg',
      '/images/flavors/earlgrey/IMG_0689.JPG',
      '/images/flavors/earlgrey/IMG_8697.JPG',
      '/images/flavors/earlgrey/IMG_1160.jpg',
      '/images/flavors/earlgrey/IMG_9894.JPG',
      '/images/flavors/earlgrey/IMG_9928.JPG'
    ],
    category: '大人口味',
    type: 'six-inch',
    tags: ['唐寧茶', '橙酒', '優惠價']
  },
  {
    id: 'suns-6-choco',
    name: '經典巧克力 (6吋)',
    description: '屬於苦甜口感的優雅滋味。加入微量白蘭地提升可可香味，口感濃郁厚實。',
    price: 280,
    originalPrice: 350,
    image: '/images/flavors/chocolate/巧克力 形象圖.JPG',
    images: [
      '/images/flavors/chocolate/巧克力 形象圖.JPG',
      '/images/flavors/chocolate/經典巧克力 形象圖.jpg',
      '/images/flavors/chocolate/經典巧克力.JPG',
      '/images/flavors/chocolate/ACEED5E2-D5B8-4E04-B4EE-B9FCCE2E50A9.JPG',
      '/images/flavors/chocolate/IMG_0992.jpg'
    ],
    category: '大人口味',
    type: 'six-inch',
    tags: ['苦甜巧克力', '白蘭地', '優惠價']
  },
  {
    id: 'suns-6-lemon',
    name: '黃金檸檬天使 (6吋)',
    description: '最清爽的代表作！純蛋白製作的天使戚風，每顆皆使用新鮮檸檬取皮，自然散發清新果香。',
    price: 320,
    image: '/images/flavors/lemon/main.jpg',
    images: [
      '/images/flavors/lemon/main.jpg',
      '/images/flavors/lemon/S__25026645_0.jpg',
      '/images/flavors/lemon/S__25026643_0.jpg',
      '/images/flavors/lemon/S__25026644_0.jpg',
      '/images/flavors/lemon/IMG_0301.JPG',
      '/images/flavors/lemon/IMG_1550.JPG',
      '/images/flavors/lemon/S__25026642_0.jpg',
      '/images/flavors/lemon/IMG_1560.JPG',
      '/images/flavors/lemon/IMG_1561.JPG',
      '/images/flavors/lemon/IMG_9016.JPG'
    ],
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['天使戚風', '100%純天然', '清爽首選']
  },
  {
    id: 'suns-6-pandan',
    name: '椰香斑斕戚風 (6吋)',
    description: '100% 新鮮斑蘭葉榨汁萃取，加入經典 Kara 椰漿，品嚐自然散發出的「類芋頭」清香。',
    price: 320,
    image: '/images/flavors/pandan/hero-pandan.jpg',
    images: [
      '/images/flavors/pandan/hero-pandan.jpg',
      '/images/flavors/pandan/video-pandan-small.mp4',
      '/images/flavors/pandan/5A911864.png',
      '/images/flavors/pandan/IMG_5100.jpg',
      '/images/flavors/pandan/IMG_5127.jpg',
      '/images/flavors/pandan/IMG_7820.jpg',
      '/images/flavors/pandan/IMG_7821.jpg',
      '/images/flavors/pandan/IMG_2781.JPG',
      '/images/flavors/pandan/IMG_2780.JPG',
      '/images/flavors/pandan/IMG_2934.JPG',
      '/images/flavors/pandan/IMG_2971.JPG'
    ],
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['五告讚', '天然葉萃取', '椰香']
  },
  {
    id: 'suns-6-strawberry',
    name: '草莓天使 (6吋)',
    description: '100% 天然草莓果泥製作，像雲朵般輕盈的口感中帶著微酸甜的粉紅氣息。',
    price: 360,
    image: '/images/flavors/strawberry/真草莓戚風1 .jpg',
    images: [
      '/images/flavors/strawberry/真草莓戚風1 .jpg',
      '/images/flavors/strawberry/真草莓戚風2.jpg',
      '/images/flavors/strawberry/真草莓戚風3.jpg',
      '/images/flavors/strawberry/真草莓戚風4.png',
      '/images/flavors/strawberry/真草莓戚風5.png'
    ],
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['100%果泥', '無添加']
  },
  {
    id: 'suns-6-blueberry',
    name: '藍莓優格戚風 (6吋)',
    description: '新鮮藍莓與輕盈優格的完美邂逅，打造出濕潤又充滿層次的美味。',
    price: 360,
    image: '/images/flavors/berry-series.jpg',
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['鮮果製作', '優格清爽']
  },
  {
    id: 'suns-6-passion',
    name: '百香果天使 (6吋)',
    description: '使用新鮮百香果原汁製作，每一口都能感受到夏日的熱情與果實的酸甜。',
    price: 360,
    image: '/images/flavors/passion.jpg',
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['酸甜果香', '天使戚風']
  },
  {
    id: 'suns-6-murcott',
    name: '茂谷柑 季節限定 (6吋)',
    description: '選用當季最甜美的茂谷柑，散發濃育柑橘香氣，這份季節限定的美味不容錯過。',
    price: 360,
    image: '/images/flavors/tangelo/main.jpg',
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['季節限定', '果香濃郁']
  },
  {
    id: 'suns-6-cranberry',
    name: '蔓越莓天使 (6吋)',
    description: '淡粉色的夢幻外觀，加入蔓越莓果乾增加咬感，清新又不甜膩。',
    price: 360,
    image: '/images/flavors/berry-series.jpg',
    category: '適合小朋友',
    type: 'six-inch',
    tags: ['女性最愛', '酸甜口感']
  },
  {
    id: 'suns-6-dark-choco',
    name: '加厚濃巧克力 (6吋)',
    description: '更濃郁的巧克力體驗，適合重度巧克力愛好者，苦甜平衡恰到好處。',
    price: 360,
    image: '/images/flavors/dark-chocolate/main.jpg',
    category: '大人口味',
    type: 'six-inch',
    tags: ['加厚濃郁', '苦甜']
  },
  {
    id: 'suns-6-leicha',
    name: '在地客家擂茶戚風 (6吋)',
    description: '結合新竹在地客家文化，將綜合穀物與茶香完美融入戚風，口感溫潤豐富。',
    price: 360,
    image: '/images/flavors/tea-series.jpg',
    category: '大人口味',
    type: 'six-inch',
    tags: ['在地特色', '五告讚', '穀物健康']
  },
  {
    id: 'suns-6-matcha',
    name: '京都宇治抹茶 (6吋)',
    description: '選用高品質宇治抹茶粉，微微苦回甘的成熟滋味，是茶系愛好者的必點。',
    price: 360,
    image: '/images/flavors/matcha/main.jpg',
    category: '大人口味',
    type: 'six-inch',
    tags: ['宇治抹茶', '茶系限定']
  },
  {
    id: 'suns-6-rose',
    name: '玫瑰東方美人 (6吋)',
    description: '細緻的茶香結合優雅玫瑰，層次豐富，是款充滿質感的精緻口味。',
    price: 380,
    image: '/images/flavors/rose/玫瑰東方沒人 形象圖.jpg',
    category: '大人口味',
    type: 'six-inch',
    tags: ['茶香', '玫瑰', '精緻']
  },

  // --- 禮盒系列 ---
  {
    id: 'combo-nine',
    name: '九合一 綜合戚風禮盒',
    description: 'SUNSCAKE 旗艦組合！收錄九款招招招牌口味，一次滿足所有味蕾的終極體驗。',
    price: 380,
    image: '/images/products/nine-box/nine-main-labeled.jpg',
    images: [
      '/images/products/nine-box/nine-main-labeled.jpg',
      '/images/hero-combo-v2.jpg',
      '/images/products/nine-box/IMG_6883.jpg',
      '/images/products/nine-box/大綜合 九合一戚風禮盒.jpg'
    ],
    category: '綜合系列',
    type: 'combo',
    tags: ['旗艦首選', '九款口味', '送禮推薦']
  },
  {
    id: 'combo-five',
    name: '經典五告讚 戚風禮盒',
    description: '收錄五款最受歡迎的招牌口味，是入門 SUNSCAKE 的最佳選擇。',
    price: 330,
    image: '/images/products/five-box/五告讚 戚風禮盒.jpg',
    images: [
      '/images/products/five-box/五告讚 戚風禮盒.jpg',
      '/images/products/five-box/五告讚 形象圖.JPG',
      '/images/products/five-box/五告讚 口味簡介圖.JPG',
      '/images/products/five-box/五告讚圖片.JPG'
    ],
    category: '綜合系列',
    type: 'combo',
    tags: ['招牌組合', '熱銷']
  },
  {
    id: 'combo-three',
    name: '經典大三元 戚風禮盒',
    description: '精選三款經典中的經典，簡單卻不失職人精神的美味。',
    price: 300,
    image: '/images/products/three-box/IMG_4133.jpg',
    images: [
      '/images/products/three-box/IMG_4133.jpg',
      '/images/products/three-box/經典大三元戚風禮盒 .jpg',
      '/images/products/three-box/大三元形象圖.JPG',
      '/images/products/three-box/IMG_2652.JPG',
      '/images/products/three-box/IMG_8763 2.JPG',
      '/images/products/three-box/IMG_8764.JPG',
      '/images/products/three-box/IMG_8765.JPG'
    ],
    category: '綜合系列',
    type: 'combo',
    tags: ['大三元', '精簡禮盒']
  },
  {
    id: 'combo-morandi',
    name: '莫蘭迪 水果五告讚 禮盒',
    description: '絕美配色搭配精選水果口味，視覺與味覺的雙重饗宴。',
    price: 360,
    image: '/images/products/morandi-box/莫蘭迪 水果五告讚.JPG',
    category: '綜合系列',
    type: 'combo',
    tags: ['美學禮盒', '水果系列']
  },

  // --- 生日蛋糕 ---
  {
    id: 'birthday-cream',
    name: '精緻生日奶油蛋糕 (完全預訂制)',
    description: '慶祝時刻的幸福亮點。從蛋糕體到兩層內餡皆可自由搭配，僅限新竹竹東工作室自取。',
    price: 780,
    originalPrice: 1980,
    image: '/images/birthday/birthday-new.jpg',
    images: [
      '/images/birthday/birthday-new.jpg',
      '/images/birthday/IMG_5498.JPG',
      '/images/birthday/IMG_5625.JPG',
      '/images/birthday/IMG_5843.PNG',
      '/images/birthday/IMG_5844.PNG',
      '/images/birthday/IMG_6004.JPG',
      '/images/birthday/IMG_6155.JPG',
      '/images/birthday/IMG_6217.JPG',
      '/images/birthday/IMG_6226.JPG',
      '/images/birthday/IMG_6227.JPG',
      '/images/birthday/IMG_6247.jpg',
      '/images/birthday/IMG_6491.jpg',
      '/images/birthday/IMG_6503.jpg',
      '/images/birthday/IMG_6692.jpg',
      '/images/birthday/IMG_6943.jpg'
    ],
    category: '生日蛋糕',
    type: 'six-inch',
    tags: ['限店取貨', '客製化', '4吋起']
  }
];
