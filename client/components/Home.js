import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="button-home">
        <Link to="/form" className="linkToForm"><button>SheetsQL-ifier</button></Link>
        <Link to="/reverse" className="linkToReverse"><button className='rev-button'>Reversifier</button></Link>
    </div>
  )
}


export default Home;