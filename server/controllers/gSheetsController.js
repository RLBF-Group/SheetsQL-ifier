const { google } = require('googleapis');
const sheets = google.sheets('v4');

const gSheetsController = {};

const fieldMask =
  'properties(title),sheets.properties(title),sheets.data(rowData(values.formattedValue))';

gSheetsController.testGetData = async (req, res, next) => {
  console.log('attempting API call');
  try {
    const sheetData = await sheets.spreadsheets.get({
      spreadsheetId: '1zp4arRs66urJqI_iUOM4QcstUuW9OXq3blwgWn8TEvQ',
      // range: 'Sheet1!A1:B6',
      includeGridData: true,
      fields:
        'properties(title),sheets.properties(title),sheets.data(rowData(values.formattedValue))',
      auth: res.locals.auth,
    });
    console.log('collected sheetData');
    // console.log(JSON.stringify(sheetData.sheet));
    res.locals.sheetData = sheetData;
    return next();
  } catch (err) {
    // big error
    console.log(err);
    return next(err);
  }
};

gSheetsController.getDataFromRange = async (req, res, next) => {
  const { dataRange: range, googleSheetsUrl } = req.body;
  const spreadsheetId = '';
  const auth = res.locals.auth;
  try {
    let data;
    if (range) {
      const request = {
        spreadsheetId,
        range,
        auth,
      };
      data = sheets.spreadsheets.values.get(request);
    } else {
      const request = {
        spreadsheetId,
        fields: fieldMask,
        auth,
      };
    }
    res.locals.data = data;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = gSheetsController;
