# 🍽️ 內湖美食搜尋應用程式 - 完整技術說明

## 📱 應用程式概述

這是一個專為台北內湖區設計的美食搜尋應用程式，使用 **React Native + Expo** 開發，提供完整的原生移動端體驗。

---

## 🏗️ 專案架構詳解

### 📁 檔案結構

```
cuisine_searching/
├── 🎯 App.tsx                 # 主應用入口，導航配置
├── 📦 package.json            # 專案依賴與腳本
├── ⚙️ tsconfig.json           # TypeScript 配置
├── 🎨 assets/                 # 圖片與資源檔案
├── 📊 data/
│   └── restaurants.ts         # 餐廳資料庫與管理
├── 🏠 screens/                # 應用程式畫面
│   ├── HomeScreen.tsx         # 首頁 - 多步驟選擇
│   ├── SearchScreen.tsx       # 搜尋 - 進階篩選
│   ├── MapScreen.tsx          # 地圖 - 互動式地圖
│   ├── RestaurantDetailScreen.tsx # 餐廳詳情
│   ├── ProfileScreen.tsx      # 個人設定
│   └── AddRestaurantScreen.tsx # 新增餐廳管理
└── 🔧 types/
    └── index.ts               # TypeScript 類型定義
```

---

## 📝 ProfileScreen.tsx 深度分析

### 🎨 UI 組件架構

```tsx
ProfileScreen
├── LinearGradient Header      # 漸層背景標題欄
│   ├── 標題文字
│   └── 編輯按鈕 (鉛筆/勾選圖示)
├── ScrollView 內容區域
│   ├── renderBasicInfo()      # 基本資料表單
│   ├── renderCuisinePreferences() # 料理偏好選擇
│   ├── renderAllergenInfo()   # 過敏原管理
│   ├── renderVegetarianOptions() # 素食選項
│   ├── renderDistancePreference() # 搜尋距離
│   └── 動作按鈕 (儲存/取消)
```

### 🔧 狀態管理

```tsx
// 主要狀態
const [user, setUser] = useState<User>({...});      // 已儲存的用戶資料
const [tempUser, setTempUser] = useState<User>({...}); // 編輯中的暫時資料
const [isEditing, setIsEditing] = useState(false);  // 編輯模式開關

// 功能函數
toggleCuisine(cuisine)    // 切換料理偏好
toggleAllergen(allergen)  // 切換過敏原標示
setVegetarianType(type)   // 設定素食類型
handleSave()              // 儲存並驗證
handleCancel()            // 取消並還原
```

### 🎯 核心功能

1. **編輯模式切換**
   - 點擊鉛筆圖示進入編輯模式
   - 編輯模式下所有表單元素變為可編輯
   - 非編輯模式下表單為只讀狀態

2. **料理偏好管理**
   - 多選卡片界面
   - 支援 7 種料理類型
   - 即時視覺回饋

3. **過敏原控制**
   - Switch 開關設計
   - 7 種常見過敏原
   - 餐廳篩選關聯

4. **表單驗證**
   - 必填欄位檢查
   - 數據格式驗證
   - 錯誤提示

---

## 🏪 餐廳管理系統

### 📊 資料結構

```typescript
interface Restaurant {
  id: string;                    // 唯一識別碼
  name: string;                  // 餐廳名稱
  description: string;           // 詳細描述
  cuisine: CuisineType;          // 料理類型
  priceRange: PriceRange;        // 價位區間
  address: string;               // 🎯 完整地址 (不使用經緯度)
  phone?: string;                // 聯絡電話
  website?: string;              // 官方網站
  rating: number;                // 評分 (1-5)
  reviewCount: number;           // 評論數量
  imageUrl: string;              // 圖片網址
  coordinates: Coordinates;       // GPS 座標 (由地址自動轉換)
  allergens: Allergen[];         // 可能含有的過敏原
  vegetarianOptions: VegetarianOption[]; // 素食選項
  openingHours: OpeningHours;    // 營業時間
  features: string[];            // 特色服務
  isOpen: boolean;               // 目前是否營業
}
```

### 🆕 新增餐廳功能

**AddRestaurantScreen.tsx** 提供完整的餐廳新增界面：

```tsx
// 🎯 核心功能：使用地址而非經緯度
const createNewRestaurant = (data) => {
  return {
    ...data,
    id: Date.now().toString(),
    coordinates: getCoordinatesFromAddress(data.address) // 地址自動轉座標
  };
};
```

#### 🔧 新增流程

1. **表單填寫**
   - 基本資訊：名稱、描述、地址
   - 聯絡方式：電話、網站
   - 分類：料理類型、價位區間
   - 特殊需求：過敏原、素食選項

2. **地址驗證**
   ```tsx
   const validateAddress = async (address: string) => {
     // 檢查是否為內湖區地址
     if (!address.includes('台北市內湖區')) {
       Alert.alert('地址錯誤', '請輸入台北市內湖區的完整地址');
       return false;
     }
     // 未來可整合 Google Places API 驗證
     return true;
   };
   ```

3. **自動儲存**
   - 表單驗證通過後自動加入餐廳列表
   - 提供成功回饋與地址確認

---

## 🗺️ Google Maps 整合 (不使用經緯度)

### 🎯 核心概念

傳統做法：`經緯度座標` → `地圖標記` → `導航`  
**新做法：`地址字串` → `Google Maps 查詢` → `直接導航`**

### 🔧 技術實現

#### MapScreen.tsx 地址導航

```tsx
// 🗺️ 直接使用地址進行 Google Maps 導航
const openGoogleMapsWithAddress = (restaurantAddress: string, restaurantName: string) => {
  const address = encodeURIComponent(restaurantAddress);
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
  
  Linking.openURL(googleMapsUrl).catch((err) => {
    // 備用方案：Apple Maps
    const appleMapUrl = `http://maps.apple.com/?daddr=${address}`;
    Linking.openURL(appleMapUrl);
  });
};
```

#### 優點分析

1. **簡化開發**
   - 無需處理複雜的經緯度轉換
   - 減少座標錯誤的可能性
   - 地址更容易人工驗證

2. **用戶體驗**
   - 直接跳轉到用戶慣用的地圖應用
   - 支援多種地圖服務 (Google Maps, Apple Maps)
   - 自動選擇最佳路線

3. **數據維護**
   - 地址字串易於閱讀和修改
   - 無需專門的地理編碼服務
   - 支援模糊地址搜尋

### 🔍 地址搜尋功能

```tsx
// 🔍 透過地址關鍵字搜尋餐廳
const searchByAddress = (keyword: string) => {
  const results = sampleRestaurants.filter(restaurant => 
    restaurant.address.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  );
  return results;
};
```

---

## 🛠️ 如何增加新餐廳

### 方法一：直接編輯資料檔案

在 `data/restaurants.ts` 中添加：

```tsx
{
  id: '9',
  name: '新餐廳名稱',
  description: '餐廳描述...',
  cuisine: 'japanese',
  priceRange: '250-500',
  address: '台北市內湖區完整地址', // 🎯 重點：使用完整地址
  phone: '02-1234-5678',
  rating: 4.3,
  reviewCount: 156,
  imageUrl: 'https://images.unsplash.com/photo-xxxxx',
  coordinates: {
    latitude: 25.0816,  // 暫時使用預設值
    longitude: 121.5816
  },
  allergens: ['eggs', 'dairy'],
  vegetarianOptions: ['vegetarian'],
  openingHours: {
    monday: { open: '11:00', close: '22:00', closed: false },
    // ... 其他日期
  },
  features: ['特色1', '特色2', '特色3'],
  isOpen: true
}
```

### 方法二：使用 AddRestaurantScreen 界面

1. 點擊「餐廳管理」頁面的 ➕ 按鈕
2. 填寫表單資料
3. 🎯 **重點：在地址欄位輸入完整地址**
4. 選擇料理類型和價位
5. 點擊「儲存」完成新增

### 方法三：批量匯入

```tsx
// 創建批量新增函數
const addMultipleRestaurants = (restaurantList: RestaurantData[]) => {
  restaurantList.forEach(data => {
    const restaurant = createNewRestaurant(data);
    sampleRestaurants.push(restaurant);
  });
};

// 使用範例
const newRestaurants = [
  {
    name: '餐廳A',
    address: '台北市內湖區瑞光路100號',
    // ... 其他資料
  },
  {
    name: '餐廳B', 
    address: '台北市內湖區成功路200號',
    // ... 其他資料
  }
];

addMultipleRestaurants(newRestaurants);
```

---

## 🔮 Google Maps API 整合建議

### 🌐 未來可以整合的功能

#### 1. Google Places API - 地址自動完成
```tsx
const getAddressSuggestions = async (input: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}&components=country:tw&location=25.0816,121.5816&radius=5000`
  );
  return response.json();
};
```

#### 2. Geocoding API - 地址轉座標
```tsx
const getCoordinatesFromAddress = async (address: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  return data.results[0].geometry.location;
};
```

#### 3. Places Details API - 餐廳詳細資訊
```tsx
const getRestaurantDetails = async (placeId: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&fields=name,rating,photos,opening_hours,phone_number`
  );
  return response.json();
};
```

---

## 🚀 使用指南

### 開發環境啟動
```bash
# 安裝依賴
npm install

# 啟動開發服務器
npx expo start --clear

# 掃描 QR 碼在手機上測試
```

### 主要功能使用

1. **🏠 首頁** - 選擇料理類型和預算
2. **🔍 搜尋** - 使用關鍵字和篩選器
3. **🗺️ 地圖** - 查看餐廳位置，點擊導航按鈕直接跳轉 Google Maps
4. **📝 詳情** - 查看餐廳完整資訊
5. **👤 個人設定** - 管理偏好和過敏原
6. **➕ 新增餐廳** - 使用地址新增新餐廳

### 📱 手機使用體驗

- **原生導航**：底部 Tab 導航 + Stack 導航
- **觸控友善**：適當的按鈕大小和間距
- **響應式設計**：適應不同螢幕尺寸
- **流暢動畫**：原生級別的動畫效果
- **離線支援**：本地資料儲存

---

## 🎨 設計特色

### 🌈 視覺設計
- **漸層背景**：現代化的色彩設計
- **卡片界面**：清晰的資訊層級
- **圖示語言**：直觀的 Emoji 和 Icon
- **配色系統**：一致的藍綠色主題

### 🎯 用戶體驗
- **多步驟引導**：減少認知負擔
- **即時回饋**：操作結果立即顯示
- **錯誤處理**：友善的錯誤提示
- **無障礙設計**：支援輔助功能

---

## 📈 擴展性規劃

### 🔧 技術擴展
- **後端整合**：Firebase 或 Node.js API
- **用戶認證**：Google/Facebook 登入
- **即時更新**：WebSocket 通訊
- **離線同步**：本地資料庫

### 🌟 功能擴展
- **評論系統**：用戶評分和留言
- **收藏功能**：個人收藏清單
- **社交分享**：分享推薦給朋友
- **推薦算法**：AI 個人化推薦
- **訂位整合**：直接預約餐廳
- **多語言支援**：中英日文界面

---

## 🔧 技術特色總結

### ✅ 已實現功能
- ✅ React Native + Expo 原生體驗
- ✅ TypeScript 完整類型安全
- ✅ 地址導航 (不使用經緯度)
- ✅ 餐廳新增管理系統
- ✅ 個人偏好設定
- ✅ 過敏原管理
- ✅ 互動式地圖
- ✅ 進階搜尋篩選

### 🎯 核心優勢
1. **簡化地理位置處理** - 直接使用地址字串
2. **用戶友善的新增流程** - 無需技術背景
3. **完整的過敏原管理** - 貼心的健康考量
4. **原生移動體驗** - 流暢的操作感受

這個應用程式展示了如何使用現代 React Native 技術創建一個功能完整、用戶友善的美食搜尋應用，特別強調了地址導航和餐廳管理的創新做法。
