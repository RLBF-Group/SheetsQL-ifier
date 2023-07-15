const path = require('path');
const express = require('express');

const app = express();

// const apiRouter = require('./routes/api');

const PORT = 1111;
//p
app.get('/api/', (req, res) => {
  res.status(200).send('Big');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

//route handler

//global error handler
module.exports = app;
