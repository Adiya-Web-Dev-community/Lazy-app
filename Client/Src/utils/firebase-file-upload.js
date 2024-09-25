import storage from '@react-native-firebase/storage';

export const uploadFileFireBase = async (fileName, filePath) => {
  const reference = storage().ref(fileName);

  // uploads file
  await reference.putFile(filePath)

  const url = await storage().ref(fileName).getDownloadURL();

  return url;
}