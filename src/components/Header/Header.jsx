import React from 'react'
import img from "../../assets/Logo redact.jpg"
import "./Header.css";

const Header = () => {
  return (
    <div className='Header'>
        <img src={img} alt="logo del e-comerce" />
        <span></span>
        <h1>The Clothes of gods</h1>
    </div>
  )
}

export default Header