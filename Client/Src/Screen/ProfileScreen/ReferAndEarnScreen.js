import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function ReferAndEarnScreen({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chance to Earn Extra!</Text>
        <Text style={styles.subHeaderText}>Invite Your Friends to LazyBat</Text>
        <Text style={styles.descriptionText}>
          Share your invite link & earn 10% of the Profit your{'\n'}friends make
          - LazyBat
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/Referandearn.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.referralContainer}>
        <Text style={styles.referralHeaderText}>Your Referral Link</Text>
        <Text style={styles.referralInstructionText}>
          Copy the link below and share with your friends!
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter link"
          placeholderTextColor={COLORS.Gray}
          editable={false}
        />
        <Text style={styles.copyText}>Tap to copy</Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="logo-facebook" size={35} color="#3b5998" />
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Fontisto name="telegram" size={35} color="#0088cc" />
          <Text>Telegram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="logo-whatsapp" size={35} color="#25D366" />
          <Text>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: scale(30),
  },
  headerText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  subHeaderText: {
    fontSize: moderateScale(17),
    color: COLORS.Black,
    marginVertical: verticalScale(20),
  },
  descriptionText: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: COLORS.Black,
    fontWeight: '300',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  image: {
    height: scale(125),
    width: scale(300),
    borderRadius: moderateScale(8),
  },
  referralContainer: {
    backgroundColor: COLORS.LightGrey,
    marginTop: scale(25),
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
  },
  referralHeaderText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
  referralInstructionText: {
    marginVertical: verticalScale(5),
    textAlign: 'center',
  },
  textInput: {
    height: verticalScale(40),
    backgroundColor: COLORS.White,
    borderColor: COLORS.Gray,
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  copyText: {
    textAlign: 'center',
    color: COLORS.grey,
    marginVertical: verticalScale(5),
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  iconContainer: {
    alignItems: 'center',
  },
});
