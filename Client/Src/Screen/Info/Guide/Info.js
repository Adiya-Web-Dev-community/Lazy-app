import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import Header from '../../../Components/Header/Header';
import {Title} from 'react-native-paper';
import SwitchMain from '../../../Components/Switch/Switch';

const data = [
  {
    id: 1,
    heading: 'The Finders Official Videos',
    Image: require('../../assets/Logo1.webp'),
    Title: 'Title',
  },
  {
    id: 2,
    heading: 'The Finders Official Videos',
    Image: require('../../assets/Logo1.webp'),
    Title: 'Title',
  },
  {
    id: 3,
    heading: 'The Finders Official Videos',
    Image: require('../../assets/Logo1.webp'),
    Title: 'Title',
  },
  {
    id: 4,
    heading: 'The Finders Official Videos',
    Image: require('../../assets/Logo1.webp'),
    Title: 'Title',
  },
];
const cardata = [
  {id: 1, Image: require('../../assets/Logo1.webp'), Title: 'Title'},
  {id: 2, Image: require('../../assets/Logo1.webp'), Title: 'Title'},
  {id: 3, Image: require('../../assets/Logo1.webp'), Title: 'Title'},
  {id: 4, Image: require('../../assets/Logo1.webp'), Title: 'Title'},
];

export default function Info({navigation}) {
  const [modalVisible, setModalVisible] = useState(true);
  const [selected, setSelected] = useState('short');

  // Toggle button selection
  const handleVisible = videoType => {
    setSelected(videoType);
  };
  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <Header /> */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        transparent={true}
        animationType="slide">
        <View style={styles.ModalView}>
          <View style={styles.MODALVIEW}>
            <View style={styles.ModalSecondView}>
              <Text style={styles.ModalTxt}>
                "Hi,welcome to <Text style={{fontWeight: 'bold'}}>LazyBat</Text>
                . We don't just list {'\n'}the Products here; we also offer a
                better {'\n'} platfrom to help you make your purchases{'\n'}
                hassle free and with complate information and
                guidance.Additinally,we also provide{'\n'}resources for
                improvement of your {'\n'} Knowledge and lifestyle,along with
                many{'\n'}tips to help you enhance yourself".
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Image source={require('../../assets/L1.png')} style={styles.logo} />
        <SwitchMain />
        <TouchableOpacity
          style={styles.FeedBtn}
          onPress={() => navigation.navigate('BuzzFeed')}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videosContainer}>
        {/* Short Videos Button */}
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'short' && styles.selectedButton, // Apply blue background if selected
          ]}
          onPress={() => handleVisible('short')}>
          <Text style={styles.videoText}>Short Videos</Text>
        </TouchableOpacity>

        {/* Long Videos Button */}
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'long' && styles.selectedButton, // Apply blue background if selected
          ]}
          onPress={() => handleVisible('long')}>
          <Text style={styles.videoText}>Long Videos</Text>
        </TouchableOpacity>
      </View>
      {selected == 'short' ? (
        <>
          <View style={styles.shortVideos}></View>
        </>
      ) : (
        <>
          <Text style={styles.text}>Learn more about us through videos.</Text>
          <Text style={styles.title}>Know more through our videos</Text>
          {data.map(item => (
            <View style={styles.mainCardContainer} key={item.id}>
              <View style={styles.cardsContainer}>
                <Text style={styles.heading}>{item.heading}</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {cardata.map(cards => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('VideoPlayer');
                      }}
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: moderateScale(10),
                      }}
                      key={cards.id}>
                      <View style={styles.cardContainer}>
                        <View style={styles.cards}>
                          <Image
                            source={cards.Image}
                            style={styles.cardimage}
                          />
                        </View>
                        <Text style={styles.TItleTxt}>{cards.Title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  webview: {
    height: 700,
    width: scale(350),
    marginTop: scale(10),
    alignSelf: 'center',
  },
  text: {
    marginTop: scale(10),
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: COLORS.Black,
  },
  heading: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: COLORS.Black,
    marginHorizontal: scale(10),
  },
  headerTxtContainer: {
    borderBottomWidth: moderateScale(1.5),
    marginHorizontal: moderateScale(10),
    marginVertical: verticalScale(10),
    borderBottomColor: COLORS.red,
  },
  Btn: {
    backgroundColor: COLORS.blue,
    height: verticalScale(40),
    margin: scale(8),
    borderRadius: moderateScale(8),
    elevation: verticalScale(5),
  },
  Btntxt: {
    paddingVertical: verticalScale(8),
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    paddingLeft: scale(10),
  },
  title: {
    fontSize: moderateScale(23),
    color: COLORS.Black,
    margin: scale(15),
    borderTopWidth: scale(0.5),
    paddingVertical: verticalScale(8),
  },
  closeButton: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(20),
    alignSelf: 'flex-end',
    marginVertical: verticalScale(7),
    marginTop: verticalScale(12),
  },
  closeButtonText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  ModalSecondView: {
    backgroundColor: COLORS.White,
    width: scale(300),
    height: verticalScale(165),
    elevation: scale(10),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    overflow: 'scroll',
  },
  ModalTxt: {
    color: COLORS.Black,
    fontSize: moderateScale(15),
    textAlign: 'center',
    paddingVertical: verticalScale(13),
    elevation: moderateScale(5),
  },
  MODALVIEW: {
    // backgroundColor: COLORS.blue,
    borderRadius: moderateScale(10),
    padding: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(4),
    elevation: scale(5),
  },
  ModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cards: {
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(10),
    elevation: verticalScale(5),
    width: scale(140),
    marginVertical: verticalScale(10),
    marginHorizontal: moderateScale(10),
    alignItems: 'center',
    padding: moderateScale(10),
  },
  cardimage: {
    width: scale(130),
    height: scale(90),
    borderRadius: moderateScale(10),
  },
  TItleTxt: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.Black,
    marginBottom: verticalScale(10),
  },
  cardContainer: {
    width: scale(150),
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  cardsContainer: {
    elevation: 4,
    backgroundColor: COLORS.White,
    marginVertical: verticalScale(10),
  },
  mainCardContainer: {
    // marginHorizontal: moderateScale(10),
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.White,
  },
  headingconatainer: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    padding: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  videosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.Black,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: COLORS.blue, // Blue background when selected
  },
  videoText: {
    color: '#fff', // Text color inside the button
    fontSize: 16,
  },
  shortVideos: {
    height: 600,
    elevation: 4,
    backgroundColor: COLORS.White,
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(10),
    borderWidth: 0.3,
    borderRadius: scale(10),
  },
});
