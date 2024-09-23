import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../Theme/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {moderateScale, scale} from '../../../utils/Scaling';
import RadioButton from '../../../Components/RadioButton/RadioButton';

export default function FilterScreen({navigation}) {
  const [activeFilter, setActiveFilter] = useState('type');
  const [selectedType, setSelectedType] = useState('option1');

  const renderContent = () => {
    switch (activeFilter) {
      case 'type':
        return (
          <View style={styles.radioContainer}>
            <RadioButton
              value="option1"
              selectedValue={selectedType}
              onPress={setSelectedType}
              label="Transaction Date"
              isBold={true}
              fontSize={15}
            />
            <Text style={styles.radioDescription}>
              This is the date when a{'\n'}transaction was placed through{'\n'}
              your shared Profit link.
            </Text>
            <View style={styles.radioWrapper}>
              <RadioButton
                value="option2"
                selectedValue={selectedType}
                onPress={setSelectedType}
                label="Shared date"
                isBold={true}
                fontSize={15}
              />
              <Text style={styles.radioDescription}>
                This is the date when you shared{'\n'}your Profit link.
              </Text>
            </View>
          </View>
        );
      case 'dateRange':
        return (
          <View style={styles.radioWrapper}>
            {[
              'Today',
              'Yesterday',
              'Last 3 Days',
              'Last 7 Days',
              'Last 14 Days',
              'Current Month',
              'Last Month',
              'Last 3 Months',
              'Last 6 Months',
              'Custom',
            ].map((label, index) => (
              <View key={index} style={styles.radioButtonContainer}>
                <RadioButton
                  value={`option${index + 3}`}
                  selectedValue={selectedType}
                  onPress={setSelectedType}
                  label={label}
                  isBold={true}
                />
              </View>
            ))}
          </View>
        );
      case 'brands':
        return (
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={{color: COLORS.Black, fontWeight: 'bold'}}>
              No brands available. Kindly choose a{'\n'}different date range
            </Text>
          </View>
        );
      default:
        return <Text>Select a filter to see content</Text>;
    }
  };

  const handleApply = () => {
    // Implement your apply functionality here
    console.log('Apply clicked');
  };

  const handleClose = () => {
    // Implement your close functionality here
    console.log('Close clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="left" size={20} color={COLORS.Black} />
        <Text style={styles.headerText}>Filter by</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'type' && styles.activeButton,
            ]}
            onPress={() => setActiveFilter('type')}>
            <Text
              style={[
                styles.buttonText,
                activeFilter === 'type' && styles.activeText,
              ]}>
              Type
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'dateRange' && styles.activeButton,
            ]}
            onPress={() => setActiveFilter('dateRange')}>
            <Text
              style={[
                styles.buttonText,
                activeFilter === 'dateRange' && styles.activeText,
              ]}>
              Date Range
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'brands' && styles.activeButton,
            ]}
            onPress={() => setActiveFilter('brands')}>
            <Text
              style={[
                styles.buttonText,
                activeFilter === 'brands' && styles.activeText,
              ]}>
              Brands
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailContainer}>{renderContent()}</View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={[styles.buttonText, {color: COLORS.White}]}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    padding: scale(10),
    marginTop: scale(30),
  },
  headerText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    marginLeft: scale(10),
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  filterContainer: {
    backgroundColor: COLORS.LightGrey,
    width: '33%',
    height: '100%',
  },
  filterButton: {
    paddingVertical: scale(20),
    borderBottomWidth: 0.5,
  },
  activeButton: {
    backgroundColor: COLORS.White,
    borderBottomColor: COLORS.green,
    width: scale(116),
  },
  buttonText: {
    color: COLORS.Black,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  activeText: {
    color: COLORS.green,
  },
  detailContainer: {
    flex: 1,
    padding: scale(10),
    backgroundColor: COLORS.White,
  },
  radioContainer: {
    marginHorizontal: scale(12),
    marginTop: scale(20),
  },
  radioWrapper: {
    marginTop: scale(15),
  },
  radioDescription: {
    fontSize: moderateScale(11),
    marginLeft: scale(30),
    width: '100%',
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    marginBottom: scale(20),
    marginHorizontal: scale(12),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
    borderTopWidth: 0.5,
    borderTopColor: COLORS.grey,
  },
  applyButton: {
    backgroundColor: COLORS.green,
    flex: 1,
    marginRight: scale(5),
    padding: scale(15),
    borderRadius: 5,
  },
  closeButton: {
    flex: 1,
    marginLeft: scale(5),
    padding: scale(15),
    borderRadius: 5,
  },
});
