import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

export default function EarnMore({}) {
  return (
    <View style={styles.maincontainer}>

 
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo1.webp')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor={COLORS.grey}
          style={styles.textInput}
          keyboardType="phone-pad"
        />
      </View>
      <View style={[styles.inputContainer, {marginTop: verticalScale(15)}]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={COLORS.grey}
          secureTextEntry={true}
          style={styles.textInput}
        />
         
      </View>
      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      <View style={styles.BtnContainer}>
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnTxt}>Proceed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.signupText}>Signup Now</Text>
       
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({

  maincontainer:{
flex:1,
backgroundColor:COLORS.blue,
justifyContent:'center'

  },
  container: {
 padding:moderateScale(20),
    backgroundColor: COLORS.White,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    borderTopLeftRadius:scale(60),
    borderBottomRightRadius:scale(60)

  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  logo: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.Black,
  },
  textInput: {
    height: verticalScale(45),
    fontSize: moderateScale(16),
    color: COLORS.Black,
    paddingVertical: verticalScale(10),
  },
  BtnContainer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },
  Btn: {
    backgroundColor: COLORS.blue,
    width: '100%',
    height: verticalScale(45),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
  },
  BtnTxt: {
    color: COLORS.White,
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  signupText: {
    fontSize: moderateScale(16),
    color: COLORS.blue,
    marginBottom: verticalScale(10),
  },
  forgotPasswordText: {
    fontSize: moderateScale(16),
    color: COLORS.blue,
    alignSelf:'flex-end'
  },

});
