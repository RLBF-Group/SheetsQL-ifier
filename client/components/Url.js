import React from 'react'

const Url = ({updatedURL}) => {
    console.log('updatedURL', updatedURL)

  

  return (
    <div>      
    <h1> Here's your sheet URL:</h1>
       <a href='https://docs.google.com/spreadsheets/d/180Ir80nuDycvrQSYKbVJKdhGxTtM9DQ8M2HbxiJg5Ps/edit#gid=0'>Click here</a>
    </div>
  )
}


export default Url
