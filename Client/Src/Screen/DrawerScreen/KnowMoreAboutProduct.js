import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../Theme/Colors';
import {scale, verticalScale, moderateScale} from '../../utils/Scaling';
import Header from '../../Components/Header/Header';

export default function KnowMoreAboutProduct() {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <ScrollView style={styles.container}>
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
      <WebView
        style={styles.webview}
        source={{uri: 'https://www.youtube.com/embed/F71MdJK-qTQ'}}
        javaScriptEnabled={true}
      />
      <Text style={styles.text}>Learn more about us through videos.</Text>
      <Text style={styles.title}>Know more through our videos</Text>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>LazyBat Official Video</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Be Gentlement</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Transfrom Yourself</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Skincare Routine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Haircare Routine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Style Yourself</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Foods=Medicine</Text>
      </View>
      <View style={styles.Btn}>
        <Text style={styles.Btntxt}>Brands Products Review</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  webview: {
    height: verticalScale(200),
    width: scale(350),
    marginTop: scale(10),
    alignSelf: 'center',
  },
  text: {
    marginTop: scale(10),
    fontSize: moderateScale(16),
    textAlign: 'center',
    color:COLORS.Black
  },
  Btn: {
    backgroundColor: COLORS.blue,
    height: verticalScale(40),
    margin: scale(8),
    borderRadius: moderateScale(8),
    elevation:verticalScale(5)
  },
  Btntxt: {
    paddingVertical: verticalScale(8),
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    paddingLeft:scale(10)
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
    padding:moderateScale(10),
   overflow:'scroll'
  },
  ModalTxt: {
    color: COLORS.Black,
    fontSize: moderateScale(15),
    textAlign: 'center',
    paddingVertical: verticalScale(13),
    elevation: moderateScale(5),
    
  },
  MODALVIEW: {
    backgroundColor: COLORS.blue,
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
});

