import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {scale, moderateScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SectionHeader = ({title, style}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title,{...style}]}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.green,
    paddingHorizontal: scale(15),
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    paddingVertical: moderateScale(15),
  },
});

export default SectionHeader;
