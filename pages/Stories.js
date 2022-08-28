/* eslint-disable */
import React,{useState,useEffect} from 'react';
import { Button } from '@mui/material';
import {db ,rdb,storage} from '../firebase';
import { ref,getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {addDoc,collection, doc, setDoc, FieldValue,orderBy,query,getDocs } from "firebase/firestore"; 
import styles from '../styles/Home.module.css'
import {FaPlus} from 'react-icons/fa'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Stories = ({username,email,userurl,imageurl1,username1}) => {
    const [progress, setprogress] = useState(0);
    const [stories,setstories] = useState([]);
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
        const strref = ref(storage,`stories/${username}/${e.target.files[0].name}`);
const metadata = {
    contentType: 'image/jpeg',
  };
const uploadtask = uploadBytesResumable(strref,e.target.files[0],metadata)
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
        getDownloadURL(ref(storage, `stories/${username}/${e.target.files[0].name}`)).then(url=>{
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
{/* <input className={styles.app_input} type="file" onChange={handleChange}/>
<Button onClick={handleupload}>Upload</Button> */}
<IconButton color="primary" aria-label="upload picture" component="label">
    <input hidden  accept=".jpeg , .jpg, .png ,.mp4 ,.gif" type="file" onChange={handleChange}/>
    <FaPlus size={50}/>
      </IconButton>
</div>

    {
stories.map(({post,id}) =>(
<div className={styles.div_border}>
<img
onClick={handleOpen}
className={styles.app_image}
// width={75}
// height={105}
src={post.imageurl}
/>
<div className={styles.hide}><h6>{post.username}</h6></div>
<Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                   <Box sx={style} >
                   <img 
                   style={{
                    width:'100%',
                    height:'80%'
                   }}
                    src={post.imageurl}
                    />              
                  </Box>
              </Modal>
</div>

))
    }
</div>

  )
}

export default Stories