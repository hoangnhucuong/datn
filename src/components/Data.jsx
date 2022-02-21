import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD37tQDk9xZi_cO2A4QXyBus641wsTnjcE",
    authDomain: "test-ff9d2.firebaseapp.com",
    databaseURL: "https://test-ff9d2.firebaseio.com",
    projectId: "test-ff9d2",
    storageBucket: "test-ff9d2.appspot.com",
    messagingSenderId: "993475230844",
    appId: "1:993475230844:web:64502724285cec7f56ddf9",
    measurementId: "G-MWX9FC16ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);