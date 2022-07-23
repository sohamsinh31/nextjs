/* eslint-disable */
import React,{useEffect, useState} from 'react';
import { Avatar } from '@mui/material';
import {db ,rdb,storage} from '../firebase';
import Userpro from './Userpro';
import App from './index';
import {  query, addDoc ,collection, doc, getDocs,child, setDoc ,forEach} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'
import { FaRegComments } from 'react-icons/fa';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Post({Type,username,displayname,postId,userurl2, caption,email, imageurl,timestamp}) {
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState([]);
  const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  color:'black',
  p: 4,
};

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
            <h3 style={{color:'gold'}}>{username}</h3>
      </div>
      </a>
    
      <img src={imageurl} className={styles.post_image}/>
        <button onClick={handleOpen}><FaRegComments size={25}></FaRegComments></button>
            <h4 className={styles.post_test}>{caption}</h4><h6 className={styles.time}>{timestamp}</h6>
            
    {
      <div className={styles.post_comments}>
        {comments.map(({post},index)=> index<2 && (
          <p>
            <strong style={{color:'gold',fontSize:'bold',marginRight:'5px'}}><a href={`/${post.username}`}>{post.username}</a></strong>{post.text}
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
    <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
          <div className={styles.post_comments}>
        {comments.map(({post},index)=>  (
          <p>
            <strong style={{color:'gold',fontSize:'bold',marginRight:'5px'}}><a href={`/${post.username}`}>{post.username}</a></strong>{post.text}
          </p>
        ))}
      </div>
      </Box>
            </Modal>
    </div>
  )
}
export default Post;