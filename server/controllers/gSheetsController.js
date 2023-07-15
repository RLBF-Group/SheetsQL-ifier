const axios = require('axios');
const db = require('../models/sqlModels');
const format = require('pg-format');
const exec = require('child_process').exec;
const mainAppController = {};



module.exports = gSheetsController;