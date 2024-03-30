import { initializeApp } from "firebase/app";
import { getFirestore, collection  }
  from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEhWOmf5jcTUE28uukfsSEeoR-jsMIWp0",
  authDomain: "todo-app-4c857.firebaseapp.com",
  projectId: "todo-app-4c857",
  storageBucket: "todo-app-4c857.appspot.com",
  messagingSenderId: "83655961795",
  appId: "1:83655961795:web:f807c8604ef572c114c676",
  measurementId: "G-5KYW022RKL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const dbTasksCollection = collection(db, 'tasks');
