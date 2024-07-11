import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../utils/Scaling';
import {COLORS} from '../../Theme/Colors';

export default function CategoryTable({}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.cell}>Motorola{'\n'}SmartPhone</Text>
        <Text style={styles.cell}>Iqoo SmartPhone</Text>
        <Text style={styles.cell}>Nothing{'\n'}SmartPhone</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Oppp{'\n'}SmartPhone</Text>
        <Text style={styles.cell}>Samsung{'\n'}SmartPhone</Text>
        <Text style={styles.cell}>Vivo{'\n'}SmartPhone</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Samsung{'\n'}SmartPhone</Text>
        <Text style={styles.cell}>Realme{'\n'}SmartPhone</Text>
        <Text style={styles.cell}>Xiaomi{'\n'}SmartPhone</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Under{'\n'} 30000</Text>
        <Text style={styles.cell}>Under {'\n'}20000</Text>
        <Text style={styles.cell}>Under{'\n'} 20000</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.cell}>Under{'\n'} 15000</Text>
        <Text style={styles.cell}>Under{'\n'} 10000</Text>
        <Text style={styles.cell}>Top{'\n'} Deals</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(13),
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    width: scale(110),
    height: scale(50),
    borderWidth: moderateScale(0.5),
    borderColor: COLORS.Black,
    padding: scale(10),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.green,
    paddingVertical: verticalScale(5),
  },
});
