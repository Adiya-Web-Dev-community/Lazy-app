import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  BackHandler,
  FlatList,
  Linking,
  useWindowDimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import shoppingApp from './Data';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlashDealsData from './FlashDealsData';
import {WebView} from 'react-native-webview';
import RecommendedData from './RecommendedData';
import {useIsFocused} from '@react-navigation/native';
import ImageSlider from '../../Components/Slider/ImageSlider';
import FlatLisItem from '../../Components/FlatList/FlatLisItem';
import {
  getCategories,
  getProductsByCategory,
  getProductById,
  getFlashDeals,
  getRecommended,
} from '../../api/api';
import CategoriesList from '../../Components/Category/CategoriesList ';
import HomeSlider from '../../Components/Slider/HomeSlider';
import SectionHeader from '../../Components/SectionHeader/SectionHeader ';
import RenderHTML from 'react-native-render-html';
import FlashDealCategory from '../../Components/Category/FlashDealCategory';
import RecommendedList from '../../Components/Category/RecommendedList ';
import Switch from '../../Components/Switch/Switch';
import SwitchMain from '../../Components/Switch/Switch';
import TrustedGrid from './TrustedGride';
import {getRequest} from '../../api/APIManager';

export default function Home({navigation}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFlashDeal, setSelectedFlashDeal] = useState(null);
  const [selectedRecommended, setSelectedRecommended] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [recomendedDeals, setRecomendedDeals] = useState([]);
  const Categoriess = shoppingApp.Categories;
  const FlashDeals = FlashDealsData.FlashDeals;
  const Recommended = RecommendedData.Recommended;
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingMobile, setLoadingMobile] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      setLoadingRecommended(false);
    }, 10000);

    setTimeout(() => {
      setLoadingMobile(false);
    }, 10000);
  }, []);
  useEffect(() => {
    getRequest('/api/user/category');
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data.success) {
          setCategories(data.data);
          // console.log('Fetched Categories:', data.data);
        } else {
          console.log('Failed to fetch categories');
        }
      } catch (error) {
        console.log('Network Error:', error.message);
        Alert.alert(
          'Error',
          'Unable to fetch categories. Please try again later.',
        );
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFlashDeals = async () => {
      try {
        const data = await getFlashDeals();
        if (data) {
          setFlashDeals(data);
          // console.log('Fetched Flash Deals:', data);
        } else {
          console.log('No flash deals data');
        }
      } catch (error) {
        console.log('Error fetching flash deals:', error.message);
        Alert.alert(
          'Error',
          'Unable to fetch details. Please try again later.',
        );
      }
    };

    fetchFlashDeals();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const data = await getRecommended();
        if (data) {
          setRecomendedDeals(data);
          // console.log('Fetched Recommended Deals:', data);
        } else {
          console.log('No recommended deals data');
        }
      } catch (error) {
        console.log('Error fetching recommended deals:', error.message);
      }
    };

    fetchRecommended();
  }, []);

  const renderHTMLContent = () => {
    if (Array.isArray(selectedItem.feature)) {
      return selectedItem.feature
        .map(feature => <p>${JSON.stringify(feature)}</p>)
        .join('');
    }
    return selectedItem.feature || '';
  };

  const handleFlashDealPress = flashDeal => {
    setSelectedFlashDeal(flashDeal);
  };

  const handleRecommendedPress = item => {
    setSelectedRecommended(item);
  };

  const handleBackPress = () => {
    setSelectedItem(null);
  };
  useEffect(() => {
    const handleBackPress = () => {
      if (selectedItem || selectedFlashDeal || selectedRecommended) {
        // Handle back press within Home screen
        if (selectedItem) {
          setSelectedItem(null);
          return true; // Prevent default back behavior
        }
        if (selectedFlashDeal) {
          setSelectedFlashDeal(null);
          return true;
        }
        if (selectedRecommended) {
          setSelectedRecommended(null);
          return true;
        }
      } else if (isFocused) {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'OK', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [selectedItem, selectedFlashDeal, selectedRecommended, isFocused]);

  const handleCategoryPress = async category => {
    navigation.navigate('CotegoryScreen', {category});

    try {
      const response = await getProductsByCategory(category.name);
      if (response && Array.isArray(response)) {
        const products = response.map(product => ({
          id: product._id,
          name: product.name,
          description: product.description || '',
          images: product.images || [],
          status: product.status,
          updatedAt: product.updatedAt,
        }));
        setCategoryProducts(products);
        // console.log(
        //   `Fetched products for category ${category.name}:`,
        //   products,
        // );
      } else {
        console.log(
          'Invalid response format from getProductsByCategory:',
          response,
        );
      }
    } catch (error) {
      console.log('Error fetching category products:', error.message);
    }
  };

  const renderIcons = () => {
    if (!selectedItem || !selectedItem.productsLink) {
      return null;
    }
    const iconMap = {
      'Note bookes': 'book',
      amazon: 'amazon',
      'Material Mobile': 'mobile1',
      Flipkart: 'shoppingcart',
    };

    return selectedItem.productsLink.map((link, index) => (
      <TouchableOpacity
        key={index}
        style={styles.iconButton}
        onPress={() => handleIconPress(link.url)}>
        <AntDesign
          name={iconMap[link.company] || 'questioncircle'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
    ));
  };

  const renderFlashDealIcons = () => {
    if (!selectedFlashDeal || !selectedFlashDeal.productsLink) {
      return null;
    }

    const iconMap = {
      'Note bookes': 'book',
      amazon: 'amazon',
      'Material Mobile': 'mobile1',
      Flipkart: 'shoppingcart',
    };

    return selectedFlashDeal.productsLink.map((link, index) => (
      <TouchableOpacity
        key={index}
        style={styles.iconButton}
        onPress={() => handleIconPress(link.url)}>
        <AntDesign
          name={iconMap[link.company] || 'questioncircle'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
    ));
  };

  const renderRecommandedIcons = () => {
    if (!selectedRecommended || !selectedRecommended.productsLink) {
      return null;
    }

    const iconMap = {
      'Note bookes': 'book',
      amazon: 'amazon',
      'Material Mobile': 'mobile1',
      Flipkart: 'shoppingcart',
    };

    return selectedRecommended.productsLink.map((link, index) => (
      <TouchableOpacity
        key={index}
        style={styles.iconButton}
        onPress={() => handleIconPress(link.url)}>
        <AntDesign
          name={iconMap[link.company] || 'questioncircle'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
    ));
  };

  const handleIconPress = url => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.green} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedCategory && !selectedFlashDeal && !selectedRecommended && (
          <View style={styles.SeachContainer}>
            <TextInput
              placeholder="Search products..."
              vishvaa
              placeholderTextColor={COLORS.Black}
              style={styles.SearchInp}
            />
            <AntDesign
              name="search1"
              color={COLORS.Black}
              size={24}
              style={{right: 15}}
            />
          </View>
        )}
        {!selectedCategory && !selectedFlashDeal && !selectedRecommended && (
          <View>
            <View style={styles.TITLEBTNCONTAINER}>
              <Image
                source={require('../assets/L1.png')}
                style={{height: 60, width: 159}}
              />
              <View>
                <SwitchMain />
              </View>
              <TouchableOpacity
                style={styles.FeedBtn}
                onPress={() => navigation.navigate('BuzzFeed')}>
                <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
              </TouchableOpacity>
            </View>
            <TrustedGrid navigation={navigation} />
            <HomeSlider />
            <WebView
              source={{uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k'}}
              javaScriptEnabled={true}
              style={styles.webview}
           
            />
          </View>
        )}
        {!selectedItem && !selectedFlashDeal && !selectedRecommended && (
          <CategoriesList
            categories={Categories}
            handleCategoryPress={handleCategoryPress}
          />
        )}
        {selectedItem && (
          <ScrollView style={styles.itemDetails}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color={COLORS.Black} />
            </TouchableOpacity>
            <Text style={styles.itemName}>{selectedItem.name}</Text>
            <ImageSlider productId={selectedItem?._id} />
            <View style={styles.ICONROW}>{renderIcons()}</View>
            <RenderHTML
              contentWidth={styles.container.width}
              source={{html: selectedItem.description}}
              baseStyle={styles.DescriptionTxt}
            />
            <Text style={styles.Description2Txt}>
              {selectedItem.Description2}
            </Text>
            <Image source={{uri: selectedItem.images[0]}} style={styles.Img2} />

            <RenderHTML
              contentWidth={scale(400)}
              source={{html: renderHTMLContent()}}
              baseStyle={{
                marginHorizontal: scale(10),
                color: COLORS.Black,
                padding: scale(5),
              }}
            />
            <View style={styles.BottomBtnContainer}>
              {selectedItem.productsLink.map((link, index) => (
                <View style={styles.ImgndBtn} key={index}>
                  <Image
                    source={
                      link.image
                        ? {uri: link.image}
                        : require('../assets/Logo1.webp')
                    }
                    style={styles.Bottoming}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity
                      style={styles.BottomBtn}
                      onPress={() => Linking.openURL(link.url)}>
                      <Text style={styles.BottomBtnTxt}>BUY NOW</Text>
                    </TouchableOpacity>
                    <Text style={styles.Companytxt}>({link.company})</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <>
            <SectionHeader title="Flash Deals" />
            <FlashDealCategory
              data={flashDeals}
              handleFlashDealPress={handleFlashDealPress}
            />
          </>
        )}
        {selectedFlashDeal && (
          <ScrollView style={styles.itemDetails}>
            <TouchableOpacity
              onPress={() => setSelectedFlashDeal(null)}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color={COLORS.green} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.Black,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {selectedFlashDeal.category}
            </Text>
            <ImageSlider productId={selectedFlashDeal?._id} />
            <View style={styles.ICONROW}>{renderFlashDealIcons()}</View>

            <RenderHTML
              contentWidth={scale(360)}
              source={{html: selectedFlashDeal.description}}
              baseStyle={styles.htmlContents}
            />
            <RenderHTML
              contentWidth={scale(360)}
              baseStyle={styles.htmlContent}
              source={{html: selectedFlashDeal.feature}}
            />

            <View style={styles.BottomBtnContainer}>
              {selectedFlashDeal.company.map((link, index) => (
                <View style={styles.ImgndBtn} key={index}>
                  <Image
                    source={
                      link.image
                        ? {uri: link.image}
                        : require('../assets/Logo1.webp')
                    }
                    style={styles.Bottoming}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity
                      style={styles.BottomBtn}
                      onPress={() => Linking.openURL(link.url)}>
                      <Text style={styles.BottomBtnTxt}>BUY NOW</Text>
                    </TouchableOpacity>
                    <Text style={styles.Companytxt}>({link.name})</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <View>
            <Image
              source={require('../assets/banner2.webp')}
              style={styles.BannerImg}
            />
            <View style={styles.HowItContainer}>
              <Text style={styles.HowItTxt}>How it works?</Text>
            </View>
            <SectionHeader title="Recommended" />
            {loadingRecommended ? (
              <ActivityIndicator size="large" color={COLORS.blue} />
            ) : (
              <RecommendedList
                data={recomendedDeals}
                handlePress={handleRecommendedPress}
              />
            )}
          </View>
        )}
        {selectedRecommended && (
          <ScrollView style={styles.itemDetails}>
            <TouchableOpacity
              onPress={() => setSelectedFlashDeal(null)}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color={COLORS.Black} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.Black,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {selectedRecommended.category}
            </Text>
            <ImageSlider productId={selectedRecommended?._id} />
            <View style={styles.ICONROW}>{renderRecommandedIcons()}</View>
            <View style={{marginHorizontal: scale(15)}}>
              <RenderHTML
                source={{html: selectedRecommended.description}}
                contentWidth={scale(360)}
                baseStyle={styles.htmlContent}
              />
            </View>
            <View style={{marginHorizontal: scale(15)}}>
              <RenderHTML
                source={{html: selectedRecommended.feature}}
                contentWidth={scale(360)}
                baseStyle={styles.htmlContent}
              />
            </View>

            <View style={styles.BottomBtnContainer}>
              {selectedRecommended.company.map((link, index) => (
                <View style={styles.ImgndBtn} key={index}>
                  <Image
                    source={
                      link.image
                        ? {uri: link.image}
                        : require('../assets/Logo1.webp')
                    }
                    style={styles.Bottoming}
                  />
                  <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity
                      style={styles.BottomBtn}
                      onPress={() => Linking.openURL(link.url)}>
                      <Text style={styles.BottomBtnTxt}>BUY NOW</Text>
                    </TouchableOpacity>
                    <Text style={styles.Companytxt}>({link.name})</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}

        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <View>
            <View style={styles.SectionHeader}>
              <Text style={styles.FlashDealsTxt}>Mobile</Text>
              <TouchableOpacity
                style={styles.ViewAllButton}
                onPress={() => {
                  navigation.navigate('CotegoryScreen');
                }}>
                <Text style={styles.FlashDealsTxts}>View All</Text>
              </TouchableOpacity>
            </View>

            {loadingMobile ? (
              <ActivityIndicator size="large" color={COLORS.blue} />
            ) : (
              <FlashDealCategory
                data={flashDeals}
                handleFlashDealPress={handleFlashDealPress}
              />
            )}
          </View>
        )}
          <Image
              source={require('../assets/banner2.webp')}
              style={styles.BannerImg}
            />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  content: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
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
  TITLEBTNCONTAINER: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: verticalScale(20),
  },
  TrustedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
  },
  TrustedBox: {
    flex: 1,
    borderWidth: moderateScale(1),
    marginHorizontal: scale(5),
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    backgroundColor: COLORS.green,
    padding: scale(2),
    paddingHorizontal: 5,
  },
  TrustedTxt: {
    color: COLORS.White,
    textAlign: 'center',
  },
  detailItem: {
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: scale(10),
    width: scale(160),
    backgroundColor: COLORS.White,
    elevation: scale(5),
  },
  detailImage: {
    width: scale(155),
    height: verticalScale(100),
    marginBottom: scale(5),
  },
  itemDetails: {
    backgroundColor: COLORS.White,
  },
  BannerImg: {
    height: verticalScale(150),
    width: scale(330),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(10),
  },
  ViewAllButton: {
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(15),
    justifyContent: 'center',
  },
  SearchInp: {
    paddingVertical: verticalScale(1),
    paddingHorizontal: moderateScale(15),
    fontSize: scale(12),
    color: COLORS.Black,
  },

  ViewAllIcon: {
    right: scale(12),
  },
  itemName: {
    margin: scale(5),
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    color: COLORS.Black,
    textAlign: 'center',
  },
  itemimg: {
    height: scale(320),
    width: scale(350),
  },

  DescriptionTxt: {
    fontWeight: 'bold',
    color: COLORS.Black,
    fontSize: moderateScale(15),
    textAlign: 'center',
  },
  Description2Txt: {
    textAlign: 'center',
    fontSize: moderateScale(15),
  },
  Img2: {
    height: scale(325),
    width: scale(325),
    alignSelf: 'center',
    marginVertical: verticalScale(20),
  },
  itemtxt: {
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    justifyContent: 'space-around',
    width: '100%',
    height: scale(40),
  },
  itemtxts: {
    color: COLORS.Black,
    textAlignVertical: 'center',
  },

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
    flex: 1,
    color: COLORS.White,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: scale(5),
    fontSize: moderateScale(13),
  },
  recommendedItem: {
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: scale(5),
    width: scale(150),
    margin: scale(3),
    backgroundColor: COLORS.White,
    marginVertical: verticalScale(5),
  },
  recommendedImage: {
    width: scale(129),
    height: scale(110),
    marginBottom: scale(5),
  },
  recommendedTitle: {
    color: COLORS.Black,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: scale(10),
    alignSelf: 'flex-start',
  },
  iconButton: {
    backgroundColor: COLORS.green,
    borderRadius: moderateScale(100),
    padding: scale(10),
  },
  icon: {
    color: COLORS.White,
  },
  RecommendedTxt: {
    color: COLORS.green,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginVertical: verticalScale(2),
    marginVertical: verticalScale(15),
  },
  HowItTxt: {
    textAlign: 'center',
    color: COLORS.White,
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(6),
    fontWeight: '500',
  },
  HowItContainer: {
    margin: scale(5),
    height: scale(35),
    top: scale(10),
    marginHorizontal: scale(10),
    backgroundColor: COLORS.blue,
    borderRadius: moderateScale(10),
    elevation: verticalScale(5),
    justifyContent: 'center',
  },

  SectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
    marginVertical: verticalScale(12),
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
    paddingVertical: verticalScale(4),
    fontWeight: 'bold',
  },
  FlashDealsTxt: {
    color: COLORS.Black,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginVertical: verticalScale(2),
  },
  FlashDealsTxts: {
    color: COLORS.White,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(17),
    fontWeight: '500',
  },
  SeachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'fff',
    justifyContent: 'space-between',
    width: '95%',
    height: scale(37),
    marginTop: scale(10),
    borderRadius: moderateScale(10),
    borderWidth: scale(1),
    borderColor: COLORS.blue,
  },
  ICONROW: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  BottomBtnContainer: {
    marginTop: scale(70),
    borderTopWidth: scale(0.5),
    paddingVertical: verticalScale(10),
  },
  BottomTxt: {
    width: scale(100),
    color: COLORS.Black,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  BottomBtn: {
    backgroundColor: COLORS.green,
    width: scale(140),
    height: scale(35),
    borderRadius: moderateScale(5),
    marginVertical: verticalScale(10),
    marginHorizontal: scale(5),
    alignSelf: 'center',
  },
  BottomBtnTxt: {
    textAlign: 'center',
    color: COLORS.White,
    paddingVertical: verticalScale(8),
  },
  Companytxt: {
    color: COLORS.Black,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(17),
  },
  Bottoming: {
    height: scale(125),
    width: scale(125),
    borderRadius: moderateScale(5),
  },
  ImgndBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: scale(10),
  },
  FlashDealDescription: {
    color: COLORS.Black,
    fontSize: moderateScale(18),
    textAlign: 'center',
    width: scale(225),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  FlashDealDescription2: {
    textAlign: 'center',
    paddingVertical: verticalScale(15),
    color: COLORS.Black,
    fontSize: moderateScale(15),
    paddingHorizontal: scale(18),
  },
  FlashImg: {
    height: scale(300),
    width: scale(250),
    alignSelf: 'center',
  },
  htmlContent: {
    fontSize: scale(14),
    color: COLORS.Black,
    marginBottom: scale(10),
  },
  htmlContents: {
    fontSize: scale(14),
    color: COLORS.Black,
    padding: scale(10),
    marginHorizontal: scale(10),
    marginBottom: scale(10),
    lineHeight: scale(24),
  },
  webview: {
    height: verticalScale(200),
    width: scale(320),
    marginTop: scale(10),
    alignSelf: 'center',
    marginHorizontal: scale(14),
  },
});
