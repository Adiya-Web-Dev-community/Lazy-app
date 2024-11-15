import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { COLORS } from '../../Theme/Colors';
import { scale } from '../../utils/Scaling';

export default function AccountDelete() {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle the confirmation of account deletion
  const handleDeleteAccount = () => {
    // Here you can add the actual logic for deleting the account
    Alert.alert('Account Deleted', 'Your account has been successfully deleted.', [{ text: 'OK' }]);
    setIsModalVisible(false); // Close the modal after confirming deletion
  };

  // Function to handle cancel action
  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      {/* Delete Button */}
      <TextInput style={styles.inputBox} multiline={true}/>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setIsModalVisible(true)} // Show modal on button click
      >
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      {/* Modal for confirmation */}
      <Modal
        transparent={true} // Make modal background transparent
        animationType="slide" // Slide animation for the modal
        visible={isModalVisible}
        onRequestClose={handleCancel} // Close modal when tapping outside (Android back button)
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to delete this account?</Text>

            {/* Buttons in the modal */}
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red', // Red color for delete button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    width:"90%",
    alignSelf:"center",
    textAlignVertical:"top",
    padding:scale(10)
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"center"
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color:COLORS.Black
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  inputBox:{
   borderWidth:1,
   borderColor:COLORS.Black,
   width:"90%",
   alignSelf:"center",
   marginBottom:scale(10),
   height:150,
   borderRadius:scale(5),
  }
});
