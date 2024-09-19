import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Order Amount</Text>
        <Text style={styles.amountValue}>$25.25</Text>
      </View>
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionLabel}>Transaction Date</Text>
        <Text style={styles.transactionValue}>03 June 2024</Text>
      </View>
      <View style={styles.cancellationContainer}>
        <View style={styles.cancellationHeader}>
          <FontAwesome name="pencil" size={22} color={COLORS.red} />
          <Text style={styles.cancellationTitle}>NOTEKARO</Text>
        </View>
        <Text style={styles.cancellationReason}>Reason for Cancellation:</Text>
        <Text style={styles.cancellationText}>
          Order is not attributed to EarnKaro. Directly placed, {'\n'}
          clicked on ad Ad or used another cashback/{'\n'}
          coupon site.
        </Text>
        <Text style={styles.SECONDTXT}>
          If you have a query, please click below.
        </Text>
        <TouchableOpacity style={styles.queryButton}>
          <Text style={styles.queryButtonText}>RAISE QUERY</Text>
        </TouchableOpacity>
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
  amountContainer: {
    marginVertical: verticalScale(15),
    marginHorizontal: scale(20),
  },
  amountLabel: {
    color: COLORS.grey,
    fontSize: moderateScale(16),
  },
  amountValue: {
    color: COLORS.Black,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  transactionContainer: {
    marginHorizontal: scale(20),
  },
  transactionLabel: {
    color: COLORS.grey,
    fontSize: moderateScale(16),
  },
  transactionValue: {
    color: COLORS.Black,
    fontSize: moderateScale(16),
  },
  cancellationContainer: {
    borderWidth: 0.5,
    padding: scale(10),
    margin: scale(20),
    borderRadius: moderateScale(5),
  },
  cancellationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    paddingBottom: verticalScale(5),
  },
  cancellationTitle: {
    fontWeight: 'bold',
    color: COLORS.Black,
    marginLeft: scale(5),
  },
  cancellationReason: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.Black,
    marginTop: verticalScale(10),
  },
  cancellationText: {
    marginTop: verticalScale(5),
    color: COLORS.Black,
  },
  queryButton: {
    backgroundColor: COLORS.blue,
    padding: scale(10),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(15),
    alignSelf: 'flex-start',
  },
  queryButtonText: {
    color: COLORS.White,
    fontWeight: 'bold',
  },
  SECONDTXT: {
    marginTop: scale(5),
    color: COLORS.Black,
  },
});
