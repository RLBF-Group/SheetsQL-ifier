// const axios = require('axios');
// const db = require('../models/sqlModels');
// const format = require('pg-format');
// const exec = require('child_process').exec;
// const sqlController = {};
// const fsCallback = require('fs');
// const path = require('path');

// const tableName = 'peopleInAfrica';
// let colNames = [];
// // primaryKey = 'id';

// sqlController.createTable = async (req, res, next) => {
//   const {primaryKey} = req.body
  
//   //get item from each row in that position
//   // const matrixTranspose = (matrix) => {
//   //   const transposed = [];

//   //   for (let i = 0; i < matrix[0].length; i++) {
//   //     const row = [];
//   //     for (let j = 0; j < matrix.length; j++) {
//   //       row.push(matrix[i][j]);
//   //     }
//   //     transposed.push(row);
//   //   }
//   //   return transposed;
//   // };
//   // [
//   //     ["id", "name"],
//   //     ["1", "q"],
//   //     ["2", "w"]
//   // ]
//   // fsCallback.readFile(
//   //   path.resolve(__dirname, '../models/data.json'),
//   //   'UTF-8',
//   //   (err, data) => {
//   //     if (err) {
//   //       console.log(err);
//   //       return;
//   //     }

//   // return next(createErr({
//   //     method: 'getCharacters',
//   //     type: 'reading file',
//   //     err,
//   //   }));
//   //console.log(data)
//   const sheet = res.locals.data;
//   console.log('sheet:', sheet);
//   if(!primaryKey) primaryKey = sheets[0][0];
//   //const reversedSheet = matrixTranspose(sheet);
//   // [
//   //     ["id", "1", "2"],
//   //     ["name", "q", "w"]
//   //
//   // ]

//   //console.log('reveredSheet:', sheet);
//   //ERROR CHECKER that we don't need anymore as SQL will throw back error for duplicates
//   // for (let col = 0; col < reversedSheet.length; col++) {
//   //   if (reversedSheet[col][0] === primaryKey) {
//   //     if (
//   //       new Set(reversedSheet[col][0].slice(1)).size !==
//   //       reversedSheet[col][0].slice(1).length
//   //     ) {
//   //       console.log('primary key not unique');
//   //       return;
//   //     }
//   //   }
//   // }
//   // res.locals.characters = parsedData.results;
//   // return next();

//   //create an empty matrix based on our data.json
//   const numOfRows = sheet.length;
//   const numOfCols = sheet[0].length;
//   //   let matrix = new Array(numOfRows);

//   //   for (let i = 0; i < numOfRows; i++) {
//   //     matrix[i] = new Array(numOfCols);
//   //   }

//   //   //assign each cell value into it's respective matrix index
//   //   sheet.forEach((col, i) => {
//   //     //colNames.push(col[0])
//   //     col.forEach((cell, j) => {
//   //       matrix[j][i] = cell;
//   //     });
//   //   });
//   // console.log(matrix)
//   // transform col array to two array

//   // make $1, $2, $3... our conditional checks if we reached the end, if so we no longer need a comma
//   let value = '';
//   for (let i = 0; i < numOfCols; i++) {
//     if (i === numOfCols - 1) value += `$${i + 1}`;
//     else value += `$${i + 1},`;
//   }

//   console.log('value: ', value);

//   //grabs our column names
//   colNames = sheet[0];
//   // console.log("colNames: ", colNames)

//   //insert values into respective columns
//   const text2 = `INSERT INTO ${tableName} (${colNames.join(
//     ','
//   )}) VALUES (${value})`;
//   console.log('text2: ', text2);

//   //assigns the type of values (varchar) that can be input into our columns
//   let subText = '';
//   for (let i = 0; i < colNames.length; i++) {
//     subText += `${colNames[i].replace(/\s/g, '')} varchar,`;
//   }
//   // console.log('subText:', subText)

//   //our query text if table does not exist yet
//   const text1 = `CREATE TABLE IF NOT EXISTS ${tableName} (
//                   ${subText}
//                   PRIMARY KEY (${primaryKey})
//                 )`;

//   console.log('text1: ', text1);

//   //using async await, we push our data using a for loop

//   async function queryDB() {
//     try {
//       const createTable = await db.query(text1);
//       //may need to slice out first element to get rid of our column name, leaving it as i+1 for now
//       for (let i = 1; i < sheet.length; i++) {
//         await db.query(text2, sheet[i]);
//       }
//     } catch (err) {
//       console.log(`invalid entry :${err}`);
//       return next({
//         log:`sqlController.createTable: Error: ${err}`,
//         message: {err: 'Error in your controller. Check server logs for details'}
//       });
//     } 
//   }
//   await queryDB();
//    return next();
// };
// //   );
// // };
// // sqlController.createTable();

// module.exports = sqlController;
