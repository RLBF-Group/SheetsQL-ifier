const dotenv = require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');

const app = express();
const PORT = 1111;

//require in routers
const authRouter = require('./routes/authRouter.js');
const gSheetsRouter = require('./routes/gSheetsRouter.js');

// AUTHORIZATION BLOCK: authorizes the application in Google API

let authCache; // holds auth client after the first time server authenticates

// We authenticate using Application Default Credentials (ADC)
// *** See README for details about setting up your server for ADC ***
// Make sure you place your service account credentials in a credentials.json file
// in the /server directory. This file is ignored by git.
async function authorize(req, res, next) {
  if (authCache) {
    console.log('cached authclient in res.locals.auth');
    res.locals.auth = authCache;
    return next();
  }
  console.log('Starting ADC authorization...');
  try {
    console.log('creating auth...');
    const auth = new GoogleAuth({
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
      ],
    });
    console.log('auth created. creating auth client...');
    const authClient = await auth.getClient();
    console.log('auth client created. Storing in res.locals.auth');
    res.locals.auth = authClient;
    authCache = authClient;
    return next();
  } catch (err) {
    err.log =
      'Unable to authorize with Application Default Credentials. Check credentials.json, and verify correct permissions in google cloud console.';
    return next(err);
  }
}

//HANDLE parsing incoming requests to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authorize);

//establishing route handler
//app.use('/api/authentication/callback', authRouter)
app.use('/api/authentication', authRouter);
app.use('/api/sheets', gSheetsRouter);

//route catch
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, async () => {
	console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
