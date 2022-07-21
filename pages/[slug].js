/* eslint-disable */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import Post from './Post';
import {db ,rdb,storage} from '../firebase';
import Imageuplpad from './Imageuplpad';
import { collection, doc, query,getDocs,where} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'
import {GoogleAuthProvider,getRedirectResult, signInWithRedirect, getAuth,signOut, onAuthStateChanged , createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword,deleteUser  } from "firebase/auth";
import Footer from './Footer';


const Slug = () => {
    const router = useRouter();
const {pid} = router.query;
const [posts,setPosts] = useState([]);

useEffect(() => {
  if (router.asPath !== router.route) {
    // router.query.lang is defined
  }
}, [router])
useEffect(()=>{
  //,where("username","==",`${pid.slug}`)
  // router.query.map(e=>(setpid2(e)));
const colref = query(collection(db,'photos'),where("username","==",`${router.query.slug}`));
getDocs(colref).then(snapshot=>{
  setPosts(snapshot.docs.map(doc =>(
    {
      id:doc.id,
      post:doc.data()
    }
  )))
})

},[posts]);
const auth = getAuth();
const [user, setUser] = useState(null);
const [username, setUsername] = useState('');
const [userurl, setuserurl] = useState('');
const [useremail, setuseremail] = useState(null);
const [displayusername, setdisplayusername] = useState(null);
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
// console.log(posts.length)
if(router.query.slug == 'Imageupload'){
  return (
    <div>
    <Imageuplpad email={useremail} userurl={userurl} username={displayusername} />
    <Footer userurl={userurl} displayname={displayusername} />
    </div>
  )
}
else{
  return (
    <div className={styles.app}>
          <div className={styles.app_header}>
      <h4 style={{color:'gold',fontSize:'19px'}}>vmeet</h4>
      </div>
       {
           posts.length==0?(
            <p>no posts found</p>
            ):(
              posts.map(({post,id},index) =>(
              <Post Type={post.type} displayname={displayusername}  postId={id} key={id}  userurl2={post.userurl}  username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
          )
         ))
            }
      </div>
  )
}
}
export default Slug