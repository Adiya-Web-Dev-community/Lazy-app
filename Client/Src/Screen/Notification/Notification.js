import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {Screen} from 'react-native-screens';

export default function Notification({}) {
  return (
    <View style={styles.container}>
      <View style={styles.NOTIFICATION}>
        <Text style={styles.NOTIFICATIONTXT}>Notification</Text>
      </View>
      <View style={styles.MAIN}>
        <View style={styles.MainContainer}>
          <View style={styles.ROWTXT}>
            <Text style={styles.TXT1}>Hi...</Text>
            <Text style={styles.TXT2}>24-Apr-24, 06:27 pm</Text>
          </View>
          <Text style={styles.TXT3}>Ohho it's only a TEST, Relax</Text>
        </View>
        <View style={styles.MainContainer}>
          <View style={styles.ROWTXT}>
            <Text
              style={[styles.TXT1, {fontSize: 16, marginHorizontal: scale(5)}]}>
              Buy now from{'\n'}amazon
            </Text>
            <Text style={styles.TXT2}>24-Apr-24, 06:27 pm</Text>
          </View>
          <Text style={[styles.TXT3, {right: scale(9)}]}>
            Buy now from amazon and get 250{'\n'}cashback use code giveme25
          </Text>
        </View>
        <View style={styles.MainContainer}>
          <View style={styles.ROWTXT}>
            <Text
              style={[
                styles.TXT1,
                {fontSize: moderateScale(16), marginHorizontal: scale(5)},
              ]}>
              Smartphones Under 10000
            </Text>
            <Text style={styles.TXT2}>NA</Text>
          </View>
          <Text
            style={[
              styles.TXT3,
              {right: scale(9), paddingVertical: verticalScale(5)},
            ]}>
            Don't let your budget hold you back. Get{'\n'}amazing smartphones
            for under ₹10,000!
          </Text>
          <Text
            style={[
              styles.TXT3,
              {right: scale(9), paddingVertical: verticalScale(10)},
            ]}>
            Best Smartphones Under 10000
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  NOTIFICATION: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(15),
    margin: scale(12),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
  },
  NOTIFICATIONTXT: {
    color: COLORS.White,
    fontSize: moderateScale(15),
    marginHorizontal: scale(10),
  },
  MAIN: {
    flex: 1,
    backgroundColor: '#A9CCE3',
  },
  MainContainer: {
    backgroundColor: COLORS.White,
    margin: scale(20),
    borderRadius: moderateScale(8),
  },
  ROWTXT: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  TXT1: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  TXT2: {
    paddingVertical: verticalScale(15),
  },
  TXT3: {
    paddingVertical: verticalScale(25),
    marginHorizontal: scale(41),
    fontSize: moderateScale(15),
  },
});
