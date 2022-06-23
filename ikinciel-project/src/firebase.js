import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCIOrMt-GZN4bzMChTRhK-a46x_wcybS_0",
    authDomain: "second-hand-app-537c6.firebaseapp.com",
    projectId: "second-hand-app-537c6",
    storageBucket: "second-hand-app-537c6.appspot.com",
    messagingSenderId: "109847010062",
    appId: "1:109847010062:web:a06fd930f8d3e4a9a7155f",
    measurementId: "G-JEKMZXX6PK"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export {db, auth}