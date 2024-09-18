import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {verticalScale, moderateScale, scale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import {OtpInput} from 'react-native-otp-entry';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../../Components/TextInput/Input';
import {verifyOtpAndResetPassword} from '../../api/api';

const OTPScreen = ({navigation}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleVerifyOTP = () => {
    if (code.length === 6) {
      setOtpVerified(true);
    } else {
    }
  };

  const handleConfirmPassword = async () => {
    if (!password || !confirmPassword) {
      setPasswordError('Both fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');

    try {
      setLoading(true);
      const email = 'tesfour71@gmail.com';
      const response = await verifyOtpAndResetPassword(email, code, password);
      if (response.success) {
        alert(response.message);
        navigation.navigate('Login');
      } else {
        alert('Failed to reset password. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <Text style={styles.title}>Verify Your Email</Text>
      </LinearGradient>
      <View style={styles.content}>
        {!otpVerified ? (
          <>
            <OtpInput
              numberOfDigits={6}
              onTextChange={text => setCode(text)}
              value={code}
              focusColor={COLORS.DODGERBLUE}
              containerStyle={styles.otpInputContainer}
            />
            <TouchableOpacity onPress={handleVerifyOTP} disabled={loading}>
              <LinearGradient
                colors={['#42a1f5', '#03bafc', '#42c5f5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.button}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.resetContainer}>
            <Text style={styles.loginText}>Reset Your Password</Text>
            <Input
              title="New Password"
              placeholder="Enter New Password"
              value={password}
              onChangeText={setPassword}
              IsPassword={true}
              errorMessage={passwordError}
              secureTextEntry={true}
            />
            <Input
              title="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              IsPassword={true}
              errorMessage={passwordError}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={handleConfirmPassword}>
              <LinearGradient
                colors={['#42a1f5', '#03bafc', '#42c5f5']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.button, {alignSelf: 'center'}]}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: scale(15),
    borderBottomRightRadius: scale(15),
  },
  title: {
    color: COLORS.White,
    fontSize: scale(25),
    fontWeight: 'bold',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    marginTop: -scale(30),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.White,
    elevation: scale(10),
  },
  subtitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.Black,
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  timer: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.midnightblue,
    marginBottom: verticalScale(20),
  },
  otpInputContainer: {
    width: '100%',
    marginBottom: verticalScale(20),
  },
  button: {
    width: scale(150),
    height: scale(38),
    borderRadius: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
    marginTop: scale(25),
    marginVertical: verticalScale(20),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(19),
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.Black,
  },
  resendLink: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.blue,
  },
  resetContainer: {
    width: '100%',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: moderateScale(19),
    color: COLORS.primaryColor,
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
});
