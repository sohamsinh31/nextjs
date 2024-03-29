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
import { addDoc,collection, doc, query,getDocs,orderBy, setDoc} from "firebase/firestore";
import { getDatabase, ref as ref2, set as set2 } from "firebase/database"; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import Imageuplpad from './Imageuplpad';
import Stories from './Stories';
import Footer from './Footer';
import { set } from 'firebase/database';
import {second} from '../public/vmeetlogo.png'
import Header from './Header';

//------------START--------------//
const App = () => {
  //------LOAD POSTS DATABASE-------------------//
  const [posts,setPosts] = useState([]);
useEffect(()=>{
const colref = query(collection(db,'photos'),orderBy("timestamp"));
getDocs(colref).then(snapshot=>{
  setPosts(snapshot.docs.map(doc =>(
    {
      id:doc.id,
      post:doc.data()
    }
  )))
})
},[posts]);
//------------BOX-STYLES-------------------//
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color:'black',
  p: 4,
};
//-------------------------DEFINE VARIABLES-------------------//
const auth = getAuth();
const provider = new GoogleAuthProvider();
const [user, setUser] = useState(null);
const [useremail, setuseremail] = useState(null);
const [displayusername, setdisplayusername] = useState(null);
const [userurl, setuserurl] = useState('');
const [userid, setuserid] = useState('');
//----------------------SIGN OUT SIGN IN LOGIN---------------------//
useEffect(()=>{
  onAuthStateChanged(auth, (authUser)=>{
    
    if(authUser){
      //user has logged in
      setUser(authUser);
      setdisplayusername(authUser.displayName);
      setuseremail(authUser.email);
      setuserurl(authUser.photoURL);
      setuserid(authUser.uid);
    }
    else {
      setUser(null);
      console.log("signed out");
    }
  })
},[user,displayusername]);
const signUp = (event) =>{
  event.preventDefault();
  signInWithPopup(auth, provider)
.then(
 result => {  
  var user = result.user;
  if(user){
    let userid = user.uid 
    set2(ref2(rdb, "users/"+userid), {
      username:user.displayName.toLocaleLowerCase(),
      email:user.email,
      profile:user.photoURL
    })
  }
  }
)
}
const signOut2 = (event) =>{
  event.preventDefault();
  signOut(auth)
}
//------------STORIES------------//
const [stories,setstories] = useState([]);
useEffect(()=>{
const colref = (collection(db,'stories'));
getDocs(colref).then(snapshot=>{
  setstories(snapshot.docs.map(doc =>(
    {
      id:doc.id,
      post:doc.data()
    }
  )))
})
},[stories]);
//---------------upload what is in your mind---------------//
const [caption, setcaption] = useState('')
const handleupload = () =>{
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  
  const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
  addDoc(collection(db, "photos"), {
    timestamp: timestamp,
    caption:caption,
    imageurl:"",
    userurl:userurl,
    username:displayusername,
    email:useremail,
    type:""
  });
  setcaption("");
}
  return (
    <div className={styles.app}>
      <Header/>
    {displayusername?(
      <div>
      <Stories email={useremail} userurl={userurl} username={displayusername} />
      {/* <Imageuplpad email={useremail} userurl={userurl} username={displayusername} /> */}
        <div className={styles.imageupload}>
        <input
        style={{
          borderRadius:'16px',
          backgroundColor:'black',
          color:'white'
        }}
         type="text" placeholder={` What's on your mind ${displayusername} ?`} onChange={event =>setcaption(event.target.value)} value={caption}/>
        <Button onClick={handleupload}>Upload</Button>
    </div>
      </div>
    ):(
      <h3>login to view stories</h3>
    )
}
    {
    posts.map(({post,id}) =>(
        displayusername?(<Post Type={post.type} userid={userid} key={id} postId={id} userurl2={post.userurl} email={useremail} displayname={displayusername} username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
        ):(
          <div>login to view posts</div>
        )
        ))
    }
<Footer displayname={displayusername} signup={signUp} signout={signOut2} userurl={userurl} />
    </div>
    
)
}
export default App;