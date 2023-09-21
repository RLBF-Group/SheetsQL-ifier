const axios = require('axios');
const db = require('../models/sqlModels');
const format = require('pg-format');
const exec = require('child_process').exec;
const sqlController = {};
const fsCallback = require('fs');
const path = require('path');
const { Pool } = require('pg');

let colNames = [];

sqlController.linkDb = async (req, res, next) => {
  const { sqlDatabaseUrl } = req.body;
  const pool = new Pool({
    connectionString: sqlDatabaseUrl,
  });
  res.locals.query = (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  };
  return next();
};

sqlController.createTable = async (req, res, next) => {
  let { primaryKey } = req.body;

  //get sheet from res.locals
  const sheet = res.locals.data.values;
  console.log('sheet:', sheet);
  const tableName = res.locals.data.titles.sheets[0].properties.title; //pending input from Peter
  console.log('tableName :', tableName);

  // assign primary key
  if (!primaryKey) primaryKey = sheet[0][0];

  //get length of rows and columns
  const numOfRows = sheet.length;
  const numOfCols = sheet[0].length;

  // make $1, $2, $3... our conditional checks if we reached the end, if so we no longer need a comma
  let value = '';
  for (let i = 0; i < numOfCols; i++) {
    if (i === numOfCols - 1) value += `$${i + 1}`;
    else value += `$${i + 1},`;
  }

  console.log('value: ', value);

  //grabs our column names
  colNames = sheet[0];

  //insert values into respective columns
  const text2 = `INSERT INTO ${tableName} (${colNames.join(
    ','
  )}) VALUES (${value})`;
  console.log('text2: ', text2);

  //assigns the type of values (varchar) that can be input into our columns
  let subText = '';
  for (let i = 0; i < colNames.length; i++) {
    subText += `${colNames[i].replace(/\s/g, '')} varchar,`;
  }
  // console.log('subText:', subText)

  //our query text if table does not exist yet
  const text1 = `CREATE TABLE IF NOT EXISTS ${tableName} (
                  ${subText}
                  PRIMARY KEY (${primaryKey})
                )`;

  console.log('text1: ', text1);

  //using async await, we push our data using a for loop

  async function queryDB() {
    try {
      const createTable = await res.locals.query(text1);
      //may need to slice out first element to get rid of our column name, leaving it as i+1 for now
      for (let i = 1; i < sheet.length; i++) {
        await res.locals.query(text2, sheet[i]);
      }
    } catch (err) {
      console.log(`invalid entry :${err}`);
      return next({
        log: `sqlController.createTable: Error: ${err}`,
        message: {
          err: 'Error in your controller. Check server logs for details',
        },
      });
    }
  }
  await queryDB();
  return next();
};

sqlController.readTable = async (req, res, next) => {
  const {tableName} = req.body;
  
try {
  const text = `SELECT * FROM ${tableName}`;
  const data = await db.query(text)
  console.log('here is the data', data.rows)
  res.locals.value = data.rows
  next()
}
catch (err) {
  console.log(err)
}
}


module.exports = sqlController;


// pool.query(text1)
// .then(result => console.log(result))