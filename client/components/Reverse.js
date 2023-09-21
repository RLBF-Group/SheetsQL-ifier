import React, { useState, useEffect } from 'react'
import GoogleSheetsUrl from './GoogleSheetsUrl';
import DataRange from './DataRange';
import SqlDatabaseUrl from './SqlDatabaseUrl';
import PrimaryKeyAndName from './PrimaryKeyAndName';
import TableName from './TableName';
import Email from './Email';
import Url from './Url';

const Form = props => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    sqlDatabaseUrl: "",
    tableName: "",
    email: "",
  });
  const FormTitles = ["Please Enter SQL Database URL", "Please Enter Table Name From SQL Database", "Please Enter Email Address", "Here Is Your Google Sheet:"];
  
  const [googleSheetsErrorMessage, setGoogleSheetsErrorMessage] = useState();
  const [successClassName, setSuccessClassName] = useState("submitSuccessHide");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [updatedURL, setUpdatedURL] = useState('')

  useEffect(()=> {
    const {sqlDatabaseUrl, tableName, email} = formData;
    if (sqlDatabaseUrl.startsWith('postgres://') && tableName && email){
        setSubmitDisabled(false);
    } else {
      if (!submitDisabled) setSubmitDisabled(true);
    }
  }, [formData])

  const personalPage = () => {
    if(page === 0) {
    return <SqlDatabaseUrl 
        formData={formData}
        setFormData={setFormData}
      />
    } else if(page === 1) {
      return <TableName 
        formData={formData}
        setFormData={setFormData}
      />
    } else if(page === 2) {
        return <Email
        formData={formData}
        setFormData={setFormData}
      />

    } else if(page === 3) {
        return <Url
        // formData={formData}
        // setFormData={setFormData}
        updatedURL={updatedURL}
      />
    } 
  }

  const handleClick = e => {    
    const url = '/api/new'
    console.log('entered post for backend')
    fetch(url, { 
      method: 'POST',
      body: JSON.stringify({
        sqlDatabaseUrl: formData.sqlDatabaseUrl,
        tableName: formData.tableName,
        email: formData.email, 
      }),        
      headers: {
        'Content-Type': 'application/json'
      }
    }
   ) 
    //  .then(response => {
    //     console.log('entered response', response)
    //     //  response.json()
    // })
    // .then(data => {
    //    console.log('data jsoned', data)
    //    setUpdatedURL(data)
    }



  return (
    <div className="form">
      <div className="form-container">
        <div className={successClassName}>
          <p></p>
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

              if(page === 2) {
                {handleClick()}
                setSuccessClassName("submitSuccess");
                setPage((currPage) => currPage += 1)
              } else {
                  setPage((currPage) => currPage += 1)
                  setSuccessClassName("submitSuccessHide");
              }              
            }
          }>{page === 2 ? 'Submit' : 'Next'}</button>
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