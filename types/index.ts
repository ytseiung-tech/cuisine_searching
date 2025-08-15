export type CuisineType = 
  | 'japanese'    // 日式料理
  | 'chinese'     // 中式料理
  | 'american'    // 美式料理
  | 'french'      // 法式料理
  | 'dessert'     // 甜點咖啡
  | 'healthy'     // 健康輕食
  | 'brunch'      // 早午餐
  | 'korean'      // 韓式料理
  | 'italian'     // 義式料理
  | 'thai'        // 泰式料理
  | 'vietnamese'  // 越式料理
  | 'indian';     // 印度料理

export type PriceRange = 
  | '0-250' 
  | '250-500' 
  | '500-1000' 
  | '1000+';

export type Allergen = 
  | 'peanuts' 
  | 'eggs' 
  | 'dairy' 
  | 'shrimp' 
  | 'gluten' 
  | 'nuts' 
  | 'soy';

export type AllergenType = Allergen;

export type VegetarianOption = 
  | 'vegetarian' 
  | 'vegan' 
  | 'lacto-vegetarian';

export type VegetarianType = VegetarianOption;

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: CuisineType;
  priceRange: PriceRange;
  address: string;
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  allergens: Allergen[];
  vegetarianOptions: VegetarianOption[];
  openingHours: OpeningHours;
  features: string[];
  isOpen?: boolean;
}

export interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface SearchFilters {
  cuisine?: CuisineType[];
  priceRange?: PriceRange[];
  allergens?: Allergen[];
  vegetarianOptions?: VegetarianOption[];
  searchQuery?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  favoriteRestaurants: string[];
  blacklistedAllergens: Allergen[];
  preferredVegetarianOptions: VegetarianOption[];
  preferredCuisines: CuisineType[];
  preferredPriceRange: PriceRange[];
  allergens: Allergen[];
  vegetarianType?: VegetarianType;
  budgetRange: [number, number];
  maxDistance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  uid: string;
  email: string;
  name: string;
  displayName?: string;
  photoURL?: string;
  preferences?: UserPreferences;
  favorites: string[];
}
