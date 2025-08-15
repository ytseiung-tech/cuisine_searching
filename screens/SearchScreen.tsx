import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Restaurant, SearchFilters, CuisineType, PriceRange, Allergen, VegetarianOption } from '../types';
import { sampleRestaurants, getCuisineName, getPriceRangeText } from '../data/restaurants';
import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface RouteParams {
  filters?: SearchFilters;
}

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(sampleRestaurants);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(routeParams?.filters || {
    cuisine: [],
    priceRange: [],
    allergens: [],
    vegetarianOptions: [],
    searchQuery: ''
  });

  const cuisineOptions = [
    { value: 'japanese' as CuisineType, label: '日式料理' },
    { value: 'chinese' as CuisineType, label: '中式料理' },
    { value: 'american' as CuisineType, label: '美式料理' },
    { value: 'french' as CuisineType, label: '法式料理' },
    { value: 'korean' as CuisineType, label: '韓式料理' },
    { value: 'italian' as CuisineType, label: '義式料理' },
    { value: 'thai' as CuisineType, label: '泰式料理' },
    { value: 'vietnamese' as CuisineType, label: '越式料理' },
    { value: 'indian' as CuisineType, label: '印度料理' },
    { value: 'dessert' as CuisineType, label: '甜點咖啡' },
    { value: 'healthy' as CuisineType, label: '健康輕食' },
    { value: 'brunch' as CuisineType, label: '早午餐' }
  ];

  const priceRangeOptions = [
    { value: '0-250' as PriceRange, label: 'NT$ 0 - 250' },
    { value: '250-500' as PriceRange, label: 'NT$ 250 - 500' },
    { value: '500-1000' as PriceRange, label: 'NT$ 500 - 1000' },
    { value: '1000+' as PriceRange, label: 'NT$ 1000+' }
  ];

  const allergenOptions = [
    { value: 'peanuts' as Allergen, label: '花生' },
    { value: 'eggs' as Allergen, label: '蛋類' },
    { value: 'dairy' as Allergen, label: '乳製品' },
    { value: 'shrimp' as Allergen, label: '蝦類' },
    { value: 'gluten' as Allergen, label: '麩質' },
    { value: 'nuts' as Allergen, label: '堅果' },
    { value: 'soy' as Allergen, label: '大豆' }
  ];

  const vegetarianOptions = [
    { value: 'vegetarian' as VegetarianOption, label: '奶蛋素' },
    { value: 'vegan' as VegetarianOption, label: '全素' },
    { value: 'lacto-vegetarian' as VegetarianOption, label: '奶素' }
  ];

  useEffect(() => {
    applyFilters();
  }, [filters, searchQuery]);

  const applyFilters = () => {
    let filtered = sampleRestaurants;

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        getCuisineName(restaurant.cuisine).toLowerCase().includes(query)
      );
    }

    // Filters
    if (filters.cuisine && filters.cuisine.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.cuisine!.includes(restaurant.cuisine)
      );
    }

    if (filters.priceRange && filters.priceRange.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.priceRange!.includes(restaurant.priceRange)
      );
    }

    if (filters.allergens && filters.allergens.length > 0) {
      filtered = filtered.filter(restaurant =>
        !filters.allergens!.some(allergen => restaurant.allergens.includes(allergen))
      );
    }

    if (filters.vegetarianOptions && filters.vegetarianOptions.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.vegetarianOptions!.some(option => restaurant.vegetarianOptions.includes(option))
      );
    }

    setFilteredRestaurants(filtered);
  };

  const handleFilterChange = (filterType: keyof SearchFilters, value: any) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as any[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({
      cuisine: [],
      priceRange: [],
      allergens: [],
      vegetarianOptions: [],
      searchQuery: ''
    });
    setSearchQuery('');
  };

  const activeFilterCount = 
    (filters.cuisine?.length || 0) +
    (filters.priceRange?.length || 0) +
    (filters.allergens?.length || 0) +
    (filters.vegetarianOptions?.length || 0);

  const renderRestaurantCard = (restaurant: Restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id })}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: restaurant.imageUrl || 'https://via.placeholder.com/300x200?text=Restaurant+Image' }}
        style={styles.restaurantImage}
        resizeMode="cover"
      />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.restaurantDescription} numberOfLines={2}>
          {restaurant.description}
        </Text>

        <View style={styles.restaurantDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{getCuisineName(restaurant.cuisine)}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.detailText}>{getPriceRangeText(restaurant.priceRange)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>
              {restaurant.isOpen ? (
                <Text style={styles.openText}>營業中</Text>
              ) : (
                <Text style={styles.closedText}>已打烊</Text>
              )}
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.reviewText}>({restaurant.reviewCount} 評論)</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {restaurant.vegetarianOptions.length > 0 && (
            <View style={[styles.tag, { backgroundColor: '#D1FAE5' }]}>
              <Text style={[styles.tagText, { color: '#065F46' }]}>素食友善</Text>
            </View>
          )}
          {restaurant.rating >= 4.5 && (
            <View style={[styles.tag, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.tagText, { color: '#92400E' }]}>高評價</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>搜尋餐廳</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="搜尋餐廳名稱或料理類型..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options" size={20} color="#3B82F6" />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            找到 {filteredRestaurants.length} 家餐廳
          </Text>
        </View>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersContent}>
              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>料理類型</Text>
                <View style={styles.filterOptions}>
                  {cuisineOptions.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.filterChip,
                        filters.cuisine?.includes(option.value) && styles.filterChipActive
                      ]}
                      onPress={() => handleFilterChange('cuisine', option.value)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        filters.cuisine?.includes(option.value) && styles.filterChipTextActive
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterTitle}>價位範圍</Text>
                <View style={styles.filterOptions}>
                  {priceRangeOptions.map(option => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.filterChip,
                        filters.priceRange?.includes(option.value) && styles.filterChipActive
                      ]}
                      onPress={() => handleFilterChange('priceRange', option.value)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        filters.priceRange?.includes(option.value) && styles.filterChipTextActive
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
                <Text style={styles.clearFiltersText}>清除篩選</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Restaurant List */}
      <ScrollView style={styles.restaurantList} showsVerticalScrollIndicator={false}>
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(renderRestaurantCard)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>找不到符合條件的餐廳</Text>
            <Text style={styles.emptyStateDescription}>
              請嘗試調整您的搜尋條件或篩選器
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: 0.4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  filterButton: {
    position: 'relative',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  filterBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  filtersPanel: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    color: '#374151',
  },
  filterChipTextActive: {
    color: 'white',
  },
  clearFiltersButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  clearFiltersText: {
    color: 'white',
    fontWeight: '600',
  },
  restaurantList: {
    flex: 1,
    padding: 16,
  },
  restaurantCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  restaurantInfo: {
    padding: 18,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
    letterSpacing: 0.3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  restaurantDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  separator: {
    fontSize: 14,
    color: '#D1D5DB',
    marginHorizontal: 8,
  },
  openText: {
    color: '#10B981',
    fontWeight: '600',
  },
  closedText: {
    color: '#EF4444',
  },
  reviewText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default SearchScreen;
