import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../Theme/Colors';
import {scale, verticalScale} from '../../utils/Scaling';
  
const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate('DrawerTab')}>
        <Feather name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Home</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.icon}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Feather name="dollar-sign" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    backgroundColor: COLORS.White,
    elevation: 10,
    height: verticalScale(50),
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: scale(10),
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.Black,
    textAlign: 'left',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: scale(20),
  },
});

export default Header;
