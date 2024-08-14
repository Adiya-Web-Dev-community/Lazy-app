import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RenderHTML from 'react-native-render-html';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import SwitchMain from '../../Components/Switch/Switch';
import {getPost, getBlogByCategory, getReview} from '../../api/api';
import ImageSlider from '../../Components/Slider/ImageSlider';
import Review from './Review/Review';
import Stars from 'react-native-stars';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AllReviewShow from './Review/AllReviewShow';

export default function BuzzFeed() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const [showReviews, setShowReviews] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        console.log('get post:', data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('Selected Post Data:', selectedPostData);
    console.log('BuzzFeed image id', selectedPostData?._id);
  }, [selectedPostData]);

  const AllcategoryButton = [
    'All Category',
    ...new Set(posts.map(post => post.name)),
  ];

  const handlePostPress = async post => {
    setSelectedPostData(post);
    setShowDetails(true);
    try {
      const data = await getBlogByCategory(post.name);
      if (data?.[0]?.brand) {
        console.log('Brand data:...', data[0].brand);
        setBrandData(data[0].brand);
      } else {
        console.log('No brand data available');
        setBrandData([]);
      }
      setBlogData(data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    if (category === 'All Category') {
      setSelectedPostData(null);
    } else {
      setSelectedPostData(posts.filter(post => post.name === category));
    }
  };

  const handleReviewSubmit = newReview => {
    if (newReview) {
      setReviews([newReview, ...reviews]);
    }
  };

  const fetchReviews = async postId => {
    try {
      const response = await axios.get(
        `http://192.168.122.164:8000/api/blog/review/${postId}`,
      );
      if (response.status === 200) {
        setReviews(response.data.data);
        setShowReviews(true);
      } else {
        console.log('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  if (showReviews) {
    return (
      <AllReviewShow
        reviews={reviews}
        onBackPress={() => setShowReviews(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {!showDetails && (
        <>
          <View style={styles.header}>
            <Image source={require('../assets/L1.png')} style={styles.logo} />
            <View>
              <SwitchMain />
            </View>
            <TouchableOpacity style={styles.FeedBtn}>
              <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.SCROLL}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {AllcategoryButton.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    selectedCategory === category && styles.selectedButton,
                  ]}
                  onPress={() => handleCategoryPress(category)}>
                  <Text
                    style={[
                      styles.buttonText,
                      selectedCategory === category &&
                        styles.selectedButtonText,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={
              selectedCategory === 'All Category' ? posts : selectedPostData
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handlePostPress(item)}>
                <View style={styles.postContainer}>
                  <View style={styles.profileContainer}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.profileImage}
                    />
                    <Text style={styles.username}>{item.name}</Text>
                  </View>
                  <Image source={{uri: item.image}} style={styles.postImage} />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            style={styles.flatList}
          />
        </>
      )}
      {showDetails && selectedPostData && (
        <ScrollView>
          <View style={styles.HEADER}>
            <TouchableOpacity onPress={() => setShowDetails(false)}>
              <Icon name="arrowleft" size={23} color={COLORS.Black} />
            </TouchableOpacity>
            <Text style={styles.USERNAME}>{selectedPostData.name}</Text>
            <TouchableOpacity>
              <Icon name="sharealt" size={18} color={COLORS.Black} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
          <ImageSlider productId={selectedPostData?._id} />
          {blogData.map((blog, index) => (
              <View key={index}>
                <RenderHTML
                  contentWidth={scale(300)}
                  source={{html: blog.content}}
                />
              </View>
            ))}
          </View>
          <View style={styles.BottomBtnContainer}>
            {brandData.map((brand, index) => (
              <View key={index} style={styles.ImgndBtn}>
                <Image
                  // source={{ uri: brand.image }}
                  source={require('../assets/Logo1.webp')}
                  style={{height: scale(110), width: scale(110)}}
                />
                <View style={{alignSelf: 'center'}}>
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
            style={{flex: 1, justifyContent: 'flex-end', padding: scale(10)}}>
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
            style={[styles.reviewButton, {marginHorizontal: 10}]}
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: verticalScale(5),
  },
  SCROLL: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },
  logo: {
    height: 60,
    width: 159,
  },
  FeedBtn: {
    borderWidth: moderateScale(1),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
  },
  FeedBtnTxt: {
    color: COLORS.red,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  scrollViewContainer: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    height: scale(70),
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    marginHorizontal: scale(5),
    alignItems: 'center',
    height: scale(35),
    borderWidth: scale(0.8),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(15),
  },
  flatList: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
  },
  postContainer: {
    backgroundColor: '#fdfefe',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(10),
    padding: scale(10),
    borderWidth: scale(1),
    borderColor: COLORS.gray,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  profileImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  username: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  postImage: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(10),
  },
  description: {
    fontSize: moderateScale(14),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: scale(5),
    color: COLORS.gray,
    fontSize: moderateScale(14),
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  commentInput: {
    flex: 1,
    borderWidth: scale(1),
    borderColor: COLORS.gray,
    borderRadius: moderateScale(5),
    padding: scale(10),
  },
  submitButton: {
    marginLeft: scale(10),
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
  },
  submitButtonText: {
    color: COLORS.White,
    fontWeight: 'bold',
  },
  TITLESS: {
    marginHorizontal: scale(15),
    fontStyle: 'italic',
  },
  detailsContainer: {
    marginTop: verticalScale(10),
  },
  detailsText: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  detailsImage: {
    height: scale(235),
    width: '92%',
    marginVertical: verticalScale(15),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
  },
  USERNAME: {
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  postContainerDetails: {
    paddingHorizontal: scale(5),
    marginBottom: verticalScale(15),
  },
  image: {
    height: 235,
    width: 335,
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
    top: scale(10),
    left: scale(10),
    zIndex: 1,
    backgroundColor: COLORS.White,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(5),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    padding: scale(10),
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: '80%',
  },
  reviewInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    padding: scale(10),
    marginBottom: verticalScale(10),
  },
  REVIEWBTNTXT: {
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: verticalScale(8),
    fontSize: moderateScale(15),
  },
  REVIEWBTN: {
    backgroundColor: COLORS.green,
    height: scale(40),
    width: scale(110),
    borderRadius: moderateScale(5),
  },
  BRAND: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    paddingVertical: verticalScale(20),
    marginTop: scale(50),
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
    marginHorizontal: scale(15),
    marginTop: verticalScale(10),
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
