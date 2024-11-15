import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import SwitchMain from '../../Components/Switch/Switch';
import HomeSlider from '../../Components/Slider/HomeSlider';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';

const BrandHub = ({navigation}) => {
  // Dummy data
  const logos = [
    {id: 1, image: require('../assets/Asus2.jpg')},
    {id: 2, image: require('../assets/Asus2.jpg')},
    {id: 3, image: require('../assets/Asus2.jpg')},
    {id: 4, image: require('../assets/Asus2.jpg')},
  ];

  const products = [
    {
      id: 1,
      title: 'Poco M2',
      description: 'Best Camera, Processor',
      image: require('../assets/laptop.jpg'),
    },
    {
      id: 2,
      title: 'Realme 3',
      description: 'Best Camera, Processor',
      image: require('../assets/laptop.jpg'),
    },
    {
      id: 3,
      title: 'Poco M2',
      description: 'Best Camera, Processor',
      image: require('../assets/laptop.jpg'),
    },
    {
      id: 4,
      title: 'Realme 3',
      description: 'Best Camera, Processor',
      image: require('../assets/laptop.jpg'),
    },
  ];

  const [cardsSelected, setCardselected] = useState(false);
  const [innercardselected, setInnercardSelected] = useState(false);
  const [arrowBtnSelected, setArrowBtnSelected] = useState(false);

  const renderBrandLogoRow = () => (
    <View style={styles.logoRow}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={handlecardselection}>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.jpg')}
          style={styles.Brandlogo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={handlecardselection}>
        <Image
          resizeMode="contain"
          source={require('../assets/logo.jpg')}
          style={styles.Brandlogo}
        />
      </TouchableOpacity>
    </View>
  );

  const handleCardSelection = () => {
    setCardselected(true);
  };
  //  const handarrowBtnSelection=()=>{
  //   setArrowBtnSelected(true)
  //   setCardselected(false)

  // }

  const handleBackpress = () => {
    if (cardsSelected) {
      return setCardselected(false);
    } else if (!cardsSelected) {
      return navigation.navigate('Home');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.HEADER}>
        <TouchableOpacity onPress={handleBackpress}>
          <Icon
            name="arrowleft"
            size={25}
            color={COLORS.Black}
            style={{marginLeft: scale(10)}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: moderateScale(19),
            fontWeight: '500',
            color: COLORS.Black,
            marginHorizontal: moderateScale(15),
          }}>
          Brand Hub
        </Text>
      </View>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>

      {!cardsSelected && (
        <>
          <View style={styles.heading}>
            <Text style={styles.headerText}>Brand Hub</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.logoRow}>
              {logos.map(logo => (
                <TouchableOpacity
                  key={logo.id}
                  style={styles.logoContainer}
                  onPress={handleCardSelection}>
                  <Image source={logo.image} style={styles.Brandlogo} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}
      {cardsSelected && (
        <>
          <View style={styles.container2}>
            {/* Header */}
            <View style={styles.header2}>
              <Text style={styles.brandText}>HUAWEI</Text>
              <View style={styles.headerButtons}>
                <Image
                  source={require('../assets/logo.jpg')}
                  style={styles.logo2}
                />
              </View>
            </View>
            <HomeSlider />
            <View style={styles.section}>
              <View style={styles.belowcontainer}>
                <Text style={styles.sectionTitle}>Below 20000</Text>
                <TouchableOpacity
                  style={styles.rightArrowbtn}
                  onPress={() => {
                    navigation.navigate('SelectedBrandScreen');
                  }}>
                  <Icon name="arrowright" size={27} color={COLORS.Black} />
                </TouchableOpacity>
              </View>

              <View style={styles.productRow}>
                {products.map(product => (
                  <View key={product.id} style={styles.card}>
                    <Image source={product.image} style={styles.productImage} />
                    <View style={styles.cardTxtcontainer}>
                      <Text style={styles.cardTitle}>{product.title}</Text>
                   

                    </View>
                    <Text style={styles.cardDescription}>
                      {product.description}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HEADER: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.White,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  belowcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },

  rightArrowbtn: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    //   backgroundColor:'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: moderateScale(2),
    borderColor: COLORS.grey,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: verticalScale(5),
    marginHorizontal: moderateScale(5),
  },

  logo: {
    height: scale(45),
    width: scale(135),
    resizeMode: 'contain',
  },
  heading: {
    backgroundColor: COLORS.blue,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.White,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
    marginHorizontal: moderateScale(10),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: scale(100),
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: verticalScale(3),
    overflow: 'hidden',
    backgroundColor: COLORS.White,
  },
  Brandlogo: {
    width: '100%',
    height: scale(90),
  },
  FeedBtn: {
    backgroundColor: COLORS.blue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
  },
  FeedBtnTxt: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },

  container2: {
    flex: 1,
    paddingVertical: moderateScale(10),
    backgroundColor: '#fff',
  },
  container3: {
    flex: 1,
    paddingVertical: moderateScale(10),
    backgroundColor: '#fff',
  },
  header2: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(10),
  },
  logo2: {
    height: scale(35),
    width: scale(40),
    resizeMode: 'cover',
    backgroundColor: 'green',
    marginHorizontal: moderateScale(10),
  },

  brandText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.Black,
  },

  section2: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: moderateScale(19),
    fontWeight: 'bold',

    color: COLORS.Black,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: scale(140),
    backgroundColor: '#fff',

    borderRadius: moderateScale(10),
    elevation: verticalScale(3),
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(10),
  },
  productImage: {
    width: scale(140),
    height: scale(130),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  cardTitle: {
    fontSize: moderateScale(19),
    fontWeight: '500',
    color: COLORS.White,
    marginTop: verticalScale(-20),
    // backgroundColor:'rgba(249, 249, 249, 0.5)',
    paddingHorizontal: moderateScale(5),
    borderBottomWidth: moderateScale(1.7),
    borderBottomColor: 'green',
  },
  cardDescription: {
    fontSize: moderateScale(15),
    color: '#555',
    fontWeight: '500',
    color: COLORS.Black,
    marginHorizontal: moderateScale(5),
    marginVertical: verticalScale(5),
  },
  cardTxtcontainer: {
    backgroundColor: 'rgba(249, 249, 249, 0.5)',
  },
});

export default BrandHub;
