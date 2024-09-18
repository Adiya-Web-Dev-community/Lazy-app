import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { verticalScale,moderateScale, } from '../utils/Scaling';
import { COLORS } from '../Theme/Colors';

const CustomPicker = ({ selectedValue, onValueChange, categories }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (category) => {
    onValueChange(category._id);
    setModalVisible(false);
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerText}>
          {selectedValue
            ? categories.find(cat => cat._id === selectedValue)?.name || 'Select Category'
            : 'Select Category'}
        </Text>
        <AntDesign name="down" size={16} color={COLORS.Black} />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <FlatList
            data={categories}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(item)}
              >
                <View style={styles.categoryIcon}>
                  {/* Use icons based on your categories */}
                  <AntDesign name="tag" size={20} color={COLORS.Black} />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  pickerText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.Black,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.White,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.Black,
  },
});

export default CustomPicker;
