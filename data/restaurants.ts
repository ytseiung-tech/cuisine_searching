import { Restaurant, CuisineType, PriceRange } from '../types';

// 🔧 地址轉換為座標的輔助函數
export const getCoordinatesFromAddress = async (address: string) => {
  // 這裡可以使用 Google Geocoding API 或其他地址解析服務
  // 暫時返回內湖區的預設座標
  const defaultCoords = { latitude: 25.0816, longitude: 121.5816 };
  
  try {
    // 未來可以整合 Google Geocoding API
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`);
    // const data = await response.json();
    // return data.results[0].geometry.location;
    
    return defaultCoords;
  } catch (error) {
    console.log('地址解析失敗，使用預設座標:', error);
    return defaultCoords;
  }
};

// 🏪 新增餐廳的輔助函數
export const createNewRestaurant = (restaurantData: Omit<Restaurant, 'id' | 'coordinates'> & { address: string }): Restaurant => {
  return {
    ...restaurantData,
    id: Date.now().toString(), // 簡單的 ID 生成
    coordinates: { latitude: 25.0816, longitude: 121.5816 } // 預設座標，實際使用時會通過地址解析
  };
};

// 🍽️ 內湖區餐廳資料庫 - 每家餐廳都有獨特的真實座標
export const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '象園咖啡 內湖店',
    description: '象園咖啡提供精緻甜點及多款咖啡飲品，舒適的空間適合聚會與工作。',
    cuisine: 'dessert',
    priceRange: '250-500',
    address: '台北市內湖區內湖路二段192號',
    phone: '02-2627-9018',
    rating: 4.3,
    reviewCount: 380,
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.080772, longitude: 121.58569 },
    allergens: ['gluten', 'dairy'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '11:00', close: '21:00', closed: false },
      sunday: { open: '11:00', close: '21:00', closed: false }
    },
    features: ['咖啡', '甜點', '輕食', '無線網路']
  },
  {
    id: '2',
    name: '我還有點餓',
    description: '平價美味的餐廳，提供多種中式簡餐選擇，份量充足。',
    cuisine: 'chinese',
    priceRange: '0-250',
    address: '台北市內湖區文德路210巷30弄37號',
    phone: '02-2658-5577',
    rating: 4.4,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.077087, longitude: 121.5851 },
    allergens: ['soy', 'gluten'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '11:30', close: '14:30', closed: false },
      tuesday: { open: '11:30', close: '14:30', closed: false },
      wednesday: { open: '11:30', close: '14:30', closed: false },
      thursday: { open: '11:30', close: '14:30', closed: false },
      friday: { open: '11:30', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '20:30', closed: false },
      sunday: { open: '11:30', close: '20:30', closed: false }
    },
    features: ['平價', '快速服務', '便當']
  },
  {
    id: '3',
    name: 'WIRED CHAYA 茶屋 內湖店',
    description: '結合日式風格的茶屋咖啡廳，提供特色茶飲與日式甜點。',
    cuisine: 'japanese',
    priceRange: '250-500',
    address: '台北市內湖區成功路四段188號',
    phone: '02-8751-8822',
    rating: 4.0,
    reviewCount: 168,
    imageUrl: 'https://images.unsplash.com/photo-1517173850123-0d7e87f251b0?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.084081, longitude: 121.59454 },
    allergens: ['gluten', 'dairy'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '12:00', close: '14:30', closed: false },
      tuesday: { open: '12:00', close: '14:30', closed: false },
      wednesday: { open: '12:00', close: '14:30', closed: false },
      thursday: { open: '12:00', close: '14:30', closed: false },
      friday: { open: '12:00', close: '14:30', closed: false },
      saturday: { open: '12:00', close: '14:30', closed: false },
      sunday: { open: '12:00', close: '14:30', closed: false }
    },
    features: ['茶飲', '日式甜點', '咖啡']
  },
  {
    id: '4',
    name: 'P.Ming 泰式廚坊',
    description: '道地泰國料理，調味經典泰式風味，辛香料豐富。',
    cuisine: 'thai',
    priceRange: '500-1000',
    address: '台北市內湖區內湖路一段600巷2號',
    phone: '02-2799-5288',
    rating: 4.5,
    reviewCount: 322,
    imageUrl: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.07836, longitude: 121.57806 },
    allergens: ['peanuts', 'shrimp'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:30', close: '14:30', closed: false },
      wednesday: { open: '11:30', close: '14:30', closed: false },
      thursday: { open: '11:30', close: '14:30', closed: false },
      friday: { open: '11:30', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '14:30', closed: false },
      sunday: { open: '11:30', close: '14:30', closed: false }
    },
    features: ['泰式料理', '辣', '酸辣湯', '打拋肉']
  },
  {
    id: '5',
    name: '初心菓寮 文德總本店',
    description: '精緻日式甜點專賣店，提供多種和風甜品與飲料。',
    cuisine: 'dessert',
    priceRange: '0-250',
    address: '台北市內湖區文德路86號',
    phone: '02-2799-0200',
    rating: 4.7,
    reviewCount: 452,
    imageUrl: 'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.078266, longitude: 121.58214 },
    allergens: ['dairy', 'eggs'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '09:00', close: '20:30', closed: false },
      tuesday: { open: '09:00', close: '20:30', closed: false },
      wednesday: { open: '09:00', close: '20:30', closed: false },
      thursday: { open: '09:00', close: '20:30', closed: false },
      friday: { open: '09:00', close: '20:30', closed: false },
      saturday: { open: '09:00', close: '20:30', closed: false },
      sunday: { open: '09:00', close: '20:30', closed: false }
    },
    features: ['甜點', '日式和菓子', '抹茶', '水信玄餅']
  },
  {
    id: '6',
    name: '馳走屋',
    description: '提供多種日式家庭料理，味道道地，用料新鮮。',
    cuisine: 'japanese',
    priceRange: '250-500',
    address: '台北市內湖區成功路五段85號',
    phone: '02-2634-9968',
    rating: 4.3,
    reviewCount: 275,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.073783, longitude: 121.60524 },
    allergens: ['soy', 'gluten', 'eggs'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '11:30', close: '14:30', closed: false },
      tuesday: { open: '11:30', close: '14:30', closed: false },
      wednesday: { open: '11:30', close: '14:30', closed: false },
      thursday: { open: '11:30', close: '14:30', closed: false },
      friday: { open: '11:30', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '14:30', closed: false },
      sunday: { open: '11:30', close: '14:30', closed: false }
    },
    features: ['日式定食', '丼飯', '味噌湯', '親子丼']
  },
  {
    id: '7',
    name: 'TiMAMA Deli & Cafe',
    description: '有機健康餐點，注重食材新鮮度，提供多種蔬食選擇。',
    cuisine: 'healthy',
    priceRange: '250-500',
    address: '台北市內湖區江南街71巷16弄32號',
    phone: '02-8751-3988',
    rating: 4.3,
    reviewCount: 184,
    imageUrl: 'https://images.unsplash.com/photo-1543339520-51ebace10a0c?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.075555, longitude: 121.57746 },
    allergens: ['nuts'],
    vegetarianOptions: ['vegetarian', 'vegan'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:00', close: '15:00', closed: false },
      wednesday: { open: '11:00', close: '15:00', closed: false },
      thursday: { open: '11:00', close: '15:00', closed: false },
      friday: { open: '11:00', close: '15:00', closed: false },
      saturday: { open: '11:00', close: '15:00', closed: false },
      sunday: { open: '11:00', close: '15:00', closed: false }
    },
    features: ['有機', '健康餐', '沙拉', '輕食']
  },
  {
    id: '8',
    name: '呂珍郎清燉蔬菜羊肉',
    description: '專營清燉羊肉湯，選用新鮮羊肉與多種蔬菜，湯頭清爽不膻。',
    cuisine: 'chinese',
    priceRange: '250-500',
    address: '台北市內湖區金湖路4號',
    phone: '02-2634-7377',
    rating: 4.5,
    reviewCount: 326,
    imageUrl: 'https://images.unsplash.com/photo-1512003867696-6d5ce6835040?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.083831, longitude: 121.59554 },
    allergens: [],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '17:00', close: '23:00', closed: false },
      tuesday: { open: '00:00', close: '00:00', closed: true },
      wednesday: { open: '17:00', close: '23:00', closed: false },
      thursday: { open: '17:00', close: '23:00', closed: false },
      friday: { open: '11:00', close: '14:00', closed: false },
      saturday: { open: '11:00', close: '14:00', closed: false },
      sunday: { open: '11:00', close: '14:00', closed: false }
    },
    features: ['羊肉湯', '羊肉料理', '藥膳', '湯品']
  },
  {
    id: '9',
    name: '太鼓判 ODEN BAR',
    description: '日式關東煮酒吧，提供多種特色串燒與清酒，氣氛獨特。',
    cuisine: 'japanese',
    priceRange: '500-1000',
    address: '台北市內湖區金湖路377號',
    phone: '02-2632-8077',
    rating: 4.3,
    reviewCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1528159490644-4436e31e10a2?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.073617, longitude: 121.60462 },
    allergens: ['gluten', 'soy'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '17:30', close: '23:00', closed: false },
      wednesday: { open: '17:30', close: '23:00', closed: false },
      thursday: { open: '17:30', close: '23:00', closed: false },
      friday: { open: '17:30', close: '23:00', closed: false },
      saturday: { open: '17:30', close: '23:00', closed: false },
      sunday: { open: '17:30', close: '23:00', closed: false }
    },
    features: ['關東煮', '居酒屋', '清酒', '串燒']
  },
  {
    id: '10',
    name: '劉老太老潼關肉夾饃',
    description: '提供正宗陝西風味的肉夾饃，餡料飽滿，口味獨特。',
    cuisine: 'chinese',
    priceRange: '0-250',
    address: '台北市內湖區文德路22巷9弄60號',
    phone: '02-8751-7852',
    rating: 4.3,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.078558, longitude: 121.578932 },
    allergens: ['gluten'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '11:30', close: '14:00', closed: false },
      tuesday: { open: '11:30', close: '14:00', closed: false },
      wednesday: { open: '11:30', close: '14:00', closed: false },
      thursday: { open: '11:30', close: '14:00', closed: false },
      friday: { open: '11:30', close: '14:00', closed: false },
      saturday: { open: '00:00', close: '00:00', closed: true },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    features: ['肉夾饃', '陝西料理', '平價小吃']
  },
  {
    id: '11',
    name: '今天吃什麼（韓式）',
    description: '平價韓式料理，以家常口味為主，提供多種韓式小菜。',
    cuisine: 'korean',
    priceRange: '250-500',
    address: '台北市內湖區金湖路366號',
    phone: '02-2634-3577',
    rating: 4.0,
    reviewCount: 168,
    imageUrl: 'https://images.unsplash.com/photo-1583187854822-236274d74357?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.078689, longitude: 121.59921 },
    allergens: ['gluten', 'soy'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '11:30', close: '14:00', closed: false },
      tuesday: { open: '00:00', close: '00:00', closed: true },
      wednesday: { open: '11:30', close: '14:00', closed: false },
      thursday: { open: '11:30', close: '14:00', closed: false },
      friday: { open: '11:30', close: '14:00', closed: false },
      saturday: { open: '11:30', close: '14:00', closed: false },
      sunday: { open: '11:30', close: '14:00', closed: false }
    },
    features: ['韓式料理', '泡菜', '韓式炸雞', '部隊鍋']
  },
  {
    id: '12',
    name: '五祿米糕排骨酥',
    description: '傳統台式小吃，以米糕與排骨酥聞名，味道道地。',
    cuisine: 'chinese',
    priceRange: '0-250',
    address: '台北市內湖區民權東路六段92號',
    phone: '02-2795-7377',
    rating: 4.2,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1590759668642-eaf6ee088eb2?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.068795, longitude: 121.58614 },
    allergens: ['gluten', 'soy'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '12:00', close: '20:00', closed: false },
      tuesday: { open: '12:00', close: '20:00', closed: false },
      wednesday: { open: '12:00', close: '20:00', closed: false },
      thursday: { open: '12:00', close: '20:00', closed: false },
      friday: { open: '12:00', close: '20:00', closed: false },
      saturday: { open: '00:00', close: '00:00', closed: true },
      sunday: { open: '12:00', close: '20:00', closed: false }
    },
    features: ['米糕', '排骨酥', '台式小吃']
  },
  {
    id: '13',
    name: '波諾義大利料理',
    description: '正宗義式餐廳，提供披薩、義大利麵等經典義式料理。',
    cuisine: 'italian',
    priceRange: '500-1000',
    address: '台北市內湖區大湖街168巷16號',
    phone: '02-2792-9393',
    rating: 4.3,
    reviewCount: 258,
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.080327, longitude: 121.60279 },
    allergens: ['gluten', 'dairy'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '00:00', close: '00:00', closed: true },
      wednesday: { open: '12:00', close: '14:30', closed: false },
      thursday: { open: '12:00', close: '14:30', closed: false },
      friday: { open: '12:00', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '16:00', closed: false },
      sunday: { open: '11:30', close: '16:00', closed: false }
    },
    features: ['披薩', '義大利麵', '提拉米蘇', '燉飯']
  },
  {
    id: '14',
    name: 'MOUNTAIN FUSION',
    description: '健康輕食咖啡廳，強調有機食材，環境舒適。',
    cuisine: 'healthy',
    priceRange: '250-500',
    address: '台北市內湖區內湖路一段312號',
    phone: '02-2659-3766',
    rating: 4.2,
    reviewCount: 187,
    imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.082043, longitude: 121.56983 },
    allergens: ['nuts', 'dairy'],
    vegetarianOptions: ['vegetarian', 'vegan'],
    openingHours: {
      monday: { open: '11:00', close: '15:00', closed: false },
      tuesday: { open: '11:00', close: '15:00', closed: false },
      wednesday: { open: '11:00', close: '15:00', closed: false },
      thursday: { open: '11:00', close: '15:00', closed: false },
      friday: { open: '11:00', close: '15:00', closed: false },
      saturday: { open: '10:00', close: '20:00', closed: false },
      sunday: { open: '10:00', close: '20:00', closed: false }
    },
    features: ['輕食', '有機', '咖啡', '沙拉']
  },
  {
    id: '15',
    name: '天酥陀（日式燒肉）',
    description: '高級日式燒肉店，提供頂級和牛與精選肉品，專業代烤。',
    cuisine: 'japanese',
    priceRange: '500-1000',
    address: '台北市內湖區康寧路一段1號2樓',
    phone: '02-2634-8880',
    rating: 4.6,
    reviewCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.080721, longitude: 121.59115 },
    allergens: ['soy'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '17:00', close: '22:00', closed: false },
      wednesday: { open: '17:00', close: '22:00', closed: false },
      thursday: { open: '17:00', close: '22:00', closed: false },
      friday: { open: '17:00', close: '22:00', closed: false },
      saturday: { open: '17:00', close: '22:00', closed: false },
      sunday: { open: '17:00', close: '22:00', closed: false }
    },
    features: ['燒肉', '和牛', '日式料理', '包廂']
  },
  {
    id: '16',
    name: '卡拉拉涮涮鍋',
    description: '優質火鍋店，選用新鮮食材，湯底多樣化，環境乾淨。',
    cuisine: 'chinese',
    priceRange: '500-1000',
    address: '台北市內湖區成功路四段205號',
    phone: '02-2792-5612',
    rating: 4.1,
    reviewCount: 243,
    imageUrl: 'https://images.unsplash.com/photo-1584278858536-52732d3a34ea?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.084219, longitude: 121.59603 },
    allergens: ['shrimp'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:00', close: '14:30', closed: false },
      wednesday: { open: '11:00', close: '14:30', closed: false },
      thursday: { open: '11:00', close: '14:30', closed: false },
      friday: { open: '11:00', close: '14:30', closed: false },
      saturday: { open: '11:00', close: '15:00', closed: false },
      sunday: { open: '11:00', close: '15:00', closed: false }
    },
    features: ['火鍋', '涮涮鍋', '海鮮', '肉品']
  },
  {
    id: '17',
    name: '饗趣31',
    description: '創意中式料理，融合各地風味，擺盤精緻。',
    cuisine: 'chinese',
    priceRange: '250-500',
    address: '台北市內湖區成功路五段31號',
    phone: '02-2634-0031',
    rating: 4.4,
    reviewCount: 196,
    imageUrl: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.082835, longitude: 121.60398 },
    allergens: ['soy', 'gluten'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:30', close: '14:00', closed: false },
      wednesday: { open: '11:30', close: '14:00', closed: false },
      thursday: { open: '11:30', close: '14:00', closed: false },
      friday: { open: '11:30', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '14:30', closed: false },
      sunday: { open: '11:30', close: '14:30', closed: false }
    },
    features: ['創意料理', '中式料理', '合菜', '精緻']
  },
  {
    id: '18',
    name: '日子很甜雪花冰店',
    description: '特色雪花冰與甜品，口味創新，食材天然。',
    cuisine: 'dessert',
    priceRange: '0-250',
    address: '台北市內湖區文德路210巷30弄42號',
    phone: '02-2657-9898',
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.0773, longitude: 121.5853 },
    allergens: ['dairy'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '00:00', close: '00:00', closed: true },
      wednesday: { open: '00:00', close: '00:00', closed: true },
      thursday: { open: '00:00', close: '00:00', closed: true },
      friday: { open: '12:00', close: '22:00', closed: false },
      saturday: { open: '12:00', close: '16:00', closed: false },
      sunday: { open: '00:00', close: '00:00', closed: true }
    },
    features: ['雪花冰', '甜品', '飲料']
  },
  {
    id: '19',
    name: '巴西里小館',
    description: '提供道地義式家常料理，環境溫馨，價格實惠。',
    cuisine: 'italian',
    priceRange: '250-500',
    address: '台北市內湖區金湖路24號',
    phone: '02-2632-2355',
    rating: 4.3,
    reviewCount: 203,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.083017, longitude: 121.59626 },
    allergens: ['gluten', 'dairy'],
    vegetarianOptions: ['vegetarian'],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:30', close: '14:30', closed: false },
      wednesday: { open: '11:30', close: '14:30', closed: false },
      thursday: { open: '11:30', close: '14:30', closed: false },
      friday: { open: '11:30', close: '14:30', closed: false },
      saturday: { open: '11:30', close: '21:30', closed: false },
      sunday: { open: '11:30', close: '21:30', closed: false }
    },
    features: ['義大利麵', '沙拉', '燉飯', '義式甜點']
  },
  {
    id: '20',
    name: '文湖21雞湯麵',
    description: '專營雞湯麵，湯頭熬製多時，配料豐富，麵條Q彈。',
    cuisine: 'chinese',
    priceRange: '0-250',
    address: '台北市內湖區麗山街68巷5號',
    phone: '02-2659-3577',
    rating: 4.4,
    reviewCount: 174,
    imageUrl: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=800&h=600&fit=crop',
    coordinates: { latitude: 25.082144, longitude: 121.57929 },
    allergens: ['gluten', 'eggs'],
    vegetarianOptions: [],
    openingHours: {
      monday: { open: '00:00', close: '00:00', closed: true },
      tuesday: { open: '11:00', close: '13:50', closed: false },
      wednesday: { open: '11:00', close: '13:50', closed: false },
      thursday: { open: '11:00', close: '13:50', closed: false },
      friday: { open: '11:00', close: '13:50', closed: false },
      saturday: { open: '11:00', close: '13:50', closed: false },
      sunday: { open: '11:00', close: '13:50', closed: false }
    },
    features: ['雞湯麵', '小吃', '湯品', '滷味']
  }
];

// 🔍 搜索函數
export const searchRestaurants = (
  query?: string,
  cuisine?: CuisineType,
  priceRange?: PriceRange
): Restaurant[] => {
  return sampleRestaurants.filter(restaurant => {
    // 關鍵字搜尋
    const matchesQuery = !query || 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(query.toLowerCase());

    // 料理類型篩選
    const matchesCuisine = !cuisine || restaurant.cuisine === cuisine;

    // 價位篩選
    const matchesPriceRange = !priceRange || restaurant.priceRange === priceRange;

    return matchesQuery && matchesCuisine && matchesPriceRange;
  });
};

// 🗺️ 根據距離排序餐廳
export const sortRestaurantsByDistance = (
  restaurants: Restaurant[],
  userLocation: { latitude: number; longitude: number }
): Restaurant[] => {
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // 地球半徑 (公里)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  return [...restaurants].sort((a, b) => {
    const distanceA = calculateDistance(
      userLocation.latitude, 
      userLocation.longitude, 
      a.coordinates.latitude, 
      a.coordinates.longitude
    );
    const distanceB = calculateDistance(
      userLocation.latitude, 
      userLocation.longitude, 
      b.coordinates.latitude, 
      b.coordinates.longitude
    );
    return distanceA - distanceB;
  });
};

// 📊 統計函數
export const getRestaurantStats = () => {
  const totalRestaurants = sampleRestaurants.length;
  const cuisineStats: Record<CuisineType, number> = {
    japanese: 0,
    chinese: 0,
    american: 0,
    french: 0,
    brunch: 0,
    dessert: 0,
    healthy: 0,
    korean: 0,
    italian: 0,
    thai: 0,
    vietnamese: 0,
    indian: 0
  };

  sampleRestaurants.forEach(restaurant => {
    cuisineStats[restaurant.cuisine]++;
  });

  return {
    totalRestaurants,
    cuisineStats
  };
};

// 🏪 單一餐廳詳情
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return sampleRestaurants.find(restaurant => restaurant.id === id);
};

// ⭐ 評分篩選
export const getTopRatedRestaurants = (minRating: number = 4.0): Restaurant[] => {
  return sampleRestaurants.filter(restaurant => restaurant.rating >= minRating);
};

// 💰 價位區間餐廳
export const getRestaurantsByPriceRange = (priceRange: PriceRange): Restaurant[] => {
  return sampleRestaurants.filter(restaurant => restaurant.priceRange === priceRange);
};

// 💰 價位區間對應的中文文字
export const getPriceRangeText = (priceRange: PriceRange): string => {
  const priceRangeMap: Record<PriceRange, string> = {
    '0-250': 'NT$ 250 以下',
    '250-500': 'NT$ 250 - 500',
    '500-1000': 'NT$ 500 - 1000',
    '1000+': 'NT$ 1000 以上'
  };
  return priceRangeMap[priceRange] || priceRange;
};

// 🍴 取得料理類型的中文名稱
export const getCuisineName = (cuisine: CuisineType): string => {
  const cuisineMap: Record<CuisineType, string> = {
    japanese: '日式料理',
    chinese: '中式料理',
    american: '美式料理',
    french: '法式料理',
    dessert: '甜點咖啡',
    healthy: '健康輕食',
    brunch: '早午餐',
    korean: '韓式料理',
    italian: '義式料理',
    thai: '泰式料理',
    vietnamese: '越式料理',
    indian: '印度料理'
  };
  return cuisineMap[cuisine] || cuisine;
};

// 🍕 取得料理類型的Emoji圖示
export const getCuisineEmoji = (cuisine: CuisineType): string => {
  const emojiMap: Record<CuisineType, string> = {
    japanese: '🍣',
    chinese: '🍜',
    american: '🍔',
    french: '🥐',
    dessert: '🍰',
    healthy: '🥗',
    brunch: '🍳',
    korean: '🍲',
    italian: '🍕',
    thai: '🌶️',
    vietnamese: '🍲',
    indian: '🍛'
  };
  return emojiMap[cuisine] || '🍽️';
};
