/* eslint-disable */
import React from 'react'
import { FaGithub,FaHome,FaSearch,FaPlus } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import { Avatar } from '@mui/material';

const Footer = ({userurl,displayname}) => {
  return (
    <div className={styles.app_footer}>
        <a href='/'><FaHome size={25}/></a>
        <a href='/search'><FaSearch size={25}/></a>
        <a href='Imageupload'><FaPlus size={25}/></a>
        <a href='https://github.com/sohamsinh31'><FaGithub size={25}/></a>
        <a href={`/${displayname}`}><img src={userurl} alt="soham" style={{borderRadius:'100px',
      width:'31px',float:'left'}} /></a>
    </div>
  )
}

export default Footer