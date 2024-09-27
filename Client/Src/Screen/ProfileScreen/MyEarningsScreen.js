import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale} from '../../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import {
  GetReportCanceledAmount,
  GetReportPendingAmount,
  GetReportConfirmedAmount,
} from '../../api/api';

export default function MyEarningsScreen({navigation}) {
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
      amount: `₹${pendingAmount}`,
      icon: <Fontisto name="history" color={'white'} size={15} />,
      iconColor: 'orange',
      labelColor: 'orange',
      amountColor: 'orange',
    },
    {
      id: 2,
      label: 'Confirmed',
      amount: `₹${confirmedAmount}`,
      icon: <AntDesign name="checkcircleo" color={'white'} size={15} />,
      iconColor: 'green',
      labelColor: 'green',
      amountColor: 'green',
    },
    {
      id: 3,
      label: 'Cancelled',
      amount: `₹${canceledAmount}`,
      icon: <AntDesign name="closecircleo" color={'white'} size={15} />,
      iconColor: 'red',
      labelColor: 'red',
      amountColor: 'red',
    },
  ];
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={['#42c5f5', '#42a1f5']}>
        <StatusBar barStyle="light-content" backgroundColor="#42c5f5" />
      </LinearGradient>
      <LinearGradient
        style={{
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          height: scale(100),
        }}
        colors={['#42c5f5', '#42a1f5']}>
        <View>
          <View style={styles.card}>
            <View style={styles.MainContainer}>
              <View style={styles.earningsContainer}>
                <View style={styles.earningsTextContainer}>
                  <Text style={styles.totalEarningsText}>
                    Confirmed Earnings
                  </Text>
                  <TouchableOpacity style={styles.questionIconContainer}>
                    <AntDesign
                      name="questioncircle"
                      size={18}
                      color={COLORS.Black}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.earningsAmount}>₹{confirmedAmount}</Text>
              </View>
              <TouchableOpacity style={styles.walletButton}>
                <FontAwesome5
                  name="wallet"
                  size={22}
                  color={COLORS.green}
                  style={styles.walletIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                Profit will appear here within 72 hours of order{'\n'}
                placed
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.breakupContainer}>
        {breakdownItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.breakdownItem}>
            <View
              style={[styles.iconContainer, {backgroundColor: item.iconColor}]}>
              {item.icon}
            </View>
            <View style={styles.textContainer}>
              <View style={styles.labelAmountContainer}>
                <Text
                  style={[
                    styles.labelText,
                    {color: item.labelColor, fontSize: moderateScale(16)},
                  ]}>
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.amountText,
                    {color: item.amountColor, fontSize: moderateScale(16)},
                  ]}>
                  {item.amount}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingTop: scale(100),
  },
  card: {
    width: '90%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    elevation: 5,
    shadowColor: COLORS.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: scale(20),
    top: scale(25),
  },
  MainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: COLORS.Black,
    paddingBottom: scale(10),
  },
  earningsContainer: {
    flexDirection: 'column',
    marginRight: scale(10),
  },
  earningsTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalEarningsText: {
    color: COLORS.Black,
    fontSize: moderateScale(17),
  },
  questionIconContainer: {
    marginLeft: scale(5),
  },
  earningsAmount: {
    color: COLORS.Black,
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  walletIcon: {
    marginLeft: 'auto',
  },
  descriptionContainer: {
    marginTop: scale(10),
    borderRadius: 5,
  },
  descriptionText: {
    color: COLORS.grey,
  },
  exploreButton: {
    marginTop: scale(5),
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(5),
  },
  exploreText: {
    color: COLORS.green,
    marginRight: scale(5),
    fontSize: moderateScale(15),
  },
  exploreIcon: {
    marginTop: scale(2),
  },
  walletButton: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(100),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakupContainer: {
    marginVertical: scale(10),
    paddingTop: scale(65),
    paddingHorizontal: scale(15),
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(3),
    padding: scale(12),
    borderRadius: scale(10),
    backgroundColor: COLORS.White,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    borderRadius: 5,
    padding: scale(10),
    marginRight: scale(10),
    elevation: 2, // Shadow for icons
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
    fontWeight: 'bold', // Make amount stand out
  },
});
