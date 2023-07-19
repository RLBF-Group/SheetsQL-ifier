require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const gSheetsRouter = require('./routes/gSheetsRoutes.js');

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');

// initially request user authentication from Spotify
// router.get('/', authController.initializeAuth, (req, res) => {
//   console.log('reached authentication router.get redirect');
//   return res.status(200).json(res.locals.reqAuthentication);
// });

// AUTHORIZATION BLOCK
let authCache; // holds auth client after the first time server authenticates

// We authenticate using Application Default Credentials
// See README for details about setting up your server for ADC
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
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
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

const PORT = 1111;

//HANDLE parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorize);

//route handler
app.use('/api', gSheetsRouter);

//route catch
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
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
