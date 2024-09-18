import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {moderateScale, scale} from '../../utils/Scaling';
import {useRoute} from '@react-navigation/native';
import {COLORS} from '../../Theme/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({navigation}) {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {username} = route.params || {};

  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', 'Something went wrong. Please try again.');
        } else {
          const {uri} = response.assets[0];
          setProfileImage(uri);
        }
      },
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      setTimeout(async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error logging out: ', error);
          Alert.alert('Error', 'Failed to logout. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 3000);
    } catch (error) {
      console.error('Error during logout process: ', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
      setLoading(false);
    }
  };

  const handleReferAndEarn = () => {
    navigation.navigate('ReferAndEarn');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../assets/userIcon.webp')
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={openImagePicker}>
              <AntDesign
                name="camera"
                size={26}
                color={COLORS.White}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>
            {username ? `${username}` : 'No username'}
          </Text>
          <Text style={styles.uniqueID}>ID:123456789</Text>
          <Text style={styles.earnings}>Earnings: $0</Text>
          <View style={styles.earningsBreakdownContainer}>
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsAmount, {color: 'red'}]}>$00</Text>
              <Text style={[styles.earningsType, {color: 'red'}]}>Pending</Text>
            </View>
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsAmount, {color: 'green'}]}>$00</Text>
              <Text style={[styles.earningsType, {color: 'green'}]}>
                Confirmed
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.ordersHeader}>
          <Text style={styles.ordersText}>My Profile</Text>
        </View>

        <TouchableOpacity
          style={styles.editProfileContainer}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.profileContent}>
            <EvilIcons name="user" size={30} color={COLORS.White} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={COLORS.White}
            style={styles.rightIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editProfileContainer}
          onPress={() => navigation.navigate('MyEarningsScreen')}>
          <View style={styles.profileContent}>
            <MaterialIcons
              name="monetization-on"
              size={30}
              color={COLORS.White}
            />
            <Text style={styles.editProfileText}>My Earnings</Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={COLORS.White}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editProfileContainer}
          onPress={handleReferAndEarn}>
          <View style={styles.profileContent}>
            <MaterialIcons name="share" size={30} color={COLORS.White} />
            <Text style={styles.editProfileText}>Refer and Earn</Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={COLORS.White}
            style={styles.rightIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editProfileContainer}
          onPress={() => navigation.navigate('ReportScreen')}>
          <View style={styles.profileContent}>
            <MaterialIcons name="report" size={30} color={COLORS.White} />
            <Text style={styles.editProfileText}>Reports</Text>
          </View>
          <AntDesign
            name="right"
            size={20}
            color={COLORS.White}
            style={styles.rightIcon}
          />
        </TouchableOpacity>

        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.White} />
            ) : (
              <>
                <AntDesign name="logout" size={20} color={COLORS.White} />
                <Text style={styles.logoutText}>Logout</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: scale(10),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(12),
    padding: scale(20),
    marginHorizontal: scale(15),
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  profileImage: {
    height: scale(100),
    width: scale(100),
    borderRadius: moderateScale(100),
    borderWidth: 3,
    borderColor: COLORS.White,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  profileName: {
    marginTop: scale(10),
    fontSize: moderateScale(20),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  uniqueID: {
    fontSize: moderateScale(16),
    color: COLORS.grey,
    marginTop: scale(5),
  },
  earnings: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginVertical: scale(8),
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.blue,
    borderRadius: moderateScale(25),
    padding: scale(8),
    elevation: 5,
  },
  cameraIcon: {
    color: COLORS.White,
  },
  ordersHeader: {
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  ordersText: {
    color: COLORS.Black,
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  editProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(15),
    backgroundColor: COLORS.green,
    borderRadius: moderateScale(8),
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  editProfileText: {
    color: COLORS.White,
    fontSize: moderateScale(18),
    marginLeft: scale(10),
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  logoutContainer: {
    padding: scale(15),
    backgroundColor: COLORS.White,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey,
    marginTop: scale(20),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    padding: scale(12),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
  },
  logoutText: {
    color: COLORS.White,
    fontSize: moderateScale(17),
    marginLeft: scale(10),
    fontWeight: 'bold',
  },

  earningsBreakdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: scale(10),
  },
  earningsItem: {
    alignItems: 'center',
    backgroundColor: COLORS.White,
    padding: scale(10),
    borderRadius: moderateScale(8),
    elevation: 3,
    borderWidth: 0.5,
    borderColor: COLORS.grey,
    width: '45%',
  },
  earningsAmount: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  earningsType: {
    fontSize: moderateScale(16),
    color: COLORS.grey,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
