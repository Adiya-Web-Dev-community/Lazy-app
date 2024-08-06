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
  return (
    <FlatList
      data={data}
      style={styles.list}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
          <Image source={item.Img} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#D1F2EB',
    marginHorizontal: scale(10),
    borderRadius: moderateScale(5),
  },
  row: {
    justifyContent: 'space-around',
  },
  item: {
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(7),
    padding: scale(5),
    width: scale(150),
    margin: scale(3),
    backgroundColor: COLORS.White,
    marginVertical: verticalScale(5),
    paddingVertical: verticalScale(5),
    elevation: scale(15),
  },
  image: {
    width: scale(129),
    height: scale(110),
    marginBottom: scale(5),
  },
  title: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RecommendedList;
