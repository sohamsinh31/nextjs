import React from 'react'
import styles from '../styles/Home.module.css'

const Header = () => {
  return (
    <div className={styles.app_header}>
    <img style={{
      width:'98px',
      height:'50px'
    }} src="vmeetlogo.png" alt="vmeet" />
  </div>
  )
}

export default Header