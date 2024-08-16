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
  const placeholderImageURL =
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2FIndiaToday%2Fstatus%2F1394663687185522702&psig=AOvVaw2DxAZE_alyY-Wi3yj3_42s&ust=1723702248714000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKjM_LPp84cDFQAAAAAdAAAAABAE'; // Example placeholder URL

  return (
    <FlatList
      data={data}
      style={styles.list}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
          {/* {item.images && item.images.length > 0 ? (
            <Image
              source={{
                uri: item.images[0] || require('../../Screen/assets/Asus2.jpg'),
              }}
              style={styles.image}
            />
            
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )} */}
          <Image
            source={require('../../Screen/assets/mackbook.jpg')}
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
    width: scale(158),
    margin: scale(3),
    backgroundColor: COLORS.White,
    marginVertical: verticalScale(5),
    paddingVertical: verticalScale(10),
    elevation: scale(15),
  },
  image: {
    width: scale(138),
    height: scale(138),
    marginBottom: scale(5),
  },
  title: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RecommendedList;
