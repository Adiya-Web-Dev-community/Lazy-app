import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {OrderHistory} from '../../../utils/OrderData';

export default function AllOrderDetails({navigation}) {
  const AllOrderHistorys = OrderHistory.ORDERHISTORY;

  const handleOrderPress = item => {
    navigation.navigate('OrderDescription', {order: item});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterContainer}>
        <FontAwesome name="filter" size={22} color={COLORS.Black} />
        <Text style={styles.filterText}>FILTERS</Text>
      </TouchableOpacity>
      <FlatList
        data={AllOrderHistorys}
        keyExtractor={(item, index) => `${item.OrderID}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => handleOrderPress(item)}>
            <View style={styles.row}>
              <Image source={item.Img} style={styles.image} />
              <Text style={styles.profitText}>Profit</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.orderIdLabel}>Order ID</Text>
              <Text style={styles.priceText}>{item.Price}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.orderIdText}>{item.OrderID}</Text>
              <Text style={styles.statusText(item.Status)}>{item.Status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: scale(10),
    borderRadius: moderateScale(8),
    marginHorizontal: scale(10),
    marginVertical: verticalScale(10),
  },
  filterText: {
    marginLeft: scale(8),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: COLORS.White,
    marginHorizontal: scale(15),
    marginVertical: verticalScale(5),
    borderRadius: moderateScale(8),
    padding: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  image: {
    height: scale(40),
    width: scale(70),
    borderRadius: moderateScale(5),
  },
  profitText: {
    fontSize: moderateScale(18),
    color: COLORS.grey,
  },
  orderIdLabel: {
    fontSize: moderateScale(17),
    color: COLORS.Gray,
  },
  priceText: {
    fontSize: moderateScale(20),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  orderIdText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  statusText: status => {
    let backgroundColor;

    switch (status) {
      case 'Completed':
        backgroundColor = COLORS.green;
        break;
      case 'Pending':
        backgroundColor = 'orange';
        break;
      case 'Cancelled':
        backgroundColor = COLORS.red;
        break;
      default:
        backgroundColor = COLORS.grey;
    }

    return {
      backgroundColor: backgroundColor,
      color: COLORS.White,
      paddingVertical: scale(5),
      paddingHorizontal: scale(10),
      borderRadius: moderateScale(5),
    };
  },
});
