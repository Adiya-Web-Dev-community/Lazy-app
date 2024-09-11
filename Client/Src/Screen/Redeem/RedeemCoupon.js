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
import { green } from 'react-native-reanimated/lib/typescript/Colors';

export default function RedeemCoupon({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false); // New state for redeem button

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRedeem = () => {
    setIsRedeemed(true);
  };

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
        <Text style={styles.headerTxt}>Redeem Store</Text>
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

        <View style={styles.redeemContent}>
            
            <Text style={styles.redeemText}> Thanks! For Redeeming, Your 
            Coupon Code is xxxxxx2906</Text>
            
          </View>
        <View style={styles.redeemContent}>
            
            <Text style={styles.redeemText}> Watch Video to Know How to use Your 
            Coupon Code</Text>
            
          </View>
         

          <TouchableOpacity style={styles.Redeembtn} onPress={()=>navigation.navigate('RedeemCoupon')}>
              <Text style={styles.redeemtxt}>Congratulations 
              Messages</Text>
            </TouchableOpacity>
 
        
        {/* <View style={styles.fixedBottomButtons}>
          <TouchableOpacity>
            <Text style={{ textAlign: 'center', color: COLORS.Black }}>
              Home Is Where the {'\n'} Bodies Are Hardcover{'\n'} - Unabridged
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.TITLEBTN}>
            <Text style={styles.TITLEBTNTXT}>LOGIN</Text>
          </TouchableOpacity>
        </View> */}
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
    
    redeemContent:{
        backgroundColor:COLORS.grey,
        height:verticalScale(70),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:moderateScale(10),
        marginVertical:verticalScale(10),
        marginHorizontal:moderateScale(10)
    },
    redeemText:{
        fontSize:moderateScale(21),
        textAlign:'center',
        color:COLORS.White
    },
    Redeembtn:{
        // width:scale(100),
      backgroundColor:'green',
      alignItems:'center',
      justifyContent:'center',
      padding:moderateScale(10),
      borderRadius:moderateScale(10),
      elevation:verticalScale(5),
      alignSelf:'center',
      paddingHorizontal:moderateScale(20)
    
      },
      redeemtxt:{
        fontSize:moderateScale(19),
        color:COLORS.White,
        fontWeight:'500'
    
      }
});


