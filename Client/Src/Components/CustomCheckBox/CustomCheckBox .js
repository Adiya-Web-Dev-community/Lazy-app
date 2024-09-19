import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { scale, verticalScale } from '../../utils/Scaling';

const CustomCheckBox = ({label, value, onValueChange}) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={value}
        onValueChange={onValueChange}
        tintColors={{true: '#007AFF', false: '#000'}}
        style={styles.checkbox}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:verticalScale (4),
  },
  label: {
    marginLeft:scale (8),
  },
  checkbox: {
    width:scale (30), 
    height:scale (30), 
  },
});

export default CustomCheckBox;
