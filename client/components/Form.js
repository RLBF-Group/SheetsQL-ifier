import React, { useState } from 'react'
import GoogleSheetsUrl from './GoogleSheetsUrl';
import DataRange from './DataRange';
import SqlDatabaseUrl from './SqlDatabaseUrl';
import PrimaryKeyAndName from './PrimaryKeyAndName';

const Form = props => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    googleSheetsUrl: "",
    dataRange: "",
    sqlDatabaseUrl: "",
    primaryKey: "",
    columnName: ""
  });
  const FormTitles = ["Please Enter Google Sheets URL", "Please Enter Data Range for Google Sheets", "Please Enter SQL Database URL", "Please Enter Primary Key and Column Name"];
  const [errorMessage, setErrorMessage] = useState();

  const personalPage = () => {
    if(page === 0) {
      return <GoogleSheetsUrl 
        formData={formData}
        setFormData={setFormData}
      />
    } else if(page === 1) {
      return <DataRange 
        formData={formData}
        setFormData={setFormData}
      />
    } else if(page === 2) {
      return <SqlDatabaseUrl 
        formData={formData}
        setFormData={setFormData}
      />
    } else if(page === 3) {
      return <PrimaryKeyAndName 
        formData={formData}
        setFormData={setFormData}
      />
    } 
  }

  const handleClick = e => {    
    const url = '/api'
    fetch(url, { 
      method: 'POST',
      body: JSON.stringify({
        googleSheetsUrl: formData.googleSheetsUrl,
        dataRange: formData.dataRange,
        sqlDatabaseUrl: formData.sqlDatabaseUrl,
        primaryKey: formData.primaryKey,
        columnName: formData.columnName
      }),        
      headers: {
        'Content-Type': 'application/json'
      }
    })       
  }

  return (
    <div className="form">
      <div className="form-container">
        <div className="formHeader">
          <h3>{FormTitles[page]}</h3>
        </div>
        <div className="formBody">
          {personalPage()}
        </div>
        <div className="formFooter">
          <button
            className="formButton"
            disabled = {page === 0}
            onClick={() => setPage((currPage) => currPage -= 1)}
          >Prev</button>
          <button 
            className="formButtonNext"
            disabled = {page === FormTitles.length}
            onClick={() => {
              if(page === 3) {
                {handleClick()}
              } else {
                  setPage((currPage) => currPage += 1)
              }
              if(page === 0 && formData.googleSheetsUrl.slice(0, 37) !== 'https://docs.google.com/spreadsheets/') {
                setErrorMessage('Please Enter a Valid URL')
              } 
            }
          }>{page === 3 ? 'Submit' : 'Next'}</button>
        </div>
        <div className="pageNumber">
          <p>{page + 1}/4</p>
        </div>
      </div>
    </div>
  )
}

export default Form