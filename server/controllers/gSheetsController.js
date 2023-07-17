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
    console.log(err);
    return next(err);
  }
};

const getIdFromUrl = url => {
  const reg = /\/d\/(.*?)\//;
  return url.match(reg)[1];
};

gSheetsController.getData = async (req, res, next) => {
  const { dataRange: range, googleSheetsUrl } = req.body;
  const spreadsheetId = getIdFromUrl(googleSheetsUrl);
  const auth = res.locals.auth;
  try {
    let data;
    if (range) {
      const request = {
        spreadsheetId,
        range,
        auth,
      };
      data = await sheets.spreadsheets.values.get(request);
      const titles = await sheets.spreadsheets.get({
        spreadsheetId,
        auth,
        fields: 'properties(title),sheets.properties(title)',
      });
      data.data.titles = titles.data;
    } else {
      const request = {
        spreadsheetId,
        fields: fieldMask,
        auth,
      };
      data = await sheets.spreadsheets.get(request);
    }
    res.locals.data = data.data;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = gSheetsController;
