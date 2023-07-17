import React from 'react'

const PrimaryKeyAndName = ({ formData, setFormData }) => {
  return (
    <div>
      <input 
        placeholder='Primary Key' 
        className="pkcm"
        value={formData.primaryKey}
        onChange = {e => {
          setFormData({ ...formData, primaryKey: e.target.value} )
        }}
      ></input>
      <input 
        placeholder='Column Name' 
        className="pkcm"
        value={formData.columnName}
        onChange = {e => {
          setFormData({ ...formData, columnName: e.target.value} )
        }}
      ></input>
    </div>
  )
}

export default PrimaryKeyAndName
