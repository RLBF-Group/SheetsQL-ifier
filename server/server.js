require('dotenv').config();
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const mainAppRouter = require('./routes/mainAppRoutes');
const gSheetsRouter = require('./routes/gSheetsRoutes.js');

const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GoogleAuth } = require('google-auth-library');

const PORT = 1111;
//p
app.get('/api/', async (req, res) => {
  console.log('attempting API call');
  try {
    console.log('creating auth...');
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    console.log(auth);
    console.log('auth created. creating auth client...');
    const authClient = await auth.getClient();
    console.log('auth client created. querying sheet...');
    const sheetData = await sheets.spreadsheets.values.get({
      spreadsheetId: '1MI9j-m1jouEMF7GlQ7NF__569_tbCHGRmKaHRtlBRBM',
      range: 'Sheet1!A1:D5',
      auth: authClient,
    });
    console.log('collected sheetData');
    console.log(JSON.stringify(sheetData));
    fs.writeFileSync('./errDump.json', JSON.stringify(err));
  } catch (err) {
    // big error
    fs.writeFileSync('./errDump.json', JSON.stringify(err));
  }
  res.sendStatus(200);
});

//HANDLE parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//route handler
app.use('/api', gSheetsRouter);
app.use('/', mainAppRouter);
// app.get('/', (req, res) => {
//   res.status(200).send('Big');
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

//route catch
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorLog = err.log;
  return res.status(errorStatus).send(`err: ${err.log}`);
});

module.exports = app;
