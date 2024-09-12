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

export default function UserPostScreen({navigation}) {
  const [imageUris, setImageUris] = useState([]);
  const [text, setText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userData = await getRegisterdetails();
        const fetchedUserId = userData.data._id;
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

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 0}, response => {
      if (response.assets) {
        setImageUris(prevUris => [
          ...prevUris,
          ...response.assets.map(asset => asset.uri),
        ]);
      }
    });
  };

  const openCamera = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets) {
        setImageUris(prevUris => [
          ...prevUris,
          ...response.assets.map(asset => asset.uri),
        ]);
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
      const imageUrl = imageUris.length > 0 ? imageUris[0] : '';
      const result = await CreateUserPost(
        text,
        imageUrl,
        userId,
        selectedCategoryName,
      );
      console.log('Post submitted successfully:', result);
      // Pass the selected category to BuzzFeed screen
      navigation.navigate('BuzzFeed', {
        refresh: true,
        selectedCategory: selectedCategory,
      });
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  const handleCategoryChange = itemValue => {
    setSelectedCategory(itemValue);
    console.log('Selected Category:', itemValue);
  };

  const renderImageIcon = () => {
    if (imageUris.length > 0) {
      return (
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <MaterialIcons name="add-a-photo" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Add More</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
          <FontAwesome name="photo" size={24} color={COLORS.Black} />
          <Text style={styles.iconLabel}>Add Photo</Text>
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
        <TouchableOpacity onPress={submitPost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar backgroundColor={COLORS.green} />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            style={styles.picker}>
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
        {imageUris.map((uri, index) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))}
        {showTextInput && (
          <TextInput
            style={styles.textInput}
            placeholder="Say something about this photo..."
            value={text}
            onChangeText={setText}
            multiline
          />
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        {renderImageIcon()}
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
    marginBottom: scale(10),
    borderColor: '#ddd',
    borderWidth: moderateScale(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  },
});
