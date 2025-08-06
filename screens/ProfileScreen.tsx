import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { User, CuisineType, AllergenType, VegetarianType } from '../types';

type ProfileScreenNavigationProp = StackNavigationProp<any>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [user, setUser] = useState<User>({
    id: '1',
    uid: '1',
    name: '',
    email: '',
    preferences: {
      id: '1',
      userId: '1',
      preferredCuisines: [],
      budgetRange: [0, 1000],
      maxDistance: 5,
      allergens: [],
      vegetarianType: undefined,
      favoriteRestaurants: [],
      blacklistedAllergens: [],
      preferredVegetarianOptions: [],
      preferredPriceRange: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    favorites: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState<User>(user);

  const cuisineOptions: { type: CuisineType; name: string; icon: string }[] = [
    { type: 'japanese', name: '日式料理', icon: '🍣' },
    { type: 'chinese', name: '中式料理', icon: '🥟' },
    { type: 'american', name: '美式料理', icon: '🍔' },
    { type: 'french', name: '法式料理', icon: '🥐' },
    { type: 'dessert', name: '甜點', icon: '🍰' },
    { type: 'healthy', name: '健康餐', icon: '🥗' },
    { type: 'brunch', name: '早午餐', icon: '🍳' },
  ];

  const allergenOptions: { type: AllergenType; name: string }[] = [
    { type: 'peanuts', name: '花生' },
    { type: 'eggs', name: '蛋類' },
    { type: 'dairy', name: '乳製品' },
    { type: 'shrimp', name: '蝦類' },
    { type: 'gluten', name: '麩質' },
    { type: 'nuts', name: '堅果' },
    { type: 'soy', name: '大豆' },
  ];

  const vegetarianOptions: { type: VegetarianType; name: string }[] = [
    { type: 'vegetarian', name: '奶蛋素' },
    { type: 'vegan', name: '全素' },
    { type: 'lacto-vegetarian', name: '奶素' },
  ];

  const handleSave = () => {
    if (!tempUser.name.trim()) {
      Alert.alert('錯誤', '請輸入姓名');
      return;
    }
    if (!tempUser.email.trim()) {
      Alert.alert('錯誤', '請輸入電子郵件');
      return;
    }
    
    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('成功', '個人資料已更新');
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

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  const toggleCuisine = (cuisine: CuisineType) => {
    if (!tempUser.preferences) return;
    
    const currentCuisines = tempUser.preferences.preferredCuisines;
    const updated = currentCuisines.includes(cuisine)
      ? currentCuisines.filter(c => c !== cuisine)
      : [...currentCuisines, cuisine];
    
    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        preferredCuisines: updated,
      },
    });
  };

  const toggleAllergen = (allergen: AllergenType) => {
    if (!tempUser.preferences) return;
    
    const currentAllergens = tempUser.preferences.allergens;
    const updated = currentAllergens.includes(allergen)
      ? currentAllergens.filter(a => a !== allergen)
      : [...currentAllergens, allergen];
    
    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        allergens: updated,
      },
    });
  };

  const setVegetarianType = (type: VegetarianType | undefined) => {
    if (!tempUser.preferences) return;
    
    setTempUser({
      ...tempUser,
      preferences: {
        ...tempUser.preferences,
        vegetarianType: type,
      },
    });
  };

  const renderBasicInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>基本資料</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>姓名</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={tempUser.name}
          onChangeText={(text) => setTempUser({ ...tempUser, name: text })}
          placeholder="請輸入姓名"
          editable={isEditing}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>電子郵件</Text>
        <TextInput
          style={[styles.input, !isEditing && styles.disabledInput]}
          value={tempUser.email}
          onChangeText={(text) => setTempUser({ ...tempUser, email: text })}
          placeholder="請輸入電子郵件"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={isEditing}
        />
      </View>
    </View>
  );

  const renderCuisinePreferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>偏好料理</Text>
      <Text style={styles.sectionDescription}>選擇您喜歡的料理類型</Text>
      
      <View style={styles.optionsGrid}>
        {cuisineOptions.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.optionCard,
              tempUser.preferences?.preferredCuisines.includes(option.type) && styles.selectedOption,
              !isEditing && styles.disabledOption,
            ]}
            onPress={() => isEditing && toggleCuisine(option.type)}
            disabled={!isEditing}
          >
            <Text style={styles.optionIcon}>{option.icon}</Text>
            <Text style={[
              styles.optionText,
              tempUser.preferences?.preferredCuisines.includes(option.type) && styles.selectedOptionText,
            ]}>
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAllergenInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>過敏原</Text>
      <Text style={styles.sectionDescription}>請標示您的過敏原，以便為您篩選合適的餐廳</Text>
      
      <View style={styles.allergenList}>
        {allergenOptions.map((option) => (
          <View key={option.type} style={styles.allergenItem}>
            <Text style={styles.allergenText}>{option.name}</Text>
            <Switch
              value={tempUser.preferences?.allergens.includes(option.type) || false}
              onValueChange={() => {
                if (isEditing) {
                  toggleAllergen(option.type);
                }
              }}
              disabled={!isEditing}
              trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
              thumbColor={tempUser.preferences?.allergens.includes(option.type) ? '#3B82F6' : '#F3F4F6'}
            />
          </View>
        ))}
      </View>
    </View>
  );

  const renderVegetarianOptions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>素食偏好</Text>
      <Text style={styles.sectionDescription}>選擇您的素食類型（可選）</Text>
      
      <View style={styles.vegetarianOptions}>
        <TouchableOpacity
          style={[
            styles.vegetarianOption,
            !tempUser.preferences?.vegetarianType && styles.selectedVegetarianOption,
            !isEditing && styles.disabledOption,
          ]}
          onPress={() => isEditing && setVegetarianType(undefined)}
          disabled={!isEditing}
        >
          <Text style={[
            styles.vegetarianOptionText,
            !tempUser.preferences?.vegetarianType && styles.selectedVegetarianOptionText,
          ]}>
            無特殊需求
          </Text>
        </TouchableOpacity>
        
        {vegetarianOptions.map((option) => (
          <TouchableOpacity
            key={option.type}
            style={[
              styles.vegetarianOption,
              tempUser.preferences?.vegetarianType === option.type && styles.selectedVegetarianOption,
              !isEditing && styles.disabledOption,
            ]}
            onPress={() => isEditing && setVegetarianType(option.type)}
            disabled={!isEditing}
          >
            <Text style={[
              styles.vegetarianOptionText,
              tempUser.preferences?.vegetarianType === option.type && styles.selectedVegetarianOptionText,
            ]}>
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDistancePreference = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>搜尋距離</Text>
      <Text style={styles.sectionDescription}>設定搜尋餐廳的最大距離（公里）</Text>
      
      <View style={styles.distanceContainer}>
        <TextInput
          style={[styles.distanceInput, !isEditing && styles.disabledInput]}
          value={tempUser.preferences?.maxDistance.toString() || '5'}
          onChangeText={(text) => {
            if (!tempUser.preferences) return;
            
            const distance = parseInt(text) || 1;
            setTempUser({
              ...tempUser,
              preferences: {
                ...tempUser.preferences,
                maxDistance: Math.max(1, Math.min(50, distance)),
              },
            });
          }}
          keyboardType="numeric"
          editable={isEditing}
        />
        <Text style={styles.distanceUnit}>公里</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>個人資料</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            <Ionicons
              name={isEditing ? 'checkmark' : 'pencil'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderBasicInfo()}
        {renderCuisinePreferences()}
        {renderAllergenInfo()}
        {renderVegetarianOptions()}
        {renderDistancePreference()}

        {/* 🎯 新增店家按鈕 */}
        {!isEditing && (
          <View style={styles.addRestaurantSection}>
            <TouchableOpacity
              style={styles.addRestaurantButton}
              onPress={() => navigation.navigate('AddRestaurant')}
            >
              <View style={styles.addRestaurantContent}>
                <Ionicons name="add-circle" size={24} color="#28a745" />
                <View style={styles.addRestaurantText}>
                  <Text style={styles.addRestaurantTitle}>提供新店家</Text>
                  <Text style={styles.addRestaurantSubtitle}>
                    分享您喜愛的餐廳，幫助更多人發現美食
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>

            {/* 📧 問題通報按鈕 */}
            <TouchableOpacity
              style={styles.reportButton}
              onPress={handleReportIssue}
            >
              <View style={styles.addRestaurantContent}>
                <Ionicons name="mail" size={24} color="#dc3545" />
                <View style={styles.addRestaurantText}>
                  <Text style={styles.reportTitle}>問題通報</Text>
                  <Text style={styles.reportSubtitle}>
                    遇到問題或有建議？歡迎與我們聯絡
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {isEditing && (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>儲存</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomSpacer} />
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
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  allergenList: {
    gap: 12,
  },
  allergenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  allergenText: {
    fontSize: 16,
    color: '#374151',
  },
  vegetarianOptions: {
    gap: 12,
  },
  vegetarianOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  selectedVegetarianOption: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  vegetarianOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedVegetarianOptionText: {
    color: '#065F46',
    fontWeight: '600',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distanceInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    width: 80,
    textAlign: 'center',
  },
  distanceUnit: {
    fontSize: 16,
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 20,
  },
  addRestaurantSection: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  addRestaurantButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addRestaurantContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addRestaurantText: {
    flex: 1,
    marginLeft: 12,
  },
  addRestaurantTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
    marginBottom: 2,
  },
  addRestaurantSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  reportButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 2,
  },
  reportSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});

export default ProfileScreen;
