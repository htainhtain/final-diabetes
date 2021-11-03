import firebase from 'firebase'
import 'firebase/storage'

export const app = firebase.initializeApp({
    "projectId": "frb-diabetes-cu",
    "appId": "1:1058293342943:web:2e4ace7fd735038624bf6a",
    "storageBucket": "frb-diabetes-cu.appspot.com",
    "locationId": "asia-southeast2",
    "apiKey": "AIzaSyCUkoodjFGp-VkitEwZG_DqqYZmnLdFt0w",
    "authDomain": "frb-diabetes-cu.firebaseapp.com",
    "messagingSenderId": "1058293342943"
  });