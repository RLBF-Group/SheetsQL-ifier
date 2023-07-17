const axios = require('axios');
const db = require('../models/sqlModels');
const format = require('pg-format');
const exec = require('child_process').exec;
const mainAppController = {};
const fsCallback = require('fs');
const path = require('path');

const psqlCommand = 'psql -d <url from elephantSQL> -f googleapi_postgres_create.sql'

const tableName = 'people';
let colNames = []
primaryKey = 'id'

let sheet;

fsCallback.readFile(path.resolve(__dirname, '../models/data.json'),
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
        console.log(sheet)
        // res.locals.characters = parsedData.results;
        // return next();


        const numOfCols = sheet.length;
        const numOfRows = sheet[0].length;
        let matrix = new Array(numOfRows);
        for (let i = 0; i < numOfRows; i++) {
            matrix[i] = new Array(numOfCols);
        }

        sheet.forEach((col, i) => {
            //colNames.push(col[0])
            col.forEach((cell, j) => {
                matrix[j][i] = cell;

            })
        });
        console.log(matrix)
        // transform col array to two array

        // make $1, $2, $3, $4, $5, $6, $7, $8, $9, $10...
        let value = ''
        for (let i = 0; i < numOfCols; i++) {
            if (i === numOfCols - 1) value += `$${i + 1}`
            else value += `$${i + 1},`
        }

        console.log("value: ", value)



        colNames = matrix[0];
        console.log("colNames: ", colNames)

        const text2 = `INSERT INTO ${tableName} (${colNames.join(',')}) VALUES (${value})`
        console.log("text2: ", text2)




        let subText = ''
        for (let i = 0; i < colNames.length; i++) {
            subText += `${colNames[i].replace(/\s/g, '')} varchar,`;
        }

        const text1 = `CREATE TABLE IF NOT EXISTS ${tableName} (
            ${subText}
            PRIMARY KEY (${primaryKey})
          )`

        console.log("text1: ", text1)

        db.query(text1)
            .then(data => {
                console.log("createTable")
            })
            .then(() => {
                console.log(matrix.slice(1))
                //for loop
                db.query(text2, matrix[1])
                    .then(data => {
                        console.log("insertTable")
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            )
            .catch(err => {
                console.log(err)
            })

        // matrix.forEach((row, i) => {
    });

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
      )`



}
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