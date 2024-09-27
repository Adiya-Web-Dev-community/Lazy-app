import storage from '@react-native-firebase/storage';

export const uploadFileFireBase = async (fileName, filePath) => {
  try {
    const reference = storage().ref(fileName);

    // Uploads the file
    await reference.putFile(filePath);

    // Get the file's download URL
    const url = await reference.getDownloadURL();
    
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw the error for further handling
  }
};
