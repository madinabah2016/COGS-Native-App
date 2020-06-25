import firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAlbPNnjTwz4ietPp_vF7FQBZIeVME6bY8",
    authDomain: "cogs-d2124.firebaseapp.com",
    databaseURL: "https://cogs-d2124.firebaseio.com",
    projectId: "cogs-d2124",
    storageBucket: "cogs-d2124.appspot.com",
    messagingSenderId: "1029436376643",
    appId: "1:1029436376643:web:6fcfff4f9e6818c76b36f6"
};
let Firebase = firebase.initializeApp(config);
export const db = Firebase.database();
export const auth = Firebase.auth();

export default Firebase;