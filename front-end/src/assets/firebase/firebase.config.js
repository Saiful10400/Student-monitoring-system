// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUiCte1T6vvVLUW7q_Fhv9mk983XgPIMk",
  authDomain: "first-time-on-firebase.firebaseapp.com",
  projectId: "first-time-on-firebase",
  storageBucket: "first-time-on-firebase.appspot.com",
  messagingSenderId: "460557946312",
  appId: "1:460557946312:web:d13658be7a23a44a9bc4fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)