import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';

const CommanCateogry = ({data, onPress}) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={()=>onPress(item)}>
          <ImageBackground source={item.Img} style={styles.imageBackground}>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <Text style={styles.description}>{item.Description}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: scale(10),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    elevation: verticalScale(5),
    backgroundColor: COLORS.White,
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(150),
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: scale(3),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.blue,
    marginBottom: scale(2),
  },
  title: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  description: {
    color: COLORS.White,
    fontSize: moderateScale(14),
  },
});

export default CommanCateogry;
