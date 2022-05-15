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
  apiKey: "AIzaSyDxnTDw_z8EpnyZVLQQN17YV82uL956z4Q",
  authDomain: "webhost-30b9b.firebaseapp.com",
  databaseURL: "https://webhost-30b9b-default-rtdb.firebaseio.com",
  projectId: "webhost-30b9b",
  storageBucket: "webhost-30b9b.appspot.com",
  messagingSenderId: "708216870816",
  appId: "1:708216870816:web:e5a312e4be40b3283476c5",
  measurementId: "G-L7Y9B9PW61"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
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