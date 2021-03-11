import firebase from 'firebase';
import  'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAqtVDVPdf4V8iPolFWSZQ5qncbmy0doEQ",
    authDomain: "vendor-management-df3e1.firebaseapp.com",
    projectId: "vendor-management-df3e1",
    storageBucket: "vendor-management-df3e1.appspot.com",
    messagingSenderId: "404270946056",
    appId: "1:404270946056:web:9943fb383a67ce840afebd",
    measurementId: "G-RKDX7FDY96"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export default firebase;