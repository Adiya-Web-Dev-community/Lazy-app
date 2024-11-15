import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';

const SuggestUsScreen = ({navigation}) => {


  const userData = [
    { id: '1', name: 'User1' },
    { id: '2', name: 'User2' },
    { id: '3', name: 'User3' },
    { id: '4', name: 'User4' },
    
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Help Us Discover Hidden Gems.</Text>
      <Text style={styles.inptxt}>
      Product Name:
      </Text>
      <TextInput 
     
      placeholder='Enter the name of the product' 
      placeholderTextColor={COLORS.grey}
        // value={formData.productName} 
        style={styles.input} 
        onChangeText={()=>{}}
      />
       <Text style={styles.inptxt}>
       Brand: 
      </Text>
      <TextInput
       placeholder='Specify the brand name' 
      placeholderTextColor={COLORS.grey} 
        // value={formData.brand} 
        style={styles.input} 
        onChangeText={()=>{}}
      />
        <Text style={styles.inptxt}>
        Why You Recommend It:
      </Text>
      <TextInput 
       placeholder='Describe why you think this product is a hidden gem' 
      placeholderTextColor={COLORS.grey}
        // value={formData.recommendation} 
        style={styles.input} 
         onChangeText={()=>{}}

      />
    <Text style={styles.inptxt}>
    Unique Features:
      </Text>
      <TextInput 
      
       placeholder='List any unique features or qualities that stand out' 
      placeholderTextColor={COLORS.grey}
        // value={} 
        style={styles.input} 
        onChangeText={()=>{}}
      />
         <Text style={styles.inptxt}>
         How It Helped You
      </Text>
      <TextInput 
       placeholder='Share your personal experience with the product)' 
      placeholderTextColor={COLORS.grey}
        // value={formData.howItHelped} 
        style={styles.input} 
        onChangeText={()=>{}}
      />
         <Text style={styles.inptxt}>
         Price Range: 
      </Text>
      <TextInput 
       placeholder='Provide an approximate price range' 
      placeholderTextColor={COLORS.grey}
        // value={formData.priceRange} 
        style={styles.input} 
        onChangeText={()=>{}}
      />
       <Text style={styles.inptxt}>
       Link to Purchase: 
      </Text>
      <TextInput 
       placeholder='If available, provide a link to the product' 
      placeholderTextColor={COLORS.grey}
        // value={formData.linkToPurchase} 
        style={styles.input} 
        onChangeText={()=>{}}
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.thankYouContainer}>
        <Text style={styles.thankYouText}>Thank You for Unveiling Hidden Gems: Your Suggestions Shine Here</Text>
      </View>

      <View style={styles.userList}>
        {userData.map(user => (
          <>
        <View style={styles.detailsContaianer}>
        <Text key={user.id} style={styles.users}>{user.name}</Text>
          <Text key={user.id} style={styles.user}>Product Details</Text>
          <Text key={user.id} style={styles.user}>this is very good in use </Text>
        </View>

          
          </>

        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
  },
  header: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    marginBottom: verticalScale(10),
    color: '#fff',
    textAlign:'center',
    backgroundColor:COLORS.blue,
    padding:moderateScale(10),
    borderRadius:moderateScale(10)
  },
  inptxt:{
    fontSize:moderateScale(17),
    color:'#000',
    fontWeight:'500'
  },
  input: {
    height: verticalScale(40),
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(10),
    color:COLORS.Black
  },
  submitButton: {
    backgroundColor: 'green',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(20),
    width:"90%",
    alignSelf:'center'
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  thankYouContainer: {
   borderColor:COLORS.blue,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    alignItems: 'center',
    elevation:1,
    backgroundColor:COLORS.White,
    borderWidth:0.5,
    borderStyle:"dotted"
  },
  thankYouText: {
    color:COLORS.Black,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  userList: {
    marginBottom: verticalScale(20),
  },
  user: {
    fontSize: moderateScale(14),
    color: '#333333',
    marginBottom: verticalScale(5),
  },
  users: {
    fontSize: moderateScale(14),
    color:COLORS.blue,
    marginBottom: verticalScale(5),
    fontWeight:"500"
  },
  detailsContaianer:{
    elevation:4,
    backgroundColor:COLORS.White,
    marginVertical:scale(5),
    padding:scale(10),
    borderRadius:scale(5)
  }
});

export default SuggestUsScreen ;
