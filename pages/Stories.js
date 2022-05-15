/* eslint-disable */
import React,{useState,useEffect} from 'react';
import { Button } from '@mui/material';
import {db ,rdb,storage} from '../firebase';
import { ref,getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {addDoc,collection, doc, setDoc, FieldValue,orderBy,query,getDocs } from "firebase/firestore"; 
import styles from '../styles/Home.module.css'

const Stories = ({username,email,userurl,imageurl1,username1}) => {
    const [progress, setprogress] = useState(0);
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
    const [image, setimage] = useState(null);
const handleChange = (e) =>{
    if(e.target.files[0]){
        setimage(e.target.files[0]);
    }
}
const handleupload = () =>{
const strref = ref(storage,`stories/${username}/${image.name}`);
const metadata = {
    contentType: 'image/jpeg',
  };
const uploadtask = uploadBytesResumable(strref,image,metadata)
uploadtask.on(
    "state_changed",
    (snapshot)=>{
        const progress = Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setprogress(progress);
    },
    (error)=>{
        console.log(error)
        alert(error.massage);
    },
    ()=>{
        getDownloadURL(ref(storage, `stories/${username}/${image.name}`)).then(url=>{
         addDoc(collection(db, "stories"), {
            imageurl:url,
            username:username,
            email:email,
          });
          setimage(null);
          setprogress(0);
        })
    });
}
  return (
    <div className={styles.app_stories}>
        <div className={styles.app_story_upload}>
        <progress className={styles.imageupload_progress} value={progress} max="100"></progress>
<input className={styles.app_input} type="file" onChange={handleChange}/>
<Button onClick={handleupload}>Upload</Button>
</div>

    {
stories.map(({post,id}) =>(
<div className={styles.div_border}>
<img 
className={styles.app_image}
width={75}
height={105}
src={post.imageurl}
/>
<h6>{post.username}</h6>
</div>

))
    }
</div>

  )
}

export default Stories