/* eslint-disable */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import Post from './Post';
import {db ,rdb,storage} from '../firebase';
import { ref,child, query,get,onValue, orderByChild, startAt, endAt } from "firebase/database";
import Imageuplpad from './Imageuplpad';
import { collection, doc, query as q2,getDocs,where} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'
import {GoogleAuthProvider,getRedirectResult, signInWithRedirect, getAuth,signOut, onAuthStateChanged , createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword,deleteUser  } from "firebase/auth";
import Footer from './Footer';
import Search from './Search'
import { Avatar } from '@mui/material';


const Slug = () => {
    const router = useRouter();
const {pid} = router.query;

const [posts,setPosts] = useState([]);

useEffect(() => {
  if (router.asPath !== router.route) {
    // router.query.lang is defined
  }
}, [router])
const slug2 = router.query.slug;
useEffect(()=>{
const colref = q2(collection(db,'photos'),where("username","==",`${router.query.slug}`));
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
const [queries, setQueries] = useState([]);

const colref = query(ref(rdb,'users/'),orderByChild("username"),startAt(slug2),endAt(slug2+"\uf8ff"));
onValue(colref,(snapshot)=>{
  let data1 =  snapshot.val()
  let array = []
  if(!snapshot.val()){
    setQueries(null)
    array = []
    return;
    ;}
  for (const [key, value] of Object.entries(data1)) {
    array.push([value,key])
   
  }
  setQueries(array)
},{
onlyOnce:true
}
);

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
else if(router.query.slug == 'search'){
  return <Search/>
}

else{
  return (
    <div className={styles.app}>
          <div className={styles.app_header}>
      <h4 style={{color:'gold',fontSize:'19px'}}>vmeet</h4>
      </div>
      {
              queries.map((post,index)=>(
            <div className={styles.searchapp}>
                <Avatar
                  className="post_avatar"
                  style={{
                    width:'65px',
                    height:'65px',
                    float:'left'
                  }}
                  alt = 'user'
                  src = {post[0].profile}
                  /><h2>{post[0].username}</h2>
                </div>
              ))
            }
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