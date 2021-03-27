import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDlmkFVFGF2QEXHgPrdbTKuJFmo_0hQgio",
    authDomain: "youareprecious-fd15c.firebaseapp.com",
    projectId: "youareprecious-fd15c",
    storageBucket: "youareprecious-fd15c.appspot.com",
    messagingSenderId: "1026392480303",
    appId: "1:1026392480303:web:5c9e422f9ecf5a935b84da",
    measurementId: "G-6DLD3MQWSR"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


// export firestore
export { projectAuth, projectFirestore, timestamp }