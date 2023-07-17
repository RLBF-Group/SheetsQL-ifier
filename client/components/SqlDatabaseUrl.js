import React from 'react'

const SqlDatabaseUrl = ({formData, setFormData}) => {
  return (
    <div>
      <input 
        placeholder='SQL Database URL'
        value={formData.sqlDatabaseUrl}
        onChange = {e => {
          setFormData({ ...formData, sqlDatabaseUrl: e.target.value} )
        }}
      ></input>
    </div>
  )
}

export default SqlDatabaseUrl
