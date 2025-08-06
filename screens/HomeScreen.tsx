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
import { getCuisineEmoji, sampleRestaurants } from '../data/restaurants';
import { TabParamList } from '../App';

const { width } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<TabParamList, 'Home'>;

interface CuisineOption {
  type: CuisineType;
  name: string;
  emoji: string;
  color: string[];
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
      color: ['#EF4444', '#DC2626'],
      description: '壽司、拉麵、丼飯'
    },
    {
      type: 'chinese',
      name: '中式料理',
      emoji: '🥟',
      color: ['#F97316', '#EA580C'],
      description: '粵菜、川菜、台菜'
    },
    {
      type: 'american',
      name: '美式料理',
      emoji: '🍔',
      color: ['#3B82F6', '#2563EB'],
      description: '漢堡、牛排、炸雞'
    },
    {
      type: 'french',
      name: '法式料理',
      emoji: '🥐',
      color: ['#8B5CF6', '#7C3AED'],
      description: '精緻法餐、麵包'
    },
    {
      type: 'dessert',
      name: '甜點',
      emoji: '🧁',
      color: ['#EC4899', '#DB2777'],
      description: '蛋糕、冰淇淋、馬卡龍'
    },
    {
      type: 'healthy',
      name: '健康餐',
      emoji: '🥗',
      color: ['#10B981', '#059669'],
      description: '沙拉、輕食、有機'
    },
    {
      type: 'brunch',
      name: '早午餐',
      emoji: '🥞',
      color: ['#F59E0B', '#D97706'],
      description: '班尼迪克蛋、鬆餅'
    }
  ];

  const budgetOptions: BudgetOption[] = [
    { value: '0-250', label: 'NT$ 250 以下', icon: '💰', description: '平價美食' },
    { value: '250-500', label: 'NT$ 250 - 500', icon: '💳', description: '中等價位' },
    { value: '500-1000', label: 'NT$ 500 - 1000', icon: '🏆', description: '中高價位' },
    { value: '1000+', label: 'NT$ 1000 以上', icon: '💎', description: '高級餐廳' }
  ];

  const handleCuisineSelect = (cuisine: CuisineType) => {
    setSelectedCuisine(cuisine);
    setCurrentStep('budget');
  };

  const handleBudgetSelect = (budget: PriceRange) => {
    // Navigate to search with filters
    navigation.navigate('Search', {
      filters: {
        cuisine: [selectedCuisine!],
        priceRange: [budget]
      }
    });
  };

  const resetSelection = () => {
    setSelectedCuisine(null);
    setCurrentStep('cuisine');
  };

  const handleReportIssue = () => {
    Alert.alert(
      '問題通報',
      '如果您遇到任何問題或有任何建議，歡迎與我們聯絡。我們會盡快回覆您！',
      [
        { text: '取消', style: 'cancel' },
        { text: '發送郵件', onPress: () => {
          Alert.alert(
            '聯絡我們',
            '請發送郵件至：\nytseiungtech@gmail.com\n\n我們會盡快回覆您的問題！',
            [{ text: '確定' }]
          );
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#3B82F6', '#8B5CF6']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>🍽️ 內湖美食搜尋</Text>
              <Text style={styles.headerSubtitle}>今天想吃什麼？讓我們幫您找到完美的餐廳</Text>
              <View style={styles.locationBadge}>
                <Ionicons name="location" size={16} color="#60A5FA" />
                <Text style={styles.locationText}>專注於內湖區優質餐廳</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.reportIconButton}
              onPress={handleReportIssue}
            >
              <Ionicons name="mail-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Progress Steps */}
          <View style={styles.progressContainer}>
            <View style={styles.progressStep}>
              <View style={[
                styles.stepCircle,
                currentStep === 'cuisine' ? styles.stepActive : 
                selectedCuisine ? styles.stepCompleted : styles.stepInactive
              ]}>
                <Text style={[
                  styles.stepText,
                  (currentStep === 'cuisine' || selectedCuisine) ? styles.stepTextActive : styles.stepTextInactive
                ]}>1</Text>
              </View>
              <Text style={[
                styles.stepLabel,
                currentStep === 'cuisine' ? styles.stepLabelActive : styles.stepLabelInactive
              ]}>選擇料理</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />

            <View style={styles.progressStep}>
              <View style={[
                styles.stepCircle,
                currentStep === 'budget' ? styles.stepActive : styles.stepInactive
              ]}>
                <Text style={[
                  styles.stepText,
                  currentStep === 'budget' ? styles.stepTextActive : styles.stepTextInactive
                ]}>2</Text>
              </View>
              <Text style={[
                styles.stepLabel,
                currentStep === 'budget' ? styles.stepLabelActive : styles.stepLabelInactive
              ]}>選擇預算</Text>
            </View>
          </View>

          {/* Step 1: Cuisine Selection */}
          {currentStep === 'cuisine' && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>今天想吃什麼料理？</Text>
              <Text style={styles.stepDescription}>
                選擇您今天的心情，我們為您推薦最適合的餐廳
              </Text>

              <View style={styles.cuisineGrid}>
                {cuisineOptions.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine.type}
                    style={styles.cuisineCard}
                    onPress={() => handleCuisineSelect(cuisine.type)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={cuisine.color as any}
                      style={styles.cuisineImageContainer}
                    >
                      <Text style={styles.cuisineEmoji}>{cuisine.emoji}</Text>
                    </LinearGradient>
                    <View style={styles.cuisineInfo}>
                      <Text style={styles.cuisineName}>{cuisine.name}</Text>
                      <Text style={styles.cuisineDescription}>{cuisine.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Step 2: Budget Selection */}
          {currentStep === 'budget' && selectedCuisine && (
            <View style={styles.stepContainer}>
              <TouchableOpacity style={styles.backButton} onPress={resetSelection}>
                <Ionicons name="chevron-back" size={20} color="#6B7280" />
                <Text style={styles.backButtonText}>重新選擇</Text>
              </TouchableOpacity>

              <View style={styles.selectedCuisineContainer}>
                <Text style={styles.selectedCuisineEmoji}>
                  {getCuisineEmoji(selectedCuisine)}
                </Text>
                <Text style={styles.selectedCuisineName}>
                  {cuisineOptions.find(c => c.type === selectedCuisine)?.name}
                </Text>
              </View>

              <Text style={styles.stepTitle}>預算範圍是多少？</Text>
              <Text style={styles.stepDescription}>
                選擇您今天的預算，我們為您篩選合適的餐廳
              </Text>

              <View style={styles.budgetGrid}>
                {budgetOptions.map((budget) => (
                  <TouchableOpacity
                    key={budget.value}
                    style={styles.budgetCard}
                    onPress={() => handleBudgetSelect(budget.value)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.budgetIcon}>{budget.icon}</Text>
                    <Text style={styles.budgetLabel}>{budget.label}</Text>
                    <Text style={styles.budgetDescription}>{budget.description}</Text>
                    <View style={styles.budgetAction}>
                      <Text style={styles.budgetActionText}>選擇此預算</Text>
                      <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>或者使用其他功能</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: '#EFF6FF' }]}
                onPress={() => navigation.navigate('Search')}
              >
                <Ionicons name="search" size={32} color="#3B82F6" />
                <Text style={[styles.quickActionTitle, { color: '#1E40AF' }]}>進階搜尋</Text>
                <Text style={[styles.quickActionDescription, { color: '#3B82F6' }]}>
                  自訂所有條件
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: '#F0FDF4' }]}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons name="shield-checkmark" size={32} color="#10B981" />
                <Text style={[styles.quickActionTitle, { color: '#065F46' }]}>個人設定</Text>
                <Text style={[styles.quickActionDescription, { color: '#10B981' }]}>
                  儲存飲食偏好
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: '#FAF5FF' }]}
                onPress={() => navigation.navigate('Map')}
              >
                <Ionicons name="location" size={32} color="#8B5CF6" />
                <Text style={[styles.quickActionTitle, { color: '#581C87' }]}>內湖專區</Text>
                <Text style={[styles.quickActionDescription, { color: '#8B5CF6' }]}>
                  精選在地美食
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6']}
            style={styles.statsContainer}
          >
            <Text style={styles.statsTitle}>內湖美食數據</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{sampleRestaurants.length}+</Text>
                <Text style={styles.statLabel}>精選餐廳</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>料理類型</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4</Text>
                <Text style={styles.statLabel}>價位選擇</Text>
              </View>
            </View>
          </LinearGradient>
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
  header: {
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  reportIconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#DBEAFE',
    textAlign: 'center',
    marginBottom: 24,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  locationText: {
    color: '#DBEAFE',
    marginLeft: 8,
    fontSize: 14,
  },
  content: {
    padding: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressStep: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepActive: {
    backgroundColor: '#3B82F6',
  },
  stepCompleted: {
    backgroundColor: '#10B981',
  },
  stepInactive: {
    backgroundColor: '#E5E7EB',
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: 'white',
  },
  stepTextInactive: {
    color: '#6B7280',
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepLabelActive: {
    color: '#3B82F6',
  },
  stepLabelInactive: {
    color: '#6B7280',
  },
  stepContainer: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cuisineCard: {
    width: (width - 72) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cuisineImageContainer: {
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cuisineEmoji: {
    fontSize: 48,
  },
  cuisineInfo: {
    padding: 16,
  },
  cuisineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  cuisineDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    color: '#6B7280',
    marginLeft: 4,
    fontSize: 16,
  },
  selectedCuisineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  selectedCuisineEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  selectedCuisineName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  budgetCard: {
    width: (width - 72) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  budgetIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  budgetLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  budgetDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  budgetAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetActionText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 72) / 3,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
  statsContainer: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#DBEAFE',
  },
});

export default HomeScreen;
