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
  apiKey: "AIzaSyBQFsVNL7SSeyb8VZSkw6-TtWsPX34D2bw",
  authDomain: "chatapp-74ce0.firebaseapp.com",
  databaseURL: "https://chatapp-74ce0-default-rtdb.firebaseio.com",
  projectId: "chatapp-74ce0",
  storageBucket: "chatapp-74ce0.appspot.com",
  messagingSenderId: "452732246678",
  appId: "1:452732246678:web:0368d369e928cf362540b7",
  measurementId: "G-LKKPVHWFDK"
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