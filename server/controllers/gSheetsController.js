const { google } = require('googleapis');
const sheets = google.sheets('v4');

const gSheetsController = {};

// used when range not provided in request body
const fieldMask =
  'properties(title),sheets.properties(title),sheets.data(rowData(values.formattedValue))';

// regexp that pulls spreadsheetId from a google sheets url
const getIdFromUrl = url => {
  const reg = /\/d\/(.*?)\//;
  return url.match(reg)[1];
};

gSheetsController.getData = async (req, res, next) => {
  // pull needed content from request body
  const { dataRange: range, googleSheetsUrl } = req.body;

  // need the spreadsheetId, not the full URL
  const spreadsheetId = getIdFromUrl(googleSheetsUrl);

  // see authorize function in server.js for details on authorization
  const auth = res.locals.auth;

  try {
    let data;

    if (range) {
      // range provided in request body
      const request = {
        spreadsheetId,
        range,
        auth,
      };

      // this object contains a data property.
      // See details in google sheets API documentation
      data = await sheets.spreadsheets.values.get(request);

      // separate request for spreadsheet titles
      // this request has messier data in it. fields is a fieldMask that
      // at least filters out what we need from the data
      const titles = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
        fields: 'properties(title),sheets.properties(title)',
      });

      // slap the titles in with the data
      data.data.titles = titles.data;
    } else {
      // rangeless query
      const request = {
        spreadsheetId,
        fields: fieldMask,
        auth,
      };
      // this data is real ugly. I hope nobody ever has to use it.
      data = await sheets.spreadsheets.get(request);
    }
    res.locals.data = data.data;
    return next();
  } catch (err) {
    err.message =
      'Could not fetch google spreadsheet data. Check URL and sheet permissions';
    err.log =
      'Error in gSheetsController.getData | possible inaccessible sheet or bad query';
    return next(err);
  }
};

module.exports = gSheetsController;
