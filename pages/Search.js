/* eslint-disable */
import styles from '../styles/Home.module.css'
import React,{ useState} from 'react';
import Post from './Post';
import { useEffect } from 'react';
import 'firebase/firestore';
import { Avatar, colors } from '@mui/material';
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
import { FaSearch } from 'react-icons/fa';
import { async } from '@firebase/util';
//code starts from here

const Search = () => {
  const[value,setvalue]=useState('');
  const [queries, setQueries] = useState([]);
useEffect(() => {
if(value.length>0){
    const colref = query(collection(db,'users'),orderBy("username"),startAt(value),endAt("\uf8ff"));
    getDocs(colref).then(snapshot=>{
    setQueries(snapshot.docs.map(doc =>(
        {
          id:doc.id,
          post:doc.data()
        }
      )))
});
}
//console.log(queries)
}, [queries])
//console.log(queries)
  return (
    <div>
      {/* <form onSubmit={(e)=>e.preventDefault()}> */}
        <input style={{
          width:'100%',
          flex: '1',
          border: 'none',
          backgroundColor: 'transparent',
          borderTop: '1px solid white',
          borderBottom: '1px solid white',
          color: 'white'
        }} placeholder="Search.." type="text" className='searchbar' onChange={(e)=> setvalue(e.target.value)} />
    {/* </form> */}
    {
          queries.map(({post,id}) =>(
            <div className={styles.searchapp}>
                <Avatar
                  className="post_avatar"
                  style={{
                    width:'45px',
                    height:'45px',
                    float:'left'
                  }}
                  alt = 'user'
                  src = {post.profile}
                  /><h3>{post.username}</h3>
            </div>
            ))
    }

    </div>
  )
}

export default Search