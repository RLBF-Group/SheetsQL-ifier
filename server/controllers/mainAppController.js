const axios = require('axios');
const db = require('../models/sqlModels');
const format = require('pg-format');
const exec = require('child_process').exec;
const mainAppController = {};

const psqlCommand = 'psql -d <url from elephantSQL> -f googleapi_postgres_create.sql'

const tableName = 'people';
const colNames = []

mainAppController.getSheet = (req, res, next) => {

    //parse our input data
    function parse(data) {
        const rows = data.sheets[0].data[0].rowData; //[{ value: [{ celldata }, {}, ..] }, { second row }, { third row } ...]
        rows.forEach(row => {
            const eachRow = [];
            row.values.forEach(cell => {
                eachRow.push(cell.userEnteredValue.stringValue);
                //console.log(cell.userEnteredValue.stringValue);

            });
            const colLength = colNames.length;
            const value = ''
            for (let i = 0; i < colLength; i++) {
                if (i === colLength) value += `$${i + 1}`
                value += `$${i + 1},`
            }
            colNames.join(',')



            const text = `INSERT INTO ${tableName} (${colNames}) VALUES (${value})`
            // const text = `INSERT INTO people (name, mass, birth_year, gender, height)
            // VALUES($1,$2,$3,$4,$5)`              

            db.query(text, eachRow)
                .then(data => {
                    res.locals.rowData = data;
                    return next()
                }
                )
                .catch(err => {
                    next({ err })
                })


        })


    }



}
mainAppController.execTerminal = (req, res, next) => {

    exec(psqlCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            return next();
        }
        res.locals.database = stdout
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}


//const { exec } = require('node:child_process');


module.exports = mainAppController;