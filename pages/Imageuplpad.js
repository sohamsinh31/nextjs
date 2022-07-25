/* eslint-disable */
import React,{useState} from 'react';
import { Button } from '@mui/material';
import {db ,rdb,storage} from '../firebase';
import { ref,getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {addDoc,collection,serverTimestamp,increment,Timestamp, doc, setDoc, FieldValue } from "firebase/firestore"; 
import styles from '../styles/Home.module.css'
import Header from './Header';

const Imageuplpad = ({username,email,userurl}) => {
const [caption, setcaption] = useState('');
const [progress, setprogress] = useState(0);
const [image, setimage] = useState(null);
const [type, settype] = useState('')
const handleChange = (e) =>{
    if(e.target.files[0]){
        setimage(e.target.files[0]);
        settype(e.target.files[0].type)
    }
}
const handleupload = () =>{
const strref = ref(storage,`images/${username}/${image.name}`);
const metadata = {
    contentType: type,
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
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();
    
    const timestamp = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
    getDownloadURL(ref(storage, `images/${username}/${image.name}`)).then(url=>{
         addDoc(collection(db, "photos"), {
            timestamp: timestamp,
            caption:caption,
            imageurl:url,
            userurl:userurl,
            username:username,
            email:email,
            type:type
          });
          setprogress(0);
          setcaption("");
          setimage(null);
    })
});
}
  return (
    <div>
    <Header/>
    <div className={styles.imageupload}>
        <h3>Upload photo/video/gif files here</h3>
    <progress className="imageupload_progress" value={progress} max="100"></progress>
    <input type="text" placeholder='Enter a caption..' onChange={event =>setcaption(event.target.value)} value={caption}/>
    <input accept=".jpeg , .jpg, .png ,.mp4 ,.gif" type="file" onChange={handleChange}/>
    <Button onClick={handleupload}>Upload</Button>
    </div>
    </div>
  )
}

export default Imageuplpad