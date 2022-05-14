import { useRouter } from 'next/router';
import React,{useEffect, useState} from 'react';
import Post from './Post';
import {db ,rdb,storage} from './firebase';
import { collection, doc, query,getDocs,where} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'

const slug = () => {
    const router = useRouter();
const {pid} = router.query;
const [posts,setPosts] = useState([]);
const [pid2, setpid2] = useState([]);
console.log(router.query)
useEffect(()=>{
  //,where("username","==",`${pid}`)
const colref = query(collection(db,'photos'),where("username","==",router.query.name));
getDocs(colref).then(snapshot=>{
  setPosts(snapshot.docs.map(doc =>(
    {
      id:doc.id,
      post:doc.data()
    }
  )))
})
},[posts]);
  return (
    <div className={styles.app}>
        <p>{pid}</p>
       {
      posts.map(({post,id}) =>(
        <Post Type={post.type} key={id} postId={id} userurl2={post.userurl}  username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
      ))
    }
      </div>
  )
}

export default slug