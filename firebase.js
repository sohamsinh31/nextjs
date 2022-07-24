/* eslint-disable */
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/compat/app';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"; 
import  "firebase/analytics";
import React from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmjerfDldQruH58pHlhG2R2RJ-KyYVgi0",
  authDomain: "cloudvol.firebaseapp.com",
  databaseURL: "https://cloudvol-default-rtdb.firebaseio.com",
  projectId: "cloudvol",
  storageBucket: "cloudvol.appspot.com",
  messagingSenderId: "270211077715",
  appId: "1:270211077715:web:fc230314744d836a5518a6",
  measurementId: "G-V9416Y049H"
};



// Initialize Firebase
const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
//const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
const storage = getStorage();
const rdb =  getDatabase();
const db = getFirestore();


export const firebase2 = () => {
  return (
    <div>firebase</div>
  )
}

export {app, db, storage ,rdb };