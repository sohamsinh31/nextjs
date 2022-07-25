/* eslint-disable */
import React from 'react'
import { FaGithub,FaHome,FaSearch,FaPlus } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import { Avatar } from '@mui/material';

const Footer = ({userurl,displayname,signup,signout}) => {
  return (
    <div className={styles.app_footer}>
        <a href='/'><FaHome size={25}/></a>
        <a href='/search'><FaSearch size={25}/></a>
        <a href='Imageupload'><FaPlus size={25}/></a>
        <a href='https://github.com/sohamsinh31'><FaGithub size={25}/></a>
        {
          displayname?(<a href={`/${displayname}`}><Avatar src={userurl} onClick={signout} alt="soham" style={{borderRadius:'100px',
          width:'27px',height:'30px',float:'left'}} /></a>):(
            <Avatar src={userurl} alt="soham" onClick={signup} style={{borderRadius:'100px',
            width:'27px',height:'30px',float:'left'}} />
          )

        }
    </div>
  )
}

export default Footer