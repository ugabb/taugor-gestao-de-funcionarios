// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS1giePqcJYDeXSSkjwFg-1rJ9yO189wQ",
  authDomain: "taugor-gestao-de-funcionarios.firebaseapp.com",
  projectId: "taugor-gestao-de-funcionarios",
  storageBucket: "taugor-gestao-de-funcionarios.appspot.com",
  messagingSenderId: "913504791279",
  appId: "1:913504791279:web:c4f04001dc21e38e42091a",
  measurementId: "G-Y6FV4T3PT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
