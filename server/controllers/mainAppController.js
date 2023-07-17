const axios = require('axios');
const db = require('../models/sqlModels');
const format = require('pg-format');
const exec = require('child_process').exec;
const mainAppController = {};
const fsCallback = require('fs');
const path = require('path');

const psqlCommand =
  'psql -d <url from elephantSQL> -f googleapi_postgres_create.sql';

const tableName = 'peopleInSS';
let colNames = [];
primaryKey = 'id';

let sheet;

fsCallback.readFile(
  path.resolve(__dirname, '../models/data.json'),
  'UTF-8',
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // return next(createErr({
    //     method: 'getCharacters',
    //     type: 'reading file',
    //     err,
    //   }));
    //console.log(data)
    sheet = JSON.parse(data).data.values;
    console.log('sheet:', sheet);
    // res.locals.characters = parsedData.results;
    // return next();

    //create an empty matrix based on our data.json
    const numOfCols = sheet.length;
    const numOfRows = sheet[0].length;
    let matrix = new Array(numOfRows);

    for (let i = 0; i < numOfRows; i++) {
      matrix[i] = new Array(numOfCols);
    }

    //assign each cell value into it's respective matrix index
    sheet.forEach((col, i) => {
      //colNames.push(col[0])
      col.forEach((cell, j) => {
        matrix[j][i] = cell;
      });
    });
    // console.log(matrix)
    // transform col array to two array

    // make $1, $2, $3... our conditional checks if we reached the end, if so we no longer need a comma
    let value = '';
    for (let i = 0; i < numOfCols; i++) {
      if (i === numOfCols - 1) value += `$${i + 1}`;
      else value += `$${i + 1},`;
    }

    console.log('value: ', value);

    //grabs our column names
    colNames = matrix[0];
    // console.log("colNames: ", colNames)

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
        const createTable = await db.query(text1);
        //may need to slice out first element to get rid of our column name, leaving it as i+1 for now
        const insertTable = await matrix.forEach((ele, i) => {
          db.query(text2, matrix[i + 1]);
        });
      } catch (err) {
        console.log(`invalid entry :${err}`);
      }
    }
    queryDB();

    // db.query(text1)
    //     .then(data => {
    //         console.log("createTable")
    //     })
    //     .then(() => {
    //         console.log('matrix slice', matrix.slice(1))
    //         console.log('matrix[0]:', matrix[0])
    //         console.log('matrix length', matrix.length)

    //         db.query(text2, matrix[1])
    //             .then(data => {
    //                 console.log("insertTable")
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })

    // })
    //     .catch(err => {
    //         console.log(err)
    //     })

    // matrix.forEach((row, i) => {
  }
);

mainAppController.parsedata = (req, res, next) => {
  //parse our input data
  // function parse(data) {
  //     const rows = data.sheets[0].data[0].rowData; //[{ value: [{ celldata }, {}, ..] }, { second row }, { third row } ...]
  //     rows.forEach(row => {
  //         const eachRow = [];
  //         row.values.forEach(cell => {
  //             eachRow.push(cell.userEnteredValue.stringValue);
  //             //console.log(cell.userEnteredValue.stringValue);

  //         });
  //         const colLength = colNames.length;
  //         const value = ''
  //         for (let i = 0; i < colLength; i++) {
  //             if (i === colLength) value += `$${i + 1}`
  //             value += `$${i + 1},`
  //         }
  //         colNames.join(',')

  // const text = `INSERT INTO ${tableName} (${colNames}) VALUES (${value})`
  //         // const text = `INSERT INTO people (name, mass, birth_year, gender, height)
  //         // VALUES($1,$2,$3,$4,$5)`

  //         db.query(text, eachRow)
  //             .then(data => {
  //                 res.locals.rowData = data;
  //                 return next()
  //             }
  //             )
  //             .catch(err => {
  //                 next({ err })
  //             })

  //     })

  // }

  function parseSpreedSheet(sheet) {
    const values = sheet.data.values;
  }

  const text = `CREATE TABLE IF NOT EXISTS ${tableName} (
        username varchar(45) NOT NULL,
        password varchar(450) NOT NULL,
        enabled integer NOT NULL DEFAULT '1',
        PRIMARY KEY (username)
      )`;
};
// mainAppController.execTerminal = (req, res, next) => {

//     exec(psqlCommand, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`exec error: ${error}`)
//             return next();
//         }
//         res.locals.database = stdout
//         console.log(`stdout: ${stdout}`);
//         console.error(`stderr: ${stderr}`);
//     });
// }

//const { exec } = require('node:child_process');

//console.log(sheet)

module.exports = mainAppController;
