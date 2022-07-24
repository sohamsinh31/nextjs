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
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email,setEmail] = useState('');
const [user, setUser] = useState(null);
const [opensignin, setopensignin] = useState(false);
const [useremail, setuseremail] = useState(null);
const [displayusername, setdisplayusername] = useState(null);
const [image, setimage] = useState(null);
const [progress, setprogress] = useState(0);
const [url, seturl] = useState('');
const [userurl, setuserurl] = useState('');
const handleChange = (e) =>{
    if(e.target.files[0]){
        setimage(e.target.files[0]);
    }
}
//----------------------SIGN OUT SIGN IN LOGIN---------------------//
useEffect(()=>{
  onAuthStateChanged(auth, (authUser)=>{
    
    if(authUser){
      //user has logged in
      setUser(authUser);
      setdisplayusername(authUser.displayName);
      setuseremail(authUser.email);
      setuserurl(authUser.photoURL);
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
// const signout2 = (event) =>{
//   event.preventDefault();
//   signOut(auth)
// }
},[stories]);
  return (
    <div className={styles.app}>
    <div className={styles.app_header}>
      <h4 style={{color:'gold',fontSize:'19px'}}>vmeet</h4>

      {user?(
                  <Avatar
                  className="post_avatar"
                  alt = 'RafehQazi'
                  src = {userurl}
                  onClick={()=>signOut(auth)}
                  />
            // <Button onClick={()=>signOut(auth)}>Signout</Button>
          
          ):
          (
            <div className={styles.app_login}>
            <Avatar
                  className="post_avatar"
                  alt = 'RafehQazi'
                  src = {userurl}
                  onClick={signUp}
                  />
            </div>
          )
}
    </div>
    {displayusername?(
<Stories email={useremail} userurl={userurl} username={displayusername} />
    ):(
<h3>Sorry you need to login</h3>
    )
}
    {displayusername?(
    <Imageuplpad email={useremail} userurl={userurl} username={displayusername} />
    ):(
      <h3>sorry you need to login</h3>
    )
}
            <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form className='app_signup'>
              <h4 style={{
                textAlign:'center'
                }}>VMEET</h4>
                <p>SET PROFILE PHOTO</p>
    <progress className={styles.imageupload_progress} value={progress} max="100"></progress>
<input type="file" onChange={handleChange}/>
<Input
type="text"
placeholder='username'
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>
<Input
type="email"
placeholder='email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Input
type="password"
placeholder='password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<Button type="submit" onClick={signUp}>Signup</Button>
</form>
            </Box>
          </Modal>
          <Modal
            open={opensignin}
            onClose={()=>setopensignin(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form className='app_signup'>
              <h4 style={{
                textAlign:'center'
                }}>VMEET</h4>
<Input
type="email"
placeholder='email'
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<Input
type="password"
placeholder='password'
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<Button type="submit" onClick={signUp}>Login</Button>
</form>
            </Box>
          </Modal>

        </div>
    {
    posts.map(({post,id}) =>(
        <Post Type={post.type} key={id} postId={id} userurl2={post.userurl} email={useremail} displayname={displayusername} username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
      ))
    }
<Footer displayname={displayusername} userurl={userurl} />
    </div>

    
)
}
export default App;