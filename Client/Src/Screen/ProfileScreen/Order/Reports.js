import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {moderateScale, scale} from '../../../utils/Scaling';

export default function Reports({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  const breakdownItems = [
    {
      id: 1,
      label: 'Pending',
      amount: '$80.3',
      icon: <Fontisto name="history" color={'white'} size={15} />,
      iconColor: 'orange',
      labelColor: 'orange',
      amountColor: 'orange',
    },
    {
      id: 2,
      label: 'Confirmed',
      amount: '$0',
      icon: <AntDesign name="checkcircleo" color={'white'} size={15} />,
      iconColor: 'green',
      labelColor: 'green',
      amountColor: 'green',
    },
    {
      id: 3,
      label: 'Cancelled',
      amount: '$0',
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
      <Text style={styles.totalProfit}>$20.00</Text>

      <View style={styles.breakupContainer}>
        {breakdownItems.map(item => (
          <View key={item.id} style={styles.breakdownItem}>
            <View
              style={[styles.iconContainer, {backgroundColor: item.iconColor}]}>
              {item.icon}
            </View>
            <View style={styles.textContainer}>
              <View style={styles.labelAmountContainer}>
                <Text style={[styles.labelText, {color: item.labelColor}]}>
                  {item.label}
                </Text>
                <Text style={[styles.amountText, {color: item.amountColor}]}>
                  {item.amount}
                </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(25),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: scale(10),
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    color: COLORS.Black,
  },
  seeAll: {
    color: COLORS.green,
    fontWeight: 'bold',
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
    elevation: 2, // Shadow effect on Android
    shadowColor: '#000', // Shadow effect on iOS
    shadowOffset: {width: 0, height: 2},
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
  whatIsThisText: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: COLORS.green,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
