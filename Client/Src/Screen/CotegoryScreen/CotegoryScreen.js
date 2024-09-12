import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SwitchMain from '../../Components/Switch/Switch';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import HomeSlider from '../../Components/Slider/HomeSlider';

const CotegoryScreen = ({navigation, route}) => {
  const {category} = route.params;

  const data = [
    {id: 1, price: 'Below 10k'},
    {id: 2, price: 'Below 20k'},
    {id: 3, price: 'Below 30k'},
    {id: 4, price: 'Below 40k'},
    {id: 5, price: 'Below 50k'},
    {id: 6, price: 'Below 60k'},
    {id: 7, price: 'Below 70k'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTxt}>{category.name}</Text>
      <View style={styles.cardsContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cotegroyCards}
              onPress={() =>
                navigation.navigate('CategoryDetails', {item, category})
              }>
              <Text style={styles.cotegroytxt}>{item.price}</Text>
            </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>
      <HomeSlider />
    </View>
  );
};

export default CotegoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: verticalScale(5),
  },
  logo: {
    height: scale(50),
    width: scale(135),
  },
  FeedBtn: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    elevation: verticalScale(5),
  },
  FeedBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  headerTxt: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.White,
    marginBottom: verticalScale(10),
    textAlign: 'center',
    backgroundColor: COLORS.blue,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  cotegroyCards: {
    width: scale(100),
    height: scale(100),
    backgroundColor: COLORS.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    elevation: verticalScale(3),
    marginHorizontal: moderateScale(7),
    marginVertical: verticalScale(7),
  },
  cardsContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.blue,
  },
  cotegroytxt: {
    fontSize: moderateScale(17),
  },
});
