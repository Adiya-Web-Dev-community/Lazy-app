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
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import SwitchMain from '../../Components/Switch/Switch';
import {getPost, getBlogByCategory, getReview} from '../../api/api';

export default function BuzzFeed({navigation}) {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Category');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPost();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const AllcategoryButton = [
    'All Category',
    ...new Set(posts.map(post => post.name)),
  ];

  const handlePostPress = async post => {
    navigation.navigate('BuzzFeedDetails', {name: post.name});
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
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
                  selectedCategory === category && styles.selectedButtonText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={
          selectedCategory === 'All Category'
            ? posts
            : posts.filter(post => post.name === selectedCategory)
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePostPress(item)}>
            <View style={styles.postContainer}>
              <View style={styles.profileContainer}>
                <Image source={{uri: item.image}} style={styles.profileImage} />
                <Text style={styles.username}>{item.name}</Text>
              </View>
              <Image source={{uri: item.image}} style={styles.postImage} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        style={styles.flatList}
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

  selectedButton: {
    backgroundColor: '#24a369',
  },
  selectedButtonText: {
    color: COLORS.White,
  },
});
