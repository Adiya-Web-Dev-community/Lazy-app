import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../Theme/Colors';
import {verticalScale, scale, moderateScale} from '../../utils/Scaling';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwitchMain from '../../Components/Switch/Switch';
import {getProductsByCategory} from '../../api/api';

export default function CategoryDetails({route}) {
  const {item, category} = route.params;
  const navigation = useNavigation();
  const [categoryProducts, setCategoryProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const products = await getProductsByCategory(category.name);
        setCategoryProducts(products);
        // console.log('category ID:', category._id);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category.name]);

  const handlePress = item => {
    navigation.navigate('AllDetails', {productId: item._id});
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.TITILECONATINER}>
        <Text style={styles.TITILETXT}>{category.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.priceText}>{item.price}</Text>
        <AntDesign name="arrowright" size={22} color={COLORS.blue} />
      </View>
      <FlatList
        data={categoryProducts}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => handlePress(item)}>
            {item.images && item.images.length > 0 ? (
              <ImageBackground
                source={{uri: item.images[0]}}
                style={styles.imageBackground}
                resizeMode="cover">
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.imageBackground}>
                <Text style={styles.placeholderText}>No Image Available</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
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
  TITILECONATINER: {
    backgroundColor: COLORS.green,
    padding: scale(10),
    marginHorizontal: scale(10),
    borderRadius: moderateScale(8),
    elevation: verticalScale(5),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  TITILETXT: {
    color: COLORS.White,
    fontWeight: '500',
    fontSize: moderateScale(18),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginHorizontal: scale(10),
    backgroundColor: COLORS.lightGray,
  },
  priceText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.green,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: moderateScale(16),
  },
  cardContainer: {
    margin: scale(10),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    elevation: verticalScale(5),
    backgroundColor: COLORS.White,
    width: scale(155),
    height: verticalScale(150),
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(150),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    padding: scale(5),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  placeholderText: {
    color: COLORS.darkGray,
    fontSize: moderateScale(16),
    textAlign: 'center',
    padding: scale(10),
  },
});
