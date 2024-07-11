// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBntvzsLUqS-bJUzXQIAI_aaGwbfTvSYOI",
  authDomain: "lazy-bat.firebaseapp.com",
  projectId: "lazy-bat",
  storageBucket: "lazy-bat.appspot.com",
  messagingSenderId: "471998838867",
  appId: "1:471998838867:web:167d8ff4917c92dd6eeea6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
