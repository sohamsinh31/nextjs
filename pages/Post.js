/* eslint-disable */
import React,{useEffect, useState} from 'react';
import { Avatar } from '@mui/material';
import {db ,rdb,storage} from '../firebase';
import Userpro from './Userpro';
import App from './index';
import {  query, addDoc ,collection, doc, getDocs,child, setDoc ,forEach} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'

function Post({Type,username,displayname,postId,userurl2, caption,email, imageurl,timestamp}) {
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState([]);
  useEffect(()=>{
    let unsuscribe;
     // let colref= collection(db, "photos", "comments"),postId)
   const q= query(collection(db, "photos",`${postId}` ,"comments"))
   getDocs(q).then((snapshot)=>{
        setcomments((snapshot.docs.map(doc=>({
          post:doc.data()
        }))))
      })
  return unsuscribe;
  
},[comments]);
const postcomment =(event)=>{
  event.preventDefault();
  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();
  
  const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  addDoc(collection(db, "photos",`${postId}` ,"comments"),{
    text:comment,
    username:displayname,
    timestamp: timestamp
  })
  setcomment('');
}

  return (
    <div className ={styles.post}>
      <a href={`/${username}`}>
      <div className = {styles.post_header} >
          <Avatar
            className="post_avatar"
            alt = 'RafehQazi'
            src = {userurl2}
            />
            <h3>{username}</h3>
      </div>
      </a>
    
      <img src={imageurl} className={styles.post_image}/>
            <h4 className="post_test">{caption}</h4><h6 className={styles.time}>{timestamp}</h6>
            
    {
      <div className={styles.post_comments}>
        {comments.map(({post})=>(
          <p>
            <strong style={{color:'white',fontSize:'bold',marginRight:'5px'}}>{post.username}</strong>{post.text}
          </p>
        ))}
      </div>
    }
    <form className={styles.post_comment}>
      <input
      className={styles.post_input}
      type='text'
      placeholder="Add a comment.."
      value={comment}
      onChange={(e)=>setcomment(e.target.value)}
      />
      <button
      className={styles.post_button}
      disabled={!comment}
      type='submit'
      onClick={postcomment}
      >Post</button>
    </form>
    </div>
  )
}
export default Post;