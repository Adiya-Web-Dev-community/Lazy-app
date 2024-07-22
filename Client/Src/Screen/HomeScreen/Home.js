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
} from 'react-native';
import shoppingApp from './Data';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlashDealsData from './FlashDealsData';
import {WebView} from 'react-native-webview';
import RecommendedData from './RecommendedData';
import Table from '../../Components/Table/Table';
import ImageSlider from '../../Components/Slider/ImageSlider';
import CategoryTable from '../../Components/Table/CategoryTable';
import FlatLisItem from '../../Components/FlatList/FlatLisItem';
import {
  getCategories,
  getProductsByCategory,
  getProductById,
} from '../../api/api';
import CategoriesList from '../../Components/Category/CategoriesList ';
import HomeSlider from '../../Components/Slider/HomeSlider';
import SectionHeader from '../../Components/SectionHeader/SectionHeader ';
import RenderHTML from 'react-native-render-html';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFlashDeal, setSelectedFlashDeal] = useState(null);
  const [selectedRecommended, setSelectedRecommended] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const Categoriess = shoppingApp.Categories;
  const FlashDeals = FlashDealsData.FlashDeals;
  const Recommended = RecommendedData.Recommended;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data.success) {
          setCategories(data.data);
          console.log('Fetched Categories:', data.data);
        } else {
          console.log('Failed to fetch categories');
        }
      } catch (error) {
        console.log('Network Error:', error.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (selectedCategory || selectedFlashDeal || selectedRecommended) {
        setSelectedCategory(null);
        setSelectedFlashDeal(null);
        setSelectedRecommended(null);
        setSelectedItem(null);
        return true;
      } else {
        Alert.alert('Exit', 'Are you sure v you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [selectedCategory, selectedFlashDeal, selectedRecommended]);

  // const handleItemPress = item => {
  //   if (selectedItem?.itemName === item.itemName) {
  //     setSelectedItem(null);
  //   } else {
  //     setSelectedItem(item);
  //   }
  // };

  // const handleItemPress = async item => {
  //   try {
  //     const productDetails = await getProductById(item.id);
  //     setSelectedItem(productDetails);
  //     console.log('Product details', productDetails);
  //   } catch (error) {
  //     console.log('Error fetching product details:', error.message);
  //   }
  // };

  const handleItemPress = async item => {
    try {
      const productDetails = await getProductById(item.id);
      if (productDetails) {
        productDetails.feature = productDetails.feature || [];
        productDetails.description = productDetails.description  || [];
        
        console.log('Table', productDetails.feature);
        console.log('description', productDetails.description);
        setSelectedItem(productDetails);
        // console.log('Product details', productDetails);
      }
    } catch (error) {
      console.log('Error fetching product details:', error.message);
    }
  };

  const handleFlashDealPress = deal => {
    setSelectedFlashDeal(deal);
    setSelectedItem(deal.details[0]);
  };

  const handleRecommendedPress = item => {
    setSelectedRecommended(item);
    setSelectedItem(item.details[0]);
  };

  const handleBackPress = () => {
    setSelectedItem(null);
  };

  const handleCategoryPress = async category => {
    setSelectedCategory(category);
    setSelectedItem(null);
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
        console.log(
          `Fetched products for category ${category.name}:`,
          products,
        );
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

  const handleIconPress = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {!selectedCategory && !selectedFlashDeal && !selectedRecommended && (
          <HomeSlider />
        )}
        {!selectedItem && (
          <CategoriesList
            categories={Categories}
            handleCategoryPress={handleCategoryPress}
          />
        )}
        {selectedCategory && !selectedItem && (
          <>
            <FlatList
              data={categoryProducts}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.detailItem}
                  onPress={() => handleItemPress(item)}>
                  <Image
                    source={
                      item.images && item.images.length > 0
                        ? {uri: item.images[0]}
                        : require('../assets/banner.jpg')
                    }
                    style={styles.detailImage}
                  />
                  <Text style={{color: COLORS.Black}}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </>
        )}
        {selectedItem && (
          <View style={styles.itemDetails}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color={COLORS.Black} />
            </TouchableOpacity>
            <Text style={styles.itemName}>{selectedItem.name}</Text>
            <ImageSlider />
            <View style={styles.ICONROW}>{renderIcons()}</View>
            {/* <Text style={styles.DescriptionTxt}>
              {selectedItem.Description}
            </Text> */}
             <RenderHTML
              contentWidth={styles.container.width}
              source={{ html: selectedItem.description }}
              baseStyle={styles.DescriptionTxt} 
            />
            <Text style={styles.Description2Txt}>  
              {selectedItem.Description2}
            </Text>
            {/* <Image source={selectedItem.Img} style={styles.Img2} /> */}
            <Image source={{uri: selectedItem.images[0]}} style={styles.Img2} />
            <View>
              <Table />
            </View>
            <View style={styles.itemtxt}>
              <Text style={styles.itemtxts}>{selectedItem.itemName}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.green,
                  borderRadius: moderateScale(8),
                }}>
                <Text style={styles.BtnTxt}>BUY NOW</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!selectedCategory && !selectedFlashDeal && !selectedRecommended && (
          <View style={styles.SeachContainer}>
            <TextInput
              placeholder="Search products..."
              placeholderTextColor={COLORS.White}
              style={{paddingVertical: 1}}
            />
            <AntDesign
              name="search1"
              color={COLORS.White}
              size={18}
              style={{right: 15}}
            />
          </View>
        )}
        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <>
            <SectionHeader title="Flash Deals" />
            <FlatList
              data={FlashDeals}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.cardContainer}>
                  <View style={styles.flashDealItem}>
                    <ImageBackground
                      source={item.Img}
                      style={styles.flashDealImage}>
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
          </>
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
            <FlatLisItem
              data={Recommended}
              style={{
                backgroundColor: '#D1F2EB',
                marginHorizontal: scale(10),
                borderRadius: moderateScale(5),
              }}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              columnWrapperStyle={styles.row}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.recommendedItem}
                  onPress={() => handleRecommendedPress(item)}>
                  <Image source={item.Img} style={styles.recommendedImage} />
                  <Text style={styles.recommendedTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <View>
            <View style={styles.SectionHeader}>
              <Text style={styles.FlashDealsTxt}>Mobile</Text>
              <TouchableOpacity style={styles.ViewAllButton}>
                <Text style={styles.FlashDealsTxts}>View All</Text>
                <AntDesign
                  name="right"
                  size={23}
                  color={COLORS.green}
                  style={styles.ViewAllIcon}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={FlashDeals}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.cardContainer}>
                  <View style={styles.flashDealItem}>
                    <ImageBackground
                      source={item.Img}
                      style={styles.flashDealImage}>
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
            <CategoryTable />
          </View>
        )}
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
  detailItem: {
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: scale(10),
    width: scale(160),
    backgroundColor: COLORS.White,
  },
  detailImage: {
    width: scale(155),
    height: verticalScale(100),
    marginBottom: scale(5),
  },
  itemDetails: {
    alignItems: 'center',
    padding: scale(10),
  },
  BannerImg: {
    height: verticalScale(170),
    width: scale(340),
    resizeMode: 'cover',
  },
  ViewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ViewAllIcon: {
    right: scale(12),
  },
  itemName: {
    margin: scale(5),
    fontWeight: 'bold',
    fontSize: moderateScale(20),
    color: COLORS.Black,
  },
  itemimg: {
    height: scale(320),
    width: scale(350),
  },
  BYEBTN: {
    backgroundColor: COLORS.green,
    width: scale(300),
    height: scale(40),
    margin: scale(20),
  },
  BYEBTNTXT: {
    color: COLORS.White,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(18),
  },
  DescriptionTxt: {
    fontWeight: 'bold',
    color: COLORS.Black,
    fontSize: moderateScale(20),
    margin: scale(15),
    paddingHorizontal: scale(30),
  },
  Description2Txt: {
    textAlign: 'center',
    fontSize: moderateScale(15),
  },
  Img2: {
    height: scale(325),
    width: scale(325),
    margin: scale(20),
  },
  itemtxt: {
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    justifyContent: 'space-around',
    width: '100%',
    bottom: scale(-8),
    height: scale(40),
  },
  itemtxts: {
    color: COLORS.Black,
    textAlignVertical: 'center',
  },
  BtnTxt: {
    color: COLORS.White,
    width: scale(150),
    textAlign: 'center',
    paddingVertical: verticalScale(10),
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
    color: COLORS.Black,
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(6),
  },
  HowItContainer: {
    borderWidth: scale(0.5),
    margin: scale(5),
    height: scale(35),
    top: scale(10),
    marginHorizontal: scale(10),
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
    color: COLORS.green,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginVertical: verticalScale(2),
  },
  FlashDealsTxts: {
    color: COLORS.green,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(17),
    fontWeight: '500',
  },
  SeachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.green,
    justifyContent: 'space-between',
    width: '75%',
    height: scale(37),
    marginTop: scale(10),
    borderRadius: moderateScale(5),
  },
  ICONROW: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
