// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQeDgPytKJWVNRfT_6nQ0OWIacZhmTQV0",
  authDomain: "ligate-ff19a.firebaseapp.com",
  databaseURL: "https://ligate-ff19a-default-rtdb.firebaseio.com",
  projectId: "ligate-ff19a",
  storageBucket: "ligate-ff19a.appspot.com",
  messagingSenderId: "876609562804",
  appId: "1:876609562804:web:4524c2b2574b8a0dabcfe1",
  measurementId: "G-W7D8ZSC35M",
};

// Initialize Firebase
export const app = () => initializeApp(firebaseConfig);
export const analytics = ()=> getAnalytics(app());
