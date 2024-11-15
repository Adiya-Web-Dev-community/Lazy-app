import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  StatusBar,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../Theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UserProfileScreen({navigation}) {
  const Navigation=useNavigation()
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setLogoutModalVisible(false)
      Navigation.reset({
        index: 0,  
        routes: [{ name: 'Login' }], 
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#42a1f5', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientStyling}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
      </LinearGradient>
      <LinearGradient
        colors={['#42a1f5', '#42c5f5']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientStyling}>
        <View style={styles.header}>
          <AntDesign name="arrowleft" size={22} color={COLORS.White} />
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>K</Text>
          </View>
          <Text style={styles.nameText}>KISHAN VAGHASIYA</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>User ID: 123456</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Total Profit: $20</Text>
          </View>
        </View>
      </LinearGradient>
      <View style={[styles.actionsContainer, {}]}>
        <Text style={styles.moneyHeader}>Profile</Text>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.iconContainer}>
            <AntDesign name="user" size={20} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Edit Profile</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.moneyHeader}>Money</Text>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('MyEarningsScreen')}>
          <View style={styles.iconContainer}>
            <FontAwesome name="rupee" size={20} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>My Earnings</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => navigation.navigate('Transection')}>
          <View style={styles.iconContainer}>
            <AntDesign name="wallet" size={20} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Transection</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() => navigation.navigate('OrderHistory')}>
          <View style={styles.iconContainer}>
            <Fontisto name="history" size={20} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Order History</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() => navigation.navigate('MissingCashback')}>
          <View style={styles.iconContainer}>
            <Ionicons name="cash" size={20} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Missing CashBack</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.actionsContainer}>
        <Text style={styles.moneyHeader}>Exclusive Tools</Text>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() => navigation.navigate('ReferAndEarnScreen')}>
          <View style={styles.iconContainer}>
            <Entypo name="add-user" size={22} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Refer & Earn</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() => setLogoutModalVisible(true)}>
          <View style={styles.iconContainer}>
            <AntDesign name="logout" size={22} color={COLORS.blue} />
          </View>
          <Text style={styles.actionText}>Logout</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBox, {borderBottomWidth: 0}]}
          onPress={() =>navigation.navigate("AccountDelete")}>
          <View style={styles.iconContainer}>
            <AntDesign name="delete" size={22} color={COLORS.red} />
          </View>
          <Text style={styles.actionText}>Delete</Text>
          <AntDesign name="right" size={20} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(!logoutModalVisible)}>
        <View style={styles.LmodalContainer}>
          <View style={styles.LmodalContent}>
            <Text style={styles.LmodalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.LmodalButtonContainer}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.LmodalButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLogoutModalVisible(false)}>
                <Text style={[styles.LmodalButtonText, {color: COLORS.red}]}>
                  Cancel
                </Text>
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
  gradientStyling: {
    borderBottomRightRadius: moderateScale(18),
    borderBottomLeftRadius: moderateScale(18),
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: scale(25),
    marginHorizontal: scale(15),
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    color: COLORS.White,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.watercolor,
    padding: scale(5),
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: scale(15),
  },
  initialContainer: {
    backgroundColor: COLORS.White,
    borderRadius: 50,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginRight: 10,
  },
  initialText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  nameText: {
    fontSize: moderateScale(15),
    color: COLORS.Black,
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scale(20),
    marginHorizontal: scale(15),
    marginVertical: verticalScale(30),
  },
  infoBox: {
    backgroundColor: COLORS.watercolor,
    padding: scale(10),
    borderRadius: 10,
    elevation: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  infoText: {
    fontSize: moderateScale(15),
    color: COLORS.Black,
    fontWeight: '600',
  },
  moneyHeader: {
    marginLeft: scale(17),
    marginTop: scale(10),
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  actionsContainer: {
    marginHorizontal: scale(15),
    backgroundColor: '#f4f6f6',
    marginTop: scale(20),
    borderRadius: moderateScale(8),
  },
  actionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: scale(10),
  },
  iconContainer: {
    backgroundColor: '#eaeded',
    borderRadius: 25,
    height: scale(28),
    width: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  actionText: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  rightIcon: {
    color: COLORS.Gray,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  MTXT: {
    color: COLORS.Black,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginHorizontal: scale(20),
  },
  MODALIMAGE: {
    height: scale(150),
    width: scale(150),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(30),
  },
  MTITILE: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  MODALBTN: {
    backgroundColor: COLORS.green,
    marginTop: scale(30),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(8),
  },
  MODALBTNTXT: {
    fontWeight: 'bold',
    color: COLORS.White,
  },
  LmodalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  LmodalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  LmodalText: {
    marginBottom: scale(50),
    textAlign: 'center',
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: '500',
  },
  LmodalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  LmodalButtonText: {
    fontSize: moderateScale(16),
    color: COLORS.blue,
    marginHorizontal: scale(20),
  },
});
