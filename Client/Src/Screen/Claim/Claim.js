import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

export default function Claim({}) {
  return (
    <View style={styles.container}>
      <View style={{top: 85}}>
        <Text style={styles.LoginTxt}>Login</Text>
        <Text style={styles.title}>Enter your Email and Password here.</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Phone*"
          placeholderTextColor={COLORS.grey}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password*"
          placeholderTextColor={COLORS.grey}
          secureTextEntry={true}
        />
        <Text style={{color: COLORS.Black, alignSelf:'flex-end'}}>
          Forgot your password?{' '}
          <Text style={{color: COLORS.blue}}>recover password</Text>
        </Text>
        
        <TouchableOpacity style={styles.BtnContainer}>
          <Text style={styles.BtnTxt}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.txt}>
          Don't have Account?<Text style={{color: COLORS.blue}}>Signup</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  inputContainer: {
    backgroundColor: COLORS.White,
    padding:scale (20),
    marginHorizontal: scale (20),
    borderRadius:moderateScale (10),
    top:scale (100),
  },
  input: {
    backgroundColor: COLORS.White,
    padding:scale (10),
    borderRadius: moderateScale (5),
    marginBottom:scale (20),
    borderWidth:scale( 0.5),
    borderColor:COLORS.blue,
    color:COLORS.Black
  },
  LoginTxt: {
    color: COLORS.White,
    fontSize: moderateScale(28),
    textAlign: 'center',
  },
  title: {
    color: COLORS.White,
    fontSize: moderateScale(16),
    textAlign: 'center',
    margin:scale (10),
    color: COLORS.White,
  },
  txt: {
    color: COLORS.Black,
    textAlign: 'right', 
    alignSelf:'center'
  },
  BtnContainer: {
    backgroundColor: COLORS.blue,
    height: verticalScale(30),
    marginVertical: verticalScale(15),
  },
  BtnTxt: {
    color: COLORS.White,
    textAlign: 'center',
    fontSize: moderateScale(17),
    paddingVertical: verticalScale(5),
  },
});
