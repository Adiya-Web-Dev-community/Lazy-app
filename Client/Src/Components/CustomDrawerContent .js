import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {COLORS} from '../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        {props.state.routes.map((route, index) => {
          const focused = props.state.index === index;
          const {title, drawerLabel, drawerIcon} =
            props.descriptors[route.key].options;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, focused && styles.drawerItemFocused]}>
              {drawerIcon && drawerIcon({focused, size: 20})}
              <Text style={styles.drawerLabel}>
                {drawerLabel ? drawerLabel : title ? title : route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    marginTop:verticalScale(10)
  },
  drawerItem: {
    // borderBottomWidth: scale(1),
    // borderBottomColor: '#CCD1D1',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:COLORS.White,
  borderTopRightRadius:moderateScale(20),
borderBottomRightRadius:moderateScale(20),
    elevation:verticalScale(2),
    marginRight:moderateScale(10),
    marginVertical:verticalScale(5)
  },
  drawerItemFocused: {
    backgroundColor: COLORS.blue,
  },
  drawerLabel: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginLeft: scale(2),
  },
});

export default CustomDrawerContent;
