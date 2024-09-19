import React, {useState} from 'react';
import {
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
import CustomStatusBar from '../../Components/CustomStatusBar/CustomStatusBar';
import {updateProfile} from '../../api/api';

export default function EditProfile({navigation}) {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNextStep = async () => {
    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    setUsernameError('');
    setLoading(true);

    try {
      const response = await updateProfile(username);
      console.log('API response:', response);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('UserProfileScreen', {username});
      }, 2000);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
        <Text style={styles.Title}>Verify Your Username</Text>
      </LinearGradient>
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Enter Username</Text>
        <Input
          title="Enter Username"
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          errorMessage={usernameError}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('EmailVerification')}>
          <Text style={styles.FORGOTPSS}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextStep} disabled={loading}>
          <LinearGradient
            colors={['#42a1f5', '#03bafc', '#42c5f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.LoginBtn}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={COLORS.White}
                style={{paddingTop: scale(4)}}
              />
            ) : (
              <Text style={styles.Btntxt}>Update Username</Text>
            )}
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
    width: scale(180),
    height: scale(38),
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    marginTop: scale(50),
    marginBottom: scale(16),
  },
  Btntxt: {
    color: COLORS.White,
    fontSize: moderateScale(17),
    paddingTop: scale(2),
    fontWeight: 'bold',
  },
  FORGOTPSS: {
    color: COLORS.blue,
    fontWeight: '500',
    fontSize: moderateScale(18),
    textAlign: 'right',
  },
});
