import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/" className="linkToReadMe">HOME</Link>
      <Link to="/readme" className="linkToReadMe">READ ME</Link>      
      <Link to="/about" className="linkToReadMe">ABOUT US</Link>
    </div>
  )
}

export default Footer