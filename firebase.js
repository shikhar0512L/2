import { initializeApp , getApps } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
 } from 'firebase/auth';
import {getFirestore , collection , getDocs , addDoc , setDoc , getDoc , doc , onSnapshot , serverTimestamp ,  query , orderBy , collectionGroup , arrayUnion , arrayRemove , updateDoc} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC0wX3DLcwGJq9_q4txVBC_rdnwt9B47xs",
    authDomain: "isn-677ed.firebaseapp.com",
    projectId: "isn-677ed",
    storageBucket: "isn-677ed.appspot.com",
    messagingSenderId: "954000723860",
    appId: "1:954000723860:web:aae7475e9d09e3e357c981"
  };

if(!getApps().length) initializeApp(firebaseConfig);

export {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    getFirestore,
    collection,
    doc,
    addDoc,
    collectionGroup,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    getDoc,
    getDocs,
    setDoc,
    arrayUnion,
    arrayRemove,
    updateDoc
};