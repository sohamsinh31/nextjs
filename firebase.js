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
  apiKey: "AIzaSyDX95fvszHSu24dey-J9XsjZwMfgBmhi6E",
  authDomain: "view1-fff0c.firebaseapp.com",
  databaseURL: "https://view1-fff0c-default-rtdb.firebaseio.com",
  projectId: "view1-fff0c",
  storageBucket: "view1-fff0c.appspot.com",
  messagingSenderId: "402897917499",
  appId: "1:402897917499:web:5b6674d385d7b3a272ee1e"
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