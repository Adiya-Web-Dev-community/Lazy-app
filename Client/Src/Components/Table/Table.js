import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { COLORS } from '../../Theme/Colors';
import { scale,verticalScale,moderateScale } from '../../utils/Scaling';
export default function Table() {
  return (
    <View>
      <Text style={styles.Title}>2.Body</Text>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Features</Text>
          <Text style={styles.headerCell}>Details</Text>
          <Text style={styles.headerCell}>Rating</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Dimensions</Text>
          <Text style={styles.cell}>159x71.9x7.7mm</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Weight</Text>
          <Text style={styles.cell}>170 grams</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Build</Text>
          <Text style={styles.cell}>Plastics frame,glass</Text>
          <Text style={styles.cell}>7</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Slim/Thick</Text>
          <Text style={styles.cell}>Slim</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Material</Text>
          <Text style={styles.cell}>Glass,Plastics</Text>
          <Text style={styles.cell}>9</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Colours</Text>
          <Text style={styles.cell}>Sea, Caneel Bay,Black Beauty</Text>
          <Text style={styles.cell}>9</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>IP Rating</Text>
          <Text style={styles.cell}>IP68 (Dust & Water)</Text>
          <Text style={styles.cell}>9</Text>
        </View>
      </View>
      <Text style={styles.Title}>3.Display</Text>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Features</Text>
          <Text style={styles.headerCell}>Details</Text>
          <Text style={styles.headerCell}>Rating</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Display Type</Text>
          <Text style={styles.cell}>pOLED</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Resolution</Text>
          <Text style={styles.cell}>1080 x 2400 pixels</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Size</Text>
          <Text style={styles.cell}>6.55 inches</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Refresh Rate</Text>
          <Text style={styles.cell}>120Hz</Text>
          <Text style={styles.cell}>9</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Protection</Text>
          <Text style={styles.cell}>Corning Gorilla</Text>
          <Text style={styles.cell}>7</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Screen</Text>
          <Text style={styles.cell}>90% (approx)</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Brightness</Text>
          <Text style={styles.cell}>1300nits</Text>
          <Text style={styles.cell}>9</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>HDR10/HDR10+</Text>
          <Text style={styles.cell}>Both yes</Text>
          <Text style={styles.cell}>9</Text>
        </View>
      </View>
      <Text style={styles.Title}>3.Performance</Text>

      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Features</Text>
          <Text style={styles.headerCell}>Details</Text>
          <Text style={styles.headerCell}>Rating</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Chipset</Text>
          <Text style={styles.cell}>MEDIATek Dimensity 7030</Text>
          <Text style={styles.cell}>7</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>CPU</Text>
          <Text style={styles.cell}>
            Octa-core(2x2.2 GHz Coretex-A76 & 6X2.0 GHz Coretex-A55)
          </Text>
          <Text style={styles.cell}>7</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Size</Text>
          <Text style={styles.cell}>6.55 inches</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Architecture</Text>
          <Text style={styles.cell}>6nm</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Graphics</Text>
          <Text style={styles.cell}>Mali-G610 MC3 GPU</Text>
          <Text style={styles.cell}>7</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>RAM</Text>
          <Text style={styles.cell}>8GB / 12GB</Text>
          <Text style={styles.cell}>8</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>ROM</Text>
          <Text style={styles.cell}>128GB / 256GB </Text>
          <Text style={styles.cell}>9</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>RAM Type</Text>
          <Text style={styles.cell}>LPDDR4X</Text>
          <Text style={styles.cell}>9</Text>
        </View>
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: scale(1),
    borderColor: COLORS.grey,
    borderRadius: moderateScale(5),
    overflow: 'hidden',
    margin: scale(10),
  },
  Title: {
    textAlign: 'center',
    color: COLORS.Black,
    fontSize: moderateScale(18),
    margin: scale(10),
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: scale(1),
    borderColor: COLORS.grey,
    backgroundColor: COLORS.White,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: COLORS.White,
  },
  headerCell: {
    flex: 1,
    padding: verticalScale(10),
    textAlign: 'center',
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  cell: {
    padding: verticalScale(10),
    textAlign: 'center',
    color: COLORS.Black,
    width: 120,
  },
});
