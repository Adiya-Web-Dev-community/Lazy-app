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

export default function ForgotPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirmPassword = () => {
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    setPasswordError('');
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <LinearGradient
        colors={['#42a1f5', '#03bafc', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.GradientStyling}>
        <Text style={styles.Title}>Reset Your Password</Text>
      </LinearGradient>
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Reset Password</Text>
        <Input
          title="Current Password"
          placeholder="Current Password"
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError}
          secureTextEntry={true}
        />
        <Input
          title="New Password"
          placeholder="Enter New Password"
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError}
          secureTextEntry={true}
        />
        <Input
          title="Confirm Password"
          placeholder="Confirm Password"
          value={password}
          onChangeText={setPassword}
          errorMessage={passwordError}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleConfirmPassword}>
          <LinearGradient
            colors={['#42a1f5', '#03bafc', '#42c5f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.LoginBtn}>
            <Text style={styles.Btntxt}>Reset Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  GradientStyling: {
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
});
