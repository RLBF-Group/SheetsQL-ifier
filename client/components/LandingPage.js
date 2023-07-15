import React from 'react'
import ReadMe from './ReadMe.js'

const LandingPage = props => {
  
  const handleClick = e => {

  }

  return (
    <div className="mainContainer">      
      <div className="input">
        <form>
          <input placeholder='SELECT * FROM ...'/>
        </form>
      </div>
      <div className="button">
        <button onClick={handleClick}>&lt; GET &gt;</button>
      </div>
    </div>
  )
}

export default LandingPage;