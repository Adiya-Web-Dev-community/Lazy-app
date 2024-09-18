import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  FlatList,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import LinearGradient from 'react-native-linear-gradient';

export default function Earnings({navigation}) {
  const [isVisibleProfit, setIsVisibleProfit] = useState(false);
  const [isVisibleReferal, setIsVisibleReferal] = useState(false);
  const [isVisibleWhatsThisProfit, setIsVisibleWhatsThisProfit] =
    useState(false);
  const [isVisibleWhatsThisReferal, setIsVisibleWhatsThisReferal] =
    useState(false);

  const toggleVisibilityProfit = () => {
    setIsVisibleProfit(prevState => !prevState);
  };

  const toggleVisibilityReferal = () => {
    setIsVisibleReferal(prevState => !prevState);
  };

  const toggleVisibilityWhatsThisProfit = () => {
    setIsVisibleWhatsThisProfit(prevState => !prevState);
  };

  const toggleVisibilityWhatsThisReferal = () => {
    setIsVisibleWhatsThisReferal(prevState => !prevState);
  };
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.gradient} colors={['#42c5f5', '#42a1f5']}>
        <StatusBar barStyle="light-content" backgroundColor="#42c5f5" />
      </LinearGradient>
      <LinearGradient style={styles.GRADIENT} colors={['#42c5f5', '#42a1f5']}>
        <View style={{width: '90%'}}>
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
            </View>
            <View style={styles.SECONDCONATIER}>
              <View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.PRICETXT}>$20.00</Text>
                  <Text style={styles.descriptionText}>
                    Total Profit Earnings
                  </Text>
                </View>
                <View
                  style={[
                    styles.descriptionContainer,
                    {
                      borderTopWidth: 1,
                      borderStyle: 'dotted',
                      paddingTop: 15,
                    },
                  ]}>
                  <Text style={[styles.PRICETXT, {color: COLORS.Black}]}>
                    $0.00
                  </Text>
                  <Text style={styles.descriptionText}>
                    Total Referral Earnings
                  </Text>
                </View>
              </View>
              <View style={styles.circleContainer}>
                <View style={styles.outerCircle}>
                  <View style={styles.innerCircle}></View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={{marginTop: scale(150)}}>
        <TouchableOpacity
          style={styles.profitBreakupContainer}
          onPress={toggleVisibilityProfit}>
          <Text style={{color: COLORS.Black, fontWeight: 'bold'}}>
            PROFIT BREAK UP
          </Text>
          <AntDesign name="circledown" size={20} color={COLORS.blue} />
        </TouchableOpacity>
        {isVisibleProfit && (
          <View style={styles.VISIBLECONTAINER}>
            <Text style={styles.VPRICE}>$0</Text>
            <Text style={styles.VTXT}>
              Confirmed Profit(Available For Paytem)
            </Text>
            <View style={styles.VROWDETAILS}>
              <View>
                <Text style={styles.VPRICE}>$2.5</Text>
                <Text style={styles.VTXT}>Pending Profit</Text>
              </View>
              <View>
                <Text style={styles.VPRICE}>$2.5</Text>
                <Text style={styles.VTXT}>Pending Profit</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={toggleVisibilityWhatsThisProfit}>
              <Text style={styles.VWHATSBTM}>What's This</Text>
              <AntDesign
                name="questioncircle"
                color={COLORS.blue}
                size={18}
                style={styles.VICON}
              />
            </TouchableOpacity>
            {isVisibleWhatsThisProfit && (
              <View>
                <Text style={styles.WhatsTxt}>
                  Paid Profit:Profit that has successfully been paid{'\n'}to you
                  in the past
                </Text>
                <Text style={styles.WhatsTxt}>
                  Pending Profit:Your profit has been recorded{'n'}and will be
                  confirm as per the parternes{'\n'}
                  expected date.
                </Text>
                <Text style={styles.WhatsTxt}>
                  Confirmed Profit:Profit that you can transer{'\n'} to your
                  bank account or redeem through other{'\n'}payment methods.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.profitBreakupContainer}
        onPress={toggleVisibilityReferal}>
        <Text style={{color: COLORS.Black, fontWeight: 'bold'}}>
          REFERRAL BREAK UP
        </Text>
        <AntDesign name="circledown" size={20} color={COLORS.blue} />
      </TouchableOpacity>
      {isVisibleReferal && (
        <View style={styles.VISIBLECONTAINER}>
          <Text style={styles.VPRICE}>$0</Text>
          <Text style={styles.VTXT}>
            Confirmed Profit(Available For Paytem)
          </Text>
          <View style={styles.VROWDETAILS}>
            <View>
              <Text style={styles.VPRICE}>$2.5</Text>
              <Text style={styles.VTXT}>Pending Profit</Text>
            </View>
            <View>
              <Text style={styles.VPRICE}>$2.5</Text>
              <Text style={styles.VTXT}>Pending Profit</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={toggleVisibilityWhatsThisReferal}>
            <Text style={styles.VWHATSBTM}>What's This</Text>
            <AntDesign
              name="questioncircle"
              color={COLORS.blue}
              size={18}
              style={styles.VICON}
            />
          </TouchableOpacity>
          {isVisibleWhatsThisReferal && (
            <Text style={styles.WhatsTxt}>
              You get 10% of your Referral's Lifetime Earnings{'\n'}every time
              they earn Profit
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    paddingTop: scale(100),
  },
  GRADIENT: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: scale(120),
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    elevation: 5,
    shadowColor: COLORS.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: scale(17),
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
  },
  descriptionText: {
    color: COLORS.Black,
    paddingTop: scale(5),
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

  viewMoreText: {
    color: COLORS.White,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMoreIcon: {
    marginRight: scale(5),
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
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },

  outerCircle: {
    width: scale(105),
    height: scale(105),
    borderRadius: scale(100),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(100),
    backgroundColor: COLORS.White,
  },
  PRICETXT: {
    color: COLORS.blue,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  SECONDCONATIER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profitBreakupContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    padding: scale(10),
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(15),
    borderRadius: 10,
    marginHorizontal: scale(20),
  },
  VISIBLECONTAINER: {
    backgroundColor: COLORS.White,
    padding: scale(10),
    elevation: 5,
    marginHorizontal: scale(20),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    bottom: 5,
  },
  VPRICE: {
    color: COLORS.blue,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  VROWDETAILS: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(15),
    borderBottomWidth: 0.5,
    borderStyle: 'dotted',
    paddingVertical: scale(20),
  },
  VWHATSBTM: {
    color: COLORS.blue,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  VICON: {
    marginLeft: scale(4),
    alignSelf: 'center',
  },
  VTXT: {
    color: COLORS.Black,
    marginTop: scale(2),
    fontSize: moderateScale(14),
  },
  WhatsTxt: {
    color: COLORS.Black,
    marginTop: scale(3),
  },
});
