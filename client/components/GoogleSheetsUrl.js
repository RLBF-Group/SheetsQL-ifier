import React from 'react'

const GoogleSheetsUrl = ({formData, setFormData}) => {
  return (
    <div>      
      <input 
        // type="url"
        // name="googleSheetsUrl"
        // id="googleSheetsUrl"
        placeholder='Google Sheets URL' 
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
