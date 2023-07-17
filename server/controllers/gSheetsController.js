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
      "range": "Sheet1!A1:B6",
      "majorDimension": "ROWS",
      "values": [
          [
              "id",
              "name"
          ],
          [
              "21",
              "b"
          ],
          [
              "2",
              "ewd"
          ],
          [
              "3",
              "edwd"
          ],
          [
              "4",
              "wed"
          ],
          [
              "5",
              "ewd"
          ]
      ],
      "titles": {
          "properties": {
              "title": "test"
          },
          "sheets": [
              {
                  "properties": {
                      "title": "Sheet1"
                  }
              },
              {
                  "properties": {
                      "title": "Sheet2"
                  }
              }
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
