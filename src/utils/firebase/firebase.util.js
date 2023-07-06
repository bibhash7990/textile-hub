import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzVi9jPEpNoR3gTyhibfoxoZ5mE-QqtLE",
  authDomain: "textile-hub-570aa.firebaseapp.com",
  projectId: "textile-hub-570aa",
  storageBucket: "textile-hub-570aa.appspot.com",
  messagingSenderId: "489835624542",
  appId: "1:489835624542:web:b31db7d371f04f81db5ccf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", // Forces account selection even when one account is available
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createuserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exits
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //if user data exists
  //then return userDocRef
  return userDocRef;
};
