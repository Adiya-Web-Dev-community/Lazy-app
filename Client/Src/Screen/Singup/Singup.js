import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../Components/TextInput/Input';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import {userSingup} from '../../api/api';
import CustomStatusBar from '../../Components/CustomStatusBar/CustomStatusBar';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = email => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    let valid = true;
    if (!name.trim()) {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await userSingup(name, email, password);
        console.log('Response:', response);
        if (response.success) {
          navigation.navigate('DrawerTab');
        } else {
          Alert.alert('Signup failed', response.message || 'Please try again');
        }
      } catch (error) { 
        console.error(error);
        Alert.alert('Signup failed', 'An error occurred. Please try again');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.GradientStling}>
        <Text style={styles.Title}>LazyApp</Text>
      </LinearGradient>
      <View style={styles.SignupContainer}>
        <Text style={styles.SignupTxt}>Signup</Text>
        <Input
          title="UserName"
          placeholder="Enter UserName"
          value={name}
          onChangeText={text => setName(text)}
          errorMessage={nameError}
        />
        <Input
          title="Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
          errorMessage={emailError}
          keyboardType="email-address"
        />
        <Input
          title="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          IsPassword={true}
          errorMessage={passwordError}
        />

        <TouchableOpacity onPress={handleSignup} disabled={loading}>
          <LinearGradient
            colors={['#42a1f5', '#03bafc', '#42c5f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.SignupBtn}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={COLORS.White}
                style={styles.Loader}
              />
            ) : (
              <Text style={styles.BtnTxt}>SIGNUP</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <Text style={styles.txt}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: COLORS.blue,
                marginHorizontal: moderateScale(5),
                fontSize: moderateScale(18),
              }}>
              Login
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
    fontSize: moderateScale(31),
    fontWeight: 'bold',
  },
  SignupContainer: {
    elevation: scale(10),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(10),
    margin: scale(10),
    marginTop: scale(-20),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(15),
  },
  SignupTxt: {
    fontWeight: 'bold',
    fontSize: moderateScale(19),
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
  SignupBtn: {
    borderRadius: moderateScale(100),
    width: scale(150),
    height: scale(38),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    marginTop: scale(70),
    marginBottom: scale(9),
  },
  BtnTxt: {
    color: COLORS.White,
    fontSize: moderateScale(19),
  },
  txt: {
    color: COLORS.Black,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  Loader: {
    marginVertical: verticalScale(4),
  },
});
