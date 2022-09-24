
import { initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB_qjuc00aZfXxsfS2N1eq34_HqywgDXDA",
  authDomain: "fir-3de3e.firebaseapp.com",
  projectId: "fir-3de3e",
  storageBucket: "fir-3de3e.appspot.com",
  messagingSenderId: "307012828261",
  appId: "1:307012828261:web:3d2bae1a191c455c20da8c"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore( app)