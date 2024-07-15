import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { UploadImageFunction } from "../../types/contentType";

const uniqueIdentifier = `image_${Date.now()}_${Math.floor(
  Math.random() * 10000
)}`;

const uploadMultipleImage: UploadImageFunction = async (
  folderName,
  file,
  setProgressStatus
) => {
  try {
    const storageRef = ref(
      storage,
      `${folderName}/${uniqueIdentifier} ${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgressStatus(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        throw error;
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgressStatus(null);
        return downloadURL;
      }
    );

    await uploadTask;
    console.log(uploadTask, "fromImage");
    return getDownloadURL(uploadTask.snapshot.ref);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadMultipleImage;
