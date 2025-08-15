import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { CuisineType, PriceRange } from '../types';
import { getCuisineEmoji, getCuisineName, getPriceRangeText, sampleRestaurants } from '../data/restaurants';
import { TabParamList } from '../App';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<TabParamList, 'Home'>;

interface CuisineOption {
  type: CuisineType;
  name: string;
  emoji: string;
  description: string;
}

interface BudgetOption {
  value: PriceRange;
  label: string;
  icon: string;
  description: string;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);
  const [currentStep, setCurrentStep] = useState<'cuisine' | 'budget'>('cuisine');

  const cuisineOptions: CuisineOption[] = [
    {
      type: 'japanese',
      name: '日式料理',
      emoji: '🍣',
      description: '壽司、拉麵、生魚片'
    },
    {
      type: 'chinese',
      name: '中式料理',
      emoji: '🍜',
      description: '麵點、炒菜、火鍋'
    },
    {
      type: 'american',
      name: '美式料理',
      emoji: '🍔',
      description: '漢堡、牛排、三明治'
    },
    {
      type: 'italian',
      name: '義式料理',
      emoji: '🍕',
      description: '披薩、義大利麵、燉飯'
    },
    {
      type: 'thai',
      name: '泰式料理',
      emoji: '🌶️',
      description: '酸辣湯、青木瓜沙拉'
    },
    {
      type: 'korean',
      name: '韓式料理',
      emoji: '🍲',
      description: '韓式烤肉、泡菜'
    },
    {
      type: 'dessert',
      name: '甜點咖啡',
      emoji: '🍰',
      description: '蛋糕、冰品、咖啡'
    },
    {
      type: 'healthy',
      name: '健康輕食',
      emoji: '🥗',
      description: '沙拉、有機料理'
    },
    {
      type: 'brunch',
      name: '早午餐',
      emoji: '🍳',
      description: '歐姆蛋、鬆餅、三明治'
    },
  ];

  const budgetOptions: BudgetOption[] = [
    {
      value: '0-250',
      label: '經濟實惠',
      icon: '💰',
      description: 'NT$ 250 以下'
    },
    {
      value: '250-500',
      label: '平價美食',
      icon: '💰💰',
      description: 'NT$ 250 - 500'
    },
    {
      value: '500-1000',
      label: '小奢享受',
      icon: '💰💰💰',
      description: 'NT$ 500 - 1000'
    },
    {
      value: '1000+',
      label: '高級餐飲',
      icon: '💰💰💰💰',
      description: 'NT$ 1000 以上'
    }
  ];

  const handleCuisineSelect = (cuisine: CuisineType) => {
    setSelectedCuisine(cuisine);
    setCurrentStep('budget');
  };

  const handleBudgetSelect = (budget: PriceRange) => {
    if (selectedCuisine) {
      // 確定有選擇的餐廳類型
      const filteredRestaurants = sampleRestaurants.filter(
        restaurant => restaurant.cuisine === selectedCuisine && restaurant.priceRange === budget
      );
      
      if (filteredRestaurants.length > 0) {
        navigation.navigate('Search', {
          filters: {
            cuisine: [selectedCuisine],
            priceRange: [budget]
          }
        });
      } else {
        Alert.alert(
          '沒有找到符合條件的餐廳',
          `很抱歉，目前沒有${getCuisineName(selectedCuisine)}且價格範圍在${getPriceRangeText(budget)}的餐廳。`,
          [{ text: '返回', style: 'cancel' }]
        );
      }
    }
  };

  const handleBackToCuisine = () => {
    setCurrentStep('cuisine');
    setSelectedCuisine(null);
  };

  const renderCuisineSelection = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>選擇料理類型</Text>
        <Text style={styles.sectionSubtitle}>今天想吃什麼？</Text>
        
        <View style={styles.cuisineGrid}>
          {cuisineOptions.map((cuisine) => (
            <TouchableOpacity
              key={cuisine.type}
              style={styles.cuisineCard}
              onPress={() => handleCuisineSelect(cuisine.type)}
              activeOpacity={0.75}
            >
              <View style={styles.cuisineEmojiContainer}>
                <Text style={styles.cuisineEmoji}>{cuisine.emoji}</Text>
              </View>
              <Text style={styles.cuisineName}>{cuisine.name}</Text>
              <Text style={styles.cuisineDescription}>{cuisine.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderBudgetSelection = () => {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.budgetHeader}>
          <TouchableOpacity onPress={handleBackToCuisine} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#6B7280" />
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>選擇價格範圍</Text>
        <Text style={styles.sectionSubtitle}>
          {selectedCuisine && `為您的${getCuisineName(selectedCuisine)}選擇預算`}
        </Text>
        
        <View style={styles.budgetGrid}>
          {budgetOptions.map((budget) => (
            <TouchableOpacity
              key={budget.value}
              style={styles.budgetCard}
              onPress={() => handleBudgetSelect(budget.value)}
              activeOpacity={0.75}
            >
              <Text style={styles.budgetIcon}>{budget.icon}</Text>
              <Text style={styles.budgetLabel}>{budget.label}</Text>
              <Text style={styles.budgetDescription}>{budget.description}</Text>
              <View style={styles.budgetAction}>
                <Text style={styles.budgetActionText}>選擇</Text>
                <Ionicons name="arrow-forward" size={14} color="#2563EB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View>
              <Text style={styles.headerTitle}>內湖美食搜尋</Text>
              <Text style={styles.headerSubtitle}>探索美味，發現驚喜</Text>
            </View>
          </View>
          
          <View style={styles.headerButtonsContainer}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Map')}
            >
              <Ionicons name="map-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.headerButton, { marginLeft: 12 }]}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {currentStep === 'cuisine' ? renderCuisineSelection() : renderBudgetSelection()}
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  cuisineCard: {
    width: (width - 48) / 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  cuisineEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cuisineEmoji: {
    fontSize: 28,
  },
  cuisineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  cuisineDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  budgetGrid: {
    marginTop: 16,
  },
  budgetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  budgetIcon: {
    fontSize: 24,
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  budgetDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  budgetAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginRight: 4,
  }
});

export default HomeScreen;
