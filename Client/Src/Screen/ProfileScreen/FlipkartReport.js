import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import Foundation from 'react-native-vector-icons/Foundation';

export default function FlipkartReport({navigation, route}) {
  const [activeItem, setActiveItem] = useState(null);
  const [selectedTime, setSelectedTime] = useState('Last 13 Minutes');

  useEffect(() => {
    if (route.params?.selectedTime) {
      setSelectedTime(route.params.selectedTime);
    }
  }, [route.params?.selectedTime]);

  const Header = ({title}) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            if (activeItem) {
              setActiveItem(null);
            } else {
              navigation.goBack();
            }
          }}
          style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={COLORS.White} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  };

  const items = [
    {
      id: 1,
      title: 'Flipkart Panel Live Order Report',
      icon: <FontAwesome6 name="note-sticky" size={20} color={COLORS.White} />,
    },
    {
      id: 2,
      title: 'Your Best-Selling Product',
      icon: <AntDesign name="staro" size={20} color={COLORS.White} />,
    },
    {
      id: 3,
      title: 'Overall Best-selling Products',
      icon: <AntDesign name="tago" size={20} color={COLORS.White} />,
    },
    {
      id: 4,
      title: 'Your Best-Selling Categories',
      icon: <Foundation name="graph-trend" size={20} color={COLORS.White} />,
    },
    {
      id: 5,
      title: 'Order Status',
      icon: <Foundation name="graph-bar" size={20} color={COLORS.White} />,
    },
  ];

  const handleItemPress = item => {
    setActiveItem(item);
  };

  const renderDetail = item => {
    switch (item.id) {
      case 1:
        return (
          <View>
            <View style={styles.detailHeader}>
              <Text style={styles.detailHeaderText}>
                Your Profit Will be added to{' '}
                <Text style={styles.highlightText}>"My Earnings"</Text>
              </Text>
              <Text style={styles.lastUpdatedText}>
                Data was last uploaded on 24-09-2024 at 03:10 pm
              </Text>
            </View>
            <Text style={styles.timePeriodLabel}>Time Period</Text>
            <TouchableOpacity
              style={styles.timePeriodContainer}
              onPress={() => navigation.navigate('ChooseTime')}>
              <View style={styles.rowContainer}>
                <AntDesign name="calendar" size={20} color={COLORS.Black} />
                <Text style={styles.timeText}>{selectedTime}</Text>
              </View>
              <AntDesign name="right" size={20} style={styles.iconss} />
            </TouchableOpacity>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Commission</Text>
                <Text style={styles.summaryAmount}>$20</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Order</Text>
                <Text style={styles.summaryAmount}>$0</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.rowContainers}>
                <Text style={styles.rowText}>Order Date</Text>
                <Text style={styles.rowText}>Order ID</Text>
                <Text style={styles.rowText}>Product Name</Text>
                <Text style={styles.rowText}>Category</Text>
                <Text style={styles.rowText}>Commant rate</Text>
                <Text style={styles.rowText}>Price Per Unit</Text>
                <Text style={styles.rowText}>Quantity</Text>
              </View>
            </ScrollView>
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                There's nothing to show in the selected time periods
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <View style={styles.detailHeader}>
              <Text
                style={[
                  styles.detailHeaderText,
                  {fontSize: moderateScale(11)},
                ]}>
                Track your best performing products and promote them again
              </Text>
              <Text style={styles.lastUpdatedText}>
                Data was last uploaded on 24-09-2024 at 03:10 pm
              </Text>
            </View>
            <Text style={styles.timePeriodLabel}>Time Period</Text>
            <TouchableOpacity
              style={styles.timePeriodContainer}
              onPress={() => navigation.navigate('ChooseTime')}>
              <View style={styles.rowContainer}>
                <AntDesign name="calendar" size={20} color={COLORS.Black} />
                <Text style={styles.timeText}>{selectedTime}</Text>
              </View>
              <AntDesign name="right" size={20} style={styles.iconss} />
            </TouchableOpacity>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Commission</Text>
                <Text style={styles.summaryAmount}>$20</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Order</Text>
                <Text style={styles.summaryAmount}>$0</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.rowContainers}>
                <Text style={styles.rowText}>Order Date</Text>
                <Text style={styles.rowText}>Order ID</Text>
                <Text style={styles.rowText}>Product Name</Text>
                <Text style={styles.rowText}>Category</Text>
                <Text style={styles.rowText}>Commant rate</Text>
                <Text style={styles.rowText}>Price Per Unit</Text>
                <Text style={styles.rowText}>Quantity</Text>
              </View>
            </ScrollView>
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                There's nothing to show in the selected time periods
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <View style={styles.detailHeader}>
              <Text
                style={[
                  styles.detailHeaderText,
                  {fontSize: moderateScale(11)},
                ]}>
                Track your best performing products and promote them again
              </Text>
              <Text style={styles.lastUpdatedText}>
                Data was last uploaded on 24-09-2024 at 03:10 pm
              </Text>
            </View>
            <Text style={styles.timePeriodLabel}>Time Period</Text>
            <TouchableOpacity
              style={styles.timePeriodContainer}
              onPress={() => navigation.navigate('ChooseTime')}>
              <View style={styles.rowContainer}>
                <AntDesign name="calendar" size={20} color={COLORS.Black} />
                <Text style={styles.timeText}>{selectedTime}</Text>
              </View>
              <AntDesign name="right" size={20} style={styles.iconss} />
            </TouchableOpacity>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Commission</Text>
                <Text style={styles.summaryAmount}>$20</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Order</Text>
                <Text style={styles.summaryAmount}>$0</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.rowContainers}>
                <Text style={styles.rowText}>Order Date</Text>
                <Text style={styles.rowText}>Order ID</Text>
                <Text style={styles.rowText}>Product Name</Text>
                <Text style={styles.rowText}>Category</Text>
                <Text style={styles.rowText}>Commant rate</Text>
                <Text style={styles.rowText}>Price Per Unit</Text>
                <Text style={styles.rowText}>Quantity</Text>
              </View>
            </ScrollView>
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                There's nothing to show in the selected time periods
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View>
            <View style={styles.detailHeader}>
              <Text
                style={[
                  styles.detailHeaderText,
                  {fontSize: moderateScale(11)},
                ]}>
                Track your best performing products and promote them again
              </Text>
              <Text style={styles.lastUpdatedText}>
                Data was last uploaded on 24-09-2024 at 03:10 pm
              </Text>
            </View>
            <Text style={styles.timePeriodLabel}>Time Period</Text>
            <TouchableOpacity
              style={styles.timePeriodContainer}
              onPress={() => navigation.navigate('ChooseTime')}>
              <View style={styles.rowContainer}>
                <AntDesign name="calendar" size={20} color={COLORS.Black} />
                <Text style={styles.timeText}>{selectedTime}</Text>
              </View>
              <AntDesign name="right" size={20} style={styles.iconss} />
            </TouchableOpacity>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Commission</Text>
                <Text style={styles.summaryAmount}>$20</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Total Order</Text>
                <Text style={styles.summaryAmount}>$0</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.rowContainers}>
                <Text style={styles.rowText}>Order Date</Text>
                <Text style={styles.rowText}>Order ID</Text>
                <Text style={styles.rowText}>Product Name</Text>
                <Text style={styles.rowText}>Category</Text>
                <Text style={styles.rowText}>Commant rate</Text>
                <Text style={styles.rowText}>Price Per Unit</Text>
                <Text style={styles.rowText}>Quantity</Text>
              </View>
            </ScrollView>
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>
                There's nothing to show in the selected time periods
              </Text>
            </View>
          </View>
        );
      case 5:
        return (
          <View>
            <View style={styles.detailHeader}>
              <Text
                style={[
                  styles.detailHeaderText,
                  {fontSize: moderateScale(11)},
                ]}>
                Track your best performing products and promote them again
              </Text>
              <Text style={styles.lastUpdatedText}>
                Data was last uploaded on 24-09-2024 at 03:10 pm
              </Text>
            </View>
            <Text style={styles.timePeriodLabel}>Time Period</Text>
            <TouchableOpacity
              style={styles.timePeriodContainer}
              onPress={() => navigation.navigate('ChooseTime')}>
              <View style={styles.rowContainer}>
                <AntDesign name="calendar" size={20} color={COLORS.Black} />
                <Text style={styles.timeText}>{selectedTime}</Text>
              </View>
              <AntDesign name="right" size={20} style={styles.iconss} />
            </TouchableOpacity>
            <View style={styles.totalContainer}>
              <View style={styles.totalCard}>
                <Text style={styles.Commition_Txt}>Total Commission</Text>
                <Text
                  style={[styles.Commition_Txt, {fontSize: moderateScale(25)}]}>
                  $0
                </Text>
                <View style={styles.pendingOrdersContainer}>
                  <Ionicons
                    name="time-outline"
                    size={30}
                    color={COLORS.White}
                    style={[styles.icons, {backgroundColor: 'orange'}]}
                  />
                  <View>
                    <Text style={styles.Custom_txt}>Pending Orders</Text>
                    <View style={styles.orderCommissionContainer}>
                      <Text style={{color: COLORS.Black}}>Orders: 0</Text>
                      <View style={styles.divider} />
                      <Text style={{color: COLORS.Black}}>Commission: 0</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.pendingOrdersContainer}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={30}
                    color={COLORS.White}
                    style={[styles.icons, {backgroundColor: 'green'}]}
                  />
                  <View>
                    <Text style={styles.Custom_txt}>Delivered Orders</Text>
                    <View style={styles.orderCommissionContainer}>
                      <Text style={{color: COLORS.Black}}>Orders: 0</Text>
                      <View style={styles.divider} />
                      <Text style={{color: COLORS.Black}}>Commission: 0</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.pendingOrdersContainer}>
                  <AntDesign
                    name="closecircleo"
                    size={30}
                    color={COLORS.White}
                    style={[styles.icons, {backgroundColor: 'red'}]}
                  />
                  <View>
                    <Text style={styles.Custom_txt}>Cancelled Orders</Text>
                    <View style={styles.orderCommissionContainer}>
                      <Text style={{color: COLORS.Black}}>Orders: 0</Text>
                      <View style={styles.divider} />
                      <Text style={{color: COLORS.Black}}>Commission: 0</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeItem) {
      return (
        <View style={styles.detailContainer}>{renderDetail(activeItem)}</View>
      );
    }

    return items.map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.itemContainer}
        onPress={() => handleItemPress(item)}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.text}>{item.title}</Text>
        <AntDesign name="right" size={20} style={styles.icon} />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} />
      <Header
        title={activeItem ? activeItem.title : 'Flipkart Report & Insights'}
      />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    marginTop: scale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: COLORS.blue,
    elevation: 5,
  },

  backButton: {
    marginRight: scale(10),
    padding: scale(5),
    borderRadius: moderateScale(25),
  },
  headerTitle: {
    flex: 1,
    fontSize: moderateScale(18),
    color: COLORS.White,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LightGrey,
    borderRadius: moderateScale(10),
    padding: scale(8),
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  text: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: moderateScale(14),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: scale(10),
    color: COLORS.blue,
  },
  iconContainer: {
    width: scale(33),
    height: scale(33),
    borderRadius: moderateScale(18),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {},
  detailHeader: {
    marginHorizontal: scale(15),
    marginVertical: verticalScale(15),
  },
  detailHeaderText: {
    fontSize: moderateScale(12),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  highlightText: {
    color: COLORS.green,
  },
  lastUpdatedText: {
    fontStyle: 'italic',
    fontSize: moderateScale(12),
  },
  timePeriodLabel: {
    marginHorizontal: scale(15),
    color: COLORS.Black,
  },
  timePeriodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LightGrey,
    borderRadius: moderateScale(5),
    padding: scale(8),
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  timeText: {
    marginLeft: scale(10),
    fontSize: moderateScale(14),
    color: COLORS.Black,
  },
  iconss: {
    marginLeft: scale(10),
    color: COLORS.Black,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(15),
  },
  summaryCard: {
    backgroundColor: COLORS.White,
    elevation: 5,
    borderRadius: moderateScale(10),
    padding: scale(15),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: scale(5),
  },
  summaryTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  summaryAmount: {
    fontSize: moderateScale(18),
    color: COLORS.green,
    marginTop: verticalScale(5),
  },
  rowContainers: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingBottom: verticalScale(15),
  },
  rowText: {
    marginHorizontal: scale(10),
    color: COLORS.Black,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  noDataContainer: {
    marginTop: scale(150),
  },
  noDataText: {
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  totalContainer: {
    margin: scale(15),
  },
  totalCard: {
    backgroundColor: COLORS.White,
    elevation: 5,
    borderRadius: moderateScale(10),
    padding: scale(15),
    marginVertical: verticalScale(10),
  },
  pendingOrdersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    padding: scale(10),
    backgroundColor: COLORS.LightGrey,
    borderRadius: moderateScale(10),
  },
  icons: {
    backgroundColor: COLORS.LightGrey,
    borderRadius: moderateScale(30),
    padding: scale(4),
    marginRight: scale(10),
    height: scale(35),
    width: scale(35),
    alignItems: 'center',
  },
  orderCommissionContainer: {
    flexDirection: 'row',
    marginVertical: verticalScale(5),
  },
  divider: {
    width: 1,
    height: scale(20),
    backgroundColor: COLORS.grey,
    marginHorizontal: scale(10),
  },
  Commition_Txt: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  Custom_txt: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  TITILES: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    textAlign: 'center',
    marginTop: scale(20),
  },
});
