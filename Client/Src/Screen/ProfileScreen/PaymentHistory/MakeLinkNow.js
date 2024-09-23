import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../../../utils/Scaling';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MakeLinkData} from '../../../utils/CategoryData';
import WebView from 'react-native-webview';

export default function MakeLinkNow() {
  const MakeDatas = MakeLinkData.Categories;
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: scale(90), animated: true});
    }
  };

  const handlePrev = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: -scale(90), animated: true});
    }
  };

  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Make your own Profit Links in Seconds</Text>
        <Text style={styles.subtitle}>
          Paste a link from our active partner sites in the{'\n'}box below to
          make a link & share it.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <AntDesign name="link" size={30} color={COLORS.White} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Paste homepage or product link here"
          placeholderTextColor={COLORS.Black}
        />
      </View>
      <TouchableOpacity style={styles.BTN_CONTAINER}>
        <Text style={styles.BTN_TXT}>MAKE PROFIT LINK</Text>
      </TouchableOpacity>
      <View style={styles.partnerContainer}>
        <Text style={styles.quickConvertText}>
          Quick Convert Homepage Links
        </Text>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={handlePrev} disabled={false}>
            <AntDesign name="left" size={30} color={COLORS.Black} />
          </TouchableOpacity>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View style={styles.imageScrollContainer}>
              {MakeDatas.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageContainer}
                  onPress={() => openModal(item.Img)} // Open modal on press
                >
                  <Image
                    source={item.Img}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={handleNext} disabled={false}>
            <AntDesign name="right" size={25} color={COLORS.Black} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.BTN_CONTAINER, {paddingVertical: verticalScale(7)}]}>
          <Text style={styles.BTN_TXT}>SEE OUR PARTNERS</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{flexDirection: 'row',borderWidth:0.5}}>
              <View style={{backgroundColor: COLORS.blue}}>
                <AntDesign name="link" size={20} color={COLORS.White} />
              </View>
              <TextInput placeholder="enter your link" />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>How to make a Link Easily</Text>
        <WebView
          source={{uri: 'https://www.youtube.com/watch?v=PuTrN28TW4k'}}
          javaScriptEnabled={true}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
        <Text style={styles.tipsSubtitle}>Best Practices & Tips:</Text>
        {tipsData.map((tip, index) => (
          <View key={index} style={styles.tipContainer}>
            <Text style={styles.tipRow}>
              <Text style={styles.bullet}>●</Text>
              <Text style={styles.tipText}>{tip.text}</Text>
            </Text>
            {tip.right && (
              <Text style={styles.correctLink}>Right: {tip.right}</Text>
            )}
            {tip.wrong && (
              <Text style={styles.incorrectLink}>Wrong: {tip.wrong}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const tipsData = [
  {
    text: 'Ensure Link Format is Correct:',
    right: 'https://www.onepluse.in',
    wrong: 'oneplus in (missing https://)',
  },
  {
    text: 'To convert links in Bulk, we have a special tool. Please contact support@lazyBat.com to get access',
  },
  {
    text: 'No profit application on App orders.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  title: {
    color: COLORS.Black,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: moderateScale(18),
    marginVertical: verticalScale(25),
  },
  subtitle: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: COLORS.Black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: moderateScale(30),
    marginTop: verticalScale(20),
    marginHorizontal: scale(15),
  },
  iconContainer: {
    backgroundColor: COLORS.blue,
    borderRadius: moderateScale(25),
    padding: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(45),
    width: scale(45),
  },
  textInput: {
    flex: 1,
    height: verticalScale(40),
    color: COLORS.Black,
  },
  BTN_CONTAINER: {
    alignSelf: 'center',
    backgroundColor: COLORS.blue,
    paddingHorizontal: scale(35),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(25),
    marginVertical: verticalScale(25),
  },
  BTN_TXT: {
    color: COLORS.White,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  partnerContainer: {
    backgroundColor: COLORS.LightGrey,
    paddingVertical: verticalScale(10),
  },
  quickConvertText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    paddingVertical: verticalScale(22),
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageScrollContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginHorizontal: scale(5),
  },
  image: {
    width: scale(90),
    height: verticalScale(50),
    borderRadius: moderateScale(5),
  },
  tipsContainer: {
    marginHorizontal: scale(15),
  },
  tipsTitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(17),
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
  webview: {
    height: verticalScale(200),
    width: '100%',
  },
  tipsSubtitle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: moderateScale(13),
    marginVertical: verticalScale(10),
  },
  tipContainer: {
    marginVertical: verticalScale(5),
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    color: COLORS.Black,
    fontSize: moderateScale(15),
  },
  tipText: {
    color: COLORS.Black,
  },
  correctLink: {
    color: COLORS.green,
    marginLeft: scale(12),
  },
  incorrectLink: {
    color: COLORS.red,
    marginLeft: scale(12),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(10),
  },
  modalImage: {
    width: '100%',
    height: verticalScale(200),
  },
  closeButton: {
    marginTop: verticalScale(10),
    color: COLORS.blue,
    fontSize: moderateScale(16),
  },
});
