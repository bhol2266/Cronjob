// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc1yxzAlopYX5DiIdAGn7O-EeZWVSvB_4",
  authDomain: "desikahaninextjs.firebaseapp.com",
  projectId: "desikahaninextjs",
  storageBucket: "desikahaninextjs.appspot.com",
  messagingSenderId: "375623154497",
  appId: "1:375623154497:web:2476b41a06b0289dc9bfc0",
  measurementId: "G-17LJCPD4MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);