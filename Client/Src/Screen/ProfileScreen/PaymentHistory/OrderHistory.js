import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../Theme/Colors';
import { moderateScale, scale } from '../../../utils/Scaling';
import { GetClaimUser } from '../../../api/api';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await GetClaimUser();
        console.log('claim get data', data);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const counts = orders.reduce((acc, order) => {
    // Normalize status to "Approved" when it's "confirm"
    const status = order.status === 'confirm' ? 'Confirm' : 
                   order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase();
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusData = [
    {
      label: 'Pending',
      color: 'orange',
      icon: 'hourglass-half',
      count: counts.Pending || 0,
    },
    {
      label: 'Approved',
      color: 'green',
      icon: 'check-circle',
      count: counts.Confirm || 0, // Use the normalized status for counting
    },
    {
      label: 'Cancelled',
      color: 'red',
      icon: 'times-circle',
      count: counts.Cancelled || 0,
    },
  ];

  const getStatusIcon = status => {
    switch (status) {
      case 'Confirm':
        return 'check-circle';
      case 'Cancelled':
        return 'times-circle';
      case 'Pending':
      default:
        return 'hourglass-half';
    }
  };

  const getStatusStyle = status => {
    switch (status) {
      case 'Confirm':
        return styles.approvedStatus;
      case 'Cancelled':
        return styles.cancelledStatus;
      case 'Pending':
      default:
        return styles.pendingStatus;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.orderText}>{item.name}</Text>
          <Text style={styles.productText}>{item.productname}</Text>
        </View>
        <View style={[styles.statusWrapper, getStatusStyle(item.status === 'confirm' ? 'Confirm' : item.status)]}>
          <Icon
            name={getStatusIcon(item.status === 'confirm' ? 'Confirm' : item.status)}
            size={16}
            color={COLORS.White}
          />
          <Text style={styles.statusText}>
            {item.status === 'confirm' ? 'Approved' : item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Orders</Text>
        <View style={styles.countsContainer}>
          {statusData.map(status => (
            <TouchableOpacity key={status.label} style={styles.statusRow}>
              <Icon name={status.icon} size={20} color={status.color} />
              <Text
                style={[styles.countText, { color: status.color, marginLeft: scale(5) }]} >
                {status.label}:
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  color: status.color,
                  fontSize: moderateScale(15),
                  fontWeight: 'bold',
                  marginRight: scale(5),
                }}>
                {status.count}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  header: {
    backgroundColor: COLORS.LightGrey,
    padding: scale(16),
  },
  headerText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  countsContainer: {
    marginVertical: scale(10),
    padding: scale(10),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(8),
    elevation: 2,
  },
  countText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
  },
  listContainer: {
    padding: scale(16),
  },
  orderCard: {
    backgroundColor: COLORS.White,
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: scale(15),
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderText: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  productText: {
    fontSize: moderateScale(14),
    color: COLORS.grey,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    borderRadius: moderateScale(5),
    width: scale(85),
  },
  statusText: {
    fontWeight: 'bold',
    color: COLORS.White,
    marginLeft: scale(5),
  },
  approvedStatus: {
    backgroundColor: 'green',
  },
  cancelledStatus: {
    backgroundColor: 'red',
  },
  pendingStatus: {
    backgroundColor: 'orange',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(5),
  },
});
