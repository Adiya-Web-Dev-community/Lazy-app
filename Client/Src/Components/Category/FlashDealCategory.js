import React from 'react';
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { scale, moderateScale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FlashDealCategory = ({ data, handleFlashDealPress }) => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={styles.flashDealItem}
            onPress={() => handleFlashDealPress(item)}
          >
            {item.images && item.images.length > 0 ? (
              <ImageBackground source={{ uri: item.images[0] }} style={styles.flashDealImage}>
                <View style={styles.flashDealTextContainer}>
                  <Text style={styles.flashDealTitle}>{item.name}</Text>
                  <Text style={styles.flashDealTitle}>Good Camera</Text>
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.flashDealImage}>
                <Text>No Image Available</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.FlastBtn}
            onPress={() => handleFlashDealPress(item)}
          >
            <Text style={styles.FlastBtnTxt}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: scale(10),
    padding: scale(10),
    borderRadius: moderateScale(10),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: moderateScale(0.25),
    shadowRadius: 3.84,
    elevation: scale(5),
  },
  flashDealItem: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  flashDealImage: {
    height: scale(170),
    width: scale(170),
    justifyContent: 'flex-end',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  flashDealTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: scale(9),
    
  },
  flashDealTitle: {
    color: COLORS.White,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: moderateScale(13),
  },
  FlastBtn: {
    backgroundColor: COLORS.blue,
    width: scale(175),
    height: scale(28),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent:'center',
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
