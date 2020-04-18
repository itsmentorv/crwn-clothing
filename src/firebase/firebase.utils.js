import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA35zMh0XHd2ySH7N_5GjZsi17zEfEBdJA",
  authDomain: "crwn-db-1c896.firebaseapp.com",
  databaseURL: "https://crwn-db-1c896.firebaseio.com",
  projectId: "crwn-db-1c896",
  storageBucket: "crwn-db-1c896.appspot.com",
  messagingSenderId: "5398193454",
  appId: "1:5398193454:web:3f873074d050f2229f86bf",
  measurementId: "G-J30TDYYDBY"
};
      
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){  
      console.log('error creating user', error.message);
    }
  }
  
  return userRef; 
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;