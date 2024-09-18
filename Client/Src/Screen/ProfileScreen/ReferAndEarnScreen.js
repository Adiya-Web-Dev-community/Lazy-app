import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {moderateScale, scale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

export default function ReferAndEarnScreen({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/Refer.jpg')} style={styles.image} />

        <Text style={styles.description}>
          Invite your friends to join our platform and earn rewards for each
          successful referral! It’s simple: share your unique referral link and
          earn rewards when your friends sign up and complete their first
          transaction.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Share')}>
          <Text style={styles.buttonText}>Share Your Referral Link</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <Text style={styles.socialTitle}>Share via:</Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => console.log('Share on Facebook')}>
              <Icon name="facebook" size={30} color={COLORS.White} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => console.log('Share on Twitter')}>
              <Icon name="twitter" size={30} color={COLORS.White} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={() => console.log('Share on WhatsApp')}>
              <Icon name="whatsapp" size={30} color={COLORS.White} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardsTitle}>Your Rewards</Text>
          <Text style={styles.rewardsAmount}>$50.00</Text>
          <Text style={styles.rewardsText}>Total Earnings</Text>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionTitle}>How It Works:</Text>
          <Text style={styles.instructionText}>
            1. Share your referral link with friends and family.
          </Text>
          <Text style={styles.instructionText}>
            2. Your friends sign up and complete their first transaction.
          </Text>
          <Text style={styles.instructionText}>
            3. You earn rewards for every successful referral.
          </Text>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Terms and Conditions:</Text>
          <Text style={styles.termsText}>
            - Rewards are only applicable when referred users complete a
            transaction.
          </Text>
          <Text style={styles.termsText}>
            - Referrals must be new users who have not previously signed up.
          </Text>
          <Text style={styles.termsText}>
            - Other terms and conditions may apply.
          </Text>
        </View>

        <View style={styles.testimonialsContainer}>
          <Text style={styles.testimonialsTitle}>What Our Users Say:</Text>
          <Text style={styles.testimonialText}>
            "I’ve earned $200 just by referring my friends. It’s easy and
            rewarding!" - Sarah
          </Text>
          <Text style={styles.testimonialText}>
            "The referral program is fantastic. I love sharing and earning at
            the same time!" - John
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    width: width,
    padding: scale(20),
  },
  content: {
    padding: scale(20),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(20),
    elevation: 5,
    marginBottom: scale(20),
  },
  image: {
    width: width - scale(40),
    height: scale(200),
    borderRadius: moderateScale(15),
    marginBottom: scale(20),
    alignSelf: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    textAlign: 'center',
    marginBottom: scale(20),
  },
  button: {
    backgroundColor: COLORS.green,
    paddingVertical: scale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: scale(20),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  socialContainer: {
    alignItems: 'center',
    marginBottom: scale(20),
  },
  socialTitle: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  socialIcon: {
    backgroundColor: COLORS.green,
    height: scale(50),
    width: scale(50),
    padding: scale(10),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rewardsContainer: {
    alignItems: 'center',
    padding: scale(15),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(12),
    elevation: 3,
    marginBottom: scale(20),
    borderWidth:0.5
  },
  rewardsTitle: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  rewardsAmount: {
    fontSize: moderateScale(32),
    color: COLORS.green,
    fontWeight: 'bold',
    marginBottom: scale(5),
  },
  rewardsText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
  },
  instructionContainer: {
    marginBottom: scale(20),
  },
  instructionTitle: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  instructionText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginBottom: scale(5),
  },
  termsContainer: {
    marginBottom: scale(20),
  },
  termsTitle: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  termsText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginBottom: scale(5),
  },
  testimonialsContainer: {
    marginBottom: scale(20),
  },
  testimonialsTitle: {
    fontSize: moderateScale(18),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  testimonialText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginBottom: scale(5),
  },
});
