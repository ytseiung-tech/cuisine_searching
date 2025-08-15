import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { sampleRestaurants, getCuisineName, getPriceRangeText } from '../data/restaurants';
import { Restaurant } from '../types';
import { RootStackParamList } from '../App';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList, 'RestaurantDetail'>;

interface RouteParams {
  restaurantId: string;
}

const RestaurantDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { restaurantId } = route.params as RouteParams;
  
  const [isFavorited, setIsFavorited] = useState(false);
  
  const restaurant = sampleRestaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>找不到餐廳</Text>
          <Text style={styles.errorDescription}>您要找的餐廳不存在</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>返回</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleCallPress = () => {
    if (restaurant.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  };

  const handleDirectionsPress = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`;
    Linking.openURL(url);
  };

  const handleWebsitePress = () => {
    if (restaurant.website) {
      Linking.openURL(restaurant.website);
    }
  };

  const formatOpeningHours = (day: string) => {
    const hours = restaurant.openingHours[day as keyof typeof restaurant.openingHours];
    return hours.closed ? '休息' : `${hours.open} - ${hours.close}`;
  };

  const getDayName = (day: string) => {
    const dayNames: Record<string, string> = {
      monday: '週一',
      tuesday: '週二',
      wednesday: '週三',
      thursday: '週四',
      friday: '週五',
      saturday: '週六',
      sunday: '週日'
    };
    return dayNames[day] || day;
  };

  const allergenLabels: Record<string, string> = {
    peanuts: '花生',
    eggs: '蛋類',
    dairy: '乳製品',
    shrimp: '蝦類',
    gluten: '麩質',
    nuts: '堅果',
    soy: '大豆'
  };

  const vegetarianLabels: Record<string, string> = {
    vegetarian: '奶蛋素',
    vegan: '全素',
    'lacto-vegetarian': '奶素'
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: restaurant.imageUrl || 'https://via.placeholder.com/300x200?text=Restaurant+Image' }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorited ? '#EF4444' : '#6B7280'}
            />
          </TouchableOpacity>
        </View>

        {/* Restaurant Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.cuisineBadge}>
                  <Text style={styles.cuisineBadgeText}>
                    {getCuisineName(restaurant.cuisine)}
                  </Text>
                </View>
                <Text style={styles.priceRange}>
                  {getPriceRangeText(restaurant.priceRange)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Ionicons name="star" size={20} color="#F59E0B" />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Text style={styles.reviewCount}>({restaurant.reviewCount} 則評論)</Text>
            </View>
          </View>

          <Text style={styles.description}>{restaurant.description}</Text>

          {/* Features */}
          {restaurant.features.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>特色服務</Text>
              <View style={styles.featuresContainer}>
                {restaurant.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Dietary Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>飲食資訊</Text>
            
            <View style={styles.dietaryInfo}>
              <View style={styles.dietarySection}>
                <View style={styles.dietarySectionHeader}>
                  <Ionicons name="warning" size={16} color="#F59E0B" />
                  <Text style={styles.dietarySectionTitle}>可能含有過敏原</Text>
                </View>
                {restaurant.allergens.length > 0 ? (
                  <View style={styles.tagsContainer}>
                    {restaurant.allergens.map(allergen => (
                      <View key={allergen} style={[styles.tag, styles.allergenTag]}>
                        <Text style={styles.allergenTagText}>
                          {allergenLabels[allergen] || allergen}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noInfo}>無特殊過敏原標示</Text>
                )}
              </View>

              <View style={styles.dietarySection}>
                <Text style={styles.dietarySectionTitle}>素食選項</Text>
                {restaurant.vegetarianOptions.length > 0 ? (
                  <View style={styles.tagsContainer}>
                    {restaurant.vegetarianOptions.map(option => (
                      <View key={option} style={[styles.tag, styles.vegetarianTag]}>
                        <Text style={styles.vegetarianTagText}>
                          {vegetarianLabels[option] || option}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noInfo}>無素食選項</Text>
                )}
              </View>
            </View>
          </View>

          {/* Opening Hours */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>營業時間</Text>
            <View style={styles.hoursContainer}>
              {Object.keys(restaurant.openingHours).map(day => (
                <View key={day} style={styles.hourRow}>
                  <Text style={styles.dayName}>{getDayName(day)}</Text>
                  <Text style={styles.hours}>{formatOpeningHours(day)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>聯絡資訊</Text>
            
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color="#6B7280" />
              <Text style={styles.contactText}>{restaurant.address}</Text>
            </View>

            {restaurant.phone && (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleCallPress}
              >
                <Ionicons name="call" size={20} color="#6B7280" />
                <Text style={[styles.contactText, styles.contactLink]}>
                  {restaurant.phone}
                </Text>
              </TouchableOpacity>
            )}

            {restaurant.website && (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={handleWebsitePress}
              >
                <Ionicons name="globe" size={20} color="#6B7280" />
                <Text style={[styles.contactText, styles.contactLink]}>
                  官方網站
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleDirectionsPress}
            >
              <Ionicons name="navigate" size={20} color="white" />
              <Text style={styles.primaryButtonText}>導航前往</Text>
            </TouchableOpacity>

            {restaurant.phone && (
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleCallPress}
              >
                <Ionicons name="call" size={20} color="#3B82F6" />
                <Text style={styles.secondaryButtonText}>撥打電話</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  imageContainer: {
    position: 'relative',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  headerImage: {
    width: '100%',
    height: 280,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  content: {
    padding: 24,
    backgroundColor: '#F9FAFB',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerInfo: {
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cuisineBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  cuisineBadgeText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  priceRange: {
    color: '#6B7280',
    fontSize: 14,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  reviewCount: {
    color: '#6B7280',
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    paddingLeft: 10,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F9FAFB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  featureText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '500',
  },
  dietaryInfo: {
    gap: 16,
  },
  dietarySection: {
    gap: 8,
  },
  dietarySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dietarySectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  allergenTag: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },
  allergenTagText: {
    color: '#92400E',
    fontSize: 13,
    fontWeight: '600',
  },
  vegetarianTag: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
  vegetarianTagText: {
    color: '#065F46',
    fontSize: 13,
    fontWeight: '600',
  },
  noInfo: {
    color: '#6B7280',
    fontSize: 14,
    fontStyle: 'italic',
  },
  hoursContainer: {
    gap: 8,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dayName: {
    color: '#374151',
    fontSize: 14,
  },
  hours: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    paddingVertical: 8,
  },
  contactText: {
    color: '#374151',
    fontSize: 15,
  },
  contactLink: {
    color: '#3B82F6',
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 30,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#3B82F6',
  },
  secondaryButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  errorDescription: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default RestaurantDetailScreen;
