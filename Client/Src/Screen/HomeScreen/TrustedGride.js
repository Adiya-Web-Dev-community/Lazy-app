import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Scaling';

const TrustedGrid = ({navigation}) => {
  const scrollViewRef = useRef(null); // Reference to the ScrollView

  const scrollToSection = () => {
    scrollViewRef.current?.scrollTo({
      y: 200, // Adjust this value based on the position of the section
      animated: true,
    });
  };
  return (
      <ScrollView horizontal={true} ref={scrollViewRef} >
    <View style={styles.container}>
      <TouchableOpacity  onPress={scrollToSection} style={styles.button}>
        <Text style={styles.title}>Trusted/Best Product</Text>
        <Text style={styles.subtitle}>Verified By Lazybat Team</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('BrandHub')}}>
        <Text style={styles.title}>Brand Hub</Text>
        <Text style={styles.subtitle}>{'\n'}Non-Verified Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={()=>{navigation.navigate('SuggestUsScreen')}}> 
        <Text style={styles.title}>Suggest Us</Text>
        <Text style={[styles.subtitle,{}]}>Help Us Discover Hidden Gems.</Text>
      </TouchableOpacity>
    </View>
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(20),
   
  },
  button: {
    flex: 1,
    backgroundColor: '#2daafe', 
    paddingVertical: verticalScale(15),
    paddingHorizontal: moderateScale(10),
    marginHorizontal: moderateScale(5),
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: verticalScale(5), 
    
  },
  title: {
    flex:1,
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#fff', 
    textAlign:'center'
  },
  subtitle: {
    flex:1,
    fontSize: moderateScale(13),
    color: '#fff', 
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
});

export default TrustedGrid;
