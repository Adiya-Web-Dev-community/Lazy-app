import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RadioButton from './RadioButton/RadioButton';
import {COLORS} from '../Theme/Colors';
import {scale, verticalScale} from '../utils/Scaling';

export default function ChooseTime({route, navigation}) {
  const [selectedValue, setSelectedValue] = useState('Last 15 Mins');

  const handleRadioButtonPress = value => {
    setSelectedValue(value);
  };
  const handleApplyPress = () => {
    navigation.navigate('FlipkartReport', {selectedTime: selectedValue});
  };
  return (
    <View style={styles.container}>
      <View style={styles.radioContainer}>
        {[
          'Last 15 Mins',
          'Last 30 Mins',
          'Last 1 Hour',
          'Last 6 Hours',
          'Last 24 Hours',
          'Today',
          'Yesterday',
          'Last 3 Days',
          'Last 7 Days',
        ].map(label => (
          <RadioButton
            key={label}
            label={label}
            value={label}
            selectedValue={selectedValue}
            onPress={handleRadioButtonPress}
            isBold={true}
            style={styles.BUTTONS}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyPress}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
    justifyContent: 'space-between',
  },
  radioContainer: {
    marginHorizontal: scale(20),
  },
  BUTTONS: {
    marginVertical: verticalScale(14),
  },
  applyButton: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(8),
    marginHorizontal: scale(30),
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: scale(16),
    fontWeight: 'bold',
  },
});
