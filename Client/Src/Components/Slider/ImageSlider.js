  import React, { useRef, useState } from 'react';
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
  import { launchImageLibrary } from 'react-native-image-picker';
 import { COLORS } from '../../Theme/Colors';
  import { scale,moderateScale,verticalScale } from '../../utils/Scaling';

  const { width } = Dimensions.get('window');

  const initialData = [
    { id: 1, image: require('../../Screen/assets/Books.jpg') },
    { id: 2, image: require('../../Screen/assets/laptop.jpg') },
    { id: 3, image: require('../../Screen/assets/mackbook.jpg') },
    { id: 'button' },
  ];

  const ImageSlider = () => {
    const [data, setData] = useState(initialData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleSelectImage = () => {
      launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets) {
          const newImage = {
            id: data.length,
            image: { uri: response.assets[0].uri },
          };
          setData([...data, newImage]);
        }
      });
    };

    const renderItem = ({ item }) => {
      if (item.id === 'button') {
        return (
          <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
            <Text style={styles.buttonText}>Add More Image</Text>
          </TouchableOpacity>
        );
      }
      return <Image source={item.image} style={styles.image} />;
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    });

    return (
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
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View style={styles.pagination}>
          {data.map((_, i) => {
            if (i === data.length - 1) return null; 
            return (
              <View
                key={i.toString()}
                style={[
                  styles.dot,
                  currentIndex === i && styles.activeDot,
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      height: verticalScale(200),
      marginVertical: verticalScale(20),
    },
    image: {
      width: width - 40,
      height: '100%',
      resizeMode: 'cover',
      marginHorizontal: scale(9),
    },
    button: {
      width: width - 45,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: scale(7),
      backgroundColor: COLORS.White,
      borderWidth: moderateScale(1),
      borderStyle: 'dotted',
      borderRadius: moderateScale(8),
      borderColor: COLORS.green,
    },
    buttonText: {
      fontSize: moderateScale(18),
      fontWeight: 'bold',
    },
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: verticalScale(10),
      alignSelf: 'center',
    },
    dot: {
      height:scale (11),
      width:scale (11),
      borderRadius:moderateScale (10), 
      backgroundColor: COLORS.Black, 
      marginHorizontal: 5,
    },
    activeDot: {
      height:scale (11),
      width:scale (11),
      borderRadius:moderateScale (10), 
      backgroundColor: COLORS.White, 
    },
  });

  export default ImageSlider;
