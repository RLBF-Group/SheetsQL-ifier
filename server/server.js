require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const mainAppRouter = require('./routes/mainAppRoutes');
const gSheetsRouter = require('./routes/gSheetsRoutes.js');

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');

let authCache;

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
    return next(err);
  }
}

const PORT = 1111;
//p

//HANDLE parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorize);

//route handler
app.use('/api', gSheetsRouter);
app.use('/', mainAppRouter);
// app.get('/', (req, res) => {
//   res.status(200).send('Big');
// });

//route catch
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorLog = err.log;
  return res.status(errorStatus).send(`err: ${err.log}`);
});

app.listen(PORT, async () => {
  console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
