import React from 'react'

const GoogleSheetsUrl = ({formData, setFormData}) => {
  return (
    <div>      
      <input 
        // type="url"
        // name="googleSheetsUrl"
        // id="googleSheetsUrl"
        placeholder='https://docs.google.com/spreadsheets/...' 
        value={formData.googleSheetsUrl}
        onChange={e => {          
          setFormData({ ...formData, googleSheetsUrl: e.target.value })
        }}        
        // required
      ></input>
    </div>
  )
}

export default GoogleSheetsUrl
