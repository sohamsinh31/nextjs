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
import Like from './Like';
import Header from './Header';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const Slug = () => {
    const router = useRouter();
const {pid} = router.query;

const [posts,setPosts] = useState([]);
const [images,setImages] = useState([]);

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
  // setImages(snapshot.docs.map(doc =>(
  //   {
  //     id:doc.id,
  //     post:doc.data()
  //   }
  // )))
})

},[posts]);
const auth = getAuth();
const [user, setUser] = useState(null);
const [username, setUsername] = useState('');
const [userurl, setuserurl] = useState('');
const [useremail, setuseremail] = useState(null);
const [displayusername, setdisplayusername] = useState(null);
const [queries, setQueries] = useState([]);
const [userid, setuserid] = useState('');
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  color:'white',
  p: 4,
};

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
      setuserid(authUser.uid);
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
else if(router.query.slug == 'search'|| slug2 == 'Search'){
  return <Search/>
}
else{
  return (
    <div className={styles.app}>
      <Header/>
      {
              queries.length==0?(<p>No results found</p>):(queries.map((post,index)=>(
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
              )))
                
            }
    <ImageList sx={{ width: 500, height: "100%" }} cols={3} rowHeight={124}>
       {
           posts.length==0?(
            <p>no posts found</p>
            ):(
              posts.map(({post,id},index) =>(
              post.type==''?(<p>No more images</p>):(
                <div>
                <ImageListItem key={index}>
                <img
                onClick={handleOpen}
                style={{
                  width:'120px',
                  height:'120px',
                  objectFit:'crop'
                }}
                  src={post.imageurl}
                  srcSet={post.imageurl}
                  alt={post.caption}
                  loading="lazy"
                />
              </ImageListItem>
                  <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                   <Box className={styles.box} >
                    <div style={{
                      zIndex:1
                    }}>
              <Post Type={post.type} userid={userid} displayname={displayusername}  postId={id} key={id}  userurl2={post.userurl}  username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
              </div></Box>
              </Modal>
              </div>
          )
              )
         ))
            }
            </ImageList>
            <Footer/>
      </div>
     
  )
}
}
export default Slug