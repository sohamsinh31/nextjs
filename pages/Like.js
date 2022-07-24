/* eslint-disable */
import {React,useState} from 'react'
import {FaAiOutlineLike, HiOutlineHeart, HiOutlineThumbUp, HiThumbUp} from 'react-icons/hi'
import {FcLike} from 'react-icons/fc'
import {db ,rdb,storage} from '../firebase';
import { remove,ref,push,set,child, query,get,onValue, orderByChild, startAt, endAt } from "firebase/database";
import styles from '../styles/Home.module.css'

const Like = ({postid,userid}) => {
  const [like, setlike] = useState(false)
  const [count, setcount] = useState('')
  const dbref = ref(rdb)
  function counter(){
    get(child(dbref, `likes/${postid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setcount(Object.entries(snapshot.val()).length)
        for (const [key, value] of Object.entries(snapshot.val())) {
          if(value.userid == userid){
            setlike(true)
              break;
          }
        }
      }
    })
  }
  counter()
  function likeupdate(){
    console.log(userid)
    push(ref(rdb, `likes/${postid}`), {
      userid:userid
    });
    setlike(true)
    console.log(like)
  }
  function checklike(){
    if(like){
      //console.log(postid)
      const colref = get(child(dbref, `likes/${postid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          for (const [key, value] of Object.entries(snapshot.val())) {
            console.log(key)
            if(value.userid == userid){
             remove(ref(rdb, `likes/${postid}/${key}`)).then(()=>console.log("data removed"))
             .catch((erorr)=>console.log(error))
                break;
            }
          }
        }
      })

      // 
      //)
      setlike(false)
    }
  }
  if(!like){
    return (<div className={styles.like}><div><HiOutlineHeart size={25} style={{float:'left',position:'absolute'}} onClick={likeupdate}></HiOutlineHeart></div><div><p style={{position:'absolute',float:'right',top:'66%',left:'8%'}}>{count}</p></div></div>)
  }
  else{
    return (<div className={styles.like}><div><FcLike size={25} style={{float:'left',position:'absolute'}} onClick={checklike}></FcLike></div><div><p style={{position:'absolute',float:'right',top:'66%',left:'8%'}}>{count}</p></div></div>)
  }
}

export default Like