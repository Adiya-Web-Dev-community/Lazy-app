import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import Header from '../../Components/Header/Header';
import WebView from 'react-native-webview';
import { moderateScale, scale, verticalScale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';
import SwitchMain from '../../Components/Switch/Switch';

export default function Redeem({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const data = [
    { id: '1', title: 'Zee5', description: '12 Months Premium 4K Subscription Worth...', image: require('../assets/Logo1.webp'), points: '151 + ₹898' },
    { id: '2', title: 'OTTplay', description: '40+ OTTs at Rs.99', image: require('../assets/Logo1.webp'), points: '5' },
    { id: '3', title: 'Times Prime', description: '150 SuperCoins & Rs.450 off on Premium ...', image: require('../assets/Logo1.webp'), points: '1' },
    { id: '4', title: 'Sony LIV', description: 'Additional 3 Months on 12 Months Subscription', image: require('../assets/Logo1.webp'), points: '25' },
  ];

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.card} onPress={()=>(navigation.navigate('showDetails'))}>
      <Image source={item.image } style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.cardPoints}>Use {item.points}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.newcontainer}>
        {/* <Text style={styles.headerTxt}>Redeem Store</Text> */}
        <View style={styles.webviewContainer}>
        {isLoading && (
            <ActivityIndicator
              size="large"
              color={COLORS.blue}
              style={styles.activityIndicator}
            />
          )}
          <WebView
            source={{ uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k' }}
            javaScriptEnabled={true}
            style={styles.webview}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}

          />
          <Text style={styles.howItWorks}>How it works?</Text>
        </View>

        <View style={styles.cardList}>
          {data.map(renderCard)}
        </View>

        {/* {showDetails && (
          <>
            <View style={styles.detailsScrollView}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>
                  Home Is Where the Bodies Are {'\n'}
                  Hardcover - Unabridged, April 30 {'\n'}
                  2024
                </Text>
              </View>
              <Image
                source={require('../assets/homebody.jpg')}
                style={styles.largeImage}
              />
              <Text style={styles.largePriceText}>2999</Text>
              <View style={styles.synopsisContainer}>
                <Text style={styles.synopsisText}>
                  From New Yourk Times bestselling author {'\n'}of The Perfect
                  Marriage and You Shouldn't{'\n'} Have Come Here comes a
                  chilling family {'\n'}thriller about the (sometimes literal)
                  {'\n'}
                  skeletons in the closet.
                </Text>
                <Text style={styles.synopsisText}>
                  After their mother passes, three estranged{'\n'} siblings
                  reunite to sort out her estate. Beth,{'\n'} the oldest, never
                  left home. She stayed with{'\n'} her mom, caring for her until
                  the very end.{'\n'}nicole,the middle child,has been kept at
                  {'\n'}arm's length due to her ongoing battl with{'\n'} a
                  serious drug addiction.Michael,the{'\n'}youngest,lives out of
                  state and hasn't been{'\n'}back to their small Wisconsin town
                  since{'\n'} their father ran out on them seven years{'\n'}
                  before.
                </Text>
                <Text style={styles.synopsisText}>
                  While Going through their parent's{'\n'}belongings,the
                  siblings stumble upon a{'\n'}collection of home video and
                  decide to{'\n'}
                  revisit those happier memories.However,{'\n'}the nstalgia is
                  cut short when one of the{'\n'}VHS tapes reveals a night back
                  in 1999 that{'\n'}none of them have any recollection of.On
                  {'\n'}
                  screen,their father appears covered in{'\n'}blood.What follows
                  ia a dead body and a{'\n'}pact between their parents to get
                  rid of it,{'\n'}before the video abruptly ends.
                </Text>
                <Text style={styles.synopsisText}>
                  Beth,Nicole, and Michaek must now decide{'\n'}whether to leave
                  the past in the past or{'\n'}uncover the dark secret theire
                  mother took to{'\n'}her grave
                </Text>
              </View>
              <Text style={styles.RecommendedTXt}>Recommended</Text>
              <View style={styles.recommendedContainer}>
                <TouchableOpacity style={styles.imageBox}>
                  <Image
                    source={require('../assets/homebody.jpg')}
                    style={styles.recommendedImage}
                  />
                  <Text style={styles.ImgTxt}>
                    Home Is Where the {'\n'}Bodies Are Hardcover{'\n'}
                    Unabridged, April 30
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.imageBox}>
                  <Image
                    source={require('../assets/homebody.jpg')}
                    style={styles.recommendedImage}
                  />
                  <Text style={styles.ImgTxt}>Moto Edge 40 Neo</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.fixedBottomButtons}>
              <TouchableOpacity>
                <Text style={{ textAlign: 'center', color: COLORS.Black }}>
                  Home Is Where the {'\n'} Bodies Are Hardcover{'\n'} - Unabridged
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.TITLEBTN}>
                <Text style={styles.TITLEBTNTXT}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </>
        )} */}
      </View>
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
    height: scale(45),
    width: scale(135),
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
  newcontainer: {
    padding: moderateScale(15),
    backgroundColor: COLORS.White,
  },
  headerTxt: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.White,
    marginBottom: verticalScale(10),
    textAlign:'center',
    backgroundColor:COLORS.blue,
    padding:moderateScale(10),
    borderRadius:moderateScale(10)

  },
  webviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    height: verticalScale(225),
  },
  webview: {
    height: verticalScale(220),
    width: scale(350),
  },
  howItWorks: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.Black,
    marginTop: verticalScale(10),
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(10),
    margin: moderateScale(10),
    padding: moderateScale(10),
    elevation: scale(2),
    flexBasis: scale(140), // Adjusting to fit two columns
  },
  cardImage: {
    width: '100%',
    height: verticalScale(100),
    borderRadius: moderateScale(8),
  },
  cardTextContainer: {
    flex:1,
    marginTop: verticalScale(5),
  },
  cardTitle: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color:COLORS.Black,
  },
  cardDescription: {
    fontSize: moderateScale(13),
    color: '#000',
    fontWeight: '400',
  },
  cardPoints: {
    flex:1,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.red,
    // textAlign:'center'
  },
  detailsScrollView: {
    padding: moderateScale(15),
    backgroundColor: COLORS.White,
  },
  detailsContainer: {
    marginBottom: verticalScale(10),
  },
  detailsText: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    color: '#000',
  },
  largeImage: {
    width: '100%',
    height: verticalScale(200),
    marginVertical: verticalScale(10),
  },
  largePriceText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  synopsisContainer: {
    marginVertical: verticalScale(10),
  },
  synopsisText: {
    fontSize: moderateScale(14),
    lineHeight: verticalScale(20),
    color: '#555',
    marginBottom: verticalScale(10),
  },
  RecommendedTXt: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#000',
    marginVertical: verticalScale(10),
  },
  recommendedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap items in rows
    justifyContent: 'space-between',
  },
  imageBox: {
    flex: 1,
    marginHorizontal: moderateScale(5),
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  recommendedImage: {
    width: scale(100),
    height: verticalScale(150),
    borderRadius: moderateScale(8),
  },
  ImgTxt: {
    textAlign: 'center',
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    color: '#000',
  },
  fixedBottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: moderateScale(10),
    backgroundColor: COLORS.White,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  TITLEBTN: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(5),
    marginTop: verticalScale(10),
  },
  TITLEBTNTXT: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  activityIndicator:{
    alignSelf:'center',
    marginVertical:verticalScale(20)
  }
});
