import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale} from '../../utils/Scaling';
import {
  CreateUserPost,
  getRegisterdetails,
  AllPostCategory,
} from '../../api/api';
import Video from 'react-native-video';
import {uploadFileToFirebase} from '../../utils/firebase-file-upload';

export default function UserPostScreen({navigation}) {
  const [mediaUris, setMediaUris] = useState([]);
  const [text, setText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getRegisterdetails();
        const fetchedUserId = userData.data._id;
        console.log(fetchedUserId, 'Fetched User ID');
        setUserId(fetchedUserId);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await AllPostCategory();
        if (response.success) {
          setCategories(response.data);
          console.log('Fetched Categories:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const pickMedia = () => {
    launchImageLibrary({mediaType: 'mixed', selectionLimit: 0}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const validAssets = response.assets.filter(
          asset => asset.uri && asset.type,
        );
        console.log('Valid assets:', validAssets);
        setMediaUris(prevUris => {
          const newUris = [
            ...prevUris,
            ...validAssets.map(asset => ({uri: asset.uri, type: asset.type})),
          ];
          console.log('New mediaUris:', newUris);
          return newUris;
        });
        if (validAssets.length > 0) {
          setMediaType(
            validAssets[0].type.includes('video') ? 'video' : 'image',
          );
        }
      }
    });
  };

  const openCamera = () => {
    launchCamera({mediaType: 'mixed'}, response => {
      if (response.assets) {
        const validAssets = response.assets.filter(
          asset => asset.uri && asset.type,
        );
        console.log('Valid assets from camera:', validAssets);
        setMediaUris(prevUris => {
          const newUris = [
            ...prevUris,
            ...validAssets.map(asset => ({uri: asset.uri, type: asset.type})),
          ];
          console.log('New mediaUris from camera:', newUris);
          return newUris;
        });
        if (validAssets.length > 0) {
          setMediaType(
            validAssets[0].type.includes('video') ? 'video' : 'image',
          );
        }
      }
    });
  };

  const submitPost = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const selectedCategoryName =
      categories.find(category => category._id === selectedCategory)?.name ||
      '';

    try {
      setLoading(true);
      const mediaUrls = [];
      for (let i = 0; i < mediaUris.length; i++) {
        const media = mediaUris[i];
        console.log('mediaUri', media);
        const fileExtension = media.uri.split('.').pop();
        const fileName = `${Date.now()}_${i}.${fileExtension}`;
        const filePath = media.type.includes('video')
          ? `videos/${fileName}`
          : `images/${fileName}`;
        console.log(`Uploading file ${i + 1}:`, media.uri);
        try {
          const getUploadedFileURL = await uploadFileToFirebase(
            filePath,
            media.uri,
          );
          console.log(`File ${i + 1} uploaded:`, getUploadedFileURL);
          mediaUrls.push(getUploadedFileURL);

          Alert.alert('Success', `File ${i + 1} uploaded successfully!`);
        } catch (uploadError) {
          console.error(`Error uploading file ${i + 1}:`, uploadError);
          Alert.alert(
            'Error',
            `Failed to upload file ${i + 1}. Please try again.`,
          );
        }
      }

      console.log('All media URLs:', mediaUrls);

      if (mediaUrls.length === 0) {
        throw new Error('All media files failed to upload');
      }

      const result = await CreateUserPost(
        text,
        mediaUrls,
        userId,
        selectedCategoryName,
      );
      console.log('Post submitted successfully:', result);
      setLoading(false);
      navigation.navigate('BuzzFeed', {
        refresh: true,
        selectedCategory: selectedCategory,
      });
    } catch (error) {
      console.error('Error submitting post:', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to submit post. Please try again.');
    }
  };

  const handleCategoryChange = itemValue => {
    setSelectedCategory(itemValue);
    console.log('Selected Category:', itemValue);
  };

  const renderMedia = () => {
    console.log('Rendering media, mediaUris:', mediaUris);
    if (mediaUris.length > 0) {
      return mediaUris
        .map((media, index) => {
          console.log(`Rendering media item ${index}:`, media);
          if (!media.uri) {
            console.error(`Media item ${index} has no URI`);
            return null;
          }
          return (
            <View key={index} style={styles.mediaContainer}>
              {media.type.includes('video') ? (
                <Video
                  source={{uri: media.uri}}
                  style={styles.media}
                  controls={true}
                  resizeMode="contain"
                  onError={error =>
                    console.error(
                      `Video error for ${media.uri}:`,
                      error.message,
                    )
                  }
                />
              ) : (
                <Image
                  source={{uri: media.uri}}
                  style={styles.image}
                  onError={error =>
                    console.error(
                      `Image error for ${media.uri}:`,
                      error.nativeEvent.error,
                    )
                  }
                />
              )}
            </View>
          );
        })
        .filter(Boolean); // Remove any null items
    } else {
      return null;
    }
  };

  const renderMediaIcon = () => {
    if (mediaUris.length > 0) {
      return (
        <TouchableOpacity onPress={pickMedia} style={styles.iconButton}>
          <MaterialIcons name="add-a-photo" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Add More</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={pickMedia} style={styles.iconButton}>
          <FontAwesome name="photo" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Add Media</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={25} color={COLORS.Black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create a Post</Text>
        <TouchableOpacity onPress={submitPost} disabled={loading}>
          <Text style={[styles.postButton, loading && styles.disabledButton]}>
            {loading ? 'Posting...' : 'Post'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar backgroundColor={COLORS.green} />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            style={styles.picker} // Apply styles for the Picker
            itemStyle={styles.pickerItem} // Works on iOS for individual items
          >
            <Picker.Item label="Select Category" value="" />
            {categories.map(category => (
              <Picker.Item
                key={category._id}
                label={category.name}
                value={category._id}
              />
            ))}
          </Picker>
        </View>
        {renderMedia()}
        {showTextInput && (
          <TextInput
            style={styles.textInput}
            placeholderTextColor={COLORS.grey}
            placeholder="Say something about this media..."
            value={text}
            onChangeText={setText}
            multiline
          />
        )}
        <TouchableOpacity onPress={submitPost} style={styles.postData}>
          <Text style={styles.postText}>Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        {renderMediaIcon()}
        <TouchableOpacity
          onPress={() => setShowTextInput(!showTextInput)}
          style={styles.iconButton}>
          <AntDesign name="edit" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.iconButton}>
          <MaterialIcons name="camera-alt" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Camera</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    padding: scale(15),
    backgroundColor: COLORS.White,
    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#ddd',
    elevation: scale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.Black,
  },
  scrollViewContent: {
    padding: scale(15),
    flexGrow: 1,
  },
  mediaContainer: {
    width: '100%',
    height: 300,
    borderRadius: moderateScale(10),
    marginBottom: scale(10),
    borderColor: '#ddd',
    borderWidth: moderateScale(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    borderColor: '#ddd',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    padding: scale(10),
    textAlignVertical: 'top',
    fontSize: moderateScale(16),
    backgroundColor: COLORS.White,
    height: 100,
    color: COLORS.Black,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: scale(15),
    borderTopWidth: moderateScale(1),
    borderTopColor: '#ddd',
    backgroundColor: COLORS.White,
  },
  postButton: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.blue,
  },
  iconButton: {
    alignItems: 'center',
    padding: scale(10),
  },
  iconLabel: {
    marginTop: scale(5),
    fontSize: moderateScale(12),
    color: COLORS.Black,
  },
  pickerContainer: {
    marginVertical: scale(15),
    paddingHorizontal: scale(10),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    elevation: scale(2),
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.Black,
  },
  disabledButton: {
    opacity: 0.5,
  },
  postData: {
    backgroundColor: COLORS.blue,
    padding: 10,
    borderRadius: scale(10),
  },
  postText: {
    color: COLORS.White,
    textAlign: 'center',
    fontSize: scale(14),
  },
});
