/* eslint-disable */
import styles from '../styles/Home.module.css'
import React,{ useState} from 'react';
import Post from './Post';
import { useEffect } from 'react';
import 'firebase/firestore';
import { Avatar } from '@mui/material';
import {GoogleAuthProvider,getRedirectResult, signInWithPopup,signInWithRedirect, getAuth,signOut, onAuthStateChanged , createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword,deleteUser  } from "firebase/auth";
import {db ,rdb,storage} from '../firebase';
import { ref,getDownloadURL, uploadBytesResumable,deleteObject } from 'firebase/storage';
import { addDoc,collection, doc, query,getDocs,orderBy, setDoc, startAt, endAt} from "firebase/firestore"; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Imageuplpad from './Imageuplpad';
import Stories from './Stories';
import Footer from './Footer';
//code starts from here
const[value,setvalue]=useState('');
const [queries, setQueries] = useState([]);
useEffect(() => {
if(value.length>0){
    const colref = query(collection(db,'users'),startAt(value),endAt("\uf8ff"));
    getDocs(colref).then(snapshot=>{
      setQueries(snapshot.docs.map(doc =>(
        {
          id:doc.id,
          post:doc.data()
        }
      )))
    });
}
}, [queries])

const Search = () => {
  return (
    <div>
        <input type="text" className='searchbar' onChange={(e)=> setvalue(e.target.value)} />
    </div>
  )
}

export default Search