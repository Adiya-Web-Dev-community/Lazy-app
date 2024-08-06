import React from 'react';
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FlashDealCategory = ({data, handleFlashDealPress}) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.cardContainer}>
          <View style={styles.flashDealItem}>
            <ImageBackground source={item.Img} style={styles.flashDealImage}>
              <View style={styles.flashDealTextContainer}>
                <Text style={styles.flashDealTitle}>{item.title}</Text>
              </View>
            </ImageBackground>
          </View>
          <TouchableOpacity
            style={styles.FlastBtn}
            onPress={() => handleFlashDealPress(item)}>
            <Text style={styles.FlastBtnTxt}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(10),
    padding: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: '#EBF5FB',
    shadowColor: '#000',
    shadowOpacity: moderateScale(0.25),
    shadowRadius: 3.84,
    elevation: scale(5),
    bottom: scale(10),
  },
  flashDealItem: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  flashDealImage: {
    height: scale(170),
    width: scale(170),
    justifyContent: 'flex-end',
    borderRadius: moderateScale(5),
    overflow: 'hidden',
  },
  flashDealTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: scale(9),
    top: scale(10),
  },
  flashDealTitle: {
    color: COLORS.White,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: scale(5),
    fontSize: moderateScale(13),
  },
  FlastBtn: {
    backgroundColor: COLORS.green,
    width: scale(175),
    height: scale(28),
    alignItems: 'center',
    alignSelf: 'center',
    margin: scale(5),
    borderRadius: moderateScale(8),
  },
  FlastBtnTxt: {
    color: COLORS.White,
    paddingVertical: 4,
    fontWeight: 'bold',
  },
});

export default FlashDealCategory;
