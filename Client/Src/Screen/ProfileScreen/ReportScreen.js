import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { moderateScale, scale } from '../../utils/Scaling';
import { COLORS } from '../../Theme/Colors';

const { width } = Dimensions.get('window');

export default function ReportScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [severity, setSeverity] = useState('');

  const handleSubmit = () => {
    if (!description || !contactInfo || !severity) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(false);
      setDescription('');
      setContactInfo('');
      setSeverity('');
      Alert.alert('Success', 'Your report has been submitted successfully.');
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/report.jpg')} style={styles.image} />
        <Text style={styles.title}>Report an Issue</Text>
        <Text style={styles.description}>
          If you encounter any issues or need to report something, please fill out the details below.
        </Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Issue Description:</Text>
          <TextInput
            style={styles.input}
            multiline
            textAlignVertical="top"
            placeholder="Describe the issue here"
            placeholderTextColor={COLORS.darkGrey}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Contact Information:</Text>
          <TextInput
            style={styles.input}
            textAlignVertical="top"
            placeholder="Your contact info"
            placeholderTextColor={COLORS.darkGrey}
            value={contactInfo}
            onChangeText={setContactInfo}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Severity:</Text>
          <TextInput
            style={styles.input}
            textAlignVertical="top"
            placeholder="Low, Medium, High"
            placeholderTextColor={COLORS.darkGrey}
            value={severity}
            onChangeText={setSeverity}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: loading ? COLORS.grey : COLORS.green }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.White} />
          ) : (
            <Text style={styles.buttonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Submission</Text>
            <Text style={styles.modalText}>
              Are you sure you want to submit this report?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.blue }]}
                onPress={handleConfirm}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: COLORS.red }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.White,
  },
  content: {
    padding: scale(20),
    backgroundColor: COLORS.White,
    marginBottom: scale(20),
  },
  image: {
    width: width - scale(40),
    height: scale(180),
    borderRadius: moderateScale(15),
    marginBottom: scale(20),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  title: {
    fontSize: moderateScale(24),
    color: COLORS.blue,
    fontWeight: 'bold',
    marginBottom: scale(10),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.Black,
    marginBottom: scale(20),
    textAlign: 'center',
  },
  label: {
    fontSize: moderateScale(17),
    color: COLORS.Black,
    fontWeight: 'bold',
    marginBottom: scale(8),
  },
  formGroup: {
    marginBottom: scale(20),
  },
  input: {
    height: scale(100),
    borderColor: COLORS.Black,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    padding: scale(12),
    fontSize: moderateScale(16),
    color: COLORS.darkText,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: scale(14),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: scale(10),
  },
  buttonText: {
    color: COLORS.White,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width - scale(40),
    padding: scale(20),
    backgroundColor: COLORS.White,
    borderRadius: moderateScale(15),
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    color: COLORS.blue,
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  modalText: {
    fontSize: moderateScale(14),
    color: COLORS.Black,
    marginBottom: scale(20),
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    marginHorizontal: scale(10),
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.White,
    fontSize: moderateScale(14),
  },
});
