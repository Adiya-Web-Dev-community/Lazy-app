import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';

export default function OrderDescription({route}) {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <Image source={order.Img} style={styles.orderImage} />
        <View style={styles.orderRow}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{order.Status}</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.value}>{order.OrderID}</Text>
          <Text style={styles.value}>{order.Price}</Text>
        </View>
        <View style={styles.orderRow}>
          <Text style={styles.value}>100</Text>
          <Text style={styles.label}>What's This</Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: verticalScale(15),
          marginHorizontal: scale(20),
        }}>
        <Text style={{color: COLORS.grey, fontSize: moderateScale(16)}}>
          Order Amount
        </Text>
        <Text
          style={{
            color: COLORS.Black,
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          }}>
          $25.25
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: scale(20),
        }}>
        <Text style={{color: COLORS.grey, fontSize: moderateScale(16)}}>
          Transaction Date
        </Text>
        <Text style={{color: COLORS.Black, fontSize: moderateScale(16)}}>
          03 June 2024
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  orderContainer: {
    backgroundColor: 'orange',
    padding: scale(15),
  },
  orderImage: {
    height: scale(30),
    width: scale(80),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(7),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(3),
  },
  label: {
    color: COLORS.White,
    fontSize: moderateScale(18),
  },
  value: {
    color: COLORS.White,
    fontSize: moderateScale(18),
  },
});
