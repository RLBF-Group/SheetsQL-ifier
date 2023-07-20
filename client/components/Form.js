import React, { useState, useEffect } from 'react'
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
  const [googleSheetsErrorMessage, setGoogleSheetsErrorMessage] = useState();
  const [successClassName, setSuccessClassName] = useState("submitSuccessHide");

  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(()=> {
    const {googleSheetsUrl, dataRange, sqlDatabaseUrl, primaryKey, columnName} = formData;
    if (googleSheetsUrl.startsWith('https://docs.google.com/spreadsheets/') &&
    dataRange.startsWith('Sheet') && 
    sqlDatabaseUrl.startsWith('postgres://') && primaryKey && columnName
    )
      setSubmitDisabled(false);
    else {
      if (!submitDisabled) setSubmitDisabled(true);
    }
  }, [formData])

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
    const url = '/api/sheets'
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
        <div className={successClassName}>
          <p>Successfully Submitted</p>
        </div>
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
            onClick={() => {
              if (successClassName==='submitSuccess')
                setSuccessClassName('submitSuccessHide');
              setPage((currPage) => currPage -= 1)}
            }
          >Prev</button>
          <button 
            className="formButtonNext"
            disabled = {
              // different cases for prev, next, and submit
              (page === FormTitles.length -1 ) && (submitDisabled)
            }
            onClick={() => {
              if(page === 3) {
                {handleClick()}
                setSuccessClassName("submitSuccess");
              } else {
                  setPage((currPage) => currPage += 1)
                  setSuccessClassName("submitSuccessHide");
              }              
            }
          }>{page === 3 ? 'Submit' : 'Next'}</button>
        </div>
        <div className="pageNumber">
          <p>{page + 1}/4</p>
        </div>
        <div className="errorMessage">
          <p>{googleSheetsErrorMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default Form