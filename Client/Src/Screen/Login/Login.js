import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../Components/TextInput/Input';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import {Instance} from '../../api/Instance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {userlogin} from '../../api/api';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    setLoading(true);
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (valid) {
      try {
        const response = await userlogin(email, password);
        console.log('Login Response:', response);
        if (response.success) {
          const token = response.token;

          await AsyncStorage.setItem('userToken', token);
          console.log('Token', token);
          Alert.alert('Login successful!', 'Welcome back to LazyApp');
          navigation.navigate('DrawerTab');
        } else {
          Alert.alert('Error', 'Login failed');
        }
      } catch (error) {
        console.error(
          'Login Error:',
          error.response ? error.response.data : error.message,
        );
        Alert.alert('Error', 'Something went wrong');
      }
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.GradientStling}>
        <Text style={styles.Title}>LazyApp</Text>
      </LinearGradient>
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Login</Text>
        <Input
          title="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          errorMessage={emailError}
          keyboardType="email-address"
        />
        <Input
          title="Password"
          placeholder="Enter Password"
          IsPassword={true}
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError}
        />
        <Text style={styles.ForgotTxt}>Forgot Password?</Text>
        <TouchableOpacity onPress={handleLogin} disabled={loading}>
          <LinearGradient
            colors={['#42a1f5', '#03bafc', '#42c5f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.LoginBtn}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={COLORS.White}
                style={styles.Loader}
              />
            ) : (
              <Text style={styles.Btntxt}>LOGIN</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text style={styles.Txt}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                color: COLORS.blue,
                marginHorizontal: moderateScale(5),
                fontSize: moderateScale(18),
              }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  GradientStling: {
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
    height: Dimensions.get('window').height * 0.2,
    width: '100%',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  Title: {
    color: COLORS.White,
    fontSize: 31,
    fontWeight: 'bold',
  },
  LoginContainer: {
    elevation: scale(10),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(10),
    margin: scale(10),
    marginTop: scale(-20),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(15),
  },
  LoginText: {
    fontWeight: 'bold',
    fontSize: moderateScale(19),
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
  LoginBtn: {
    borderRadius: moderateScale(100),
    width: scale(150),
    height: scale(38),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    marginTop: scale(50),
    marginBottom: scale(16),
  },
  Btntxt: {
    color: COLORS.White,
    fontSize: moderateScale(19),
  },
  Txt: {
    color: COLORS.Black,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  ForgotTxt: {
    color: COLORS.primaryColor,
    fontSize: moderateScale(15),
    textAlign: 'right',
  },
  Loader: {
    marginVertical: verticalScale(4),
  },
});
