import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../Components/Header/Header';
import WebView from 'react-native-webview';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

export default function Redeem({}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {!showDetails && (
        <>
          <View style={styles.webviewContainer}>
            <WebView
              source={{uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k'}}
              javaScriptEnabled={true}
              style={styles.webview}
            />
            <Text style={styles.TITLE}>How it works?</Text>
          </View>
          <ScrollView>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.imageBackground}
                onPress={toggleDetails}>
                <Image
                  source={require('../assets/homebody.jpg')}
                  style={styles.Img}
                />
                <Text style={styles.PriceTxt}>2999</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
      {showDetails && (
        <>
          <ScrollView style={styles.detailsScrollView}>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>
                Home Is Where the Bodies Are {'\n'}
                Hardcover - Unabridged, April 30 {'\n'}
                2024
              </Text>
            </View>
            <View>
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
          </ScrollView>
          <View style={styles.fixedBottomButtons}>
            <TouchableOpacity>
              <Text style={{textAlign:'center',color:COLORS.Black}}>
                Home Is Where the {'\n'} Bodies Are Hardcover{'\n'} - Unabridged
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.TITLEBTN}>
              <Text style={styles.TITLEBTNTXT}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webviewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(10),
    height: verticalScale(225),
  },
  webview: {
    height: verticalScale(225),
    width: scale(400),
  },
  imageContainer: {
    alignItems: 'flex-start',
    marginTop: scale(20),
  },
  imageBackground: {
    backgroundColor: COLORS.White,
    padding: scale(20),
    borderRadius: moderateScale(10),
    borderWidth: scale(0.3),
  },
  TITLE: {
    textAlign: 'center',
    color: COLORS.Black,
    fontSize: moderateScale(20),
  },
  PriceTxt: {
    backgroundColor: COLORS.green,
    color: COLORS.White,
    fontSize: moderateScale(16),
    height: verticalScale(25),
    marginTop: scale(15),
    textAlign: 'center',
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(5),
  },
  Img: {
    height: verticalScale(175),
    width: scale(140),
  },
  detailsScrollView: {
    flex: 1,
    marginBottom: verticalScale(50),
  },
  detailsContainer: {
    marginTop: scale(5),
    padding: scale(10),
    backgroundColor: COLORS.LightGray,
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  detailsText: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    textAlign: 'center',
  },
  largeImage: {
    height: verticalScale(460),
    width: '90%',
    alignSelf: 'center',
  },
  largePriceText: {
    textAlign: 'center',
    fontSize: moderateScale(28),
    color: COLORS.Black,
    margin: scale(10),
  },
  synopsisContainer: {
    alignItems: 'center',
  },
  synopsisText: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    paddingVertical: verticalScale(5),
  },
  LOGINBTN: {
    backgroundColor: COLORS.green,
    alignItems: 'center',
    alignSelf: 'center',
    width: '45%',
    height: verticalScale(40),
    marginHorizontal: scale(5),
    justifyContent: 'center',
    elevation: 5,
  },
  LOGINBTNTXT: {
    fontSize: 18,
    color: COLORS.White,
  },
  TITLEBTN: {
    backgroundColor: COLORS.green,
    alignItems: 'center',
    alignSelf: 'center',
    width: '45%',
    height: verticalScale(40),
    marginHorizontal: scale(5),
    justifyContent: 'center',
    elevation: 5,
  },
  TITLEBTNTXT: {
    fontSize: 18,
    color: COLORS.White,
  },
  fixedBottomButtons: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: scale(10),
    backgroundColor: COLORS.White,
    elevation: 10,
  },
  RecommendedTXt: {
    fontSize: moderateScale(18),
    color: COLORS.green,
    paddingHorizontal: scale(17),
  },
  recommendedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: scale(20),
  },
  imageBox: {
    borderWidth: 1,
    borderColor: COLORS.Black,
    padding: scale(10),
    width: 175,
  },
  recommendedImage: {
    height: verticalScale(100),
    width: scale(100),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  ImgTxt: {
    fontSize: moderateScale(14),
    paddingVertical: verticalScale(7),
    color: COLORS.Black,
  },
});
