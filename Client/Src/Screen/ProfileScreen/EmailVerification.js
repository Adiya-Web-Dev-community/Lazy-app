import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../Components/TextInput/Input';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import CustomStatusBar from '../../Components/CustomStatusBar/CustomStatusBar';
import {sendEmailVerification} from '../../api/api';

export default function EmailVerification({navigation}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleNextStep = async () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    setEmailError('');
    setApiError('');

    try {
      const response = await sendEmailVerification(email);
      console.log('OTPSend', response);
      if (response.success) {
        navigation.navigate('OTPScreen');
      } else {
        setApiError(response.message || 'An error occurred');
      }
    } catch (error) {
      setApiError('Failed to send verification email. Please try again.');
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
        <Text style={styles.Title}>Verify Your Email</Text>
      </LinearGradient>
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Enter Email</Text>
        <Input
          title="Enter Email"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          errorMessage={emailError}
          keyboardType="email-address"
        />
        {apiError ? <Text style={styles.ApiErrorText}>{apiError}</Text> : null}
        <TouchableOpacity onPress={handleNextStep}>
          <LinearGradient
            colors={['#42a1f5', '#03bafc', '#42c5f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.LoginBtn}>
            <Text style={styles.Btntxt}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  GradientStling: {
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
    height: '22%',
    width: '100%',
    alignItems: 'center',
    paddingVertical: verticalScale(40),
  },
  Title: {
    color: COLORS.White,
    fontSize: scale(25),
    fontWeight: 'bold',
    marginTop: scale(20),
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
    marginVertical: verticalScale(10),
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
  ApiErrorText: {
    color: 'red',
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
});
