import firebase from "firebase"
import 'firebase/firestore'
import firebaseConfig from "./firebaseConfig"
const firebaseApp = firebase.initializeApp(firebaseConfig)
    // const storageRef = firebase.storage()

export default firebaseApp.firestore()