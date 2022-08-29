/* eslint-disable */
import styles from '../styles/Home.module.css'
import React,{ useState,useRef} from 'react';
import Post from './Post';
import { useEffect } from 'react';
import 'firebase/firestore';
import { Avatar, colors } from '@mui/material';
import {GoogleAuthProvider,getRedirectResult, signInWithPopup,signInWithRedirect, getAuth,signOut, onAuthStateChanged , createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword,deleteUser  } from "firebase/auth";
import {db ,rdb,storage} from '../firebase';
//import { ref,getDownloadURL, uploadBytesResumable,deleteObject } from 'firebase/storage';
//import { addDoc,collection, doc, query,getDocs,orderBy, setDoc, startAt, endAt} from "firebase/firestore"; 
import { ref,child, query,get,onValue, orderByChild, startAt, endAt } from "firebase/database";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useMediaQuery from '@mui/material';
import axios from 'axios';
import Footer from './Footer';

//code starts from here

const baseurl = "https://picsum.photos/v2/list?page=2&limit=100";
const Search = () => {
  const[value,setvalue]=useState('');
  const [queries, setQueries] = useState([]);
  const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
  useEffect(() => {
  if(value==""){
    setQueries(null)
  }
  if(!value){
    setQueries(null)
  }
}, [queries])
useEffect(() => {
if(value.length>0){
    const colref = query(ref(rdb,'users/'),orderByChild("username"),startAt(value.toLocaleLowerCase()),endAt(value.toLocaleLowerCase()+"\uf8ff"));
    onValue(colref,(snapshot)=>{
      let data1 =  snapshot.val()
      let array = []
      if(!value && value==""){
        setQueries(null)
        array=[]
        return;
      }
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
}})
//console.log(queries)
// }, [queries])
//console.log(queries)
const [images, setimages] = useState([])
React.useEffect(() => {
  axios.get(baseurl).then((response) => {
    setimages(response.data);
  });
}, []);

  return (
    <div>
        <input style={{
          width:'100%',
          height:'33px',
          flex: '1',
          border: 'none',
          backgroundColor: 'transparent',
          borderTop: '1px solid white',
          borderBottom: '1px solid white',
          color: 'white'
        }} placeholder="Search.."  type="text" className='searchbar' onChange={(e)=> setvalue(e.target.value)} />
    {
     queries?(queries.map((post,id) =>(
            <div className={styles.searchapp}>
              <a href={`${post[0].username}`}>
                <Avatar
                  className="post_avatar"
                  style={{
                    width:'45px',
                    height:'45px',
                    float:'left'
                  }}
                  alt = 'user'
                  src = {post[0].profile}
                  /><h3>{post[0].username}</h3>
                  </a>
            </div>
            ))):(
              <div></div>
            )
    }
    <p>This images is  from picsum photos all right is given to honourable owner.This is demo images only.</p>
 <ImageList sx={{ width: '100%', height: "100%",mb:8,gridTemplateColumns: 'repet(auto-fill,minmax(200px,ifr))!important' }} cols={3} gap={2}>
  {
  images?(images.map((key,index) =>(
    <ImageListItem key={index}>
              <img
                onMouseDown={handleClose}
                onClick={handleOpen}
                onTouchStart={handleOpen}
                onTouchCancel={handleClose}
                onMouseUp={handleOpen}
                style={{
                  width:'120px',
                  height:'120px',
                  objectFit:'crop'
                }}
                  src={key.download_url}
                  srcSet={key.download_url}
                  alt={key.author}
                  loading="lazy"
                />
    </ImageListItem>
  )
  )):(
    <p></p>
  )
}
 </ImageList>
 <Footer/>
    </div>
  )
}

export default Search