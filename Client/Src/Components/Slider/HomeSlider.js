import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {scale, moderateScale, verticalScale} from '../../utils/Scaling';

const {width} = Dimensions.get('window');

const initialData = [
  {id: 1, image: require('../../Screen/assets/laptop.jpg')},
  {id: 2, image: require('../../Screen/assets/mackbook.jpg')},
  {id: 3, image: require('../../Screen/assets/laptop.jpg')},
];

const HomeSlider = () => {
  const [data] = useState(initialData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
      setCurrentIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  const renderItem = ({item}) => (
    <Image source={item.image} style={styles.image} />
  );

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  return (
    <View>
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
        {data.map((_, i) => (
          <View
            key={i.toString()}
            style={[styles.dot, currentIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(150),
    marginTop: scale(10),
  },
  image: {
    width: width - 25,
    height: '97%',
    resizeMode: 'cover',
    marginHorizontal: scale(10),
    borderRadius: moderateScale(10),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  dot: {
    height: scale(10),
    width: scale(10),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.blue,
  },
});

export default HomeSlider;
