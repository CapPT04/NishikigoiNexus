// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; //cần để quản lí(upload,download,...) trên firebase cloud

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz-UlKQVN25iesS6cJ2QgtzC592jz1UtE",
  authDomain: "nishikigoinexus-fa24.firebaseapp.com",
  projectId: "nishikigoinexus-fa24",
  storageBucket: "nishikigoinexus-fa24.appspot.com",
  messagingSenderId: "1098087821569",
  appId: "1:1098087821569:web:10a92111dfd1df3958eb00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
