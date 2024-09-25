import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale} from '../../../utils/Scaling';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Reports({navigation}) {
  const [showBreakup, setShowBreakup] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleBreakup = () => {
    setShowBreakup(prev => !prev);
  };

  const breakdownItems = [
    {
      id: 1,
      label: 'Pending',
      amount: '$80.3',
      icon: <Fontisto name="history" color={'white'} size={15} />,
      iconColor: 'orange',
      textColor: 'orange',
    },
    {
      id: 2,
      label: 'Confirmed',
      amount: '$0',
      icon: <AntDesign name="checkcircleo" color={'white'} size={15} />,
      iconColor: 'green',
      textColor: 'green',
    },
    {
      id: 3,
      label: 'Requested',
      amount: '$0',
      icon: (
        <MaterialCommunityIcons
          name="logout-variant"
          color={'white'}
          size={15}
        />
      ),
      iconColor: 'purple',
      textColor: 'purple',
    },
  ];

  const fouritems = [
    {
      id: 1,
      title: 'Clicks',
      count: '0',
      backgroundColor: '#fadbd8',
    },
    {
      id: 2,
      title: 'Txns',
      count: '0',
      backgroundColor: '#e8f8f5',
    },
    {
      id: 3,
      title: 'Profit',
      count: '0',
      backgroundColor: '#d6eaf8',
    },
    {
      id: 4,
      title: 'Conv. Rate',
      count: '0%',
      backgroundColor: '#e8daef',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity>
            <AntDesign name="arrowleft" size={25} color={COLORS.Black} />
          </TouchableOpacity>
          <Text style={styles.title}>Reports</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.seeAll}>See all reports</Text>
        </TouchableOpacity>
      </View>
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
      <View>
        <TouchableOpacity onPress={toggleBreakup} style={styles.breakupToggle}>
          <Text style={styles.breakupText}>
            {showBreakup ? 'Hide breakup' : 'View breakup'}
          </Text>
          <AntDesign
            name={showBreakup ? 'up' : 'down'}
            size={18}
            color={COLORS.green}
            style={styles.breakupIcon}
          />
        </TouchableOpacity>
        {showBreakup && (
          <View style={styles.breakupContainer}>
            {breakdownItems.map(item => (
              <View key={item.id} style={styles.breakdownItem}>
                <View
                  style={[
                    styles.iconContainer,
                    {backgroundColor: item.iconColor},
                  ]}>
                  {item.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.pendingText, {color: item.textColor}]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.amountText, {color: item.textColor}]}>
                    {item.amount}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity>
              <Text style={styles.whatIsThisText}>What's this?</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.performanceOverview}>
        <View style={styles.iconContainers}>
          <FontAwesome
            name="rupee"
            size={20}
            color={COLORS.White}
            style={{textAlign: 'center', marginTop: scale(2)}}
          />
        </View>
        <View style={styles.performanceTextContainer}>
          <Text style={styles.performanceTitle}>
            Performance Breakdown Overview
          </Text>
          <Text style={styles.performanceDate}>
            Data was last uploaded on 20-09-2024 at 10:50 am
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.filterContainer}
        onPress={() => navigation.navigate('FilterScreen')}>
        <AntDesign name="filter" size={20} color={COLORS.Black} />
        <Text style={styles.filterText}>Filter by</Text>
      </TouchableOpacity>

      <View style={styles.boxContainer}>
        {fouritems.map(item => (
          <View
            key={item.id}
            style={[styles.box, {backgroundColor: item.backgroundColor}]}>
            <Text style={styles.boxTitle}>{item.title}</Text>
            <Text style={styles.boxCount}>{item.count}</Text>
          </View>
        ))}
      </View>
      <View style={styles.warningContainer}>
        <AntDesign name="warning" color={COLORS.red} size={20} />
        <Text style={styles.warningText}>
          Hey, you did not get any clicks on your Profile links.{'\n'}
          choose a different date range.
        </Text>
      </View>

      <View
        style={[styles.performanceOverview, {backgroundColor: COLORS.White}]}>
        <View style={styles.iconContainers}>
          <Ionicons
            name="analytics-outline"
            size={20}
            color={COLORS.White}
            style={{textAlign: 'center', marginTop: scale(2)}}
          />
        </View>
        <View style={styles.performanceTextContainer}>
          <Text style={styles.performanceTitle}>Performance by All Brands</Text>
          <Text style={styles.performanceDate}>
            Data was last uploaded on 20-09-2024 at 10:50 am
          </Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <AntDesign name="filter" size={20} color={COLORS.Black} />
        <Text style={styles.filterText}>Filter by</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reports</Text>
            <View style={styles.modalItemContainer}>
              <View style={styles.modalIconContainer}>
                <AntDesign name="link" size={20} color={COLORS.White} />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalLinkTitle}>My Link Performance</Text>
                <Text style={styles.modalLinkDescription}>
                  Track your link level data easily
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="right" size={20} color={COLORS.Black} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalItemContainer}>
              <View style={styles.modalIconContainer}>
                <AntDesign name="link" size={20} color={COLORS.White} />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalLinkTitle}>
                  Performance by All Brands
                </Text>
                <Text style={styles.modalLinkDescription}>
                  Track your brand level performance easily
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="right" size={20} color={COLORS.Black} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalItemContainer}>
              <View style={styles.modalIconContainer}>
                <AntDesign name="link" size={20} color={COLORS.White} />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalLinkTitle}>
                  Flipkart Reports & insights
                </Text>
                <Text style={styles.modalLinkDescription}>
                  Track your real-time activity and insights
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="right" size={20} color={COLORS.Black} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalItemContainer}>
              <View style={styles.modalIconContainer}>
                <AntDesign name="link" size={20} color={COLORS.White} />
              </View>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalLinkTitle}>Leaderboard</Text>
                <Text style={styles.modalLinkDescription}>
                  Cheack out the top earners here
                </Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="right" size={20} color={COLORS.Black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(10),
    borderBottomWidth: 0.5,
    marginTop: scale(30),
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: scale(10),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  seeAll: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  profitContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(15),
    marginTop: scale(30),
  },
  profitTitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
  },
  questionIcon: {
    marginLeft: scale(5),
    alignSelf: 'center',
  },
  totalProfit: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(26),
    marginHorizontal: scale(15),
    marginTop: scale(5),
  },
  breakupToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  breakupText: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.green,
  },
  breakupIcon: {
    marginTop: scale(5),
  },
  breakupContainer: {
    marginTop: scale(3),
    marginHorizontal: scale(15),
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(5),
  },
  iconContainer: {
    borderRadius: 5,
    padding: scale(5),
    marginRight: scale(10),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  whatIsThisText: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    color: COLORS.green,
    fontSize: moderateScale(15),
  },
  amountText: {
    textAlign: 'right',
  },
  performanceOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(20),
    padding: scale(10),
    backgroundColor: COLORS.LightGrey,
    borderRadius: scale(8),
    borderBottomWidth: 0.5,
  },
  iconContainers: {
    backgroundColor: COLORS.green,
    borderRadius: scale(20),
    padding: scale(5),
    marginRight: scale(10),
    height: scale(30),
    width: scale(30),
  },
  performanceTextContainer: {
    flex: 1,
  },
  performanceTitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  performanceDate: {
    fontStyle: 'italic',
    color: COLORS.grey,
    fontSize: moderateScale(12),
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(4),
    borderWidth: 0.5,
    marginHorizontal: scale(15),
    marginTop: scale(15),
    padding: scale(10),
  },
  filterText: {
    marginLeft: scale(5),
    color: COLORS.Black,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
    marginTop: scale(15),
  },
  box: {
    width: '48%',
    height: scale(80),
    borderRadius: scale(8),
    padding: scale(10),
    marginBottom: scale(10),
    alignItems: 'center',
    paddingTop: scale(20),
  },
  boxTitle: {
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  boxCount: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(15),
  },
  warningText: {
    color: COLORS.Black,
    marginLeft: scale(10),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: scale(20),
    backgroundColor: COLORS.White,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.Black,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: scale(10),
  },
  modalIconContainer: {
    backgroundColor: COLORS.green,
    padding: scale(5),
    borderRadius: scale(5),
  },
  modalTextContainer: {
    flex: 1,
    marginLeft: scale(10),
  },
  modalLinkTitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  modalLinkDescription: {
    color: COLORS.Black,
  },
});
