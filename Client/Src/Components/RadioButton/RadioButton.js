import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../Theme/Colors';

const RadioButton = ({ value, selectedValue, onPress, label, isBold, fontSize,style }) => {
  return (
    <TouchableOpacity
      style={[styles.radioContainer,{...style}]}
      onPress={() => onPress(value)}>
      <View
        style={[
          styles.radioCircle,
          selectedValue === value && styles.selectedRadio,
        ]}>
        {selectedValue === value && <View style={styles.selectedCircle} />}
      </View>
      <Text style={[styles.radioLabel, isBold && styles.boldLabel, { fontSize }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: COLORS.green,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.green,
  },
  radioLabel: {
    marginLeft: 10,
    color: COLORS.Black,
  },
  boldLabel: {
    fontWeight: 'bold',
  },
});

export default RadioButton;
