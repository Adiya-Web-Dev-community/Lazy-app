import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Stars from 'react-native-stars';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';

import {COLORS} from '../../../Theme/Colors';
import {verticalScale, scale, moderateScale} from '../../../utils/Scaling';

export default function AllReviewShow({reviews, onBackPress}) {
  useEffect(() => {
    const backAction = () => {
      onBackPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Icon name="arrowleft" size={moderateScale(20)} color={COLORS.Black} />
      </TouchableOpacity>

      <Text style={styles.title}>Reviews</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.reviewsContainer}
        contentContainerStyle={styles.scrollContent}>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewName}>{review.name}</Text>
              <Stars
                default={review.rating}
                count={5}
                half={true}
                starSize={scale(20)}
                fullStar={
                  <Icons
                    name="star"
                    size={scale(18)}
                    style={styles.myStarStyle}
                  />
                }
                emptyStar={
                  <Icons
                    name="star-outline"
                    size={scale(18)}
                    style={styles.myStarStyle}
                  />
                }
                halfStar={
                  <Icons
                    name="star-half"
                    size={scale(18)}
                    style={styles.myStarStyle}
                  />
                }
                disabled={true}
              />
            </View>
            <Text style={styles.reviewEmail}>{review.email}</Text>
            <Text style={styles.reviewMessage}>{review.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAFAF1',
  },
  backButton: {
    marginBottom: verticalScale(10),
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  reviewsContainer: {
    marginTop: verticalScale(10),
    backgroundColor: '#acecc8',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    marginHorizontal: scale(2),
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
    padding: scale(10),
  },
  reviewCard: {
    padding: scale(5),
    marginBottom: verticalScale(15),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(8),
    shadowColor: COLORS.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  reviewName: {
    fontWeight: '400',
    fontSize: moderateScale(18),
    color: COLORS.Black,
  },
  reviewEmail: {
    fontSize: moderateScale(14),
    color: COLORS.secondary,
    marginBottom: verticalScale(5),
  },
  reviewMessage: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    lineHeight: verticalScale(22),
  },
  myStarStyle: {
    color: COLORS.starColor || 'gold',
    backgroundColor: 'transparent',
  },
});
