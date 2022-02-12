// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAovz_B4cz_GDFnBPOBXd7OOzzC-XpgNPA',
  authDomain: 'react-chat-application-e47e6.firebaseapp.com',
  projectId: 'react-chat-application-e47e6',
  storageBucket: 'react-chat-application-e47e6.appspot.com',
  messagingSenderId: '447281882437',
  appId: '1:447281882437:web:c883acaec63deba5188a2c',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
