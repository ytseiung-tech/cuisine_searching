import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { sampleRestaurants, getCuisineName, getCuisineEmoji } from '../data/restaurants';
import { RootStackParamList } from '../App';

const { width, height } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  // 🗺️ 使用 Google Maps 導航到餐廳地址
  const openGoogleMapsWithAddress = (restaurantAddress: string, restaurantName: string) => {
    const address = encodeURIComponent(restaurantAddress);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    
    Linking.openURL(googleMapsUrl).catch((err) => {
      console.error('無法開啟 Google Maps', err);
      // 備用方案：開啟 Apple Maps (iOS)
      const appleMapUrl = `http://maps.apple.com/?daddr=${address}`;
      Linking.openURL(appleMapUrl);
    });
  };

  // 內湖區的中心座標
  const neishuCenter = {
    latitude: 25.0758,
    longitude: 121.5743,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const handleMarkerPress = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
  };

  const handleRestaurantPress = (restaurantId: string) => {
    navigation.navigate('RestaurantDetail', { restaurantId });
  };

  const selectedRestaurantData = selectedRestaurant 
    ? sampleRestaurants.find(r => r.id === selectedRestaurant)
    : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>內湖區餐廳地圖</Text>
        <Text style={styles.headerSubtitle}>探索您附近的美食</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={neishuCenter}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {sampleRestaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.coordinates}
              onPress={() => handleMarkerPress(restaurant.id)}
            >
              <View style={[
                styles.marker,
                selectedRestaurant === restaurant.id && styles.markerSelected
              ]}>
                <Text style={styles.markerEmoji}>
                  {getCuisineEmoji(restaurant.cuisine)}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="list" size={24} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="filter" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Restaurant Info */}
      {selectedRestaurantData && (
        <View style={styles.selectedRestaurantContainer}>
          <TouchableOpacity
            style={styles.selectedRestaurant}
            onPress={() => handleRestaurantPress(selectedRestaurantData.id)}
            activeOpacity={0.8}
          >
            <View style={styles.selectedRestaurantInfo}>
              <Text style={styles.selectedRestaurantName}>
                {selectedRestaurantData.name}
              </Text>
              <Text style={styles.selectedRestaurantDetails}>
                {getCuisineName(selectedRestaurantData.cuisine)} • 
                評分 {selectedRestaurantData.rating} ⭐
              </Text>
              <Text style={styles.selectedRestaurantAddress}>
                {selectedRestaurantData.address}
              </Text>
            </View>
            <View style={styles.selectedRestaurantActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="call" size={20} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => {
                  const restaurant = sampleRestaurants.find(r => r.id === selectedRestaurant);
                  if (restaurant) {
                    openGoogleMapsWithAddress(restaurant.address, restaurant.name);
                  }
                }}
              >
                <Ionicons name="navigate" size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedRestaurant(null)}
          >
            <Ionicons name="close" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      )}

      {/* Restaurant List */}
      <View style={styles.restaurantListContainer}>
        <View style={styles.restaurantListHeader}>
          <Text style={styles.restaurantListTitle}>
            內湖區餐廳 ({sampleRestaurants.length})
          </Text>
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.restaurantList}
          contentContainerStyle={styles.restaurantListContent}
        >
          {sampleRestaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={[
                styles.restaurantCard,
                selectedRestaurant === restaurant.id && styles.restaurantCardSelected
              ]}
              onPress={() => handleMarkerPress(restaurant.id)}
              activeOpacity={0.8}
            >
              <View style={styles.restaurantCardEmoji}>
                <Text style={styles.restaurantCardEmojiText}>
                  {getCuisineEmoji(restaurant.cuisine)}
                </Text>
              </View>
              <Text style={styles.restaurantCardName} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <Text style={styles.restaurantCardCuisine}>
                {getCuisineName(restaurant.cuisine)}
              </Text>
              <View style={styles.restaurantCardRating}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.restaurantCardRatingText}>
                  {restaurant.rating}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  markerEmoji: {
    fontSize: 18,
  },
  mapControls: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'column',
    gap: 8,
  },
  mapButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedRestaurantContainer: {
    position: 'absolute',
    bottom: 200,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  selectedRestaurant: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  selectedRestaurantInfo: {
    flex: 1,
  },
  selectedRestaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  selectedRestaurantDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  selectedRestaurantAddress: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  selectedRestaurantActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantListContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  restaurantListHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  restaurantListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  restaurantList: {
    maxHeight: 120,
  },
  restaurantListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  restaurantCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  restaurantCardSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  restaurantCardEmoji: {
    marginBottom: 8,
  },
  restaurantCardEmojiText: {
    fontSize: 24,
  },
  restaurantCardName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  restaurantCardCuisine: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  restaurantCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantCardRatingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 2,
  },
});

export default MapScreen;
