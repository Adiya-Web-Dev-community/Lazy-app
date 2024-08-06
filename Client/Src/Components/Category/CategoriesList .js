import React from 'react';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

const CategoriesList = ({categories, handleCategoryPress}) => {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => handleCategoryPress(item)}>
          <Image
            source={
              item.image
                ? {uri: item.image}
                : require('../../Screen/assets/Books.jpg')
            }
            style={styles.categoryImg}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.categoryTitle}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    margin: scale(5),
    alignItems: 'center',
  },
  categoryImg: {
    height: scale(70),
    width: scale(70),
    borderRadius: moderateScale(100),
    margin: scale(5),
    borderColor: COLORS.Black,
    overflow: 'hidden',
  },
  categoryTitle: {
    width: scale(80),
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(12),
  },
});

export default CategoriesList;
