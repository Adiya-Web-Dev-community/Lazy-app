import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import ImageSlider from '../../Components/Slider/ImageSlider';
import RenderHTML from 'react-native-render-html';
import {getProductById} from '../../api/api';

export default function AllDetails({route}) {
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

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

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>No product found</Text>
      </View>
    );
  }

  const htmlStyles = {
    p: {color: COLORS.Black},
    h1: {color: COLORS.Black},
    h2: {color: COLORS.Black},
    h3: {color: COLORS.Black},
    h4: {color: COLORS.Black},
    h5: {color: COLORS.Black},
    h6: {color: COLORS.Black},
    span: {color: COLORS.Black},
    a: {color: COLORS.Black},
  };

  const renderIcons = () => {
    if (!product.productsLink) {
      return null;
    }

    return product.productsLink.map((link, index) => (
      <TouchableOpacity
        key={index}
        style={styles.iconButton}
        onPress={() => handleIconPress(link.url)}>
        <AntDesign
          name={iconMap[link.company?.toLowerCase()] || 'questioncircle'}
          size={30}
          style={styles.icon}
        />
      </TouchableOpacity>
    ));
  };

  const handleIconPress = async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('Unsupported URL:', url);
    }
  };

  const iconMap = {
    amazon: 'amazon',
    flipkart: 'shoppingcart',
    ebay: 'shoppingcart',
    chroma: 'shoppingcart',
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.TITLE}>{product.name}</Text>
      <ImageSlider images={product.images} />
      <View style={styles.iconsContainer}>{renderIcons()}</View>
      <View style={styles.htmlContainer}>
        <RenderHTML
          contentWidth={styles.htmlContainer.width}
          source={{html: product.feature}}
          tagsStyles={htmlStyles}
        />
      </View>
      <View style={styles.htmlContainer}>
        <RenderHTML
          contentWidth={styles.htmlContainer.width}
          source={{html: product.description}}
          tagsStyles={htmlStyles}
        />
      </View>
      <View style={styles.BottomBtnContainer}>
        {product.productsLink.map((link, index) => (
          <View style={styles.ImgndBtn} key={index}>
            <Image
              source={
                link.image ? {uri: link.image} : require('../assets/Logo1.webp')
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  TITLE: {
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    marginTop: scale(10),
  },
  htmlContainer: {
    marginTop: verticalScale(10),
    paddingHorizontal: moderateScale(16),
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
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: verticalScale(10),
    paddingHorizontal: moderateScale(16),
  },
  iconButton: {
    backgroundColor: COLORS.green,
    borderRadius: moderateScale(100),
    padding: scale(10),
  },
  icon: {
    color: COLORS.White,
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
});
