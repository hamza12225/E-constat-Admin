import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNvneoAl0irlRyClvtGFuh6d-nqNzhWqc",
  authDomain: "fir-app-11d78.firebaseapp.com",
  databaseURL: "https://fir-app-11d78-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-app-11d78",
  storageBucket: "fir-app-11d78.appspot.com",
  messagingSenderId: "1073639151799",
  appId: "1:1073639151799:web:37fdea6e090190ae8b1532"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);



