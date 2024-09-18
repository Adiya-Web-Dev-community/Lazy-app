import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { getSavedPosts } from '../../api/api';
import { moderateScale, verticalScale, scale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function SavePost() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({}); 
  const route = useRoute();
  const { username ,} = route.params || {};

  const fetchSavedPosts = async () => {
    try {
      const response = await getSavedPosts();
      if (response.success) {
        setSavedPosts(response.data);
      } else {
        console.log('Failed to fetch saved posts');
      }
    } catch (error) {
      console.error('Failed to fetch saved posts', error);
    }
  };

  const fetchLikedPosts = async () => {
    try {
      const likedPostsString = await AsyncStorage.getItem('likedPosts');
      const likedPostsState = likedPostsString ? JSON.parse(likedPostsString) : {};
      setLikedPosts(likedPostsState);
    } catch (error) {
      console.error('Failed to fetch liked posts', error);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
    fetchLikedPosts(); // Fetch likedPosts when component mounts
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfoContainer}>
          <Image source={{ uri: item.image_url }} style={styles.profileImage} />
          <Text style={styles.username}>{username ? `${username}` : ''}</Text>
        </View>
        <TouchableOpacity style={styles.moreIconContainer}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color={COLORS.Black}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: item.image_url }}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.leftIconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign
              name={likedPosts[item._id] ? 'like1' : 'like2'}
              color={COLORS.Black}
              size={25}
              style={styles.iconMargin}
            />
            <Text style={styles.iconButtonText}>{item.likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome
              name="comment-o"
              color={COLORS.Black}
              size={25}
              style={styles.iconMargin}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedPosts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
  iconButtonText: {
    marginLeft: scale(5),
    fontSize: moderateScale(15),
  },
  iconMargin: {
    marginRight: scale(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
