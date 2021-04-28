import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'


// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAMiiPqn6eoacppVQdS-qjOewc0zDKxMrc",
    authDomain: "keviart-993df.firebaseapp.com",
    projectId: "keviart-993df",
    storageBucket: "keviart-993df.appspot.com",
    messagingSenderId: "762866805383",
    appId: "1:762866805383:web:35ee005a35f3e637546622",
    measurementId: "G-SM01NE7KSM"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();
//firebase.analytics();
//firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase