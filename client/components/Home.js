import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <Link to="/form" className="linkToForm"><button>Original SheetsQL-ifier</button></Link>
        <Link to="/reverse" className="linkToReverse"><button>Reversifier</button></Link>
    </div>
  )
}


export default Home;