import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { scale, moderateScale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyEarningsScreen = ({ navigation }) => {
  const [earnings, setEarnings] = useState({
    pending: 1500,
    confirmed: 5000,
    transactions: [
      { id: '1', amount: 500, type: 'Pending' },
      { id: '2', amount: 1000, type: 'Confirmed' },
      { id: '3', amount: 1500, type: 'Pending' },
    ],
  });

  const handleViewTransactionDetails = (transaction) => {
    Alert.alert(
      'Transaction Details',
      `ID: ${transaction.id}\nAmount: $${transaction.amount}\nType: ${transaction.type}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.earningsContainer}>
        <Image
          source={{
            uri: 'https://www.loomsolar.com/cdn/shop/articles/21.jpg?v=1614706929',
          }}
          style={styles.bannerImage}
        />
        <View style={styles.earningsBreakdown}>
          <View style={styles.earningsItem}>
            <Text style={styles.earningsAmount}>${earnings.pending}</Text>
            <Text style={styles.earningsType}>Pending</Text>
          </View>
          <View style={styles.earningsItem}>
            <Text style={styles.earningsAmount}>${earnings.confirmed}</Text>
            <Text style={styles.earningsType}>Confirmed</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Total Earnings:</Text>
            <Text style={styles.statsValue}>${earnings.pending + earnings.confirmed}</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsLabel}>Number of Transactions:</Text>
            <Text style={styles.statsValue}>{earnings.transactions.length}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transaction History</Text>
        {earnings.transactions.map(transaction => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionItem}
            onPress={() => handleViewTransactionDetails(transaction)}>
            <Text style={styles.transactionAmount}>${transaction.amount}</Text>
            <Text style={styles.transactionType}>{transaction.type}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ReferAndEarn')}>
            <MaterialIcons name="share" size={20} color={COLORS.White} />
            <Text style={styles.buttonText}>Refer and Earn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Reports')}>
            <AntDesign name="filetext1" size={20} color={COLORS.White} />
            <Text style={styles.buttonText}>View Reports</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.additionalContent}>
          <Text style={styles.additionalTitle}>More Information</Text>
          <Image
            source={{
              uri: 'https://www.shutterstock.com/image-vector/people-characters-standing-near-gold-260nw-1532703638.jpg',
            }}
            style={styles.additionalImage}
          />
          <Text style={styles.additionalText}>
            Here you can find more details about your earnings and transactions.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.White,
  },
  earningsContainer: {
    backgroundColor: COLORS.LightGrey,
    padding: scale(15),
    borderRadius: moderateScale(10),
    marginBottom: scale(15),
  },
  bannerImage: {
    width: '100%',
    height: moderateScale(150),
    borderRadius: moderateScale(8),
    marginBottom: scale(15),
  },
  earningsBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earningsItem: {
    backgroundColor: COLORS.White,
    padding: scale(10),
    borderRadius: moderateScale(8),
    elevation: 3,
    width: '48%',
  },
  earningsAmount: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  earningsType: {
    fontSize: moderateScale(16),
    color: COLORS.grey,
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.Black,
    marginVertical: scale(10),
  },
  statsContainer: {
    backgroundColor: COLORS.White,
    padding: scale(10),
    borderRadius: moderateScale(8),
    elevation: 3,
    marginVertical: scale(10),
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LightGrey,
  },
  statsLabel: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
  },
  statsValue: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  transactionItem: {
    backgroundColor: COLORS.White,
    padding: scale(10),
    borderRadius: moderateScale(8),
    elevation: 3,
    marginBottom: scale(10),
  },
  transactionAmount: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  transactionType: {
    fontSize: moderateScale(16),
    color: COLORS.grey,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(20),
  },
  button: {
    backgroundColor: COLORS.blue,
    padding: scale(10),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(16),
    marginLeft: scale(5),
  },
  additionalContent: {
    marginTop: scale(20),
    padding: scale(10),
    backgroundColor: COLORS.LightGrey,
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  additionalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.Black,
    marginBottom: scale(10),
  },
  additionalImage: {
    width: '100%',
    height: moderateScale(150),
    borderRadius: moderateScale(8),
    marginBottom: scale(10),
  },
  additionalText: {
    fontSize: moderateScale(16),
    color: COLORS.grey,
    textAlign: 'center',
  },
});

export default MyEarningsScreen;
