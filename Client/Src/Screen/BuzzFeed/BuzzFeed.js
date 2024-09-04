import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../Theme/Colors';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';
import SwitchMain from '../../Components/Switch/Switch';
import { getPost } from '../../api/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BuzzFeed({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const data = await getPost();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  const AllcategoryButton = [
    'All Category',
    ...new Set(posts.map(post => post.name)),
  ];

  const handlePostPress = async post => {
    navigation.navigate('BuzzFeedDetails', { name: post.name });
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
      <View style={styles.Secondcontainer}>
      <MaterialCommunityIcons name="account-circle-outline" size={54} color="#000" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.placeholderText}>Inform and Inspire...</Text>
      </View>
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
      {loadingPosts ? (
        <ActivityIndicator size="large" color={COLORS.blue} style={styles.activityIndicator} />
      ) : (
        <FlatList
          data={
            selectedCategory === 'All Category'
              ? posts
              : posts.filter(post => post.name === selectedCategory)
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePostPress(item)}>
              <View style={styles.postContainer}>
                <View style={styles.profileContainer}>
                  <Image source={{ uri: item.image }} style={styles.profileImage} />
                  <Text style={styles.username}>{item.name}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.postImage} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          style={styles.flatList}
        />
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
    height: scale(45),
    width: scale(135),
  },

  Secondcontainer: {  
    flexDirection: 'row',  
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: COLORS.White,
  
    
  },
  icon: {
    marginRight: moderateScale(10),
  },
  textContainer: {
    width: scale(270),
    height:verticalScale(40),
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems:'center',
    justifyContent:'center'
    
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
  flatList: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(10),
    padding: scale(10),
    marginHorizontal: moderateScale(10),
    elevation: verticalScale(5),
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
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
