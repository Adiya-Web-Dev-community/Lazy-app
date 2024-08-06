import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale,moderateScale,verticalScale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';

export default function EarnMore({}) {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/Logo1.webp')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor={COLORS.Black}
          style={styles.textInput}
        />
      </View>
      <View style={[styles.inputContainer, {borderBottomWidth: 1}]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={COLORS.Black}
          secureTextEntry={true}
          style={styles.textInput}
        />
      </View>
      <View style={styles.BtnContainer}>
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnTxt}>Proceed</Text>
        </TouchableOpacity>
      </View>
      <View style={{left: scale(30)}}>
        <Text style={styles.title}>Signup Now</Text>
        <Text style={styles.title}>Forgot your password?</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: scale(100),
    width: scale(100),
    borderRadius: moderateScale(100),
    alignSelf: 'center',
    marginVertical: verticalScale(50),
  },
  inputContainer: {
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.Black,
    left: scale(28),
  },
  textInput: {
    height: verticalScale(40),
    fontSize: moderateScale(18),
    color: COLORS.Black,
  },
  title: {
    fontSize: moderateScale(18),
    color: COLORS.White,
  },
  BtnTxt: {
    color: COLORS.White,
    textAlign: 'center',
    fontSize: moderateScale(18),
    paddingVertical: verticalScale(5),
  },
  Btn: {
    backgroundColor: COLORS.Black,
    width: '80%',
    height: 40,
    marginRight: 10,
  },
  BtnContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
});
