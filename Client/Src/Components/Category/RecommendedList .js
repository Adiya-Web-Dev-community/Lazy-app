import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import {scale, moderateScale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

const RecommendedList = ({data, handlePress}) => {
  console.log(data, "this is data");
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
          <Image
            resizeMethod="contain"
            source={{uri: item.images[0]}} // Use the first image URL from the API response
            style={styles.image}
          />
          <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item._id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#D1F2EB',
    marginHorizontal: scale(10),
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(10),
    elevation: 5,
  },
  item: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: moderateScale(7),
    padding: scale(5),
    width: scale(158),
    marginRight: scale(10),
    backgroundColor: COLORS.White,
    elevation: scale(5),
    marginVertical: verticalScale(10),
    marginHorizontal: moderateScale(10),
  },
  image: {
    width: scale(138),
    height: scale(138),
    marginVertical: verticalScale(5),
    borderRadius: moderateScale(10),
  },
  title: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RecommendedList;
