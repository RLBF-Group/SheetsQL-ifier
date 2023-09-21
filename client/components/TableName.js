import React from 'react'

const TableName = ({formData, setFormData}) => {
  return (
    <div>      
      <input 
        placeholder='e.g. - Sheet1' 
        value={formData.tableName}
        onChange={e => {          
          setFormData({ ...formData, tableName: e.target.value })
        }}        
      ></input>
    </div>
  )
}

export default TableName


