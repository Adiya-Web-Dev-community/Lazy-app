import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RenderHTML from 'react-native-render-html';
import { COLORS } from '../../Theme/Colors';
import { scale, verticalScale, moderateScale } from '../../utils/Scaling';
import ImageSlider from '../../Components/Slider/ImageSlider';
import Review from './Review/Review';
import Stars from 'react-native-stars';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Share from 'react-native-share';
import { getBlogByCategory } from '../../api/api';
import AllReviewShow from './Review/AllReviewShow';

export default function BuzzFeedDetails({ route, navigation }) {
  const { name } = route.params;

  const [showDetails, setShowDetails] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [blogData, setBlogData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await getBlogByCategory(name);
        console.log('name', name);

        if (response.length > 0) {
          if (response[0]?.brand) {
            setBrandData(response[0].brand);
          } else {
            setBrandData([]);
          }
          setBlogData(response);
          setSelectedPostData(response[0]);
          setShowDetails(true);
        } else {
          console.log('No data found for the given postId.');
          setShowDetails(false);
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchPostDetails();
  }, [name]);

  useEffect(() => {
    // console.log('showDetails:', showDetails);
    // console.log('selectedPostData:', selectedPostData);
  }, [showDetails, selectedPostData]);

  const fetchReviews = async postId => {
    try {
      const response = await axios.get(
        `http://192.168.122.164:8000/api/blog/review/${postId}`,
      );
      if (response.status === 200) {
        setReviews(response.data.data);
      } else {
        console.log('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };
  const handleReviewSubmit = newReview => {
    if (newReview) {
      setReviews([newReview, ...reviews]);
    }
  };

  const onHandleSharePost = () => {
    const options = {
      title: 'Share Post',
      message: `share post - ${name}`,
      url: `https://lazydeeplink.netlify.app/app/BuzzFeedDetails/${name}`
    }
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  if (showAllReviews) {
    return (
      <AllReviewShow
        reviews={reviews}
        onBackPress={() => setShowAllReviews(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {showDetails && selectedPostData && (
        <ScrollView>
          <View style={styles.HEADER}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrowleft"
                size={25}
                color={COLORS.Black}
                style={{ marginLeft: scale(5) }}
              />
            </TouchableOpacity>
            <Text style={styles.USERNAME}>{name}</Text>
            <TouchableOpacity onPress={onHandleSharePost} >
              <Icon
                name="sharealt"
                size={20}
                color={COLORS.Black}
                style={{ marginRight: scale(10) }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <ImageSlider productId={selectedPostData._id} />
            {blogData.map((blog, index) => (
              <View key={index}>
                <RenderHTML
                  contentWidth={scale(300)}
                  source={{ html: blog.content }}
                />
              </View>
            ))}
          </View>
          <View style={styles.BottomBtnContainer}>
            {brandData.map((brand, index) => (
              <View key={index} style={styles.ImgndBtn}>
                <Image
                  source={require('../assets/Logo1.webp')}
                  // source={{ uri: brand.image }}
                  style={{ height: scale(110), width: scale(110) }}
                />
                <View style={{ alignSelf: 'center' }}>
                  <TouchableOpacity
                    style={styles.BottomBtn}
                    onPress={() => Linking.openURL(brand.link)}>
                    <Text style={styles.REVIEWBTNTXT}>{brand.name}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View
            style={{ flex: 1, justifyContent: 'flex-end', padding: scale(10) }}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => setIsReviewModalVisible(true)}>
              <Text style={styles.reviewButtonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
          {reviews.length > 0 ? (
            <>
              <ScrollView style={styles.reviewsContainer}>
                {reviews
                  .slice(0, showAllReviews ? undefined : 2)
                  .map((review, index) => (
                    <View key={index} style={styles.reviewItem}>
                      <Text style={styles.reviewName}>{review.name}</Text>
                      <Text style={styles.reviewEmail}>{review.email}</Text>
                      <Stars
                        default={review.rating}
                        count={5}
                        half={true}
                        starSize={20}
                        fullStar={
                          <Icons
                            name="star"
                            size={30}
                            style={styles.myStarStyle}
                          />
                        }
                        emptyStar={
                          <Icons
                            name="star-outline"
                            size={30}
                            style={[
                              styles.myStarStyle,
                              styles.myEmptyStarStyle,
                            ]}
                          />
                        }
                        halfStar={
                          <Icons
                            name="star-half"
                            size={30}
                            style={styles.myStarStyle}
                          />
                        }
                        disabled={true}
                      />
                      <Text>{review.message}</Text>
                    </View>
                  ))}
              </ScrollView>
            </>
          ) : (
            <Text style={styles.REVIEWTXT}>No reviews yet.</Text>
          )}
          <TouchableOpacity
            style={[styles.reviewButton, { marginHorizontal: 10 }]}
            onPress={() => fetchReviews(selectedPostData._id)}>
            <Text style={styles.reviewButtonText}>See all Review</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <Review
        visible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onSubmitReview={handleReviewSubmit}
        selectedPostData={selectedPostData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },

  detailsContainer: {
    marginTop: verticalScale(10),
  },

  USERNAME: {
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },

  reviewsContainer: {
    paddingHorizontal: scale(10),
  },
  // reviewItem: {
  //   padding: scale(5),
  //   marginBottom: verticalScale(10),
  // },
  reviewButton: {
    backgroundColor: COLORS.green,
    padding: scale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  reviewButtonText: {
    color: COLORS.White,
    fontWeight: 'bold',
  },
  REVIEWTXT: {
    marginHorizontal: scale(15),
    fontStyle: 'italic',
  },

  REVIEWBTNTXT: {
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: verticalScale(8),
    fontSize: moderateScale(15),
  },

  BottomBtnContainer: {
    marginTop: scale(70),
    borderTopWidth: scale(0.5),
    paddingVertical: verticalScale(10),
  },
  ImgndBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scale(10),
  },
  BottomBtn: {
    backgroundColor: COLORS.green,
    width: scale(140),
    height: scale(35),
    borderRadius: moderateScale(5),
    marginVertical: verticalScale(10),
    marginHorizontal: scale(5),
    alignSelf: 'center',
  },
  HEADER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.White,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  reviewItem: {
    alignItems: 'flex-start',
  },
  reviewName: {
    fontWeight: 'bold',
    marginBottom: scale(5),
    fontSize: moderateScale(16),
    marginHorizontal: scale(5),
    color: COLORS.Black,
  },
  reviewEmail: {
    marginBottom: scale(5),
    marginHorizontal: scale(5),
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  myStarStyle: {
    color: 'gold',
    backgroundColor: 'transparent',
  },
  myEmptyStarStyle: {
    color: 'gray',
  },
  selectedButton: {
    backgroundColor: '#24a369',
  },
  selectedButtonText: {
    color: COLORS.White,
  },
});
