import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_fL_T4dMvLfKHJh39U__L1qs7diTmpgA",
    authDomain: "doctor-food-6652a.firebaseapp.com",
    projectId: "doctor-food-6652a",
    storageBucket: "doctor-food-6652a.appspot.com",
    messagingSenderId: "536561315194",
    appId: "1:536561315194:web:bffa89c755654a15a7fac3",
    measurementId: "G-K19BT53PTC"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }


    export { firebase };