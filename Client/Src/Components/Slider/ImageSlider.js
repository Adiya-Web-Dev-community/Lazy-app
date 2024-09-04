import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../../Theme/Colors';
import {scale, moderateScale, verticalScale} from '../../utils/Scaling';
import { UploadImage} from '../../api/api';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

const initialData = [
  {id: 1, image: require('../../Screen/assets/Books.jpg')},
  {id: 2, image: require('../../Screen/assets/laptop.jpg')},
  {id: 3, image: require('../../Screen/assets/mackbook.jpg')},
  {id: 'button'},
];

const ImageSlider = ({productId}) => {
  const [data, setData] = useState(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        const newImageUri = response.assets[0].uri;
        if (!productId) {
          console.error('No product ID provided');
          return;
        }
        try {
          const UpdateImg = await UploadImage(productId, newImageUri);
          const newImage = {
            id: data.length,
            image: {uri: newImageUri},
          };
          setData([...data, newImage]);
          console.log('images Uri',newImageUri)
          console.log('Upload image successfully:', UpdateImg);
        } catch (error) {
          console.error('Error Upload image image:', error);
        }
      }
    });
  };

  const renderItem = ({item}) => {
    if (item.id === 'button') {
      return (
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <View style={styles.plusIcon} >
          <Icon name="plus" size={30} color={COLORS.blue} />

          </View>
          
          <Text style={styles.buttonText}>Add More Image</Text>
        </TouchableOpacity>
      );
    }
    return <Image source={item.image} style={styles.image} />;
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <View style={{flex:1}}>
      <View style={styles.container}>

     
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
      />
    
    </View>
    <View style={styles.pagination}>
        {data.map((_, i) => {
          if (i === data.length - 1) return null;
          return (
            <View
              key={i.toString()}
              style={[styles.dot, currentIndex === i && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(150),
    marginVertical: verticalScale(20),
  },
  image: {
    width: width - 35,
    height: '95%',
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(15),
  },
  button: {
    width: width - 35,
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(4),
    backgroundColor: COLORS.White,
    borderWidth: moderateScale(1),
  
    borderRadius: moderateScale(8),
    borderColor: COLORS.blue,
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color:COLORS.Black
  },
  pagination: {
    flexDirection: 'row',
    
   marginVertical:verticalScale(5),
    alignSelf: 'center',
  },
  dot: {
    height: scale(10),
    width: scale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.grey,
    marginHorizontal: scale(5),
    bottom: scale(10),
  },
  activeDot: {
    height: scale(10),
    width: scale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.blue,
  },
  plusIcon:{
    backgroundColor:'#fff',
    
    width:scale(30),
    height:scale(30),
    alignItems:'center',
    justifyContent:'center',
    borderWidth:moderateScale(1),
    borderRadius:moderateScale(25),
    borderColor:COLORS.blue
  }
});

export default ImageSlider;
