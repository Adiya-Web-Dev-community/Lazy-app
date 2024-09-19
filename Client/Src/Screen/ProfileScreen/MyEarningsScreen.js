import React from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale} from '../../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';
import {OrderDetails} from '../../utils/OrderData';

export default function MyEarningsScreen({navigation}) {
  const AllOrder = OrderDetails.Orders;

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
                  <Text style={styles.totalEarningsText}>Total Earnings</Text>
                  <TouchableOpacity style={styles.questionIconContainer}>
                    <AntDesign
                      name="questioncircle"
                      size={18}
                      color={COLORS.Black}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.earningsAmount}>$200</Text>
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
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Earnings')}>
                <View style={styles.exploreContent}>
                  <Text style={styles.exploreText}>Explore</Text>
                  <View style={styles.iconContainer}>
                    <FontAwesome5
                      name="angle-right"
                      size={20}
                      color={COLORS.green}
                      style={styles.exploreIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.listContainer}>
        <FlatList
          data={AllOrder}
          renderItem={({item}) => (
            <LinearGradient
              colors={['#42a1f5', '#42c5f5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.listItem}>
              <TouchableOpacity
                style={styles.listItemContent}
                onPress={() => {
                  if (item.title === 'Order Details') {
                    navigation.navigate('AllOrderDetails');
                  } else if (item.title === 'Reports') {
                    navigation.navigate('Reports');
                  } else if (item.title === 'Request Payment') {
                    navigation.navigate('RequestPayment');
                  } else if (item.title === 'Get Help') {
                    navigation.navigate('GetHelp');
                  }
                }}>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <View style={styles.separator} />
                  <View style={styles.viewMoreContainer}>
                    <Text style={styles.viewMoreText}>{item.secoondtxt}</Text>
                    <FontAwesome
                      name="angle-right"
                      size={20}
                      color={COLORS.White}
                      style={[styles.viewMoreIcon, {marginLeft: scale(5)}]}
                    />
                  </View>
                </View>
                <View style={styles.walletButton}>
                  <FontAwesome5 name="wallet" size={22} color={COLORS.green} />
                </View>
              </TouchableOpacity>
            </LinearGradient>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
  listContainer: {
    marginTop: scale(120),
    paddingHorizontal: scale(10),
  },
  listItem: {
    padding: scale(10),
    borderRadius: 5,
    marginVertical: scale(5),
    elevation: 5,
    shadowColor: COLORS.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: scale(8),
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: moderateScale(17),
    color: COLORS.White,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '50%',
    backgroundColor: COLORS.grey,
    marginVertical: scale(5),
  },
  viewMoreText: {
    color: COLORS.White, // Set your desired color for "View More"
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreIcon: {
    marginRight: scale(5), // Space between the icon and text
  },
  walletButton: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(100),
    padding: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    elevation: 5,
    shadowColor: COLORS.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
