import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { moderateScale, scale } from '../../../utils/Scaling';
import { GetReportPendingAmount, GetReportConfirmedAmount, GetReportCanceledAmount } from '../../../api/api';

export default function Reports({ navigation }) {
  const [pendingAmount, setPendingAmount] = useState(0);
  const [confirmedAmount, setConfirmedAmount] = useState(0);
  const [canceledAmount, setCanceledAmount] = useState(0);

  useEffect(() => {
    const fetchAmounts = async () => {
      try {
        const pendingResponse = await GetReportPendingAmount();
        const confirmedResponse = await GetReportConfirmedAmount();
        const canceledResponse = await GetReportCanceledAmount();

        setPendingAmount(pendingResponse.pendingamount || 0);
        setConfirmedAmount(confirmedResponse.totalProfit || 0);
        setCanceledAmount(canceledResponse.cancelAmount || 0);
      } catch (error) {
        console.error('Error fetching amounts:', error);
      }
    };

    fetchAmounts();
  }, []);

  const breakdownItems = [
    {
      id: 1,
      label: 'Pending',
      amount: `$${pendingAmount}`,
      icon: <Fontisto name="history" color={'white'} size={15} />,
      iconColor: 'orange',
      labelColor: 'orange',
      amountColor: 'orange',
    },
    {
      id: 2,
      label: 'Confirmed',
      amount: `$${confirmedAmount}`,
      icon: <AntDesign name="checkcircleo" color={'white'} size={15} />,
      iconColor: 'green',
      labelColor: 'green',
      amountColor: 'green',
    },
    {
      id: 3,
      label: 'Cancelled',
      amount: `$${canceledAmount}`,
      icon: <AntDesign name="closecircleo" color={'white'} size={15} />,
      iconColor: 'red',
      labelColor: 'red',
      amountColor: 'red',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <View style={styles.profitContainer}>
        <Text style={styles.profitTitle}>All Time Total Profit</Text>
        <AntDesign
          name="questioncircleo"
          size={15}
          color={COLORS.Black}
          style={styles.questionIcon}
        />
      </View>
      <Text style={styles.totalProfit}>${confirmedAmount}</Text>

      <View style={styles.breakupContainer}>
        {breakdownItems.map(item => (
          <View key={item.id} style={styles.breakdownItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
              {item.icon}
            </View>
            <View style={styles.textContainer}>
              <View style={styles.labelAmountContainer}>
                <Text style={[styles.labelText, { color: item.labelColor }]}>{item.label}</Text>
                <Text style={[styles.amountText, { color: item.amountColor }]}>{item.amount}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    padding: scale(15),
  },
  profitContainer: {
    marginVertical: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitTitle: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  totalProfit: {
    fontWeight: 'bold',
    fontSize: moderateScale(26),
    color: COLORS.Black,
    marginVertical: scale(10),
  },
  breakupContainer: {
    marginVertical: scale(10),
    borderTopWidth: 1,
    borderTopColor: COLORS.LightGrey,
    paddingTop: scale(10),
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(5),
    padding: scale(10),
    borderRadius: scale(8),
    backgroundColor: COLORS.LightGrey,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  iconContainer: {
    borderRadius: 5,
    padding: scale(5),
    marginRight: scale(10),
  },
  textContainer: {
    flex: 1,
  },
  labelText: {
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  labelAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  amountText: {
    textAlign: 'right',
    color: COLORS.Black,
  },
});
