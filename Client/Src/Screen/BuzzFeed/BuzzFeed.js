import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import SwitchMain from '../../Components/Switch/Switch';
import {
  getRegisterdetails,
  getUserPost,
  likePost,
  AllPostCategory,
  DeletePost,
} from '../../api/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function BuzzFeed({navigation}) {
  const [posts, setPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [username, setUsername] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({top: 0, left: 0});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [commentInputVisible, setCommentInputVisible] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});

  const fetchPosts = async category => {
    try {
      const userResponse = await getRegisterdetails();
      const userData = userResponse.data;
      if (userData && userData.email) {
        const emailUsername = userData.email.split('@')[0];
        setUsername(emailUsername);
      } else {
        console.log('Username is not available');
      }

      const postsResponse = await getUserPost();
      console.log('Posts:', postsResponse);
      const postsWithLikes = postsResponse.map(post => ({
        ...post,
        likeCount: post.likeCount || 0,
      }));

      if (category) {
        setPosts(postsWithLikes.filter(post => post.category === category));
      } else {
        setPosts(postsWithLikes);
      }

      const likedPostsString = await AsyncStorage.getItem('likedPosts');
      const likedPostsState = likedPostsString
        ? JSON.parse(likedPostsString)
        : {};
      setLikedPosts(likedPostsState);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await AllPostCategory();
      if (response.success) {
        setCategories(
          response.data.filter(category => category.name !== 'all'),
        );
      } else {
        console.log('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts(null);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts(selectedCategory);
    }, [selectedCategory]),
  );

  const toggleLike = async id => {
    try {
      const isLiked = likedPosts[id];
      const updatedPost = await likePost(id);

      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id === id) {
            return {
              ...post,
              likeCount: post.likeCount + (isLiked ? -1 : 1),
            };
          }
          return post;
        }),
      );
      const newLikedPosts = {
        ...likedPosts,
        [id]: !isLiked,
      };
      setLikedPosts(newLikedPosts);
      await AsyncStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
    } catch (error) {
      console.error('Failed to like/unlike the post', error);
    }
  };

  const handleMoreIconPress = (id, event) => {
    setCurrentPostId(id);
    const {pageX, pageY} = event.nativeEvent;
    setModalPosition({top: pageY + 10, left: pageX - 120});
    setModalVisible(true);
  };

  const handleDeletePost = async () => {
    if (currentPostId) {
      try {
        await DeletePost(currentPostId);
        setPosts(prevPosts =>
          prevPosts.filter(post => post._id !== currentPostId),
        );
      } catch (error) {
        console.error('Failed to delete the post', error);
      }
      setModalVisible(false);
      setCurrentPostId(null);
    }
  };
  const handleCommentSubmit = postId => {
    if (commentText.trim()) {
      setPostComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), commentText.trim()],
      }));
      setCommentText('');
      setCommentInputVisible(null);
    }
  };

  const renderCategoryItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={[
          styles.button,
          item.name === selectedCategory && styles.buttonSelected,
        ]}
        onPress={() => {
          setSelectedCategory(item.name);
          fetchPosts(item.name);
        }}>
        <Text style={styles.buttonText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.postContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfoContainer}>
          <Image source={{uri: item.image_url}} style={styles.profileImage} />
          <Text style={styles.username}>{username ? `${username}` : ''}</Text>
        </View>
        <TouchableOpacity
          style={styles.moreIconContainer}
          onPress={event => handleMoreIconPress(item._id, event)}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color={COLORS.Black}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: item.image_url}}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.leftIconsContainer}>
          <TouchableOpacity
            onPress={() => toggleLike(item._id)}
            style={styles.iconButton}>
            <AntDesign
              name={likedPosts[item._id] ? 'like1' : 'like2'}
              color={COLORS.Black}
              size={25}
              style={styles.iconMargin}
            />
            <Text style={styles.iconButtonText}>{item.likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCommentInputVisible(item._id)}
            style={styles.iconButton}>
            <FontAwesome
              name="comment-o"
              color={COLORS.Black}
              size={25}
              style={styles.iconMargin}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => toggleBookmark(item._id)}
          style={{marginRight: scale(8)}}>
          <FontAwesome
            name={bookmarkedPosts[item._id] ? 'bookmark' : 'bookmark-o'}
            color={COLORS.Black}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {commentInputVisible === item._id && (
        <View style={styles.commentSection}>
          <TextInput
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Write a comment..."
            style={styles.commentInput}
          />
          <TouchableOpacity
            onPress={() => handleCommentSubmit(item._id)}
            style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {postComments[item._id] &&
        postComments[item._id].map((comment, index) => (
          <View key={index} style={styles.commentItem}>
            <Text>{comment}</Text>
          </View>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Secondcontainer}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={54}
          color="#000"
          style={styles.icon}
        />
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => navigation.navigate('UserPostScreen')}>
          <Text style={styles.placeholderText}>Inform and Inspire...</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={[{name: 'All', id: 'all'}, ...categories]}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <TouchableOpacity
              style={[
                styles.button,
                selectedCategory === 'all' && styles.buttonSelected,
              ]}
              onPress={() => {
                setSelectedCategory(null);
                fetchPosts(null);
              }}>
              <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
          }
          style={{marginVertical: verticalScale(10), marginLeft: scale(5)}}
        />
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={styles.flatList}
      />
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalContent,
              {top: modalPosition.top, left: modalPosition.left},
            ]}>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleDeletePost}>
              <MaterialCommunityIcons
                name="delete-outline"
                color="red"
                size={25}
                style={styles.modalIcon}
              />
              <Text style={styles.modalOptionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
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
  logo: {
    height: scale(45),
    width: scale(135),
  },
  Secondcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(5),
    backgroundColor: COLORS.White,
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: moderateScale(10),
  },
  textContainer: {
    width: scale(270),
    height: verticalScale(40),
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 19,
    color: '#000',
  },
  FeedBtn: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
  },
  FeedBtnTxt: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  iconButton: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconButtonText: {
    color: COLORS.Black,
    fontSize: moderateScale(15),
    marginLeft: scale(5),
  },
  flatList: {
    paddingHorizontal: scale(5),
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(5),
    padding: scale(5),
    marginHorizontal: moderateScale(5),
    elevation: verticalScale(5),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: verticalScale(5),
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: scale(35),
    height: scale(35),
    borderRadius: scale(20),
    marginRight: scale(10),
  },
  username: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  moreIconContainer: {
    padding: scale(10),
  },
  postImage: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
  },
  leftIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    marginHorizontal: scale(5),
    alignItems: 'center',
    height: scale(35),
    elevation: verticalScale(5),
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(15),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: scale(20),
  },
  modalContent: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(10),
    padding: scale(5),
    width: scale(120),
    elevation: verticalScale(5),
    position: 'absolute',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  modalIcon: {
    marginRight: scale(10),
  },
  modalOptionText: {
    fontSize: moderateScale(15),
    color: COLORS.Black,
    fontWeight: '600',
  },
  commentSection: {
    paddingHorizontal: scale(5),
    marginTop: verticalScale(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInput: {
    borderColor: COLORS.Gray,
    borderWidth: 1,
    borderRadius: scale(8),
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(16),
    color: COLORS.Black,
  },
  submitButton: {
    backgroundColor: COLORS.blue,
    borderRadius: scale(8),
    paddingVertical: verticalScale(5),
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  submitButtonText: {
    color: COLORS.White,
    fontSize: moderateScale(16),
  },
});
