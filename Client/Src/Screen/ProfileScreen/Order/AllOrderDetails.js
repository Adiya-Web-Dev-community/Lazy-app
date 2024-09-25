import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import {OrderHistory} from '../../../utils/OrderData';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomCheckBox from '../../../Components/CustomCheckBox/CustomCheckBox ';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AllOrderDetails({navigation}) {
  const AllOrderHistorys = OrderHistory.ORDERHISTORY;
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Status');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [tillDate, setTillDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState('Select Date');
  const [displayTillDate, setDisplayTillDate] = useState('Select Date');

  const onDateChange = (event, selectedDate, isFrom) => {
    const currentDate = selectedDate || (isFrom ? startDate : tillDate);
    setShowDatePicker(false);

    if (isFrom) {
      setStartDate(currentDate);
      setDisplayDate(currentDate.toLocaleDateString());
    } else {
      setTillDate(currentDate);
      setDisplayTillDate(currentDate.toLocaleDateString());
    }
  };

  const [selectedStatus, setSelectedStatus] = useState({
    completed: false,
    pending: false,
    cancelled: false,
    thisMonth: false,
    lastMonth: false,
    last3Months: false,
    last6Months: false,
  });

  const handleOrderPress = item => {
    navigation.navigate('OrderDescription', {order: item});
  };

  const openModal = () => {
    setActiveFilter('status');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterContainer} onPress={openModal}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>FILTER BY</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.clearText}>CLEAR ALL</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filterRow}>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeFilter === 'status' && styles.activeButton,
                  ]}
                  onPress={() => setActiveFilter('status')}>
                  <Text
                    style={{
                      color:
                        activeFilter === 'status' ? COLORS.White : COLORS.Black,
                    }}>
                    Status
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    activeFilter === 'dates' && styles.activeButton,
                  ]}
                  onPress={() => setActiveFilter('dates')}>
                  <Text
                    style={{
                      color:
                        activeFilter === 'dates' ? COLORS.White : COLORS.Black,
                    }}>
                    Dates
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.filterContent}>
                {activeFilter === 'status' && (
                  <View>
                    <Text
                      style={{
                        marginLeft: scale(8),
                        fontSize: moderateScale(15),
                      }}>
                      Show only
                    </Text>
                    <CustomCheckBox
                      label="Pending"
                      value={selectedStatus.pending}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          pending: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Confirmed"
                      value={selectedStatus.confirmed}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          confirmed: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Paid"
                      value={selectedStatus.paid}
                      onValueChange={newValue =>
                        setSelectedStatus({...selectedStatus, paid: newValue})
                      }
                    />
                    <CustomCheckBox
                      label="Requested"
                      value={selectedStatus.requested}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          requested: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Cancelled"
                      value={selectedStatus.cancelled}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          cancelled: newValue,
                        })
                      }
                    />
                  </View>
                )}
                {activeFilter === 'dates' && (
                  <View>
                    <Text
                      style={{
                        marginLeft: scale(8),
                        fontSize: moderateScale(15),
                      }}>
                      Select transactions of
                    </Text>
                    <CustomCheckBox
                      label="This Month"
                      value={selectedStatus.thisMonth}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          thisMonth: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Last Month"
                      value={selectedStatus.lastMonth}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          lastMonth: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Last 3 months"
                      value={selectedStatus.last3Months}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          last3Months: newValue,
                        })
                      }
                    />
                    <CustomCheckBox
                      label="Last 6 months"
                      value={selectedStatus.last6Months}
                      onValueChange={newValue =>
                        setSelectedStatus({
                          ...selectedStatus,
                          last6Months: newValue,
                        })
                      }
                    />
                    <View style={styles.dateRangeContainer}>
                      <Text>Select date range</Text>
                      <Text style={{marginTop: scale(10)}}>From</Text>
                      <TouchableOpacity
                        style={styles.dateSelector}
                        onPress={() => setShowDatePicker(true)}>
                        <Fontisto name="date" size={15} />
                        <Text style={{marginLeft: scale(10)}}>
                          {displayDate}
                        </Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={startDate}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) =>
                            onDateChange(event, selectedDate, true)
                          }
                        />
                      )}
                      <Text style={{marginTop: scale(10)}}>Till</Text>
                      <TouchableOpacity
                        style={styles.dateSelector}
                        onPress={() => setShowDatePicker(true)}>
                        <Fontisto name="date" size={15} />
                        <Text style={{marginLeft: scale(10)}}>
                          {displayTillDate}
                        </Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <DateTimePicker
                          value={tillDate}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) =>
                            onDateChange(event, selectedDate, false)
                          }
                        />
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={[styles.buttonText, {color: COLORS.White}]}>
                  Apply
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.blue,
  },
  modalContent: {
    backgroundColor: COLORS.White,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(15),
  },
  headerText: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  clearText: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    marginHorizontal: scale(10),
    alignItems: 'flex-start',
  },
  filterOptions: {
    flexDirection: 'column',
    marginRight: scale(20),
  },
  filterButton: {
    backgroundColor: '#e5e7e9',
    paddingVertical: scale(15),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
    marginVertical: verticalScale(5),
  },
  activeButton: {
    backgroundColor: COLORS.green,
  },
  filterContent: {
    marginTop: verticalScale(5),
  },
  dateRangeContainer: {
    borderTopWidth: 0.5,
    marginTop: scale(15),
    paddingVertical: verticalScale(10),
  },
  dateSelector: {
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    paddingVertical: verticalScale(4),
    borderRadius: 2,
    paddingHorizontal: scale(10),
    width: scale(200),
    marginVertical: verticalScale(5),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(380),
    marginHorizontal: scale(20),
  },
  applyButton: {
    flex: 1,
    backgroundColor: COLORS.green,
    paddingVertical: scale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    marginRight: scale(10),
  },
  closeButton: {
    flex: 1,
    backgroundColor: COLORS.LightGrey,
    paddingVertical: scale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
});
