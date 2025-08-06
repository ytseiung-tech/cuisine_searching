import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenProps = {
  navigation: StackNavigationProp<any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('錯誤', '請填寫所有必要欄位');
      return;
    }

    // 這裡通常會調用實際的登入API
    Alert.alert('成功', '登入成功！', [
      { text: '確定', onPress: () => navigation.replace('Main') }
    ]);
  };

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('錯誤', '請填寫所有必要欄位');
      return;
    }

    // 這裡通常會調用實際的註冊API
    Alert.alert('成功', '註冊成功！', [
      { text: '確定', onPress: () => navigation.replace('Main') }
    ]);
  };

  const handleGuestLogin = () => {
    Alert.alert(
      '訪客模式',
      '您將以訪客身份使用應用程式，部分功能可能受限。',
      [
        { text: '取消', style: 'cancel' },
        { text: '繼續', onPress: () => navigation.replace('Main') }
      ]
    );
  };

  const handleAddRestaurant = () => {
    Alert.alert(
      '提供新店家',
      '感謝您想要為我們的平台貢獻新店家！您可以選擇先註冊帳號或以訪客身份提供資訊。',
      [
        { text: '取消', style: 'cancel' },
        { text: '先註冊', onPress: () => setIsSignUp(true) },
        { text: '訪客提供', onPress: () => navigation.navigate('AddRestaurant') }
      ]
    );
  };

  const handleReportIssue = () => {
    Alert.alert(
      '問題通報',
      '如果您遇到任何問題或有任何建議，歡迎與我們聯絡。我們會盡快回覆您！',
      [
        { text: '取消', style: 'cancel' },
        { text: '發送郵件', onPress: () => {
          // 在實際應用中，這裡會打開郵件應用程式
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
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Logo區域 */}
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <Ionicons name="restaurant" size={50} color="#FFFFFF" />
              </View>
              <Text style={styles.appTitle}>內湖美食探索</Text>
              <Text style={styles.appSubtitle}>發現您身邊的美味</Text>
            </View>

            {/* 表單區域 */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>
                {isSignUp ? '建立帳號' : '歡迎回來'}
              </Text>

              {isSignUp && (
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="姓名"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="電子郵件"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="密碼"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* 主要按鈕 */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={isSignUp ? handleSignUp : handleLogin}
              >
                <Text style={styles.primaryButtonText}>
                  {isSignUp ? '註冊' : '登入'}
                </Text>
              </TouchableOpacity>

              {/* 切換登入/註冊 */}
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
              >
                <Text style={styles.switchButtonText}>
                  {isSignUp ? '已有帳號？立即登入' : '沒有帳號？立即註冊'}
                </Text>
              </TouchableOpacity>

              {/* 分隔線 */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>或</Text>
                <View style={styles.divider} />
              </View>

              {/* 訪客登入 */}
              <TouchableOpacity
                style={styles.guestButton}
                onPress={handleGuestLogin}
              >
                <Ionicons name="person-outline" size={20} color="#667eea" style={styles.buttonIcon} />
                <Text style={styles.guestButtonText}>以訪客身份繼續</Text>
              </TouchableOpacity>

              {/* 🎯 新增店家按鈕 */}
              <TouchableOpacity
                style={styles.addRestaurantButton}
                onPress={handleAddRestaurant}
              >
                <Ionicons name="add-circle-outline" size={20} color="#28a745" style={styles.buttonIcon} />
                <Text style={styles.addRestaurantButtonText}>提供新店家資訊</Text>
              </TouchableOpacity>

              {/* 📧 問題通報按鈕 */}
              <TouchableOpacity
                style={styles.reportButton}
                onPress={handleReportIssue}
              >
                <Ionicons name="mail-outline" size={20} color="#dc3545" style={styles.buttonIcon} />
                <Text style={styles.reportButtonText}>問題通報</Text>
              </TouchableOpacity>
            </View>

            {/* 底部說明 */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                繼續使用即表示您同意我們的服務條款和隱私政策
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#667eea',
  },
  guestButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
  },
  addRestaurantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FFF9',
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#28a745',
  },
  addRestaurantButtonText: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: '500',
  },
  reportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    height: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  reportButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonIcon: {
    marginRight: 8,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default LoginScreen;
