import React from 'react'
import { FaGithub,FaHome,FaSearch,FaPlus } from 'react-icons/fa'
import styles from '../styles/Home.module.css'
import { Avatar } from '@mui/material';

const Footer = ({userurl}) => {
  return (
    <div className={styles.app_footer}>
        <a href='index'><FaHome size={25}/></a>
        <FaSearch size={25}/>
        <FaPlus size={25}/>
        <a href='https://github.com/sohamsinh31'><FaGithub size={25}/></a>
        <img src={userurl} alt="soham" style={{borderRadius:'100px'}} />
    </div>
  )
}

export default Footer