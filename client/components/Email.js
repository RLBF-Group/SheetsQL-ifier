import React from 'react'

const Email = ({formData, setFormData}) => {
  return (
    <div>      
      <input 
        placeholder='Please insert your email' 
        value={formData.email}
        onChange={e => {          
          setFormData({ ...formData, email: e.target.value })
        }}        
      ></input>
    </div>
  )
}

export default Email
