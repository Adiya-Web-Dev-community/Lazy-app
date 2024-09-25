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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {MakeLinkData} from '../../../utils/CategoryData';
import WebView from 'react-native-webview';
import CustomCheckBox from '../../../Components/CustomCheckBox/CustomCheckBox ';

export default function MakeLinkNow() {
  const MakeDatas = MakeLinkData.Categories;
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

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
                  onPress={() => openModal(item.Img)}>
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
            <TouchableOpacity
              onPress={closeModal}
              style={styles.closeButtonContainer}>
              <AntDesign name="close" size={25} color={COLORS.Black} />
            </TouchableOpacity>

            <View style={[styles.inputContainer, {}]}>
              <View
                style={[
                  styles.iconContainer,
                  {height: scale(40), width: scale(40)},
                ]}>
                <AntDesign name="link" size={30} color={COLORS.White} />
              </View>
              <TextInput
                style={[styles.textInput, {height: scale(35)}]}
                placeholder="https://fkrn/gjshkg"
                placeholderTextColor={COLORS.Black}
              />
            </View>
            <View style={styles.profitContainer}>
              <View style={styles.profitInfo}>
                <Text style={styles.SIMPLE_TXT}>Profit Tract In</Text>
                <Text style={styles.HOURS_TXT}>48 Hours</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.profitInfo}>
                <Text style={styles.SIMPLE_TXT}>Profit Confirms By</Text>
                <Text style={styles.HOURS_TXT}>24 Oct 2024</Text>
              </View>
            </View>
            <Text style={{textAlign: 'center'}}>
              Share this deal woth your friends & family. When they{'\n'}shop
              through your link, your earn profiy.
            </Text>
            <View style={{marginVertical: verticalScale(15)}}>
              <CustomCheckBox
                label="Add a Personalized Message"
                value={isChecked}
                onValueChange={() => setIsChecked(!isChecked)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.WHATSAPPBTN}>
                <FontAwesome name="whatsapp" size={25} color={COLORS.White} />
                <Text style={styles.WHATSBTNTXT}>SHARE NOW</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.COPYBTN}>
                <Entypo name="link" size={25} color={COLORS.Black} />
                <Text style={styles.COPYBTNTXT}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginVertical: verticalScale(15),
                }}>
                <AntDesign name="sharealt" size={15} color={COLORS.blue} />
                <Text style={{color: COLORS.blue, fontSize: moderateScale(11)}}>
                  OTHERS
                </Text>
              </TouchableOpacity>
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
  closeButtonContainer: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
  profitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLORS.LightGrey,
    paddingVertical: verticalScale(10),
    marginVertical: verticalScale(20),
    borderRadius: moderateScale(8),
  },
  profitInfo: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.grey,
  },
  SIMPLE_TXT: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  HOURS_TXT: {
    color: COLORS.Black,
    fontWeight: 'bold',
    paddingTop: scale(10),
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(15),
    paddingHorizontal: scale(15),
  },
  WHATSAPPBTN: {
    flexDirection: 'row',
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    alignItems: 'center',
    borderRadius: moderateScale(30),
    width: '50%',
    marginBottom: verticalScale(15),
  },
  WHATSBTNTXT: {
    color: COLORS.White,
    marginLeft: scale(8),
  },
  COPYBTN: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    alignItems: 'center',
    borderRadius: moderateScale(30),
    borderWidth: 0.5,
    width: '50%',
  },
  COPYBTNTXT: {
    color: COLORS.Black,
    marginLeft: scale(8),
  },
});
