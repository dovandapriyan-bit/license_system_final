const firebaseConfig = {
  apiKey: "AIzaSyAbjTvpPZrghmkBEM9gsuzJnxrW3CpvKtk",
  authDomain: "license-system-final.firebaseapp.com",
  projectId: "license-system-final",
  storageBucket: "license-system-final.firebasestorage.app",
  messagingSenderId: "1015431823618",
  appId: "1:1015431823618:web:5c1f0dceaf573b163fc21b",
  measurementId: "G-MM848C9R7H"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
