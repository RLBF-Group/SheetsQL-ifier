import React from 'react'

const DataRange = ({formData, setFormData}) => {
  return (
    <div>      
      <input 
        placeholder='e.g. - Sheet1!A1:B6' 
        value={formData.dataRange}
        onChange={e => {          
          setFormData({ ...formData, dataRange: e.target.value })
        }}        
      ></input>
    </div>
  )
}

export default DataRange
