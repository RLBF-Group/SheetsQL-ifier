const path = require('path');
const express = require('express');


const app = express();
const express = require('express');
const mainAppRouter = require('./routes/mainAppRoutes');
const gSheetsRouter = require('./gSheetsRoutes.js');
const express = require('express');
const mainAppRouter = require('./routes/mainAppRoutes');
const gSheetsRouter = require('./gSheetsRoutes.js');

const PORT = 1111;

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
