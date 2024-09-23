import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {moderateScale, verticalScale} from '../../../utils/Scaling';

export default function PaymentHistory({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <View style={styles.contentContainer}>
        <FontAwesome5 name="clipboard-list" color={COLORS.green} size={85} />
        <Text style={styles.text}>
          Hey, you have not requested any{'\n'}payment yet.
        </Text>
        <Text style={styles.subText}>
          More transactions, more Profit,{'\n'}more withdrawals!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MakeLinkNow')}>
        <Text style={styles.buttonText}>Make Link Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  text: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    marginVertical: verticalScale(15),
  },
  subText: {
    color: COLORS.Black,
    textAlign: 'center',
    fontSize: moderateScale(15),
    marginVertical: verticalScale(0),
  },
  button: {
    backgroundColor: COLORS.green, // Set your desired background color here
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: 5,
    marginTop: verticalScale(20),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});
