import React from 'react';
import {StyleSheet, View, Dimensions, Text, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../Theme/Colors';
import {scale, moderateScale, verticalScale} from '../../utils/Scaling';

export default function LazybatWorks() {
  return (
    <ScrollView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.youtube.com/embed/F71MdJK-qTQ'}}
        javaScriptEnabled={true}
      />
      <Text style={styles.text}>Learn more about us through videos.</Text>
      <Text style={styles.title}>Know more through our videos</Text>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>LazyBat Official Video</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Be Gentlement</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Transfrom Yourself</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Skincare Routine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Haircare Routine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Style Yourself</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Foods=Medicine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Brands Products Review</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  webview: {
    height: verticalScale(200),
    width: scale(365),
    marginTop: scale(10),
    alignSelf: 'center',
  },
  text: {
    marginTop: scale(10),
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  Btn: {
    backgroundColor: COLORS.green,
    borderWidth: scale(0.8),
    height: verticalScale(40),
    margin: scale(8),
    borderRadius: moderateScale(8),
  },
  Btntxt: {
    paddingVertical: verticalScale(8),
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  title: {
    fontSize: 23,
    color: COLORS.Black,
    margin: 15,
    borderTopWidth: scale(0.5),
    paddingVertical: verticalScale(8),
  },
});
