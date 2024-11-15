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
          const textColor = focused ? COLORS.White : COLORS.Black;
          const backgroundColor = focused ? COLORS.blue : COLORS.White;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              style={[styles.drawerItem, {backgroundColor}]}>
              {drawerIcon && drawerIcon({focused, size: 20})}
              <Text style={[styles.drawerLabel, {color: textColor}]}>
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
    marginTop: verticalScale(10),
  },
  drawerItem: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),

  },
  drawerLabel: {
    fontSize: moderateScale(14),
    marginLeft: scale(2),
    color:COLORS.Black
  },
});

export default CustomDrawerContent;
