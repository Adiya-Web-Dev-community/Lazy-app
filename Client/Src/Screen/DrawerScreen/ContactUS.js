import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/Fontisto';
import ModalSelector from 'react-native-modal-selector';

export default function TelegramChannel({}) {
  const [selectedValue, setSelectedValue] = useState('Your Question About..');

  const data = [
    {key: 1, label: 'General Inquiry'},
    {key: 2, label: 'Technical Support'},
    {key: 3, label: 'Billing'},
    {key: 4, label: 'Other'},
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Have Questions? Get</Text>
        <Text style={styles.headerText}>in Touch</Text>
        <Text style={styles.subText}>
          If you have any query, feel free to contact our
        </Text>
        <Text style={styles.subText}>expert team.</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.iconOuter}>
            <View style={styles.iconBackground}>
              <Ionicons name="call-outline" size={28} color={COLORS.White} />
            </View>
          </View>
          <View style={styles.TXTCONTAINER}>
            <Text style={styles.PHONETXT}>P: +91 123456789</Text>
            <Text style={{color:COLORS.grey}}>Let's Talk</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.iconOuter}>
            <View style={styles.iconBackground}>
              <EvilIcons name="telegram" size={35} color={COLORS.White} />
            </View>
          </View>
          <View style={styles.TXTCONTAINER}>
            <Text style={styles.PHONETXT}>Telegram</Text>
            <Text style={{color:COLORS.grey}}>Connect on Telegram</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.iconOuter}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="mail-open-outline"
                size={28}
                color={COLORS.White}
              />
            </View>
          </View>
          <View style={styles.TXTCONTAINER}>
            <Text style={styles.PHONETXT}>LayApp@gmail.com</Text>
            <Text style={{color:COLORS.grey}}>Drop a Line</Text>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center', marginVertical: verticalScale(30)}}>
        <TextInput placeholder="Enter Your Name*"    placeholderTextColor={COLORS.grey} style={styles.TxtInput} />
        <TextInput placeholder="Enter Your Email*"    placeholderTextColor={COLORS.grey} style={styles.TxtInput} />
        <TextInput placeholder="Enter Your Phone*"   placeholderTextColor={COLORS.grey}  style={styles.TxtInput} />
        <ModalSelector
          style={styles.ModalSelector}
          data={data}
          initValue="Your Question About.."
           
          onChange={option => setSelectedValue(option.label)}>
          <TouchableOpacity style={styles.TxtInput}>
            <Text style={styles.modalText}>{selectedValue}</Text>
          </TouchableOpacity>
        </ModalSelector>
        <TextInput
          placeholder="Your Message...."
          placeholderTextColor={COLORS.grey}
          style={[styles.TxtInput, styles.messageInput]}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity style={styles.BTN}>
        <Text style={styles.BTNTXT}>SEND YOUR MESSAGE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:verticalScale(20)
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(50),
  },
  headerText: {
    fontSize: moderateScale(30),
    color: COLORS.Black,
    fontWeight: '500',
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    color:COLORS.grey
  },
  iconContainer: {
    alignItems: 'center',
    margin: scale(5),
  },
  iconOuter: {
    backgroundColor: '#8888',
    borderRadius:scale(30),
    height: scale(60),
    width: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBackground: {
    backgroundColor: COLORS.blue,
    borderRadius:scale(25),
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.White,
    width: '90%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  TXTCONTAINER: {
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(13),
  },
  PHONETXT: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize:moderateScale(17),
  },
  TxtInput: {
    backgroundColor: COLORS.White,
    width: '87%',
    height: verticalScale(55),
    borderRadius: moderateScale(5),
    margin: scale(10),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
    color:COLORS.Black
  },
  modalText: {
    paddingTop: verticalScale(2),
    fontSize: moderateScale(15),
    color:COLORS.grey
  },
  messageInput: {
    height: verticalScale(150),
    paddingTop: verticalScale(10),
  },
  BTN: {
    marginHorizontal: scale(25),
    backgroundColor: COLORS.blue,
    width: scale(190),
    height: verticalScale(32),
    alignItems: 'center',
    alignSelf:'center'
  },
  BTNTXT: {
    paddingVertical: verticalScale(7),
    color: COLORS.White,
  },
  ModalSelector: {
    width: '100%',
    marginLeft: scale(22),
  },
});
