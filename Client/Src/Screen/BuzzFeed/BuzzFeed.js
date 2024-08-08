import React, {useState, useEffect} from 'react';
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
import {getPost} from '../../api/api';

export default function BuzzFeed() {
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [likes, setLikes] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        console.log('get post:', data);
        setPosts(data);
        setLikes(data.map(item => ({id: item._id, count: 0, liked: false})));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

 

  const handleCommentSubmit = () => {
    console.log('Comment submitted:', commentText);
    setCommentText('');
    setSelectedCommentId(null);
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
          <View style={styles.SCROLL}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>All Category</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Category 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Category 3</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <>
                  <TouchableOpacity onPress={() => handlePostPress(item)}>
                    <View style={styles.postContainer}>
                      <View style={styles.profileContainer}>
                        <Image
                          source={{uri: item.image}}
                          style={styles.profileImage}
                          onError={() => console.log('Image failed to load')}
                        />
                        <Text style={styles.username}>{item.name}</Text>
                      </View>
                      <Image
                        source={{uri: item.image}}
                        style={styles.postImage}
                        onError={() => console.log('Image failed to load')}
                      />
                      <Text style={styles.description}>{item.description}</Text>
                      {selectedCommentId === item._id && (
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
            keyExtractor={item => item._id}
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
            <Text style={styles.USERNAME}>{selectedPostData.name}</Text>
            <Image
              source={{uri: selectedPostData.image}}
              style={styles.detailsImage}
              onError={() => console.log('Image failed to load')}
            />
            {selectedPostData.details?.map((detail, index) => (
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
