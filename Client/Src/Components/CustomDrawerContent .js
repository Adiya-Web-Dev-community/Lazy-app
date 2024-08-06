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
  },
  drawerItem: {
    borderBottomWidth: scale(1),
    borderBottomColor: '#CCD1D1',
    paddingVertical: verticalScale(17),
    paddingHorizontal: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemFocused: {
    backgroundColor: COLORS.lightGrey,
  },
  drawerLabel: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginLeft: scale(2),
  },
});

export default CustomDrawerContent;
