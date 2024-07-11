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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFlashDeal, setSelectedFlashDeal] = useState(null);
  const [selectedRecommended, setSelectedRecommended] = useState(null);

  const categories = shoppingApp.Categories;
  const FlashDeals = FlashDealsData.FlashDeals;
  const Recommended = RecommendedData.Recommended;

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

  const handleItemPress = item => {
    if (selectedItem?.itemName === item.itemName) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
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

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <ScrollView style={styles.content}>
        {!selectedCategory && !selectedFlashDeal && !selectedRecommended && (
          <Image
            source={require('../assets/banner.jpg')}
            style={styles.BannerImg}
          />
        )}
        {!selectedItem && (
          <>
            <FlatLisItem
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{margin: 5}}
                  onPress={() => {
                    setSelectedCategory(item);
                    setSelectedItem(null);
                  }}>
                  <Image source={item.Img} style={styles.categoryImg} />
                  <Text style={styles.categoryTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        {selectedCategory && !selectedItem && (
          <>
            <FlatLisItem
              data={selectedCategory.details}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.detailItem}
                  onPress={() => handleItemPress(item)}>
                  <Image source={item.Img} style={styles.detailImage} />
                  <Text style={{color: COLORS.Black}}>{item.itemName}</Text>
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
            <Text style={styles.itemName}>{selectedItem.itemName}</Text>
            {/* <Image source={selectedItem.Img} style={styles.itemimg} /> */}
            <ImageSlider />
            {/* <TouchableOpacity style={styles.BYEBTN}>
              <Text style={styles.BYEBTNTXT}>BUY NOW</Text>
            </TouchableOpacity> */}
            <View style={styles.ICONROW}>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="instagram" size={30} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="amazon" size={30} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="chrome" size={30} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="google" size={30} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <Text style={styles.DescriptionTxt}>
              {selectedItem.Description}
            </Text>
            <Text style={styles.Description2Txt}>
              {selectedItem.Description2}
            </Text>
            <Image source={selectedItem.Img} style={styles.Img2} />
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
          <View>
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
            <View style={styles.FlashDealsContainer}>
              <Text style={styles.FlashDealsTxt}>Flash Deals</Text>
            </View>
          </View>
        )}
        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <FlatLisItem
            data={FlashDeals}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
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
        )}
        {!selectedFlashDeal && !selectedCategory && !selectedRecommended && (
          <View>
            <Image
              source={require('../assets/banner2.webp')}
              style={styles.BannerImg}
            />
            {/* <WebView
              style={styles.Webview}
              source={{uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k'}}
              javaScriptEnabled={true}
            /> */}
            <View style={styles.HowItContainer}>
              <Text style={styles.HowItTxt}>How it works?</Text>
            </View>
            <View style={styles.RecommendedContainer}>
              <Text style={styles.RecommendedTxt}>Recommended</Text>
            </View>
            <FlatLisItem
              data={Recommended}
              style={{backgroundColor: '#D1F2EB'}}
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
            <View
              style={[
                styles.FlashDealsContainer,
                {flexDirection: 'row', justifyContent: 'space-between'},
              ]}>
              <Text style={styles.FlashDealsTxt}>Mobile</Text>
              <Text style={styles.FlashDealsTxt}>View All</Text>
            </View>
            <FlatLisItem
              data={FlashDeals}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
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
    width: scale(400),
    resizeMode: 'cover',
  },
  categoryImg: {
    height: scale(65),
    width: scale(65),
    borderRadius: moderateScale(100),
    margin: scale(3),
  },
  categoryTitle: {
    textAlign: 'center',
    color: COLORS.Black,
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
  flashDealItem: {
    alignItems: 'center',
    marginBottom: scale(10),
    margin: scale(5),
  },
  flashDealImage: {
    height: scale(160),
    width: scale(170),
    justifyContent: 'flex-end',
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
  },
  recommendedItem: {
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: scale(10),
    width: scale(160),
    margin: scale(3),
    backgroundColor: COLORS.White,
  },
  recommendedImage: {
    width: scale(150),
    height: scale(120),
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
  RecommendedContainer: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(2),
    margin: scale(12),
    borderRadius: moderateScale(5),
    borderWidth: scale(0.5),
    height: 40,
  },
  RecommendedTxt: {
    color: COLORS.White,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(17),
    top: scale(4),
  },
  HowItTxt: {
    textAlign: 'center',
    color: COLORS.Black,
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(6),
  },
  HowItContainer: {
    borderWidth: 1,
    margin: 5,
    height: 35,
    top: scale(10),
  },
  Webview: {
    height: scale(225),
    width: scale(400),
    marginTop: scale(10),
  },
  BannerImg: {
    height: scale(184),
    width: scale(350),
  },
  FlastBtn: {
    backgroundColor: COLORS.green,
    width: scale(175),
    height: scale(28),
    alignItems: 'center',
    alignSelf: 'center',
    margin: scale(9),
    borderRadius: moderateScale(8),
  },
  FlastBtnTxt: {
    color: COLORS.White,
    paddingVertical: verticalScale(4),
    fontWeight: 'bold',
  },
  FlashDealsContainer: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(5),
    margin: scale(12),
    borderRadius: moderateScale(5),
    borderWidth: scale(0.5),
    height: 40,
  },
  FlashDealsTxt: {
    color: COLORS.White,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(17),
  },
  SeachContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.green,
    justifyContent: 'space-between',
    width: '65%',
    height: scale(37),
    borderWidth: scale(1),
    margin: scale(10),
    borderRadius: moderateScale(5),
  },
  ICONROW: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
