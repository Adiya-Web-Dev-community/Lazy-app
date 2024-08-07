import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import SwitchMain from '../../Components/Switch/Switch';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BuzzFeedData from './BuzzFeedData';

export default function BuzzFeed() {
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [likes, setLikes] = useState(
    BuzzFeedData.BuzzFeeds.map(item => ({id: item.id, count: 0, liked: false})),
  );

  const handleCommentPress = id => {
    setSelectedCommentId(selectedCommentId === id ? null : id);
  };

  const handleCommentSubmit = () => {
    console.log('Comment submitted:', commentText);
    setCommentText('');
    setSelectedCommentId(null);
  };

  const handleLikePress = id => {
    setLikes(prevLikes =>
      prevLikes.map(like =>
        like.id === id
          ? {
              ...like,
              count: like.liked ? like.count - 1 : like.count + 1,
              liked: !like.liked,
            }
          : like,
      ),
    );
  };

  const handlePostPress = post => {
    setSelectedPostData(post);
    setShowDetails(true);
  };

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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
            style={styles.scrollView}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>All Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Category 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Category 2</Text>
            </TouchableOpacity>
          </ScrollView>
          <FlatList
            data={BuzzFeedData.BuzzFeeds}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              const likeData = likes.find(like => like.id === item.id);
              return (
                <>
                  <TouchableOpacity onPress={() => handlePostPress(item)}>
                    <View style={styles.postContainer}>
                      <View style={styles.profileContainer}>
                        <Image
                          source={item.profileImage}
                          style={styles.profileImage}
                        />
                        <Text style={styles.username}>{item.Username}</Text>
                      </View>
                      <Image source={item.image} style={styles.postImage} />
                      <Text style={styles.description}>{item.description}</Text>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleLikePress(item.id)}>
                          <Icon
                            name="thumb-up"
                            size={24}
                            color={likeData.liked ? COLORS.green : COLORS.Black}
                          />
                          <Text style={styles.iconText}>
                            {likeData.count} Like
                            {likeData.count !== 1 ? 's' : ''}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconButton}
                          onPress={() => handleCommentPress(item.id)}>
                          <Icon name="comment" size={24} color={COLORS.Black} />
                          <Text style={styles.iconText}>Comment</Text>
                        </TouchableOpacity>
                      </View>
                      {selectedCommentId === item.id && (
                        <View style={styles.commentContainer}>
                          <TextInput
                            style={styles.commentInput}
                            value={commentText}
                            onChangeText={setCommentText}
                            placeholder="Write a comment..."
                          />
                          <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleCommentSubmit}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
            keyExtractor={item => item.id}
            style={styles.flatList}
          />
        </>
      )}
      {showDetails && selectedPostData && (
        <ScrollView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowDetails(false)}>
            <Text style={{color: 'green'}}>Back</Text>
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            <Text style={styles.USERNAME}>{selectedPostData.Username}</Text>
            <Image
              source={selectedPostData.image}
              style={styles.detailsImage}
            />
            {selectedPostData.details.map((detail, index) => (
              <View key={index}>
                <Text style={styles.detailsText}>{detail.Description}</Text>
                <Text style={styles.details2}>{detail.Description2}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
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
  scrollView: {
    marginTop: verticalScale(10),
  },
  scrollViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  button: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(3.5),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    marginHorizontal: scale(5),
    alignItems: 'center',
    height: scale(30),
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
    fontSize: moderateScale(16),
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
  detailsContainer: {
    marginTop: verticalScale(10),
  },
  details2: {
    paddingHorizontal: 20,
    fontSize: 15,
    color: COLORS.Black,
  },
  detailsText: {
    paddingHorizontal: 20,
    fontSize: 15,
    color: COLORS.Black,
    marginVertical: 10,
  },
  detailsImage: {
    height: 220,
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 20,
    borderRadius: 8,
  },
  USERNAME: {
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
