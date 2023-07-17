const { google } = require('googleapis');
const sheets = google.sheets('v4');

const gSheetsController = {};

gSheetsController.testGetData = async (req, res, next) => {
  console.log('attempting API call');
  try {
    const sheetData = await sheets.spreadsheets.get({
      spreadsheetId: '1zp4arRs66urJqI_iUOM4QcstUuW9OXq3blwgWn8TEvQ',
      // range: 'Sheet1!A1:B6',
      includeGridData: true,
      auth: res.locals.auth,
    });
    console.log('collected sheetData');
    // console.log(JSON.stringify(sheetData.sheet));
    res.locals.sheetData = sheetData;
    res.locals.data = {
      "data": {
          "values": [
              ["id", "name"],
              ["19", "q"],
              ["20", "w"],
              ["100", "e"]
          ]
      }
  }
  
    return next();
  } catch (err) {
    // big error
    console.log('here?');
    return next(err);
  }
};

module.exports = gSheetsController;
