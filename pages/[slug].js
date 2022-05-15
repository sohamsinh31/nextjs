/* eslint-disable */
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';
import Post from './Post';
import {db ,rdb,storage} from '../firebase';
import { collection, doc, query,getDocs,where} from "firebase/firestore"; 
import styles from '../styles/Home.module.css'

const Slug = () => {
    const router = useRouter();
const {pid} = router.query;
const [posts,setPosts] = useState([]);

useEffect(() => {
  if (router.asPath !== router.route) {
    // router.query.lang is defined
    console.log(router.query)
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

  return (
    <div className={styles.app}>
      <p>{pid}</p>
       {
      posts.map(({post},index) =>(
        <Post Type={post.type} key={index}  userurl2={post.userurl}  username={post.username} caption = {post.caption} timestamp={post.timestamp} imageurl={post.imageurl}/>
      ))
    }
      </div>
  )
}
// export default function useQuery() {
//   const router = useRouter();
//   const ready = router.asPath !== router.route;
//   if (!ready) return null;
//   console.log(router.query)
//   return router.query;
// }
// export function getServerSideProps(context) {
//   return {
//     props: {params: context.props}
//   };
// }

// export default ({params}) => {
//   const {id} = params;
//   return <div>You opened page with {id}</div>;
// };
export default Slug