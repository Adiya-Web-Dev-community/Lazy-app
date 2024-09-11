import { StyleSheet, Text, View,Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from '../../utils/Scaling'
import { COLORS } from '../../Theme/Colors'
import SwitchMain from '../../Components/Switch/Switch'

const SelectedBrandScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/L1.png')} style={styles.logo} />
        <SwitchMain/>
        <TouchableOpacity style={styles.FeedBtn}>
          <Text style={styles.FeedBtnTxt}>The Buzz Feed</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.heading}>
        <Text style={styles.headerText}>Brand Hub</Text>
        </View>
    </View>
  )
}

export default SelectedBrandScreen

const styles = StyleSheet.create({
    container:{
    flex:1,
    
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: verticalScale(5),
        marginHorizontal:moderateScale(5)
      },
     
      logo: {
        height: scale(45),
        width: scale(135),
       resizeMode:'contain'
       
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
      

})